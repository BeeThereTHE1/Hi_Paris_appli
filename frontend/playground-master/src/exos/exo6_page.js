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
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
    avatar.innerText = initiales.toUpperCase();
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = "\n    <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);\">\n      <div style=\"font-size: 17px; font-weight: 800; color: #fff;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n      <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n      <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n    </div>\n    <div style=\"padding: 8px;\">\n      <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCCA Mon Historique</a>\n      <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCC8 Mes Statistiques</a>\n      <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;\">\uD83D\uDEAA D\u00E9connexion</div>\n    </div>\n  ";
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
    var btnLogout = menu.querySelector('#btnFuturLogout');
    if (btnLogout) {
        btnLogout.onclick = function () { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    }
    container.appendChild(avatar);
    container.appendChild(menu);
})();
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
window.addEventListener('message', function (event) {
    if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 6 || event.data.exoId == "6")) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Faire le quiz';
    }
});
btnSauvegarder.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!window.StorageService) return [3, 2];
                return [4, window.StorageService.save(6)];
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
                return [4, window.StorageService.complete(6)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo6_quiz.html';
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
        neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.element.style.opacity = String(neuron.opacity);
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
var styleEl = document.createElement('style');
styleEl.textContent = "\n  @keyframes arrow-flash {\n    0%, 100% { opacity: 0; transform: translate(0, 0); }\n    50% { opacity: 1; transform: translate(-10px, 10px); }\n  }\n  .tutorial-arrow {\n    position: absolute;\n    pointer-events: none;\n    z-index: 10000;\n    width: 60px;\n    height: 60px;\n    animation: arrow-flash 0.6s ease-in-out infinite;\n  }\n";
document.head.appendChild(styleEl);
var translations = null;
var activeHighlightBox = null;
var activeTooltip = null;
var activeArrow = null;
var currentHighlightSelector = null;
var currentTooltipSelector = null;
var currentTooltipTitle = null;
var currentTooltipText = null;
var currentTooltipPosition = 'bottom';
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
                    translations = data.exercises.exercise_6;
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
    overlay.id = 'exo6-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #6";
    var p = document.createElement('p');
    var text = translations && translations.instructions && translations.instructions.general
        ? translations.instructions.general
        : "In this exercise, you will explore how a neural network builds its prediction step by step.";
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
    var timeLeft = 15;
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
        showFlashingArrow('.timeline-controls', 4);
    };
}
function showFlashingArrow(targetSelectorOrElement, flashesCount) {
    if (flashesCount === void 0) { flashesCount = 4; }
    if (activeArrow)
        activeArrow.remove();
    var rect = getIframeElementRect(targetSelectorOrElement);
    if (!rect)
        return;
    activeArrow = document.createElement('div');
    activeArrow.className = 'tutorial-arrow';
    activeArrow.innerHTML = "\n    <svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" style=\"filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));\">\n      <path d=\"M50,10 L10,50 M10,50 L25,50 M10,50 L10,35\" stroke=\"#FF034D\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>\n    </svg>\n  ";
    activeArrow.style.left = rect.left + rect.width / 2 + window.scrollX + "px";
    activeArrow.style.top = rect.top - 60 + window.scrollY + "px";
    document.body.appendChild(activeArrow);
    activeArrow.style.animationIterationCount = String(flashesCount);
    setTimeout(function () {
        if (activeArrow) {
            activeArrow.remove();
            activeArrow = null;
        }
    }, flashesCount * 600);
}
function getIframeElementRect(target) {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var el = (typeof target === 'string') ? iframeDoc.querySelector(target) : target;
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
function getIframeElement(selector) {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    return iframeDoc.querySelector(selector);
}
function getFirstHiddenNeuronCanvas() {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var canvases = iframeDoc.querySelectorAll('#network .canvas');
    if (canvases.length > 0) {
        return canvases[0];
    }
    return null;
}
function clearHighlights() {
    if (activeHighlightBox) {
        activeHighlightBox.remove();
        activeHighlightBox = null;
    }
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
    if (activeArrow) {
        activeArrow.remove();
        activeArrow = null;
    }
    currentHighlightSelector = null;
    currentTooltipSelector = null;
}
function showHighlightBox(target, padding) {
    if (padding === void 0) { padding = 15; }
}
function showCustomTooltip(target, title, text, position, onDismiss) {
    if (position === void 0) { position = 'bottom'; }
    if (activeTooltip)
        activeTooltip.remove();
    currentTooltipSelector = target;
    currentTooltipTitle = title;
    currentTooltipText = text;
    currentTooltipPosition = position;
    activeTooltip = document.createElement('div');
    activeTooltip.className = 'tutorial-tooltip';
    activeTooltip.innerHTML = "\n    <h4 style=\"margin:0 0 8px 0; font-size:15px; font-weight:800; color:#fff;\">" + title + "</h4>\n    <p style=\"margin:0; font-size:13px; color:#cbd5e1; line-height:1.4;\">" + text + "</p>\n    <div style=\"margin-top:10px; font-size:11px; color:#94a3b8; text-align:right; user-select:none;\">Cliquez n'importe o\u00F9 pour continuer</div>\n  ";
    document.body.appendChild(activeTooltip);
    repositionActiveElements();
    var dismissHandler = function () {
        document.removeEventListener('click', dismissHandler);
        clearHighlights();
        if (onDismiss)
            onDismiss();
    };
    setTimeout(function () {
        document.addEventListener('click', dismissHandler);
    }, 100);
}
function repositionActiveElements() {
    if (currentHighlightSelector && activeHighlightBox) {
        var rect = getIframeElementRect(currentHighlightSelector);
        if (rect) {
            var padding = 12;
            activeHighlightBox.style.left = rect.left - padding + window.scrollX + "px";
            activeHighlightBox.style.top = rect.top - padding + window.scrollY + "px";
            activeHighlightBox.style.width = rect.width + padding * 2 + "px";
            activeHighlightBox.style.height = rect.height + padding * 2 + "px";
        }
    }
    if (currentTooltipSelector && activeTooltip) {
        var rect = getIframeElementRect(currentTooltipSelector);
        if (rect) {
            var tooltipRect = activeTooltip.getBoundingClientRect();
            var top_1 = 0, left = 0;
            if (currentTooltipPosition === 'bottom') {
                top_1 = rect.bottom + window.scrollY + 10;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
            }
            else if (currentTooltipPosition === 'top') {
                top_1 = rect.top - tooltipRect.height - 10 + window.scrollY;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;
            }
            else if (currentTooltipPosition === 'right') {
                top_1 = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
                left = rect.right + 10 + window.scrollX;
            }
            else if (currentTooltipPosition === 'left') {
                top_1 = rect.top + rect.height / 2 - tooltipRect.height / 2 + window.scrollY;
                left = rect.left - tooltipRect.width - 10 + window.scrollX;
            }
            if (left < 10)
                left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10)
                left = window.innerWidth - tooltipRect.width - 10;
            if (top_1 < 10)
                top_1 = 10;
            activeTooltip.style.top = top_1 + "px";
            activeTooltip.style.left = left + "px";
        }
    }
}
function showWarningBanner() {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var topControls = iframeDoc.querySelector('#top-controls');
    if (!topControls)
        return;
    if (iframeDoc.getElementById('exo6-warning-banner'))
        return;
    var banner = iframeDoc.createElement('div');
    banner.id = 'exo6-warning-banner';
    banner.style.cssText = "\n    background: rgba(255, 3, 77, 0.12);\n    border: 1px solid #FF034D;\n    color: #ffffff;\n    padding: 12px 18px;\n    border-radius: 8px;\n    margin: 15px auto 5px auto;\n    max-width: 780px;\n    font-family: 'Inter', sans-serif;\n    font-size: 13.5px;\n    line-height: 1.4;\n    text-align: center;\n    box-shadow: 0 4px 12px rgba(255, 3, 77, 0.15);\n  ";
    var warningText = translations && translations.instructions && translations.instructions.activity_1
        ? translations.instructions.activity_1
        : "As seen earlier, it is not possible to classify complex data (such as the two-circle dataset) using linear features. Now try using a hidden layer with four neurons.";
    banner.innerHTML = "<strong>\u26A0\uFE0F Note :</strong> " + warningText;
    topControls.appendChild(banner);
}
function removeWarningBanner() {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var banner = iframeDoc.getElementById('exo6-warning-banner');
    if (banner)
        banner.remove();
}
var mathSequenceStarted = false;
function runMathSequence() {
    if (mathSequenceStarted)
        return;
    mathSequenceStarted = true;
    removeWarningBanner();
    clearHighlights();
    setTimeout(function () {
        var linkA = getIframeElement('#linkx-1');
        if (!linkA) {
            console.warn("Could not find ID #linkx-1 for Overlay A, starting sequence with B instead.");
            runStepB();
            return;
        }
        showHighlightBox(linkA);
        var titleA = "1- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[0]
            ? translations.pedagogical_overlay[0].title
            : "Simple model: one equation");
        var descA = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[0]
            ? translations.pedagogical_overlay[0].description
            : "This model directly combines x₁ and x₂ using weights and bias. prediction = f(w1·x1 + w2·x2 + b)";
        showCustomTooltip(linkA, titleA, descA, 'right', function () {
            runStepB();
        });
    }, 2000);
}
function runStepB() {
    var nodeB = getFirstHiddenNeuronCanvas();
    if (!nodeB) {
        runStepC();
        return;
    }
    showHighlightBox(nodeB);
    var titleB = "2- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[1]
        ? translations.pedagogical_overlay[1].title
        : "Neural Network: What the hidden layer computes");
    var descB = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[1]
        ? translations.pedagogical_overlay[1].description
        : "Each neuron combines x₁ and x₂ in a different way, producing 4 new features. These values are not predictions, they are features learned from the data.";
    showCustomTooltip(nodeB, titleB, descB, 'bottom', function () {
        runStepC();
    });
}
function runStepC() {
    var linkC = getIframeElement('#link1-5');
    if (!linkC) {
        runStepD();
        return;
    }
    showHighlightBox(linkC);
    var titleC = "3- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[2]
        ? translations.pedagogical_overlay[2].title
        : "How the full model works");
    var descC = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[2]
        ? translations.pedagogical_overlay[2].description
        : "The final prediction is built by combining the learned features. prediction = f(v1·a1 + v2·a2 + v3·a3 + v4·a4 + c)";
    showCustomTooltip(linkC, titleC, descC, 'top', function () {
        runStepD();
    });
}
function runStepD() {
    showHighlightBox('#heatmap');
    var titleD = "4- " + (translations && translations.pedagogical_overlay && translations.pedagogical_overlay[3]
        ? translations.pedagogical_overlay[3].title
        : "In Summary");
    var descD = translations && translations.pedagogical_overlay && translations.pedagogical_overlay[3]
        ? translations.pedagogical_overlay[3].description
        : "A neural network learns new features using neurons, then combines them to solve more complex problems.";
    showCustomTooltip('#heatmap', titleD, descD, 'bottom', function () {
        clearHighlights();
    });
}
window.addEventListener('message', function (event) {
    if (event.data.type === 'EXO6_EPOCH_300') {
        showWarningBanner();
        setTimeout(function () {
            showFlashingArrow('.ui-numHiddenLayers', 4);
        }, 100);
    }
    if (event.data.type === 'EXO6_STATE_CHANGE') {
        var numLayers = event.data.numHiddenLayers;
        var shape = event.data.networkShape;
        if (numLayers > 0) {
            removeWarningBanner();
        }
        if (numLayers === 1 && shape && shape[0] === 4) {
            runMathSequence();
        }
    }
});
window.addEventListener('resize', repositionActiveElements);
window.addEventListener('scroll', repositionActiveElements);
setInterval(repositionActiveElements, 100);
var iframe = document.querySelector('.exo-frame');
if (iframe) {
    iframe.addEventListener('load', function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
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
