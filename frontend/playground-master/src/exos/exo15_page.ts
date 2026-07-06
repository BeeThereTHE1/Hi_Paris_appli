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
    (menu.querySelector('#btnFuturLogout') as HTMLElement).onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
const btnSauvegarder = document.getElementById('btn-sauvegarder') as HTMLButtonElement;
const btnRealise = document.getElementById('btn-realise') as HTMLButtonElement;

btnSauvegarder.onclick = async () => {
    if ((window as any).StorageService) {
        const success = await (window as any).StorageService.save(15);
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
        const success = await (window as any).StorageService.complete(15);
        if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => {
                window.location.href = 'exoquiz/exo15_quiz.html';
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

// Inject Custom CSS Styles for drag and drop
const styleEl = document.createElement('style');
styleEl.textContent = `
  .drag-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 12px;
    color: #e2e8f0;
    cursor: grab;
    user-select: none;
    transition: all 0.2s;
    margin-bottom: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    line-height: 1.35;
  }
  .drag-card:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  .drag-card:active {
    cursor: grabbing;
  }
  .drag-card.dragging {
    opacity: 0.4;
  }
  .drag-card.selected-for-match {
    border: 2px solid #8b5cf6 !important;
    background: rgba(139, 92, 246, 0.15) !important;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
  }

  .drop-zone-wrapper {
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 140px;
    transition: all 0.2s;
    cursor: pointer;
  }
  .drop-zone-wrapper:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.25);
  }
  .drop-zone-wrapper.dragover {
    background: rgba(139, 92, 246, 0.1) !important;
    border-color: #8b5cf6 !important;
    border-style: solid !important;
  }
  .drop-zone-concept {
    font-weight: 700;
    font-size: 14px;
    color: #a78bfa;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 4px;
  }
  .drop-zone-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11.5px;
    color: #94a3b8;
  }
  .pill-matched {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.25);
    color: #10b981;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 11.5px;
    line-height: 1.3;
    animation: scaleIn 0.3s ease;
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
  .shake-error {
    animation: shake 0.4s ease-in-out;
    border-color: #ef4444 !important;
    background: rgba(239, 68, 68, 0.15) !important;
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

// Define definitions details for popups
const definitionsData = {
    "training_data": {
        term: "Training Data (Données d'entraînement)",
        def: "The dataset used by the model during training to directly update its weights via backpropagation."
    },
    "test_data": {
        term: "Test Data (Données de test)",
        def: "The dataset kept unseen during weight updates, used to evaluate how well the model generalizes to new, unseen inputs."
    }
};

let draggedCardId = null;
let selectedForMatchCardId = null;

const matchingData = {
    concepts: [
        { id: "training_data", name: "Training Data" },
        { id: "test_data", name: "Test Data" }
    ],
    definitions: [
        { id: "training_data_1", category: "training_data", text: "The model directly updates its weights using this data" },
        { id: "training_data_2", category: "training_data", text: "The loss on this data decreases continuously during training" },
        { id: "training_data_3", category: "training_data", text: "This dataset is seen by the model during backpropagation" },
        { id: "training_data_4", category: "training_data", text: "The model can memorize patterns specific to this data" },
        { id: "training_data_5", category: "training_data", text: "Performance on this data may become misleadingly good (overfitting)" },
        { id: "test_data_1", category: "test_data", text: "This dataset remains unseen during weight updates" },
        { id: "test_data_2", category: "test_data", text: "The model does not learn directly from this data" },
        { id: "test_data_3", category: "test_data", text: "Overfitting is observed when performance worsens on this data" },
        { id: "test_data_4", category: "test_data", text: "This data reflects how well the model performs on new, unseen inputs" },
        { id: "test_data_5", category: "test_data", text: "This data is used to evaluate generalization performance" }
    ]
};

let correctMatchesCount = 0;

function showDefinitionModal(title, text) {
    Array.prototype.forEach.call(document.querySelectorAll('#definition-popup-overlay'), function (el) { el.remove(); });

    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'definition-popup-overlay';
    overlay.style.zIndex = '10005';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = title;

    const p = document.createElement('p');
    p.innerText = text;

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
    };
}

function startTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo15-tutorial-overlay';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "Exercise #15 : Training & Test Datasets";

    const p = document.createElement('p');
    const introText = "In this exercise, you will examine the distinct roles of the Training dataset and the Test dataset. You will classify statements, run the simulator on a small training split (10%), and observe the consequences on generalization. First, let's review the key notions by classifying statements on the right panel.";
    p.innerText = introText;

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
            injectInfoTipsInIframe();
            renderActivity1();
        }, 800);
    };
}

function injectInfoTipsInIframe() {
    try {
        const iframe = document.getElementById('iframe-playground') as HTMLIFrameElement;
        if (!iframe) return;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (!iframeDoc.getElementById('exo15-styles')) {
            const style = iframeDoc.createElement('style');
            style.id = 'exo15-styles';
            style.textContent = `
              @keyframes loss-tip-flash {
                0%, 100% { background: transparent; color: #8b5cf6; transform: scale(1); box-shadow: none; border-color: #8b5cf6; }
                50% { background: #FF034D; color: white; transform: scale(1.3); box-shadow: 0 0 10px #FF034D; border-color: #FF034D; }
              }
              .info-tip-flash-active {
                animation: loss-tip-flash 1.2s ease-in-out !important;
                animation-iteration-count: 10 !important;
                border-radius: 50% !important;
                display: inline-block !important;
              }
            `;
            iframeDoc.head.appendChild(style);
        }

        // Find the existing tips
        const datasetTip = iframeDoc.querySelector('.ui-dataset h4 .info-tip') as HTMLElement;
        const testDataTip = iframeDoc.querySelector('.ui-showTestData .info-tip') as HTMLElement;

        if (datasetTip) {
            datasetTip.classList.add('info-tip-flash-active');
            datasetTip.onclick = (e) => {
                e.stopPropagation();
                showDefinitionModal(definitionsData.training_data.term, definitionsData.training_data.def);
            };
        }

        if (testDataTip) {
            testDataTip.classList.add('info-tip-flash-active');
            testDataTip.onclick = (e) => {
                e.stopPropagation();
                showDefinitionModal(definitionsData.test_data.term, definitionsData.test_data.def);
            };
        }
    } catch (e) {
        console.warn("Could not inject info tips into playground simulator iframe.", e);
    }
}

function renderActivity1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
            <div class="quiz-question-badge">Activity 1</div>
            <div class="quiz-question-card" style="font-size: 13px; line-height: 1.4;">
                <strong>Drag and drop</strong> - Match each specificity statement to its corresponding dataset type. Click a statement, then click on the correct dataset type to match.
            </div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 12px; height: 380px;">
            <div id="drag-source-col" style="flex: 1.1; display: flex; flex-direction: column; height: 100%;">
                <h4 style="font-size: 10px; text-transform: uppercase; color: #94a3b8; margin: 0 0 6px 0; letter-spacing: 0.5px;">Statements (Unsorted)</h4>
                <div id="drag-source-area" style="flex: 1; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 2px;"></div>
            </div>
            <div id="drop-target-col" style="flex: 0.9; display: flex; flex-direction: column; height: 100%; overflow-y: auto;">
                <h4 style="font-size: 10px; text-transform: uppercase; color: #94a3b8; margin: 0 0 6px 0; letter-spacing: 0.5px;">Dataset Types</h4>
                <div id="drop-target-area" style="display: flex; flex-direction: column; gap: 2px;"></div>
            </div>
        </div>
    `;

    fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #8b5cf6; background: rgba(139, 92, 246, 0.05);">
            💡 Use the (?) buttons next to the loss statistics inside the simulator to read definitions if needed!
        </div>
    `;

    const sourceArea = qPanel.querySelector('#drag-source-area');
    const shuffledDefs = [...matchingData.definitions].sort(() => Math.random() - 0.5);
    shuffledDefs.forEach(def => {
        const card = document.createElement('div');
        card.className = 'drag-card';
        card.id = `drag-${def.id}`;
        card.innerText = def.text;
        card.draggable = true;

        card.ondragstart = (e) => {
            draggedCardId = def.id;
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', def.id);
        };
        card.ondragend = () => {
            card.classList.remove('dragging');
        };

        // Click Selection
        card.onclick = (e) => {
            e.stopPropagation();
            if (selectedForMatchCardId === def.id) {
                selectedForMatchCardId = null;
                card.classList.remove('selected-for-match');
            } else {
                Array.prototype.forEach.call(sourceArea.querySelectorAll('.drag-card'), function (el) { el.classList.remove('selected-for-match'); });
                selectedForMatchCardId = def.id;
                card.classList.add('selected-for-match');
            }
        };

        sourceArea.appendChild(card);
    });

    const targetArea = qPanel.querySelector('#drop-target-area');
    matchingData.concepts.forEach(c => {
        const wrapper = document.createElement('div');
        wrapper.className = 'drop-zone-wrapper';
        wrapper.id = `target-wrapper-${c.id}`;

        wrapper.innerHTML = `
            <div class="drop-zone-concept">${c.name}</div>
            <div class="drop-zone-content" id="zone-content-${c.id}">
              <div style="padding: 10px; border: 1px dashed rgba(255,255,255,0.05); text-align: center; border-radius: 6px;">Drop statements here</div>
            </div>
        `;

        wrapper.ondragover = (e) => {
            e.preventDefault();
            wrapper.classList.add('dragover');
        };
        wrapper.ondragleave = () => {
            wrapper.classList.remove('dragover');
        };
        wrapper.ondrop = (e) => {
            e.preventDefault();
            wrapper.classList.remove('dragover');
            const sourceId = e.dataTransfer.getData('text/plain') || draggedCardId;
            handleDropMatch(sourceId, c.id);
        };

        wrapper.onclick = () => {
            if (selectedForMatchCardId) {
                handleDropMatch(selectedForMatchCardId, c.id);
            }
        };

        targetArea.appendChild(wrapper);
    });
}

function handleDropMatch(sourceId, conceptId) {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel || !sourceId) return;

    const dragCard = document.getElementById(`drag-${sourceId}`);
    const zoneContent = document.getElementById(`zone-content-${conceptId}`);
    const wrapper = document.getElementById(`target-wrapper-${conceptId}`);

    if (!dragCard || !zoneContent || !wrapper) return;

    // Find statement data
    const stmt = matchingData.definitions.find(d => d.id === sourceId);
    if (!stmt) return;

    if (stmt.category === conceptId) {
        // Success Match!
        correctMatchesCount++;

        // Remove placeholder text if it's the first match
        const placeholder = zoneContent.querySelector('div');
        if (placeholder && placeholder.innerText.indexOf('Drop statements') !== -1) {
            placeholder.remove();
        }

        // Add matching pill
        const pill = document.createElement('div');
        pill.className = 'pill-matched';
        pill.innerText = dragCard.innerText;
        zoneContent.appendChild(pill);

        // Hide source card
        dragCard.style.display = 'none';

        // Clear selections
        selectedForMatchCardId = null;
        dragCard.classList.remove('selected-for-match');

        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                ✅ Correct! statement matches <strong>${conceptId === "training_data" ? "Training Data" : "Test Data"}</strong>.
            </div>
        `;

        if (correctMatchesCount === 10) {
            showKeyInsightModal();
        }
    } else {
        // Error Match
        dragCard.classList.add('shake-error');
        setTimeout(() => {
            dragCard.classList.remove('shake-error');
        }, 500);

        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                ❌ Incorrect. This statement belongs to the other dataset. Try again!
            </div>
        `;
    }
}

function showKeyInsightModal() {
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (fPanel) {
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                🎉 Great! You’ve identified all the key concepts.
            </div>
        `;
    }

    // Modal
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'key-insight-overlay';
    overlay.style.zIndex = '10006';

    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';

    const h3 = document.createElement('h3');
    h3.innerText = "💡 Key insight";

    const p = document.createElement('p');
    p.innerText = "A neural network model is trained on data (training data), validated, and then used to make predictions on new data (test data).";

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

        // Update instructions and button state
        const instrEl = document.querySelector('.exo-instructions') as HTMLElement;
        if (instrEl) {
            instrEl.innerText = "Now that you have identified the roles of training data and test data, let’s see how this translates in practice.";
        }

        const qCardText = document.querySelector('.quiz-question-card') as HTMLElement;
        if (qCardText) {
            qCardText.innerText = "Now that you have identified the roles of training data and test data, let’s see how this translates in practice.";
        }

        if (fPanel) {
            fPanel.innerHTML = `
                <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                    👉 Click the "Take the quiz" button in the bottom right corner to proceed to observations.
                </div>
            `;
        }

        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
    };
}

// Check iframe loaded status
const iframe = document.getElementById('iframe-playground') as HTMLIFrameElement;
if (iframe) {
    iframe.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';

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
        }, 1200);
    });
}