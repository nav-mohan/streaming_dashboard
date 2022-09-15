import { AuthContextProvider } from "./AuthContext";
import LoginLogout from "./LoginLogout";
import Dashboard from "./Dashboard";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <LoginLogout/>
        <Dashboard/>
      </AuthContextProvider>
    </div>
  );
}

export default App;