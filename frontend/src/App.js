import { useState } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const [authState,setAuthState] = useState({username:'',jwt:'',});
  return (
    <div className="App">
      <AuthContext.Provider value = {{authState,setAuthState}}>

      </AuthContext.Provider>
    </div>
  );
}

export default App;
