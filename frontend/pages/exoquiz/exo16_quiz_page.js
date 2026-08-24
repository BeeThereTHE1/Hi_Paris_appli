(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var container = document.getElementById('widget-profil-header');
    if (!container) return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        var visitorBtn = document.createElement('a');
        visitorBtn.href = '../Page-demo/register.html';
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span>';
        container.appendChild(visitorBtn);
        return;
    }
    var initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 200px rgba(16, 185, 129, 0.4); transition: 0.3s;';
    avatar.innerText = initiales.toUpperCase();
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 17px; font-weight: 800; color: #fff;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="../Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📊 Mon Historique</a>
          <a href="../statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📈 Mes Statistiques</a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;">🚪 Déconnexion</div>
        </div>
      `;
    var isOpen = false;
    avatar.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block'; setTimeout(function () { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        } else {
            menu.style.opacity = '0'; menu.style.transform = 'scale(0.9) translateY(-10px)'; setTimeout(function () { menu.style.display = 'none'; }, 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = function () { localStorage.removeItem('isLoggedIn'); window.location.href = '../index.html'; };
    container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');

btnSauvegarder.onclick = function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) { window.location.href = '../Page-demo/register.html'; return; }

    if (window.StorageService) {
        window.StorageService.save(16).then(function (success) {
            if (success) {
                btnSauvegarder.innerHTML = '✅ Saved !';
                btnSauvegarder.style.opacity = '0.7';
                btnSauvegarder.disabled = true;
            }
        });
    }
};

btnRealise.onclick = function () {
    showCompletionScreen();
};

// ——— ANIMATION D'ARRIÈRE-PLAN ———
var backgroundContainer = document.getElementById('background-container');
var formulas = ['\\sqrt{x}', '\\int', 'f(x) = ax^2', '\\frac{dy}{dx}', '\\sin(t)', 'e^{-t}'];
var numFormulas = 25; var numNeurons = 30; var numConnections = 50;
var neurons = []; var connections = []; var formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass) {
    var element = document.createElement('div');
    element.className = elementClass; element.style.position = 'absolute';
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = 'clamp(1rem, 5vw, 2.5rem)'; element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = 'rgba(255, 255, 255, ' + element.style.opacity + ')';
        element.style.left = getRandom(-20, 120) + 'vw'; element.style.top = getRandom(-20, 120) + 'vh';
        element.style.transform = 'rotate(' + getRandom(-30, 30) + 'deg)'; formulasElements.push(element);
    } else if (type === 'neuron') {
        var size = getRandom(10, 25);
        element.style.width = size + 'px'; element.style.height = size + 'px';
        element.style.backgroundColor = 'hsl(' + getRandom(190, 250) + ', 70%, 50%)';
        element.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ' + element.style.backgroundColor;
        element.style.left = getRandom(-10, 110) + 'vw'; element.style.top = getRandom(-10, 110) + 'vh';
        element.style.opacity = 0; element.style.transform = 'scale(0)';
        neurons.push({ element: element, size: size, x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
}
function createConnection(n1, n2) {
    var conn = document.createElement('div'); conn.className = 'connection'; conn.style.position = 'absolute';
    conn.style.height = '1.5px'; conn.style.background = 'linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))';
    conn.style.filter = 'blur(4px)'; connections.push({ element: conn, neuron1: n1, neuron2: n2, opacity: 0 });
    backgroundContainer.appendChild(conn);
}
function lerp(start, end, amount) { return (1 - amount) * start + amount * end; }
function initializeBackground() {
    for (var i = 0; i < numFormulas; i++) createAnimatedElement('formula', 'math-formula');
    for (var i = 0; i < numNeurons; i++) createAnimatedElement('neuron', 'neuron');
    for (var i = 0; i < numConnections; i++) {
        var n1 = neurons[Math.floor(Math.random() * neurons.length)];
        var n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2) createConnection(n1, n2);
    }
}
function animateBackground() {
    var windowWidth = window.innerWidth; var windowHeight = window.innerHeight; var time = Date.now() * 0.0005;
    neurons.forEach(function (neuron, index) {
        var angle = index * (2 * Math.PI / numNeurons) + time;
        var radius = Math.min(windowWidth, windowHeight) * 0.3;
        var targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        var targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        neuron.element.style.opacity = neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.element.style.transform = 'scale(' + (neuron.scale = Math.max(neuron.scale, 1)) + ')';
        neuron.element.style.left = (neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)) + 'px';
        neuron.element.style.top = (neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)) + 'px';
    });
    connections.forEach(function (conn) {
        var element = conn.element, neuron1 = conn.neuron1, neuron2 = conn.neuron2;
        var x1 = neuron1.x + neuron1.size / 2; var y1 = neuron1.y + neuron1.size / 2;
        var x2 = neuron2.x + neuron2.size / 2; var y2 = neuron2.y + neuron2.size / 2;
        var length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        element.style.opacity = 0.3; element.style.width = length + 'px';
        element.style.left = x1 + 'px'; element.style.top = y1 + 'px';
        element.style.transform = 'rotate(' + angle + 'deg)';
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground(); animateBackground();

// Inject Quiz custom styles
var styleEl = document.createElement('style');
styleEl.textContent = `
  .quiz-section-wrapper {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  }
  .quiz-section-title {
    font-size: 14px; font-weight: 700; color: #a78bfa; margin-bottom: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 5px;
  }
  .quiz-pair-container {
    display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;
  }
  .quiz-pair-option {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 12px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    text-align: left;
    width: 100%;
  }
  .quiz-pair-option:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }
  .quiz-pair-option.correct {
    background: rgba(16, 185, 129, 0.15) !important;
    border-color: #10b981 !important;
    color: #10b981 !important;
    pointer-events: none;
  }
  .quiz-pair-option.incorrect {
    background: rgba(239, 68, 68, 0.1) !important;
    border-color: #ef4444 !important;
    color: #f87171 !important;
  }
  .quiz-pair-option.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
  .checkbox-circle {
    min-width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 800;
  }
  .correct .checkbox-circle {
    border-color: #10b981; background: #10b981; color: white;
  }
  .incorrect .checkbox-circle {
    border-color: #ef4444; background: #ef4444; color: white;
  }

  /* Schema custom styles */
  .schema-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    height: 100%;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 10px;
    font-family: 'Inter', sans-serif;
  }
  .schema-col {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }
  .schema-col.show {
    opacity: 1;
    transform: translateY(0);
  }
  .schema-col.col-1 { border-top: 4px solid #3b82f6; }
  .schema-col.col-2 { border-top: 4px solid #10b981; }
  .schema-col.col-3 { border-top: 4px solid #f59e0b; }
  .schema-col.col-4 { border-top: 4px solid #FF034D; }

  .schema-col.flash-col {
    animation: border-glow 1s infinite alternate;
  }
  @keyframes border-glow {
    0% { border-top-color: #FF034D; box-shadow: none; }
    100% { border-top-color: #ef4444; box-shadow: 0 0 12px rgba(255, 3, 77, 0.4); background: rgba(255, 3, 77, 0.04); }
  }

  .schema-col h4 {
    margin: 0 0 8px 0; font-size: 11.5px; font-weight: 700; color: #a78bfa;
    border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px;
    text-align: center;
  }
  .schema-col p {
    font-size: 10px; line-height: 1.4; color: #cbd5e1; margin: 4px 0;
  }
  .schema-card-formula {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 6px;
    font-family: monospace;
    font-size: 10px;
    text-align: center;
    color: #38bdf8;
    margin: 6px 0;
  }
  .clickable-word {
    padding: 1px 3px; border-radius: 3px; cursor: pointer;
    background: rgba(255,255,255,0.05); transition: all 0.2s;
  }
  .clickable-word:hover {
    background: rgba(139, 92, 246, 0.3); color: #fff;
  }
  .error-word {
    color: #FF034D; font-weight: 700; border-bottom: 1px dashed #FF034D;
  }
  .error-word.blink-word {
    animation: red-word-flash 0.8s infinite;
  }
  @keyframes red-word-flash {
    0%, 100% { background: transparent; color: #FF034D; }
    50% { background: #FF034D; color: white; }
  }

  .feedback-box {
    background: rgba(255, 255, 255, 0.05); border-left: 4px solid #8b5cf6;
    padding: 10px 12px; border-radius: 4px; font-size: 12.5px; color: #e2e8f0;
    line-height: 1.4; margin-top: 10px; animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  
  .hint-btn {
    background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3);
    color: #f59e0b; padding: 6px 14px; border-radius: 6px; font-size: 11px; cursor: pointer; transition: all 0.2s;
  }
  .hint-btn:hover { background: rgba(245, 158, 11, 0.2); }
  .reveal-btn {
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171; padding: 6px 14px; border-radius: 6px; font-size: 11px; cursor: pointer; transition: all 0.2s;
  }
  .reveal-btn:hover:not(:disabled) { background: rgba(239, 68, 68, 0.2); }
  .reveal-btn:disabled { opacity: 0.4; cursor: not-allowed; }
`;
document.head.appendChild(styleEl);

var correctAnswers = {
    pair1: null,
    pair2: null,
    pair3: null
};

// Initial state: Activity 4
window.addEventListener('load', function () {
    renderActivity4();
});

function renderActivity4() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper" style="margin-bottom:15px;">
            <div class="quiz-question-badge" style="background:#8b5cf6;">Activité 4</div>
            <div class="quiz-question-card" style="font-size: 13px; line-height: 1.4;">
                <strong>Identify the correct conclusions</strong> -For each pair of statements below, select the correct statement based on your observations of the simulation.
            </div>
        </div>

        <div class="quiz-section-wrapper">
            <div class="quiz-section-title">1. Early layers behavior</div>
            <div class="quiz-pair-container" id="pair1-container">
                <button class="quiz-pair-option" data-pair="pair1" data-correct="true" id="opt-1a">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The neurons and weights in the first layers barely changed because the error signal (backward pass) did not reach them.</span>
                </button>
                <button class="quiz-pair-option" data-pair="pair1" data-correct="false" id="opt-1b">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The neurons and weights in the first layers changed very slowly because most of the learning was concentrated in the deeper layers.</span>
                </button>
            </div>
        </div>

        <div class="quiz-section-wrapper">
            <div class="quiz-section-title">2. Role of the gradient</div>
            <div class="quiz-pair-container" id="pair2-container">
                <button class="quiz-pair-option" data-pair="pair2" data-correct="true" id="opt-2a">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The gradient, which is responsible for updating the weights and enabling learning, becomes smaller and eventually disappears.</span>
                </button>
                <button class="quiz-pair-option" data-pair="pair2" data-correct="false" id="opt-2b">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The gradient becomes very stable at small values, allowing the model to converge smoothly without large weight updates.</span>
                </button>
            </div>
        </div>

        <div class="quiz-section-wrapper">
            <div class="quiz-section-title">3. Role of the activation function</div>
            <div class="quiz-pair-container" id="pair3-container">
                <button class="quiz-pair-option" data-pair="pair3" data-correct="true" id="opt-3a">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The Sigmoid function is responsible for the gradient killing phenomenon because it strongly reduces the gradient at each layer.</span>
                </button>
                <button class="quiz-pair-option" data-pair="pair3" data-correct="false" id="opt-3b">
                    <span class="checkbox-circle"></span>
                    <span class="option-text">The gradient killing phenomenon mainly occurs when the model is too deep, regardless of the activation function used.</span>
                </button>
            </div>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box">
            💡 Sélectionnez la bonne conclusion for each category.
        </div>
    `;

    var options = qPanel.querySelectorAll('.quiz-pair-option');
    options.forEach(function (opt) {
        opt.onclick = function () {
            var pair = opt.getAttribute('data-pair');
            var isCorrect = opt.getAttribute('data-correct') === 'true';
            var parent = opt.parentElement;

            if (isCorrect) {
                correctAnswers[pair] = true;
                opt.className = "quiz-pair-option correct";

                // Disable other options in this pair
                var siblings = parent.querySelectorAll('.quiz-pair-option');
                siblings.forEach(function (sib) {
                    if (sib !== opt) {
                        sib.className = "quiz-pair-option disabled";
                    }
                });

                fPanel.innerHTML = `
                    <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15);">
                        ✅ Correct! This conclusion is scientifically valid.
                    </div>
                `;

                checkActivity4Completion();
            } else {
                opt.className = "quiz-pair-option incorrect";
                setTimeout(function () {
                    opt.className = "quiz-pair-option";
                }, 1500);

                fPanel.innerHTML = `
                    <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                        ❌ That's not correct. Carefully reread the simulation observations.
                    </div>
                `;
            }
        };
    });
}

function checkActivity4Completion() {
    if (correctAnswers.pair1 && correctAnswers.pair2 && correctAnswers.pair3) {
        var fPanel = document.getElementById('quiz-feedback-panel');
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); font-weight: 700;">
                🎉 Excellent! All your conclusions are correct.<br>
                <div style="text-align: right; margin-top: 10px;">
                    <button class="tutorial-btn" id="btn-next-act4" style="padding: 8px 20px; font-size:12px;">NEXT : Find the Mistake</button>
                </div>
            </div>
        `;

        document.getElementById('btn-next-act4').onclick = function () {
            renderActivity5();
        };
    }
}

// Activity 5: Synthesis schema and Find the Mistake game
function renderActivity5() {
    var leftPanel = document.getElementById('left-panel-container');
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!leftPanel || !qPanel || !fPanel) return;

    // 1. Replace left panel content with the synthesis schema columns
    leftPanel.innerHTML = `
        <div class="schema-wrapper">
            <div class="schema-col col-1" id="schema-col-1">
                <h4>1. Update Rule & Gradient</h4>
                <p>Learning and weights evolution (w_old → w_new) depends on the gradient.</p>
                <div class="schema-card-formula">w_new = w_old - η * (∂Loss / ∂w)</div>
                <p>Where:<br>
                • w_old = current weight<br>
                • η = learning rate<br>
                • ∂Loss/∂w = gradient<br>
                • w_new = updated weight</p>
            </div>
            
            <div class="schema-col col-2" id="schema-col-2">
                <h4>2. Deep Learning (Chain Rule)</h4>
                <p>In backpropagation, the gradient is computed as a product of derivatives across layers:</p>
                <div class="schema-card-formula">∂Loss / ∂w = (∂Loss / ∂a_n) * (∂a_n / ∂w)</div>
                <p>Gradient  =  multiplication of many terms</p>
            </div>

            <div class="schema-col col-3" id="schema-col-3">
                <h4>3.a. ReLU activation</h4>
                <p>With ReLU, only two possible gradient values:</p>
                <div class="schema-card-formula">
                    ReLU'(x) = 1 if x > 0<br>
                    ReLU'(x) = 0 if x ≤ 0
                </div>
                <p>• <b>Gradient = 0</b> → No signal passes ("dead neuron").<br>
                • <b>Gradient = 1</b> →Full signal passes backward. <br>
                • <b>Weights are updated normally.<br>
                gradient ≈ 1 * 1 * 1... = 1.<br><br>
                ReLU does NOT shrink gradients (no multiplication by small values). When active → gradient stays strong (1) → learning continues
</p>
            </div>

            <div class="schema-col col-4" id="schema-col-4">
                <h4>3.b. Sigmoid activation</h4>
                <p>Sigmoid derivative: <span class="clickable-word" data-word="0.25">Always ≤ 0.25</span></p>
                <p>Chain effect in deep networks:<br>
                gradient ≈ 0.25 * 0.25 * 0.25...</p>
                <p>→ Gradient becomes <span class="clickable-word" data-word="small">extremely small</span></p>
                <p>Example (6 layers): 0.25^6 ≈ 0.00024</p>
                <p>→ Weights do not <span class="clickable-word" data-word="change">change</span>, learning <span class="clickable-word" data-word="stops">stops</span></p>
                <div class="schema-card-formula">Δw = η * gradient ≈ 0</div>
                <p>This is "gradient killing".<br>
                The gradient becomes almost <span class="clickable-word error-word" id="word-error" data-word="infinite">infinite</span> after multiplication.</p>
                <p>→ It gets <span class="clickable-word" data-word="killed">“killed”</span> during backpropagation.</p>
            </div>
        </div>
    `;

    // 2. Set right panel text and game UI
    qPanel.innerHTML = `
        <div class="quiz-question-wrapper" style="margin-bottom:15px;">
            <div class="quiz-question-badge" style="background:#FF034D;">Activity 5</div>
            <div class="quiz-question-card" style="font-size: 13px; line-height: 1.45;">
                <strong>Find the error in the diagram</strong><br><br>
                Carefully examine the summary columns that have just appeared on the left.<br><br>

<b>Challenge:</b> A major conceptual error has crept into the text of column <b>3.b (Sigmoid)</b>. Click directly on the incorrect word to correct the diagram and complete the exercise.

</div>
        </div>

        <div style="display:flex; gap:10px; justify-content:center; margin-top:20px;">
            <button class="hint-btn" id="btn-hint">Give me a Hint</button>
            <button class="reveal-btn" id="btn-reveal" disabled>Reveal Answer (20s)</button>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box">
            📖 Read the diagram column by column on the left.
        </div>
    `;

    // 3. Sequential reveal of columns
    var showCol = function (id, delay, callback) {
        setTimeout(function () {
            var col = document.getElementById(id);
            if (col) col.classList.add('show');
            if (callback) callback();
        }, delay);
    };

    showCol('schema-col-1', 100, function () {
        showCol('schema-col-2', 3000, function () {
            showCol('schema-col-3', 6000, function () {
                showCol('schema-col-4', 9000, function () {
                    // Enable game elements once all columns are loaded
                    initFindMistakeGame();
                });
            });
        });
    });
}

function initFindMistakeGame() {
    var fPanel = document.getElementById('quiz-feedback-panel');
    fPanel.innerHTML = `
        <div class="feedback-box">
            🔍The diagram is complete! Look for the conceptual error in the Sigmoid column.
        </div>
    `;

    // Handle Hint button
    document.getElementById('btn-hint').onclick = function () {
        var col4 = document.getElementById('schema-col-4');
        if (col4) {
            col4.classList.add('flash-col');
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.1);">
                    💡 Indice : L'erreur se trouve dans la colonne <b>3.b. Sigmoid</b>. Regardez bien les termes scientifiques.
                </div>
            `;
            setTimeout(function () {
                col4.classList.remove('flash-col');
            }, 3000);
        }
    };

    // Handle Reveal Answer button timer
    var revealBtn = document.getElementById('btn-reveal');
    var timeLeft = 2;
    var timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft > 0) {
            revealBtn.innerText = `Reveal Answer (${timeLeft}s)`;
        } else {
            clearInterval(timerInterval);
            revealBtn.removeAttribute('disabled');
            revealBtn.innerText = "Reveal Answer";
        }
    }, 1000);

    revealBtn.onclick = function () {
        var errWord = document.getElementById('word-error');
        if (errWord) {
            errWord.classList.add('blink-word');
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                    💡 Le mot erroné est en rouge clignotant. Cliquez dessus !
                </div>
            `;
        }
    };

    // Handle clicking words
    var clickableWords = document.querySelectorAll('.clickable-word');
    clickableWords.forEach(function (word) {
        word.onclick = function (e) {
            e.stopPropagation();
            var wordVal = word.getAttribute('data-word');

            if (wordVal === 'infinite') {
                clearInterval(timerInterval);
                revealBtn.disabled = true;

                word.className = "clickable-word error-word correct";
                word.style.background = "#10b981";
                word.style.color = "#fff";
                word.style.borderColor = "#10b981";
                word.innerText = "zero"; // Correct the schema word

                fPanel.innerHTML = `
                    <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15);">
                        <strong>✅ Correct !</strong> The gradient becomes almost <b>zero</b>, not infinite.<br><br>
                        This happens because multiplying many small derivatives (Sigmoid) makes the gradient vanish, which stops learning.<br>
                        <i>Génération des félicitations...</i>
                    </div>
                `;

                // Enable final success button in footer as backup
                btnRealise.removeAttribute('disabled');
                btnRealise.classList.remove('btn-disabled');
                btnRealise.classList.add('btn-success-ready');

                // Trigger the congrats completion screen overlay
                setTimeout(function () {
                    showCompletionScreen();
                }, 1500);
            } else {
                fPanel.innerHTML = `
                    <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                        ❌ That's not the right word. Read the Sigmoid column carefully.!
                    </div>
                `;
            }
        };
    });
}

// ─── COMPLETION SCREEN ───────────────────────────────────────────────────────
function showCompletionScreen() {
    document.querySelectorAll(".completion-overlay").forEach(function (el) { el.remove(); });

    var overlay = document.createElement("div");
    overlay.className = "completion-overlay";

    overlay.innerHTML = `
    <div class="completion-card">
      <!-- Canvas pour l'effet confettis -->
      <canvas id="confetti-canvas" class="confetti-canvas" width="560" height="387"></canvas>

      <!-- Grande étoile animée (zoom + rotation) -->
      <div class="completion-star-wrap">
        <span class="completion-star">⭐</span>
      </div>

      <!-- Titre et message de félicitations -->
      <h2 class="completion-title">Well Done!</h2>
      <p class="completion-msg">You have finished this exercise.<br>
        Go back home to the dashboard,<br>
        <strong>next exercise has been unlocked!</strong>
      </p>

      <!-- Actions -->
      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../Page-demo/exercises.html">
          🚀 Return to Exercises
        </a>
      </div>
    </div>

    <!-- Fixed home icon bottom-right -->
    <a class="completion-home-icon blink-btn" href="../Page-demo/exercises.html" title="Back to Dashboard">
      🏠
    </a>
  `;

    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
        requestAnimationFrame(function () { overlay.classList.add("show"); });
    });

    requestAnimationFrame(function () { launchConfetti(); });

    // API Call to register completion to DB
    (async function () {
        localStorage.setItem('quiz_section_4_completed', 'true');
        if (window.StorageService) {
            await window.StorageService.complete(16);
            console.log("✅ Exercise 16 marked as COMPLETED.");
        }
    })();
}

// ─── CONFETTI ENGINE ─────────────────────────────────────────────────────────
function launchConfetti() {
    var canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var COLORS = ["#FF034D", "#FFD700", "#10b981", "#6366f1", "#ffffff", "#FF6B35"];
    var pieces = Array.from({ length: 120 }, function () {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            speed: Math.random() * 3 + 1.5,
            spin: (Math.random() - 0.5) * 0.15,
            angle: Math.random() * Math.PI * 2,
            drift: (Math.random() - 0.5) * 1.5
        };
    });

    var frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(function (p) {
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
