const fs = require('fs');
const path = require('path');

const files = [
    'frontend/playground-master/src/exos/exo2_page.ts',
    'frontend/playground-master/src/exos/exo2_page.js'
];

files.forEach(file => {
    let p = path.resolve(file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        content = content.replace(
            /h3\.innerText = "Great!!";/g,
            `h3.innerText = "Great!";`
        );
        content = content.replace(
            /p\.innerText = "the model has successsfully learned to classify the data\. Now let's go back and review the different training steps\.";/g,
            `p.innerText = "The model has successfully learned to classify the data. Now let’s go back and review the different training steps.";`
        );

        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated", p);
    }
});
