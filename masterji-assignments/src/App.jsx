import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpForm from './components/OtpForm';
import DragNDropCards from './components/DragNDropCards.jsx';
import Batches from './components/Batches.jsx';
import Home from './components/Home.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/otp-form" element={<OtpForm />} />
        <Route path="/course-list" element={<DragNDropCards />} />
        <Route path="/batches" element={<Batches />} />
      </Routes>
    </Router>
  );
}

export default App;
