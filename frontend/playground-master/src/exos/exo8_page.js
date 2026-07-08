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
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 200px rgba(16, 185, 129, 0.4); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
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
    var logoutBtn = menu.querySelector('#btnFuturLogout');
    if (logoutBtn) {
        logoutBtn.onclick = function () { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    }
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
                return [4, window.StorageService.save(8)];
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
                return [4, window.StorageService.complete(8)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo8_quiz.html';
                    }, 800);
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
styleEl.textContent = "\n  @keyframes arrow-flash {\n    0%, 100% { opacity: 0; transform: translate(0, 0); }\n    50% { opacity: 1; transform: translate(-10px, 10px); }\n  }\n  .tutorial-arrow {\n    position: absolute;\n    pointer-events: none;\n    z-index: 10000;\n    width: 60px;\n    height: 60px;\n    animation: arrow-flash 0.6s ease-in-out infinite;\n  }\n  \n  .btn-choice {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n    padding: 6px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-weight: 600;\n    transition: all 0.2s ease;\n    min-width: 60px;\n  }\n  .btn-choice:hover {\n    background: rgba(255, 255, 255, 0.15);\n  }\n  .btn-choice.active-yes {\n    background: #10b981;\n    border-color: #10b981;\n    color: white;\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);\n  }\n  .btn-choice.active-no {\n    background: #ef4444;\n    border-color: #ef4444;\n    color: white;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);\n  }\n  \n  .btn-validate {\n    display: block;\n    width: 100%;\n    margin-top: 20px;\n    background: #8b5cf6;\n    border: none;\n    color: white;\n    padding: 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .btn-validate:hover {\n    background: #7c3aed;\n    box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);\n  }\n  \n\n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  \n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n";
document.head.appendChild(styleEl);
var translations = null;
var activeArrows = [];
function loadTranslations() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, titleEl, instrEl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch('texte.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to load translation json");
                    return [4, response.json()];
                case 2:
                    data = _a.sent();
                    translations = data.exercises.exercise_8;
                    if (translations) {
                        if (translations.title) {
                            document.title = translations.title;
                            titleEl = document.querySelector('.exo-title');
                            if (titleEl)
                                titleEl.innerText = translations.title;
                        }
                        if (translations.instructions && translations.instructions.general) {
                            instrEl = document.querySelector('.exo-instructions');
                            if (instrEl) {
                                instrEl.innerText = translations.instructions.general;
                            }
                        }
                    }
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.warn("Could not load translations from JSON.", error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo8-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #7 Instability";
    var p = document.createElement('p');
    var text = translations && translations.instructions && translations.instructions.general
        ? translations.instructions.general
        : "Run the two models below (same dataset and settings) and identify what explains the differences between their results.";
    p.innerText = text;
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
    var wordCount = text.split(/\s+/).length;
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
        setTimeout(function () {
            showFlashingArrows();
            renderActivity0();
        }, 1000);
    };
}
function getIframeElementRect(iframeId, targetSelector) {
    var iframe = document.getElementById(iframeId);
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
function showFlashingArrows() {
    activeArrows.forEach(function (a) { return a.remove(); });
    activeArrows = [];
    ['iframe-model1', 'iframe-model2'].forEach(function (iframeId) {
        var rect = getIframeElementRect(iframeId, '#play-pause-button');
        if (!rect)
            return;
        var arrow = document.createElement('div');
        arrow.className = 'tutorial-arrow';
        arrow.innerHTML = "\n            <svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" style=\"filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));\">\n              <path d=\"M50,10 L10,50 M10,50 L25,50 M10,50 L10,35\" stroke=\"#FF034D\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>\n            </svg>\n        ";
        arrow.style.position = 'absolute';
        arrow.style.pointerEvents = 'none';
        arrow.style.zIndex = '10000';
        arrow.style.animation = 'arrow-flash 0.6s ease-in-out infinite';
        arrow.style.left = rect.left + rect.width / 2 + window.scrollX + "px";
        arrow.style.top = rect.top - 60 + window.scrollY + "px";
        document.body.appendChild(arrow);
        activeArrows.push(arrow);
    });
    var dismissArrows = function () {
        activeArrows.forEach(function (a) { return a.remove(); });
        activeArrows = [];
        document.removeEventListener('click', dismissArrows);
        ['iframe-model1', 'iframe-model2'].forEach(function (iframeId) {
            try {
                var iframe_1 = document.getElementById(iframeId);
                if (iframe_1 && iframe_1.contentWindow) {
                    iframe_1.contentWindow.document.removeEventListener('click', dismissArrows);
                }
            }
            catch (e) { }
        });
    };
    setTimeout(function () {
        document.addEventListener('click', dismissArrows);
        ['iframe-model1', 'iframe-model2'].forEach(function (iframeId) {
            try {
                var iframe_2 = document.getElementById(iframeId);
                if (iframe_2 && iframe_2.contentWindow) {
                    iframe_2.contentWindow.document.addEventListener('click', dismissArrows);
                }
            }
            catch (e) { }
        });
    }, 100);
}
function renderActivity0() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\">\n                Lancez both models en cliquant sur le bouton de lecture (play) de chacun d'eux, et attendez que les pertes d'entra\u00EEnement (loss) diminuent sous 0.01.\n            </div>\n        </div>\n        <div style=\"margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);\">\n            <div style=\"display:flex; justify-content:space-between; margin-bottom:10px; font-size:13.5px;\">\n                <span>Mod\u00E8le 1 (Graine A) :</span>\n                <span id=\"model1-status-text\" style=\"font-weight:700; color:#ef4444;\">Non lanc\u00E9 \u23F3</span>\n            </div>\n            <div style=\"display:flex; justify-content:space-between; font-size:13.5px;\">\n                <span>Mod\u00E8le 2 (Graine B) :</span>\n                <span id=\"model2-status-text\" style=\"font-weight:700; color:#ef4444;\">Non lanc\u00E9 \u23F3</span>\n            </div>\n        </div>\n    ";
    fPanel.innerHTML = '';
}
var q1Answers = {
    weights: false,
    features: false,
    stops: false,
    boundaries: false
};
function renderActivity1() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    fPanel.innerHTML = '';
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\">\n                What differences do you observe between the two results? (S\u00E9lectionnez toutes the correct answers)\n            </div>\n        </div>\n        <div class=\"quiz-options-container\" style=\"display:flex; flex-direction:column; gap:10px; margin-top:15px;\">\n            <button class=\"quiz-option-btn\" data-key=\"weights\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The final weights</span>\n            </button>\n            <button class=\"quiz-option-btn\" data-key=\"features\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The input features change</span>\n            </button>\n            <button class=\"quiz-option-btn\" data-key=\"stops\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The training stops earlier in one model</span>\n            </button>\n            <button class=\"quiz-option-btn\" data-key=\"boundaries\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The decision boundaries are different</span>\n            </button>\n        </div>\n        <button class=\"btn-validate\" id=\"btn-validate-act1\">Submit</button>\n    ";
    var optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    var _loop_1 = function (i) {
        var btn = optionBtns[i];
        var key = btn.getAttribute('data-key');
        btn.onclick = function () {
            q1Answers[key] = !q1Answers[key];
            var checkbox = btn.querySelector('.quiz-option-checkbox');
            if (q1Answers[key]) {
                checkbox.style.backgroundColor = '#8b5cf6';
                checkbox.innerHTML = '✓';
                checkbox.style.display = 'inline-flex';
                checkbox.style.alignItems = 'center';
                checkbox.style.justifyContent = 'center';
                checkbox.style.color = '#fff';
                checkbox.style.fontSize = '12px';
            }
            else {
                checkbox.style.backgroundColor = 'transparent';
                checkbox.innerHTML = '';
            }
        };
    };
    for (var i = 0; i < optionBtns.length; i++) {
        _loop_1(i);
    }
    var validateBtn = document.getElementById('btn-validate-act1');
    validateBtn.onclick = function () {
        var isCorrect = q1Answers.weights && !q1Answers.features && !q1Answers.stops && q1Answers.boundaries;
        if (isCorrect) {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                    <strong>That\u2019s right!</strong> The models use the same data and settings, but their results differ (boundaries and weights).\n                    <button class=\"btn-validate\" id=\"btn-ok-act1\" style=\"margin-top:10px; padding:6px 12px; font-size:12px;\">OK</button>\n                </div>\n            ";
            var okBtn = document.getElementById('btn-ok-act1');
            okBtn.onclick = function () {
                renderActivity2();
            };
        }
        else {
            var fbMsg = "";
            if (q1Answers.features) {
                fbMsg = "The input features change: The input features remain the same in both models.";
            }
            else if (q1Answers.stops) {
                fbMsg = "The training stops earlier in one model: Both models use the same training process.";
            }
            else {
                fbMsg = "Essayez à nouveau de repérer all the differences réelles (poids et frontières).";
            }
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">\n                    " + fbMsg + "\n                    <button class=\"btn-validate\" id=\"btn-retry-act1\" style=\"margin-top:10px; padding:6px 12px; font-size:12px; background:#475569;\">OK</button>\n                </div>\n            ";
            var retryBtn = document.getElementById('btn-retry-act1');
            retryBtn.onclick = function () {
                fPanel.innerHTML = '';
            };
        }
    };
}
var q2Answers = {
    starts: false,
    dataset: false,
    random: false
};
function renderActivity2() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    fPanel.innerHTML = '';
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 2</div>\n            <div class=\"quiz-question-card\">\n                You observed that the decision boundaries are different in each run, even though nothing was changed. What is the main reason? (S\u00E9lectionnez toutes the correct answers)\n            </div>\n        </div>\n        <div class=\"quiz-options-container\" style=\"display:flex; flex-direction:column; gap:10px; margin-top:15px;\">\n            <button class=\"quiz-option-btn\" data-key=\"starts\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">Each run starts from a different set of weights</span>\n            </button>\n            <button class=\"quiz-option-btn\" data-key=\"dataset\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The dataset changes slightly between runs</span>\n            </button>\n            <button class=\"quiz-option-btn\" data-key=\"random\" style=\"display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;\">\n                <span class=\"quiz-option-checkbox\" style=\"width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block;\"></span>\n                <span class=\"quiz-option-text\">The initial weights are randomly assigned at the start</span>\n            </button>\n        </div>\n        <button class=\"btn-validate\" id=\"btn-validate-act2\">Submit</button>\n    ";
    var optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    var _loop_2 = function (i) {
        var btn = optionBtns[i];
        var key = btn.getAttribute('data-key');
        btn.onclick = function () {
            q2Answers[key] = !q2Answers[key];
            var checkbox = btn.querySelector('.quiz-option-checkbox');
            if (q2Answers[key]) {
                checkbox.style.backgroundColor = '#8b5cf6';
                checkbox.innerHTML = '✓';
                checkbox.style.display = 'inline-flex';
                checkbox.style.alignItems = 'center';
                checkbox.style.justifyContent = 'center';
                checkbox.style.color = '#fff';
                checkbox.style.fontSize = '12px';
            }
            else {
                checkbox.style.backgroundColor = 'transparent';
                checkbox.innerHTML = '';
            }
        };
    };
    for (var i = 0; i < optionBtns.length; i++) {
        _loop_2(i);
    }
    var validateBtn = document.getElementById('btn-validate-act2');
    validateBtn.onclick = function () {
        var isCorrect = q2Answers.starts && !q2Answers.dataset && q2Answers.random;
        if (isCorrect) {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                    <strong>That\u2019s correct!</strong> Each run starts with randomly initialized weights, so the model begins learning from a different starting point and converges to a different solution (different boundary and final weights).\n                    <button class=\"btn-validate\" id=\"btn-ok-act2\" style=\"margin-top:10px; padding:6px 12px; font-size:12px;\">OK</button>\n                </div>\n            ";
            var okBtn = document.getElementById('btn-ok-act2');
            okBtn.onclick = function () {
                showFinalSummary();
            };
        }
        else {
            var fbMsg = "Certaines réponses sont incorrectes.";
            if (q2Answers.dataset) {
                fbMsg = "The dataset does not change. Both models use exactly the same data — the difference comes from how the model is initialized, not from the data itself.";
            }
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">\n                    " + fbMsg + "\n                    <button class=\"btn-validate\" id=\"btn-retry-act2\" style=\"margin-top:10px; padding:6px 12px; font-size:12px; background:#475569;\">OK</button>\n                </div>\n            ";
            var retryBtn = document.getElementById('btn-retry-act2');
            retryBtn.onclick = function () {
                fPanel.innerHTML = '';
            };
        }
    };
}
function showFinalSummary() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.style.zIndex = '10005';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    popup.style.maxWidth = '550px';
    var h3 = document.createElement('h3');
    h3.innerText = "The model is unstable.";
    var p = document.createElement('p');
    p.innerHTML = "A neural network learns by adjusting its weights step by step. Without a fixed seed, random weight initialization leads to different starting points. As a result, each run can produce a different model, even with the same data and parameters.";
    p.style.textAlign = 'left';
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
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
        var fPanel = document.getElementById('quiz-feedback-panel');
        if (fPanel) {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                    \u2728 Exercise Successful!! Click on the \"Take the quiz\" button at the bottom right to continue to the final quiz of the exercise.\n                </div>\n            ";
        }
    };
}
var model1Started = false;
var model2Started = false;
var model1MinLoss = Infinity;
var model2MinLoss = Infinity;
var activity1Rendered = false;
window.addEventListener('message', function (event) {
    if (event.data.type === 'EXO8_STEP') {
        var _a = event.data, modelId = _a.modelId, lossTrain = _a.lossTrain, iter = _a.iter;
        if (modelId === '1') {
            model1Started = true;
            if (lossTrain < model1MinLoss)
                model1MinLoss = lossTrain;
            var model1Status = document.getElementById('model1-status-text');
            if (model1Status) {
                if (model1MinLoss <= 0.01) {
                    model1Status.innerHTML = "Pr\u00EAt ! loss = " + model1MinLoss.toFixed(5) + " \u2705";
                    model1Status.style.color = '#10b981';
                }
                else {
                    model1Status.innerHTML = "En cours (loss: " + lossTrain.toFixed(4) + ") \u23F3";
                    model1Status.style.color = '#3b82f6';
                }
            }
        }
        else if (modelId === '2') {
            model2Started = true;
            if (lossTrain < model2MinLoss)
                model2MinLoss = lossTrain;
            var model2Status = document.getElementById('model2-status-text');
            if (model2Status) {
                if (model2MinLoss <= 0.01) {
                    model2Status.innerHTML = "Pr\u00EAt ! loss = " + model2MinLoss.toFixed(5) + " \u2705";
                    model2Status.style.color = '#10b981';
                }
                else {
                    model2Status.innerHTML = "En cours (loss: " + lossTrain.toFixed(4) + ") \u23F3";
                    model2Status.style.color = '#3b82f6';
                }
            }
        }
        if (model1Started && model2Started && model1MinLoss <= 0.01 && model2MinLoss <= 0.01 && !activity1Rendered) {
            activity1Rendered = true;
            activeArrows.forEach(function (a) { return a.remove(); });
            activeArrows = [];
            setTimeout(function () {
                renderActivity1();
            }, 1000);
        }
    }
    else if (event.data.type === 'EXO8_RESET') {
        var modelId = event.data.modelId;
        if (modelId === '1') {
            model1Started = false;
            model1MinLoss = Infinity;
            var model1Status = document.getElementById('model1-status-text');
            if (model1Status) {
                model1Status.innerHTML = "Non lancé ⏳";
                model1Status.style.color = '#ef4444';
            }
        }
        else if (modelId === '2') {
            model2Started = false;
            model2MinLoss = Infinity;
            var model2Status = document.getElementById('model2-status-text');
            if (model2Status) {
                model2Status.innerHTML = "Non lancé ⏳";
                model2Status.style.color = '#ef4444';
            }
        }
    }
});
window.addEventListener('resize', function () {
    if (activeArrows.length > 0) {
        showFlashingArrows();
    }
});
window.addEventListener('scroll', function () {
    if (activeArrows.length > 0) {
        showFlashingArrows();
    }
});
var iframe1 = document.getElementById('iframe-model1');
if (iframe1) {
    iframe1.addEventListener('load', function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
            var qPanel = document.getElementById('quiz-question-panel');
            if (qPanel) {
                qPanel.innerHTML = "\n                    <div class=\"quiz-question-wrapper\">\n                        <div class=\"quiz-question-badge\">Exercise Successful</div>\n                        <div class=\"quiz-question-card\">\n                            You have already validated this exercise ! Vous pouvez passer au quiz final.\n                        </div>\n                    </div>\n                ";
            }
            return;
        }
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, loadTranslations()];
                    case 1:
                        _a.sent();
                        startTutorial();
                        return [2];
                }
            });
        }); }, 1200);
    });
}
