const fs = require('fs');
const path = require('path');

const targetStr = "Vous n\\'êtes pas connecté!";
const replaceStr = "You are not connected!";

const dirs = ['frontend/pages', 'frontend/playground-master/src'];

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('Image')) scanDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(targetStr)) {
                content = content.split(targetStr).join(replaceStr);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed in ${fullPath}`);
            }
        }
    });
}

scanDir(dirs[0]);
scanDir(dirs[1]);
console.log('Fixed escaped apostrophe string.');
