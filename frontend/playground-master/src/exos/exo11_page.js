(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 11.');
        return;
    }
    class Exo11 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 11;
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
                console.warn('Unable to initialize exercise 11.', error);
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
                console.warn('Unable to save progress for exercise 11.', error);
                return false;
            }
        }
    }

    window.exo11Page = new Exo11();
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
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!window.StorageService) return [3, 2];
                return [4, window.StorageService.save(11)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnSauvegarder.innerHTML = '✅ Saved !';
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
                return [4, window.StorageService.complete(11)];
            case 1:
                success = _a.sent();
                if (success) {
                    btnRealise.innerHTML = '✨ Redirecting...';
                    btnRealise.disabled = true;
                    setTimeout(function () {
                        window.location.href = 'exoquiz/exo11_quiz.html';
                    }, 800);
                }
                _a.label = 2;
            case 2: return [2];
        }
    });
}); };
var styleEl = document.createElement('style');
styleEl.textContent = "\n  @keyframes arrow-flash {\n    0%, 100% { opacity: 0; transform: translate(0, 0); }\n    50% { opacity: 1; transform: translate(-10px, 10px); }\n  }\n  .tutorial-arrow {\n    position: absolute;\n    pointer-events: none;\n    z-index: 10000;\n    width: 60px;\n    height: 60px;\n    animation: arrow-flash 0.6s ease-in-out infinite;\n  }\n  \n  .btn-choice {\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n    padding: 6px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-weight: 600;\n    transition: all 0.2s ease;\n    min-width: 70px;\n    text-align: center;\n  }\n  .btn-choice:hover {\n    background: rgba(255, 255, 255, 0.15);\n  }\n  .btn-choice.active-yes {\n    background: #10b981;\n    border-color: #10b981;\n    color: white;\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);\n  }\n  .btn-choice.active-no {\n    background: #ef4444;\n    border-color: #ef4444;\n    color: white;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);\n  }\n  \n  .btn-validate {\n    display: block;\n    width: 100%;\n    margin-top: 20px;\n    background: #8b5cf6;\n    border: none;\n    color: white;\n    padding: 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .btn-validate:hover {\n    background: #7c3aed;\n    box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);\n  }\n  \n  .feedback-box {\n    background: rgba(255, 255, 255, 0.05);\n    border-left: 4px solid #8b5cf6;\n    padding: 12px;\n    border-radius: 4px;\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n    margin-top: 10px;\n    animation: fadeIn 0.3s ease;\n  }\n  \n  @keyframes fadeIn {\n    from { opacity: 0; transform: translateY(5px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n\n  .true-false-table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 15px;\n  }\n  .true-false-table th {\n    text-align: center;\n    padding: 8px;\n    font-size: 12px;\n    color: #94a3b8;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    border-bottom: 1px solid rgba(255,255,255,0.05);\n  }\n  .true-false-table th:first-child {\n    text-align: left;\n  }\n  .true-false-table td {\n    padding: 10px 8px;\n    font-size: 13.5px;\n    color: #f1f5f9;\n    border-bottom: 1px solid rgba(255,255,255,0.05);\n    vertical-align: middle;\n  }\n  .true-false-table td:not(:first-child) {\n    text-align: center;\n  }\n  .true-false-row-card {\n    background: rgba(255,255,255,0.02);\n    border: 1px solid rgba(255,255,255,0.05);\n    border-radius: 6px;\n    padding: 10px;\n    margin-bottom: 10px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 15px;\n  }\n  .true-false-row-card .statement-text {\n    font-size: 13.5px;\n    color: #e2e8f0;\n    line-height: 1.4;\n  }\n  .true-false-row-card .button-group {\n    display: flex;\n    gap: 6px;\n  }\n";
document.head.appendChild(styleEl);
var translations = null;
var activeArrow = null;
function loadTranslations() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, titleEl, instrEl, e_1;
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
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    console.warn("Could not load translations from JSON.", e_1);
                    return [3, 4];
                case 4: return [2];
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
    h3.innerText = translations && translations.title ? translations.title : "Exercise #11 : Learning Rate";
    var p = document.createElement('p');
    var text = "In this exercise, you will investigate how the learning rate controls the speed and stability of training. First, open the definition of the learning rate by clicking on the question mark (?) near the Learning Rate parameter.";
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
        setTimeout(function () {
            renderActivity1();
        }, 800);
    };
}
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
    var statements = questionsAct1;
    if (translations && translations.activity_1 && translations.activity_1.statements) {
        statements = translations.activity_1.statements;
    }
    qPanel.innerHTML = "\n        <div class=\"quiz-question-wrapper\">\n            <div class=\"quiz-question-badge\">Activity 1</div>\n            <div class=\"quiz-question-card\">\n                " + (translations && translations.activity_1 && translations.activity_1.instruction ? translations.activity_1.instruction : "True or False? Check the correct statement for each of the following properties.") + "\n            </div>\n        </div>\n        <div style=\"margin-top: 15px; display: flex; flex-direction: column; gap: 8px;\">\n            " + statements.map(function (q, idx) { return "\n                <div class=\"true-false-row-card\" data-idx=\"" + idx + "\" data-question-id=\"" + q.id + "\">\n                    <span class=\"statement-text\">" + q.statement + "</span>\n                    <div class=\"button-group\">\n                        <button class=\"btn-choice btn-true\" data-val=\"true\">TRUE</button>\n                        <button class=\"btn-choice btn-false\" data-val=\"false\">FALSE</button>\n                    </div>\n                </div>\n            "; }).join('') + "\n        </div>\n    ";
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
                var allDone = statementCorrectStatesAct1.every(function (s) { return s; });
                if (allDone) {
                    btnRealise.removeAttribute('disabled');
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    btnRealise.innerHTML = '<span class="icon">📝</span> Take the quiz';
                    fPanel.innerHTML += "\n                        <div class=\"feedback-box\" style=\"border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;\">\n                            \u2728 Exercise Successful !! Click the \"Take the quiz\" button in the bottom right corner to continue.\n                    ";
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
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var iframeDoc, infoTip_1, style;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
