const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/custom_exo_template.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  '<title id="page-title">Exercice Personnalisé</title>': '<title id="page-title">Custom Exercise</title>',
  'Catalogue': 'Catalog',
  'Historique': 'History',
  'Chargement...': 'Loading...',
  'Récupération des instructions...': 'Retrieving instructions...',
  'Validation Enseignant': 'Teacher Validation',
  'Approuver': 'Approve',
  'Rejeter': 'Reject',
  'Motif du rejet...': 'Reason for rejection...',
  'Question du Quiz': 'Quiz Question',
  'Annuler': 'Cancel',
  'Confirmer': 'Confirm',
  'Réussi !!': 'Success!!',
  'Connexion': 'Login',
  'Mon Historique': 'My History',
  'Mes Statistiques': 'My Statistics',
  'Déconnexion': 'Logout',
  'Exercice introuvable': 'Exercise not found',
  'Objectif :': 'Objective:',
  'Non défini': 'Not defined',
  'Exercice Réussi !!': 'Exercise Success!!',
  'Approuver cet exercice ?': 'Approve this exercise?',
  'Approuvé !': 'Approved!',
  'Motif requis.': 'Reason required.',
  'Rejeté !': 'Rejected!',
  'Sélectionnez une réponse.': 'Select an answer.',
  'Bravo !': 'Congratulations!',
  'Mauvaise réponse.': 'Wrong answer.',
  'Veuillez vous connecter pour enregistrer votre réussite.': 'Please log in to record your success.',
  '✨ Validé !': '✨ Validated!',
  'Erreur lors de la validation : ': 'Error during validation: ',
  'Erreur réseau lors de la validation.': 'Network error during validation.',
  'Veuillez vous connecter pour sauvegarder cet exercice.': 'Please log in to save this exercise.',
  '✅ Enregistré !': '✅ Saved!',
  'Erreur lors de la sauvegarde : ': 'Error during save: ',
  'Erreur réseau lors de la sauvegarde.': 'Network error during save.',
  'Inconnu': 'Unknown'
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('custom_exo_template.html translated.');
