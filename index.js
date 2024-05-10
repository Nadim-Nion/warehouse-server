const express = require('express');
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors({
    origin: [
        // 'http://localhost:5173'
        'https://warehouse-client-74323.web.app',
        'https://warehouse-client-74323.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qf8hqc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//Custom Middlewares
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    // console.log('Token in the Cookies inside middleware:', token);

    // if no token available (expired or deleted)
    if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
    }
    // verify jwt token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
    })
    // next();
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("bookDB");
        const bookCollection = database.collection("books");
        const addNewBookCollection = database.collection("addNewBooks");

        // auth or jwt related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            // console.log('User for token', user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                })
                .send({ success: true });
        })

        // Clear the cookie after logout
        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log("Logging out", user);
            res
                .clearCookie('token', { maxAge: 0 })
                .send({ success: true });
        })

        // Find all (10) books data
        app.get('/books/all', async (req, res) => {
            // console.log('Pagination Query', req.query);
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const cursor = bookCollection.find().skip(page * size).limit(size);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get the total count in  book collection
        app.get('/booksCount', async (req, res) => {
            const total = await bookCollection.estimatedDocumentCount();
            res.send({ total });
        })

        // Find the first six books data
        app.get('/books/first-six', async (req, res) => {
            const cursor = bookCollection.find().limit(6);
            const result = await cursor.toArray();
            res.send(result);
        })


        // Find specific book data by it's id
        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookCollection.findOne(query);
            res.send(result);
        })


        // Decrease the quantity of book after clicking to the "Delivered" button
        app.post('/books/:id/delivered', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const update = { $inc: { quantity: -1 } };
            const result = await bookCollection.findOneAndUpdate(filter, update, { returnDocument: 'after' });
            res.send(result);
        })

        // Increase the quantity of book after submitting the "Restock" form
        app.post('/books/:id/restock', async (req, res) => {
            const { quantity } = req.body;
            console.log(quantity);
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const update = { $inc: { quantity: parseInt(quantity) } };
            const result = await bookCollection.findOneAndUpdate(filter, update, { returnDocument: "after" });
            res.send(result);
        })

        // Delete a book from ManageItems
        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookCollection.deleteOne(query);
            res.send(result);
        })

        // View (GET) the all newly added books by user email
        app.get('/newAddedBooks', verifyToken, async (req, res) => {
            // const query = req.query.email;
            console.log(req.query.email);
            // console.log('Cookies', req.cookies);
            // console.log('Token owner info:', req.user);
            if (req.user.email !== req.query.email) {
                return res.status(403).send({ message: "forbidden access" });
            }
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email };
            }
            const cursor = addNewBookCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);

        })

        // Add (POST) new book
        app.post('/newAddedBooks', async (req, res) => {
            const newBook = req.body;
            const result = await addNewBookCollection.insertOne(newBook);
            res.send(result);

        })

        // Get a specific book in newBookCollection
        app.get('/newAddedBooks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await addNewBookCollection.findOne(query);
            res.send(result);
        })

        // Delete a newly added book from MyItems
        app.delete('/newAddedBooks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await addNewBookCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Warehouse Management Website is running')
})

app.listen(port, () => {
    console.log(`Warehouse Management is running on the PORT: ${port}`);
})