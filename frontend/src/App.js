import { AuthContextProvider } from "./AuthContext";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <AuthForm/>
      <Dashboard/>
      </AuthContextProvider>
    </div>
  );
}

export default App;