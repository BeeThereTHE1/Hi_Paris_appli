const fs = require('fs');
const path = require('path');

const dict = {
  "Exercice validé en base de données": "Exercise validated in database",
  "Exercice R\u00e9ussi": "Exercise Successful",
  "Faire le quiz suivant": "Take next quiz",
  "Faire le quiz": "Take the quiz",
  "F\u00e9licitations !": "Congratulations !",
  "Mise à jour effectuée": "Update done",
  "Exercice marqué COMPLETED": "Exercise marked COMPLETED",
  "Erreur lors de la sauvegarde": "Error during saving",
  "Erreur réseau sauvegarde": "Network error saving",
  "Erreur lors de la validation": "Error during validation",
  "Erreur réseau validation": "Network error validation",
  "Cet exercice est déjà dans votre profil.": "This exercise is already in your profile.",
  "Vous avez déjà validé cet exercice": "You have already validated this exercise",
  "LOGIQUE DE DÉROULEMENT": "EXECUTION LOGIC",
  "Popup de succès": "Success Popup",
  "signal de succès": "success signal",
  "TUTORIEL INTERACTIF ÉTAPE": "INTERACTIVE TUTORIAL STEP",
  "Séparez les données": "Separate the data",
  "Entraînez le réseau": "Train the network",
  "Linéaire vs Non-linéaire": "Linear vs Non-linear",
  "Éditeur de biais": "Bias Editor",
  "Certains choix erronés": "Some wrong choices",
  "les deux modèles": "both models",
  "les bonnes réponses": "the correct answers",
  "Gestion du scénario": "Scenario management",
  "Permettre la réussite": "Allow success",
  "Mise en évidence": "Highlighting",
  "Auto suppression après": "Auto delete after",
  "indicateur de succès": "success indicator",
  "Valeurs par défaut": "Default values",
  "un des modèles": "one of the models",
  "les plus utilisés": "the most used"
};

const dirs = ['frontend/playground-master/src', 'frontend/pages/exoquiz'];

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (let [fr, en] of Object.entries(dict)) {
                if (content.includes(fr)) {
                    content = content.split(fr).join(en);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Translated in ${fullPath}`);
            }
        }
    });
}

dirs.forEach(scanDir);
console.log('Done translating TS/JS strings.');
