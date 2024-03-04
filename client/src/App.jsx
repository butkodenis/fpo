import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>React App</h1>
          </div>
          <div className="col-md-6">
            <h1>Vite App</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
