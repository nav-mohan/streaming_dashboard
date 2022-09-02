import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import useLocalStorage from "./hooks/useLocalStorage";

import {
  usernameLocalStorageKey,
  authTokenLocalStorageKey } from "./config";

function App() {
  const [username,setUsername] = useLocalStorage(usernameLocalStorageKey,null);
  const [authToken,setAuthToken] = useLocalStorage(authTokenLocalStorageKey,null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(()=>{
    console.log('isAuthenticated',isAuthenticated)
  },[isAuthenticated])

  useEffect(()=>{
    if(username && authToken){
      console.log('BEGIN AUTOLOGIN NOW WITH ',username,authToken)
    }
  },[username,authToken])

  return (
    <div className="App">

      <Home 
        authToken={authToken}
        username={username}
        setAuthToken={setAuthToken} 
        setUsername={setUsername} 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      
    </div>
  );
}

export default App;
