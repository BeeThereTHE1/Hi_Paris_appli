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
    visitorBtn.onmouseover = () => visitorBtn.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)';
    visitorBtn.onmouseout = () => visitorBtn.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)';
    visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span > ';
    container.appendChild(visitorBtn);
    return;
  }

  const initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
  const avatar = document.createElement('div');
  avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
  avatar.innerText = initiales.toUpperCase();
  avatar.onmouseover = () => avatar.style.transform = 'scale(1.1) rotate(5deg)';
  avatar.onmouseout = () => avatar.style.transform = 'scale(1) rotate(0deg)';

  const menu = document.createElement('div');
  menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';

  const p = user.profil || user.profile || user.role || 'étudiant';
  const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
  menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);">
          <div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📊</span> Mon Historique
          </a>
          <a href="statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📈</span> Mes Statistiques
          </a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">🚪</span> Déconnexion
          </div>
        </div>
      `;

  let isOpen = false;
  avatar.onclick = () => {
    isOpen = !isOpen;
    if (isOpen) {
      menu.style.display = 'block';
      setTimeout(() => {
        menu.style.opacity = '1';
        menu.style.transform = 'scale(1) translateY(0)';
        menu.style.pointerEvents = 'auto';
      }, 10);
    } else {
      menu.style.opacity = '0';
      menu.style.transform = 'scale(0.9) translateY(-10px)';
      menu.style.pointerEvents = 'none';
      setTimeout(() => menu.style.display = 'none', 300);
    }
  };

  menu.querySelector('#btnFuturLogout').onclick = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  };

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target) && isOpen) avatar.onclick();
  });

  container.appendChild(avatar);
  container.appendChild(menu);
})();

const backgroundContainer = document.getElementById('background-container');
const formulas = ['\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c', '\\frac{dy}{dx}', '\\alpha', '\\beta', '\\gamma', '\\sin(t)', '\\cos(t)', 'e^{-t}'];
const numFormulas = 25;
const numNeurons = 30;
const numConnections = 50;

let neurons = [];
let connections = [];
let formulasElements = [];

function getRandom(min, max) { return Math.random() * (max - min) + min; }

function createAnimatedElement(type, elementClass, styleProperties = {}) {
  const element = document.createElement('div');
  element.className = elementClass;
  element.style.position = 'absolute';
  Object.assign(element.style, styleProperties);

  if (type === 'formula') {
    element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
    element.style.fontSize = `clamp(1rem, 5vw, 2.5rem)`;
    element.style.opacity = getRandom(0.04, 0.12);
    element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
    element.style.left = `${getRandom(-20, 120)}vw`;
    element.style.top = `${getRandom(-20, 120)}vh`;
    element.style.transform = `rotate(${getRandom(-30, 30)}deg)`;
    formulasElements.push(element);
  } else if (type === 'neuron') {
    const size = getRandom(10, 25);
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
    element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
    element.style.left = `${getRandom(-10, 110)}vw`;
    element.style.top = `${getRandom(-10, 110)}vh`;
    element.style.opacity = 0;
    element.style.transform = 'scale(0)';
    neurons.push({ element, size, x: 0, y: 0, opacity: 0, scale: 0 });
  }
  backgroundContainer.appendChild(element);
}

function createConnection(neuron1, neuron2) {
  const connection = document.createElement('div');
  connection.className = 'connection';
  connection.style.position = 'absolute';
  connection.style.height = '1.5px';
  connection.style.background = `linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))`;
  connection.style.opacity = 0;
  connection.style.transformOrigin = '0 0';
  connection.style.filter = 'blur(4px)';
  connections.push({ element: connection, neuron1, neuron2, opacity: 0 });
  backgroundContainer.appendChild(connection);
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
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const time = Date.now() * 0.0005;

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
    const x1 = neuron1.x + neuron1.size / 2;
    const y1 = neuron1.y + neuron1.size / 2;
    const x2 = neuron2.x + neuron2.size / 2;
    const y2 = neuron2.y + neuron2.size / 2;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    element.style.opacity = 0.3;
    element.style.width = `${length}px`;
    element.style.left = `${x1}px`;
    element.style.top = `${y1}px`;
    element.style.transform = `rotate(${angle}deg)`;
  });

  requestAnimationFrame(animateBackground);
}

initializeBackground();
animateBackground();

// --- LOGIQUE DE SAUVEGARDE ET VALIDATION ---
const btnSauvegarder = document.getElementById('btn-sauvegarder');
const btnRealise = document.getElementById('btn-realise');

// Écouter le signal de succès venant de l'iframe
window.addEventListener('message', (event) => {
  console.log("Signal reçu du Playground:", event.data);
  if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 1 || event.data.exoId == "1")) {
    console.log("Validation confirmée pour l'exercice 1 !");
    btnRealise.disabled = false;
    btnRealise.classList.remove('btn-disabled');
    btnRealise.classList.add('btn-success-ready');
    showStep5Congrats();
  }
});

function saveToStorage(key, exoData) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user || !user.email) return false;

  // Clé unique par utilisateur : ex saved_exercises_jean@mail.com
  const userKey = `${key}_${user.email}`;

  const list = JSON.parse(localStorage.getItem(userKey) || '[]');
  if (!list.find(e => e.id === exoData.id)) {
    list.push(exoData);
    localStorage.setItem(userKey, JSON.stringify(list));
    return true;
  }
  return false;
}

// ce code permet de sauvegarder l'exercice dans le profil de l'utilisateur
btnSauvegarder.onclick = async () => {
  const success = await StorageService.save(1);
  if (success) {
    btnSauvegarder.innerHTML = '✅ Sauvegardé !';
    btnSauvegarder.style.opacity = '0.7';
    btnSauvegarder.disabled = true;
  }
};

// ce code permet de valider l'exercice dans le profil de l'utilisateur
btnRealise.onclick = async () => {
  const success = await StorageService.complete(1);
  if (success) {
    btnRealise.innerHTML = '✨ Redirection...';
    btnRealise.disabled = true;
    setTimeout(() => {
      window.location.href = 'exoquiz/exo1_quiz.html';
    }, 800);
  }
};

// ==========================================
// TUTORIEL INTERACTIF ÉTAPE PAR ÉTAPE (EXO 1)
// ==========================================

let translations = null;

async function loadTranslations() {
  try {
    const response = await fetch('texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_1;

    // Dynamically update the main page elements if translations are loaded
    if (translations) {
      if (translations.title) {
        document.title = translations.title;
        const titleEl = document.querySelector('.exo-title');
        if (titleEl) titleEl.innerText = translations.title;
      }
      if (translations.instructions && translations.instructions.text) {
        const instrEl = document.querySelector('.exo-instructions');
        if (instrEl) {
          instrEl.innerText = translations.instructions.text;
        }
      }
    }
  } catch (error) {
    console.warn("Could not load translations from JSON, using fallback/default texts.", error);
  }
}

function startTutorial() {
  // Step 1: Instruction Overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.id = 'exo1-tutorial-overlay';

  const popup = document.createElement('div');
  popup.className = 'tutorial-popup';

  const h3 = document.createElement('h3');
  h3.innerText = translations && translations.title ? translations.title : "Exercice #1 : Séparez les données";

  const p = document.createElement('p');
  const defaultText = "Vous devez modifier les poids de la liaison entre X1 et l'output et X2 et l'output afin d'obtenir une droite qui sépare le plan en deux regions distinctes. Les points oranges et bleues doivent se trouver dans chaque région.";
  const text = translations && translations.instructions && translations.instructions.text ? translations.instructions.text : defaultText;
  p.innerText = text;

  const timerSpan = document.createElement('span');
  timerSpan.style.display = 'block';
  timerSpan.style.marginTop = '15px';
  timerSpan.style.fontSize = '13px';
  timerSpan.style.color = '#94a3b8';

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

  // Word count reading time (s) = words / 200 * 60
  const wordCount = text.split(/\s+/).length;
  let timeLeft = Math.max(5, Math.ceil((wordCount / 200) * 60)); // around 12 seconds

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
    runStep1Highlight();
  };
}

function runStep1Highlight() {
  const instructions = document.querySelector('.exo-instructions');
  if (instructions) {
    instructions.classList.add('highlight-glow-border');

    const indicator = document.createElement('div');
    indicator.className = 'tutorial-indicator-dot';
    indicator.innerText = '1';

    const rect = instructions.getBoundingClientRect();
    indicator.style.left = `${rect.left + 20}px`;
    indicator.style.top = `${rect.top}px`;
    document.body.appendChild(indicator);

    const clickHandler = () => {
      instructions.classList.remove('highlight-glow-border');
      indicator.remove();
      document.removeEventListener('click', clickHandler);
      runStep2();
    };
    setTimeout(() => {
      document.addEventListener('click', clickHandler);
    }, 100);
  } else {
    runStep2();
  }
}

let activeHighlightBox = null;
let activeTooltip = null;
let activeIndicator = null;
let currentHighlightSelector = null;
let currentHighlightLabel = null;
let currentTooltipSelector = null;
let currentTooltipTitle = null;
let currentTooltipText = null;
let currentTooltipPosition = 'bottom';

function repositionActiveElements() {
  if (currentHighlightSelector) {
    let rect = null;
    if (currentHighlightSelector === '.exo-instructions') {
      const el = document.querySelector('.exo-instructions');
      if (el) rect = el.getBoundingClientRect();
    } else {
      rect = getIframeElementRect(currentHighlightSelector);
    }

    if (rect && activeHighlightBox) {
      const padding = 15;
      let rectLeft = rect.left - padding;
      let rectTop = rect.top - padding;
      let rectWidth = rect.width + padding * 2;
      let rectHeight = rect.height + padding * 2;

      activeHighlightBox.style.left = `${rectLeft + window.scrollX}px`;
      activeHighlightBox.style.top = `${rectTop + window.scrollY}px`;
      activeHighlightBox.style.width = `${rectWidth}px`;
      activeHighlightBox.style.height = `${rectHeight}px`;

      if (activeIndicator) {
        activeIndicator.style.left = `${rectLeft + window.scrollX}px`;
        activeIndicator.style.top = `${rectTop + window.scrollY}px`;
      }
    }
  }

  if (currentTooltipSelector && activeTooltip) {
    let rect = null;
    if (currentTooltipSelector === '.exo-instructions') {
      const el = document.querySelector('.exo-instructions');
      if (el) rect = el.getBoundingClientRect();
    } else {
      rect = getIframeElementRect(currentTooltipSelector);
    }

    if (rect) {
      const tooltipRect = activeTooltip.getBoundingClientRect();
      let top = 0, left = 0;

      let targetLeft = rect.left;
      let targetTop = rect.top;
      let targetWidth = rect.width;
      let targetHeight = rect.height;
      let targetBottom = rect.bottom;
      let targetRight = rect.right;

      if (currentTooltipPosition === 'bottom') {
        top = targetBottom + window.scrollY + 10;
        left = targetLeft + targetWidth / 2 - tooltipRect.width / 2 + window.scrollX;
      } else if (currentTooltipPosition === 'top') {
        top = targetTop - tooltipRect.height - 10 + window.scrollY;
        left = targetLeft + targetWidth / 2 - tooltipRect.width / 2 + window.scrollX;
      } else if (currentTooltipPosition === 'right') {
        top = targetTop + targetHeight / 2 - tooltipRect.height / 2 + window.scrollY;
        left = targetRight + 10 + window.scrollX;
      } else if (currentTooltipPosition === 'left') {
        top = targetTop + targetHeight / 2 - tooltipRect.height / 2 + window.scrollY;
        left = targetLeft - tooltipRect.width - 10 + window.scrollX;
      }

      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
      if (top < 10) top = 10;

      activeTooltip.style.top = `${top}px`;
      activeTooltip.style.left = `${left}px`;
    }
  }
}

function clearHighlights() {
  if (activeHighlightBox) { activeHighlightBox.remove(); activeHighlightBox = null; }
  if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
  if (activeIndicator) { activeIndicator.remove(); activeIndicator = null; }
  currentHighlightSelector = null;
  currentHighlightLabel = null;
  currentTooltipSelector = null;
}

function showHighlightBox(selector, numLabel) {
  clearHighlights();
  currentHighlightSelector = selector;
  currentHighlightLabel = numLabel;

  activeHighlightBox = document.createElement('div');
  activeHighlightBox.className = 'tutorial-highlight-box';
  document.body.appendChild(activeHighlightBox);

  if (numLabel) {
    activeIndicator = document.createElement('div');
    activeIndicator.className = 'tutorial-indicator-dot';
    activeIndicator.innerText = numLabel;
    document.body.appendChild(activeIndicator);
  }
  repositionActiveElements();
}

function showCustomTooltip(selector, title, text, position = 'bottom') {
  if (activeTooltip) activeTooltip.remove();
  currentTooltipSelector = selector;
  currentTooltipTitle = title;
  currentTooltipText = text;
  currentTooltipPosition = position;

  activeTooltip = document.createElement('div');
  activeTooltip.className = 'tutorial-tooltip';
  activeTooltip.innerHTML = `<h4 style="margin:0 0 8px 0; font-size:15px; font-weight:800; color:#fff;">${title}</h4><p style="margin:0; font-size:13px; color:#cbd5e1;">${text}</p><div style="margin-top:10px; font-size:11px; color:#94a3b8; text-align:right;">Cliquez n'importe où pour continuer</div>`;
  document.body.appendChild(activeTooltip);
  repositionActiveElements();
}

