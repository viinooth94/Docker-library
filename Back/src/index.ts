import express from 'express';
import bodyParser from 'body-parser';


export const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface Borrower {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  books: Book[];
}

interface Library {
  name: string;
  books: Book[];
  key: string;
}

let library: Library = {
  name: 'Library',
  books: [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      description: 'Description 1'
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      description: 'Description 2'
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      description: 'Description 3'
    }
  ],
  key: 'library'
};

let borrowers: Borrower[] = [];
let borrowerId = 1;
let bookId = 4;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/library/login', (req, res) => { // Login to library
  const { key } = req.body;
  console.log(req.body)
  if (key === library.key) {
    res.send(library);
  }
  else {
    res.status(401).send('Invalid key');
  }
});

app.get('/library/books', (req, res) => { // Get all books
  res.send(library.books);
});

app.post('/library/books', (req, res) => { // Add a book
  const book = req.body;
  library.books.push({id:bookId++, ...book});
  res.send(library.books);
});

app.delete('/library/books/:id', (req, res) => { // Delete a book
  const id = parseInt(req.params.id);
  library.books = library.books.filter(book => book.id !== id);
  res.send(library.books);
});

app.post('/borrowers/register', (req, res) => { // Register a borrower
  const borrower = {id: borrowerId++, ...req.body};
  borrower.books = [];
  borrowers.push(borrower);
  res.send(borrower);
});

app.post('/borrowers/login', (req, res) => { // Login a borrower
  const { email, password } = req.body;
  const borrower = borrowers.find(borrower => borrower.email === email && borrower.password === password);
  if (borrower) {
    res.send(borrower);
  } else {
    res.status(401).send('Invalid email or password');
  }
});

app.get('/borrowers/:id/books', (req, res) => { // Get all books borrowed by a borrower
  const id = parseInt(req.params.id);
  const borrower = borrowers.find(borrower => borrower.id === id);
  if (borrower) {
    res.send(borrower.books);
  } else {
    res.status(404).send('Borrower not found');
  }
});

app.post('/borrowers/:id/books', (req, res) => { // Add a book to a borrower and remove it from the library
  const id = parseInt(req.params.id);
  const borrower = borrowers.find(borrower => borrower.id === id);
  if (borrower) {
    const book = req.body; 
    borrower.books.push(book);
    library.books = library.books.filter(libraryBook => libraryBook.id !== book.id);
    res.send(borrower.books);
  } else {
    res.status(404).send('Borrower not found');
  }
});

app.delete('/borrowers/:id/books/:bookId', (req, res) => { // Remove a book from a borrower and add it back to the library
  const id = parseInt(req.params.id);
  const bookId = parseInt(req.params.bookId);
  const borrower = borrowers.find(borrower => borrower.id === id);
  if (borrower) {
    const book = borrower.books.find(book => book.id === bookId);
    if (book) {
      borrower.books = borrower.books.filter(borrowerBook => borrowerBook.id !== bookId);
      library.books.push(book);
      res.send(borrower.books);
    } else {
      res.status(404).send('Book not found');
    }
  } else {
    res.status(404).send('Borrower not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});