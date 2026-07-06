const fs = require('fs');
const path = require('path');

const files = [
    'frontend/playground-master/src/exos/exo2_page.ts',
    'frontend/playground-master/src/exos/exo2_page.js'
];

const dict = {
    "Contrôles de Simulation": "Simulation Controls",
    "Cliquez sur le bouton Play pour lancer l'apprentissage, ou utilisez les boutons Étape et Réinitialiser.": "Click the Play button to start training, or use the Step and Reset buttons.",
    "Nombre d'Époques": "Number of Epochs",
    "Ce compteur indique combien de fois l'ensemble du jeu de données a traversé le réseau de neurones.": "This counter indicates how many times the entire dataset has passed through the neural network.",
    "Perte d'Entraînement (Training Loss)": "Training Loss",
    "Cette valeur mesure l'erreur du modèle. Plus elle baisse et se rapproche de 0, plus le réseau apprend à classer correctement.": "This value measures the model's error. The lower it drops and approaches 0, the better the network learns to classify correctly.",
    "Graphique d'Évolution de la Perte": "Loss Evolution Graph",
    "Visualisez en temps réel la courbe de perte d'entraînement (et de test). Elle doit descendre progressivement pendant la simulation.": "Visualize the training (and test) loss curve in real time. It should drop progressively during the simulation."
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
