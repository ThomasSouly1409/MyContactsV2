import { useEffect, useState } from "react";

function Contacts({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [newContact, setNewContact] = useState({ firstName: "", lastName: "", phone: "" });
  const token = localStorage.getItem("token");

  const loadContacts = async () => {
    try {
      const res = await fetch("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadContacts();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
    });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setEditingContact(null);
        loadContacts();
      } else {
        const err = await res.json();
        alert("Erreur : " + err.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();

    if (!newContact.firstName || !newContact.lastName || !newContact.phone) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    try {
      const res = await fetch("/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContact),
      });

      if (res.ok) {
        setNewContact({ firstName: "", lastName: "", phone: "" });
        loadContacts();
      } else {
        const err = await res.json();
        alert("Erreur : " + err.error);
      }
    } catch (error) {
      console.error("Erreur lors de l’ajout :", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2> Mes Contacts</h2>

      <button onClick={onLogout} style={{ marginBottom: "20px" }}>
         Déconnexion
      </button>

      {/* ➕ Formulaire d’ajout */}
      <form onSubmit={handleAddContact} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Prénom"
          value={newContact.firstName}
          onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={newContact.lastName}
          onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          required
        />
        <button type="submit"> Ajouter</button>
      </form>

      {/* 📋 Liste des contacts */}
      {contacts.length === 0 && <p>Aucun contact trouvé.</p>}

      {Array.isArray(contacts) && contacts.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px auto",
            width: "300px",
          }}
        >
          {editingContact === c._id ? (
            <>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button onClick={() => handleSave(c._id)}> Sauvegarder</button>
              <button onClick={() => setEditingContact(null)}> Annuler</button>
            </>
          ) : (
            <>
              <p>
                <strong>{c.firstName} {c.lastName}</strong><br />
                 {c.phone}
              </p>
              <button onClick={() => handleEdit(c)}> Modifier</button>
              <button onClick={() => handleDelete(c._id)}> Supprimer</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Contacts;
