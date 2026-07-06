const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/create.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Neural Playground - Studio de Création</title>": "<title>Neural Playground - Creation Studio</title>",
  "Retour": "Back",
  "Accueil": "Home",
  "Composez votre environnement d'apprentissage.": "Compose your learning environment.",
  "Veuillez\\n                    d'abord choisir une data": "Please\\n                    choose a dataset first",
  "Veuillez d'abord choisir une data": "Please choose a dataset first",
  "Spirale": "Spiral",
  "Couches\\n                                    cachées": "Hidden\\n                                    Layers",
  "Couches cachées": "Hidden Layers",
  "Outils Avancés": "Advanced Tools",
  "Bouton\\n                                    Submit": "Submit\\n                                    Button",
  "Bouton Submit": "Submit Button",
  "Finaliser & Publier": "Finalize & Publish",
  "Veuillez choisir un jeu de données (Data) avant de finaliser l'exercice.": "Please choose a dataset before finalizing the exercise.",
  "Vous n'êtes pas connecté!": "You are not logged in!",
  "Mon Historique": "My History",
  "Déconnexion": "Logout",
  "Connexion": "Login"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('create.html translated.');
