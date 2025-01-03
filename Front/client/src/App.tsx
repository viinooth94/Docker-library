import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MyContextProvider } from './Component/context';
import Login from './Component/login';
import Register from './Component/register';

function App() {
  return (
    <MyContextProvider>
      <div>
        <h1>
          Welcome to the library
        </h1>
        <Register />
        <Login />
      </div>
    </MyContextProvider>

  );
}

export default App;
