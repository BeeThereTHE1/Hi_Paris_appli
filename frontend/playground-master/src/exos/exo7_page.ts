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
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span>';
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
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;">🚪 Déconnexion</div>
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
        const success = await (window as any).StorageService.save(7);
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
        const success = await (window as any).StorageService.complete(7);
        if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => {
                window.location.href = 'exoquiz/exo7_quiz.html';
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
  
  .yes-no-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-family: 'Inter', sans-serif;
  }
  .yes-no-table th, .yes-no-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .yes-no-table th {
    color: #94a3b8;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
  }
  .yes-no-table td:first-child {
    text-align: left;
    font-weight: 700;
    color: #e2e8f0;
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
  
  .statement-container {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .statement-row {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.3s;
  }
  .statement-row.correct-locked {
    border-color: rgba(16, 185, 129, 0.4);
    background: rgba(16, 185, 129, 0.03);
  }
  .statement-text {
    font-size: 13.5px;
    color: #cbd5e1;
    line-height: 1.4;
  }
  .statement-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .tutorial-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  .tutorial-popup {
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  .tutorial-popup h3 {
    margin-top: 0;
    font-size: 20px;
    font-weight: 800;
    color: #fff;
  }
  .tutorial-popup p {
    font-size: 14.5px;
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .tutorial-btn {
    background: #ff034d;
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tutorial-btn:disabled {
    background: #475569;
    cursor: not-allowed;
    opacity: 0.6;
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

// ——— LOGIQUE DE DÉROULEMENT PÉDAGOGIQUE ———
let translations = null;
let activeArrow = null;

async function loadTranslations() {
    try {
        const response = await fetch('texte.json');
        if (!response.ok) throw new Error("Failed to load translation json");
        const data = await response.json();
        translations = data.exercises.exercise_7;
        
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
    overlay.id = 'exo7-tutorial-overlay';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #7";

    const p = document.createElement('p');
    const text = translations && translations.instructions && translations.instructions.general 
        ? translations.instructions.general 
        : "In this exercise, you will investigate how activation functions affect the model's ability to learn non-linear boundaries. Test each activation function on the Circle dataset, fill out the Yes/No table, and answer the statements about how activation functions affect learning.";
    p.innerText = text;

    const timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8;';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "Continuer";
    nextBtn.disabled = true;

    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(timerSpan);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    let timeLeft = 15; // Strict 15s locked intro screen

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
        // Delay before showing the arrow and rendering activity 1
        setTimeout(() => {
            showFlashingArrow('.ui-activation');
            renderActivity1();
        }, 3000);
    };
}

function getIframeElementRect(targetSelector: string) {
    const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
    if (!iframe) return null;
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
}

function showFlashingArrow(targetSelector: string) {
    if (activeArrow) activeArrow.remove();

    const rect = getIframeElementRect(targetSelector);
    if (!rect) return;

    activeArrow = document.createElement('div');
    activeArrow.className = 'tutorial-arrow';
    activeArrow.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));">
          <path d="M50,10 L10,50 M10,50 L25,50 M10,50 L10,35" stroke="#FF034D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
    `;

    activeArrow.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    activeArrow.style.top = `${rect.top - 60 + window.scrollY}px`;

    document.body.appendChild(activeArrow);

    // Dismiss arrow when user clicks anywhere in the document or iframe
    const dismissArrow = () => {
        if (activeArrow) {
            activeArrow.remove();
            activeArrow = null;
        }
        document.removeEventListener('click', dismissArrow);
        try {
            const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.document.removeEventListener('click', dismissArrow);
            }
        } catch(e) {}
    };

    setTimeout(() => {
        document.addEventListener('click', dismissArrow);
        try {
            const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.document.addEventListener('click', dismissArrow);
            }
        } catch(e) {}
    }, 100);
}

// Activity 1: YES/NO table logic
let selectedAnswersAct1 = {
    relu: null,
    tanh: null,
    sigmoid: null,
    linear: null
};

function renderActivity1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activité 1</div>
            <div class="quiz-question-card">
                Test the model with each activation function, observe what changes after each run, and identify which activation function can classify the dataset.
            </div>
        </div>
        <table class="yes-no-table">
            <thead>
                <tr>
                    <th>Activation</th>
                    <th>YES</th>
                    <th>NO</th>
                </tr>
            </thead>
            <tbody>
                <tr data-activation="relu">
                    <td>ReLU</td>
                    <td><button class="btn-choice" data-val="yes">YES</button></td>
                    <td><button class="btn-choice" data-val="no">NO</button></td>
                </tr>
                <tr data-activation="tanh">
                    <td>Tanh</td>
                    <td><button class="btn-choice" data-val="yes">YES</button></td>
                    <td><button class="btn-choice" data-val="no">NO</button></td>
                </tr>
                <tr data-activation="sigmoid">
                    <td>Sigmoid</td>
                    <td><button class="btn-choice" data-val="yes">YES</button></td>
                    <td><button class="btn-choice" data-val="no">NO</button></td>
                </tr>
                <tr data-activation="linear">
                    <td>Linear</td>
                    <td><button class="btn-choice" data-val="yes">YES</button></td>
                    <td><button class="btn-choice" data-val="no">NO</button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn-validate" id="btn-validate-act1">Valider</button>
    `;

    // Click handlers for YES/NO buttons
    const rows = qPanel.querySelectorAll('tbody tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const act = row.getAttribute('data-activation');
        const yesBtn = row.querySelector('.btn-choice[data-val="yes"]') as HTMLButtonElement;
        const noBtn = row.querySelector('.btn-choice[data-val="no"]') as HTMLButtonElement;

        yesBtn.onclick = () => {
            selectedAnswersAct1[act] = 'yes';
            yesBtn.classList.add('active-yes');
            noBtn.classList.remove('active-no');
        };

        noBtn.onclick = () => {
            selectedAnswersAct1[act] = 'no';
            noBtn.classList.add('active-no');
            yesBtn.classList.remove('active-yes');
        };
    }

    const validateBtn = document.getElementById('btn-validate-act1') as HTMLButtonElement;
    validateBtn.onclick = () => {
        // Correct answer: relu=yes, tanh=yes, sigmoid=yes, linear=no
        const isCorrect = 
            selectedAnswersAct1.relu === 'yes' &&
            selectedAnswersAct1.tanh === 'yes' &&
            selectedAnswersAct1.sigmoid === 'yes' &&
            selectedAnswersAct1.linear === 'no';

        if (isCorrect) {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                    ✅ Correct ! Vous avez bien identifié les capacités de chaque fonction. Transition vers l'activité 2...
                </div>
            `;
            validateBtn.disabled = true;
            validateBtn.style.opacity = '0.5';

            setTimeout(() => {
                renderActivity2();
            }, 2000);
        } else {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                    ❌ Incorrect. Testez à nouveau les fonctions dans le simulateur. Certains choix erronés ont été réinitialisés.
                </div>
            `;

            // Reset incorrect selections to gray
            if (selectedAnswersAct1.relu !== 'yes') {
                selectedAnswersAct1.relu = null;
                const row = qPanel.querySelector('tr[data-activation="relu"]');
                if (row) {
                    const activeYes = row.querySelector('.btn-choice.active-yes');
                    const activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes) activeYes.classList.remove('active-yes');
                    if (activeNo) activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.tanh !== 'yes') {
                selectedAnswersAct1.tanh = null;
                const row = qPanel.querySelector('tr[data-activation="tanh"]');
                if (row) {
                    const activeYes = row.querySelector('.btn-choice.active-yes');
                    const activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes) activeYes.classList.remove('active-yes');
                    if (activeNo) activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.sigmoid !== 'yes') {
                selectedAnswersAct1.sigmoid = null;
                const row = qPanel.querySelector('tr[data-activation="sigmoid"]');
                if (row) {
                    const activeYes = row.querySelector('.btn-choice.active-yes');
                    const activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes) activeYes.classList.remove('active-yes');
                    if (activeNo) activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.linear !== 'no') {
                selectedAnswersAct1.linear = null;
                const row = qPanel.querySelector('tr[data-activation="linear"]');
                if (row) {
                    const activeYes = row.querySelector('.btn-choice.active-yes');
                    const activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes) activeYes.classList.remove('active-yes');
                    if (activeNo) activeNo.classList.remove('active-no');
                }
            }
        }
    };
}

// Activity 2: True/False logic
let answeredStatementsCount = 0;
const totalStatements = 4;
const statementCorrectStates = [false, false, false, false];

function renderActivity2() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = ''; // Clean feedback panel

    const statementsData = [
        {
            id: 1,
            text: "1- It changes the bias term, which shifts the decision boundary.",
            correct: false,
            feedback_correct: "✅ Correct. Activation affects the transformation, not the bias values themselves.",
            feedback_incorrect: "❌ Incorrect. The bias is a parameter learned during training, not changed by the activation."
        },
        {
            id: 2,
            text: "2- It influences the shape of the decision boundary the model can learn.",
            correct: true,
            feedback_correct: "✅ Correct. Activation functions affect the kind of boundary the model can represent.",
            feedback_incorrect: "❌ Incorrect. Look at how the decision boundary changes when you switch activation functions."
        },
        {
            id: 3,
            text: "3- It changes how each neuron transforms its input before passing it to the next step",
            correct: true,
            feedback_correct: "✅ Correct. This is the core role of an activation function.",
            feedback_incorrect: "❌ Incorrect. The activation acts inside each neuron before the signal moves forward."
        },
        {
            id: 4,
            text: "4- It changes the values of the weights learned during training.",
            correct: false,
            feedback_correct: "✅ Correct. Activation affects the transformation, not the weight values themselves.",
            feedback_incorrect: "❌ Incorrect. Weights are updated by training, not directly by the activation function."
        }
    ];

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activité 2</div>
            <div class="quiz-question-card">
                How do you think the activation function changes the way the model works?
            </div>
        </div>
        <div class="statement-container">
            ${statementsData.map((stmt, idx) => `
                <div class="statement-row" data-idx="${idx}">
                    <div class="statement-text">${stmt.text}</div>
                    <div class="statement-actions">
                        <button class="btn-choice btn-true" data-val="true">True</button>
                        <button class="btn-choice btn-false" data-val="false">False</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const statementRows = qPanel.querySelectorAll('.statement-row');
    for (let i = 0; i < statementRows.length; i++) {
        const row = statementRows[i];
        const idx = parseInt(row.getAttribute('data-idx'));
        const stmt = statementsData[idx];
        const trueBtn = row.querySelector('.btn-choice[data-val="true"]') as HTMLButtonElement;
        const falseBtn = row.querySelector('.btn-choice[data-val="false"]') as HTMLButtonElement;

        const handleAnswer = (userChoice: boolean) => {
            const isCorrect = userChoice === stmt.correct;

            if (isCorrect) {
                // Lock selection
                statementCorrectStates[idx] = true;
                row.classList.add('correct-locked');
                trueBtn.disabled = true;
                falseBtn.disabled = true;

                if (userChoice) {
                    trueBtn.classList.add('active-yes');
                    falseBtn.classList.remove('active-no');
                } else {
                    falseBtn.classList.add('active-no');
                    trueBtn.classList.remove('active-yes');
                }

                fPanel.innerHTML = `<div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">${stmt.feedback_correct}</div>`;

                // Check if all are correct
                const allDone = statementCorrectStates.every(s => s);
                if (allDone) {
                    // Success! Enable validation in outer footer
                    btnRealise.removeAttribute('disabled');
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
                    
                    // Show final message
                    fPanel.innerHTML += `
                        <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                            ✨ Exercice Réussi !! Cliquez sur le bouton "Faire le quiz" en bas à droite pour continuer.
                        </div>
                    `;
                }
            } else {
                // Visual feedback of error
                if (userChoice) {
                    trueBtn.classList.add('active-no');
                    setTimeout(() => {
                        trueBtn.classList.remove('active-no');
                    }, 500);
                } else {
                    falseBtn.classList.add('active-no');
                    setTimeout(() => {
                        falseBtn.classList.remove('active-no');
                    }, 500);
                }
                fPanel.innerHTML = `<div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">${stmt.feedback_incorrect}</div>`;
            }
        };

        trueBtn.onclick = () => handleAnswer(true);
        falseBtn.onclick = () => handleAnswer(false);
    }
}

// Reposition arrow if frame scrolls or window resizes
window.addEventListener('resize', () => {
    if (activeArrow) {
        showFlashingArrow('.ui-activation');
    }
});
window.addEventListener('scroll', () => {
    if (activeArrow) {
        showFlashingArrow('.ui-activation');
    }
});

// Load translations and trigger overlay when iframe is ready
const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
if (iframe) {
    iframe.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            // Already completed, enable quiz button and show success without locking
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
            return;
        }
        setTimeout(async () => {
            await loadTranslations();
            startTutorial();
        }, 1200);
    });
}