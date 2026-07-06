const fs = require('fs');
const path = require('path');

const files = [
    'frontend/playground-master/src/playground.ts',
    'frontend/playground-master/src/playground.js'
];

const dict = {
    "Veillez relire la consigne! 😤": "Please reread the instructions! 😤",
    "Vous devez d'abord entraîner le modèle sur les 4 jeux de données en mode linéaire.": "You must first train the model on all 4 datasets in linear mode.",
    "Veuillez sélectionner le jeu de données Cercle.": "Please select the Circle dataset.",
    "Activez uniquement les caractéristiques X, Y, X² et Y².": "Activate only the X, Y, X² and Y² features.",
    "Veuillez configurer le réseau sans aucune couche cachée (0 couche cachée).": "Please configure the network with no hidden layers (0 hidden layers).",
    "L'entraînement doit atteindre au moins 1000 époques (Epochs).": "Training must reach at least 1000 epochs.",
    "La perte d'entraînement (loss) doit être inférieure à 0.005.": "The training loss must be less than 0.005.",
    "Cliquez sur double run afin de comparer": "Click on double run to compare",
    "Les pertes doivent être identiques ou très proches (diff < 0.01)": "Losses must be identical or very close (diff < 0.01)",
    "Plusieurs runs doivent être faits.": "Multiple runs must be done.",
    "Au moins un cas de divergence du learning rate doit être observé.": "At least one case of learning rate divergence must be observed.",
    "Les courbes de perte d'entraînement et de test doivent diverger d'au moins 0,005.": "The training and test loss curves must diverge by at least 0.005.",
    "Exercice non validé": "Exercise not validated"
};

files.forEach(file => {
    let p = path.resolve(file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        let modified = false;
        for (let [fr, en] of Object.entries(dict)) {
            if (content.includes(fr)) {
                content = content.split(fr).join(en);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(p, content, 'utf8');
            console.log("Updated", p);
        }
    }
});
