export default function Dashboard({ onLogout }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur le Dashboard !</h1>
      <button onClick={onLogout}>Se déconnecter</button>
    </div>
  );
}
