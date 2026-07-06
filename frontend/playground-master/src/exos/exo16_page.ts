// @ts-nocheck

(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const container = document.getElementById('widget-profil-header');
    if (!container) return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        const visitorBtn = document.createElement('a');
        visitorBtn.href = 'Page-demo/register.html';
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span>';
        container.appendChild(visitorBtn);
        return;
    }
    const initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    const avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 200px rgba(16, 185, 129, 0.4); transition: 0.3s;';
    avatar.innerText = initiales.toUpperCase();
    const menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
    const p = user.profil || user.profile || user.role || 'étudiant';
    const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 17px; font-weight: 800; color: #fff;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📊 Mon Historique</a>
          <a href="statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📈 Mes Statistiques</a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;">🚪 Logout</div>
        </div>
      `;
    let isOpen = false;
    avatar.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block'; setTimeout(() => { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        } else {
            menu.style.opacity = '0'; menu.style.transform = 'scale(0.9) translateY(-10px)'; setTimeout(() => menu.style.display = 'none', 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
const btnSauvegarder = document.getElementById('btn-sauvegarder');
const btnRealise = document.getElementById('btn-realise');

btnSauvegarder.onclick = async () => {
    if (window.StorageService) {
        const success = await window.StorageService.save(16);
        if (success) {
            btnSauvegarder.innerHTML = '✅ Sauvegardé !';
            btnSauvegarder.style.opacity = '0.7';
            btnSauvegarder.disabled = true;
        }
    }
};

btnRealise.onclick = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) { window.location.href = 'Page-demo/register.html'; return; }
    
    if (window.StorageService) {
        const success = await window.StorageService.complete(16);
        if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => { window.location.href = 'exoquiz/exo16_quiz.html'; }, 800);
        }
    }
};

// ——— ANIMATION D'ARRIÈRE-PLAN ———
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
        element.style.fontSize = `clamp(1rem, 5vw, 2.5rem)`; element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
        element.style.left = `${getRandom(-20, 120)}vw`; element.style.top = `${getRandom(-20, 120)}vh`;
        element.style.transform = `rotate(${getRandom(-30, 30)}deg)`; formulasElements.push(element);
    } else if (type === 'neuron') {
        const size = getRandom(10, 25);
        element.style.width = `${size}px`; element.style.height = `${size}px`;
        element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
        element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
        element.style.left = `${getRandom(-10, 110)}vw`; element.style.top = `${getRandom(-10, 110)}vh`;
        element.style.opacity = 0; element.style.transform = 'scale(0)';
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
        neuron.element.style.opacity = neuron.opacity = Math.max(neuron.opacity, 0.15);
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
        element.style.opacity = 0.3; element.style.width = `${length}px`;
        element.style.left = `${x1}px`; element.style.top = `${y1}px`;
        element.style.transform = `rotate(${angle}deg)`;
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground(); animateBackground();

// Inject custom styles
const styleEl = document.createElement('style');
styleEl.textContent = `
  .def-box {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-left: 4px solid #004676;
    border-radius: 8px;
    padding: 12px 15px;
    margin-bottom: 12px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
    text-align: left;
  }
  .def-box.show {
    opacity: 1; transform: translateY(0);
  }
  .def-box h4 {
    margin: 0 0 5px 0; color: #8b5cf6; font-size: 13px; font-weight: 700;
  }
  .def-box p {
    margin: 0; font-size: 12px; color: #cbd5e1; line-height: 1.4;
  }
  .def-box.color-1 { border-left-color: #004676; }
  .def-box.color-2 { border-left-color: #FF034D; }
  .def-box.color-3 { border-left-color: #10b981; }
  .def-box.color-4 { border-left-color: #f59e0b; }

  .formula-images {
    display: flex; gap: 15px; justify-content: center; margin-top: 10px;
  }
  .formula-img-container {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px; padding: 5px; text-align: center; width: 100px;
  }
  .formula-img-container img {
    max-width: 100%; height: auto; border-radius: 4px;
  }
  .formula-img-container span {
    display: block; font-size: 9px; margin-top: 4px; color: #94a3b8;
  }

  /* Clignotement NEXT */
  @keyframes btn-blink {
    0%, 100% { transform: scale(1); box-shadow: 0 0 5px #8b5cf6; }
    50% { transform: scale(1.05); box-shadow: 0 0 20px #8b5cf6; }
  }
  .blink-next {
    animation: btn-blink 1.2s infinite;
  }

  /* Table Style */
  .comparison-table {
    width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; color: #e2e8f0;
  }
  .comparison-table th, .comparison-table td {
    border: 1px solid rgba(255,255,255,0.1); padding: 5px; text-align: center;
  }
  .comparison-table th {
    background: rgba(15, 23, 42, 0.6); font-weight: 700; font-size: 10.5px;
  }
  .comparison-table td.criteria-col {
    background: rgba(255, 255, 255, 0.02); font-weight: 600; text-align: left; width: 22%;
  }
  .drop-zone-cell {
    background: rgba(255, 255, 255, 0.01); min-height: 40px; transition: all 0.2s;
    cursor: pointer; position: relative; width: 39%; vertical-align: middle;
  }
  .drop-zone-cell.dragover {
    background: rgba(139, 92, 246, 0.15) !important; border: 1.5px dashed #8b5cf6 !important;
  }
  .drop-zone-cell.correct-drop {
    background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);
  }
  
  .observation-card {
    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px; padding: 6px 8px; font-size: 10.5px; color: #e2e8f0;
    cursor: grab; user-select: none; transition: all 0.2s; display: inline-block;
    margin: 3px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); line-height: 1.35;
    vertical-align: middle;
  }
  .observation-card:hover {
    background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }
  .observation-card:active { cursor: grabbing; }
  .observation-card.dragging { opacity: 0.3; }
  .observation-card.selected {
    border: 2px solid #8b5cf6 !important; background: rgba(139, 92, 246, 0.15) !important;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
  }

  .pill-matched {
    background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4);
    color: #10b981; border-radius: 4px; padding: 4px 6px; font-size: 10.5px;
    line-height: 1.3; animation: scaleIn 0.3s ease; text-align: center;
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  .shake-error {
    animation: shake 0.4s ease-in-out;
    border-color: #ef4444 !important;
    background: rgba(239, 68, 68, 0.15) !important;
  }
  .feedback-box {
    background: rgba(255, 255, 255, 0.05); border-left: 4px solid #8b5cf6;
    padding: 10px 12px; border-radius: 4px; font-size: 12.5px; color: #e2e8f0;
    line-height: 1.4; margin-top: 10px; animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
`;
document.head.appendChild(styleEl);

let draggedCardId = null;
let selectedCardId = null;

// Initial Start
window.addEventListener('load', () => {
    // Check if already completed
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('completed') === 'true') {
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';

        const qPanel = document.getElementById('quiz-question-panel');
        if (qPanel) {
            qPanel.innerHTML = `
                <div class="quiz-question-wrapper">
                    <div class="quiz-question-badge">Exercise Successful</div>
                    <div class="quiz-question-card">
                        You have already validated this exercise ! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.
                    </div>
                </div>
            `;
        }
        return;
    }

    setTimeout(() => {
        startTutorial();
    }, 1000);
});

function startTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo16-tutorial-overlay';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "Exercise #16 : Gradient Killing & Sigmoid vs ReLU";

    const p = document.createElement('p');
    p.innerText = "Dans cet exercice, nous allons comparer le comportement de deux fonctions d'activation : la Sigmoid et la ReLU dans un réseau de neurones profond (6 couches cachées, LR = 10, Dataset Spiral). Tout d'abord, examinons de près la définition d'un gradient dans un réseau de neurones.";

    const timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #cbd5e1;';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "Continue";
    nextBtn.disabled = true;

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(timerSpan);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    let timeLeft = 2; // 8 seconds reading timer

    function updateTimer() {
        if (timeLeft > 0) {
            timerSpan.innerText = `Temps de lecture restant : ${timeLeft}s`;
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            timerSpan.style.display = 'none';
            nextBtn.disabled = false;
        }
    }
    updateTimer();

    nextBtn.onclick = () => {
        overlay.remove();
        renderActivity1();
    };
}

// Activity 1: Reading definitions
function renderActivity1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper" style="margin-bottom:15px;">
            <div class="quiz-question-badge" style="background:#004676;">Activity 1</div>
            <div class="quiz-question-card" style="font-size: 13px; line-height: 1.4;">
                <strong>Comprendre le Gradient</strong> - Prenez le temps de lire les explications ci-dessous. Les notions s'affichent séquentiellement pour vous guider.
            </div>
        </div>
        <div id="def-boxes-container">
            <div class="def-box color-1" id="def-box-1">
                <h4>1. Definition</h4>
                <p>A gradient is the signal used to update the model during learning.</p>
            </div>
            <div class="def-box color-2" id="def-box-2">
                <h4>2. How it works</h4>
                <p>At each training step:<br>
                • The model makes a prediction<br>
                • The error (loss) is computed<br>
                • The gradient tells how to change each weight to <span style="color:#FF034D; font-weight:700;">reduce this error</span></p>
            </div>
            <div class="def-box color-3" id="def-box-3">
                <h4>3. Key idea</h4>
                <p>The gradient improves parameters with both:<br>
                • <b>Direction</b> → where to go<br>
                • <b>Magnitude</b> → how big the change should be<br>
                → Large gradient  → big update<br>
                → Small gradient  → tiny update</p>
            </div>
            <div class="def-box color-4" id="def-box-4">
                <h4>4. Simple Formula</h4>
                <p>Les paramètres (poids) sont mis à jour en combinant le gradient et le taux d'apprentissage (learning rate) à chaque époque (epoch) :</p>
                <div class="formula-images">
                    <div class="formula-img-container">
                        <img src="assets/images/epoch.jpg.png" alt="Epoch">
                        <span>Epoch</span>
                    </div>
                    <div class="formula-img-container">
                        <img src="assets/images/learning_rate.jpg.png" alt="Learning Rate">
                        <span>Learning Rate</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align: right; margin-top: 15px;">
            <button class="tutorial-btn" id="btn-next-act1" style="font-size:16px; padding: 8px 18px;" disabled>NEXT</button>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box">
            📖 Lisez attentivement la définition du gradient et de sa mise à jour.
        </div>
    `;

    const showBox = (id, delay, nextCallback) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.classList.add('show');
            if (nextCallback) nextCallback();
        }, delay);
    };

    // Sequential reveal
    showBox('def-box-1', 100, () => {
        showBox('def-box-2', 4000, () => {
            showBox('def-box-3', 9000, () => {
                showBox('def-box-4', 15000, () => {
                    setTimeout(() => {
                        const btn = document.getElementById('btn-next-act1');
                        if (btn) {
                            btn.removeAttribute('disabled');
                            btn.classList.add('blink-next');
                        }
                        fPanel.innerHTML = `
                            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                                ✅ Reading completed! Click <strong>NEXT</strong> to start the models.
                            </div>
                        `;
                    }, 4000);
                });
            });
        });
    });

    document.getElementById('btn-next-act1').onclick = () => {
        renderActivity2();
    };
}

// Activity 2: Run both models
let simulationCheckInterval = null;
function renderActivity2() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper" style="margin-bottom:15px;">
            <div class="quiz-question-badge" style="background:#FF034D;">Activity 2</div>
            <div class="quiz-question-card" style="font-size: 13px; line-height: 1.45;">
                <strong>Starting the simulators</strong><br><br>
                Lancez both models en parallèle dans le playground à gauche en cliquant sur le bouton <b>Play</b> (▶️) de chaque simulateur.<br><br>
                <span style="color:#FF034D; font-weight:700;">Instruction :</span> Carefully observe the evolution of the weights (connection lines) and neurons in the initial layers (the first layers on the left).<br><br>
                Let the simulations run until the counter reaches at least <b>150 epochs</b>.
            </div>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 8px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Sigmoid Model :</span>
                <strong id="status-sigmoid" style="color:#ef4444;">Stopped (0 epochs)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>ReLU Model :</span>
                <strong id="status-relu" style="color:#ef4444;">Stopped (0 epochs)</strong>
            </div>
        </div>
        <div style="text-align: right; margin-top: 15px;">
            <button class="tutorial-btn" id="btn-next-act2" style="font-size:16px; padding: 8px 18px;" disabled>Next</button>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #FF034D;">
            💡 Cliquez sur le bouton Play (▶️) rouge clignotant dans chaque simulateur à gauche.
        </div>
    `;

    // Inject flash effect into play buttons in the iframes
    const injectPlayFlash = (iframeId) => {
        try {
            const iframe = document.getElementById(iframeId);
            if (!iframe) return;
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (!doc) return;

            if (!doc.getElementById('exo16-iframe-styles')) {
                const style = doc.createElement('style');
                style.id = 'exo16-iframe-styles';
                style.textContent = `
                    @keyframes play-btn-flash {
                        0%, 100% { transform: scale(1); box-shadow: 0 0 5px #FF034D; background: transparent; }
                        50% { transform: scale(1.2); box-shadow: 0 0 20px #FF034D; background: #FF034D; color: white !important; }
                    }
                    .play-btn-flash {
                        animation: play-btn-flash 1s infinite !important;
                        border-radius: 50% !important;
                    }
                `;
                doc.head.appendChild(style);
            }

            const playBtn = doc.getElementById('play-pause-button');
            if (playBtn) {
                playBtn.classList.add('play-btn-flash');
            }
        } catch (e) {
            console.warn("Could not inject flash to iframe", e);
        }
    };

    injectPlayFlash('iframe-sigmoid');
    injectPlayFlash('iframe-relu');

    // Interval to check progress
    if (simulationCheckInterval) clearInterval(simulationCheckInterval);
    
    let sigmoidEpoch = 0;
    let reluEpoch = 0;
    let sigmoidPlaying = false;
    let reluPlaying = false;

    simulationCheckInterval = setInterval(() => {
        try {
            const iframeSigmoid = document.getElementById('iframe-sigmoid');
            const iframeRelu = document.getElementById('iframe-relu');

            if (iframeSigmoid && iframeSigmoid.contentWindow) {
                const docSig = iframeSigmoid.contentDocument || iframeSigmoid.contentWindow.document;
                const iterSig = docSig.getElementById('iter-number');
                if (iterSig) {
                    sigmoidEpoch = parseInt(iterSig.innerText.replace(/,/g, '')) || 0;
                }
                const playBtn = docSig.getElementById('play-pause-button');
                sigmoidPlaying = playBtn && playBtn.classList.contains('playing') || false;
                if (sigmoidPlaying && playBtn) {
                    playBtn.classList.remove('play-btn-flash');
                }
            }

            if (iframeRelu && iframeRelu.contentWindow) {
                const docRelu = iframeRelu.contentDocument || iframeRelu.contentWindow.document;
                const iterRelu = docRelu.getElementById('iter-number');
                if (iterRelu) {
                    reluEpoch = parseInt(iterRelu.innerText.replace(/,/g, '')) || 0;
                }
                const playBtn = docRelu.getElementById('play-pause-button');
                reluPlaying = playBtn && playBtn.classList.contains('playing') || false;
                if (reluPlaying && playBtn) {
                    playBtn.classList.remove('play-btn-flash');
                }
            }

            // Update UI status
            const statusSig = document.getElementById('status-sigmoid');
            if (statusSig) {
                if (sigmoidEpoch >= 150) {
                    statusSig.innerText = `Prêt (${sigmoidEpoch} epochs)`;
                    statusSig.style.color = '#10b981';
                } else if (sigmoidPlaying) {
                    statusSig.innerText = `En cours (${sigmoidEpoch} epochs)`;
                    statusSig.style.color = '#3b82f6';
                } else {
                    statusSig.innerText = `Stopped (${sigmoidEpoch} epochs)`;
                    statusSig.style.color = '#ef4444';
                }
            }

            const statusRelu = document.getElementById('status-relu');
            if (statusRelu) {
                if (reluEpoch >= 150) {
                    statusRelu.innerText = `Prêt (${reluEpoch} epochs)`;
                    statusRelu.style.color = '#10b981';
                } else if (reluPlaying) {
                    statusRelu.innerText = `En cours (${reluEpoch} epochs)`;
                    statusRelu.style.color = '#3b82f6';
                } else {
                    statusRelu.innerText = `Stopped (${reluEpoch} epochs)`;
                    statusRelu.style.color = '#ef4444';
                }
            }

            if (sigmoidEpoch >= 150 && reluEpoch >= 150) {
                clearInterval(simulationCheckInterval);
                simulationCheckInterval = null;
                
                const btnNext = document.getElementById('btn-next-act2');
                if (btnNext) {
                    btnNext.removeAttribute('disabled');
                    btnNext.classList.add('blink-next');
                }

                fPanel.innerHTML = `
                    <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                        ✅ Les deux modèles ont dépassé 150 époques. Cliquez sur <strong>Next</strong> pour classifier vos observations !
                    </div>
                `;
            }

        } catch (e) {
            console.error("Checking error", e);
        }
    }, 1000);

    document.getElementById('btn-next-act2').onclick = () => {
        if (simulationCheckInterval) {
            clearInterval(simulationCheckInterval);
            simulationCheckInterval = null;
        }
        renderActivity3();
    };
}

// Activity 3: Observation Drag & Drop Table
const observationsData = {
    dropZones: [
        { id: "sig-weight", model: "sigmoid", type: "weight", correctVal: "vsu", text: "Very small updates in early layers" },
        { id: "sig-learning", model: "sigmoid", type: "learning", correctVal: "sba", text: "Slow, blocked, or absent" },
        { id: "sig-neuron", model: "sigmoid", type: "neuron", correctVal: "enf", text: "Early neurons fail to learn useful features" },
        { id: "sig-layer", model: "sigmoid", type: "layer", correctVal: "eia", text: "Early layers are \"inactive\" (no learning signal)" },
        { id: "sig-suitability", model: "sigmoid", type: "suitability", correctVal: "pc", text: "Poor choice" },

        { id: "relu-weight", model: "relu", type: "weight", correctVal: "eua", text: "Effective updates across all layers" },
        { id: "relu-learning", model: "relu", type: "learning", correctVal: "cont", text: "Continuous" },
        { id: "relu-neuron", model: "relu", type: "neuron", correctVal: "lmh", text: "Neurons learn meaningful hierarchical representations" },
        { id: "relu-layer", model: "relu", type: "layer", correctVal: "alc", text: "All layers contribute to learning" },
        { id: "relu-suitability", model: "relu", type: "suitability", correctVal: "pfc", text: "Preferred choice" }
    ],
    cards: [
        { id: "vsu", text: "Very small updates in early layers", correctZone: "sig-weight" },
        { id: "sba", text: "Slow, blocked, or absent", correctZone: "sig-learning" },
        { id: "enf", text: "Early neurons fail to learn useful features", correctZone: "sig-neuron" },
        { id: "eia", text: "Early layers are \"inactive\" (no learning signal)", correctZone: "sig-layer" },
        { id: "pc", text: "Poor choice", correctZone: "sig-suitability" },

        { id: "eua", text: "Effective updates across all layers", correctZone: "relu-weight" },
        { id: "cont", text: "Continuous", correctZone: "relu-learning" },
        { id: "lmh", text: "Neurons learn meaningful hierarchical representations", correctZone: "relu-neuron" },
        { id: "alc", text: "All layers contribute to learning", correctZone: "relu-layer" },
        { id: "pfc", text: "Preferred choice", correctZone: "relu-suitability" }
    ]
};

let correctDropsCount = 0;

function renderActivity3() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper" style="margin-bottom:10px;">
            <div class="quiz-question-badge" style="background:#10b981;">Activity 3</div>
            <div class="quiz-question-card" style="font-size: 12px; line-height: 1.4;">
                <strong>Tableau Comparatif</strong> - Associez chaque observation à la fonction d'activation correspondante (Sigmoid ou ReLU). <br>
                <i>Glissez une carte ou cliquez dessus puis cliquez sur la case correspondante dans le tableau.</i>
            </div>
        </div>
        
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Observation</th>
                    <th>Sigmoid<br><img src="assets/images/or.jpg.png" style="height:15px; vertical-align:middle; border-radius:2px;"></th>
                    <th>ReLU<br><img src="assets/images/output.jpg.png" style="height:15px; vertical-align:middle; border-radius:2px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="criteria-col">Weight updates</td>
                    <td class="drop-zone-cell" id="zone-sig-weight" data-zone="sig-weight">Drop zone</td>
                    <td class="drop-zone-cell" id="zone-relu-weight" data-zone="relu-weight">Drop zone</td>
                </tr>
                <tr>
                    <td class="criteria-col">Learning progression</td>
                    <td class="drop-zone-cell" id="zone-sig-learning" data-zone="sig-learning">Drop zone</td>
                    <td class="drop-zone-cell" id="zone-relu-learning" data-zone="relu-learning">Drop zone</td>
                </tr>
                <tr>
                    <td class="criteria-col">Neuron features</td>
                    <td class="drop-zone-cell" id="zone-sig-neuron" data-zone="sig-neuron">Drop zone</td>
                    <td class="drop-zone-cell" id="zone-relu-neuron" data-zone="relu-neuron">Drop zone</td>
                </tr>
                <tr>
                    <td class="criteria-col">Layer behavior</td>
                    <td class="drop-zone-cell" id="zone-sig-layer" data-zone="sig-layer">Drop zone</td>
                    <td class="drop-zone-cell" id="zone-relu-layer" data-zone="relu-layer">Drop zone</td>
                </tr>
                <tr>
                    <td class="criteria-col">Suitability</td>
                    <td class="drop-zone-cell" id="zone-sig-suitability" data-zone="sig-suitability">Drop zone</td>
                    <td class="drop-zone-cell" id="zone-relu-suitability" data-zone="relu-suitability">Drop zone</td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 10px;">
            <h4 style="font-size:10px; text-transform:uppercase; color:#94a3b8; margin:0 0 5px 0; letter-spacing:0.5px;">Cartes d'observations</h4>
            <div id="observation-cards-container" style="min-height: 80px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:6px; padding:6px;"></div>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box">
            💡 Associez les cartes aux bonnes cases du tableau en comparant both models.
        </div>
    `;

    const cardsContainer = document.getElementById('observation-cards-container');
    const shuffledCards = [...observationsData.cards].sort(() => Math.random() - 0.5);

    shuffledCards.forEach(c => {
        const card = document.createElement('div');
        card.className = 'observation-card';
        card.id = `card-${c.id}`;
        card.innerText = c.text;
        card.draggable = true;

        card.ondragstart = (e) => {
            draggedCardId = c.id;
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', c.id);
        };
        card.ondragend = () => {
            card.classList.remove('dragging');
        };

        card.onclick = (e) => {
            e.stopPropagation();
            if (selectedCardId === c.id) {
                selectedCardId = null;
                card.classList.remove('selected');
            } else {
                Array.prototype.forEach.call(cardsContainer.querySelectorAll('.observation-card'), el => el.classList.remove('selected'));
                selectedCardId = c.id;
                card.classList.add('selected');
            }
        };

        cardsContainer.appendChild(card);
    });

    const dropZones = qPanel.querySelectorAll('.drop-zone-cell');
    dropZones.forEach(zone => {
        const zoneId = zone.getAttribute('data-zone');

        zone.ondragover = (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        };
        zone.ondragleave = () => {
            zone.classList.remove('dragover');
        };
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
            handleDrop(cardId, zoneId);
        };

        zone.onclick = () => {
            if (selectedCardId) {
                handleDrop(selectedCardId, zoneId);
            }
        };
    });
}

function handleDrop(cardId, zoneId) {
    if (!cardId || !zoneId) return;

    const cardData = observationsData.cards.find(c => c.id === cardId);
    const zoneData = observationsData.dropZones.find(z => z.id === zoneId);

    if (!cardData || !zoneData) return;

    const cardEl = document.getElementById(`card-${cardId}`);
    const zoneEl = document.getElementById(`zone-${zoneId}`);
    const fPanel = document.getElementById('quiz-feedback-panel');

    if (!cardEl || !zoneEl) return;

    if (cardData.correctZone === zoneId) {
        // Success
        correctDropsCount++;
        zoneEl.innerHTML = `<div class="pill-matched">${cardData.text}</div>`;
        zoneEl.className = "drop-zone-cell correct-drop";
        zoneEl.onclick = null;
        zoneEl.ondragover = null;

        cardEl.remove();
        selectedCardId = null;

        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color:#10b981; background: rgba(16, 185, 129, 0.1);">
                ✅ Correct ! L'observation correspond parfaitement à cette case.
            </div>
        `;

        if (correctDropsCount === 10) {
            triggerCompletion();
        }
    } else {
        // Shake animation for error
        cardEl.classList.add('shake-error');
        setTimeout(() => cardEl.classList.remove('shake-error'), 450);

        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color:#ef4444; background: rgba(239, 68, 68, 0.1);">
                ❌ Incorrect. Cette observation ne correspond pas à cette case du tableau. Réessayez !
            </div>
        `;
    }
}

function triggerCompletion() {
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (fPanel) {
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                🎉 Excellent! Vous avez classé toutes les observations avec succès.
            </div>
        `;
    }

    // Modal completion
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'completion-overlay';
    overlay.style.zIndex = '10006';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "💡 Observations Validées !";

    const p = document.createElement('p');
    p.innerText = "Excellent! Let’s now examine the conclusions that can be drawn from these observations about gradients.";

    const okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "Take the quiz";

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    okBtn.onclick = () => {
        overlay.remove();

        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';

        const qPanel = document.getElementById('quiz-question-panel');
        if (qPanel) {
            qPanel.innerHTML = `
                <div class="quiz-question-wrapper">
                    <div class="quiz-question-badge">Congratulations</div>
                    <div class="quiz-question-card">
                        Vous avez terminé les observations. Cliquez sur le bouton "Take the quiz" en bas à droite pour valider vos conclusions.
                    </div>
                </div>
            `;
        }
    };
}