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
    (menu.querySelector('#btnFuturLogout') as HTMLElement).onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
const btnSauvegarder = document.getElementById('btn-sauvegarder') as HTMLButtonElement;
const btnRealise = document.getElementById('btn-realise') as HTMLButtonElement;

btnSauvegarder.onclick = async () => {
    if ((window as any).StorageService) {
        const success = await (window as any).StorageService.save(11);
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
        const success = await (window as any).StorageService.complete(11);
        if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => {
                window.location.href = 'exoquiz/exo11_quiz.html';
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
    min-width: 70px;
    text-align: center;
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

  .true-false-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  .true-false-table th {
    text-align: center;
    padding: 8px;
    font-size: 12px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .true-false-table th:first-child {
    text-align: left;
  }
  .true-false-table td {
    padding: 10px 8px;
    font-size: 13.5px;
    color: #f1f5f9;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    vertical-align: middle;
  }
  .true-false-table td:not(:first-child) {
    text-align: center;
  }
  .true-false-row-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
  .true-false-row-card .statement-text {
    font-size: 13.5px;
    color: #e2e8f0;
    line-height: 1.4;
  }
  .true-false-row-card .button-group {
    display: flex;
    gap: 6px;
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
        translations = data.exercises.exercise_11;
        
        if (translations) {
            if (translations.title) {
                document.title = translations.title;
                const titleEl = document.querySelector('.exo-title') as HTMLElement;
                if (titleEl) titleEl.innerText = translations.title;
            }
            if (translations.instructions && translations.instructions.general) {
                const instrEl = document.querySelector('.exo-instructions') as HTMLElement;
                if (instrEl) instrEl.innerText = translations.instructions.general;
            }
        }
    } catch (e) {
        console.warn("Could not load translations from JSON.", e);
    }
}

function startTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo11-tutorial-overlay';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #11 : Learning Rate";

    const p = document.createElement('p');
    const text = "In this exercise, you will investigate how the learning rate controls the speed and stability of training. First, open the definition of the learning rate by clicking on the question mark (?) near the Learning Rate parameter.";
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

    const wordCount = text.split(/\s+/).length;
    let timeLeft = Math.max(10, Math.ceil((wordCount / 200) * 60)); // ~10s

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
        // Give 1s transition, then guide user to the definition
        setTimeout(() => {
            showFlashingArrow('.ui-learningRate .info-tip');
            listenForDefinitionClick();
        }, 1000);
    };
}

function getIframeElementRect(targetSelector: string) {
    const iframe = document.getElementById('iframe-playground') as HTMLIFrameElement;
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
    } catch(e) {
        return null;
    }
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
}

function listenForDefinitionClick() {
    const checkClick = setInterval(() => {
        try {
            const iframe = document.getElementById('iframe-playground') as HTMLIFrameElement;
            if (!iframe) return;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const infoTip = iframeDoc.querySelector('.ui-learningRate .info-tip');
            if (infoTip && !infoTip.hasAttribute('data-listener-active')) {
                infoTip.setAttribute('data-listener-active', 'true');
                infoTip.addEventListener('click', () => {
                    if (activeArrow) {
                        activeArrow.remove();
                        activeArrow = null;
                    }
                    clearInterval(checkClick);
                    
                    // Show definition overlay popup
                    showDefinitionPopup();
                });
            }
        } catch(e) {}
    }, 100);
}

function showDefinitionPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'definition-popup-overlay';
    overlay.style.zIndex = '10002';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = translations && translations.definitions && translations.definitions.learning_rate
        ? translations.definitions.learning_rate.term
        : "The learning rate";

    const p = document.createElement('p');
    p.innerText = translations && translations.definitions && translations.definitions.learning_rate
        ? translations.definitions.learning_rate.definition
        : "The learning rate controls how much the model's parameters (weights and biases) are updated during training. A small learning rate leads to slow learning, while a large learning rate may cause the model to miss the optimal solution.";

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
        // Transition to Activity 1
        setTimeout(() => {
            renderActivity1();
        }, 800);
    };
}

// Activity 1: True or False checklist
let statementCorrectStatesAct1 = [false, false, false, false, false, false];

const questionsAct1 = [
    { id: 1, statement: "Training loss measures the error on the data used to train the model.", answer: true, feedback_true: "Correct — training loss is computed on the training dataset.", feedback_false: "Incorrect — this is exactly the definition of training loss." },
    { id: 2, statement: "Convergence always means the model has found the correct solution.", answer: false, feedback_true: "Incorrect — a model can converge to a wrong or suboptimal solution.", feedback_false: "Correct — convergence means stability, not correctness." },
    { id: 3, statement: "A model has converged when its behavior becomes stable during training.", answer: true, feedback_true: "Correct — convergence is defined by stability of learning.", feedback_false: "Incorrect — stability is the key sign of convergence." },
    { id: 4, statement: "A model diverges when its error increases or becomes unstable during training.", answer: true, feedback_true: "Correct — divergence is characterized by instability or increasing loss.", feedback_false: "Incorrect — this describes divergence." },
    { id: 5, statement: "The learning rate controls how much the model updates its weights at each step.", answer: true, feedback_true: "Correct — it defines the step size of updates.", feedback_false: "Incorrect — this is the role of the learning rate." },
    { id: 6, statement: "The learning rate and the number of epochs both control how many passes are made during training.", answer: false, feedback_true: "Incorrect — only epochs control the number of passes; learning rate controls step size.", feedback_false: "Correct — epochs define passes, learning rate defines update magnitude." }
];

