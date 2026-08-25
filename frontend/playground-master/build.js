const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = './src';
const outDir = './dist/exoquizjs';

// Crée le dossier de sortie
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`📁 Dossier créé: ${outDir}`);
}

// Fichiers à copier directement (au lieu de compiler)
const filesToCopy = ['dataset.js', 'heatmap.js', 'linechart.js', 'nn.js', 'playground.js', 'state.js'];

// Copie les fichiers .js existants
filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(outDir, file);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`📋 Copié: ${file} → ${destFile}`);
  } else {
    console.log(`⚠️  ${file} non trouvé`);
  }
});

// Compile uniquement les fichiers .ts (sauf ceux à copier)
const tsFiles = fs.readdirSync(srcDir).filter(f => {
  return f.endsWith('.ts') && !filesToCopy.map(f => f.replace('.js', '.ts')).includes(f);
});

tsFiles.forEach(file => {
  const input = path.join(srcDir, file);
  const output = path.join(outDir, file.replace('.ts', '.js'));
  
  try {
    execSync(`npx tsc "${input}" --outFile "${output}" --noImplicitAny false --noEmitOnError false --skipLibCheck true --lib es2015,dom`, {
      stdio: 'pipe'
    });
    console.log(`✅ Compilé: ${file} → ${output}`);
  } catch (e) {
    console.log(`⚠️  ${file} compilé avec erreurs (ignorées)`);
  }
});

console.log(`✨ Build terminé ! ${filesToCopy.length} fichiers copiés, ${tsFiles.length} fichiers compilés.`);
