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
                    return [4, window.StorageService.save(15)];
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
                    return [4, window.StorageService.complete(15)];
                case 1:
                    success = _a.sent();
                    if (success) {
                        btnRealise.innerHTML = '✨ Redirection...';
                        btnRealise.disabled = true;
                        setTimeout(function () {
                            window.location.href = 'exoquiz/exo15_quiz.html';
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
styleEl.textContent = "\n  .drag-card {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    border-radius: 8px;\n    padding: 10px 12px;\n    font-size: 12px;\n    color: #e2e8f0;\n    cursor: grab;\n    user-select: none;\n    transition: all 0.2s;\n    margin-bottom: 8px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);\n    line-height: 1.35;\n  }\n  .drag-card:hover {\n    background: rgba(255, 255, 255, 0.12);\n    border-color: rgba(255, 255, 255, 0.25);\n    transform: translateY(-2px);\n  }\n  .drag-card:active {\n    cursor: grabbing;\n  }\n  .drag-card.dragging {\n    opacity: 0.4;\n  }\n  .drag-card.selected-for-match {\n    border: 2px solid #8b5cf6 !important;\n    background: rgba(139, 92, 246, 0.15) !important;\n    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);\n  }\n\n  .drop-zone-wrapper {\n    background: rgba(255, 255, 255, 0.02);\n    border: 1px dashed rgba(255, 255, 255, 0.15);\n    border-radius: 8px;\n    padding: 12px;\n    margin-bottom: 12px;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    min-height: 140px;\n    transition: all 0.2s;\n    cursor: pointer;\n  }\n  .drop-zone-wrapper:hover {\n    background: rgba(255, 255, 255, 0.04);\n    border-color: rgba(255, 255, 255, 0.25);\n  }\n  .drop-zone-wrapper.dragover {\n    background: rgba(139, 92, 246, 0.1) !important;\n    border-color: #8b5cf6 !important;\n    border-style: solid !important;\n  }\n  .drop-zone-concept {\n    font-weight: 700;\n    font-size: 14px;\n    color: #a78bfa;\n    border-bottom: 1px solid rgba(255,255,255,0.05);\n    padding-bottom: 4px;\n  }\n  .drop-zone-content {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    font-size: 11.5px;\n    color: #94a3b8;\n  }\n  .pill-matched {\n    background: rgba(16, 185, 129, 0.08);\n    border: 1px solid rgba(16, 185, 129, 0.25);\n    color: #10b981;\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 11.5px;\n    line-height: 1.3;\n    animation: scaleIn 0.3s ease;\n  }\n\n  @keyframes scaleIn {\n    from { transform: scale(0.95); opacity: 0; }\n    to { transform: scale(1); opacity: 1; }\n  }\n\n  @keyframes shake {\n    0%, 100% { transform: translateX(0); }\n    20%, 60% { transform: translateX(-6px); }\n    40%, 80% { transform: translateX(6px); }\n  }\n  .shake-error {\n    animation: shake 0.4s ease-in-out;\n    border-color: #ef4444 !important;\n    background: rgba(239, 68, 68, 0.15) !important;\n  }\n\n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n";
document.head.appendChild(styleEl);
var definitionsData = {
    "training_data": {
        term: "Training Data (Données d'entraînement)",
        def: "The dataset used by the model during training to directly update its weights via backpropagation."
    },
    "test_data": {
        term: "Test Data (Données de test)",
        def: "The dataset kept unseen during weight updates, used to evaluate how well the model generalizes to new, unseen inputs."
    }
};
var draggedCardId = null;
var selectedForMatchCardId = null;
var matchingData = {
    concepts: [
        { id: "training_data", name: "Training Data" },
        { id: "test_data", name: "Test Data" }
    ],
    definitions: [
        { id: "training_data_1", category: "training_data", text: "The model directly updates its weights using this data" },
        { id: "training_data_2", category: "training_data", text: "The loss on this data decreases continuously during training" },
        { id: "training_data_3", category: "training_data", text: "This dataset is seen by the model during backpropagation" },
        { id: "training_data_4", category: "training_data", text: "The model can memorize patterns specific to this data" },
        { id: "training_data_5", category: "training_data", text: "Performance on this data may become misleadingly good (overfitting)" },
        { id: "test_data_1", category: "test_data", text: "This dataset remains unseen during weight updates" },
        { id: "test_data_2", category: "test_data", text: "The model does not learn directly from this data" },
        { id: "test_data_3", category: "test_data", text: "Overfitting is observed when performance worsens on this data" },
        { id: "test_data_4", category: "test_data", text: "This data reflects how well the model performs on new, unseen inputs" },
        { id: "test_data_5", category: "test_data", text: "This data is used to evaluate generalization performance" }
    ]
};
var correctMatchesCount = 0;
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
    overlay.id = 'exo15-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #15 : Training & Test Datasets";
    var p = document.createElement('p');
    var introText = "In this exercise, you will examine the distinct roles of the Training dataset and the Test dataset. You will classify statements, run the simulator on a small training split (10%), and observe the consequences on generalization. First, let's review the key notions by classifying statements on the right panel.";
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
        if (!iframeDoc.getElementById('exo15-styles')) {
            var style = iframeDoc.createElement('style');
            style.id = 'exo15-styles';
            style.textContent = "\n              @keyframes loss-tip-flash {\n                0%, 100% { background: transparent; color: #8b5cf6; transform: scale(1); box-shadow: none; border-color: #8b5cf6; }\n                50% { background: #FF034D; color: white; transform: scale(1.3); box-shadow: 0 0 10px #FF034D; border-color: #FF034D; }\n              }\n              .info-tip-flash-active {\n                animation: loss-tip-flash 1.2s ease-in-out !important;\n                animation-iteration-count: 10 !important;\n                border-radius: 50% !important;\n                display: inline-block !important;\n              }\n            ";
            iframeDoc.head.appendChild(style);
        }
        var datasetTip = iframeDoc.querySelector('.ui-dataset h4 .info-tip');
        var testDataTip = iframeDoc.querySelector('.ui-showTestData .info-tip');
        if (datasetTip) {
            datasetTip.classList.add('info-tip-flash-active');
            datasetTip.onclick = function (e) {
                e.stopPropagation();
                showDefinitionModal(definitionsData.training_data.term, definitionsData.training_data.def);
            };
        }
        if (testDataTip) {
            testDataTip.classList.add('info-tip-flash-active');
            testDataTip.onclick = function (e) {
                e.stopPropagation();
                showDefinitionModal(definitionsData.test_data.term, definitionsData.test_data.def);
            };
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
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\" style=\"font-size: 13px; line-height: 1.4;\">\n                <strong>Drag and drop</strong> - Match each specificity statement to its corresponding dataset type. Click a statement, then click on the correct dataset type to match.\n            </div>\n        </div>\n        <div style=\"display: flex; gap: 12px; margin-top: 12px; height: 380px;\">\n            <div id=\"drag-source-col\" style=\"flex: 1.1; display: flex; flex-direction: column; height: 100%;\">\n                <h4 style=\"font-size: 10px; text-transform: uppercase; color: #94a3b8; margin: 0 0 6px 0; letter-spacing: 0.5px;\">Statements (Unsorted)</h4>\n                <div id=\"drag-source-area\" style=\"flex: 1; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 2px;\"></div>\n            </div>\n            <div id=\"drop-target-col\" style=\"flex: 0.9; display: flex; flex-direction: column; height: 100%; overflow-y: auto;\">\n                <h4 style=\"font-size: 10px; text-transform: uppercase; color: #94a3b8; margin: 0 0 6px 0; letter-spacing: 0.5px;\">Dataset Types</h4>\n                <div id=\"drop-target-area\" style=\"display: flex; flex-direction: column; gap: 2px;\"></div>\n            </div>\n        </div>\n    ";
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
    matchingData.concepts.forEach(function (c) {
        var wrapper = document.createElement('div');
        wrapper.className = 'drop-zone-wrapper';
        wrapper.id = "target-wrapper-" + c.id;
        wrapper.innerHTML = "\n            <div class=\"drop-zone-concept\">" + c.name + "</div>\n            <div class=\"drop-zone-content\" id=\"zone-content-" + c.id + "\">\n              <div style=\"padding: 10px; border: 1px dashed rgba(255,255,255,0.05); text-align: center; border-radius: 6px;\">Drop statements here</div>\n            </div>\n        ";
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
    var zoneContent = document.getElementById("zone-content-" + conceptId);
    var wrapper = document.getElementById("target-wrapper-" + conceptId);
    if (!dragCard || !zoneContent || !wrapper)
        return;
    var stmt = matchingData.definitions.find(function (d) { return d.id === sourceId; });
    if (!stmt)
        return;
    if (stmt.category === conceptId) {
        correctMatchesCount++;
        var placeholder = zoneContent.querySelector('div');
        if (placeholder && placeholder.innerText.indexOf('Drop statements') !== -1) {
            placeholder.remove();
        }
        var pill = document.createElement('div');
        pill.className = 'pill-matched';
        pill.innerText = dragCard.innerText;
        zoneContent.appendChild(pill);
        dragCard.style.display = 'none';
        selectedForMatchCardId = null;
        dragCard.classList.remove('selected-for-match');
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);\">\n                \u2705 Correct! statement matches <strong>" + (conceptId === "training_data" ? "Training Data" : "Test Data") + "</strong>.\n            </div>\n        ";
        if (correctMatchesCount === 10) {
            showKeyInsightModal();
        }
    }
    else {
        dragCard.classList.add('shake-error');
        setTimeout(function () {
            dragCard.classList.remove('shake-error');
        }, 500);
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);\">\n                \u274C Incorrect. This statement belongs to the other dataset. Try again!\n            </div>\n        ";
    }
}
function showKeyInsightModal() {
    var fPanel = document.getElementById('quiz-feedback-panel');
    if (fPanel) {
        fPanel.innerHTML = "\n            <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                \uD83C\uDF89 Great! You\u2019ve identified all the key concepts.\n            </div>\n        ";
    }
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'key-insight-overlay';
    overlay.style.zIndex = '10006';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "💡 Key insight";
    var p = document.createElement('p');
    p.innerText = "A neural network model is trained on data (training data), validated, and then used to make predictions on new data (test data).";
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
        var instrEl = document.querySelector('.exo-instructions');
        if (instrEl) {
            instrEl.innerText = "Now that you have identified the roles of training data and test data, let’s see how this translates in practice.";
        }
        var qCardText = document.querySelector('.quiz-question-card');
        if (qCardText) {
            qCardText.innerText = "Now that you have identified the roles of training data and test data, let’s see how this translates in practice.";
        }
        if (fPanel) {
            fPanel.innerHTML = "\n                <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                    \uD83D\uDC49 Click the \"Take the quiz\" button in the bottom right corner to proceed to observations.\n                </div>\n            ";
        }
        btnRealise.removeAttribute('disabled');
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
    };
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
