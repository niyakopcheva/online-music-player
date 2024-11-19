
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={ <Home/> } />
        <Route path='/sign-in' />
      </Routes>
    </Router>
  );
  
  
}

export default App;
