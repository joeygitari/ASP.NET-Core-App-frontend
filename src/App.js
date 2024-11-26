import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Seminar from './components/lists/Seminar';
import Customer from './components/lists/Customer';
import Employee from './components/lists/Employee';
import SeminarForm from './components/forms/SeminarForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seminars" element={<Seminar />} />
        <Route path="/seminars/new" element={<SeminarForm />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/employees" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;