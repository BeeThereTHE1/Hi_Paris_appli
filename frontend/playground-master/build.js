const fs = require('fs');
const path = require('path');

const srcDir = './src';
const srcExosDir = './src/exos';
const outDir = './dist/exoquizjs';
const outExosDir = './dist/exoquizjs/exos';

// Crée les dossiers de sortie
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`📁 Dossier créé: ${outDir}`);
}
if (!fs.existsSync(outExosDir)) {
  fs.mkdirSync(outExosDir, { recursive: true });
  console.log(`📁 Dossier créé: ${outExosDir}`);
}

// ===== Copie les fichiers de base (dataset.js, heatmap.js, etc.) =====
const filesToCopy = ['dataset.js', 'heatmap.js', 'linechart.js', 'nn.js', 'playground.js', 'state.js'];

filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(outDir, file);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`📋 Copié: ${file}`);
  } else {
    console.log(`⚠️  ${file} non trouvé`);
  }
});

// ===== Copie TOUS les fichiers .js du dossier exos =====
// (Plus de compilation TypeScript - utilise les .js existants)
if (fs.existsSync(srcExosDir)) {
  const jsFiles = fs.readdirSync(srcExosDir).filter(f => f.endsWith('.js'));
  
  jsFiles.forEach(file => {
    const srcFile = path.join(srcExosDir, file);
    const destFile = path.join(outExosDir, file);
    
    try {
      fs.copyFileSync(srcFile, destFile);
      console.log(`📋 Copié exo: ${file}`);
    } catch (e) {
      console.error(`❌ Erreur en copiant ${file}: ${e.message}`);
    }
  });
  
  const jsCount = jsFiles.length;
  console.log(`\n✨ Build terminé ! ${filesToCopy.length} fichiers de base + ${jsCount} fichiers exos copiés.`);
} else {
  console.log(`\n⚠️  Dossier ${srcExosDir} non trouvé - Aucun fichier exo copié.`);
  console.log(`\n✨ Build terminé ! ${filesToCopy.length} fichiers de base copiés.`);
}

console.log(`\n📦 Fichiers prêts dans: ${outDir}`);
