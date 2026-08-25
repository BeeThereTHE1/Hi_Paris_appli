#!/usr/bin/env node

/**
 * Script pour supprimer tous les fichiers .ts du dossier exos sur GitHub
 * Usage: node delete_ts_files.js
 * 
 * Requires:
 *   - GITHUB_TOKEN en variable d'environnement
 */

const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'BeeThereTHE1';
const GITHUB_REPO = 'Hi_Paris_appli';
const TARGET_PATH = 'frontend/playground-master/src/exos';

// Liste de tous les fichiers .ts à supprimer
const TS_FILES_TO_DELETE = [
    'custom_exo_template.ts',
    'exercises.ts',
    'exo1.ts',
    'exo2.ts',
    'exo3.ts',
    'exo4.ts',
    'exo5.ts',
    'exo6.ts',
    'exo7.ts',
    'exo8.ts',
    'exo9.ts',
    'exo10.ts',
    'exo11.ts',
    'exo12.ts',
    'exo13.ts',
    'exo14.ts',
    'exo15.ts',
    'exo16.ts',
    'exo17.ts',
    'exo1_page.ts',
    'exo2_page.ts',
    'exo3_page.ts',
    'exo4_page.ts',
    'exo5_page.ts',
    'exo6_page.ts',
    'exo7_page.ts',
    'exo8_page.ts',
    'exo9_page.ts',
    'exo10_page.ts',
    'exo11_page.ts',
    'exo12_page.ts',
    'exo13_page.ts',
    'exo14_page.ts',
    'exo15_page.ts',
    'exo16_page.ts',
    'exo17_page.ts',
];

// Fonction pour obtenir le SHA d'un fichier
function getFileSha(fileName) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${TARGET_PATH}/${fileName}`,
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'delete-ts-files-script'
            }
        };

        https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data).sha);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });
        }).on('error', reject).end();
    });
}

// Fonction pour supprimer un fichier
function deleteFile(fileName, sha) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            message: `refactor: delete ${fileName} - no longer needed (using .js files instead)`,
            sha: sha,
            branch: 'main'
        });

        const options = {
            hostname: 'api.github.com',
            path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${TARGET_PATH}/${fileName}`,
            method: 'DELETE',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'delete-ts-files-script',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
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
        console.error('   Définis: set GITHUB_TOKEN=ghp_xxxxxxxxxxxx (Windows CMD)');
        console.error('   Ou:      $env:GITHUB_TOKEN="ghp_xxxxxxxxxxxx" (PowerShell)');
        process.exit(1);
    }

    console.log('\n🗑️  Suppression de tous les fichiers .ts...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const fileName of TS_FILES_TO_DELETE) {
        try {
            console.log(`🔍 ${fileName}...`);
            
            // Récupère le SHA
            const sha = await getFileSha(fileName);
            
            // Supprime le fichier
            await deleteFile(fileName, sha);
            
            console.log(`✅ ${fileName} - Supprimé\n`);
            successCount++;
        } catch (error) {
            console.error(`⚠️  ${fileName} - ${error.message}\n`);
            errorCount++;
        }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Supprimés: ${successCount}`);
    console.log(`   ⚠️  Erreurs: ${errorCount}`);
    console.log(`\n✨ Terminé!\n`);
    
    if (errorCount === 0) {
        console.log('🎉 Tous les fichiers .ts ont été supprimés!');
        console.log('   Git ne contient plus que les .js fonctionnels 🚀');
    }
    
    process.exit(errorCount > 0 ? 1 : 0);
}

// Lance le script
main().catch(error => {
    console.error('Erreur fatale:', error);
    process.exit(1);
});
