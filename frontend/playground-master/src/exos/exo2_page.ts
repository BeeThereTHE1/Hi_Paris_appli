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
        menu.querySelector('#btnFuturLogout').onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
        container.appendChild(avatar); container.appendChild(menu);
      })();

      // ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
      const btnSauvegarder = document.getElementById('btn-sauvegarder') as HTMLButtonElement;
      const btnRealise = document.getElementById('btn-realise') as HTMLButtonElement;

      function showExerciseSuccessCongrats() {
        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';
        overlay.id = 'exo2-success-overlay';

        const popup = document.createElement('div');
        popup.className = 'tutorial-popup';
        popup.style.background = '#004676';

        const h3 = document.createElement('h3');
        h3.style.color = '#FFFFFF';
        h3.innerText = "Great!!";

        const p = document.createElement('p');
        p.style.color = '#FFFFFF';
        p.innerText = "the model has successsfully learned to classify the data. Now let's go back and review the different training steps.";

        const nextBtn = document.createElement('button');
        nextBtn.className = 'tutorial-btn';
        nextBtn.style.background = '#FF553F';
        nextBtn.innerText = "Go to Quiz";

        popup.appendChild(h3);
        popup.appendChild(p);
        popup.appendChild(nextBtn);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        const dismiss = () => {
          overlay.remove();
          document.removeEventListener('click', dismiss);
        };

        nextBtn.onclick = async (e) => {
          e.stopPropagation();
          dismiss();
          
          const success = await (window as any).StorageService.complete(2);
          if (success) {
            btnRealise.innerHTML = '✨ Redirection...';
            btnRealise.disabled = true;
            setTimeout(() => {
              window.location.href = 'exoquiz/exo2_quiz.html';
            }, 800);
          } else {
            window.location.href = 'exoquiz/exo2_quiz.html';
          }
        };

        setTimeout(() => {
          document.addEventListener('click', dismiss);
        }, 100);
      }

      window.addEventListener('message', (event) => {
        if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == 2) {
          btnRealise.disabled = false;
          btnRealise.classList.remove('btn-disabled');
          btnRealise.classList.add('btn-success-ready');
          btnRealise.innerHTML = '✨ Exercice Réussi !!';
          showExerciseSuccessCongrats();
        }
      });

      btnSauvegarder.onclick = async () => {
        const success = await (window as any).StorageService.save(2);
        if (success) {
          btnSauvegarder.innerHTML = '✅ Sauvegardé !';
          btnSauvegarder.style.opacity = '0.7';
          btnSauvegarder.disabled = true;
        }
      };

      btnRealise.onclick = async () => {
        const success = await (window as any).StorageService.complete(2);
        if (success) {
          btnRealise.innerHTML = '✨ Redirection...';
          btnRealise.disabled = true;
          setTimeout(() => {
            window.location.href = 'exoquiz/exo2_quiz.html';
          }, 800);
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

// ==========================================
// TUTORIEL INTERACTIF ÉTAPE PAR ÉTAPE (EXO 2)
// ==========================================

let activeHighlightBox: HTMLDivElement | null = null;
let activeTooltip: HTMLDivElement | null = null;
let activeIndicator: HTMLDivElement | null = null;
let currentHighlightSelector: string | null = null;
let currentHighlightLabel: string | null = null;
let currentTooltipSelector: string | null = null;
let currentTooltipTitle: string | null = null;
let currentTooltipText: string | null = null;
let currentTooltipPosition: string = 'bottom';

function clearHighlights() {
  if (activeHighlightBox) { activeHighlightBox.remove(); activeHighlightBox = null; }
  if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
  if (activeIndicator) { activeIndicator.remove(); activeIndicator = null; }
  currentHighlightSelector = null;
  currentHighlightLabel = null;
  currentTooltipSelector = null;
}

function getIframeElementRect(selector: string) {
  const iframe = document.querySelector('.exo-frame') as HTMLIFrameElement;
  if (!iframe) return null;
  const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
  if (!iframeDoc) return null;

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

function showHighlightBox(selector: string, numLabel?: string) {
  clearHighlights();
  currentHighlightSelector = selector;
  currentHighlightLabel = numLabel || null;

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

function showCustomTooltip(selector: string, title: string, text: string, position: string = 'bottom') {
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

function startTutorial() {
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.id = 'exo2-tutorial-overlay';

  const popup = document.createElement('div');
  popup.className = 'tutorial-popup';

  const h3 = document.createElement('h3');
  h3.innerText = "Exercice #2 : Entraînez le réseau";

  const p = document.createElement('p');
  const text = "Dans cet exercice, vous allez apprendre à lancer l'entraînement du réseau de neurones et suivre ses performances à l'aide de l'affichage des époques, de la perte (loss) et de sa courbe d'évolution.";
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

  const wordCount = text.split(/\s+/).length;
  let timeLeft = Math.max(5, Math.ceil((wordCount / 200) * 60)); // ~10s

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

function runStep2() {
  showHighlightBox('.timeline-controls', '2');
  showCustomTooltip('.timeline-controls', "Contrôles de Simulation", "Cliquez sur le bouton Play pour lancer l'apprentissage, ou utilisez les boutons Étape et Réinitialiser.", 'bottom');

  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);
    runStep3();
  };
  setTimeout(() => {
    document.addEventListener('click', clickHandler);
  }, 100);
}

function runStep3() {
  showHighlightBox('.control.ui-epoch', '3');
  showCustomTooltip('.control.ui-epoch', "Nombre d'Époques", "Ce compteur indique combien de fois l'ensemble du jeu de données a traversé le réseau de neurones.", 'bottom');

  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);
    runStep4();
  };
  setTimeout(() => {
    document.addEventListener('click', clickHandler);
  }, 100);
}

function runStep4() {
  showHighlightBox('.output-stats.train.ui-trainLoss', '4');
  showCustomTooltip('.output-stats.train.ui-trainLoss', "Perte d'Entraînement (Training Loss)", "Cette valeur mesure l'erreur du modèle. Plus elle baisse et se rapproche de 0, plus le réseau apprend à classer correctement.", 'left');

  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);
    runStep5();
  };
  setTimeout(() => {
    document.addEventListener('click', clickHandler);
  }, 100);
}

