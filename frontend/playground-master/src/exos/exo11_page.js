// @ts-nocheck
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
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span>';
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
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCCA Mon Historique</a>\n          <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCC8 Mes Statistiques</a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;\">\uD83D\uDEAA D\u00E9connexion</div>\n        </div>\n      ";
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
// ——— LOGIQUE DE SAUVEGARDE ET VALIDATION ———
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!window.StorageService) return [3 /*break*/, 2];
                return [4 /*yield*/, window.StorageService.save(11)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnSauvegarder.innerHTML = '✅ Sauvegardé !';
                    btnSauvegarder.style.opacity = '0.7';
                    btnSauvegarder.disabled = true;
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
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
                    return [2 /*return*/];
                }
                if (!window.StorageService) return [3 /*break*/, 2];
                return [4 /*yield*/, window.StorageService.complete(11)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo11_quiz.html';
                    }, 800);
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
// ——— ANIMATION D'ARRIÈRE-PLAN ———
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
        element.style.opacity = String(getRandom(0.04, 0.12));
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
        element.style.opacity = '0';
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
        neuron.element.style.opacity = String(neuron.opacity = Math.max(neuron.opacity, 0.15));
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
        element.style.opacity = '0.3';
        element.style.width = length + "px";
        element.style.left = x1 + "px";
        element.style.top = y1 + "px";
        element.style.transform = "rotate(" + angle + "deg)";
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground();
animateBackground();
// Inject dynamic CSS style for arrows & custom components
var styleEl = document.createElement('style');
styleEl.textContent = "\n  @keyframes arrow-flash {\n    0%, 100% { opacity: 0; transform: translate(0, 0); }\n    50% { opacity: 1; transform: translate(-10px, 10px); }\n  }\n  .tutorial-arrow {\n    position: absolute;\n    pointer-events: none;\n    z-index: 10000;\n    width: 60px;\n    height: 60px;\n    animation: arrow-flash 0.6s ease-in-out infinite;\n  }\n  \n  .btn-choice {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n    padding: 6px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-weight: 600;\n    transition: all 0.2s ease;\n    min-width: 70px;\n    text-align: center;\n  }\n  .btn-choice:hover {\n    background: rgba(255, 255, 255, 0.15);\n  }\n  .btn-choice.active-yes {\n    background: #10b981;\n    border-color: #10b981;\n    color: white;\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);\n  }\n  .btn-choice.active-no {\n    background: #ef4444;\n    border-color: #ef4444;\n    color: white;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);\n  }\n  \n  .btn-validate {\n    display: block;\n    width: 100%;\n    margin-top: 20px;\n    background: #8b5cf6;\n    border: none;\n    color: white;\n    padding: 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .btn-validate:hover {\n    background: #7c3aed;\n    box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);\n  }\n  \n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  \n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n\n  .true-false-table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 15px;\n  }\n  .true-false-table th {\n    text-align: center;\n    padding: 8px;\n    font-size: 12px;\n    color: #94a3b8;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    border-bottom: 1px solid rgba(255,255,255,0.05);\n  }\n  .true-false-table th:first-child {\n    text-align: left;\n  }\n  .true-false-table td {\n    padding: 10px 8px;\n    font-size: 13.5px;\n    color: #f1f5f9;\n    border-bottom: 1px solid rgba(255,255,255,0.05);\n    vertical-align: middle;\n  }\n  .true-false-table td:not(:first-child) {\n    text-align: center;\n  }\n  .true-false-row-card {\n    background: rgba(255,255,255,0.02);\n    border: 1px solid rgba(255,255,255,0.05);\n    border-radius: 6px;\n    padding: 10px;\n    margin-bottom: 10px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 15px;\n  }\n  .true-false-row-card .statement-text {\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n  }\n  .true-false-row-card .button-group {\n    display: flex;\n    gap: 6px;\n  }\n";
document.head.appendChild(styleEl);
// ——— LOGIQUE DE DÉROULEMENT PÉDAGOGIQUE ———
var translations = null;
var activeArrow = null;
function loadTranslations() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, titleEl, instrEl, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('texte.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to load translation json");
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    translations = data.exercises.exercise_11;
                    if (translations) {
                        if (translations.title) {
                            document.title = translations.title;
                            titleEl = document.querySelector('.exo-title');
                            if (titleEl)
                                titleEl.innerText = translations.title;
                        }
                        if (translations.instructions && translations.instructions.general) {
                            instrEl = document.querySelector('.exo-instructions');
                            if (instrEl)
                                instrEl.innerText = translations.instructions.general;
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.warn("Could not load translations from JSON.", e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo11-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #11 : Learning Rate";
    var p = document.createElement('p');
    var text = "In this exercise, you will investigate how the learning rate controls the speed and stability of training. First, open the definition of the learning rate by clicking on the question mark (?) near the Learning Rate parameter.";
    p.innerText = text;
    var timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8;';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "Continuer";
    nextBtn.disabled = true;
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(timerSpan);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    var wordCount = text.split(/\s+/).length;
    var timeLeft = Math.max(10, Math.ceil((wordCount / 200) * 60)); // ~10s
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
        // Give 1s transition, then guide user to the definition
        setTimeout(function () {
            showFlashingArrow('.ui-learningRate .info-tip');
            listenForDefinitionClick();
        }, 1000);
    };
}
function getIframeElementRect(targetSelector) {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return null;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var el = iframeDoc.querySelector(targetSelector);
        if (!el)
            return null;
        var iframeRect = iframe.getBoundingClientRect();
        var elRect = el.getBoundingClientRect();
        return {
            top: iframeRect.top + elRect.top,
            left: iframeRect.left + elRect.left,
            bottom: iframeRect.top + elRect.bottom,
            right: iframeRect.left + elRect.right,
            width: elRect.width,
            height: elRect.height
        };
    }
    catch (e) {
        return null;
    }
}
function showFlashingArrow(targetSelector) {
    if (activeArrow)
        activeArrow.remove();
    var rect = getIframeElementRect(targetSelector);
    if (!rect)
        return;
    activeArrow = document.createElement('div');
    activeArrow.className = 'tutorial-arrow';
    activeArrow.innerHTML = "\n        <svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" style=\"filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));\">\n          <path d=\"M50,10 L10,50 M10,50 L25,50 M10,50 L10,35\" stroke=\"#FF034D\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>\n        </svg>\n    ";
    activeArrow.style.left = rect.left + rect.width / 2 + window.scrollX + "px";
    activeArrow.style.top = rect.top - 60 + window.scrollY + "px";
    document.body.appendChild(activeArrow);
}
function listenForDefinitionClick() {
    var checkClick = setInterval(function () {
        try {
            var iframe_1 = document.getElementById('iframe-playground');
            if (!iframe_1)
                return;
            var iframeDoc = iframe_1.contentDocument || iframe_1.contentWindow.document;
            var infoTip = iframeDoc.querySelector('.ui-learningRate .info-tip');
            if (infoTip && !infoTip.hasAttribute('data-listener-active')) {
                infoTip.setAttribute('data-listener-active', 'true');
                infoTip.addEventListener('click', function () {
                    if (activeArrow) {
                        activeArrow.remove();
                        activeArrow = null;
                    }
                    clearInterval(checkClick);
                    // Show definition overlay popup
                    showDefinitionPopup();
                });
            }
        }
        catch (e) { }
    }, 100);
}
function showDefinitionPopup() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'definition-popup-overlay';
    overlay.style.zIndex = '10002';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.definitions && translations.definitions.learning_rate
        ? translations.definitions.learning_rate.term
        : "The learning rate";
    var p = document.createElement('p');
    p.innerText = translations && translations.definitions && translations.definitions.learning_rate
        ? translations.definitions.learning_rate.definition
        : "The learning rate controls how much the model's parameters (weights and biases) are updated during training. A small learning rate leads to slow learning, while a large learning rate may cause the model to miss the optimal solution.";
    var okBtn = document.createElement('button');
    okBtn.className = 'tutorial-btn';
    okBtn.innerText = "OK";
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(okBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    okBtn.onclick = function () {
        overlay.remove();
        // Transition to Activity 1
        setTimeout(function () {
            renderActivity1();
        }, 800);
    };
}
// Activity 1: True or False checklist
var statementCorrectStatesAct1 = [false, false, false, false, false, false];
var questionsAct1 = [
    { id: 1, statement: "Training loss measures the error on the data used to train the model.", answer: true, feedback_true: "Correct — training loss is computed on the training dataset.", feedback_false: "Incorrect — this is exactly the definition of training loss." },
    { id: 2, statement: "Convergence always means the model has found the correct solution.", answer: false, feedback_true: "Incorrect — a model can converge to a wrong or suboptimal solution.", feedback_false: "Correct — convergence means stability, not correctness." },
    { id: 3, statement: "A model has converged when its behavior becomes stable during training.", answer: true, feedback_true: "Correct — convergence is defined by stability of learning.", feedback_false: "Incorrect — stability is the key sign of convergence." },
    { id: 4, statement: "A model diverges when its error increases or becomes unstable during training.", answer: true, feedback_true: "Correct — divergence is characterized by instability or increasing loss.", feedback_false: "Incorrect — this describes divergence." },
    { id: 5, statement: "The learning rate controls how much the model updates its weights at each step.", answer: true, feedback_true: "Correct — it defines the step size of updates.", feedback_false: "Incorrect — this is the role of the learning rate." },
    { id: 6, statement: "The learning rate and the number of epochs both control how many passes are made during training.", answer: false, feedback_true: "Incorrect — only epochs control the number of passes; learning rate controls step size.", feedback_false: "Correct — epochs define passes, learning rate defines update magnitude." }
];
function renderActivity1() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    // Use translations if loaded
    var statements = questionsAct1;
    if (translations && translations.activity_1 && translations.activity_1.statements) {
        statements = translations.activity_1.statements;
    }
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activit\u00E9 1</div>\n            <div class=\"quiz-question-card\">\n                " + (translations && translations.activity_1 && translations.activity_1.instruction ? translations.activity_1.instruction : "True or False? Check the correct statement for each of the following properties.") + "\n            </div>\n        </div>\n        <div style=\"margin-top: 15px; display: flex; flex-direction: column; gap: 8px;\">\n            " + statements.map(function (q, idx) { return "\n                <div class=\"true-false-row-card\" data-idx=\"" + idx + "\" data-question-id=\"" + q.id + "\">\n                    <span class=\"statement-text\">" + q.statement + "</span>\n                    <div class=\"button-group\">\n                        <button class=\"btn-choice btn-true\" data-val=\"true\">TRUE</button>\n                        <button class=\"btn-choice btn-false\" data-val=\"false\">FALSE</button>\n                    </div>\n                </div>\n            "; }).join('') + "\n        </div>\n    ";
    fPanel.innerHTML = '';
    var statementRows = qPanel.querySelectorAll('.true-false-row-card');
    var _loop_1 = function (i) {
        var row = statementRows[i];
        var idx = parseInt(row.getAttribute('data-idx'));
        var stmt = statements[idx];
        var trueBtn = row.querySelector('.btn-choice[data-val="true"]');
        var falseBtn = row.querySelector('.btn-choice[data-val="false"]');
        var handleAnswer = function (userChoice) {
            var isCorrect = userChoice === stmt.answer;
            if (isCorrect) {
                // Lock selection
                statementCorrectStatesAct1[idx] = true;
                row.classList.add('correct-locked');
                trueBtn.disabled = true;
                falseBtn.disabled = true;
                if (userChoice) {
                    trueBtn.classList.add('active-yes');
                    falseBtn.classList.remove('active-no');
                }
                else {
                    falseBtn.classList.add('active-no');
                    trueBtn.classList.remove('active-yes');
                }
                var feedbackText = userChoice ? stmt.feedback_true : stmt.feedback_false;
                fPanel.innerHTML = "<div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">" + feedbackText + "</div>";
                // Check if all are correct
                var allDone = statementCorrectStatesAct1.every(function (s) { return s; });
                if (allDone) {
                    // Success! Enable validation in outer footer
                    btnRealise.removeAttribute('disabled');
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
                    // Show final message
                    fPanel.innerHTML += "\n                        <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                            \u2728 Exercice R\u00E9ussi !! Cliquez sur le bouton \"Faire le quiz\" en bas \u00E0 droite pour continuer.\n                        </div>\n                    ";
                }
            }
            else {
                // Visual feedback of error
                if (userChoice) {
                    trueBtn.classList.add('active-no');
                    setTimeout(function () {
                        trueBtn.classList.remove('active-no');
                    }, 500);
                }
                else {
                    falseBtn.classList.add('active-no');
                    setTimeout(function () {
                        falseBtn.classList.remove('active-no');
                    }, 500);
                }
                var feedbackText = userChoice ? stmt.feedback_true : stmt.feedback_false;
                fPanel.innerHTML = "<div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">" + feedbackText + "</div>";
            }
        };
        trueBtn.onclick = function () { return handleAnswer(true); };
        falseBtn.onclick = function () { return handleAnswer(false); };
    };
    for (var i = 0; i < statementRows.length; i++) {
        _loop_1(i);
    }
}
// Reposition arrow if frame scrolls or window resizes
window.addEventListener('resize', function () {
    if (activeArrow) {
        showFlashingArrow('.ui-learningRate .info-tip');
    }
});
window.addEventListener('scroll', function () {
    if (activeArrow) {
        showFlashingArrow('.ui-learningRate .info-tip');
    }
});
// Load translations and trigger overlay when iframe is loaded
var iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
            // Pulse the home button if completed
            var backBtn = document.querySelector('.universal-header .btn-header');
            if (backBtn) {
                backBtn.style.animation = 'pulse-button 1.5s infinite';
                var style = document.createElement('style');
                style.textContent = "\n                    @keyframes pulse-button {\n                        0%, 100% { transform: scale(1); box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); }\n                        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); border-color: #8b5cf6; }\n                    }\n                ";
                document.head.appendChild(style);
            }
            var qPanel = document.getElementById('quiz-question-panel');
            if (qPanel) {
                qPanel.innerHTML = "\n                    <div class=\"quiz-question-wrapper\">\n                        <div class=\"quiz-question-badge\">Exercice R\u00E9ussi</div>\n                        <div class=\"quiz-question-card\">\n                            Vous avez d\u00E9j\u00E0 valid\u00E9 cet exercice ! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.\n                        </div>\n                    </div>\n                ";
            }
            return;
        }
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var iframeDoc, infoTip_1, style;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Pulse info-tip inside iframe to call user attention
                        try {
                            iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                            infoTip_1 = iframeDoc.querySelector('.ui-learningRate .info-tip');
                            if (infoTip_1) {
                                infoTip_1.classList.add('info-tip-pulse');
                                style = iframeDoc.createElement('style');
                                style.textContent = "\n                        @keyframes info-pulse {\n                            0%, 100% { transform: scale(1); box-shadow: 0 0 2px rgba(139, 92, 246, 0.4); }\n                            50% { transform: scale(1.2); box-shadow: 0 0 8px rgba(139, 92, 246, 0.8); background: #8b5cf6; color: white; }\n                        }\n                        .info-tip-pulse {\n                            animation: info-pulse 1.2s infinite !important;\n                            border-radius: 50%;\n                            display: inline-block;\n                        }\n                    ";
                                iframeDoc.head.appendChild(style);
                                infoTip_1.addEventListener('click', function () {
                                    infoTip_1.classList.remove('info-tip-pulse');
                                });
                            }
                        }
                        catch (e) { }
                        return [4 /*yield*/, loadTranslations()];
                    case 1:
                        _a.sent();
                        startTutorial();
                        return [2 /*return*/];
                }
            });
        }); }, 1200);
    });
}
