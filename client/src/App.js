
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home'  element={ <Home/> } />
        <Route exact path='/' element={ <PrivateRoute>  <Dashboard/> </PrivateRoute> } />
        <Route path='/sign-up' element={ <SignUp/> } />
        <Route path='/log-in' element={ <LogIn/> } />
      </Routes>
    </Router>
  );
  
  
}

export default App;