function getIframeElementRect(selector) {
  const iframe = document.querySelector('.exo-frame');
  if (!iframe) return null;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  if (selector.includes(',')) {
    const selectors = selector.split(',').map(s => s.trim());
    let minTop = Infinity, minLeft = Infinity;
    let maxBottom = -Infinity, maxRight = -Infinity;
    let foundAny = false;

    for (const sel of selectors) {
      const el = iframeDoc.querySelector(sel);
      if (el) {
        foundAny = true;
        const elRect = el.getBoundingClientRect();
        if (elRect.top < minTop) minTop = elRect.top;
        if (elRect.left < minLeft) minLeft = elRect.left;
        if (elRect.bottom > maxBottom) maxBottom = elRect.bottom;
        if (elRect.right > maxRight) maxRight = elRect.right;
      }
    }

    if (!foundAny) return null;
    const iframeRect = iframe.getBoundingClientRect();
    return {
      top: iframeRect.top + minTop,
      left: iframeRect.left + minLeft,
      bottom: iframeRect.top + maxBottom,
      right: iframeRect.left + maxRight,
      width: maxRight - minLeft,
      height: maxBottom - minTop
    };
  }

  const el = iframeDoc.querySelector(selector);
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

function runStep2() {
  highlightParameter('XAxis');
}

function highlightParameter(paramType) {
  let selector = "";
  let title = "";
  let text = "";
  let nextParam = null;
  let indicatorNum = "2";

  if (paramType === 'XAxis') {
    selector = '.x.axis';
    title = translations && translations.definitions && translations.definitions.x_axis ? translations.definitions.x_axis.term : "Axe X (Abscisses)";
    text = translations && translations.definitions && translations.definitions.x_axis ? translations.definitions.x_axis.definition : "Représente la première caractéristique d'entrée. Dans cet exercice, il s'agit de la coordonnée horizontale de chaque point sur le plan.";
    nextParam = 'YAxis';
    indicatorNum = "2";
  } else if (paramType === 'YAxis') {
    selector = '.y.axis';
    title = translations && translations.definitions && translations.definitions.y_axis ? translations.definitions.y_axis.term : "Axe Y (Ordonnées)";
    text = translations && translations.definitions && translations.definitions.y_axis ? translations.definitions.y_axis.definition : "Représente la deuxième caractéristique d'entrée. Dans cet exercice, il s'agit de la coordonnée verticale de chaque point sur le plan.";
    nextParam = 'Colormap';
    indicatorNum = "3";
  } else if (paramType === 'Colormap') {
    selector = '#colormap';
    title = translations && translations.definitions && translations.definitions.color_scale ? translations.definitions.color_scale.term : "Palette & Options";
    text = translations && translations.definitions && translations.definitions.color_scale ? translations.definitions.color_scale.definition : "La palette indique les valeurs (Orange = négatif, Bleu = positif). L'affichage des données de test et la discrétisation aident à visualiser la frontière.";
    nextParam = 'Features';
    indicatorNum = "4";
  } else if (paramType === 'Features') {
    selector = '.column.features';
    title = translations && translations.definitions && translations.definitions.features ? translations.definitions.features.term : "Caractéristiques (Features)";
    text = translations && translations.definitions && translations.definitions.features ? translations.definitions.features.definition : "Les caractéristiques d'entrée sont les propriétés individuelles mesurables utilisées par le modèle. Ici, nous utilisons X1 et X2. (Notez les boutons d'information 'i' à côté pour de futures définitions !)";
    nextParam = 'Step3';
    indicatorNum = "5";
  }

  let el = null;
  if (selector) {
    const iframe = document.querySelector('.exo-frame');
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      el = iframeDoc.querySelector(selector);
    }
  }

  if (el) {
    showHighlightBox(selector, indicatorNum);
    showCustomTooltip(selector, title, text, 'bottom');

    const clickHandler = () => {
      document.removeEventListener('click', clickHandler);
      if (nextParam === 'Step3') {
        clearHighlights();
        runStep3();
      } else {
        highlightParameter(nextParam);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', clickHandler);
    }, 100);
  } else {
    if (nextParam === 'Step3') {
      runStep3();
    } else {
      highlightParameter(nextParam);
    }
  }
}

