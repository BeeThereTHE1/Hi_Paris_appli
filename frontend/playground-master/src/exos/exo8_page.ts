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
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 200px rgba(16, 185, 129, 0.4); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
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
    const logoutBtn = menu.querySelector('#btnFuturLogout') as HTMLElement;
    if (logoutBtn) {
        logoutBtn.onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    }
    container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
const btnSauvegarder = document.getElementById('btn-sauvegarder') as HTMLButtonElement;
const btnRealise = document.getElementById('btn-realise') as HTMLButtonElement;

btnSauvegarder.onclick = async () => {
    if ((window as any).StorageService) {
        const success = await (window as any).StorageService.save(8);
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
    
    if ((window as any).StorageService) {
        const success = await (window as any).StorageService.complete(8);
        if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => {
                window.location.href = 'exoquiz/exo8_quiz.html';
            }, 800);
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

// Inject dynamic CSS style for arrows & custom components
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes arrow-flash {
    0%, 100% { opacity: 0; transform: translate(0, 0); }
    50% { opacity: 1; transform: translate(-10px, 10px); }
  }
  .tutorial-arrow {
    position: absolute;
    pointer-events: none;
    z-index: 10000;
    width: 60px;
    height: 60px;
    animation: arrow-flash 0.6s ease-in-out infinite;
  }
  
  .btn-choice {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    min-width: 60px;
  }
  .btn-choice:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  .btn-choice.active-yes {
    background: #10b981;
    border-color: #10b981;
    color: white;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
  }
  .btn-choice.active-no {
    background: #ef4444;
    border-color: #ef4444;
    color: white;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
  }
  
  .btn-validate {
    display: block;
    width: 100%;
    margin-top: 20px;
    background: #8b5cf6;
    border: none;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .btn-validate:hover {
    background: #7c3aed;
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
  }
  

  .feedback-box {
    background: rgba(255, 255, 255, 0.05);
    border-left: 4px solid #8b5cf6;
    padding: 12px;
    border-radius: 4px;
    font-size: 13.5px;
    color: #e2e8f0;
    line-height: 1.4;
    margin-top: 10px;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);

// ——— EXECUTION LOGIC PÉDAGOGIQUE ———
let translations = null;
let activeArrows = [];

async function loadTranslations() {
    try {
        const response = await fetch('texte.json');
        if (!response.ok) throw new Error("Failed to load translation json");
        const data = await response.json();
        translations = data.exercises.exercise_8;
        
        if (translations) {
            if (translations.title) {
                document.title = translations.title;
                const titleEl = document.querySelector('.exo-title');
                if (titleEl) (titleEl as HTMLElement).innerText = translations.title;
            }
            if (translations.instructions && translations.instructions.general) {
                const instrEl = document.querySelector('.exo-instructions');
                if (instrEl) {
                    (instrEl as HTMLElement).innerText = translations.instructions.general;
                }
            }
        }
    } catch (error) {
        console.warn("Could not load translations from JSON.", error);
    }
}

function startTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo8-tutorial-overlay';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #8 Instability";

    const p = document.createElement('p');
    const text = translations && translations.instructions && translations.instructions.general 
        ? translations.instructions.general 
        : "Run the two models below (same dataset and settings) and identify what explains the differences between their results.";
    p.innerText = text;

    const timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8;';

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

    const wordCount = text.split(/\s+/).length;
    let timeLeft = 2;

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
        setTimeout(() => {
            showFlashingArrows();
            renderActivity0();
        }, 1000);
    };
}

function getIframeElementRect(iframeId: string, targetSelector: string) {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (!iframe) return null;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const el = iframeDoc.querySelector(targetSelector);
        if (!el) return null;

        const iframeRect = iframe.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        return {
            top: iframeRect.top + elRect.top,
            left: iframeRect.left + elRect.left,
            bottom: iframeRect.top + elRect.bottom,
            right: iframeRect.left + elRect.right,
            width: elRect.width,
            height: elRect.height
        };
    } catch (e) {
        return null;
    }
}

