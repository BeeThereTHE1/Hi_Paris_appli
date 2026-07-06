const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/catalog.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>HiParis - Catalogue Technologique</title>": "<title>HiParis - Technology Catalog</title>",
  "🏠 Accueil": "🏠 Home",
  "Architecture des Données": "Data Architecture",
  "Spirale": "Spiral",
  "Architecture Réseau": "Network Architecture",
  "Couches cachées": "Hidden Layers",
  "Paramètres du Moteur": "Engine Parameters",
  "Aperçu Composant": "Component Preview",
  "Éditeur Studio": "Studio Editor",
  "Sélectionnez un module pour\\n                    visualiser son intégration dans le simulateur.": "Select a module to\\n                    preview its integration in the simulator.",
  "Sélectionnez un module pour visualiser son intégration dans le simulateur.": "Select a module to preview its integration in the simulator.",
  "Créer": "Create",
  "Modifier": "Edit",
  "Fonctionnalité à venir": "Upcoming feature",
  "Supprimer": "Delete",
  "Connexion": "Login",
  "Historique": "History",
  "Déconnexion": "Logout"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('catalog.html translated.');
