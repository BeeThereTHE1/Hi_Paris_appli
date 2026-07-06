const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/en_construction.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Bientôt Disponible - Hi! Paris Playground</title>": "<title>Coming Soon - Hi! Paris Playground</title>",
  "Oups! elle est en cours de création !": "Oops! It is under construction!",
  "Cette fonctionnalité est <b>en cours de développement par nos équipes</b> et sera bientôt disponible.": "This feature is <b>under development by our teams</b> and will be available soon.",
  "Retour à l'accueil": "Back to home"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('en_construction.html translated.');
