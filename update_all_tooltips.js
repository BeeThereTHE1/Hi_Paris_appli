const fs = require('fs');
const path = require('path');

const dir = 'frontend/playground-master/src/exos';

const dict = {
    "Poids (Weight)": "Weight",
    "Représente l'importance d'une connexion. Vous pouvez cliquer sur la barre colorée pour l'éditer, ou la glisser vers le haut/bas pour ajuster sa valeur.": "Represents the importance of a connection. You can click on the colored bar to edit it, or drag it up/down to adjust its value.",
    
    "Connexion A": "Connection A",
    "Cette ligne a un poids très faible (proche de 0). Modifiez-la avec la souris (cliquez-glissez sur la barre de valeur) pour voir l'impact.": "This line has a very low weight (close to 0). Modify it with the mouse (click and drag on the value bar) to see the impact.",
    
    "Neurone B": "Neuron B",
    "Ce neurone combine les entrées reçues. Regardez sa couleur pour comprendre sa sortie (activation).": "This neuron combines the received inputs. Look at its color to understand its output (activation).",
    
    "Connexion C": "Connection C",
    "Une connexion avec un poids négatif fort (orange foncé). L'information est inversée ou pénalisée.": "A connection with a strong negative weight (dark orange). The information is inverted or penalized.",
    
    "Sortie Globale (Heatmap)": "Global Output (Heatmap)",
    "L'image finale montre la frontière de décision du modèle. La couleur indique la prédiction pour chaque point (ex: bleu clair = prédiction positive forte).": "The final image shows the model's decision boundary. The color indicates the prediction for each point (e.g., light blue = strong positive prediction).",
    
    "Biais (Bias)": "Bias",
    "Le biais est un paramètre supplémentaire (souvent représenté par +1 ou un nœud indépendant) qui permet de décaler la fonction d'activation.\\nModifiez sa valeur pour voir comment la courbe de décision se déplace indépendamment des poids.": "The bias is an additional parameter (often represented by +1 or an independent node) that shifts the activation function.\\nChange its value to see how the decision curve moves independently of the weights."
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
