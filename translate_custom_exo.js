const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/custom_exo.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Retour": "Back",
  "Mon historique": "My history",
  "Vous n'êtes pas connecté!": "You are not logged in!"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('custom_exo.html translated.');
