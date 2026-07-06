const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/evaluate.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Evaluation des connaissances</title>": "<title>Knowledge Assessment</title>",
  "Veuillez lire (2s)": "Please read (2s)",
  "Veuillez lire": "Please read",
  "Retour vers page des exercices": "Back to exercises page",
  "Mon historique": "My history"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('evaluate.html translated.');
