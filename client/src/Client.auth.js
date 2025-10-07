import { useState } from "react";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isSignup ? "/auth/register" : "/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isSignup) {
          setMessage("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
          setIsSignup(false);
        } else {
          setMessage("Connexion réussie !");
          localStorage.setItem("token", data.token);
          onLogin && onLogin();
        }
      } else {
        setMessage(`${data.message || "Erreur"}`);
      }
    } catch (error) {
      setMessage("⚠️ Erreur réseau !");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isSignup ? "Créer un compte" : "Connexion"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isSignup ? "S'inscrire" : "Se connecter"}</button>
      </form>

      {message && <p>{message}</p>}

      <button
        style={{ marginTop: "20px" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Déjà un compte ? Se connecter" : "Créer un compte"}
      </button>
    </div>
  );
}

export default Auth;
