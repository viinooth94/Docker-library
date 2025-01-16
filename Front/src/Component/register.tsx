import React, { useState, useContext } from 'react';
import { MyContext } from './context'; // Replace '../path/to/MyContext' with the actual path to your context file
import LibraryMenu from './library';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const { user, updateUser } = useContext(MyContext); // Replace 'MyContext' with the actual name of your context

    if (user !== null) {
        return <LibraryMenu />;
    }

    const handleRegister = async () => {
        // Make a request to your API to register the user
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/borrowers/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, firstname, lastname }),
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
            // Handle registration errors here
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Prénom" />
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Nom" />
            <button onClick={handleRegister}>S'inscrire</button>
        </div>
    );
};

export default Register;