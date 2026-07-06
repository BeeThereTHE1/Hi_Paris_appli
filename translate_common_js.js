const fs = require('fs');
const path = require('path');

const dict = {
  "Vous n'êtes pas connecté avec le compte qui a créé l'exercice": "You are not connected with the account that created the exercise",
  "Vous n'êtes pas connecté": "You are not connected",
  "Vous avez été déconnecté": "You have been disconnected",
  "Veuillez vous connecter pour sauvegarder cet exercice.": "Please log in to save this exercise.",
  "Veuillez vous connecter pour accéder aux exercices.": "Please log in to access the exercises.",
  "Cet exercice est verrouillé": "This exercise is locked",
  "Veuillez d'abord terminer les exercices précédents et valider les quiz de section": "Please finish previous exercises and validate section quizzes first",
  "Vous devez d'abord réussir l'exercice avant de pouvoir accéder au quiz": "You must first succeed in the exercise before accessing the quiz",
  "Exercice R\u00e9ussi !!": "Exercise Successful !!",
  "Faire le quiz suivant": "Take the next quiz",
  "Faire le quiz": "Take the quiz",
  "Félicitations !": "Congratulations !",
  "Félicitations, vous avez obtenu un score de": "Congratulations, you got a score of",
  "Bravo ! Bonne réponse": "Well done ! Good answer",
  "Dommage, ce n'est pas la bonne réponse": "Too bad, it's not the right answer",
  "Mise à jour effectuée": "Update done",
  "Exercice validé en base de données": "Exercise validated in database",
  "Exercice marqué COMPLETED": "Exercise marked COMPLETED",
  "Exercice sauvegardé": "Exercise saved",
  "Erreur lors de la sauvegarde": "Error during saving",
  "Erreur réseau sauvegarde": "Network error saving",
  "Erreur lors de la validation": "Error during validation",
  "Erreur réseau validation": "Network error validation",
  "Mode Prévisualisation activé": "Preview Mode activated",
  "Prévisualisation Studio": "Studio Preview",
  "Ceci est un aperçu de votre configuration actuelle": "This is a preview of your current configuration",
  "Brouillon mis à jour avec succès !": "Draft updated successfully !",
  "Exercice chargé avec succès": "Exercise loaded successfully",
  "Non défini": "Undefined",
  "Annuler": "Cancel",
  "Enregistrer le brouillon": "Save draft",
  "Publier au Catalogue": "Publish to Catalog",
  "Ajouter une option": "Add an option",
  "Veuillez sélectionner la bonne réponse": "Please select the correct answer",
  "Validation déclenchée depuis le Playground": "Validation triggered from Playground",
  "Enregistré !": "Saved !",
  "Validé !": "Validated !",
  "Quiz Section": "Quiz Section",
  "Validation de la Section": "Validation of the Section",
  "Le Saviez-vous ?": "Did you know ?",
  "Certaines réponses sont incorrectes": "Some answers are incorrect",
  "Veuillez répondre à toutes les affirmations": "Please answer all statements",
  "Terminer et Sauvegarder !": "Finish and Save !",
  "Testez vos acquis théoriques": "Test your theoretical knowledge",
  "Évaluer →": "Evaluate →",
  "L'intelligence artificielle est pleine de surprises !": "Artificial intelligence is full of surprises !",
  "Recommandations de révision": "Revision recommendations",
  "Vous maîtrisez parfaitement les concepts": "You perfectly master the concepts",
  "Continuer le Parcours": "Continue the Path",
  "Recommencer le Quiz": "Restart the Quiz",
  "CERTIFICAT DE RÉUSSITE": "CERTIFICATE OF SUCCESS",
  "Le présent certificat est décerné à": "This certificate is awarded to",
  "Pour avoir complété avec succès l'intégralité du parcours pédagogique": "For having successfully completed the entire learning path",
  "et validé l'évaluation finale de Neural Playground": "and validated the final evaluation of Neural Playground",
  "Délivré le ": "Issued on ",
  "Cet exercice est déjà dans votre profil.": "This exercise is already in your profile.",
  "Vous avez déjà validé cet exercice": "You have already validated this exercise",
  "Non lancé": "Not launched"
};

const dirs = ['frontend/pages', 'frontend/playground-master/src'];

function scanDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.js')) {
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
console.log('Done translating general JS strings.');
