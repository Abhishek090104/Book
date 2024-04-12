import express from "express";
import db from "../index.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        // Query to get all books from the database
        const queryBooks = 'SELECT * FROM books';
        const resultBooks = await db.query(queryBooks);

        // Sending the list of books as a JSON response
        response.json({ books: resultBooks.rows });
    } catch (error) {
        console.error('Error retrieving books:', error);
        response.status(500).send('An error occurred while retrieving books.');
    }
});

router.get('/:id', async (request, response) => {
    try {
        const bookId = request.params.id;

        // Query to get book details based on ID
        const query = 'SELECT * FROM books WHERE id = $1';
        const values = [bookId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Book not found' });
        }

        const book = result.rows[0];
        response.json(book);
    } catch (error) {
        console.error('Error retrieving book details:', error);
        response.status(500).send('An error occurred while retrieving book details.');
    }
});


router.post('/', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        // Insert the book information into the database
        const query = 'INSERT INTO books (title, author, publishYear) VALUES ($1, $2, $3)';
        const values = [title, author, publishYear];
        await db.query(query, values);

        response.status(201).send('Book information inserted successfully.');
    } catch (error) {
        console.error('Error inserting book information:', error);
        response.status(500).send('An error occurred while inserting book information.');
    }
});

router.put('/:id', async (request, response) => {
    try {
        const bookId = request.params.id;
        const { title, author, publishYear } = request.body;

        const query = 'UPDATE books SET title = $1, author = $2, publishYear = $3 WHERE id = $4';
        const values = [title, author, publishYear, bookId];
        await db.query(query, values);

        response.status(200).send('Book information successfully updated.');
    } catch (error) {
        console.error('Error updating the book:', error);
        response.status(500).send('An error occurred while updating the book.');
    }
});


router.delete('/:id', async (request, response) => {
    try {
        const bookId = request.params.id;

        const query = 'DELETE FROM books WHERE id = $1';
        const values = [bookId];
        await db.query(query, values);

        response.status(200).send('Book deleted successfully.');
    } catch (error) {
        console.error('Error deleting the book:', error);
        response.status(500).send('An error occurred while deleting the book.');
    }
});

export default router;
