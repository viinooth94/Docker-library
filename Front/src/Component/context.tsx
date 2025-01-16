import React, { createContext, useEffect, useState } from 'react';

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

// Définir le type des données stockées dans le contexte
type ContextData = {
    user: Borrower | null;
    library: Library | null; // Change the type to allow null values
    libraryLoaded: boolean;
    updateUser: (user: Borrower) => void;
    updateLibrary: (library: Library) => void;
    updateLibraryLoaded: () => void;
};

// Créer le contexte
export const MyContext = createContext<ContextData>({
        user: null,
        library: null,
        libraryLoaded: false,
        updateUser: () => {},
        updateLibrary: () => {},
        updateLibraryLoaded: () => {},
});

// Créer le fournisseur de contexte
export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [library, setLibrary] = useState<any>(null);

    // Fonctions pour mettre à jour les données du contexte
    const [user, setUser] = useState<Borrower | null>(null);
    
    const updateUser = (newUser: Borrower) => {
        setUser(newUser);
    };

    const updateLibrary = (newLibrary: any) => {
        setLibrary(newLibrary);
    };

    const [libraryLoaded, setLibraryLoaded] = useState(false);

    const updateLibraryLoaded = () => {
        setLibraryLoaded(true);
    };

    // Valeur du contexte à fournir aux composants enfants
    const contextValue: ContextData = {
        user,
        library,
        libraryLoaded,
        updateUser,
        updateLibrary,
        updateLibraryLoaded,
    };


    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/library/books')
            .then(response => response.json())
            .then(books => {
                // Update the library context with the fetched books
                console.log(books)
                updateLibrary({books: books, name: 'Library', key: 'library'});
                updateLibraryLoaded();
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, [user]);

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};
    