var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        var visitorBtn_1 = document.createElement('a');
        visitorBtn_1.href = 'Page-demo/register.html';
        visitorBtn_1.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn_1.onmouseover = function () { return visitorBtn_1.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)'; };
        visitorBtn_1.onmouseout = function () { return visitorBtn_1.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)'; };
        visitorBtn_1.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span > ';
        container.appendChild(visitorBtn_1);
        return;
    }
    var initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
    avatar.innerText = initiales.toUpperCase();
    avatar.onmouseover = function () { return avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
    avatar.onmouseout = function () { return avatar.style.transform = 'scale(1) rotate(0deg)'; };
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCCA</span> Mon Historique\n          </a>\n          <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCC8</span> Mes Statistiques\n          </a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;\" onmouseover=\"this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDEAA</span> D\u00E9connexion\n          </div>\n        </div>\n      ";
    var isOpen = false;
    avatar.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block';
            setTimeout(function () {
                menu.style.opacity = '1';
                menu.style.transform = 'scale(1) translateY(0)';
                menu.style.pointerEvents = 'auto';
            }, 10);
        }
        else {
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.9) translateY(-10px)';
            menu.style.pointerEvents = 'none';
            setTimeout(function () { return menu.style.display = 'none'; }, 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = function () {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    };
    document.addEventListener('click', function (e) {
        if (!container.contains(e.target) && isOpen)
            avatar.onclick();
    });
    container.appendChild(avatar);
    container.appendChild(menu);
})();
var backgroundContainer = document.getElementById('background-container');
var formulas = ['\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c', '\\frac{dy}{dx}', '\\alpha', '\\beta', '\\gamma', '\\sin(t)', '\\cos(t)', 'e^{-t}'];
var numFormulas = 25;
var numNeurons = 30;
var numConnections = 50;
var neurons = [];
var connections = [];
var formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass, styleProperties) {
    if (styleProperties === void 0) { styleProperties = {}; }
    var element = document.createElement('div');
    element.className = elementClass;
    element.style.position = 'absolute';
    Object.assign(element.style, styleProperties);
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = "clamp(1rem, 5vw, 2.5rem)";
        element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = "rgba(255, 255, 255, " + element.style.opacity + ")";
        element.style.left = getRandom(-20, 120) + "vw";
        element.style.top = getRandom(-20, 120) + "vh";
        element.style.transform = "rotate(" + getRandom(-30, 30) + "deg)";
        formulasElements.push(element);
    }
    else if (type === 'neuron') {
        var size = getRandom(10, 25);
        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.backgroundColor = "hsl(" + getRandom(190, 250) + ", 70%, 50%)";
        element.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px " + element.style.backgroundColor;
        element.style.left = getRandom(-10, 110) + "vw";
        element.style.top = getRandom(-10, 110) + "vh";
        element.style.opacity = 0;
        element.style.transform = 'scale(0)';
        neurons.push({ element: element, size: size, x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
}
function createConnection(neuron1, neuron2) {
    var connection = document.createElement('div');
    connection.className = 'connection';
    connection.style.position = 'absolute';
    connection.style.height = '1.5px';
    connection.style.background = "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))";
    connection.style.opacity = 0;
    connection.style.transformOrigin = '0 0';
    connection.style.filter = 'blur(4px)';
    connections.push({ element: connection, neuron1: neuron1, neuron2: neuron2, opacity: 0 });
    backgroundContainer.appendChild(connection);
}
function lerp(start, end, amount) { return (1 - amount) * start + amount * end; }
function initializeBackground() {
    for (var i = 0; i < numFormulas; i++)
        createAnimatedElement('formula', 'math-formula');
    for (var i = 0; i < numNeurons; i++)
        createAnimatedElement('neuron', 'neuron');
    for (var i = 0; i < numConnections; i++) {
        var n1 = neurons[Math.floor(Math.random() * neurons.length)];
        var n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2)
            createConnection(n1, n2);
    }
}
function animateBackground() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var time = Date.now() * 0.0005;
    neurons.forEach(function (neuron, index) {
        var angle = index * (2 * Math.PI / numNeurons) + time;
        var radius = Math.min(windowWidth, windowHeight) * 0.3;
        var targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        var targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        neuron.element.style.opacity = neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.element.style.transform = "scale(" + (neuron.scale = Math.max(neuron.scale, 1)) + ")";
        neuron.element.style.left = (neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)) + "px";
        neuron.element.style.top = (neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)) + "px";
    });
    connections.forEach(function (conn) {
        var element = conn.element, neuron1 = conn.neuron1, neuron2 = conn.neuron2;
        var x1 = neuron1.x + neuron1.size / 2;
        var y1 = neuron1.y + neuron1.size / 2;
        var x2 = neuron2.x + neuron2.size / 2;
        var y2 = neuron2.y + neuron2.size / 2;
        var length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        element.style.opacity = 0.3;
        element.style.width = length + "px";
        element.style.left = x1 + "px";
        element.style.top = y1 + "px";
        element.style.transform = "rotate(" + angle + "deg)";
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground();
animateBackground();
var styleEl = document.createElement('style');
styleEl.textContent = "\n  .flow-arrow {\n    stroke: #FF034D;\n    stroke-width: 8;\n    fill: none;\n    stroke-linecap: round;\n    stroke-dasharray: 16 10;\n    animation: flow-anim 1s linear infinite;\n  }\n  .flow-arrow-blue {\n    stroke: #004676;\n    stroke-width: 8;\n    fill: none;\n    stroke-linecap: round;\n    stroke-dasharray: 16 10;\n    animation: flow-anim 1.2s linear infinite;\n  }\n  .flow-arrow-grey {\n    stroke: rgba(148, 163, 184, 0.55);\n    stroke-width: 5;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-dasharray: 10 8;\n    animation: flow-anim-grey 12s linear infinite;\n  }\n  @keyframes flow-anim {\n    to {\n      stroke-dashoffset: -26;\n    }\n  }\n  @keyframes flow-anim-grey {\n    to {\n      stroke-dashoffset: -36;\n    }\n  }\n\n  .step-card {\n    position: fixed;\n    background: rgba(15, 23, 42, 0.95);\n    border: 1.5px solid rgba(255, 255, 255, 0.15);\n    border-radius: 12px;\n    padding: 12px;\n    width: 220px;\n    color: #fff;\n    z-index: 10010;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n    font-family: 'Inter', sans-serif;\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n    pointer-events: auto;\n  }\n  .step-card.inactive {\n    opacity: 0.35;\n    transform: scale(0.95);\n    pointer-events: none;\n  }\n  .step-card.active {\n    opacity: 1;\n    transform: scale(1.02);\n    border-color: #004676;\n    box-shadow: 0 12px 30px rgba(0, 70, 118, 0.4), 0 0 15px rgba(0, 70, 118, 0.2);\n    pointer-events: auto;\n  }\n  .step-card h3 {\n    margin-top: 0;\n    font-size: 13px;\n    font-weight: 800;\n    color: #FF034D;\n    margin-bottom: 6px;\n  }\n  .step-card p {\n    font-size: 10.5px;\n    line-height: 1.4;\n    color: #cbd5e1;\n    margin-bottom: 8px;\n  }\n  .step-card .btn-right {\n    display: flex;\n    justify-content: flex-end;\n  }\n  .step-card button {\n    background: #10b981;\n    color: white;\n    border: none;\n    padding: 4px 12px;\n    border-radius: 5px;\n    font-weight: 700;\n    cursor: pointer;\n    font-size: 11px;\n    transition: all 0.2s;\n  }\n  .step-card button:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);\n  }\n";
document.head.appendChild(styleEl);
var steps = [
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
var currentStepIndex = -1;
function getElementCoords(selector) {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return null;
    var iframeRect = iframe.getBoundingClientRect();
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var el = iframeDoc.querySelector(selector);
        if (!el)
            return null;
        var elRect = el.getBoundingClientRect();
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
    var overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    overlay.querySelectorAll('path, circle').forEach(function (e) { return e.remove(); });
}
function renderAndPositionCards() {
    steps.forEach(function (step, idx) {
        var card = document.getElementById("step-card-" + idx);
        if (!card) {
            card = document.createElement('div');
            card.id = "step-card-" + idx;
            card.className = 'step-card inactive';
            var h3 = document.createElement('h3');
            h3.innerText = step.title;
            var p = document.createElement('p');
            p.innerText = step.text;
            var okBtn = document.createElement('button');
            okBtn.innerText = "OK";
            okBtn.onclick = function (e) {
                e.stopPropagation();
                goToNextStep();
            };
            var btnContainer = document.createElement('div');
            btnContainer.className = 'btn-right';
            btnContainer.appendChild(okBtn);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(btnContainer);
            document.body.appendChild(card);
        }
        if (idx === currentStepIndex) {
            card.className = 'step-card active';
            card.querySelector('button').style.display = 'inline-block';
        }
        else {
            card.className = 'step-card inactive';
            card.querySelector('button').style.display = 'none';
        }
        var d = getElementCoords('.ui-dataset');
        var n = getElementCoords('#network');
        var h = getElementCoords('#heatmap');
        var m = getElementCoords('.metrics');
        var f = getElementCoords('.column.features');
        if (idx === 0 && d) {
            card.style.left = d.cx - 110 - 80 + "px";
            card.style.top = d.bottom + 45 + "px";
        }
        else if (idx === 1 && n && h) {
            card.style.left = (n.cx + h.cx) / 2 - 110 - 160 + "px";
            card.style.top = h.bottom + 20 + 80 + "px";
        }
        else if (idx === 2 && h) {
            card.style.left = h.cx - 110 + 40 + "px";
            card.style.top = h.top - 125 - 20 + "px";
        }
        else if (idx === 3 && n && m) {
            card.style.left = n.cx - 110 + "px";
            card.style.top = m.top - 45 - 40 + "px";
        }
        else if (idx === 4 && f) {
            card.style.left = f.cx - 110 + "px";
            card.style.top = f.top + 70 - 120 + "px";
        }
        else if (idx === 5 && f) {
            card.style.left = f.cx - 110 + "px";
            card.style.top = f.top + 215 + 120 + "px";
        }
    });
}
function drawFlowArrows() {
    clearOverlay();
    var overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    var d = getElementCoords('.ui-dataset');
    var c0 = document.getElementById('step-card-0');
    var c1 = document.getElementById('step-card-1');
    var c2 = document.getElementById('step-card-2');
    var c3 = document.getElementById('step-card-3');
    var c4 = document.getElementById('step-card-4');
    var c5 = document.getElementById('step-card-5');
    if (!c0 || !c1 || !c2 || !c3 || !c4 || !c5)
        return;
    var r0 = c0.getBoundingClientRect();
    var r1 = c1.getBoundingClientRect();
    var r2 = c2.getBoundingClientRect();
    var r3 = c3.getBoundingClientRect();
    var r4 = c4.getBoundingClientRect();
    var r5 = c5.getBoundingClientRect();
    function addArrowPath(dStr) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', dStr);
        path.setAttribute('class', 'flow-arrow-grey');
        path.setAttribute('marker-end', 'url(#arrow-head-grey)');
        overlay.appendChild(path);
    }
    if (d) {
        var startX = d.cx;
        var startY = d.bottom;
        var endX = r0.left + r0.width / 2;
        var endY = r0.top;
        addArrowPath("M " + startX + "," + startY + " C " + startX + "," + (startY + endY) / 2 + " " + endX + "," + (startY + endY) / 2 + " " + endX + "," + endY);
    }
    {
        var startX = r0.right;
        var startY = r0.top + r0.height / 2;
        var endX = r1.left;
        var endY = r1.top + r1.height / 2;
        var dx = Math.abs(endX - startX);
        var controlOffset = Math.min(100, dx / 2);
        addArrowPath("M " + startX + "," + startY + " C " + (startX + controlOffset) + "," + startY + " " + (endX - controlOffset) + "," + endY + " " + endX + "," + endY);
    }
    {
        var startX = r1.right;
        var startY = r1.top + r1.height / 2;
        var endX = r2.left + r2.width / 2;
        var endY = r2.bottom;
        var midX = Math.max(r1.right, r2.right) + 60;
        var midY = (startY + endY) / 2;
        addArrowPath("M " + startX + "," + startY + " C " + (startX + 80) + "," + startY + " " + midX + "," + startY + " " + midX + "," + midY + " C " + midX + "," + (endY + 80) + " " + endX + "," + (endY + 60) + " " + endX + "," + endY);
    }
    {
        var startX = r2.left;
        var startY = r2.top + r2.height / 2;
        var endX = r3.right;
        var endY = r3.top + r3.height / 2;
        var dx = Math.abs(endX - startX);
        var controlOffset = Math.min(100, dx / 2);
        addArrowPath("M " + startX + "," + startY + " C " + (startX - controlOffset) + "," + startY + " " + (endX + controlOffset) + "," + endY + " " + endX + "," + endY);
    }
    {
        var startX = r3.left;
        var startY = r3.top + r3.height / 2;
        var endX = r4.left + r4.width / 2;
        var endY = r4.top;
        var controlX1 = (startX + endX) / 2;
        addArrowPath("M " + startX + "," + startY + " C " + controlX1 + "," + startY + " " + endX + "," + startY + " " + endX + "," + endY);
    }
    {
        var startX = r4.left + r4.width / 2;
        var startY = r4.bottom;
        var endX = r5.left + r5.width / 2;
        var endY = r5.top;
        addArrowPath("M " + startX + "," + startY + " L " + endX + "," + endY);
    }
}
function injectBlinkStyleInIframe() {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.getElementById('exo13-blink-styles'))
            return;
        var style = iframeDoc.createElement('style');
        style.id = 'exo13-blink-styles';
        style.textContent = "\n            @keyframes blink-active-anim {\n                0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; }\n                50% { background-color: #FF034D; transform: scale(1.2); box-shadow: 0 0 15px #FF034D; color: white !important; }\n            }\n            .blink-active {\n                animation: blink-active-anim 1s infinite !important;\n                border-radius: 50% !important;\n            }\n        ";
        iframeDoc.head.appendChild(style);
    }
    catch (e) { }
}
function setBlinkStatus(active) {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var btn = iframeDoc.getElementById('next-step-button');
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
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var btn = iframeDoc.getElementById('next-step-button');
        if (btn) {
            btn.onclick = function (e) {
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
        steps.forEach(function (s, idx) {
            var card = document.getElementById("step-card-" + idx);
            if (card)
                card.remove();
        });
        showSynthesisOverlay();
        return;
    }
    if (currentStepIndex === 0) {
        setBlinkStatus(false);
    }
    renderAndPositionCards();
    drawFlowArrows();
}
function showSynthesisOverlay() {
    clearOverlay();
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-synthesis-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "In summary";
    var p = document.createElement('p');
    p.style.textAlign = 'left';
    p.style.whiteSpace = 'pre-line';
    p.style.fontSize = '20px';
    p.innerText = "Training is an iterative loop:\npredict \u2192 measure error \u2192 correct \u2192 update\n\nEach step slightly improves the model\nLearning emerges progressively over many iterations.\n\nYou can run the model again to observe these steps in action;\n\nWhenever you are ready click \"Next\" to proceed to the next activity.";
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "NEXT";
    nextBtn.onclick = function () {
        overlay.remove();
        var btnRealise = document.getElementById('btn-realise');
        if (btnRealise) {
            btnRealise.disabled = false;
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Test your knowledge';
            btnRealise.onclick = function () {
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
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #13: Iterative Learning Cycle";
    var p = document.createElement('p');
    p.innerText = "Observe the evolution of the decision frontier over the epochs. Pause at different times during the training (epoch 10, 100, 500) and describe what is happening visually.";
    var timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8;';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "Continue";
    nextBtn.disabled = true;
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(timerSpan);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    var timeLeft = 5;
    function updateTimer() {
        if (timeLeft > 0) {
            timerSpan.innerText = "Temps de lecture restant : " + timeLeft + "s";
            timeLeft--;
            setTimeout(updateTimer, 1000);
        }
        else {
            timerSpan.style.display = 'none';
            nextBtn.disabled = false;
        }
    }
    updateTimer();
    nextBtn.onclick = function () {
        overlay.remove();
        injectBlinkStyleInIframe();
        setBlinkStatus(true);
        bindIframeEvents();
        setTimeout(function () {
            goToNextStep();
        }, 500);
    };
}
window.onresize = function () {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
        renderAndPositionCards();
        drawFlowArrows();
    }
};
var iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', function () {
        setTimeout(function () {
            startTutorial();
        }, 1200);
    });
}
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, window.StorageService.save(13)];
                case 1:
                    success = _a.sent();
                    if (success) {
                        btnSauvegarder.innerHTML = '✅ Saved !';
                        btnSauvegarder.disabled = true;
                    }
                    return [2];
            }
        });
    });
};
