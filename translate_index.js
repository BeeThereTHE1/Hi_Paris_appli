const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/pages/index.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "<title>Hi! Paris - Accueil</title>": "<title>Hi! Paris - Home</title>",
  "Nos Membres &\\n          Partenaires": "Our Members &\\n          Partners",
  "Nos Membres & Partenaires": "Our Members & Partners",
  "L'Apprentissage Par L'Action": "Learning by Doing",
  "Construisez, manipulez et observez vos propres réseaux de neurones s'entraîner en temps réel dans votre\\n          navigateur.": "Build, manipulate, and watch your own neural networks train in real time in your\\n          browser.",
  "Un\\n          Centre d'Innovation": "An\\n          Innovation Center",
  "Rejoignez une communauté florissante de chercheurs, d'enseignants et d'étudiants pionniers dans\\n          l'Intelligence\\n          Artificielle.": "Join a thriving community of researchers, teachers, and students pioneering in\\n          Artificial\\n          Intelligence.",
  "Apprenez le Deep Learning autrement grâce à Hi! Paris": "Learn Deep Learning differently with Hi! Paris",
  "Hi! Paris Playground est une plateforme interactive et ludique spécialement conçue pour démystifier le monde de\\n        l'intelligence artificielle et des réseaux de neurones.": "Hi! Paris Playground is an interactive and fun platform specially designed to demystify the world of\\n        artificial intelligence and neural networks.",
  "Pour les étudiants :": "For students:",
  "Exécutez des algorithmes en temps réel, jouez avec l'architecture,\\n        comprenez le rôle des couches cachées (Hidden Layers), et observez comment vos données sont classées devant vos\\n        yeux.": "Run algorithms in real-time, play with the architecture,\\n        understand the role of hidden layers, and watch how your data is classified right before your\\n        eyes.",
  "Pour les enseignants :": "For teachers:",
  "Créez facilement des exercices personnalisés, générez des jeux de\\n        données complexes et partagez-les à toute la communauté pour guider vos élèves dans leur compréhension des\\n        mathématiques de l'A.I.": "Easily create custom exercises, generate complex\\n        datasets, and share them with the entire community to guide your students in understanding the\\n        mathematics of A.I.",
  "Que souhaitez-vous faire\\n        aujourd'hui ?": "What would you like to do\\n        today?",
  "Que souhaitez-vous faire aujourd'hui ?": "What would you like to do today?",
  "S'entraîner": "Train",
  "Faire des exercices interactifs.": "Do interactive exercises.",
  "Créer des exercices": "Create exercises",
  "Partagez votre expertise à la communauté": "Share your expertise with the community",
  "Rejoindre": "Join",
  "Se connecter ou créer un compte": "Log in or create an account",
  "Étudiants<br>inscrits": "Registered<br>students",
  "Enseignants<br>Inscrits": "Registered<br>teachers",
  "Visites<br>sur la plateforme": "Platform<br>visits",
  "Exercices<br>disponibles": "Available<br>exercises",
  "Explorez, comprenez et maîtrisez le Deep Learning grâce à l'expérimentation visuelle des réseaux de neurones...": "Explore, understand, and master Deep Learning through visual experimentation of neural networks..."
};

// Handle string replacements manually and with some regex for spacing if needed
for (let [fr, en] of Object.entries(dict)) {
    // Normalise spaces in the dictionary search
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('index.html translated.');