function runStep3() {
  const leftPopup = document.createElement('div');
  leftPopup.className = 'tutorial-popup-left';
  leftPopup.id = 'exo1-step3-leftpopup';

  const h3 = document.createElement('h3');
  const startText = translations && translations.start_marker ? translations.start_marker : "Let’s Start! Use the slider to change the weight of the features X1 and X2 to find out if your dataset can be classified";
  let titleText = "Let’s Start! [6]";
  let bodyText = startText;
  if (startText.startsWith("Let's Start!")) {
    titleText = "Let's Start! [6]";
    bodyText = startText.substring("Let's Start!".length).trim();
  } else if (startText.startsWith("Let’s Start!")) {
    titleText = "Let’s Start! [6]";
    bodyText = startText.substring("Let’s Start!".length).trim();
  }
  h3.innerText = titleText;

  const p = document.createElement('p');
  p.innerText = bodyText;

  const btnDiv = document.createElement('div');
  btnDiv.className = 'btn-right';
  const nextBtn = document.createElement('button');
  nextBtn.innerText = "Next >>";

  btnDiv.appendChild(nextBtn);
  leftPopup.appendChild(h3);
  leftPopup.appendChild(p);
  leftPopup.appendChild(btnDiv);
  document.body.appendChild(leftPopup);

  nextBtn.onclick = (e) => {
    e.stopPropagation();
    leftPopup.remove();
    runStep4();
  };
}

