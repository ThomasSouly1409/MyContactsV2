import { useState } from "react";
import Auth from "./Client.auth";
import Contacts from "./Contacts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Contacts onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
