import React, { useContext, useEffect } from 'react';
import { MyContext } from './context';
import Register from './register';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

const LibraryMenu: React.FC = () => {
    const { user, library, libraryLoaded, updateLibrary } = useContext(MyContext);

    if (user === null) {
        return <Register />;
    }

    const handleBorrow = (book: Book) => {
        console.log(user)
        fetch(`http://localhost:81/borrowers/${user.id}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(response => response.json())
        .then(updatedBooks => {
            // Update the library context with the updated books
            updateLibrary(updatedBooks);
        })
        .catch(error => {
            console.error('Error borrowing book:', error);
        });
    };

    console.log(library)

    return (
        <div>
            <h2>Menu de la bibliothèque</h2>
            {libraryLoaded && library && library.books && library.books.map(book => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>Auteur : {book.author}</p>
                    <p>Description : {book.description}</p>
                    <button onClick={() => handleBorrow(book)}>Emprunter</button>
                </div>
            ))}
        </div>
    );
};

export default LibraryMenu;