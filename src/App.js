import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Seminar from './components/seminars/Seminar';
import Customer from './components/customers/Customer';
import Employee from './components/employees/Employee';
import SeminarForm from './components/seminars/SeminarForm';
import Registrations from './components/seminars/registrations/Registrations';
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
        <Route path="/seminars/registrations" element={<Registrations />} />
      </Routes>
    </Router>
  );
}

export default App;