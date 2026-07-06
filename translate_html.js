const fs = require('fs');
const path = require('path');

const dict = {
  "Retour vers page des exercices": "Back to exercises page",
  "Exercice suivant ⏭️": "Next exercise ⏭️",
  "Exercice suivant": "Next exercise",
  "Exercice précédent": "Previous exercise",
  "Mon historique": "My history",
  "Exercice Réussi !!": "Exercise Successful !!",
  "Parametre par défaut : LR =0,03,None Reg, ratio Training test = 0,5, pas de noise, Batch Size = 10": "Default parameter : LR =0.03, None Reg, ratio Training test = 0.5, no noise, Batch Size = 10",
  "Vous devez modifier les poids de la liaison entre X1 et l'output et X2 et l'output afin d'obtenir une droite qui sépare le plan en deux regions distinctes. Les points oranges et bleues doivent se trouver dans chaque région.": "You must modify the weights of the connection between X1 and the output and X2 and the output in order to obtain a line that separates the plane into two distinct regions. The orange and blue points must be in each region.",
  "Suivez les différentes étapes du tutoriel interactif. À la fin, les questions du quiz seront injectées ici automatiquement !": "Follow the different steps of the interactive tutorial. At the end, the quiz questions will be injected here automatically!",
  "Entraîne le modèle pour classifier les points sous forme de cercle sans couche cachée.": "Train the model to classify the points as a circle without a hidden layer.",
  "Dans un premier temps, entraîne le modèle uniquement avec les entrées linéaires X et Y et observe les limites de la frontière de décision.": "Initially, train the model only with the linear inputs X and Y and observe the limits of the decision boundary.",
  "Ensuite, active les caractéristiques quadratiques X² et Y², puis entraîne à nouveau pour réussir la classification (perte < 0.005 et au moins 1000 époques).": "Then, activate the quadratic features X² and Y², and train again to succeed in the classification (loss < 0.005 and at least 1000 epochs).",
  "Modifier les Poids": "Modify Weights",
  "Faites glisser les curseurs ou cliquez sur les liaisons entre X1, X2 et la sortie pour modifier leurs poids.": "Drag the sliders or click on the connections between X1, X2 and the output to modify their weights.",
  "Widget Traduction intégré": "Integrated Translation Widget",
  "vous ou créer": "you or create",
  "toutes les fonctionnalités": "all features",
  "du Parcours Pédagogique": "of the Learning Path",
  "les quiz intermédiaires": "intermediate quizzes",
  "blocs seront gérés": "blocks will be managed",
  "Bases de Données": "Databases",
  "listes seront chargées": "lists will be loaded",
  "PROFIL FUTURISTE INTÉGRÉ": "INTEGRATED FUTURISTIC PROFILE",
  "Visible si déconnecté": "Visible if disconnected",
  "de la bibliothèque": "from the library",
  "ration des données": "data ration",
  "permet de gérer": "allows to manage",
  "les exercices personnalisés": "custom exercises",
  "sidebar pour étudiant": "sidebar for student",
  "Si un étudiant": "If a student",
  "Rechercher un étudiant": "Search for a student",
  "Rechercher un exercice": "Search for an exercise",
  "Déconnexion": "Logout",
  "Accueil": "Home",
  "Page principale": "Main page",
  "Exercices de la communauté": "Community Exercises",
  "Créer un exercice": "Create an exercise",
  "Prêt à défier la communauté ? Soumettez vos propres réseaux !": "Ready to challenge the community? Submit your own networks!",
  "Tous": "All",
  "Facile": "Easy",
  "Intermédiaire": "Medium",
  "Difficile": "Hard",
  "Contenu de la partie basse du quiz": "Content of the bottom part of the quiz"
};

const dirs = ['frontend/pages', 'frontend/pages/exoquiz', 'frontend/pages/Page-demo'];

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('playground-master') && !fullPath.includes('Image')) {
                scanDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
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
console.log('Done translating HTML strings.');
