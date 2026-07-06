const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/view_custom_exo.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Prévisualisation Exercice</title>": "<title>Exercise Preview</title>",
  "Mode Prévisualisation": "Preview Mode",
  "Chargement...": "Loading...",
  "Retour à l'historique": "Back to history",
  "Exercice personnalisé": "Custom exercise",
  "Exercice introuvable.": "Exercise not found."
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('view_custom_exo.html translated.');
