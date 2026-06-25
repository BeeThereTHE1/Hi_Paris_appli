// Quiz 13 Page Logic
window.__currentQuizExoId = 13;

// Inject Custom CSS Styles for Quiz layout and validation buttons
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .choice-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      width: 100%;
      text-align: left;
      user-select: none;
      font-size: 13px;
      display: block;
      line-height: 1.4;
    }
    .choice-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-1px);
    }
    .choice-btn.correct {
      background: #10b981 !important;
      border-color: #10b981 !important;
      color: white !important;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
    }
    .choice-btn.incorrect {
      background: #ef4444 !important;
      border-color: #ef4444 !important;
      color: white !important;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
    }
    
    .shake-btn {
      animation: shake-choice 0.4s ease-in-out;
    }
    @keyframes shake-choice {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }

    .checklist-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
      margin-top: 20px;
    }
    .checklist-table th {
      padding: 8px 12px;
      font-size: 11px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .checklist-row-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s;
    }
    .checklist-row-card td {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      vertical-align: middle;
    }
    .checklist-row-card td:first-child {
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      font-size: 13.5px;
      color: #f1f5f9;
      line-height: 1.45;
      width: 40%;
    }
    .checklist-row-card td:last-child {
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .checklist-row-card.row-completed {
      opacity: 0.75;
    }

    .instruction-alert {
      background: rgba(0, 70, 118, 0.2);
      border: 1px solid rgba(0, 70, 118, 0.4);
      padding: 15px;
      border-radius: 10px;
      color: #cbd5e1;
      font-size: 14px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pulse-alert-icon {
      font-size: 20px;
      animation: pulse-icon 1.5s infinite;
    }
    @keyframes pulse-icon {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// Background animations
const backgroundContainer = document.getElementById('background-container');
const formulas = ['\\sqrt{x}', '\\int', 'f(x) = ax^2', '\\frac{dy}{dx}', '\\sin(t)', 'e^{-t}'];
const numFormulas = 25; const numNeurons = 30; const numConnections = 50;
let neurons = []; let connections = []; let formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass) {
    const element = document.createElement('div');
    element.className = elementClass; element.style.position = 'absolute';
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = `clamp(1rem, 5vw, 2.5rem)`; element.style.opacity = String(getRandom(0.04, 0.12));
        element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
        element.style.left = `${getRandom(-20, 120)}vw`; element.style.top = `${getRandom(-20, 120)}vh`;
        element.style.transform = `rotate(${getRandom(-30, 30)}deg)`; formulasElements.push(element);
    } else if (type === 'neuron') {
        const size = getRandom(10, 25);
        element.style.width = `${size}px`; element.style.height = `${size}px`;
        element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
        element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
        element.style.left = `${getRandom(-10, 110)}vw`; element.style.top = `${getRandom(-10, 110)}vh`;
        element.style.opacity = '0'; element.style.transform = 'scale(0)';
        neurons.push({ element, size, x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
}
function createConnection(n1, n2) {
    const conn = document.createElement('div'); conn.className = 'connection'; conn.style.position = 'absolute';
    conn.style.height = '1.5px'; conn.style.background = `linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))`;
    conn.style.filter = 'blur(4px)'; connections.push({ element: conn, neuron1: n1, neuron2: n2, opacity: 0 });
    backgroundContainer.appendChild(conn);
}
function lerp(start, end, amount) { return (1 - amount) * start + amount * end; }
function initializeBackground() {
    for (let i = 0; i < numFormulas; i++) createAnimatedElement('formula', 'math-formula');
    for (let i = 0; i < numNeurons; i++) createAnimatedElement('neuron', 'neuron');
    for (let i = 0; i < numConnections; i++) {
        const n1 = neurons[Math.floor(Math.random() * neurons.length)];
        const n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2) createConnection(n1, n2);
    }
}
function animateBackground() {
    const windowWidth = window.innerWidth; const windowHeight = window.innerHeight; const time = Date.now() * 0.0005;
    neurons.forEach((neuron, index) => {
        const angle = index * (2 * Math.PI / numNeurons) + time;
        const radius = Math.min(windowWidth, windowHeight) * 0.3;
        const targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        const targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        neuron.element.style.opacity = String(neuron.opacity = Math.max(neuron.opacity, 0.15));
        neuron.element.style.transform = `scale(${neuron.scale = Math.max(neuron.scale, 1)})`;
        neuron.element.style.left = `${neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)}px`;
        neuron.element.style.top = `${neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)}px`;
    });
    connections.forEach(conn => {
        const { element, neuron1, neuron2 } = conn;
        const x1 = neuron1.x + neuron1.size / 2; const y1 = neuron1.y + neuron1.size / 2;
        const x2 = neuron2.x + neuron2.size / 2; const y2 = neuron2.y + neuron2.size / 2;
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        element.style.opacity = '0.3'; element.style.width = `${length}px`;
        element.style.left = `${x1}px`; element.style.top = `${y1}px`;
        element.style.transform = `rotate(${angle}deg)`;
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground(); animateBackground();

// Data Statements
const rawStatements = [
  {
    id: 1,
    statement: "Hidden layers mainly...",
    correct: "Transform inputs into intermediate features",
    incorrect: "Directly produce the final prediction"
  },
  {
    id: 2,
    statement: "A neuron in a hidden layer...",
    correct: "Detects specific patterns in the data",
    incorrect: "Stores the correct answer"
  },
  {
    id: 3,
    statement: "Learning happens because...",
    correct: "The model adjusts its weights iteratively",
    incorrect: "The model changes its architecture"
  },
  {
    id: 4,
    statement: "At early epochs, the model...",
    correct: "Produces rough and inaccurate representations",
    incorrect: "Has already learned meaningful features"
  },
  {
    id: 5,
    statement: "Modifying one neuron in the last layer...",
    correct: "Changes part of the decision boundary",
    incorrect: "Has no effect on the output"
  },
  {
    id: 6,
    statement: "Internal representations...",
    correct: "Are intermediate transformations of input data",
    incorrect: "Are identical to the final output"
  },
  {
    id: 7,
    statement: "Neurons in the last hidden layers learn...",
    correct: "More abstract and task-specific representations",
    incorrect: "Raw input features only"
  },
  {
    id: 8,
    statement: "Each neuron in deep layers...",
    correct: "Detects a specific feature or pattern",
    incorrect: "Represents the full decision boundary"
  },
  {
    id: 9,
    statement: "When observing a neuron activation map, you can...",
    correct: "Identify what type of feature it responds to",
    incorrect: "Directly read the final prediction"
  },
  {
    id: 10,
    statement: "As depth increases, representations become...",
    correct: "More specialized for the task",
    incorrect: "Less interpretable and random"
  }
];

// Shuffle choice mapping
let statements = rawStatements.map(s => {
    const isACorrect = Math.random() < 0.5;
    return {
        id: s.id,
        statement: s.statement,
        correctText: s.correct,
        incorrectText: s.incorrect,
        isACorrect: isACorrect,
        optionA: isACorrect ? s.correct : s.incorrect,
        optionB: isACorrect ? s.incorrect : s.correct
    };
});

let quizState = {};
statements.forEach(s => {
    quizState[s.id] = null; // null = unanswered, 'A' or 'B'
});

function injectBlinkStyleInIframe() {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe) return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.getElementById('exo13-quiz-blink-styles')) return;
        const style = iframeDoc.createElement('style');
        style.id = 'exo13-quiz-blink-styles';
        style.textContent = `
            @keyframes blink-reset-btn {
                0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; }
                50% { background-color: #FF034D; transform: scale(1.25); box-shadow: 0 0 20px #FF034D; color: white !important; }
            }
            .blink-reset-active {
                animation: blink-reset-btn 1s infinite !important;
                border-radius: 50% !important;
            }
        `;
        iframeDoc.head.appendChild(style);
    } catch(e) {}
}

function setResetBlinkStatus(active) {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe) return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const btn = iframeDoc.getElementById('reset-button');
        if (btn) {
            if (active) {
                btn.classList.add('blink-reset-active');
            } else {
                btn.classList.remove('blink-reset-active');
            }
        }
    } catch(e) {}
}

function bindResetClick() {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe) return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const btn = iframeDoc.getElementById('reset-button');
        if (btn) {
            btn.addEventListener('click', () => {
                setResetBlinkStatus(false);
            });
        }
    } catch(e) {}
}

