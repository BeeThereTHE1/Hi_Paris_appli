const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = './src';
const srcExosDir = './src/exos';
const outDir = './dist/exoquizjs';
const outExosDir = './dist/exoquizjs/exos';

// Crée les dossiers
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(outExosDir)) fs.mkdirSync(outExosDir, { recursive: true });

// Copie les fichiers de base
const filesToCopy = ['dataset.js', 'heatmap.js', 'linechart.js', 'nn.js', 'playground.js', 'state.js'];
filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(outDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`📋 Copié: ${file}`);
  }
});

// Compile TOUS les .ts du dossier exos (ignore les erreurs de types Node.js)
const tsFiles = fs.readdirSync(srcExosDir).filter(f => f.endsWith('.ts'));
tsFiles.forEach(file => {
  const input = path.join(srcExosDir, file);
  const output = path.join(outExosDir, file.replace('.ts', '.js'));
  
  try {
    // Force la compilation même avec des erreurs
    execSync(
      `npx tsc "${input}" --outFile "${output}" ` +
      `--noImplicitAny false --noEmitOnError false --skipLibCheck true ` +
      `--lib es2015,dom --allowJs true`,
      { stdio: 'pipe' }
    );
    console.log(`✅ Compilé: ${file}`);
  } catch (e) {
    // Même si tsc crash, on continue
    console.log(`⚠️  ${file} - Compilation forcée (ignoré erreurs)`);
    // Vérifie si le fichier .js a quand même été créé
    if (fs.existsSync(output)) {
      console.log(`   → Fichier généré malgré les erreurs`);
    }
  }
});

console.log(`✨ Build terminé !`);
