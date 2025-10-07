import { useState } from "react";
import Auth from "./Client.auth";
import Contacts from "./Contacts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Auth onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Contacts onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}

export default App;
