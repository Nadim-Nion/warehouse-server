# BooksHive (Server Side)

## Warehouse or Inventory Management Website


### Description:
BooksHive is a MERN stack project focusing on managing an inventory of books. This repository contains the server-side implementation of the project, handling backend functionalities such as database interactions, authentication, and API endpoints.

### Key Features & Functionalities:
- **MongoDB Integration**: Utilizes MongoDB to store inventory data, user information, and newly added books.
- **User Authentication**: Implements email/password-based authentication along with social login (Google, Facebook) using JWT tokens.
- **Protected Routes**: Utilizes JWT tokens to protect private routes like inventory details and manage items.
- **Inventory Management**: CRUD operations for managing inventory items, including updating quantity, deleting items, and adding new items.
- **Detailed Item Views**: Provides detailed views of inventory items with options to update quantity and view supplier information.
- **Pagination for Books**: API endpoints support pagination to retrieve books in batches.
- **Email Verification**: Basic implementation of email verification (email may go to spam folder).
- **Error Handling**: Displays errors for incorrect login credentials and utilizes meaningful error messages throughout the application.
- **Responsive Design**: Ensures the website is responsive and optimized for desktop and mobile devices.
- **Blog Section**: Includes a non-protected route for answering questions related to JavaScript, Node.js, MongoDB, SQL vs NoSQL, and JWT.
- **Meaningful 404 Page**: Implements a custom 404 page for handling page-not-found scenarios.

### API Endpoints:
- `GET /books/all`: Retrieves all books with pagination support.
- `GET /booksCount`: Gets the total count of books in the collection.
- `GET /books/first-six`: Retrieves the first six books.
- `GET /books/:id`: Retrieves a specific book by its ID.
- `POST /books/:id/delivered`: Decreases the quantity of a book after delivery.
- `POST /books/:id/restock`: Increases the quantity of a book after restocking.
- `DELETE /books/:id`: Deletes a book from the inventory.
- `GET /newAddedBooks`: Retrieves newly added books by user email.
- `POST /newAddedBooks`: Adds a new book to the user's collection.
- `GET /newAddedBooks/:id`: Retrieves a specific newly added book by ID.
- `DELETE /newAddedBooks/:id`: Deletes a newly added book from the user's collection.

### Tech Stack

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JSON Web Tokens)**: Token-based authentication mechanism.
- **Axios**: HTTP client for making requests to backend API.
- **dotenv**: Module for loading environment variables.

### Additional Notes:
- Organized and clean code structure.
- Environment variables used for sensitive information.
- Implements JWT token-based authentication for user sessions.
- Ensures data integrity and security with MongoDB integration.

## Backend API Deployment

* Vercel: https://warehouse-server-zeta.vercel.app/
## Getting Startted

### Prerequisites

- Node.js installed on your local machine.
- MongoDB instance (local or cloud-based) for data storage.
- SMTP service credentials for sending emails (e.g., Gmail SMTP).

## Installation


1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookshive-server.git
   ```

2. Install dependencies:

   ```bash
   cd bookshive-server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   SMTP_HOST=<smtp_host>
   SMTP_PORT=<smtp_port>
   SMTP_USER=<smtp_username>
   SMTP_PASS=<smtp_password>
   ```

4. Start the server:

   ```bash
   npm start
   ```Absolutely, here's the section on commits with a potential improvement:

## Commits

This repository adheres to a structured commit message convention to enhance readability and maintainability. Here's an overview of the key commit types:

- **feat:** Introduces a new feature to the application.
- **fix:** Addresses a bug or issue identified in the codebase.
- **docs:** Encompasses changes made to documentation, such as updates, additions, or corrections.
- **style:** Covers formatting adjustments, whitespace changes, or fixing minor inconsistencies like missing semicolons.
- **refactor:** Represents code structure improvements without altering functionality. This can involve code organization, renaming variables or functions, or improving readability.
- **test:** Introduces new tests or updates existing tests to ensure code quality and maintainability.
- **chore:** Encompasses changes that don't directly affect the application's functionality, such as updating build tasks, package manager configurations, or dependency versions.

**Optional Improvement:**

Consider adopting a more comprehensive commit message convention like Conventional Commits ([https://www.conventionalcommits.org/en/v1.0.0-beta.4/](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)). This approach provides a standard format for commit messages, including type, scope (optional), and a clear description of the change, making it easier to generate changelogs, automate workflows, and collaborate effectively.

By following these guidelines and potentially adopting a more detailed convention, you'll ensure clear and consistent commit messages that benefit you and your team in the long run.
## Contributing

Contributions are always welcome!

Contributions are welcome! Please open a pull request for any improvements or features.

Please adhere to this project's `code of conduct`.


## License

This project is licensed under the [MIT License](LICENSE).


## Deployment

To deploy this project run

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Nadim-Nion/warehouse-server.git
git push -u origin main

```


## Tech Stack

**Client:** React+Vite, React Router, Firebase (Authentication & Hosting), Tailwind CSS, Daisy UI, Axios JS

**Server:** Express.js, Node.js, JWT

**Database:** MongoDB

**Tools:** Vite, Vercel, npm, Surge, Netlify

**State Management:** Context API



## FAQ

#### Is this website reponsible?

Answer : Yes, the full website is responsive for the all devices (Desktop, Tablet and Phone)

#### Is this website store data to the database?

Answer : I have stored all the data in MongoDB.

## 🚀 About Me
Hi, I am Nadim Mahmud Nion. I have recently concluded my graduation from the department of Computer Science and Engineering (CSE) at the Daffodil International University (DIU). I have been learning MERN Stack Web Development since 2022. I am expertise in the following skills:

* React

* Express.js 

* Node.js 

* MongoDB

* JWT

* Vite

* React Router

* Firebase (Authentication & Hosting)

* Vercel

* JavaScript

* Advanced JavaScript

* Daisy UI 

* Bootstrap

* Tailwind

* HTML5

* CSS3

* Media Query

I have built multiple projects using these skills. You are invited to my GitHub profile to know about my projects and don't forget to give a star to my projects.