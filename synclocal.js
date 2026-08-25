const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copié: ${srcPath} → ${destPath}`);
    }
  });
}

// Synchronise TOUT le frontend vers dist
copyDir('frontend', 'dist');

// Corrige les chemins dans les fichiers HTML des quiz
const quizHtmlDir = 'dist/pages/exoquiz';
const quizFiles = fs.readdirSync(quizHtmlDir).filter(f => f.endsWith('_quiz.html'));

quizFiles.forEach(file => {
  const filePath = path.join(quizHtmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remplace le chemin vers storage_service.js et les fichiers compilés
  content = content.replace(
    /<script src="..\/playground-master\/src\/exos\/storage_service.js"><\/script>/,
    '<script src="../../playground-master/dist/exoquizjs/exos/storage_service.js"></script>'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✏️  Corrigé: ${file}`);
});

console.log('✨ Synchronisation et correction des chemins complétées !');
