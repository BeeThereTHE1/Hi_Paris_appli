const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'frontend/playground-master/src/exos/exercises.ts',
    'frontend/playground-master/src/exos/exercises.js'
];

const replacements = {
    "Glissez-déposez chaque affirmation dans la zone VRAI ou FAUX correspondante, ou cliquez sur une carte puis sur une zone.": "Drag and drop each statement into the TRUE or FALSE zone, or click on a card and then on a zone.",
    "👍 VRAI": "👍 TRUE",
    "👎 FAUX": "👎 FALSE",
    "Déposez une carte pour voir le feedback ici.": "Drop a card here to see feedback."
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
