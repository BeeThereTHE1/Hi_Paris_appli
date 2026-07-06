const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/Page-demo/exercises.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Bibliothèque d'exercices": "Exercise Library",
  "Accueil": "Home",
  "Page principale": "Main page",
  "Mon historique": "My history",
  "Créer un exercice": "Create an exercise",
  "Statistiques": "Statistics",
  "Prêt à défier la communauté ? Soumettez vos\\n          propres réseaux !": "Ready to challenge the community? Submit your own networks!",
  "Choisissez un exercice pour commencer votre apprentissage": "Choose an exercise to start learning",
  "Rechercher un exercice…": "Search for an exercise...",
  "Tous": "All",
  "Facile": "Easy",
  "Intermédiaire": "Medium",
  "Difficile": "Hard",
  "Total :": "Total:",
  "Facile :": "Easy:",
  "Intermédiaire :": "Medium:",
  "Difficile :": "Hard:",
  "Complétez ces 3 étapes introductives pour débloquer le parcours :": "Complete these 3 introductory steps to unlock the path:",
  "Faites le point sur vos connaissances initiales en mathématiques et programmation.": "Assess your initial knowledge in mathematics and programming.",
  "Non visité": "Not visited",
  "Commencer": "Start",
  "Accédez à des fiches récapitulatives et des cours pour vous mettre à niveau.": "Access summary sheets and courses to get up to speed.",
  "Consulter": "Consult",
  "Découvrez comment manipuler l'interface interactive du Neural Playground.": "Discover how to manipulate the interactive interface of the Neural Playground.",
  "Construis ton propre exercice": "Build your own exercise",
  "Utilisez le Studio pour concevoir un exercice interactif complet (énoncé, solution,\\n                architecture) pour la communauté.": "Use the Studio to design a complete interactive exercise (statement, solution, architecture) for the community.",
  "Aucun exercice créé": "No exercise created",
  "Studio →": "Studio →",
  "Certification de réussite": "Certificate of Success",
  "Validez tous les quiz intermédiaires, le quiz final et\\n                créez un exercice pour débloquer votre certificat de validation.": "Validate all intermediate quizzes, the final quiz and create an exercise to unlock your validation certificate.",
  "Télécharger le\\n                  Certificat": "Download Certificate",
  "Exercices de la communauté": "Community Exercises",
  "Aucun exercice trouvé": "No exercise found",
  "Essayez un autre mot-clé ou modifiez les filtres": "Try another keyword or modify the filters",
  "Le Saviez-vous ?": "Did you know?",
  "Validation de Section": "Section Validation",
  "Submit mes réponses": "Submit my answers",
  "Commencer →": "Start →",
  "Consulter →": "Consult →"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('exercises.html translated.');
