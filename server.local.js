/**
 * Serveur local de développement — Hi!Paris Playground
 * Lance avec : node server.local.js
 * Frontend : http://localhost:3000
 * API      : http://localhost:3000/api/...
 */

const express = require('express');
const path = require('path');
const apiApp = require('./api/index.js');

const server = express();

// 1. Monte toutes les routes /api/* via l'app Express de l'API
// Important : ne pas stripper le préfixe /api car les routes sont définies en /api/xxx
server.use(apiApp);

// 2. Sert les fichiers statiques depuis dist/
server.use(express.static(path.join(__dirname, 'dist')));

// 3. Fallback : toutes les autres routes → index ou fichier statique
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', req.path.endsWith('.html') ? req.path : 'index.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ Serveur local démarré !`);
  console.log(`   Frontend : http://localhost:${PORT}`);
  console.log(`   API      : http://localhost:${PORT}/api/`);
  console.log(`\n   Ctrl+C pour arrêter\n`);
});
