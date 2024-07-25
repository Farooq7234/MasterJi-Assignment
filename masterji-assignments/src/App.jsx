import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpForm from './components/OtpForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OtpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