function renderActivity1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    // Use translations if loaded
    let statements = questionsAct1;
    if (translations && translations.activity_1 && translations.activity_1.statements) {
        statements = translations.activity_1.statements;
    }

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activité 1</div>
            <div class="quiz-question-card">
                ${translations && translations.activity_1 && translations.activity_1.instruction ? translations.activity_1.instruction : "True or False? Check the correct statement for each of the following properties."}
            </div>
        </div>
        <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
            ${statements.map((q, idx) => `
                <div class="true-false-row-card" data-idx="${idx}" data-question-id="${q.id}">
                    <span class="statement-text">${q.statement}</span>
                    <div class="button-group">
                        <button class="btn-choice btn-true" data-val="true">TRUE</button>
                        <button class="btn-choice btn-false" data-val="false">FALSE</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    fPanel.innerHTML = '';

    const statementRows = qPanel.querySelectorAll('.true-false-row-card');
    for (let i = 0; i < statementRows.length; i++) {
        const row = statementRows[i];
        const idx = parseInt(row.getAttribute('data-idx'));
        const stmt = statements[idx];
        const trueBtn = row.querySelector('.btn-choice[data-val="true"]') as HTMLButtonElement;
        const falseBtn = row.querySelector('.btn-choice[data-val="false"]') as HTMLButtonElement;

        const handleAnswer = (userChoice: boolean) => {
            const isCorrect = userChoice === stmt.answer;

            if (isCorrect) {
                // Lock selection
                statementCorrectStatesAct1[idx] = true;
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

                const feedbackText = userChoice ? stmt.feedback_true : stmt.feedback_false;
                fPanel.innerHTML = `<div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">${feedbackText}</div>`;

                // Check if all are correct
                const allDone = statementCorrectStatesAct1.every(s => s);
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
                const feedbackText = userChoice ? stmt.feedback_true : stmt.feedback_false;
                fPanel.innerHTML = `<div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">${feedbackText}</div>`;
            }
        };

        trueBtn.onclick = () => handleAnswer(true);
        falseBtn.onclick = () => handleAnswer(false);
    }
}

// Reposition arrow if frame scrolls or window resizes
window.addEventListener('resize', () => {
    if (activeArrow) {
        showFlashingArrow('.ui-learningRate .info-tip');
    }
});
window.addEventListener('scroll', () => {
    if (activeArrow) {
        showFlashingArrow('.ui-learningRate .info-tip');
    }
});

// Load translations and trigger overlay when iframe is loaded
const iframe = document.getElementById('iframe-playground') as HTMLIFrameElement;
if (iframe) {
    iframe.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
            
            // Pulse the home button if completed
            const backBtn = document.querySelector('.universal-header .btn-header') as HTMLElement;
            if (backBtn) {
                backBtn.style.animation = 'pulse-button 1.5s infinite';
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes pulse-button {
                        0%, 100% { transform: scale(1); box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); }
                        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); border-color: #8b5cf6; }
                    }
                `;
                document.head.appendChild(style);
            }

            const qPanel = document.getElementById('quiz-question-panel');
            if (qPanel) {
                qPanel.innerHTML = `
                    <div class="quiz-question-wrapper">
                        <div class="quiz-question-badge">Exercice Réussi</div>
                        <div class="quiz-question-card">
                            Vous avez déjà validé cet exercice ! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.
                        </div>
                    </div>
                `;
            }
            return;
        }

        setTimeout(async () => {
            // Pulse info-tip inside iframe to call user attention
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const infoTip = iframeDoc.querySelector('.ui-learningRate .info-tip');
                if (infoTip) {
                    infoTip.classList.add('info-tip-pulse');
                    const style = iframeDoc.createElement('style');
                    style.textContent = `
                        @keyframes info-pulse {
                            0%, 100% { transform: scale(1); box-shadow: 0 0 2px rgba(139, 92, 246, 0.4); }
                            50% { transform: scale(1.2); box-shadow: 0 0 8px rgba(139, 92, 246, 0.8); background: #8b5cf6; color: white; }
                        }
                        .info-tip-pulse {
                            animation: info-pulse 1.2s infinite !important;
                            border-radius: 50%;
                            display: inline-block;
                        }
                    `;
                    iframeDoc.head.appendChild(style);
                    
                    infoTip.addEventListener('click', () => {
                        infoTip.classList.remove('info-tip-pulse');
                    });
                }
            } catch(e) {}

            await loadTranslations();
            startTutorial();
        }, 1200);
    });
}