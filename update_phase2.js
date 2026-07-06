const fs = require('fs');
const path = require('path');

const files = [
    'frontend/playground-master/src/exos/storage_service.ts',
    'frontend/playground-master/src/exos/storage_service.js',
    'frontend/playground-master/src/exos/custom_exo_template.ts',
    'frontend/playground-master/src/exos/custom_exo_template.js',
    'custom_exo_template.js'
];

const dict = {
    "Veuillez sélectionner la bonne réponse.": "Please select the correct answer.",
    "Brouillon mis à jour avec succès ! ✨": "Draft successfully updated! ✨",
    "Bravo ! Bonne réponse ✨. L'exercice est maintenant marqué comme réussi.": "Good job! Correct answer ✨. The exercise is now marked as completed.",
    "Congratulations ! Votre exercice est maintenant publié dans le catalogue officiel. 🚀": "Congratulations! Your exercise is now published in the official catalog. 🚀",
    "Félicitations ! Votre exercice est maintenant publié dans le catalogue officiel. 🚀": "Congratulations! Your exercise is now published in the official catalog. 🚀",
    "Erreur réseau. Vérifiez que le serveur est lancé.": "Network error. Check that the server is running.",
    "❌ Erreur API sauvegarde:": "❌ API error saving:",
    "❌ Erreur API validation:": "❌ API error validating:",
    "❌ Erreur unSave:": "❌ Error unSave:",
    "❌ Erreur unComplete:": "❌ Error unComplete:",
    "Erreur lors de la sauvegarde": "Error during save",
    "Erreur lors de la validation": "Error during validation"
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
