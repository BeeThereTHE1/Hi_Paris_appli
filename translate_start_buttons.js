const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'frontend/playground-master/src/exos/exercises.ts',
    'frontend/playground-master/src/exos/exercises.js'
];

const replacements = {
    "Commencer →": "Start →",
    "Commencer \\u2192": "Start \\u2192",
    "Recommencer →": "Restart →",
    "Évaluer →": "Evaluate →",
    "Recommencer le Quiz": "Restart the Quiz"
};

filesToUpdate.forEach(file => {
    const fullPath = path.resolve(file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        for (const [fr, en] of Object.entries(replacements)) {
            if (content.includes(fr)) {
                content = content.split(fr).join(en);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
