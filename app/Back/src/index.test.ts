import request from 'supertest';
import { app } from './index';

describe('Library API', () => {
    // Test GET /
    describe('GET /', () => {
        it('should return status code 200 and a welcome message', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Welcome to the Library API');
        });
    });

    // Test POST /library/login
    describe('POST /library/login', () => {
        it('should return status code 200 and a success message if login is successful', async () => {
            const response = await request(app)
                .post('/library/login')
                .send({ username: 'admin', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
        });

        it('should return status code 401 and an error message if login fails', async () => {
            const response = await request(app)
                .post('/library/login')
                .send({ username: 'admin', password: 'wrongpassword' });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid username or password');
        });
    });

    // Test GET /library/books
    describe('GET /library/books', () => {
        it('should return status code 200 and an array of books', async () => {
            const response = await request(app).get('/library/books');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    // Test POST /library/books
    describe('POST /library/books', () => {
        it('should return status code 201 and a success message if book is added successfully', async () => {
            const newBook = {
                title: 'New Book',
                author: 'New Author',
                description: 'New Description',
            };
            const response = await request(app)
                .post('/library/books')
                .send(newBook);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Book added successfully');
        });

        it('should return status code 400 and an error message if book data is invalid', async () => {
            const invalidBook = {
                title: '',
                author: 'New Author',
                description: 'New Description',
            };
            const response = await request(app)
                .post('/library/books')
                .send(invalidBook);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid book data');
        });
    });

    // Test DELETE /library/books/:id
    describe('DELETE /library/books/:id', () => {
        it('should return status code 200 and a success message if book is deleted successfully', async () => {
            const bookId = 1;
            const response = await request(app).delete(`/library/books/${bookId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Book deleted successfully');
        });

        it('should return status code 404 and an error message if book does not exist', async () => {
            const bookId = 100;
            const response = await request(app).delete(`/library/books/${bookId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found');
        });
    });

    // Test POST /borrowers/register
    describe('POST /borrowers/register', () => {
        it('should return status code 201 and a success message if borrower is registered successfully', async () => {
            const newBorrower = {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password',
            };
            const response = await request(app)
                .post('/borrowers/register')
                .send(newBorrower);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Borrower registered successfully');
        });

        it('should return status code 400 and an error message if borrower data is invalid', async () => {
            const invalidBorrower = {
                firstname: '',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password',
            };
            const response = await request(app)
                .post('/borrowers/register')
                .send(invalidBorrower);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid borrower data');
        });
    });

    // Test POST /borrowers/login
    describe('POST /borrowers/login', () => {
        it('should return status code 200 and a success message if login is successful', async () => {
            const response = await request(app)
                .post('/borrowers/login')
                .send({ email: 'john.doe@example.com', password: 'password' });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
        });

        it('should return status code 401 and an error message if login fails', async () => {
            const response = await request(app)
                .post('/borrowers/login')
                .send({ email: 'john.doe@example.com', password: 'wrongpassword' });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password');
        });
    });

    // Test GET /borrowers/:id/books
    describe('GET /borrowers/:id/books', () => {
        it('should return status code 200 and an array of books borrowed by the borrower', async () => {
            const borrowerId = 1;
            const response = await request(app).get(`/borrowers/${borrowerId}/books`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return status code 404 and an error message if borrower does not exist', async () => {
            const borrowerId = 100;
            const response = await request(app).get(`/borrowers/${borrowerId}/books`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Borrower not found');
        });
    });

    // Test POST /borrowers/:id/books
    describe('POST /borrowers/:id/books', () => {
        it('should return status code 201 and a success message if book is borrowed successfully', async () => {
            const borrowerId = 1;
            const bookId = 1;
            const response = await request(app)
                .post(`/borrowers/${borrowerId}/books`)
                .send({ bookId });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Book borrowed successfully');
        });

        it('should return status code 400 and an error message if bookId is missing', async () => {
            const borrowerId = 1;
            const response = await request(app)
                .post(`/borrowers/${borrowerId}/books`)
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing bookId');
        });

        it('should return status code 404 and an error message if borrower does not exist', async () => {
            const borrowerId = 100;
            const bookId = 1;
            const response = await request(app)
                .post(`/borrowers/${borrowerId}/books`)
                .send({ bookId });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Borrower not found');
        });

        it('should return status code 404 and an error message if book does not exist', async () => {
            const borrowerId = 1;
            const bookId = 100;
            const response = await request(app)
                .post(`/borrowers/${borrowerId}/books`)
                .send({ bookId });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found');
        });
    });

    // Test DELETE /borrowers/:id/books/:bookId
    describe('DELETE /borrowers/:id/books/:bookId', () => {
        it('should return status code 200 and a success message if book is returned successfully', async () => {
            const borrowerId = 1;
            const bookId = 1;
            const response = await request(app).delete(`/borrowers/${borrowerId}/books/${bookId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Book returned successfully');
        });

        it('should return status code 404 and an error message if borrower does not exist', async () => {
            const borrowerId = 100;
            const bookId = 1;
            const response = await request(app).delete(`/borrowers/${borrowerId}/books/${bookId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Borrower not found');
        });

        it('should return status code 404 and an error message if book does not exist', async () => {
            const borrowerId = 1;
            const bookId = 100;
            const response = await request(app).delete(`/borrowers/${borrowerId}/books/${bookId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found');
        });

        it('should return status code 404 and an error message if book is not borrowed by the borrower', async () => {
            const borrowerId = 1;
            const bookId = 2;
            const response = await request(app).delete(`/borrowers/${borrowerId}/books/${bookId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not borrowed by the borrower');
        });
    });
});
