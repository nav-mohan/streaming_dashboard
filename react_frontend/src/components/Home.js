import React from "react";
// import Dashboard from "./Dashboard";
import DashWithContext from "./DashWithContext";
import LoginForm from "./LoginForm";
import { AuthContext } from "./AuthContextCreator";

export default function Home({
    authToken,
    username,
    setAuthToken,
    setUsername,
    isAuthenticated,
    setIsAuthenticated
}){
    if(!isAuthenticated || !authToken){
        return (
              <LoginForm 
                setAuthToken={setAuthToken} 
                setUsername={setUsername} 
                setIsAuthenticated={setIsAuthenticated}
            />
        )
    }
    else{
        return(
            // <Dashboard authToken={authToken} username={username} />
            // <DashWithContext authToken={authToken} username={username} />
            <AuthContext.Provider value = {{authToken,setAuthToken}}>
                
            </AuthContext.Provider>
        )
    }
}