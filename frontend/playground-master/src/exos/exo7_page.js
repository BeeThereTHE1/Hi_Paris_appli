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
                return [4, window.StorageService.save(7)];
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
                return [4, window.StorageService.complete(7)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo7_quiz.html';
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
styleEl.textContent = "\n  @keyframes arrow-flash {\n    0%, 100% { opacity: 0; transform: translate(0, 0); }\n    50% { opacity: 1; transform: translate(-10px, 10px); }\n  }\n  .tutorial-arrow {\n    position: absolute;\n    pointer-events: none;\n    z-index: 10000;\n    width: 60px;\n    height: 60px;\n    animation: arrow-flash 0.6s ease-in-out infinite;\n  }\n  \n  .yes-no-table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 15px;\n    font-family: 'Inter', sans-serif;\n  }\n  .yes-no-table th, .yes-no-table td {\n    padding: 10px;\n    text-align: center;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n  .yes-no-table th {\n    color: #94a3b8;\n    font-weight: 600;\n    font-size: 13px;\n    text-transform: uppercase;\n  }\n  .yes-no-table td:first-child {\n    text-align: left;\n    font-weight: 700;\n    color: #e2e8f0;\n  }\n  \n  .btn-choice {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n    padding: 6px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-weight: 600;\n    transition: all 0.2s ease;\n    min-width: 60px;\n  }\n  .btn-choice:hover {\n    background: rgba(255, 255, 255, 0.15);\n  }\n  .btn-choice.active-yes {\n    background: #10b981;\n    border-color: #10b981;\n    color: white;\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);\n  }\n  .btn-choice.active-no {\n    background: #ef4444;\n    border-color: #ef4444;\n    color: white;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);\n  }\n  \n  .btn-validate {\n    display: block;\n    width: 100%;\n    margin-top: 20px;\n    background: #8b5cf6;\n    border: none;\n    color: white;\n    padding: 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .btn-validate:hover {\n    background: #7c3aed;\n    box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);\n  }\n  \n  .statement-container {\n    margin-top: 15px;\n    display: flex;\n    flex-direction: column;\n    gap: 15px;\n  }\n  .statement-row {\n    background: rgba(255, 255, 255, 0.02);\n    border: 1px solid rgba(255, 255, 255, 0.05);\n    padding: 12px;\n    border-radius: 8px;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    transition: border-color 0.3s;\n  }\n  .statement-row.correct-locked {\n    border-color: rgba(16, 185, 129, 0.4);\n    background: rgba(16, 185, 129, 0.03);\n  }\n  .statement-text {\n    font-size: 13.5px;\n    color: #cbd5e1;\n    line-height: 1.4;\n  }\n  .statement-actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: 10px;\n  }\n  \n  .tutorial-overlay {\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: rgba(15, 23, 42, 0.85);\n    backdrop-filter: blur(8px);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 9999;\n  }\n  .tutorial-popup {\n    background: #0f172a;\n    border: 1px solid rgba(255, 255, 255, 0.15);\n    border-radius: 16px;\n    padding: 30px;\n    max-width: 500px;\n    width: 90%;\n    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);\n    text-align: center;\n  }\n  .tutorial-popup h3 {\n    margin-top: 0;\n    font-size: 20px;\n    font-weight: 800;\n    color: #fff;\n  }\n  .tutorial-popup p {\n    font-size: 14.5px;\n    color: #94a3b8;\n    line-height: 1.6;\n    margin-bottom: 20px;\n  }\n  .tutorial-btn {\n    background: #ff034d;\n    border: none;\n    color: white;\n    padding: 10px 24px;\n    border-radius: 8px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s;\n  }\n  .tutorial-btn:disabled {\n    background: #475569;\n    cursor: not-allowed;\n    opacity: 0.6;\n  }\n  \n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  \n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n";
document.head.appendChild(styleEl);
var translations = null;
var activeArrow = null;
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
                    translations = data.exercises.exercise_7;
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
    overlay.id = 'exo7-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #6";
    var p = document.createElement('p');
    var text = translations && translations.instructions && translations.instructions.general
        ? translations.instructions.general
        : "In this exercise, you will investigate how activation functions affect the model's ability to learn non-linear boundaries. Test each activation function on the Circle dataset, fill out the Yes/No table, and answer the statements about how activation functions affect learning.";
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
            showFlashingArrow('.ui-activation');
            renderActivity1();
        }, 3000);
    };
}
function getIframeElementRect(targetSelector) {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
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
    var dismissArrow = function () {
        if (activeArrow) {
            activeArrow.remove();
            activeArrow = null;
        }
        document.removeEventListener('click', dismissArrow);
        try {
            var iframe_1 = document.querySelector('.exo-frame');
            if (iframe_1 && iframe_1.contentWindow) {
                iframe_1.contentWindow.document.removeEventListener('click', dismissArrow);
            }
        }
        catch (e) { }
    };
    setTimeout(function () {
        document.addEventListener('click', dismissArrow);
        try {
            var iframe_2 = document.querySelector('.exo-frame');
            if (iframe_2 && iframe_2.contentWindow) {
                iframe_2.contentWindow.document.addEventListener('click', dismissArrow);
            }
        }
        catch (e) { }
    }, 100);
}
var selectedAnswersAct1 = {
    relu: null,
    tanh: null,
    sigmoid: null,
    linear: null
};
function renderActivity1() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\">\n                Test the model with each activation function, observe what changes after each run, and identify which activation function can classify the dataset.\n            </div>\n        </div>\n        <table class=\"yes-no-table\">\n            <thead>\n                <tr>\n                    <th>Activation</th>\n                    <th>YES</th>\n                    <th>NO</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr data-activation=\"relu\">\n                    <td>ReLU</td>\n                    <td><button class=\"btn-choice\" data-val=\"yes\">YES</button></td>\n                    <td><button class=\"btn-choice\" data-val=\"no\">NO</button></td>\n                </tr>\n                <tr data-activation=\"tanh\">\n                    <td>Tanh</td>\n                    <td><button class=\"btn-choice\" data-val=\"yes\">YES</button></td>\n                    <td><button class=\"btn-choice\" data-val=\"no\">NO</button></td>\n                </tr>\n                <tr data-activation=\"sigmoid\">\n                    <td>Sigmoid</td>\n                    <td><button class=\"btn-choice\" data-val=\"yes\">YES</button></td>\n                    <td><button class=\"btn-choice\" data-val=\"no\">NO</button></td>\n                </tr>\n                <tr data-activation=\"linear\">\n                    <td>Linear</td>\n                    <td><button class=\"btn-choice\" data-val=\"yes\">YES</button></td>\n                    <td><button class=\"btn-choice\" data-val=\"no\">NO</button></td>\n                </tr>\n            </tbody>\n        </table>\n        <button class=\"btn-validate\" id=\"btn-validate-act1\">Submit</button>\n    ";
    var rows = qPanel.querySelectorAll('tbody tr');
    var _loop_1 = function (i) {
        var row = rows[i];
        var act = row.getAttribute('data-activation');
        var yesBtn = row.querySelector('.btn-choice[data-val="yes"]');
        var noBtn = row.querySelector('.btn-choice[data-val="no"]');
        yesBtn.onclick = function () {
            selectedAnswersAct1[act] = 'yes';
            yesBtn.classList.add('active-yes');
            noBtn.classList.remove('active-no');
        };
        noBtn.onclick = function () {
            selectedAnswersAct1[act] = 'no';
            noBtn.classList.add('active-no');
            yesBtn.classList.remove('active-yes');
        };
    };
    for (var i = 0; i < rows.length; i++) {
        _loop_1(i);
    }
    var validateBtn = document.getElementById('btn-validate-act1');
    validateBtn.onclick = function () {
        var isCorrect = selectedAnswersAct1.relu === 'yes' &&
            selectedAnswersAct1.tanh === 'yes' &&
            selectedAnswersAct1.sigmoid === 'yes' &&
            selectedAnswersAct1.linear === 'no';
        if (isCorrect) {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                    \u2705 Correct !You have correctly identified the capabilities of each function. Transition to activity 2...\n                </div>\n            ";
            validateBtn.disabled = true;
            validateBtn.style.opacity = '0.5';
            setTimeout(function () {
                renderActivity2();
            }, 2000);
        }
        else {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">\n                    \u274C Incorrect. Testez \u00E0 nouveau les fonctions dans le simulateur. Some wrong choices ont \u00E9t\u00E9 r\u00E9initialis\u00E9s.\n                </div>\n            ";
            if (selectedAnswersAct1.relu !== 'yes') {
                selectedAnswersAct1.relu = null;
                var row = qPanel.querySelector('tr[data-activation="relu"]');
                if (row) {
                    var activeYes = row.querySelector('.btn-choice.active-yes');
                    var activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes)
                        activeYes.classList.remove('active-yes');
                    if (activeNo)
                        activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.tanh !== 'yes') {
                selectedAnswersAct1.tanh = null;
                var row = qPanel.querySelector('tr[data-activation="tanh"]');
                if (row) {
                    var activeYes = row.querySelector('.btn-choice.active-yes');
                    var activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes)
                        activeYes.classList.remove('active-yes');
                    if (activeNo)
                        activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.sigmoid !== 'yes') {
                selectedAnswersAct1.sigmoid = null;
                var row = qPanel.querySelector('tr[data-activation="sigmoid"]');
                if (row) {
                    var activeYes = row.querySelector('.btn-choice.active-yes');
                    var activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes)
                        activeYes.classList.remove('active-yes');
                    if (activeNo)
                        activeNo.classList.remove('active-no');
                }
            }
            if (selectedAnswersAct1.linear !== 'no') {
                selectedAnswersAct1.linear = null;
                var row = qPanel.querySelector('tr[data-activation="linear"]');
                if (row) {
                    var activeYes = row.querySelector('.btn-choice.active-yes');
                    var activeNo = row.querySelector('.btn-choice.active-no');
                    if (activeYes)
                        activeYes.classList.remove('active-yes');
                    if (activeNo)
                        activeNo.classList.remove('active-no');
                }
            }
        }
    };
}
var answeredStatementsCount = 0;
var totalStatements = 4;
var statementCorrectStates = [false, false, false, false];
function renderActivity2() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    fPanel.innerHTML = '';
    var statementsData = [
        {
            id: 1,
            text: "1- It changes the bias term, which shifts the decision boundary.",
            correct: false,
            feedback_correct: "✅ Correct. Activation affects the transformation, not the bias values themselves.",
            feedback_incorrect: "❌ Incorrect. The bias is a parameter learned during training, not changed by the activation."
        },
        {
            id: 2,
            text: "2- It influences the shape of the decision boundary the model can learn.",
            correct: true,
            feedback_correct: "✅ Correct. Activation functions affect the kind of boundary the model can represent.",
            feedback_incorrect: "❌ Incorrect. Look at how the decision boundary changes when you switch activation functions."
        },
        {
            id: 3,
            text: "3- It changes how each neuron transforms its input before passing it to the next step",
            correct: true,
            feedback_correct: "✅ Correct. This is the core role of an activation function.",
            feedback_incorrect: "❌ Incorrect. The activation acts inside each neuron before the signal moves forward."
        },
        {
            id: 4,
            text: "4- It changes the values of the weights learned during training.",
            correct: false,
            feedback_correct: "✅ Correct. Activation affects the transformation, not the weight values themselves.",
            feedback_incorrect: "❌ Incorrect. Weights are updated by training, not directly by the activation function."
        }
    ];
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 2</div>\n            <div class=\"quiz-question-card\">\n                How do you think the activation function changes the way the model works?\n            </div>\n        </div>\n        <div class=\"statement-container\">\n            " + statementsData.map(function (stmt, idx) { return "\n                <div class=\"statement-row\" data-idx=\"" + idx + "\">\n                    <div class=\"statement-text\">" + stmt.text + "</div>\n                    <div class=\"statement-actions\">\n                        <button class=\"btn-choice btn-true\" data-val=\"true\">True</button>\n                        <button class=\"btn-choice btn-false\" data-val=\"false\">False</button>\n                    </div>\n                </div>\n            "; }).join('') + "\n        </div>\n    ";
    var statementRows = qPanel.querySelectorAll('.statement-row');
    var _loop_2 = function (i) {
        var row = statementRows[i];
        var idx = parseInt(row.getAttribute('data-idx'));
        var stmt = statementsData[idx];
        var trueBtn = row.querySelector('.btn-choice[data-val="true"]');
        var falseBtn = row.querySelector('.btn-choice[data-val="false"]');
        var handleAnswer = function (userChoice) {
            var isCorrect = userChoice === stmt.correct;
            if (isCorrect) {
                statementCorrectStates[idx] = true;
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
                fPanel.innerHTML = "<div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">" + stmt.feedback_correct + "</div>";
                var allDone = statementCorrectStates.every(function (s) { return s; });
                if (allDone) {
                    btnRealise.removeAttribute('disabled');
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
                    fPanel.innerHTML += "\n                        <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                            \u2728 Exercise Successful !!Click the \"Take the quiz\" button in the bottom right corner to continue.\n                        </div>\n                    ";
                }
            }
            else {
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
                fPanel.innerHTML = "<div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">" + stmt.feedback_incorrect + "</div>";
            }
        };
        trueBtn.onclick = function () { return handleAnswer(true); };
        falseBtn.onclick = function () { return handleAnswer(false); };
    };
    for (var i = 0; i < statementRows.length; i++) {
        _loop_2(i);
    }
}
window.addEventListener('resize', function () {
    if (activeArrow) {
        showFlashingArrow('.ui-activation');
    }
});
window.addEventListener('scroll', function () {
    if (activeArrow) {
        showFlashingArrow('.ui-activation');
    }
});
var iframe = document.querySelector('.exo-frame');
if (iframe) {
    iframe.addEventListener('load', function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
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
