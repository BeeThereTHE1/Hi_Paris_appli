const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/inactivite.js');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Veuillez vous connecter pour accéder aux exercices.": "Please connect to access the exercises.",
  "Cet exercice est verrouillé. Veuillez suivre la progression dans l'ordre.": "This exercise is locked. Please follow the progression in order.",
  "Vous devez d'abord réussir l'exercice avant de pouvoir accéder au quiz d'évaluation.": "You must first successfully complete the exercise before accessing the evaluation quiz.",
  "L'exercice ciblé est verrouillé. Veuillez d'abord terminer les exercices précédents et valider les quiz de section.": "The target exercise is locked. Please finish the previous exercises and validate the section quizzes first.",
  "Vous avez été déconnecté suite à 30 minutes d'inactivité.": "You have been disconnected due to 30 minutes of inactivity."
};

for (let [fr, en] of Object.entries(dict)) {
    content = content.split(fr).join(en);
}

fs.writeFileSync(target, content, 'utf8');
console.log('inactivite.js translated.');
