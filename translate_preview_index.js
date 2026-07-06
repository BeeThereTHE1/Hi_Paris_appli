const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/preview_index.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Capture l'état actuel pour comparer": "Capture the current state to compare",
  "Cliquez sur une liaison": "Click on a link",
  "Valeur :": "Value :",
  "Cliquez sur le biais d'un neurone": "Click on a neuron's bias",
  "Effacer le snapshot": "Clear the snapshot",
  "Exercice 1": "Exercise 1"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('preview_index.html translated.');
