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
window.ExoCommonPage && window.ExoCommonPage.initProfileWidget();
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.StorageService) return [3, 2];
                    return [4, window.StorageService.save(12)];
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
    });
};
btnRealise.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
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
                    return [4, window.StorageService.complete(12)];
                case 1:
                    success = _a.sent();
                    if (success) {
                        btnRealise.innerHTML = '✨ Redirection...';
                        btnRealise.disabled = true;
                        setTimeout(function () {
                            window.location.href = 'exoquiz/exo12_quiz.html';
                        }, 800);
                    }
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
};
window.ExoCommonPage && window.ExoCommonPage.initBackgroundAnimation();
var styleEl = document.createElement('style');
styleEl.textContent = "\n  .drag-card {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    border-radius: 8px;\n    padding: 12px;\n    font-size: 13px;\n    color: #e2e8f0;\n    cursor: grab;\n    user-select: none;\n    transition: all 0.2s;\n    margin-bottom: 10px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);\n  }\n  .drag-card:hover {\n    background: rgba(255, 255, 255, 0.12);\n    border-color: rgba(255, 255, 255, 0.25);\n    transform: translateY(-2px);\n  }\n  .drag-card:active {\n    cursor: grabbing;\n  }\n  .drag-card.dragging {\n    opacity: 0.4;\n  }\n  .drag-card.selected-for-match {\n    border: 2px solid #8b5cf6 !important;\n    background: rgba(139, 92, 246, 0.15) !important;\n    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);\n  }\n\n  .drop-zone-wrapper {\n    background: rgba(255, 255, 255, 0.02);\n    border: 1px dashed rgba(255, 255, 255, 0.15);\n    border-radius: 8px;\n    padding: 10px;\n    margin-bottom: 10px;\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    min-height: 80px;\n    transition: all 0.2s;\n    cursor: pointer;\n  }\n  .drop-zone-wrapper:hover {\n    background: rgba(255, 255, 255, 0.04);\n    border-color: rgba(255, 255, 255, 0.25);\n  }\n  .drop-zone-wrapper.dragover {\n    background: rgba(139, 92, 246, 0.1) !important;\n    border-color: #8b5cf6 !important;\n    border-style: solid !important;\n  }\n  .drop-zone-concept {\n    font-weight: 700;\n    font-size: 13.5px;\n    color: #a78bfa;\n  }\n  .drop-zone-target {\n    min-height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12.5px;\n    color: #94a3b8;\n    background: rgba(0, 0, 0, 0.2);\n    border-radius: 6px;\n    padding: 8px;\n    text-align: center;\n    transition: all 0.2s;\n  }\n  .drop-zone-target.matched {\n    background: rgba(16, 185, 129, 0.1) !important;\n    border: 1px solid #10b981 !important;\n    color: #10b981 !important;\n    font-weight: 500;\n  }\n\n  @keyframes shake {\n    0%, 100% { transform: translateX(0); }\n    20%, 60% { transform: translateX(-6px); }\n    40%, 80% { transform: translateX(6px); }\n  }\n  .shake-error {\n    animation: shake 0.4s ease-in-out;\n    border-color: #ef4444 !important;\n    background: rgba(239, 68, 68, 0.15) !important;\n  }\n\n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n";
document.head.appendChild(styleEl);
var definitionsData = {
    "training_loss": {
        term: "Training loss",
        def: "Error of the model on the data it was trained on."
    },
    "test_loss": {
        term: "Test loss",
        def: "Error of the model on new, unseen data."
    }
};
var draggedCardId = null;
var selectedForMatchCardId = null;
var matchingData = {
    concepts: [
        { id: "training_loss", name: "Training loss" },
        { id: "test_loss", name: "Test loss" },
        { id: "divergence", name: "Divergence" },
        { id: "overfitting", name: "Overfitting" }
    ],
    definitions: [
        { id: "training_loss", text: "Error of the model on the data it was trained on" },
        { id: "test_loss", text: "Error of the model on new, unseen data" },
        { id: "divergence", text: "Situation where the loss increases instead of decreasing during training" },
        { id: "overfitting", text: "When the model learns training data too well but performs poorly on new data" }
    ]
};
var matchesState = {
    "training_loss": null,
    "test_loss": null,
    "divergence": null,
    "overfitting": null
};
var activeArrow = null;
function showDefinitionModal(title, text) {
    Array.prototype.forEach.call(document.querySelectorAll('#definition-popup-overlay'), function (el) { el.remove(); });
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'definition-popup-overlay';
    overlay.style.zIndex = '10005';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = title;
    var p = document.createElement('p');
    p.innerText = text;
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
    };
}
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo12-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #12: Overfitting & Generalization";
    var p = document.createElement('p');
    var introText = "In this exercise, you will explore Training/Test Loss, Overfitting, and Generalization. Run the model in the simulator, monitor the learning curves, and observe how complexity affects the model's performance on unseen data. First, let's review the key concepts by completing a drag-and-drop matching activity on the right panel.";
    p.innerText = introText;
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
    var timeLeft = 10;
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
            injectInfoTipsInIframe();
            renderActivity1();
        }, 800);
    };
}
function injectInfoTipsInIframe() {
    try {
        var iframe_1 = document.getElementById('iframe-playground');
        if (!iframe_1)
            return;
        var iframeDoc = iframe_1.contentDocument || iframe_1.contentWindow.document;
        if (!iframeDoc.getElementById('exo12-styles')) {
            var style = iframeDoc.createElement('style');
            style.id = 'exo12-styles';
            style.textContent = "\n              @keyframes loss-tip-flash {\n                0%, 100% { background: transparent; color: #8b5cf6; transform: scale(1); box-shadow: none; border-color: #8b5cf6; }\n                50% { background: #FF034D; color: white; transform: scale(1.3); box-shadow: 0 0 10px #FF034D; border-color: #FF034D; }\n              }\n              .info-tip-flash-active {\n                animation: loss-tip-flash 1s ease-in-out;\n                animation-iteration-count: 10;\n              }\n              .info-tip-loss {\n                font-size: 11px;\n                color: #8b5cf6;\n                cursor: pointer;\n                margin-left: 6px;\n                font-weight: bold;\n                display: inline-block;\n                width: 14px;\n                height: 14px;\n                line-height: 14px;\n                text-align: center;\n                border-radius: 50%;\n                border: 1px solid #8b5cf6;\n                user-select: none;\n                background: transparent;\n                transition: all 0.2s;\n              }\n              .info-tip-loss:hover {\n                background: #8b5cf6;\n                color: #fff;\n              }\n            ";
            iframeDoc.head.appendChild(style);
        }
        var testLossEl = iframeDoc.querySelector('.ui-testLoss');
        var trainLossEl = iframeDoc.querySelector('.ui-trainLoss');
        if (testLossEl && !testLossEl.querySelector('.info-tip-loss')) {
            var labelEl = testLossEl.querySelector('span');
            if (labelEl) {
                var tip = iframeDoc.createElement('span');
                tip.className = 'info-tip-loss info-tip-flash-active';
                tip.innerText = '?';
                tip.onclick = function (e) {
                    e.stopPropagation();
                    showDefinitionModal(definitionsData.test_loss.term, definitionsData.test_loss.def);
                };
                labelEl.parentNode.insertBefore(tip, labelEl.nextSibling);
            }
        }
        if (trainLossEl && !trainLossEl.querySelector('.info-tip-loss')) {
            var labelEl = trainLossEl.querySelector('span');
            if (labelEl) {
                var tip = iframeDoc.createElement('span');
                tip.className = 'info-tip-loss info-tip-flash-active';
                tip.innerText = '?';
                tip.onclick = function (e) {
                    e.stopPropagation();
                    showDefinitionModal(definitionsData.training_loss.term, definitionsData.training_loss.def);
                };
                labelEl.parentNode.insertBefore(tip, labelEl.nextSibling);
            }
        }
    }
    catch (e) {
        console.warn("Could not inject info tips into playground simulator iframe.", e);
    }
}
function renderActivity1() {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel)
        return;
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\" style=\"font-size: 13.5px; line-height: 1.45;\">\n                <strong>Drag and drop</strong> - Match each concept with its definition. Drag the definition statements into their respective drop zones or select a card then click on a concept to match.\n            </div>\n        </div>\n        <div style=\"display: flex; gap: 15px; margin-top: 15px;\">\n            <div id=\"drag-source-col\" style=\"flex: 1; display: flex; flex-direction: column;\">\n                <h4 style=\"font-size: 11px; text-transform: uppercase; color: #94a3b8; margin-top: 0; margin-bottom: 8px; letter-spacing: 0.5px;\">D\u00E9finitions</h4>\n                <div id=\"drag-source-area\" style=\"display: flex; flex-direction: column; gap: 2px;\"></div>\n            </div>\n            <div id=\"drop-target-col\" style=\"flex: 1; display: flex; flex-direction: column;\">\n                <h4 style=\"font-size: 11px; text-transform: uppercase; color: #94a3b8; margin-top: 0; margin-bottom: 8px; letter-spacing: 0.5px;\">Concepts</h4>\n                <div id=\"drop-target-area\" style=\"display: flex; flex-direction: column; gap: 2px;\"></div>\n            </div>\n        </div>\n    ";
    fPanel.innerHTML = "\n        <div class=\"feedback-box\" style=\"border-left-color: #8b5cf6; background: rgba(139, 92, 246, 0.05);\">\n            \uD83D\uDCA1 Use the (?) buttons next to the loss statistics inside the simulator to read definitions if needed!\n        </div>\n    ";
    var sourceArea = qPanel.querySelector('#drag-source-area');
    var shuffledDefs = matchingData.definitions.slice().sort(function () { return Math.random() - 0.5; });
    shuffledDefs.forEach(function (def) {
        var card = document.createElement('div');
        card.className = 'drag-card';
        card.id = "drag-" + def.id;
        card.innerText = def.text;
        card.draggable = true;
        card.ondragstart = function (e) {
            draggedCardId = def.id;
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', def.id);
        };
        card.ondragend = function () {
            card.classList.remove('dragging');
        };
        card.onclick = function (e) {
            e.stopPropagation();
            if (selectedForMatchCardId === def.id) {
                selectedForMatchCardId = null;
                card.classList.remove('selected-for-match');
            }
            else {
                Array.prototype.forEach.call(sourceArea.querySelectorAll('.drag-card'), function (el) { el.classList.remove('selected-for-match'); });
                selectedForMatchCardId = def.id;
                card.classList.add('selected-for-match');
            }
        };
        sourceArea.appendChild(card);
    });
    var targetArea = qPanel.querySelector('#drop-target-area');
    var shuffledConcepts = matchingData.concepts.slice().sort(function () { return Math.random() - 0.5; });
    shuffledConcepts.forEach(function (c) {
        var wrapper = document.createElement('div');
        wrapper.className = 'drop-zone-wrapper';
        wrapper.id = "target-wrapper-" + c.id;
        wrapper.innerHTML = "\n            <div class=\"drop-zone-concept\">" + c.name + "</div>\n            <div class=\"drop-zone-target\" id=\"zone-" + c.id + "\">Drop definition here</div>\n        ";
        var zone = wrapper.querySelector("#zone-" + c.id);
        wrapper.ondragover = function (e) {
            e.preventDefault();
            wrapper.classList.add('dragover');
        };
        wrapper.ondragleave = function () {
            wrapper.classList.remove('dragover');
        };
        wrapper.ondrop = function (e) {
            e.preventDefault();
            wrapper.classList.remove('dragover');
            var sourceId = e.dataTransfer.getData('text/plain') || draggedCardId;
            handleDropMatch(sourceId, c.id);
        };
        wrapper.onclick = function () {
            if (selectedForMatchCardId) {
                handleDropMatch(selectedForMatchCardId, c.id);
            }
        };
        targetArea.appendChild(wrapper);
    });
}
function handleDropMatch(sourceId, conceptId) {
    var qPanel = document.getElementById('quiz-question-panel');
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel || !sourceId)
        return;
    var dragCard = document.getElementById("drag-" + sourceId);
    var zone = document.getElementById("zone-" + conceptId);
    var wrapper = document.getElementById("target-wrapper-" + conceptId);
    if (!dragCard || !zone || !wrapper)
        return;
    if (sourceId === conceptId) {
        matchesState[conceptId] = sourceId;
        zone.innerText = dragCard.innerText;
        zone.classList.add('matched');
        dragCard.style.display = 'none';
        selectedForMatchCardId = null;
        dragCard.classList.remove('selected-for-match');
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                \u2705 Correct! You matched <strong>" + matchingData.concepts.find(function (c) { return c.id === conceptId; }).name + "</strong> with its definition.\n            </div>\n        ";
        var allDone = Object.keys(matchesState).every(function (key) { return matchesState[key] !== null; });
        if (allDone) {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                    \uD83C\uDF89 Great! You\u2019ve identified the key concepts \u2014 now let\u2019s see them in action.<br>\n                    Run the model and observe how training loss, test loss, and overfitting actually behave during learning.\n                </div>\n            ";
        }
    }
    else {
        dragCard.classList.add('shake-error');
        setTimeout(function () {
            dragCard.classList.remove('shake-error');
        }, 500);
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">\n                \u274C Not quite. That definition doesn't fit the concept of <strong>" + matchingData.concepts.find(function (c) { return c.id === conceptId; }).name + "</strong>. Try again!\n            </div>\n        ";
    }
}
var iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('completed') === 'true') {
            btnRealise.removeAttribute('disabled');
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
            var backBtn = document.querySelector('.universal-header .btn-header');
            if (backBtn) {
                backBtn.style.animation = 'pulse-button 1.5s infinite';
                var style = document.createElement('style');
                style.textContent = "\n                    @keyframes pulse-button {\n                        0%, 100% { transform: scale(1); box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); }\n                        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); border-color: #8b5cf6; }\n                    }\n                ";
                document.head.appendChild(style);
            }
            var qPanel = document.getElementById('quiz-question-panel');
            if (qPanel) {
                qPanel.innerHTML = "\n                    <div class=\"quiz-question-wrapper\">\n                        <div class=\"quiz-question-badge\">Exercise Successful</div>\n                        <div class=\"quiz-question-card\">\n                            You have already validated this exercise ! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.\n                        </div>\n                    </div>\n                ";
            }
            return;
        }
        setTimeout(function () {
            startTutorial();
        }, 1200);
    });
}
