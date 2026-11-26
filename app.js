
const express = require('express');

const app = express();

app.use(express.json());


let books = [
    {
        id: 1,
        title: "Harry Potter",
        author: "J.K. Rowling"
    },
    {
        id: 2,
        title: "The Hobbit",
        author: "J.R.R. Tolkien"
    }
];

let nextId = 3;


// GET
app.get('/books', (req, res) => {
    res.json(books);
});


// GET book by ID
app.get('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});


// POST
app.post('/books', (req, res) => {

    const { title, author } = req.body;

    if (!title || !author) {

        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    const newBook = {
        id: nextId,
        title: title,
        author: author,
    };

    books.push(newBook);
    nextId++;

    res.status(201).json(newBook);
});


// DELETE
app.delete('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.json({
        message: "Book deleted successfully"
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
