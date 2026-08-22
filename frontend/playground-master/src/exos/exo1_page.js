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
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
window.addEventListener('message', function (event) {
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
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.email)
        return false;
    var userKey = key + "_" + user.email;
    var list = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (!list.find(function (e) { return e.id === exoData.id; })) {
        list.push(exoData);
        localStorage.setItem(userKey, JSON.stringify(list));
        return true;
    }
    return false;
}
btnSauvegarder.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, StorageService.save(1)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnSauvegarder.innerHTML = '✅ Sauvegardé !';
                    btnSauvegarder.style.opacity = '0.7';
                    btnSauvegarder.disabled = true;
                }
                return [2];
        }
    });
}); };
btnRealise.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, StorageService.complete(1)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo1_quiz.html';
                    }, 800);
                }
                return [2];
        }
    });
}); };
var translations = null;
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
                    translations = data.exercises.exercise_1;
                    if (translations) {
                        if (translations.title) {
                            document.title = translations.title;
                            titleEl = document.querySelector('.exo-title');
                            if (titleEl)
                                titleEl.innerText = translations.title;
                        }
                        if (translations.instructions && translations.instructions.text) {
                            instrEl = document.querySelector('.exo-instructions');
                            if (instrEl) {
                                instrEl.innerText = translations.instructions.text;
                            }
                        }
                    }
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.warn("Could not load translations from JSON, using fallback/default texts.", error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo1-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercice #1 : Separate the data";
    var p = document.createElement('p');
    var defaultText = "Vous devez modifier les poids de la liaison entre X1 et l'output et X2 et l'output afin d'obtenir une line that separates le plan en deux regions distinctes. Les points oranges et bleues doivent se trouver in each region.";
    var text = translations && translations.instructions && translations.instructions.text ? translations.instructions.text : defaultText;
    p.innerText = text;
    var timerSpan = document.createElement('span');
    timerSpan.style.display = 'block';
    timerSpan.style.marginTop = '15px';
    timerSpan.style.fontSize = '13px';
    timerSpan.style.color = '#94a3b8';
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
    var timeLeft = 7;
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
        runStep1Highlight();
    };
}
function runStep1Highlight() {
    var instructions = document.querySelector('.exo-instructions');
    if (instructions) {
        instructions.classList.add('highlight-glow-border');
        var indicator_1 = document.createElement('div');
        indicator_1.className = 'tutorial-indicator-dot';
        indicator_1.innerText = '1';
        var rect = instructions.getBoundingClientRect();
        indicator_1.style.left = rect.left + 20 + "px";
        indicator_1.style.top = rect.top + "px";
        document.body.appendChild(indicator_1);
        var clickHandler_1 = function () {
            instructions.classList.remove('highlight-glow-border');
            indicator_1.remove();
            document.removeEventListener('click', clickHandler_1);
            runStep2();
        };
        setTimeout(function () {
            document.addEventListener('click', clickHandler_1);
        }, 100);
    }
    else {
        runStep2();
    }
}
var activeHighlightBox = null;
var activeTooltip = null;
var activeIndicator = null;
var currentHighlightSelector = null;
var currentHighlightLabel = null;
var currentTooltipSelector = null;
var currentTooltipTitle = null;
var currentTooltipText = null;
var currentTooltipPosition = 'bottom';
function repositionActiveElements() {
    if (currentHighlightSelector) {
        var rect = null;
        if (currentHighlightSelector === '.exo-instructions') {
            var el = document.querySelector('.exo-instructions');
            if (el)
                rect = el.getBoundingClientRect();
        }
        else {
            rect = getIframeElementRect(currentHighlightSelector);
        }
        if (rect && activeHighlightBox) {
            var padding = 15;
            var rectLeft = rect.left - padding;
            var rectTop = rect.top - padding;
            var rectWidth = rect.width + padding * 2;
            var rectHeight = rect.height + padding * 2;
            activeHighlightBox.style.left = rectLeft + window.scrollX + "px";
            activeHighlightBox.style.top = rectTop + window.scrollY + "px";
            activeHighlightBox.style.width = rectWidth + "px";
            activeHighlightBox.style.height = rectHeight + "px";
            if (activeIndicator) {
                activeIndicator.style.left = rectLeft + window.scrollX + "px";
                activeIndicator.style.top = rectTop + window.scrollY + "px";
            }
        }
    }
    if (currentTooltipSelector && activeTooltip) {
        var rect = null;
        if (currentTooltipSelector === '.exo-instructions') {
            var el = document.querySelector('.exo-instructions');
            if (el)
                rect = el.getBoundingClientRect();
        }
        else {
            rect = getIframeElementRect(currentTooltipSelector);
        }
        if (rect) {
            var tooltipRect = activeTooltip.getBoundingClientRect();
            var top_1 = 0, left = 0;
            var targetLeft = rect.left;
            var targetTop = rect.top;
            var targetWidth = rect.width;
            var targetHeight = rect.height;
            var targetBottom = rect.bottom;
            var targetRight = rect.right;
            if (currentTooltipPosition === 'bottom') {
                top_1 = targetBottom + window.scrollY + 10;
                left = targetLeft + targetWidth / 2 - tooltipRect.width / 2 + window.scrollX;
            }
            else if (currentTooltipPosition === 'top') {
                top_1 = targetTop - tooltipRect.height - 10 + window.scrollY;
                left = targetLeft + targetWidth / 2 - tooltipRect.width / 2 + window.scrollX;
            }
            else if (currentTooltipPosition === 'right') {
                top_1 = targetTop + targetHeight / 2 - tooltipRect.height / 2 + window.scrollY;
                left = targetRight + 10 + window.scrollX;
            }
            else if (currentTooltipPosition === 'left') {
                top_1 = targetTop + targetHeight / 2 - tooltipRect.height / 2 + window.scrollY;
                left = targetLeft - tooltipRect.width - 10 + window.scrollX;
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
function clearHighlights() {
    if (activeHighlightBox) {
        activeHighlightBox.remove();
        activeHighlightBox = null;
    }
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
    if (activeIndicator) {
        activeIndicator.remove();
        activeIndicator = null;
    }
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
function showCustomTooltip(selector, title, text, position) {
    if (position === void 0) { position = 'bottom'; }
    if (activeTooltip)
        activeTooltip.remove();
    currentTooltipSelector = selector;
    currentTooltipTitle = title;
    currentTooltipText = text;
    currentTooltipPosition = position;
    activeTooltip = document.createElement('div');
    activeTooltip.className = 'tutorial-tooltip';
    activeTooltip.innerHTML = "<h4 style=\"margin:0 0 8px 0; font-size:15px; font-weight:800; color:#fff;\">" + title + "</h4><p style=\"margin:0; font-size:13px; color:#cbd5e1;\">" + text + "</p><div style=\"margin-top:10px; font-size:11px; color:#94a3b8; text-align:right;\">Click anywhere to continue</div>";
    document.body.appendChild(activeTooltip);
    repositionActiveElements();
}
function getIframeElementRect(selector) {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (selector.includes(',')) {
        var selectors = selector.split(',').map(function (s) { return s.trim(); });
        var minTop = Infinity, minLeft = Infinity;
        var maxBottom = -Infinity, maxRight = -Infinity;
        var foundAny = false;
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var sel = selectors_1[_i];
            var el_1 = iframeDoc.querySelector(sel);
            if (el_1) {
                foundAny = true;
                var elRect_1 = el_1.getBoundingClientRect();
                if (elRect_1.top < minTop)
                    minTop = elRect_1.top;
                if (elRect_1.left < minLeft)
                    minLeft = elRect_1.left;
                if (elRect_1.bottom > maxBottom)
                    maxBottom = elRect_1.bottom;
                if (elRect_1.right > maxRight)
                    maxRight = elRect_1.right;
            }
        }
        if (!foundAny)
            return null;
        var iframeRect_1 = iframe.getBoundingClientRect();
        return {
            top: iframeRect_1.top + minTop,
            left: iframeRect_1.left + minLeft,
            bottom: iframeRect_1.top + maxBottom,
            right: iframeRect_1.left + maxRight,
            width: maxRight - minLeft,
            height: maxBottom - minTop
        };
    }
    var el = iframeDoc.querySelector(selector);
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
function runStep2() {
    highlightParameter('XAxis');
}
function highlightParameter(paramType) {
    var selector = "";
    var title = "";
    var text = "";
    var nextParam = null;
    var indicatorNum = "2";
    if (paramType === 'XAxis') {
        selector = '.x.axis';
        title = translations && translations.definitions && translations.definitions.x_axis ? translations.definitions.x_axis.term : "Axe X (Abscisses)";
        text = translations && translations.definitions && translations.definitions.x_axis ? translations.definitions.x_axis.definition : "Représente la première caractéristique d'entrée. Dans cet exercice, il s'agit de la coordonnée horizontale de chaque point sur le plan.";
        nextParam = 'YAxis';
        indicatorNum = "2";
    }
    else if (paramType === 'YAxis') {
        selector = '.y.axis';
        title = translations && translations.definitions && translations.definitions.y_axis ? translations.definitions.y_axis.term : "Axe Y (Ordonnées)";
        text = translations && translations.definitions && translations.definitions.y_axis ? translations.definitions.y_axis.definition : "Représente la deuxième caractéristique d'entrée. Dans cet exercice, il s'agit de la coordonnée verticale de chaque point sur le plan.";
        nextParam = 'Colormap';
        indicatorNum = "3";
    }
    else if (paramType === 'Colormap') {
        selector = '#colormap';
        title = translations && translations.definitions && translations.definitions.color_scale ? translations.definitions.color_scale.term : "Palette & Options";
        text = translations && translations.definitions && translations.definitions.color_scale ? translations.definitions.color_scale.definition : "La palette indique les valeurs (Orange = négatif, Bleu = positif). L'affichage des données de test et la discrétisation aident à visualiser la frontière.";
        nextParam = 'Features';
        indicatorNum = "4";
    }
    else if (paramType === 'Features') {
        selector = '.column.features';
        title = translations && translations.definitions && translations.definitions.features ? translations.definitions.features.term : "Caractéristiques (Features)";
        text = translations && translations.definitions && translations.definitions.features ? translations.definitions.features.definition : "Les caractéristiques d'entrée sont les propriétés individuelles mesurables utilisées par le modèle. Ici, nous utilisons X1 et X2. (Notez les boutons d'information 'i' à côté pour de futures définitions !)";
        nextParam = 'Step3';
        indicatorNum = "5";
    }
    var el = null;
    if (selector) {
        var iframe_1 = document.querySelector('.exo-frame');
        if (iframe_1) {
            var iframeDoc = iframe_1.contentDocument || iframe_1.contentWindow.document;
            el = iframeDoc.querySelector(selector);
        }
    }
    if (el) {
        showHighlightBox(selector, indicatorNum);
        showCustomTooltip(selector, title, text, 'bottom');
        var clickHandler_2 = function () {
            document.removeEventListener('click', clickHandler_2);
            if (nextParam === 'Step3') {
                clearHighlights();
                runStep3();
            }
            else {
                highlightParameter(nextParam);
            }
        };
        setTimeout(function () {
            document.addEventListener('click', clickHandler_2);
        }, 100);
    }
    else {
        if (nextParam === 'Step3') {
            runStep3();
        }
        else {
            highlightParameter(nextParam);
        }
    }
}
function runStep3() {
    var leftPopup = document.createElement('div');
    leftPopup.className = 'tutorial-popup-left';
    leftPopup.id = 'exo1-step3-leftpopup';
    var h3 = document.createElement('h3');
    var startText = translations && translations.start_marker ? translations.start_marker : "Let’s Start! Use the slider to change the weight of the features X1 and X2 to find out if your dataset can be classified";
    var titleText = "Let’s Start!";
    var bodyText = startText;
    if (startText.startsWith("Let's Start!")) {
        titleText = "Let's Start!";
        bodyText = startText.substring("Let's Start!".length).trim();
    }
    else if (startText.startsWith("Let’s Start!")) {
        titleText = "Let’s Start!";
        bodyText = startText.substring("Let’s Start!".length).trim();
    }
    h3.innerText = titleText;
    var p = document.createElement('p');
    p.innerText = bodyText;
    var btnDiv = document.createElement('div');
    btnDiv.className = 'btn-right';
    var nextBtn = document.createElement('button');
    nextBtn.innerText = "Next >>";
    btnDiv.appendChild(nextBtn);
    leftPopup.appendChild(h3);
    leftPopup.appendChild(p);
    leftPopup.appendChild(btnDiv);
    document.body.appendChild(leftPopup);
    nextBtn.onclick = function (e) {
        e.stopPropagation();
        leftPopup.remove();
        runStep4();
    };
}
function runStep4() {
    showHighlightBox('#custom-weight-editor-x, #custom-weight-editor-y', '7');
    var wTitle = translations && translations.definitions && translations.definitions.weight ? translations.definitions.weight.term : "Modify Weights";
    var wDesc = translations && translations.definitions && translations.definitions.weight ? translations.definitions.weight.definition : "Drag the sliders or click on the connections between X1, X2, and the output to modify their weights.";
    showCustomTooltip('#custom-weight-editor-x, #custom-weight-editor-y', wTitle, wDesc, 'right');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        clearHighlights();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
    }, 100);
}
function showStep5Congrats() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo1-step5-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    popup.style.background = '#004676';
    var h3 = document.createElement('h3');
    h3.style.color = '#FFFFFF';
    h3.innerText = "Great job!";
    var p = document.createElement('p');
    p.style.color = '#FFFFFF';
    var congratsText = translations && translations.target_achieved ? translations.target_achieved : "Your settings lead to a good classification of our data into two clusters.\nLet's review together what you’ve learned from this exercise.";
    p.innerText = congratsText;
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.style.background = '#FF553F';
    nextBtn.innerText = "Next";
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    var dismiss = function () {
        overlay.remove();
        document.removeEventListener('click', dismiss);
    };
    nextBtn.onclick = function (e) {
        e.stopPropagation();
        dismiss();
    };
    setTimeout(function () {
        document.addEventListener('click', dismiss);
    }, 100);
}
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
            var iframeDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                            iframeDoc.querySelectorAll('.info-tip').forEach(function (el) {
                                if (el.innerText === '?') {
                                    el.innerText = 'i';
                                    el.classList.add('info-tip-pulse');
                                    el.addEventListener('click', function () {
                                        el.classList.remove('info-tip-pulse');
                                    });
                                }
                            });
                        }
                        catch (e) {
                            console.error("Erreur lors de la modification des info-tips dans l'iframe:", e);
                        }
                        return [4, loadTranslations()];
                    case 1:
                        _a.sent();
                        startTutorial();
                        return [2];
                }
            });
        }); }, 1200);
    });
}
