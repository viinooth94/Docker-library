

import React, { useState, useContext } from 'react';
import { MyContext } from './context'; // Replace '../path/to/MyContext' with the actual path to your context file
import LibraryMenu from './library';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, updateUser } = useContext(MyContext); // Replace 'MyContext' with the actual name of your context

    if (user !== null) {
        return <LibraryMenu />;
    }

    const handleLogin = async () => {
        // Make a request to your API to check if the user exists
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/borrowers/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const user = await response.json();
                updateUser(user); // Store the user in the context
            } else {
                console.log("mdr")
            }
        } catch (error) {
            // Handle login errors here
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
};

export default Login;