import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Aside from './components/pages/Aside';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Header from './components/pages/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