function runStep4() {
  showHighlightBox('#custom-weight-editor-x, #custom-weight-editor-y', '7');
  const wTitle = translations && translations.definitions && translations.definitions.weight ? translations.definitions.weight.term : "Modifier les Poids";
  const wDesc = translations && translations.definitions && translations.definitions.weight ? translations.definitions.weight.definition : "Faites glisser les curseurs ou cliquez sur les liaisons entre X1, X2 et la sortie pour modifier leurs poids.";
  showCustomTooltip('#custom-weight-editor-x, #custom-weight-editor-y', wTitle, wDesc, 'right');

  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);
    clearHighlights();
  };
  setTimeout(() => {
    document.addEventListener('click', clickHandler);
  }, 100);
}

function showStep5Congrats() {
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.id = 'exo1-step5-overlay';

  const popup = document.createElement('div');
  popup.className = 'tutorial-popup';
  popup.style.background = '#004676';

  const h3 = document.createElement('h3');
  h3.style.color = '#FFFFFF';
  h3.innerText = "Great job! [8]";

  const p = document.createElement('p');
  p.style.color = '#FFFFFF';
  const congratsText = translations && translations.target_achieved ? translations.target_achieved : "Your settings lead to a good classification of our data into two clusters.\nLet's review together what you’ve learned from this exercise.";
  p.innerText = congratsText;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'tutorial-btn';
  nextBtn.style.background = '#FF553F';
  nextBtn.innerText = "Suivant";

  popup.appendChild(h3);
  popup.appendChild(p);
  popup.appendChild(nextBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  const dismiss = () => {
    overlay.remove();
    document.removeEventListener('click', dismiss);
  };

  nextBtn.onclick = (e) => {
    e.stopPropagation();
    dismiss();
  };

  setTimeout(() => {
    document.addEventListener('click', dismiss);
  }, 100);
}

window.addEventListener('resize', repositionActiveElements);
window.addEventListener('scroll', repositionActiveElements);
setInterval(repositionActiveElements, 100);

// Lancer le tutoriel après chargement de l'iframe
const iframe = document.querySelector('.exo-frame');
if (iframe) {
  iframe.addEventListener('load', () => {
    // Ne pas lancer le tutoriel si l'exercice vient d'être marqué complété
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('completed') === 'true') {
      return;
    }
    setTimeout(async () => {
      // Remplacer les boutons '?' en 'i' d'informations dans l'iframe
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.querySelectorAll('.info-tip').forEach(el => {
          if (el.innerText === '?') {
            el.innerText = 'i';
            el.classList.add('info-tip-pulse');
            // Arrêter le clignotement après clic
            el.addEventListener('click', () => {
              el.classList.remove('info-tip-pulse');
            });
          }
        });
      } catch (e) {
        console.error("Erreur lors de la modification des info-tips dans l'iframe:", e);
      }
      await loadTranslations();
      startTutorial();
    }, 1200);
  });
}