function startQuizStabilizationFlow() {
    // Show instruction to reset and run
    const qPanel = document.getElementById('quiz-question-panel');
    if (!qPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Consigne</div>
            <div class="quiz-question-card" style="font-size: 14px; line-height: 1.5;">
                Veuillez réinitialiser le simulateur et lancer l'entraînement pour que le modèle s'adapte aux données.
            </div>
        </div>
        <div class="instruction-alert" style="margin-top: 20px;">
            <div class="pulse-alert-icon">⏳</div>
            <div>
                <strong>En attente d'apprentissage...</strong><br>
                Réinitialisez le modèle (le bouton clignote) puis lancez l'entraînement. Le quiz s'affichera dès que le Training Loss se sera stabilisé.
            </div>
        </div>
    `;

    injectBlinkStyleInIframe();
    setResetBlinkStatus(true);
    bindResetClick();

    // Start loss tracking loop
    let lossHistory = [];
    let lastEpoch = -1;
    let isStabilized = false;

    const tracker = setInterval(() => {
        if (isStabilized) {
            clearInterval(tracker);
            return;
        }
        try {
            const iframe = document.getElementById('iframe-playground');
            if (!iframe) return;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const lossEl = iframeDoc.getElementById('loss-train');
            const epochEl = iframeDoc.getElementById('iter-number');

            if (lossEl && epochEl) {
                // Nettoie et extrait la perte (remplace la virgule par un point pour le support de la traduction fr)
                const currentLoss = parseFloat(lossEl.textContent.replace(/,/g, '.')) || 0;
                // Nettoie et extrait l'epoch (supprime les virgules de séparation des milliers)
                const currentEpoch = parseInt(epochEl.textContent.replace(/,/g, '')) || 0;

                if (!isNaN(currentLoss) && !isNaN(currentEpoch)) {
                    // Détection de la réinitialisation (le bouton Reset a été cliqué)
                    if (currentEpoch < lastEpoch) {
                        lossHistory = [];
                        lastEpoch = currentEpoch;
                        return;
                    }

                    if (currentEpoch !== lastEpoch) {
                        // L'entraînement est en cours d'exécution
                        lastEpoch = currentEpoch;

                        lossHistory.push(currentLoss);
                        // Conserver les 40 dernières valeurs de perte (40 * 250ms = 10 secondes d'entraînement actif)
                        if (lossHistory.length > 40) {
                            lossHistory.shift();
                        }

                        // On attend d'avoir 10 secondes d'entraînement continu (40 mesures)
                        if (lossHistory.length >= 40) {
                            const max = Math.max(...lossHistory);
                            const min = Math.min(...lossHistory);
                            const diff = max - min;

                            // Seuil de stabilité : les variations de perte sont inférieures à 0.002 sur 10 secondes
                            if (diff < 0.002) {
                                isStabilized = true;
                                clearInterval(tracker);
                                setResetBlinkStatus(false);
                                buildMCQGrid();
                            }
                        }
                    }
                }
            }
        } catch(e) {}
    }, 250);
}

function buildMCQGrid() {
    const qPanel = document.getElementById('quiz-question-panel');
    if (!qPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activité</div>
            <div class="quiz-question-card" style="font-size: 13.5px; line-height: 1.45;">
                <strong>Grille comparative :</strong> Analysez le modèle entraîné et sélectionnez l'énoncé correct pour chaque paire proposée.
            </div>
        </div>
        <table class="checklist-table">
          <thead>
            <tr>
              <th style="text-align: left;">Sujet d'observation</th>
              <th style="text-align: center; width: 45%;">Option A</th>
              <th style="text-align: center; width: 45%;">Option B</th>
            </tr>
          </thead>
          <tbody>
            ${statements.map(s => `
              <tr class="checklist-row-card" data-id="${s.id}">
                <td><strong>${s.statement}</strong></td>
                <td>
                  <button class="choice-btn btn-choice-a" data-val="A">${s.optionA}</button>
                </td>
                <td>
                  <button class="choice-btn btn-choice-b" data-val="B">${s.optionB}</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
    `;

    // Bind MCQ click events
    statements.forEach(s => {
        const row = qPanel.querySelector(`tr[data-id="${s.id}"]`);
        if (!row) return;

        const btnA = row.querySelector('.btn-choice-a');
        const btnB = row.querySelector('.btn-choice-b');

        const handleClick = (chosenVal, selfBtn, otherBtn) => {
            const isCorrect = (chosenVal === 'A' && s.isACorrect) || (chosenVal === 'B' && !s.isACorrect);

            if (isCorrect) {
                quizState[s.id] = chosenVal;
                selfBtn.classList.add('correct');
                selfBtn.classList.remove('incorrect');
                otherBtn.classList.remove('correct', 'incorrect');
                
                // Disable row
                selfBtn.disabled = true;
                otherBtn.disabled = true;
                row.classList.add('row-completed');

                checkQuizCompletion();
            } else {
                selfBtn.classList.add('incorrect');
                selfBtn.classList.add('shake-btn');
                setTimeout(() => {
                    selfBtn.classList.remove('incorrect', 'shake-btn');
                }, 500);
            }
        };

        btnA.onclick = (e) => {
            e.stopPropagation();
            handleClick('A', btnA, btnB);
        };

        btnB.onclick = (e) => {
            e.stopPropagation();
            handleClick('B', btnB, btnA);
        };
    });
}

function checkQuizCompletion() {
    const allCorrect = statements.every(s => {
        const answer = quizState[s.id];
        return (answer === 'A' && s.isACorrect) || (answer === 'B' && !s.isACorrect);
    });

    if (allCorrect) {
        setTimeout(() => {
            showTakeHomeMessageOverlay();
        }, 600);
    }
}

function showTakeHomeMessageOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-takehome-overlay';
    overlay.style.zIndex = '10006';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "Take Home Message";

    const p = document.createElement('p');
    p.style.textAlign = 'left';
    p.style.whiteSpace = 'pre-line';
    p.style.fontSize = '20px';
    p.innerText = `Learning is a progressive and iterative process.
Neural networks transform inputs into increasingly abstract features.
Hidden layers act as feature detectors.
The final prediction is built from the combination of these learned features.`;

    const okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "OK";
    okBtn.onclick = () => {
        overlay.remove();
        showCompletionScreen();
    };

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// ─── COMPLETION SCREEN ───────────────────────────────────────────────────────
function showCompletionScreen() {
  document.querySelectorAll(".completion-overlay").forEach(el => el.remove());

  const overlay = document.createElement("div");
  overlay.className = "completion-overlay";

  overlay.innerHTML = `
    <div class="completion-card">
      <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

      <div class="completion-star-wrap">
        <span class="completion-star">⭐</span>
      </div>

      <h2 class="completion-title">Félicitations !</h2>
      <p class="completion-msg">Vous avez parfaitement assimilé l'exercice 13 sur le cycle d'apprentissage itératif.<br>
        Le prochain exercice a été déverrouillé sur le tableau de bord !
      </p>

      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../exo13.html?completed=true">
          🚀 Terminer l'exercice
        </a>
      </div>
    </div>

    <a class="completion-home-icon blink-btn" href="../Page-demo/exercises.html" title="Retour aux exercices">
      🏠
    </a>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("show"));
  });

  requestAnimationFrame(() => launchConfetti());

  // Save progress
  (async () => {
    if (window.StorageService) {
      await window.StorageService.complete(13);
      console.log(`✅ Exercice 13 marqué COMPLETED.`);
    }
  })();
}

