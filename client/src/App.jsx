import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Users from './components/pages/Users';
import Login from './components/pages/Login';
import Students from './components/pages/Students';
import StudentCard from './components/card/StudentCard';
import StudentAdd from './components/forms/StudentAdd';
import StudentAddContract from './components/forms/StudentAddContract';
import StudentsBalance from './components/pages/StudentsBalance';
import Course from './components/pages/Course';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentCard />} />
            <Route path="/students/add" element={<StudentAdd />} />
            <Route path="/students/:id/addContract" element={<StudentAddContract />} />
            <Route path="/studentsBalance" element={<StudentsBalance />} />
            <Route path="/courses" element={<Course />} />
          </Route>
          <Route path="/login2" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
