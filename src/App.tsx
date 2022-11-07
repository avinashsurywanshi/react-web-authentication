
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/login';
import EnterOtp from './pages/enterOtp';
import AuthContext from './auth/context';
import Dashboard from './pages/dashboard';

const App = () => {
  const [user, setUser ]=useState();

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/" element= {<Login />}></Route>
        <Route path="/login" element= {<Login />}></Route>
        <Route path="/enter-otp" element= {<EnterOtp />}></Route>
        <Route path="/dashboard" element= {user ? <Dashboard /> : <Navigate to="/" />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
