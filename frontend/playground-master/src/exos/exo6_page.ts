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
  avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
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
  const btnLogout = menu.querySelector('#btnFuturLogout') as HTMLElement;
  if (btnLogout) {
    btnLogout.onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
  }
  container.appendChild(avatar); container.appendChild(menu);
})();

// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
const btnSauvegarder = document.getElementById('btn-sauvegarder') as HTMLButtonElement;
const btnRealise = document.getElementById('btn-realise') as HTMLButtonElement;

window.addEventListener('message', (event) => {
  if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 6 || event.data.exoId == "6")) {
    btnRealise.disabled = false;
    btnRealise.classList.remove('btn-disabled');
    btnRealise.classList.add('btn-success-ready');
    btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
  }
});

btnSauvegarder.onclick = async () => {
  if ((window as any).StorageService) {
    const success = await (window as any).StorageService.save(6);
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
    const success = await (window as any).StorageService.complete(6);
    if (success) {
      btnRealise.innerHTML = '✨ Redirection...';
      btnRealise.disabled = true;
      setTimeout(() => {
        window.location.href = 'exoquiz/exo6_quiz.html';
      }, 800);
    }
  }
};

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
    neuron.opacity = Math.max(neuron.opacity, 0.15);
    neuron.element.style.opacity = String(neuron.opacity);
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

