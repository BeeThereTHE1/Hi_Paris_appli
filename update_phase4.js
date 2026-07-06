const fs = require('fs');
const path = require('path');

const files = [
    'frontend/pages/Page-demo/historique.html',
    'frontend/pages/login.html',
    'frontend/pages/index.html',
    'frontend/pages/exoquiz/exo9_quiz.html',
    'frontend/pages/exoquiz/exo3_quiz.html',
    'frontend/pages/exo9.html',
    'frontend/pages/exo17.html',
    'frontend/pages/custom_exo_template.html',
    'frontend/pages/custom_exo_login.html',
    'frontend/pages/create.html',
    'frontend/pages/Page-demo/register.html'
];

const dict = {
    "❌ ${progressData.error || 'Erreur serveur'}": "❌ ${progressData.error || 'Server error'}",
    "Erreur chargement progress:": "Error loading progress:",
    "Erreur chargement soumissions prof:": "Error loading teacher submissions:",
    "⚠️ Erreur lors du chargement des soumissions.": "⚠️ Error loading submissions.",
    "Erreur : ": "Error : ",
    "Erreur lors de la récupération des données.": "Error retrieving data.",
    "Connexion réussie, on enregistre l'état": "Login successful, saving state",
    "Erreur stats utilisateurs:": "User stats error:",
    "Veuillez lire (2s)": "Please read (2s)",
    "Veuillez lire (3s)": "Please read (3s)",
    "Ensuite, active les caractéristiques quadratiques X² et Y², puis entraîne à nouveau pour réussir la classification (perte &lt; 0.005 et au moins 1000 époques).": "Then, activate the quadratic features X² and Y², and train again to successfully classify (loss &lt; 0.005 and at least 1000 epochs).",
    "Erreur badge:": "Badge error:",
    "Erreur inconnue": "Unknown error",
    "Erreur réseau:": "Network error:",
    "Erreur réseau.": "Network error.",
    "Exercice ajouté directement au catalogue (mode enseignant) ! 🚀": "Exercise added directly to the catalog (teacher mode)! 🚀",
    "⚠️ Veuillez choisir un jeu de données (Data) avant de finaliser l'exercice.": "⚠️ Please choose a dataset (Data) before finalizing the exercise.",
    "Inscription réussie, redirection...": "Registration successful, redirecting...",
    "Email déjà utilisé ou autre erreur base de données": "Email already used or other database error"
};

files.forEach(file => {
    let p = path.resolve(file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        let modified = false;
        for (let [fr, en] of Object.entries(dict)) {
            if (content.includes(fr)) {
                content = content.split(fr).join(en);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(p, content, 'utf8');
            console.log("Updated", p);
        }
    }
});
