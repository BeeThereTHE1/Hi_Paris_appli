const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/statsetudiant.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Statistiques Étudiants - Neural Playground</title>": "<title>Student Statistics - Neural Playground</title>",
  "Neural Dashboard Enseignant": "Teacher Neural Dashboard",
  "Neural Dashboard Étudiant": "Student Neural Dashboard",
  "Mon Espace": "My Space",
  "Ma Progression": "My Progress",
  "Page d'exercices": "Exercises page",
  "Espace Enseignant": "Teacher Space",
  "Suivi des Étudiants": "Student Tracking",
  "Astuce Pédagogique :": "Teaching Tip:",
  'Surveillez le temps passé par exercice. Si un étudiant y passe plus de 15 minutes, il bloque peut-être\\n                sur le "Gradient Killing" !': 'Monitor the time spent per exercise. If a student spends more than 15 minutes, they might be stuck\\n                on "Gradient Killing"!',
  "Suivi de Progression des Étudiants": "Student Progress Tracking",
  "Vue d'ensemble de la promotion": "Class overview",
  "Rechercher un étudiant (nom, prénom, email)...": "Search for a student (last name, first name, email)...",
  "Institution :": "Institution:",
  "Toutes les institutions": "All institutions",
  "Niveau :": "Level:",
  "Tous les niveaux": "All levels",
  "Débutant": "Beginner",
  "Intermédiaire": "Intermediate",
  "Expert": "Expert",
  "Trier par :": "Sort by:",
  "Nom (A-Z)": "Name (A-Z)",
  "Nom (Z-A)": "Name (Z-A)",
  "Exos validés (max-min)": "Validated exercises (max-min)",
  "Temps total (max-min)": "Total time (max-min)",
  "Institution (A-Z)": "Institution (A-Z)",
  "Aucun étudiant trouvé.": "No student found.",
  "Aucun exercice réalisé pour l'instant.": "No exercise completed yet.",
  "En cours": "In progress",
  "Sauvegardé": "Saved",
  "Actif": "Active",
  "Hors ligne": "Offline",
  "Non spécifiée": "Not specified",
  "Exos validés": "Validated exercises",
  "Score": "Score",
  "Temps total": "Total time",
  "Détails des exercices \\(": "Exercise details (",
  "Chargement des données réelles depuis Supabase...": "Loading real data from Supabase...",
  "Erreur lors de la connexion à la base de données : ": "Error connecting to the database: ",
  "Mon Historique": "My History",
  "Statistiques": "Statistics",
  "Déconnexion": "Logout"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('statsetudiant.html translated.');
