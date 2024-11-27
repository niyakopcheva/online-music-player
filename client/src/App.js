
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={ <Home/> } />
        <Route path='/sign-up' element={ <SignUp/> } />
        <Route path='/log-in' element={ <LogIn/> } />
      </Routes>
    </Router>
  );
  
  
}

export default App;