// ─── CONFETTI ENGINE ─────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const COLORS = ["#FF034D", "#FFD700", "#10b981", "#004676", "#ffffff", "#FF6B35"];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 3 + 1.5,
    spin: (Math.random() - 0.5) * 0.15,
    angle: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 1.5
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
      ctx.restore();
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    frame++;
    if (frame < 300) requestAnimationFrame(draw);
  }
  draw();
}

// Startup Popup
function showStartQuizOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-quiz-start-overlay';
    overlay.style.zIndex = '10006';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "Activité d'observation";

    const p = document.createElement('p');
    p.innerText = "Now, reset the data and run the model until it reaches a stable state.";

    const okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "OK";
    okBtn.onclick = () => {
        overlay.remove();
        startQuizStabilizationFlow();
    };

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

const iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', () => {
        setTimeout(() => {
            showStartQuizOverlay();
        }, 1200);
    });
}

// Save progression btn binding
const btnSauvegarder = document.getElementById('btn-sauvegarder');
if (btnSauvegarder) {
    btnSauvegarder.onclick = async () => {
        if (window.StorageService) {
            const success = await window.StorageService.save(13);
            if (success) {
                btnSauvegarder.innerHTML = '✅ Sauvegardé !';
                btnSauvegarder.disabled = true;
            }
        }
    };
}
