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

// Compile chaque fichier .ts individuellement
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
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

console.log(`✨ Build terminé ! ${files.length} fichiers compilés.`);
