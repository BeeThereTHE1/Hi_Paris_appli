const fs = require('fs');
const path = require('path');

const dir = 'frontend/playground-master/src/exos';

const dict = {
    "Modifier les Poids": "Modify Weights",
    "Modifier le Biais": "Modify Bias"
};

const files = fs.readdirSync(path.resolve(dir)).filter(f => f.startsWith('exo') && (f.endsWith('.js') || f.endsWith('.ts')));

files.forEach(file => {
    let p = path.resolve(dir, file);
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
});
