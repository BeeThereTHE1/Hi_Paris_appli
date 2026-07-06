const fs = require('fs');
const path = require('path');

const dirs = ['frontend/pages/exoquiz', 'frontend/playground-master/src/exos'];
const frenchStrings = new Set();
const fileStringsMap = {};

// VERY simple string extraction regex
const stringRegex = /(["'`])((?:(?=(\\?))\3.)*?)\1/g;

function containsFrenchWords(str) {
    if (str.match(/[éèàçùêâîôû]/i) || str.match(/\b(le|la|les|un|une|des|et|ou|où|qui|que|quoi|dont|dans|sur|sous|avec|sans|pour|par|il|elle|ils|elles|nous|vous|suis|es|est|sommes|êtes|sont|avez|ont|fait|faites)\b/i)) {
        return true;
    }
    return false;
}

function scanDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let match;
            while ((match = stringRegex.exec(content)) !== null) {
                let str = match[2];
                if (str.length > 3 && containsFrenchWords(str) && !str.includes('<svg') && !str.includes('<path')) {
                    // avoid HTML blocks if they are too noisy, but we need some HTML texts
                    frenchStrings.add(str);
                    if (!fileStringsMap[fullPath]) fileStringsMap[fullPath] = [];
                    fileStringsMap[fullPath].push(str);
                }
            }
        }
    });
}

dirs.forEach(scanDir);
fs.writeFileSync('french_strings.json', JSON.stringify(Array.from(frenchStrings), null, 2));
console.log('Saved to french_strings.json, count:', frenchStrings.size);