function showFlashingArrows() {
    activeArrows.forEach(a => a.remove());
    activeArrows = [];

    ['iframe-model1', 'iframe-model2'].forEach(iframeId => {
        const rect = getIframeElementRect(iframeId, '#play-pause-button');
        if (!rect) return;

        const arrow = document.createElement('div');
        arrow.className = 'tutorial-arrow';
        arrow.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));">
              <path d="M50,10 L10,50 M10,50 L25,50 M10,50 L10,35" stroke="#FF034D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        `;
        arrow.style.position = 'absolute';
        arrow.style.pointerEvents = 'none';
        arrow.style.zIndex = '10000';
        arrow.style.animation = 'arrow-flash 0.6s ease-in-out infinite';
        arrow.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
        arrow.style.top = `${rect.top - 60 + window.scrollY}px`;
        document.body.appendChild(arrow);
        activeArrows.push(arrow);
    });

    const dismissArrows = () => {
        activeArrows.forEach(a => a.remove());
        activeArrows = [];
        document.removeEventListener('click', dismissArrows);
        ['iframe-model1', 'iframe-model2'].forEach(iframeId => {
            try {
                const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.document.removeEventListener('click', dismissArrows);
                }
            } catch(e) {}
        });
    };

    setTimeout(() => {
        document.addEventListener('click', dismissArrows);
        ['iframe-model1', 'iframe-model2'].forEach(iframeId => {
            try {
                const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.document.addEventListener('click', dismissArrows);
                }
            } catch(e) {}
        });
    }, 100);
}

// Activity 0: Waiting for models to run
function renderActivity0() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activity 1</div>
            <div class="quiz-question-card">
                Lancez both models en cliquant sur le bouton de lecture (play) de chacun d'eux, et attendez que les pertes d'entraînement (loss) diminuent sous 0.01.
            </div>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13.5px;">
                <span>Modèle 1 (Graine A) :</span>
                <span id="model1-status-text" style="font-weight:700; color:#ef4444;">Non lancé ⏳</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:13.5px;">
                <span>Modèle 2 (Graine B) :</span>
                <span id="model2-status-text" style="font-weight:700; color:#ef4444;">Non lancé ⏳</span>
            </div>
        </div>
    `;
    fPanel.innerHTML = '';
}

// Activity 1: Q1 options
let q1Answers = {
    weights: false,
    features: false,
    stops: false,
    boundaries: false
};

function renderActivity1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = '';

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activity 1</div>
            <div class="quiz-question-card">
                What differences do you observe between the two results? (Sélectionnez toutes the correct answers)
            </div>
        </div>
        <div class="quiz-options-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
            <button class="quiz-option-btn" data-key="weights" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The final weights</span>
            </button>
            <button class="quiz-option-btn" data-key="features" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The input features change</span>
            </button>
            <button class="quiz-option-btn" data-key="stops" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The training stops earlier in one model</span>
            </button>
            <button class="quiz-option-btn" data-key="boundaries" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The decision boundaries are different</span>
            </button>
        </div>
        <button class="btn-validate" id="btn-validate-act1">Submit</button>
    `;

    const optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    for (let i = 0; i < optionBtns.length; i++) {
        const btn = optionBtns[i] as HTMLButtonElement;
        const key = btn.getAttribute('data-key');
        btn.onclick = () => {
            q1Answers[key] = !q1Answers[key];
            const checkbox = btn.querySelector('.quiz-option-checkbox') as HTMLElement;
            if (q1Answers[key]) {
                checkbox.style.backgroundColor = '#8b5cf6';
                checkbox.innerHTML = '✓';
                checkbox.style.display = 'inline-flex';
                checkbox.style.alignItems = 'center';
                checkbox.style.justifyContent = 'center';
                checkbox.style.color = '#fff';
                checkbox.style.fontSize = '12px';
            } else {
                checkbox.style.backgroundColor = 'transparent';
                checkbox.innerHTML = '';
            }
        };
    }

    const validateBtn = document.getElementById('btn-validate-act1') as HTMLButtonElement;
    validateBtn.onclick = () => {
        // Correct answers: weights = true, boundaries = true, others = false
        const isCorrect = q1Answers.weights && !q1Answers.features && !q1Answers.stops && q1Answers.boundaries;

        if (isCorrect) {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                    <strong>That’s right!</strong> The models use the same data and settings, but their results differ (boundaries and weights).
                    <button class="btn-validate" id="btn-ok-act1" style="margin-top:10px; padding:6px 12px; font-size:12px;">OK</button>
                </div>
            `;
            const okBtn = document.getElementById('btn-ok-act1');
            okBtn.onclick = () => {
                renderActivity2();
            };
        } else {
            // Find feedback details
            let fbMsg = "";
            if (q1Answers.features) {
                fbMsg = "The input features change: The input features remain the same in both models.";
            } else if (q1Answers.stops) {
                fbMsg = "The training stops earlier in one model: Both models use the same training process.";
            } else {
                fbMsg = "Essayez à nouveau de repérer all the differences réelles (poids et frontières).";
            }
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                    ${fbMsg}
                    <button class="btn-validate" id="btn-retry-act1" style="margin-top:10px; padding:6px 12px; font-size:12px; background:#475569;">OK</button>
                </div>
            `;
            const retryBtn = document.getElementById('btn-retry-act1');
            retryBtn.onclick = () => {
                fPanel.innerHTML = '';
            };
        }
    };
}

