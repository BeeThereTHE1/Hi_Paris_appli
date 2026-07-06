const fs = require('fs');
const path = require('path');

const dir = 'frontend/playground-master/src/exos';

const dict = {
    "🚪 Déconnexion": "🚪 Logout",
    "Continuer": "Continue",
    "Suivant": "Next",
    "✨ Exercice Réussi !! Cliquez sur le bouton \\\"Take the quiz\\\" en bas à droite pour continuer.": "✨ Exercise Successful !! Click the \\\"Take the quiz\\\" button at the bottom right to continue.",
    "✨ Exercice Réussi !! Cliquez sur le bouton \\\"Take the quiz\\\" en bas à droite pour continuer vers le quiz final de l'exercice.": "✨ Exercise Successful !! Click the \\\"Take the quiz\\\" button at the bottom right to continue to the final quiz.",
    "✨ Exercice Réussi !! Cliquez sur le bouton \"Take the quiz\" en bas à droite pour continuer.": "✨ Exercise Successful !! Click the \"Take the quiz\" button at the bottom right to continue.",
    "✨ Exercice Réussi !! Cliquez sur le bouton \"Take the quiz\" en bas à droite pour continuer vers le quiz final de l'exercice.": "✨ Exercise Successful !! Click the \"Take the quiz\" button at the bottom right to continue to the final quiz.",
    "Le modèle a réussi à classifier les données circulaires without hidden layer grâce aux caractéristiques quadratiques (X² et Y²). Passons maintenant au quiz pour valider vos connaissances.": "The model successfully classified the circular data without hidden layers thanks to the quadratic features (X² and Y²). Let's now take the quiz to validate your knowledge.",
    "Activité 1": "Activity 1",
    "Activité 2": "Activity 2",
    "Activité 3": "Activity 3",
    "Activit\\u00E9 2": "Activity 2",
    "✅ Lecture complétée ! Cliquez sur <strong>NEXT</strong> pour lancer les modèles.": "✅ Reading completed! Click <strong>NEXT</strong> to start the models.",
    "✅ Lecture complétée ! Cliquez sur \\\"NEXT\\\" pour lancer les modèles.": "✅ Reading completed! Click \\\"NEXT\\\" to start the models.",
    "Consigne :": "Instruction :",
    "Observez attentivement l'évolution des poids (lignes de connexion) et des neurones dans les couches initiales (les premières couches à gauche).": "Carefully observe the evolution of the weights (connection lines) and neurons in the initial layers (the first layers on the left).",
    "Observez attentivement l'\\u00E9volution des poids (lignes de connexion) et des neurones dans les couches initiales (les premi\\u00E8res couches \\u00E0 gauche).": "Carefully observe the evolution of the weights (connection lines) and neurons in the initial layers (the first layers on the left).",
    "Laissez tourner les simulations jusqu'à ce que le compteur atteigne au moins <b>150 époques</b>.": "Let the simulations run until the counter reaches at least <b>150 epochs</b>.",
    "Laissez tourner les simulations jusqu'\\u00E0 ce que le compteur atteigne au moins \\u003cb\\u003e150 \\u00E9poques\\u003c/b\\u003e.": "Let the simulations run until the counter reaches at least \\u003cb\\u003e150 epochs\\u003c/b\\u003e.",
    "Modèle Sigmoid :": "Sigmoid Model :",
    "Mod\\u00E8le Sigmoid :": "Sigmoid Model :",
    "Arrêté (0 epochs)": "Stopped (0 epochs)",
    "Arr\\u00EAt\\u00E9 (0 epochs)": "Stopped (0 epochs)",
    "Arrêté (": "Stopped (",
    "Arr\\u00EAt\\u00E9 (": "Stopped (",
    "Modèle ReLU :": "ReLU Model :",
    "Mod\\u00E8le ReLU :": "ReLU Model :",
    "✅ Les deux modèles ont dépassé 150 époques. Cliquez sur <strong>Suivant</strong> pour classifier vos observations !": "✅ Both models have exceeded 150 epochs. Click <strong>Next</strong> to classify your observations!",
    "\\u2705 Les deux mod\\u00E8les ont d\\u00E9pass\\u00E9 150 \\u00E9poques. Cliquez sur \\u003cstrong\\u003eSuivant\\u003c/strong\\u003e pour classifier vos observations !": "\\u2705 Both models have exceeded 150 epochs. Click \\u003cstrong\\u003eNext\\u003c/strong\\u003e to classify your observations!",
    "Félicitations": "Congratulations",
    "Lancement des simulateurs": "Starting the simulators",
    "Lancez les deux modèles en parallèle dans le playground à gauche en cliquant sur le bouton <b>Play</b> (▶️) de chaque simulateur.": "Launch the two models in parallel in the playground on the left by clicking the <b>Play</b> (▶️) button on each simulator.",
    "Lancez les deux mod\\u00E8les en parall\\u00E8le dans le playground \\u00E0 gauche en cliquant sur le bouton \\u003cb\\u003ePlay\\u003c/b\\u003e (\\u25B6\\uFE0F) de chaque simulateur.": "Launch the two models in parallel in the playground on the left by clicking the \\u003cb\\u003ePlay\\u003c/b\\u003e (\\u25B6\\uFE0F) button on each simulator."
};

const files = fs.readdirSync(path.resolve(dir)).filter(f => f.startsWith('exo') && (f.endsWith('.js') || f.endsWith('.ts')));

files.forEach(file => {
    let p = path.resolve(dir, file);
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
});
