cd backend
npm install
npm run dev
Le serveur sera disponible sur http://localhost:4000

Auth :
POST	/auth/register	Inscription d’un utilisateur
POST	/auth/login	    Connexion et récupération JWT

Contacts : 
GET	    /contacts	    Récupérer tous les contacts
GET	    /contacts/:id	Récupérer un contact par ID
POST	/contacts	    Ajouter un contact
PATCH	/contacts/:id	Modifier un contact
DELETE	/contacts/:id	Supprimer un contact

Identifiant test:
Email	            Password
test1@example.com    123

Setup :
Node.js >= 16
NPM >= 8
Compte MongoDB Atlas ou local
Git