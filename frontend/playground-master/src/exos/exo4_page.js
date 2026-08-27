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
window.ExoCommonPage && window.ExoCommonPage.initProfileWidget();
window.ExoCommonPage && window.ExoCommonPage.initBackgroundAnimation();
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
window.addEventListener('message', function (event) {
    console.log("Signal reçu du Playground:", event.data);
    if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 4 || event.data.exoId == "4")) {
        console.log("Validation confirmée pour l'exercice 5 !");
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
    }
});
function saveToStorage(key, exoData) {
    if (window.ExoCommonPage) {
        return window.ExoCommonPage.saveToStorage(key, exoData);
    }
    var user = JSON.parse(localStorage.getItem('currentUser') || 'null');
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
            case 0: return [4, StorageService.save(4)];
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
            case 0: return [4, StorageService.complete(4)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirection...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo4_quiz.html';
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
                    translations = data.exercises.exercise_4;
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
    overlay.id = 'exo4-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = translations && translations.title ? translations.title : "Exercise #4 : Bias Editor";
    var p = document.createElement('p');
    var defaultText = "Instructions: In this exercise, you will adjust the bias of a neuron to understand its impact on model performance.";
    var text = translations && translations.instructions && translations.instructions.general ? translations.instructions.general : defaultText;
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
        runStep2Highlight();
    };
}
var activeHighlightBox = null;
var activeTooltip = null;
var activeIndicator = null;
var currentHighlightSelector = null;
var currentTooltipSelector = null;
var currentTooltipTitle = null;
var currentTooltipText = null;
var currentTooltipPosition = 'bottom';
function repositionActiveElements() {
    if (currentHighlightSelector) {
        var rect = getIframeElementRect(currentHighlightSelector);
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
        var rect = getIframeElementRect(currentTooltipSelector);
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
    currentTooltipSelector = null;
}
function showHighlightBox(selector, numLabel) {
    clearHighlights();
    currentHighlightSelector = selector;
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
function runStep2Highlight() {
    showHighlightBox('#custom-bias-editor-group', '1');
    var title = "Modify Bias";
    var desc = "First, modify the value of the bias and train the model.\nObserve what happens each time the bias is modified.\n\nEach neuron follows the form\ny = f(x) + b";
    showCustomTooltip('#custom-bias-editor-group', title, desc.replace(/\n/g, '<br>'), 'right');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        clearHighlights();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
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