// Inject dynamic CSS style for arrows & animations
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
`;
document.head.appendChild(styleEl);

// ——— INTERACTIVE TUTORIAL STEP PAR ÉTAPE (EXO 6) ———
let translations = null;
let activeHighlightBox = null;
let activeTooltip = null;
let activeArrow = null;

let currentHighlightSelector = null;
let currentTooltipSelector = null;
let currentTooltipTitle = null;
let currentTooltipText = null;
let currentTooltipPosition = 'bottom';

async function loadTranslations() {
  try {
    const response = await fetch('texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_6;

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
  overlay.id = 'exo6-tutorial-overlay';

  const popup = document.createElement('div');
  popup.className = 'tutorial-popup';

  const h3 = document.createElement('h3');
  h3.innerText = translations && translations.title ? translations.title : "Exercice #4";

  const p = document.createElement('p');
  const text = translations && translations.instructions && translations.instructions.general 
    ? translations.instructions.general 
    : "In this exercise, you will explore how a neural network builds its prediction step by step.";
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

  let timeLeft = 2; // Strict 15s lock

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
    // Step 2: Show red oblique arrow flashing to timelines controls
    showFlashingArrow('.timeline-controls', 4);
  };
}

function showFlashingArrow(targetSelectorOrElement, flashesCount = 4) {
  if (activeArrow) activeArrow.remove();

  const rect = getIframeElementRect(targetSelectorOrElement);
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
  activeArrow.style.animationIterationCount = String(flashesCount);

  setTimeout(() => {
    if (activeArrow) {
      activeArrow.remove();
      activeArrow = null;
    }
  }, flashesCount * 600);
}

function getIframeElementRect(target) {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return null;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  const el = (typeof target === 'string') ? iframeDoc.querySelector(target) : target;
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

function getIframeElement(selector) {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return null;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  return iframeDoc.querySelector(selector);
}

function getFirstHiddenNeuronCanvas() {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return null;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const canvases = iframeDoc.querySelectorAll('#network .canvas');
  if (canvases.length > 0) {
    return canvases[0];
  }
  return null;
}

function clearHighlights() {
  if (activeHighlightBox) { activeHighlightBox.remove(); activeHighlightBox = null; }
  if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
  if (activeArrow) { activeArrow.remove(); activeArrow = null; }
  currentHighlightSelector = null;
  currentTooltipSelector = null;
}

function showHighlightBox(target, padding = 15) {
  // No-op: user requested removal of flashing red highlight boxes
}

function showCustomTooltip(target, title, text, position = 'bottom', onDismiss) {
  if (activeTooltip) activeTooltip.remove();
  currentTooltipSelector = target;
  currentTooltipTitle = title;
  currentTooltipText = text;
  currentTooltipPosition = position;

  activeTooltip = document.createElement('div');
  activeTooltip.className = 'tutorial-tooltip';
  activeTooltip.innerHTML = `
    <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:800; color:#fff;">${title}</h4>
    <p style="margin:0; font-size:13px; color:#cbd5e1; line-height:1.4;">${text}</p>
    <div style="margin-top:10px; font-size:11px; color:#94a3b8; text-align:right; user-select:none;">Click anywhere to continue</div>
  `;
  document.body.appendChild(activeTooltip);
  repositionActiveElements();

  const dismissHandler = () => {
    document.removeEventListener('click', dismissHandler);
    clearHighlights();
    if (onDismiss) onDismiss();
  };

  setTimeout(() => {
    document.addEventListener('click', dismissHandler);
  }, 100);
}

function repositionActiveElements() {
  if (currentHighlightSelector && activeHighlightBox) {
    const rect = getIframeElementRect(currentHighlightSelector);
    if (rect) {
      const padding = 12;
      activeHighlightBox.style.left = `${rect.left - padding + window.scrollX}px`;
      activeHighlightBox.style.top = `${rect.top - padding + window.scrollY}px`;
      activeHighlightBox.style.width = `${rect.width + padding * 2}px`;
      activeHighlightBox.style.height = `${rect.height + padding * 2}px`;
    }
  }

  if (currentTooltipSelector && activeTooltip) {
    const rect = getIframeElementRect(currentTooltipSelector);
    if (rect) {
      const tooltipRect = activeTooltip.getBoundingClientRect();
      let top = 0, left = 0;

      if (currentTooltipPosition === 'bottom') {
        top = rect.bottom + window.scrollY + 10;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
      } else if (currentTooltipPosition === 'top') {
        top = rect.top - tooltipRect.height - 10 + window.scrollY;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
      } else if (currentTooltipPosition === 'right') {
        top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
        left = rect.right + 10 + window.scrollX;
      } else if (currentTooltipPosition === 'left') {
        top = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
        left = rect.left - tooltipRect.width - 10 + window.scrollX;
      }

      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
      if (top < 10) top = 10;

      activeTooltip.style.top = `${top}px`;
      activeTooltip.style.left = `${left}px`;
    }
  }
}

// Show Warning Banner under #top-controls in iframe
function showWarningBanner() {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  const topControls = iframeDoc.querySelector('#top-controls');
  if (!topControls) return;

  if (iframeDoc.getElementById('exo6-warning-banner')) return;

  const banner = iframeDoc.createElement('div');
  banner.id = 'exo6-warning-banner';
  banner.style.cssText = `
    background: rgba(255, 3, 77, 0.12);
    border: 1px solid #FF034D;
    color: #ffffff;
    padding: 12px 18px;
    border-radius: 8px;
    margin: 15px auto 5px auto;
    max-width: 780px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    line-height: 1.4;
    text-align: center;
    box-shadow: 0 4px 12px rgba(255, 3, 77, 0.15);
  `;

  const warningText = translations && translations.instructions && translations.instructions.activity_1
    ? translations.instructions.activity_1
    : "As seen earlier, it is not possible to classify complex data (such as the two-circle dataset) using linear features. Now try using a hidden layer with four neurons.";

  banner.innerHTML = `<strong>⚠️ Note :</strong> ${warningText}`;
  topControls.appendChild(banner);
}

function removeWarningBanner() {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const banner = iframeDoc.getElementById('exo6-warning-banner');
  if (banner) banner.remove();
}

// Sequential mathematical overlays (A -> B -> C -> D)
let mathSequenceStarted = false;

function runMathSequence() {
  if (mathSequenceStarted) return;
  mathSequenceStarted = true;

  // Clean warning banner and indicators
  removeWarningBanner();
  clearHighlights();

  // Wait 2 seconds before Overlay A
  setTimeout(() => {
    const linkA = getIframeElement('#linkx-1');
    if (!linkA) {
      console.warn("Could not find ID #linkx-1 for Overlay A, starting sequence with B instead.");
      runStepB();
      return;
    }

    showHighlightBox(linkA);
    const titleA = "1- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[0]
      ? translations.pedagogical_overlay[0].title
      : "Simple model: one equation");
    const descA = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[0]
      ? translations.pedagogical_overlay[0].description
      : "This model directly combines x₁ and x₂ using weights and bias. prediction = f(w1·x1 + w2·x2 + b)";

    showCustomTooltip(linkA, titleA, descA, 'right', () => {
      runStepB();
    });
  }, 2000);
}

function runStepB() {
  const nodeB = getFirstHiddenNeuronCanvas();
  if (!nodeB) {
    runStepC();
    return;
  }

  showHighlightBox(nodeB);
  const titleB = "2- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[1]
    ? translations.pedagogical_overlay[1].title
    : "Neural Network: What the hidden layer computes");
  const descB = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[1]
    ? translations.pedagogical_overlay[1].description
    : "Each neuron combines x₁ and x₂ in a different way, producing 4 new features. These values are not predictions, they are features learned from the data.";

  showCustomTooltip(nodeB, titleB, descB, 'bottom', () => {
    runStepC();
  });
}

function runStepC() {
  const linkC = getIframeElement('#link1-5');
  if (!linkC) {
    runStepD();
    return;
  }

  showHighlightBox(linkC);
  const titleC = "3- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[2]
    ? translations.pedagogical_overlay[2].title
    : "How the full model works");
  const descC = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[2]
    ? translations.pedagogical_overlay[2].description
    : "The final prediction is built by combining the learned features. prediction = f(v1·a1 + v2·a2 + v3·a3 + v4·a4 + c)";

  showCustomTooltip(linkC, titleC, descC, 'top', () => {
    runStepD();
  });
}

function runStepD() {
  showHighlightBox('#heatmap');
  const titleD = "4- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[3]
    ? translations.pedagogical_overlay[3].title
    : "In Summary");
  const descD = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[3]
    ? translations.pedagogical_overlay[3].description
    : "A neural network learns new features using neurons, then combines them to solve more complex problems.";

  showCustomTooltip('#heatmap', titleD, descD, 'bottom', () => {
    clearHighlights();
  });
}

// Listen for messages from iframe
window.addEventListener('message', (event) => {
  if (event.data.type === 'EXO6_EPOCH_300') {
    // 300 epochs reached with 0 layers: halt player and warn
    showWarningBanner();
    setTimeout(() => {
      showFlashingArrow('.ui-numHiddenLayers', 4);
    }, 100);
  }

  if (event.data.type === 'EXO6_STATE_CHANGE') {
    const numLayers = event.data.numHiddenLayers;
    const shape = event.data.networkShape;

    // Immediately remove warning banner when layer is added
    if (numLayers > 0) {
      removeWarningBanner();
    }

    // Check if network configured with exactly 1 hidden layer of 4 neurons
    if (numLayers === 1 && shape && shape[0] === 4) {
      runMathSequence();
    }
  }
});

window.addEventListener('resize', repositionActiveElements);
window.addEventListener('scroll', repositionActiveElements);
setInterval(repositionActiveElements, 100);

const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
if (iframe) {
  iframe.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('completed') === 'true') {
      return;
    }
    setTimeout(async () => {
      await loadTranslations();
      startTutorial();
    }, 1200);
  });
}