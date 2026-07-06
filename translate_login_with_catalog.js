const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/Page-demo/login_with_catalog.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Neural Playground — Connexion</title>": "<title>Neural Playground — Login</title>",
  "Page principale": "Main page",
  "Vous n'êtes pas connecté!": "You are not logged in!",
  "Mon Historique": "My History",
  "Statistiques": "Statistics",
  "Déconnexion": "Logout",
  "Adresse Mail": "Email Address",
  "Mot de passe": "Password",
  "Mot de passe oublié ?": "Forgot password?",
  "Se connecter": "Login",
  "Pas encore de compte ?": "Don't have an account yet?",
  "S'inscrire": "Register",
  "Que souhaitez-vous faire ?": "What do you want to do?",
  "Choisir un<br>exercice": "Choose an<br>exercise",
  "Parcourir la bibliothèque des exercices": "Browse the exercise library",
  "Créer un<br>exercice": "Create an<br>exercise",
  "Concevoir votre propre exercice": "Design your own exercise",
  "Catalogue<br>complet": "Full<br>catalog",
  "Consulter le catalogue": "Consult the catalog",
  "Veuillez remplir tous les champs.": "Please fill in all fields.",
  "Connexion en cours…": "Logging in...",
  "Adresse e-mail introuvable.": "Email address not found.",
  "Mot de passe incorrect.": "Incorrect password.",
  "Connecté !": "Logged in!",
  "Bienvenue, ": "Welcome, ",
  "Serveur inaccessible.": "Server unreachable.",
  "Ouverture de la bibliothèque d\\'exercices…": "Opening the exercise library..."
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('login_with_catalog.html translated.');
