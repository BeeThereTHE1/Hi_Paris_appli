const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/custom_exo_login.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Neural Playground - Finalisation</title>": "<title>Neural Playground - Finalization</title>",
  "Modifier l'Architecture": "Edit Architecture",
  "Étape Finale": "Final Step",
  "Soumission du Projet": "Project Submission",
  "Description de l'exercice": "Exercise Description",
  "Expliquez l'objectif pédagogique...": "Explain the educational objective...",
  "Question du Quiz": "Quiz Question",
  "Insérer la question du quiz...": "Insert the quiz question...",
  "Options de réponse (Cochez la bonne)": "Answer Options (Check the correct one)",
  "Ajouter une option": "Add an option",
  "Publier au Catalogue": "Publish to Catalog",
  "Sauvegarder\\n      en brouillon": "Save as draft",
  "Option 1....": "Option 1...",
  "Option 2....": "Option 2...",
  "Réponse...": "Answer...",
  "Brouillon enregistré en base de données !": "Draft saved to the database!",
  "Vous pourrez le compléter et le publier depuis votre historique.": "You can complete and publish it from your history.",
  "Erreur lors de la sauvegarde : ": "Error saving: ",
  "Erreur réseau. Vérifiez votre connexion.": "Network error. Check your connection.",
  "Erreur : La description et la question du quiz doivent faire au moins 50 caractères chacune.": "Error: The description and quiz question must be at least 50 characters each.",
  "Exercice ajouté directement au catalogue (mode enseignant) ! 🚀": "Exercise added directly to the catalog (teacher mode)! 🚀",
  "Erreur lors de la publication : ": "Error publishing: ",
  "Erreur réseau lors de la publication.": "Network error while publishing.",
  "Soumettre à un enseignant": "Submit to a teacher",
  "Choisissez l'enseignant qui devra valider votre exercice :": "Choose the teacher who will validate your exercise:",
  "Annuler": "Cancel",
  "Envoyer\\n          pour validation": "Send for validation",
  "Envoyer pour validation": "Send for validation",
  "Chargement des enseignants...": "Loading teachers...",
  "Aucun enseignant disponible": "No teachers available",
  "Erreur de chargement": "Loading error",
  "Veuillez choisir un enseignant valide.": "Please choose a valid teacher.",
  "Exercice envoyé pour validation !": "Exercise sent for validation!",
  "Erreur lors de la soumission : ": "Error during submission: ",
  "Erreur réseau lors de la soumission.": "Network error during submission.",
  "Mon Historique": "My History",
  "Mes Statistiques": "My Statistics",
  "Déconnexion": "Logout",
  "Connexion": "Login"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('custom_exo_login.html translated.');