function runStep5() {
  showHighlightBox('#linechart', '5');
  showCustomTooltip('#linechart', "Graphique d'Évolution de la Perte", "Visualisez en temps réel la courbe de perte d'entraînement (et de test). Elle doit descendre progressivement pendant la simulation.", 'left');

  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);
    runFinalStep();
  };
  setTimeout(() => {
    document.addEventListener('click', clickHandler);
  }, 100);
}

function runFinalStep() {
  showHighlightBox('.timeline-controls', '1');
  
  if (activeTooltip) activeTooltip.remove();
  currentTooltipSelector = '.timeline-controls';
  currentTooltipTitle = "Ready to start the training?";
  currentTooltipText = "";
  currentTooltipPosition = 'bottom';

  activeTooltip = document.createElement('div');
  activeTooltip.className = 'tutorial-tooltip';
  activeTooltip.innerHTML = `<h4 style="margin:0; font-size:15px; font-weight:800; color:#fff; text-align:center; padding: 5px 10px;">Ready to start the training?</h4>`;
  document.body.appendChild(activeTooltip);
  repositionActiveElements();

  setTimeout(() => {
    clearHighlights();
  }, 4000);
}

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
    setTimeout(() => {
      try {
        const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (iframeDoc) {
          iframeDoc.querySelectorAll('.info-tip').forEach(el => {
            if ((el as HTMLElement).innerText === '?') {
              (el as HTMLElement).innerText = 'i';
              el.classList.add('info-tip-pulse');
              el.addEventListener('click', () => {
                el.classList.remove('info-tip-pulse');
              });
            }
          });
        }
      } catch (e) {
        console.error("Erreur d'initialisation des info-tips:", e);
      }
      startTutorial();
    }, 1200);
  });
}