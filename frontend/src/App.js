import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { usernameLocalStorageKey } from "./config";
import AuthForm from "./AuthForm";
import useLocalStorage from "./useLocalStorage";
import Dashboard from "./Dashboard";
function App() {
  const [authState,setAuthState] = useLocalStorage(usernameLocalStorageKey,{username:'',jwt:'',exp:0});
  return (
    <div className="App">
      <AuthContext.Provider value = {{authState,setAuthState}}>
      <AuthForm/>
      <Dashboard/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
