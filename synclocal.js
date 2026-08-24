const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  // Crée le répertoire de destination s'il n'existe pas
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Lit tous les fichiers du répertoire source
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // Récursif pour les sous-dossiers
      copyDir(srcPath, destPath);
    } else {
      // Copie le fichier
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copié: ${srcPath} → ${destPath}`);
    }
  });
}

// Synchronise TOUT le frontend vers dist
copyDir('frontend', 'dist');
console.log('✨ Synchronisation complète du frontend !');
