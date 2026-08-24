const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = './src';
const outDir = './dist/exoquizjs';

// Crée le dossier de sortie
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Compile chaque fichier .ts individuellement
fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.ts')) {
    const input = path.join(srcDir, file);
    const output = path.join(outDir, file.replace('.ts', '.js'));
    
    execSync(`npx tsc "${input}" --outFile "${output}" --noImplicitAny false --lib es2015,dom`);
    console.log(`✅ Compilé: ${file} → ${output}`);
  }
});
