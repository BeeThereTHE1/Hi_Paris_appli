const fs = require('fs');
const path = require('path');

const dict = {
  "Veuillez sélectionner la bonne réponse": "Please select the correct answer",
  "toutes les différences": "all the differences",
  "les bonnes réponses": "the correct answers",
  "pour chaque catégorie": "for each category",
  "colonnes de synthèse": "summary columns",
  "dans le Schéma": "in the Diagram",
  "Parametre par défaut": "Default parameter",
  "sans couche cachée": "without hidden layer",
  "droite qui sépare": "line that separates",
  "dans chaque région": "in each region",
  "initialiser le réseau": "initialize the network",
  "tape par étape": "step by step",
  "type de frontière": "type of boundary",
  "ligne droite séparatrice": "separating straight line",
  "sur la frontière": "on the boundary",
  "suivant a ét": "following was",
  "affirmations ont ét": "statements were",
  "interactif des définitions": "interactive definitions",
  "questions ont reçu": "questions received",
  "Submit les réponses": "Submit the answers",
  "Widget Traduction intégr": "Integrated Translation Widget",
  "vous ou créer": "you or create",
  "toutes les fonctionnalités": "all features",
  "du Parcours Pédagogique": "of the Learning Path",
  "les quiz intermédiaires": "the intermediate quizzes",
  "blocs seront gér": "blocks will be managed",
  "Bases de Données": "Databases",
  "listes seront chargées": "lists will be loaded",
  "PROFIL FUTURISTE INTÉGR": "INTEGRATED FUTURISTIC PROFILE",
  "Visible si déconnect": "Visible if logged out",
  "de la bibliothèque": "of the library",
  "ration des données": "data ration",
  "permet de gérer": "allows to manage",
  "les exercices personnalisés": "custom exercises",
  "sidebar pour étudiant": "sidebar for student",
  "Si un étudiant": "If a student",
  "Rechercher un étudiant": "Search for a student"
};

const dirs = ['frontend/pages/exoquiz', 'frontend/pages', 'frontend/playground-master/src/exos'];

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (let [fr, en] of Object.entries(dict)) {
                if (content.includes(fr)) {
                    content = content.split(fr).join(en);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Translated in ${fullPath}`);
            }
        }
    });
}

dirs.forEach(scanDir);
console.log('Done translating quiz logic strings.');
