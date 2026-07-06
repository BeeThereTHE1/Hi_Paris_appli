const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/login.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Page principale": "Home page",
  "Vous n'êtes pas connecté!": "You are not logged in!",
  "Mon Historique": "My History",
  "Déconnexion": "Logout",
  "Connectez-vous ou créer un compte pour profiter de toutes les fonctionnalités de la plateforme": "Log in or create an account to enjoy all platform features",
  ">Identifiant<": ">Username or Email<",
  "Votre identifiant ou e-mail": "Your username or email",
  "Token reçu par mail": "Token received by email",
  "Votre token (ex : A3F9B2C1)": "Your token (e.g., A3F9B2C1)",
  "Afficher / masquer": "Show / hide",
  "Token oublié": "Forgot token",
  "Créer un compte": "Create an account",
  "Se connecter": "Log in",
  "Que souhaitez-vous faire ?": "What would you like to do?",
  "Choisir un<br>exercice": "Choose an<br>exercise",
  "Parcourir la bibliothèque des exercices": "Browse the exercise library",
  "Créer un<br>exercice": "Create an<br>exercise",
  "Concevoir votre propre exercice": "Design your own exercise",
  "Saisissez d'abord votre email ci-dessus.": "Please enter your email above first.",
  "Envoi en cours…": "Sending…",
  "Nouveau token envoyé sur": "New token sent to",
  "Erreur réseau. Réessayez.": "Network error. Please try again.",
  "Veuillez remplir tous les champs.": "Please fill in all fields.",
  "Vérification...": "Verifying...",
  "Erreur de connexion": "Connection error",
  "✓ Connecté !": "✓ Logged in!",
  "✅ Bienvenue, ": "✅ Welcome, ",
  "Ouverture de la bibliothèque d'exercices…": "Opening exercise library…",
  "Ouverture de l'éditeur d'exercice…": "Opening exercise editor…"
};

for (const [fr, en] of Object.entries(dict)) {
  content = content.split(fr).join(en);
}

fs.writeFileSync(target, content, 'utf8');
console.log('login.html translated.');
