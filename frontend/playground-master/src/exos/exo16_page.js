var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        var visitorBtn = document.createElement('a');
        visitorBtn.href = 'Page-demo/register.html';
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
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCCA Mon Historique</a>\n          <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCC8 Mes Statistiques</a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;\">\uD83D\uDEAA Logout</div>\n        </div>\n      ";
    var isOpen = false;
    avatar.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block';
            setTimeout(function () { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        }
        else {
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.9) translateY(-10px)';
            setTimeout(function () { return menu.style.display = 'none'; }, 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = function () { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    container.appendChild(avatar);
    container.appendChild(menu);
})();
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!window.StorageService) return [3, 2];
                return [4, window.StorageService.save(16)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnSauvegarder.innerHTML = '✅ Sauvegardé !';
                    btnSauvegarder.style.opacity = '0.7';
                    btnSauvegarder.disabled = true;
                }
                _a.label = 2;
            case 2: return [2];
        }
    });
}); };
btnRealise.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var isLoggedIn, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (!isLoggedIn) {
                    window.location.href = 'Page-demo/register.html';
                    return [2];
                }
                if (!window.StorageService) return [3, 2];
                return [4, window.StorageService.complete(16)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () { window.location.href = 'exoquiz/exo16_quiz.html'; }, 800);
                }
                _a.label = 2;
            case 2: return [2];
        }
    });
}); };
var backgroundContainer = document.getElementById('background-container');
var formulas = ['\\sqrt{x}', '\\int', 'f(x) = ax^2', '\\frac{dy}{dx}', '\\sin(t)', 'e^{-t}'];
var numFormulas = 25;
var numNeurons = 30;
var numConnections = 50;
var neurons = [];
var connections = [];
var formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass) {
    var element = document.createElement('div');
    element.className = elementClass;
    element.style.position = 'absolute';
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
function createConnection(n1, n2) {
    var conn = document.createElement('div');
    conn.className = 'connection';
    conn.style.position = 'absolute';
    conn.style.height = '1.5px';
    conn.style.background = "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))";
    conn.style.filter = 'blur(4px)';
    connections.push({ element: conn, neuron1: n1, neuron2: n2, opacity: 0 });
    backgroundContainer.appendChild(conn);
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
styleEl.textContent = "\n  .def-box {\n    background: rgba(30, 41, 59, 0.7);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-left: 4px solid #004676;\n    border-radius: 8px;\n    padding: 12px 15px;\n    margin-bottom: 12px;\n    opacity: 0;\n    transform: translateY(10px);\n    transition: all 0.5s ease;\n    text-align: left;\n  }\n  .def-box.show {\n    opacity: 1; transform: translateY(0);\n  }\n  .def-box h4 {\n    margin: 0 0 5px 0; color: #8b5cf6; font-size: 13px; font-weight: 700;\n  }\n  .def-box p {\n    margin: 0; font-size: 12px; color: #cbd5e1; line-height: 1.4;\n  }\n  .def-box.color-1 { border-left-color: #004676; }\n  .def-box.color-2 { border-left-color: #FF034D; }\n  .def-box.color-3 { border-left-color: #10b981; }\n  .def-box.color-4 { border-left-color: #f59e0b; }\n\n  .formula-images {\n    display: flex; gap: 15px; justify-content: center; margin-top: 10px;\n  }\n  .formula-img-container {\n    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);\n    border-radius: 6px; padding: 5px; text-align: center; width: 100px;\n  }\n  .formula-img-container img {\n    max-width: 100%; height: auto; border-radius: 4px;\n  }\n  .formula-img-container span {\n    display: block; font-size: 9px; margin-top: 4px; color: #94a3b8;\n  }\n\n  /* Clignotement NEXT */\n  @keyframes btn-blink {\n    0%, 100% { transform: scale(1); box-shadow: 0 0 5px #8b5cf6; }\n    50% { transform: scale(1.05); box-shadow: 0 0 20px #8b5cf6; }\n  }\n  .blink-next {\n    animation: btn-blink 1.2s infinite;\n  }\n\n  /* Table Style */\n  .comparison-table {\n    width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; color: #e2e8f0;\n  }\n  .comparison-table th, .comparison-table td {\n    border: 1px solid rgba(255,255,255,0.1); padding: 5px; text-align: center;\n  }\n  .comparison-table th {\n    background: rgba(15, 23, 42, 0.6); font-weight: 700; font-size: 10.5px;\n  }\n  .comparison-table td.criteria-col {\n    background: rgba(255, 255, 255, 0.02); font-weight: 600; text-align: left; width: 22%;\n  }\n  .drop-zone-cell {\n    background: rgba(255, 255, 255, 0.01); min-height: 40px; transition: all 0.2s;\n    cursor: pointer; position: relative; width: 39%; vertical-align: middle;\n  }\n  .drop-zone-cell.dragover {\n    background: rgba(139, 92, 246, 0.15) !important; border: 1.5px dashed #8b5cf6 !important;\n  }\n  .drop-zone-cell.correct-drop {\n    background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);\n  }\n  \n  .observation-card {\n    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12);\n    border-radius: 6px; padding: 6px 8px; font-size: 10.5px; color: #e2e8f0;\n    cursor: grab; user-select: none; transition: all 0.2s; display: inline-block;\n    margin: 3px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); line-height: 1.35;\n    vertical-align: middle;\n  }\n  .observation-card:hover {\n    background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.22);\n    transform: translateY(-1px);\n  }\n  .observation-card:active { cursor: grabbing; }\n  .observation-card.dragging { opacity: 0.3; }\n  .observation-card.selected {\n    border: 2px solid #8b5cf6 !important; background: rgba(139, 92, 246, 0.15) !important;\n    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);\n  }\n\n  .pill-matched {\n    background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4);\n    color: #10b981; border-radius: 4px; padding: 4px 6px; font-size: 10.5px;\n    line-height: 1.3; animation: scaleIn 0.3s ease; text-align: center;\n  }\n\n  @keyframes scaleIn {\n    from { transform: scale(0.95); opacity: 0; }\n    to { transform: scale(1); opacity: 1; }\n  }\n  @keyframes shake {\n    0%, 100% { transform: translateX(0); }\n    20%, 60% { transform: translateX(-5px); }\n    40%, 80% { transform: translateX(5px); }\n  }\n  .shake-error {\n    animation: shake 0.4s ease-in-out;\n    border-color: #ef4444 !important;\n    background: rgba(239, 68, 68, 0.15) !important;\n  }\n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05); border-left: 4px solid #8b5cf6;\n    padding: 10px 12px; border-radius: 4px; font-size: 12.5px; color: #e2e8f0;\n    line-height: 1.4; margin-top: 10px; animation: fadeIn 0.3s ease;\n  }\n  @keyframes fadeIn {\n    from { opacity: 0; } to { opacity: 1; }\n  }\n";
document.head.appendChild(styleEl);
var draggedCardId = null;
var selectedCardId = null;
window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('completed') === 'true') {
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
        var qPanel = document.getElementById('quiz-question-panel');
        if (qPanel) {
            qPanel.innerHTML = "\n                <div class=\"quiz-question-wrapper\">\n                    <div class=\"quiz-question-badge\">Exercise Successful</div>\n                    <div class=\"quiz-question-card\">\n                        You have already validated this exercise ! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.\n                    </div>\n                </div>\n            ";
        }
        return;
    }
    setTimeout(function () {
        startTutorial();
    }, 1000);
});
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo16-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #16 : Gradient Killing & Sigmoid vs ReLU";
    var p = document.createElement('p');
    p.innerText = "Dans cet exercice, nous allons comparer le comportement de deux fonctions d'activation : la Sigmoid et la ReLU dans un réseau de neurones profond (6 couches cachées, LR = 10, Dataset Spiral). Tout d'abord, examinons de près la définition d'un gradient dans un réseau de neurones.";
    var timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #cbd5e1;';
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
    var timeLeft = 2;
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
        renderActivity1();
    };
}
function renderActivity1() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\" style=\"margin-bottom:15px;\">\n            <div class=\"quiz-question-badge\" style=\"background:#004676;\">Activity 1</div>\n            <div class=\"quiz-question-card\" style=\"font-size: 13px; line-height: 1.4;\">\n                <strong>Comprendre le Gradient</strong> - Prenez le temps de lire les explications ci-dessous. Les notions s'affichent s\u00E9quentiellement pour vous guider.\n            </div>\n        </div>\n        <div id=\"def-boxes-container\">\n            <div class=\"def-box color-1\" id=\"def-box-1\">\n                <h4>1. Definition</h4>\n                <p>A gradient is the signal used to update the model during learning.</p>\n            </div>\n            <div class=\"def-box color-2\" id=\"def-box-2\">\n                <h4>2. How it works</h4>\n                <p>At each training step:<br>\n                \u2022 The model makes a prediction<br>\n                \u2022 The error (loss) is computed<br>\n                \u2022 The gradient tells how to change each weight to <span style=\"color:#FF034D; font-weight:700;\">reduce this error</span></p>\n            </div>\n            <div class=\"def-box color-3\" id=\"def-box-3\">\n                <h4>3. Key idea</h4>\n                <p>The gradient improves parameters with both:<br>\n                \u2022 <b>Direction</b> \u2192 where to go<br>\n                \u2022 <b>Magnitude</b> \u2192 how big the change should be<br>\n                \u2192 Large gradient  \u2192 big update<br>\n                \u2192 Small gradient  \u2192 tiny update</p>\n            </div>\n            <div class=\"def-box color-4\" id=\"def-box-4\">\n                <h4>4. Simple Formula</h4>\n                <p>Les param\u00E8tres (poids) sont mis \u00E0 jour en combinant le gradient et le taux d'apprentissage (learning rate) \u00E0 chaque \u00E9poque (epoch) :</p>\n                <div class=\"formula-images\">\n                    <div class=\"formula-img-container\">\n                        <img src=\"assets/images/epoch.jpg.png\" alt=\"Epoch\">\n                        <span>Epoch</span>\n                    </div>\n                    <div class=\"formula-img-container\">\n                        <img src=\"assets/images/learning_rate.jpg.png\" alt=\"Learning Rate\">\n                        <span>Learning Rate</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div style=\"text-align: right; margin-top: 15px;\">\n            <button class=\"tutorial-btn\" id=\"btn-next-act1\" style=\"font-size:16px; padding: 8px 18px;\" disabled>NEXT</button>\n        </div>\n    ";
    fPanel.innerHTML = "\n        <div class=\"feedback-box\">\n            \uD83D\uDCD6 Lisez attentivement la d\u00E9finition du gradient et de sa mise \u00E0 jour.\n        </div>\n    ";
    var showBox = function (id, delay, nextCallback) {
        setTimeout(function () {
            var el = document.getElementById(id);
            if (el)
                el.classList.add('show');
            if (nextCallback)
                nextCallback();
        }, delay);
    };
    showBox('def-box-1', 100, function () {
        showBox('def-box-2', 4000, function () {
            showBox('def-box-3', 9000, function () {
                showBox('def-box-4', 15000, function () {
                    setTimeout(function () {
                        var btn = document.getElementById('btn-next-act1');
                        if (btn) {
                            btn.removeAttribute('disabled');
                            btn.classList.add('blink-next');
                        }
                        fPanel.innerHTML = "\n                            <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                                \u2705 Reading completed! Click <strong>NEXT</strong> to start the models.\n                            </div>\n                        ";
                    }, 4000);
                });
            });
        });
    });
    document.getElementById('btn-next-act1').onclick = function () {
        renderActivity2();
    };
}
var simulationCheckInterval = null;
function renderActivity2() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\" style=\"margin-bottom:15px;\">\n            <div class=\"quiz-question-badge\" style=\"background:#FF034D;\">Activity 2</div>\n            <div class=\"quiz-question-card\" style=\"font-size: 13px; line-height: 1.45;\">\n                <strong>Starting the simulators</strong><br><br>\n                Lancez both models en parall\u00E8le dans le playground \u00E0 gauche en cliquant sur le bouton <b>Play</b> (\u25B6\uFE0F) de chaque simulateur.<br><br>\n                <span style=\"color:#FF034D; font-weight:700;\">Instruction :</span> Carefully observe the evolution of the weights (connection lines) and neurons in the initial layers (the first layers on the left).<br><br>\n                Let the simulations run until the counter reaches at least <b>150 epochs</b>.\n            </div>\n        </div>\n        <div style=\"background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 8px; font-size:12px;\">\n            <div style=\"display:flex; justify-content:space-between; margin-bottom:8px;\">\n                <span>Sigmoid Model :</span>\n                <strong id=\"status-sigmoid\" style=\"color:#ef4444;\">Stopped (0 epochs)</strong>\n            </div>\n            <div style=\"display:flex; justify-content:space-between;\">\n                <span>ReLU Model :</span>\n                <strong id=\"status-relu\" style=\"color:#ef4444;\">Stopped (0 epochs)</strong>\n            </div>\n        </div>\n        <div style=\"text-align: right; margin-top: 15px;\">\n            <button class=\"tutorial-btn\" id=\"btn-next-act2\" style=\"font-size:16px; padding: 8px 18px;\" disabled>Next</button>\n        </div>\n    ";
    fPanel.innerHTML = "\n        <div class=\"feedback-box\" style=\"border-left-color: #FF034D;\">\n            \uD83D\uDCA1 Cliquez sur le bouton Play (\u25B6\uFE0F) rouge clignotant dans chaque simulateur \u00E0 gauche.\n        </div>\n    ";
    var injectPlayFlash = function (iframeId) {
        try {
            var iframe_1 = document.getElementById(iframeId);
            if (!iframe_1)
                return;
            var doc = iframe_1.contentDocument || iframe_1.contentWindow.document;
            if (!doc)
                return;
            if (!doc.getElementById('exo16-iframe-styles')) {
                var style = doc.createElement('style');
                style.id = 'exo16-iframe-styles';
                style.textContent = "\n                    @keyframes play-btn-flash {\n                        0%, 100% { transform: scale(1); box-shadow: 0 0 5px #FF034D; background: transparent; }\n                        50% { transform: scale(1.2); box-shadow: 0 0 20px #FF034D; background: #FF034D; color: white !important; }\n                    }\n                    .play-btn-flash {\n                        animation: play-btn-flash 1s infinite !important;\n                        border-radius: 50% !important;\n                    }\n                ";
                doc.head.appendChild(style);
            }
            var playBtn = doc.getElementById('play-pause-button');
            if (playBtn) {
                playBtn.classList.add('play-btn-flash');
            }
        }
        catch (e) {
            console.warn("Could not inject flash to iframe", e);
        }
    };
    injectPlayFlash('iframe-sigmoid');
    injectPlayFlash('iframe-relu');
    if (simulationCheckInterval)
        clearInterval(simulationCheckInterval);
    var sigmoidEpoch = 0;
    var reluEpoch = 0;
    var sigmoidPlaying = false;
    var reluPlaying = false;
    simulationCheckInterval = setInterval(function () {
        try {
            var iframeSigmoid = document.getElementById('iframe-sigmoid');
            var iframeRelu = document.getElementById('iframe-relu');
            if (iframeSigmoid && iframeSigmoid.contentWindow) {
                var docSig = iframeSigmoid.contentDocument || iframeSigmoid.contentWindow.document;
                var iterSig = docSig.getElementById('iter-number');
                if (iterSig) {
                    sigmoidEpoch = parseInt(iterSig.innerText.replace(/,/g, '')) || 0;
                }
                var playBtn = docSig.getElementById('play-pause-button');
                sigmoidPlaying = playBtn && playBtn.classList.contains('playing') || false;
                if (sigmoidPlaying && playBtn) {
                    playBtn.classList.remove('play-btn-flash');
                }
            }
            if (iframeRelu && iframeRelu.contentWindow) {
                var docRelu = iframeRelu.contentDocument || iframeRelu.contentWindow.document;
                var iterRelu = docRelu.getElementById('iter-number');
                if (iterRelu) {
                    reluEpoch = parseInt(iterRelu.innerText.replace(/,/g, '')) || 0;
                }
                var playBtn = docRelu.getElementById('play-pause-button');
                reluPlaying = playBtn && playBtn.classList.contains('playing') || false;
                if (reluPlaying && playBtn) {
                    playBtn.classList.remove('play-btn-flash');
                }
            }
            var statusSig = document.getElementById('status-sigmoid');
            if (statusSig) {
                if (sigmoidEpoch >= 150) {
                    statusSig.innerText = "Pr\u00EAt (" + sigmoidEpoch + " epochs)";
                    statusSig.style.color = '#10b981';
                }
                else if (sigmoidPlaying) {
                    statusSig.innerText = "En cours (" + sigmoidEpoch + " epochs)";
                    statusSig.style.color = '#3b82f6';
                }
                else {
                    statusSig.innerText = "Stopped (" + sigmoidEpoch + " epochs)";
                    statusSig.style.color = '#ef4444';
                }
            }
            var statusRelu = document.getElementById('status-relu');
            if (statusRelu) {
                if (reluEpoch >= 150) {
                    statusRelu.innerText = "Pr\u00EAt (" + reluEpoch + " epochs)";
                    statusRelu.style.color = '#10b981';
                }
                else if (reluPlaying) {
                    statusRelu.innerText = "En cours (" + reluEpoch + " epochs)";
                    statusRelu.style.color = '#3b82f6';
                }
                else {
                    statusRelu.innerText = "Stopped (" + reluEpoch + " epochs)";
                    statusRelu.style.color = '#ef4444';
                }
            }
            if (sigmoidEpoch >= 150 && reluEpoch >= 150) {
                clearInterval(simulationCheckInterval);
                simulationCheckInterval = null;
                var btnNext = document.getElementById('btn-next-act2');
                if (btnNext) {
                    btnNext.removeAttribute('disabled');
                    btnNext.classList.add('blink-next');
                }
                fPanel.innerHTML = "\n                    <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                        \u2705 Les deux mod\u00E8les ont d\u00E9pass\u00E9 150 \u00E9poques. Cliquez sur <strong>Next</strong> pour classifier vos observations !\n                    </div>\n                ";
            }
        }
        catch (e) {
            console.error("Checking error", e);
        }
    }, 1000);
    document.getElementById('btn-next-act2').onclick = function () {
        if (simulationCheckInterval) {
            clearInterval(simulationCheckInterval);
            simulationCheckInterval = null;
        }
        renderActivity3();
    };
}
var observationsData = {
    dropZones: [
        { id: "sig-weight", model: "sigmoid", type: "weight", correctVal: "vsu", text: "Very small updates in early layers" },
        { id: "sig-learning", model: "sigmoid", type: "learning", correctVal: "sba", text: "Slow, blocked, or absent" },
        { id: "sig-neuron", model: "sigmoid", type: "neuron", correctVal: "enf", text: "Early neurons fail to learn useful features" },
        { id: "sig-layer", model: "sigmoid", type: "layer", correctVal: "eia", text: "Early layers are \"inactive\" (no learning signal)" },
        { id: "sig-suitability", model: "sigmoid", type: "suitability", correctVal: "pc", text: "Poor choice" },
        { id: "relu-weight", model: "relu", type: "weight", correctVal: "eua", text: "Effective updates across all layers" },
        { id: "relu-learning", model: "relu", type: "learning", correctVal: "cont", text: "Continuous" },
        { id: "relu-neuron", model: "relu", type: "neuron", correctVal: "lmh", text: "Neurons learn meaningful hierarchical representations" },
        { id: "relu-layer", model: "relu", type: "layer", correctVal: "alc", text: "All layers contribute to learning" },
        { id: "relu-suitability", model: "relu", type: "suitability", correctVal: "pfc", text: "Preferred choice" }
    ],
    cards: [
        { id: "vsu", text: "Very small updates in early layers", correctZone: "sig-weight" },
        { id: "sba", text: "Slow, blocked, or absent", correctZone: "sig-learning" },
        { id: "enf", text: "Early neurons fail to learn useful features", correctZone: "sig-neuron" },
        { id: "eia", text: "Early layers are \"inactive\" (no learning signal)", correctZone: "sig-layer" },
        { id: "pc", text: "Poor choice", correctZone: "sig-suitability" },
        { id: "eua", text: "Effective updates across all layers", correctZone: "relu-weight" },
        { id: "cont", text: "Continuous", correctZone: "relu-learning" },
        { id: "lmh", text: "Neurons learn meaningful hierarchical representations", correctZone: "relu-neuron" },
        { id: "alc", text: "All layers contribute to learning", correctZone: "relu-layer" },
        { id: "pfc", text: "Preferred choice", correctZone: "relu-suitability" }
    ]
};
var correctDropsCount = 0;
function renderActivity3() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\" style=\"margin-bottom:10px;\">\n            <div class=\"quiz-question-badge\" style=\"background:#10b981;\">Activity 3</div>\n            <div class=\"quiz-question-card\" style=\"font-size: 12px; line-height: 1.4;\">\n                <strong>Tableau Comparatif</strong> - Associez chaque observation \u00E0 la fonction d'activation correspondante (Sigmoid ou ReLU). <br>\n                <i>Glissez une carte ou cliquez dessus puis cliquez sur la case correspondante dans le tableau.</i>\n            </div>\n        </div>\n        \n        <table class=\"comparison-table\">\n            <thead>\n                <tr>\n                    <th>Observation</th>\n                    <th>Sigmoid<br><img src=\"assets/images/or.jpg.png\" style=\"height:15px; vertical-align:middle; border-radius:2px;\"></th>\n                    <th>ReLU<br><img src=\"assets/images/output.jpg.png\" style=\"height:15px; vertical-align:middle; border-radius:2px;\"></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td class=\"criteria-col\">Weight updates</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-sig-weight\" data-zone=\"sig-weight\">Drop zone</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-relu-weight\" data-zone=\"relu-weight\">Drop zone</td>\n                </tr>\n                <tr>\n                    <td class=\"criteria-col\">Learning progression</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-sig-learning\" data-zone=\"sig-learning\">Drop zone</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-relu-learning\" data-zone=\"relu-learning\">Drop zone</td>\n                </tr>\n                <tr>\n                    <td class=\"criteria-col\">Neuron features</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-sig-neuron\" data-zone=\"sig-neuron\">Drop zone</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-relu-neuron\" data-zone=\"relu-neuron\">Drop zone</td>\n                </tr>\n                <tr>\n                    <td class=\"criteria-col\">Layer behavior</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-sig-layer\" data-zone=\"sig-layer\">Drop zone</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-relu-layer\" data-zone=\"relu-layer\">Drop zone</td>\n                </tr>\n                <tr>\n                    <td class=\"criteria-col\">Suitability</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-sig-suitability\" data-zone=\"sig-suitability\">Drop zone</td>\n                    <td class=\"drop-zone-cell\" id=\"zone-relu-suitability\" data-zone=\"relu-suitability\">Drop zone</td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div style=\"margin-top: 10px;\">\n            <h4 style=\"font-size:10px; text-transform:uppercase; color:#94a3b8; margin:0 0 5px 0; letter-spacing:0.5px;\">Cartes d'observations</h4>\n            <div id=\"observation-cards-container\" style=\"min-height: 80px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:6px; padding:6px;\"></div>\n        </div>\n    ";
    fPanel.innerHTML = "\n        <div class=\"feedback-box\">\n            \uD83D\uDCA1 Associez les cartes aux bonnes cases du tableau en comparant both models.\n        </div>\n    ";
    var cardsContainer = document.getElementById('observation-cards-container');
    var shuffledCards = observationsData.cards.slice().sort(function () { return Math.random() - 0.5; });
    shuffledCards.forEach(function (c) {
        var card = document.createElement('div');
        card.className = 'observation-card';
        card.id = "card-" + c.id;
        card.innerText = c.text;
        card.draggable = true;
        card.ondragstart = function (e) {
            draggedCardId = c.id;
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', c.id);
        };
        card.ondragend = function () {
            card.classList.remove('dragging');
        };
        card.onclick = function (e) {
            e.stopPropagation();
            if (selectedCardId === c.id) {
                selectedCardId = null;
                card.classList.remove('selected');
            }
            else {
                Array.prototype.forEach.call(cardsContainer.querySelectorAll('.observation-card'), function (el) { return el.classList.remove('selected'); });
                selectedCardId = c.id;
                card.classList.add('selected');
            }
        };
        cardsContainer.appendChild(card);
    });
    var dropZones = qPanel.querySelectorAll('.drop-zone-cell');
    dropZones.forEach(function (zone) {
        var zoneId = zone.getAttribute('data-zone');
        zone.ondragover = function (e) {
            e.preventDefault();
            zone.classList.add('dragover');
        };
        zone.ondragleave = function () {
            zone.classList.remove('dragover');
        };
        zone.ondrop = function (e) {
            e.preventDefault();
            zone.classList.remove('dragover');
            var cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
            handleDrop(cardId, zoneId);
        };
        zone.onclick = function () {
            if (selectedCardId) {
                handleDrop(selectedCardId, zoneId);
            }
        };
    });
}
function handleDrop(cardId, zoneId) {
    if (!cardId || !zoneId)
        return;
    var cardData = observationsData.cards.find(function (c) { return c.id === cardId; });
    var zoneData = observationsData.dropZones.find(function (z) { return z.id === zoneId; });
    if (!cardData || !zoneData)
        return;
    var cardEl = document.getElementById("card-" + cardId);
    var zoneEl = document.getElementById("zone-" + zoneId);
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!cardEl || !zoneEl)
        return;
    if (cardData.correctZone === zoneId) {
        correctDropsCount++;
        zoneEl.innerHTML = "<div class=\"pill-matched\">" + cardData.text + "</div>";
        zoneEl.className = "drop-zone-cell correct-drop";
        zoneEl.onclick = null;
        zoneEl.ondragover = null;
        cardEl.remove();
        selectedCardId = null;
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color:#10b981; background: rgba(16, 185, 129, 0.1);\">\n                \u2705 Correct ! L'observation correspond parfaitement \u00E0 cette case.\n            </div>\n        ";
        if (correctDropsCount === 10) {
            triggerCompletion();
        }
    }
    else {
        cardEl.classList.add('shake-error');
        setTimeout(function () { return cardEl.classList.remove('shake-error'); }, 450);
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color:#ef4444; background: rgba(239, 68, 68, 0.1);\">\n                \u274C Incorrect. Cette observation ne correspond pas \u00E0 cette case du tableau. R\u00E9essayez !\n            </div>\n        ";
    }
}
function triggerCompletion() {
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (fPanel) {
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                \uD83C\uDF89 Excellent! Vous avez class\u00E9 toutes les observations avec succ\u00E8s.\n            </div>\n        ";
    }
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'completion-overlay';
    overlay.style.zIndex = '10006';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "💡 Observations Validées !";
    var p = document.createElement('p');
    p.innerText = "Excellent! Let’s now examine the conclusions that can be drawn from these observations about gradients.";
    var okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "Take the quiz";
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    okBtn.onclick = function () {
        overlay.remove();
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
        var qPanel = document.getElementById('quiz-question-panel');
        if (qPanel) {
            qPanel.innerHTML = "\n                <div class=\"quiz-question-wrapper\">\n                    <div class=\"quiz-question-badge\">Congratulations</div>\n                    <div class=\"quiz-question-card\">\n                        Vous avez termin\u00E9 les observations. Cliquez sur le bouton \"Take the quiz\" en bas \u00E0 droite pour valider vos conclusions.\n                    </div>\n                </div>\n            ";
        }
    };
}
