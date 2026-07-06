const fs = require('fs');
const path = require('path');

const files = [
    'frontend/playground-master/src/exos/exo2_page.ts',
    'frontend/playground-master/src/exos/exo2_page.js'
];

files.forEach(file => {
    let p = path.resolve(file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        const frText = "Dans cet exercice, vous allez apprendre à lancer l'entraînement du réseau de neurones et suivre ses performances à l'aide de l'affichage des époques, de la perte (loss) et de sa courbe d'évolution.";
        const enText = "Launch the training of the neural network using the step-by-step button and observe how the weighs change and the loss decreases over time. Once training is complete, we will walk through the training process step by step.<br><br>First, hover over parameters to view their definitions.";
        
        content = content.split(frText).join(enText);

        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated", p);
    }
});
