const fs = require('fs');
const path = require('path');

const dir = 'frontend/playground-master/src/exos';

const dict = {
    "Modifier les Poids": "Modify Weights",
    "Faites glisser les curseurs ou cliquez sur les liaisons entre X1, X2 et la sortie pour modifier leurs poids.": "Drag the sliders or click on the connections between X1, X2, and the output to modify their weights.",
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
