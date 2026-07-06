const fs = require('fs');
const path = require('path');

const mapping = {
  1: { title: "Linear classification", desc: "Adjust model parameters to understand how a simple model separates data into two classes." },
  2: { title: "Model training", desc: "Explore how model's predictions is based on an iterative process" },
  3: { title: "Linear and non-linear features", desc: "Observe the limitations of a linear model and the role of non-linear features in learning complex patterns" },
  5: { title: "Linear and non-linear features", desc: "Observe the limitations of a linear model and the role of non-linear features in learning complex patterns" },
  6: { title: "Neurons and Hidden layers", desc: "Identify how a neural network builds predictions from intermediate features." },
  4: { title: "Bias", desc: "Explore Bias impact on Neural network model" },
  7: { title: "Activation functions", desc: "Manipulate different activation functions and observe their impact on classification." },
  8: { title: "Model Instability and weigh initialization", desc: "Observe how parameter changes affect model behavior." },
  9: { title: "Optimization and convergence", desc: "Compare situations where the model converges or diverges depending on parameter settings." },
  10: { title: "Optimization and convergence", desc: "Compare situations where the model converges or diverges depending on parameter settings." },
  11: { title: "Learning rate and divergence", desc: "Analyze how Learning rate affects model capacity." },
  17: { title: "Learning rate and convergence", desc: "Analyze how Learning rate affects a linear model capacity." },
  13: { title: "Model complexity and features learning", desc: "Review the iterative process of a neural network and Observe how data is transformed across deeper layers of the network." },
  14: { title: "Model complexity and features learning", desc: "Review the iterative process of a neural network and Observe how data is transformed across deeper layers of the network." },
  16: { title: "Deep learning and gradient killing", desc: "Understand how gradients affect learning and why they can vanish in deep networks." },
  12: { title: "Overfitting", desc: "Observe how an overly complex model fits training data too closely." },
  15: { title: "Generalization", desc: "Understand the difference between performance on training data and test data." }
};

const pagesDir = path.join(__dirname, 'frontend', 'pages');

function processFile(filePath, exoId) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const data = mapping[exoId];
    
    // Replace title
    content = content.replace(/<h1 class="exo-title">.*?<\/h1>/g, `<h1 class="exo-title">${data.title}</h1>`);
    
    // Replace description
    content = content.replace(/<p class="exo-instructions">[\s\S]*?<\/p>/g, `<p class="exo-instructions">\n      ${data.desc}\n    </p>`);

    fs.writeFileSync(filePath, content, 'utf8');
}

Object.keys(mapping).forEach(exoId => {
    processFile(path.join(pagesDir, `exo${exoId}.html`), exoId);
});

console.log("Replacements complete.");
