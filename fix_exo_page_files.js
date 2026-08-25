#!/usr/bin/env node

/**
 * Script pour récupérer les fichiers exo*_page.js d'Éric et corriger les numéros
 * Usage: node fix_exo_page_files.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ERIC_REPO = 'https://raw.githubusercontent.com/ericpapain/Hi_Paris_Parcours_pedagogique/e03df3e300abcc23d574d61477ad2bcba53ba888';
const TARGET_DIR = 'frontend/playground-master/src/exos';

// Liste des fichiers à récupérer avec les corrections de numéro
const FILES_TO_FIX = [
    { name: 'exo1_page.js', correctNumber: '1' },
    { name: 'exo2_page.js', correctNumber: '2' },
    { name: 'exo3_page.js', correctNumber: '3' },
    { name: 'exo4_page.js', correctNumber: '4' },
    { name: 'exo5_page.js', correctNumber: '5' },
    { name: 'exo6_page.js', correctNumber: '6' },
    { name: 'exo7_page.js', correctNumber: '7' },
    { name: 'exo8_page.js', correctNumber: '8' },
    { name: 'exo9_page.js', correctNumber: '9' },
    { name: 'exo10_page.js', correctNumber: '10' },
    { name: 'exo11_page.js', correctNumber: '11' },
    { name: 'exo12_page.js', correctNumber: '12' },
    { name: 'exo15_page.js', correctNumber: '15' },
    { name: 'exo16_page.js', correctNumber: '16' },
];

// Crée le dossier cible s'il n'existe pas
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`📁 Dossier créé: ${TARGET_DIR}`);
}

// Fonction pour télécharger un fichier
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${url}`));
                return;
            }
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// Fonction pour corriger les numéros d'exercice
function fixExerciseNumbers(content, exerciseNum) {
    let fixed = content;
    
    // Cherche tous les numéros incorrects (pattern: "Exercise #X" ou "ExerciseX")
    // Remplace par le bon numéro
    
    // Pattern 1: "Exercise #12 : " (numéro mal placé)
    fixed = fixed.replace(/Exercise #(\d+)\s*:/g, `Exercise #${exerciseNum}:`);
    
    // Pattern 2: Stockage: .save(16) → .save(exerciseNum)
    fixed = fixed.replace(/window\.StorageService\.save\((\d+)\)/g, `window.StorageService.save(${exerciseNum})`);
    
    // Pattern 3: .complete(16) → .complete(exerciseNum)
    fixed = fixed.replace(/window\.StorageService\.complete\((\d+)\)/g, `window.StorageService.complete(${exerciseNum})`);
    
    // Pattern 4: Dans les commentaires ou strings "Exercise #X"
    fixed = fixed.replace(/Exercise\s+#(\d+)/g, `Exercise #${exerciseNum}`);
    
    // Pattern 5: Commentaires TypeScript "// @ts-nocheck" au début
    // (on les garde, c'est normal)
    
    return fixed;
}

// Fonction principale
async function main() {
    console.log('\n🚀 Récupération des fichiers exo*_page.js d\'Éric...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const file of FILES_TO_FIX) {
        try {
            const url = `${ERIC_REPO}/frontend/playground-master/src/exos/${file.name}`;
            console.log(`⬇️  Téléchargement: ${file.name}...`);
            
            // Télécharge le fichier
            let content = await downloadFile(url);
            
            // Corrige les numéros
            content = fixExerciseNumbers(content, file.correctNumber);
            
            // Écrit le fichier localement
            const targetPath = path.join(TARGET_DIR, file.name);
            fs.writeFileSync(targetPath, content, 'utf8');
            
            console.log(`✅ ${file.name} - Sauvegardé (Exo #${file.correctNumber})`);
            successCount++;
        } catch (error) {
            console.error(`❌ ${file.name} - Erreur: ${error.message}`);
            errorCount++;
        }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log(`\n✨ Terminé!\n`);
    
    if (errorCount === 0) {
        console.log('🎉 Tous les fichiers ont été récupérés et corrigés!');
        console.log('\nProchaine étape: npm run build:exoquiz');
    }
}

// Lance le script
main().catch(console.error);
