// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        const visitorBtn = document.createElement('a');
        visitorBtn.href = 'Page-demo/register.html';
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.onmouseover = () => visitorBtn.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)';
        visitorBtn.onmouseout = () => visitorBtn.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)';
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span > ';
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
        }
        else {
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
        if (!container.contains(e.target) && isOpen)
            avatar.onclick();
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
    }
    else if (type === 'neuron') {
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
    for (let i = 0; i < numFormulas; i++)
        createAnimatedElement('formula', 'math-formula');
    for (let i = 0; i < numNeurons; i++)
        createAnimatedElement('neuron', 'neuron');
    for (let i = 0; i < numConnections; i++) {
        const n1 = neurons[Math.floor(Math.random() * neurons.length)];
        const n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2)
            createConnection(n1, n2);
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
        const length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
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
// --- INJECT CUSTOM CSS FOR ARROWS AND STEP POPUPS ---
const styleEl = document.createElement('style');
styleEl.textContent = `
  .flow-arrow {
    stroke: #FF034D;
    stroke-width: 8;
    fill: none;
    stroke-linecap: round;
    stroke-dasharray: 16 10;
    animation: flow-anim 1s linear infinite;
  }
  .flow-arrow-blue {
    stroke: #004676;
    stroke-width: 8;
    fill: none;
    stroke-linecap: round;
    stroke-dasharray: 16 10;
    animation: flow-anim 1.2s linear infinite;
  }
  .flow-arrow-grey {
    stroke: rgba(148, 163, 184, 0.55);
    stroke-width: 5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 10 8;
    animation: flow-anim-grey 12s linear infinite;
  }
  @keyframes flow-anim {
    to {
      stroke-dashoffset: -26;
    }
  }
  @keyframes flow-anim-grey {
    to {
      stroke-dashoffset: -36;
    }
  }

  .step-card {
    position: fixed;
    background: rgba(15, 23, 42, 0.95);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 12px;
    width: 220px;
    color: #fff;
    z-index: 10010;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    font-family: 'Inter', sans-serif;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    pointer-events: auto;
  }
  .step-card.inactive {
    opacity: 0.35;
    transform: scale(0.95);
    pointer-events: none;
  }
  .step-card.active {
    opacity: 1;
    transform: scale(1.02);
    border-color: #004676;
    box-shadow: 0 12px 30px rgba(0, 70, 118, 0.4), 0 0 15px rgba(0, 70, 118, 0.2);
    pointer-events: auto;
  }
  .step-card h3 {
    margin-top: 0;
    font-size: 13px;
    font-weight: 800;
    color: #FF034D;
    margin-bottom: 6px;
  }
  .step-card p {
    font-size: 10.5px;
    line-height: 1.4;
    color: #cbd5e1;
    margin-bottom: 8px;
  }
  .step-card .btn-right {
    display: flex;
    justify-content: flex-end;
  }
  .step-card button {
    background: #10b981;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
  }
  .step-card button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
  }
`;
document.head.appendChild(styleEl);
// --- ITERATIVE LEARNING CYCLE LOGIC ---
const steps = [
    {
        id: 0,
        title: "Step 0 – Initialize the parameters",
        text: "Before learning begins, the weights and biases of the network are initialized randomly. This establishes the initial starting point of the network's parameters."
    },
    {
        id: 1,
        title: "Step 1 – Forward pass (make a prediction)",
        text: "The input data travels forward through the network. Each neuron calculates a weighted sum of its inputs, adds a bias, applies the activation function, and passes the result to the next layer to make a prediction."
    },
    {
        id: 2,
        title: "Step 2 – Compute the error (loss)",
        text: "The predicted outputs are compared with the actual target values using a loss function. This measures the error of the model's current predictions."
    },
    {
        id: 3,
        title: "Step 3 – Backward pass (compute corrections)",
        text: "The gradient of the loss function is calculated with respect to each weight and bias, propagating the error backwards from the output layer through the hidden layers."
    },
    {
        id: 4,
        title: "Step 4 – Update the weights",
        text: "The optimizer updates the weights and biases of the network in the opposite direction of the gradient, scaled by the learning rate, to reduce the loss."
    },
    {
        id: 5,
        title: "Then the loop repeats from step 1",
        text: "With the updated parameters, the cycle starts again. Over thousands of iterations, the network progressively learns the complex decision boundary to classify the dataset."
    }
];
let currentStepIndex = -1;
function getElementCoords(selector) {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return null;
    const iframeRect = iframe.getBoundingClientRect();
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const el = iframeDoc.querySelector(selector);
        if (!el)
            return null;
        const elRect = el.getBoundingClientRect();
        return {
            cx: iframeRect.left + elRect.left + elRect.width / 2,
            cy: iframeRect.top + elRect.top + elRect.height / 2,
            left: iframeRect.left + elRect.left,
            right: iframeRect.left + elRect.right,
            top: iframeRect.top + elRect.top,
            bottom: iframeRect.top + elRect.bottom,
            width: elRect.width,
            height: elRect.height
        };
    }
    catch (e) {
        return null;
    }
}
function clearOverlay() {
    const overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    overlay.querySelectorAll('path, circle').forEach(e => e.remove());
}
function renderAndPositionCards() {
    steps.forEach((step, idx) => {
        let card = document.getElementById(`step-card-${idx}`);
        if (!card) {
            card = document.createElement('div');
            card.id = `step-card-${idx}`;
            card.className = 'step-card inactive';
            const h3 = document.createElement('h3');
            h3.innerText = step.title;
            const p = document.createElement('p');
            p.innerText = step.text;
            const okBtn = document.createElement('button');
            okBtn.innerText = "OK";
            okBtn.onclick = (e) => {
                e.stopPropagation();
                goToNextStep();
            };
            const btnContainer = document.createElement('div');
            btnContainer.className = 'btn-right';
            btnContainer.appendChild(okBtn);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(btnContainer);
            document.body.appendChild(card);
        }
        // Update active class
        if (idx === currentStepIndex) {
            card.className = 'step-card active';
            card.querySelector('button').style.display = 'inline-block';
        }
        else {
            card.className = 'step-card inactive';
            card.querySelector('button').style.display = 'none';
        }
        // Position card based on dynamic elements in iframe
        const d = getElementCoords('.ui-dataset');
        const n = getElementCoords('#network');
        const h = getElementCoords('#heatmap');
        const m = getElementCoords('.metrics');
        const f = getElementCoords('.column.features');
        if (idx === 0 && d) {
            // Decentered: 2cm left
            card.style.left = `${d.cx - 110 - 80}px`;
            card.style.top = `${d.bottom + 45}px`;
        }
        else if (idx === 1 && n && h) {
            // Decentered: 4cm left, 2cm down
            card.style.left = `${(n.cx + h.cx) / 2 - 110 - 160}px`;
            card.style.top = `${h.bottom + 20 + 80}px`;
        }
        else if (idx === 2 && h) {
            // Decentered: 1cm right, 0.5cm up
            card.style.left = `${h.cx - 110 + 40}px`;
            card.style.top = `${h.top - 125 - 20}px`;
        }
        else if (idx === 3 && n && m) {
            // Decentered: 1cm up
            card.style.left = `${n.cx - 110}px`;
            card.style.top = `${m.top - 45 - 40}px`;
        }
        else if (idx === 4 && f) {
            // Decentered: 3cm up
            card.style.left = `${f.cx - 110}px`;
            card.style.top = `${f.top + 70 - 120}px`;
        }
        else if (idx === 5 && f) {
            // Decentered: 3cm down
            card.style.left = `${f.cx - 110}px`;
            card.style.top = `${f.top + 215 + 120}px`;
        }
    });
}
function drawFlowArrows() {
    clearOverlay();
    const overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    const d = getElementCoords('.ui-dataset');
    const c0 = document.getElementById('step-card-0');
    const c1 = document.getElementById('step-card-1');
    const c2 = document.getElementById('step-card-2');
    const c3 = document.getElementById('step-card-3');
    const c4 = document.getElementById('step-card-4');
    const c5 = document.getElementById('step-card-5');
    if (!c0 || !c1 || !c2 || !c3 || !c4 || !c5)
        return;
    const r0 = c0.getBoundingClientRect();
    const r1 = c1.getBoundingClientRect();
    const r2 = c2.getBoundingClientRect();
    const r3 = c3.getBoundingClientRect();
    const r4 = c4.getBoundingClientRect();
    const r5 = c5.getBoundingClientRect();
    
    function addArrowPath(dStr) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', dStr);
        path.setAttribute('class', 'flow-arrow-grey');
        path.setAttribute('marker-end', 'url(#arrow-head-grey)');
        overlay.appendChild(path);
    }

    // 1. Dataset (bas, centre) -> Step 0 (haut, centre)
    if (d) {
        const startX = d.cx;
        const startY = d.bottom;
        const endX = r0.left + r0.width / 2;
        const endY = r0.top;
        // Courbe verticale douce pour éviter la déformation
        addArrowPath(`M ${startX},${startY} C ${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`);
    }

    // 2. Step 0 (droite, centre) -> Step 1 (gauche, centre)
    {
        const startX = r0.right;
        const startY = r0.top + r0.height / 2;
        const endX = r1.left;
        const endY = r1.top + r1.height / 2;
        const dx = Math.abs(endX - startX);
        const controlOffset = Math.min(100, dx / 2);
        addArrowPath(`M ${startX},${startY} C ${startX + controlOffset},${startY} ${endX - controlOffset},${endY} ${endX},${endY}`);
    }

    // 3. Step 1 (droite, centre) -> Step 2 (bas, centre)
    {
        const startX = r1.right;
        const startY = r1.top + r1.height / 2;
        const endX = r2.left + r2.width / 2;
        const endY = r2.bottom;
        // Contourne le heatmap par la droite pour ne pas le couper
        const midX = Math.max(r1.right, r2.right) + 60;
        const midY = (startY + endY) / 2;
        addArrowPath(`M ${startX},${startY} C ${startX + 80},${startY} ${midX},${startY} ${midX},${midY} C ${midX},${endY + 80} ${endX},${endY + 60} ${endX},${endY}`);
    }

    // 4. Step 2 (gauche, centre) -> Step 3 (droite, centre)
    {
        const startX = r2.left;
        const startY = r2.top + r2.height / 2;
        const endX = r3.right;
        const endY = r3.top + r3.height / 2;
        const dx = Math.abs(endX - startX);
        const controlOffset = Math.min(100, dx / 2);
        addArrowPath(`M ${startX},${startY} C ${startX - controlOffset},${startY} ${endX + controlOffset},${endY} ${endX},${endY}`);
    }

    // 5. Step 3 (gauche, centre) -> Step 4 (haut, centre)
    {
        const startX = r3.left;
        const startY = r3.top + r3.height / 2;
        const endX = r4.left + r4.width / 2;
        const endY = r4.top;
        // Passe par le haut pour ne pas couper le réseau ou les features
        const controlX1 = (startX + endX) / 2;
        addArrowPath(`M ${startX},${startY} C ${controlX1},${startY} ${endX},${startY} ${endX},${endY}`);
    }

    // 6. Step 4 (bas, centre) -> Step 5 (haut, centre)
    {
        const startX = r4.left + r4.width / 2;
        const startY = r4.bottom;
        const endX = r5.left + r5.width / 2;
        const endY = r5.top;
        addArrowPath(`M ${startX},${startY} L ${endX},${endY}`);
    }
}
function injectBlinkStyleInIframe() {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.getElementById('exo13-blink-styles'))
            return;
        const style = iframeDoc.createElement('style');
        style.id = 'exo13-blink-styles';
        style.textContent = `
            @keyframes blink-active-anim {
                0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; }
                50% { background-color: #FF034D; transform: scale(1.2); box-shadow: 0 0 15px #FF034D; color: white !important; }
            }
            .blink-active {
                animation: blink-active-anim 1s infinite !important;
                border-radius: 50% !important;
            }
        `;
        iframeDoc.head.appendChild(style);
    }
    catch (e) { }
}
function setBlinkStatus(active) {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const btn = iframeDoc.getElementById('next-step-button');
        if (btn) {
            if (active) {
                btn.classList.add('blink-active');
            }
            else {
                btn.classList.remove('blink-active');
            }
        }
    }
    catch (e) { }
}
function bindIframeEvents() {
    const iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const btn = iframeDoc.getElementById('next-step-button');
        if (btn) {
            btn.onclick = (e) => {
                if (currentStepIndex === -1) {
                    goToNextStep();
                }
            };
        }
    }
    catch (e) { }
}
function goToNextStep() {
    currentStepIndex++;
    if (currentStepIndex >= steps.length) {
        // Remove all step cards
        steps.forEach((s, idx) => {
            const card = document.getElementById(`step-card-${idx}`);
            if (card)
                card.remove();
        });
        showSynthesisOverlay();
        return;
    }
    // Blink handling on first step/intro
    if (currentStepIndex === 0) {
        setBlinkStatus(false);
    }
    renderAndPositionCards();
    drawFlowArrows();
}
function showSynthesisOverlay() {
    clearOverlay();
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-synthesis-overlay';
    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    const h3 = document.createElement('h3');
    h3.innerText = "In summary";
    const p = document.createElement('p');
    p.style.textAlign = 'left';
    p.style.whiteSpace = 'pre-line';
    p.style.fontSize = '20px';
    p.innerText = `Training is an iterative loop:
predict → measure error → correct → update

Each step slightly improves the model
Learning emerges progressively over many iterations.

You can run the model again to observe these steps in action;

Whenever you are ready click "Next" to proceed to the next activity.`;
    const nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "NEXT";
    nextBtn.onclick = () => {
        overlay.remove();
        const btnRealise = document.getElementById('btn-realise');
        if (btnRealise) {
            btnRealise.disabled = false;
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Test your knowledge';
            btnRealise.onclick = () => {
                window.location.href = 'exoquiz/exo13_quiz.html';
            };
        }
        window.location.href = 'exoquiz/exo13_quiz.html';
    };
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}
function startTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-tutorial-overlay';
    const popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    const h3 = document.createElement('h3');
    h3.innerText = "Exercise #13 : Iterative Learning Cycle";
    const p = document.createElement('p');
    p.innerText = "Observer l'évolution de la frontière de décision au fil des epochs. Mettre en pause à différents moments de l'entrainement (epoch 10, 100, 500) et décrire ce qui se passe visuellement.";
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
        }
        else {
            timerSpan.style.display = 'none';
            nextBtn.disabled = false;
        }
    }
    updateTimer();
    nextBtn.onclick = () => {
        overlay.remove();
        injectBlinkStyleInIframe();
        setBlinkStatus(true);
        bindIframeEvents();
        // Show first step card (Step 0) immediately
        setTimeout(() => {
            goToNextStep();
        }, 500);
    };
}
// Redraw layout and arrows on resize
window.onresize = () => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
        renderAndPositionCards();
        drawFlowArrows();
    }
};
// Check iframe loaded status
const iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', () => {
        setTimeout(() => {
            startTutorial();
        }, 1200);
    });
}
// --- LOGIQUE DE SAUVEGARDE ET VALIDATION ---
const btnSauvegarder = document.getElementById('btn-sauvegarder');
const btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = () => __awaiter(this, void 0, void 0, function* () {
    const success = yield window.StorageService.save(13);
    if (success) {
        btnSauvegarder.innerHTML = '✅ Sauvegardé !';
        btnSauvegarder.disabled = true;
    }
});
