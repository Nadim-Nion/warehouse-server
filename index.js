const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors())
app.use(express.json())


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

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("bookDB");
        const bookCollection = database.collection("books");
        const addNewBookCollection = database.collection("addNewBooks");

        // Find all (10) books data
        app.get('/books/all', async (req, res) => {
            const cursor = bookCollection.find();
            const result = await cursor.toArray();
            res.send(result);
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

        // Delete a book 
        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookCollection.deleteOne(query);
            res.send(result);
        })

        // View (GET) the all newly added books by user email
        app.get('/newAddedBooks', async (req, res) => {
            const query = req.params.email;
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