// Activity 2: Q2 options
let q2Answers = {
    starts: false,
    dataset: false,
    random: false
};

function renderActivity2() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = '';

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activity 2</div>
            <div class="quiz-question-card">
                You observed that the decision boundaries are different in each run, even though nothing was changed. What is the main reason? (Sélectionnez toutes the correct answers)
            </div>
        </div>
        <div class="quiz-options-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
            <button class="quiz-option-btn" data-key="starts" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">Each run starts from a different set of weights</span>
            </button>
            <button class="quiz-option-btn" data-key="dataset" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The dataset changes slightly between runs</span>
            </button>
            <button class="quiz-option-btn" data-key="random" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
                <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;"></span>
                <span class="quiz-option-text">The initial weights are randomly assigned at the start</span>
            </button>
        </div>
        <button class="btn-validate" id="btn-validate-act2">Submit</button>
    `;

    const optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    for (let i = 0; i < optionBtns.length; i++) {
        const btn = optionBtns[i] as HTMLButtonElement;
        const key = btn.getAttribute('data-key');
        btn.onclick = () => {
            q2Answers[key] = !q2Answers[key];
            const checkbox = btn.querySelector('.quiz-option-checkbox') as HTMLElement;
            if (q2Answers[key]) {
                checkbox.style.backgroundColor = '#8b5cf6';
                checkbox.innerHTML = '✓';
                checkbox.style.display = 'inline-flex';
                checkbox.style.alignItems = 'center';
                checkbox.style.justifyContent = 'center';
                checkbox.style.color = '#fff';
                checkbox.style.fontSize = '12px';
            } else {
                checkbox.style.backgroundColor = 'transparent';
                checkbox.innerHTML = '';
            }
        };
    }

    const validateBtn = document.getElementById('btn-validate-act2') as HTMLButtonElement;
    validateBtn.onclick = () => {
        // Correct answers: starts = true, random = true, dataset = false
        const isCorrect = q2Answers.starts && !q2Answers.dataset && q2Answers.random;

        if (isCorrect) {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                    <strong>That’s correct!</strong> Each run starts with randomly initialized weights, so the model begins learning from a different starting point and converges to a different solution (different boundary and final weights).
                    <button class="btn-validate" id="btn-ok-act2" style="margin-top:10px; padding:6px 12px; font-size:12px;">OK</button>
                </div>
            `;
            const okBtn = document.getElementById('btn-ok-act2');
            okBtn.onclick = () => {
                showFinalSummary();
            };
        } else {
            let fbMsg = "Certaines réponses sont incorrectes.";
            if (q2Answers.dataset) {
                fbMsg = "The dataset does not change. Both models use exactly the same data — the difference comes from how the model is initialized, not from the data itself.";
            }
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                    ${fbMsg}
                    <button class="btn-validate" id="btn-retry-act2" style="margin-top:10px; padding:6px 12px; font-size:12px; background:#475569;">OK</button>
                </div>
            `;
            const retryBtn = document.getElementById('btn-retry-act2');
            retryBtn.onclick = () => {
                fPanel.innerHTML = '';
            };
        }
    };
}

// Final Summary Modal
function showFinalSummary() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.style.zIndex = '10005';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    popup.style.maxWidth = '550px';

    const h3 = document.createElement('h3');
    h3.innerText = "The model is unstable.";

    const p = document.createElement('p');
    p.innerHTML = "A neural network learns by adjusting its weights step by step. Without a fixed seed, random weight initialization leads to different starting points. As a result, each run can produce a different model, even with the same data and parameters.";
    p.style.textAlign = 'left';

    const okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "OK";

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    okBtn.onclick = () => {
        overlay.remove();

        // Enable validation/success button
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';

        const fPanel = document.getElementById('quiz-feedback-panel');
        if (fPanel) {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                    ✨ Exercise Successful !! Cliquez sur le bouton "Take the quiz" en bas à droite pour continuer vers le quiz final de l'exercice.
                </div>
            `;
        }
    };
}

