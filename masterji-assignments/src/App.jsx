import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpForm from './components/OtpForm';
import DragNDropCards from './components/DragNDropCards.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OtpForm />} />
        <Route path="/batches" element={<DragNDropCards />} />
      </Routes>
    </Router>
  );
}

export default App;
