const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/Page-demo/historique.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Historique des Exercices</title>": "<title>Exercise History</title>",
  "Revenir à la page d'exercises": "Return to exercises page",
  "Navigation": "Navigation",
  "Exercice Réalisé": "Completed Exercise",
  "Exercice sauvegardé dans mon profil": "Exercise saved in my profile",
  "Exercices Réalisés": "Completed Exercises",
  "Revoir l'exercice": "Review exercise",
  "Soumissions reçues pour validation": "Submissions received for validation",
  "Mes exercices en attente de validation": "My exercises pending validation",
  "Exercices sauvegardés": "Saved exercises",
  "Validation Étudiants": "Student Validation",
  "Mes Soumissions": "My Submissions",
  "Chargement...": "Loading...",
  "Chargement de votre historique...": "Loading your history...",
  "Vous n'avez pas encore terminé d'exercices.": "You have not completed any exercises yet.",
  "Vous n'avez pas d'exercices sauvegardés.": "You have no saved exercises.",
  "Vous n'avez pas encore d'activité.": "You have no activity yet.",
  "Aucun exercice sauvegardé.": "No saved exercises.",
  "Erreur lors de la récupération des données.": "Error retrieving data.",
  "Chargement des soumissions...": "Loading submissions...",
  "Aucun exercice en attente de validation.": "No exercises pending validation.",
  "Vous n'avez soumis aucun exercice.": "You have not submitted any exercises.",
  "Sans titre": "Untitled",
  "Pas de description": "No description",
  "Ouvrir l'exercice": "Open exercise",
  "Vous n'êtes pas connecté!": "You are not logged in!",
  "Profil": "Profile",
  "Mon Historique": "My History",
  "Mes Statistiques": "My Statistics",
  "Déconnexion": "Logout",
  "Exercice sans titre": "Untitled exercise",
  "Réalisé le": "Completed on",
  "Sauvegardé le": "Saved on",
  "Continuer": "Continue",
  "Revoir": "Review",
  "Statut :": "Status :",
  "Note prof :": "Teacher note :",
  "EN ATTENTE": "PENDING",
  "VALIDÉ": "VALIDATED",
  "REJETÉ": "REJECTED",
  "Voulez-vous valider cet exercice et le rendre public au catalogue ?": "Do you want to validate this exercise and make it public in the catalog?",
  "Exercice validé et ajouté au catalogue !": "Exercise validated and added to the catalog!",
  "Motif du rejet :": "Reason for rejection :",
  "Exercice rejeté.": "Exercise rejected.",
  "Voulez-vous vraiment supprimer cette soumission ?": "Do you really want to delete this submission?",
  "Soumission supprimée.": "Submission deleted.",
  "Voulez-vous vraiment supprimer cet exercice de vos": "Do you really want to delete this exercise from your",
  "exercices sauvegardés": "saved exercises",
  "exercices réalisés": "completed exercises",
  "Vous n'avez plus d'exercices": "You no longer have any exercises",
  "Erreur lors de la suppression. Veuillez réessayer.": "Error during deletion. Please try again.",
  ">Retour<": ">Back<"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('historique.html translated.');