// ——— COMMUNICATING WITH DUAL IFRAMES ———
let model1Started = false;
let model2Started = false;
let model1MinLoss = Infinity;
let model2MinLoss = Infinity;
let activity1Rendered = false;

window.addEventListener('message', (event) => {
    if (event.data.type === 'EXO8_STEP') {
        const { modelId, lossTrain, iter } = event.data;
        
        if (modelId === '1') {
            model1Started = true;
            if (lossTrain < model1MinLoss) model1MinLoss = lossTrain;
            const model1Status = document.getElementById('model1-status-text');
            if (model1Status) {
                if (model1MinLoss <= 0.01) {
                    model1Status.innerHTML = `Prêt ! loss = ${model1MinLoss.toFixed(5)} ✅`;
                    model1Status.style.color = '#10b981';
                } else {
                    model1Status.innerHTML = `En cours (loss: ${lossTrain.toFixed(4)}) ⏳`;
                    model1Status.style.color = '#3b82f6';
                }
            }
        } else if (modelId === '2') {
            model2Started = true;
            if (lossTrain < model2MinLoss) model2MinLoss = lossTrain;
            const model2Status = document.getElementById('model2-status-text');
            if (model2Status) {
                if (model2MinLoss <= 0.01) {
                    model2Status.innerHTML = `Prêt ! loss = ${model2MinLoss.toFixed(5)} ✅`;
                    model2Status.style.color = '#10b981';
                } else {
                    model2Status.innerHTML = `En cours (loss: ${lossTrain.toFixed(4)}) ⏳`;
                    model2Status.style.color = '#3b82f6';
                }
            }
        }

        // Auto transition once both reach <= 0.001
        if (model1Started && model2Started && model1MinLoss <= 0.01 && model2MinLoss <= 0.01 && !activity1Rendered) {
            activity1Rendered = true;
            activeArrows.forEach(a => a.remove());
            activeArrows = [];
            
            // Short delay to let user see "Prêt" status before transition
            setTimeout(() => {
                renderActivity1();
            }, 1000);
        }
    } else if (event.data.type === 'EXO8_RESET') {
        const { modelId } = event.data;
        if (modelId === '1') {
            model1Started = false;
            model1MinLoss = Infinity;
            const model1Status = document.getElementById('model1-status-text');
            if (model1Status) {
                model1Status.innerHTML = "Non lancé ⏳";
                model1Status.style.color = '#ef4444';
            }
        } else if (modelId === '2') {
            model2Started = false;
            model2MinLoss = Infinity;
            const model2Status = document.getElementById('model2-status-text');
            if (model2Status) {
                model2Status.innerHTML = "Non lancé ⏳";
                model2Status.style.color = '#ef4444';
            }
        }
    }
});

// Reposition arrow if frame scrolls or window resizes
window.addEventListener('resize', () => {
    if (activeArrows.length > 0) {
        showFlashingArrows();
    }
});
window.addEventListener('scroll', () => {
    if (activeArrows.length > 0) {
        showFlashingArrows();
    }
});

// Load translations and trigger overlay when first iframe is loaded
const iframe1 = document.getElementById('iframe-model1') as HTMLIFrameElement;
if (iframe1) {
    iframe1.addEventListener('load', () => {
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
                            You have already validated this exercise ! Vous pouvez passer au quiz final.
                        </div>
                    </div>
                `;
            }
            return;
        }
        setTimeout(async () => {
            await loadTranslations();
            startTutorial();
        }, 1200);
    });
}