import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Seminar from './components/lists/Seminar';
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
      </Routes>
    </Router>
  );
}

export default App;