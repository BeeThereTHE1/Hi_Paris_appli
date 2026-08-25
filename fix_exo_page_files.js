#!/usr/bin/env node

/**
 * Script pour récupérer les fichiers exo*_page.js d'Éric et les push sur GitHub
 * avec correction automatique des numéros
 * 
 * Usage: node fix_exo_page_files.js
 * 
 * Requires:
 *   - GITHUB_TOKEN en variable d'environnement
 *   - Permissions: repo (write)
 */

const https = require('https');
const fs = require('fs');

// Configuration
const ERIC_REPO = 'https://raw.githubusercontent.com/ericpapain/Hi_Paris_Parcours_pedagogique/e03df3e300abcc23d574d61477ad2bcba53ba888';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'BeeThereTHE1';
const GITHUB_REPO = 'Hi_Paris_appli';
const TARGET_PATH = 'frontend/playground-master/src/exos';

// Liste des fichiers à récupérer avec correction de numéro
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
    { name: 'exo13_page.js', correctNumber: '13' },
    { name: 'exo14_page.js', correctNumber: '14' },
    { name: 'exo15_page.js', correctNumber: '15' },
    { name: 'exo16_page.js', correctNumber: '16' },
    { name: 'exo17_page.js', correctNumber: '17' },
    { name: 'exo1.js', correctNumber: '1' },
    { name: 'exo2.js', correctNumber: '2' },
    { name: 'exo3.js', correctNumber: '3' },
    { name: 'exo4.js', correctNumber: '4' },
    { name: 'exo5.js', correctNumber: '5' },
    { name: 'exo6.js', correctNumber: '6' },
    { name: 'exo7.js', correctNumber: '7' },
    { name: 'exo8.js', correctNumber: '8' },
    { name: 'exo9.js', correctNumber: '9' },
    { name: 'exo10.js', correctNumber: '10' },
    { name: 'exo11.js', correctNumber: '11' },
    { name: 'exo12.js', correctNumber: '12' },
    { name: 'exo13.js', correctNumber: '13' },
    { name: 'exo14.js', correctNumber: '14' },
    { name: 'exo15.js', correctNumber: '15' },
    { name: 'exo16.js', correctNumber: '16' },
    { name: 'exo17.js', correctNumber: '17' },

];

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
    
    // Pattern 1: "Exercise #12 : " → "Exercise #X : "
    fixed = fixed.replace(/Exercise\s+#(\d+)\s*:/g, `Exercise #${exerciseNum}:`);
    
    // Pattern 2: .save(16) → .save(exerciseNum)
    fixed = fixed.replace(/\.save\((\d+)\)/g, `.save(${exerciseNum})`);
    
    // Pattern 3: .complete(16) → .complete(exerciseNum)
    fixed = fixed.replace(/\.complete\((\d+)\)/g, `.complete(${exerciseNum})`);
    
    // Pattern 4: "Exercise #X" partout
    fixed = fixed.replace(/Exercise\s+#(\d+)/g, `Exercise #${exerciseNum}`);
    
    return fixed;
}

// Fonction pour créer/mettre à jour un fichier sur GitHub
async function pushFileToGithub(filePath, fileName, content) {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}/${fileName}`;
        
        const data = JSON.stringify({
            message: `fix: add ${fileName} with corrected exercise number (from ericpapain/Hi_Paris_Parcours_pedagogique)`,
            content: Buffer.from(content).toString('base64'),
            branch: 'main'
        });

        const options = {
            hostname: 'api.github.com',
            path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}/${fileName}`,
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'fix-exo-pages-script',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                if (res.statusCode === 201 || res.statusCode === 200) {
                    resolve(JSON.parse(responseData));
                } else {
                    reject(new Error(`GitHub API ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// Fonction principale
async function main() {
    // Vérifie le token
    if (!GITHUB_TOKEN) {
        console.error('❌ GITHUB_TOKEN non défini !');
        console.error('   Définis: export GITHUB_TOKEN=ghp_xxxxxxxxxxxx');
        process.exit(1);
    }

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
            
            // Push sur GitHub
            console.log(`   📤 Push sur GitHub...`);
            await pushFileToGithub(TARGET_PATH, file.name, content);
            
            console.log(`✅ ${file.name} - Créé sur GitHub (Exo #${file.correctNumber})\n`);
            successCount++;
        } catch (error) {
            console.error(`❌ ${file.name} - Erreur: ${error.message}\n`);
            errorCount++;
        }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log(`\n✨ Terminé!\n`);
    
    if (errorCount === 0) {
        console.log('🎉 Tous les fichiers ont été pushés sur GitHub!');
        console.log('\nProchaine étape: npm run build:exoquiz');
    }
    
    process.exit(errorCount > 0 ? 1 : 0);
}

// Lance le script
main().catch(error => {
    console.error('Erreur fatale:', error);
    process.exit(1);
});
