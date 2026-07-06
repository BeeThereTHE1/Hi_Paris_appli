const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'frontend/playground-master/OLD_index.html');
let content = fs.readFileSync(target, 'utf8');

const dict = {
  "Bienvenue dans l'Exercice 1": "Welcome to Exercise 1",
  "Dans cet exercice, nous allons découvrir la classification avec un modèle simple.": "In this exercise, we will discover classification with a simple model.",
  "Suivant</button>": "Next</button>",
  "Utilisez les boutons pour manipuler les neurones d'entrée.": "Use the buttons to manipulate the input neurons.",
  "Commencer</button>": "Start</button>",
  "Exercice 2 : Les Fondamentaux": "Exercise 2: The Fundamentals",
  "Observez comment les biais influencent la frontière de décision.": "Observe how biases influence the decision boundary.",
  "Exercice 3 : Le Cercle": "Exercise 3: The Circle",
  "Saurez-vous séparer ces points sans couches cachées ?": "Can you separate these points without hidden layers?",
  "Exercice 4 : Première Couche": "Exercise 4: First Layer",
  "Nous introduisons ici une couche cachée.": "Here we introduce a hidden layer.",
  "Exercice 5 : Deep Learning": "Exercise 5: Deep Learning",
  "Plusieurs couches pour des problèmes complexes.": "Multiple layers for complex problems.",
  "Exercice 6 : Régularisation": "Exercise 6: Regularization",
  "Évitez le surapprentissage.": "Avoid overfitting.",
  "Exercice 7 : Classification de Texte": "Exercise 7: Text Classification",
  "Modèle simplifié.": "Simplified model.",
  "Exercice 8 : Examen Final": "Exercise 8: Final Exam",
  "Montrez ce que vous savez faire.": "Show what you can do.",
  "Exercice 12 : Optimisation Avancée": "Exercise 12: Advanced Optimization",
  "Ce dernier exercice vous met au défi d'optimiser un réseau profond à 4 couches. Manipulez tous les hyperparamètres pour atteindre une perte minimale.": "This final exercise challenges you to optimize a 4-layer deep network. Manipulate all hyperparameters to achieve minimal loss.",
  ">> SUIVANT</button>": ">> NEXT</button>",
  "Surveillez le taux d'apprentissage et la régularisation pour éviter le surapprentissage sur le dataset Spirale.": "Monitor the learning rate and regularization to avoid overfitting on the Spiral dataset.",
  ">> COMMENCER</button>": ">> START</button>",
  "Passez d'abord votre souris sur les paramètres pour voir leurs définitions. Si le concept n'est pas clair pour\\n        vous, cliquez sur le bouton \"plus d'infos\".": "First hover over the parameters to see their definitions. If the concept is not clear to you, click on the \"more info\" button.",
  "Il est important que vous compreniez pleinement ces concepts, car vous serez interrogé à leur sujet pendant la\\n        formation.": "It is important that you fully understand these concepts, as you will be tested on them during the training.",
  ">> SUIVANT >>></button>": ">> NEXT >>></button>"
};

for (let [fr, en] of Object.entries(dict)) {
    let frRegex = fr.replace(/\s+/g, '\\s+');
    content = content.replace(new RegExp(frRegex, 'g'), en.replace(/\\n/g, '\n'));
}

fs.writeFileSync(target, content, 'utf8');
console.log('OLD_index.html translated pass 2.');
