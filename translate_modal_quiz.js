const fs = require('fs');
const path = require('path');

const dict = {
  "Quiz 1 : Match les termes et leurs définitions": "Quiz 1 : Match the terms and their definitions",
  "Glissez-déposez les termes bleus dans les zones pointillées correspondantes, ou cliquez sur un terme puis sur sa zone cible.": "Drag and drop the blue terms into the corresponding dotted areas, or click on a term and then on its target area.",
  "Dépose ici": "Drop here",
  "Seuil requis": "Required threshold",
  "Retour aux exercices": "Back to exercises",
  "Submit my answers": "Submit my answers", 
  "Quiz 1 complété avec succès.": "Quiz 1 successfully completed.",
  "Passage au Quiz 2 dans 2 secondes...": "Moving to Quiz 2 in 2 seconds...",
  "Quiz complété avec succès.": "Quiz successfully completed.",
  "Calcul des résultats...": "Calculating results..."
};

const dirs = ['frontend/playground-master/src/exos'];

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

scanDir(dirs[0]);
console.log('Done translating missing modal quiz strings.');
