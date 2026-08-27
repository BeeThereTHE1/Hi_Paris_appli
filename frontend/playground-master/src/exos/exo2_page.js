(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 2.');
        return;
    }
    class Exo2 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 2;
            this.currentStepIndex = -1;
            this.steps = [];
            this.initExercise();
        }

        async initExercise() {
            try {
                if (this.apiClient) {
                    var exoConfig = await this.apiClient.getExercise(this.exoId).catch(function () { return null; });
                    if (exoConfig && Array.isArray(exoConfig.steps)) {
                        this.steps = exoConfig.steps;
                    }
                    var userId = this.getCurrentUserIdentifier();
                    if (userId) {
                        var progress = await this.apiClient.getProgress(this.exoId, userId).catch(function () { return null; });
                        if (progress && Number.isInteger(progress.current_step)) {
                            this.currentStepIndex = progress.current_step;
                        }
                    }
                }
            } catch (error) {
                console.warn('Unable to initialize exercise 2.', error);
            }
            this.setupEventListeners();
        }

        setupEventListeners() {}

        async saveProgress(stepIndex, status, scoreDetails) {
            if (!this.apiClient) return false;
            var userId = this.getCurrentUserIdentifier();
            if (!userId) return false;
            try {
                await this.apiClient.saveProgress(this.exoId, userId, {
                    current_step: Number.isInteger(stepIndex) ? stepIndex : 0,
                    status: status || 'IN_PROGRESS',
                    score_details: scoreDetails && typeof scoreDetails === 'object' ? scoreDetails : {}
                });
                this.currentStepIndex = Number.isInteger(stepIndex) ? stepIndex : this.currentStepIndex;
                return true;
            } catch (error) {
                console.warn('Unable to save progress for exercise 2.', error);
                return false;
            }
        }
    }

    window.exo2Page = new Exo2();
})();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
function showExerciseSuccessCongrats() {
    var _this = this;
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo2-success-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    popup.style.background = '#004676';
    var h3 = document.createElement('h3');
    h3.style.color = '#FFFFFF';
    h3.innerText = "Great!";
    var p = document.createElement('p');
    p.style.color = '#FFFFFF';
    p.innerText = "The model has successfully learned to classify the data. Now let’s go back and review the different training steps.";
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.style.background = '#FF553F';
    nextBtn.innerText = "Go to Quiz";
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
        return __awaiter(_this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.stopPropagation();
                        dismiss();
                        return [4, window.StorageService.complete(2)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            btnRealise.innerHTML = '✨ Redirection...';
                            btnRealise.disabled = true;
                            setTimeout(function () {
                                window.location.href = 'exoquiz/exo2_quiz.html';
                            }, 800);
                        }
                        else {
                            window.location.href = 'exoquiz/exo2_quiz.html';
                        }
                        return [2];
                }
            });
        });
    };
    setTimeout(function () {
        document.addEventListener('click', dismiss);
    }, 100);
}
window.addEventListener('message', function (event) {
    if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == 2) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '✨ Exercise Successful !!';
        showExerciseSuccessCongrats();
    }
});
btnSauvegarder.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, window.StorageService.save(2)];
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
    });
};
btnRealise.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, window.StorageService.complete(2)];
                case 1:
                    success = _a.sent();
                    if (success) {
                        btnRealise.innerHTML = '✨ Redirection...';
                        btnRealise.disabled = true;
                        setTimeout(function () {
                            window.location.href = 'exoquiz/exo2_quiz.html';
                        }, 800);
                    }
                    return [2];
            }
        });
    });
};
var activeHighlightBox = null;
var activeTooltip = null;
var activeIndicator = null;
var currentHighlightSelector = null;
var currentHighlightLabel = null;
var currentTooltipSelector = null;
var currentTooltipTitle = null;
var currentTooltipText = null;
var currentTooltipPosition = 'bottom';
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
function getIframeElementRect(selector) {
    var iframe = document.querySelector('.exo-frame');
    if (!iframe)
        return null;
    var iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
    if (!iframeDoc)
        return null;
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
function showHighlightBox(selector, numLabel) {
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
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo2-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #2 : Train the network";
    var p = document.createElement('p');
    var text = "Launch the training of the neural network using the step-by-step button and observe how the weighs change and the loss decreases over time. Once training is complete, we will walk through the training process step by step.First, hover over parameters to view their definitions.";
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
    var timeLeft = 4;
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
function runStep2() {
    showHighlightBox('.timeline-controls', '2');
    showCustomTooltip('.timeline-controls', "Simulation Controls", "Click the Play button to start training, or use the Step and Reset buttons.", 'bottom');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        runStep3();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
    }, 100);
}
function runStep3() {
    showHighlightBox('.control.ui-epoch', '3');
    showCustomTooltip('.control.ui-epoch', "Number of Epochs", "This counter indicates how many times the entire dataset has passed through the neural network.", 'bottom');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        runStep4();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
    }, 100);
}
function runStep4() {
    showHighlightBox('.output-stats.train.ui-trainLoss', '4');
    showCustomTooltip('.output-stats.train.ui-trainLoss', "Training Loss", "Training Loss measures how wrong the models predictions are on the training data, during training, this value decreases as the model learns.", 'left');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        runStep5();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
    }, 100);
}
function runStep5() {
    showHighlightBox('#linechart', '5');
    showCustomTooltip('#linechart', "Loss Evolution Graph", "Visualize the training (and test) loss curve in real time. It should drop progressively during the simulation.", 'left');
    var clickHandler = function () {
        document.removeEventListener('click', clickHandler);
        runFinalStep();
    };
    setTimeout(function () {
        document.addEventListener('click', clickHandler);
    }, 100);
}
function runFinalStep() {
    showHighlightBox('.timeline-controls', '1');
    if (activeTooltip)
        activeTooltip.remove();
    currentTooltipSelector = '.timeline-controls';
    currentTooltipTitle = "Ready to start the training?";
    currentTooltipText = "";
    currentTooltipPosition = 'bottom';
    activeTooltip = document.createElement('div');
    activeTooltip.className = 'tutorial-tooltip';
    activeTooltip.innerHTML = "<h4 style=\"margin:0; font-size:15px; font-weight:800; color:#fff; text-align:center; padding: 5px 10px;\">Ready to start the training?</h4>";
    document.body.appendChild(activeTooltip);
    repositionActiveElements();
    setTimeout(function () {
        clearHighlights();
    }, 4000);
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
        setTimeout(function () {
            try {
                var iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
                if (iframeDoc) {
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
            }
            catch (e) {
                console.error("Erreur d'initialisation des info-tips:", e);
            }
            startTutorial();
        }, 1200);
    });
}
