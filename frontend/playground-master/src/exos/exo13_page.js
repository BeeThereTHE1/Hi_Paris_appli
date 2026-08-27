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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.ExoCommonPage && window.ExoCommonPage.initProfileWidget();
window.ExoCommonPage && window.ExoCommonPage.initBackgroundAnimation();
var apiClient = window.MLPlaygroundApiClient ? new window.MLPlaygroundApiClient() : null;
var exerciseId = 13;
var styleEl = document.createElement('style');
styleEl.textContent = "\n  .flow-arrow {\n    stroke: #FF034D;\n    stroke-width: 8;\n    fill: none;\n    stroke-linecap: round;\n    stroke-dasharray: 16 10;\n    animation: flow-anim 1s linear infinite;\n  }\n  .flow-arrow-blue {\n    stroke: #004676;\n    stroke-width: 8;\n    fill: none;\n    stroke-linecap: round;\n    stroke-dasharray: 16 10;\n    animation: flow-anim 1.2s linear infinite;\n  }\n  .flow-arrow-grey {\n    stroke: rgba(148, 163, 184, 0.55);\n    stroke-width: 5;\n    fill: none;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-dasharray: 10 8;\n    animation: flow-anim-grey 12s linear infinite;\n  }\n  @keyframes flow-anim {\n    to {\n      stroke-dashoffset: -26;\n    }\n  }\n  @keyframes flow-anim-grey {\n    to {\n      stroke-dashoffset: -36;\n    }\n  }\n\n  .step-card {\n    position: fixed;\n    background: rgba(15, 23, 42, 0.95);\n    border: 1.5px solid rgba(255, 255, 255, 0.15);\n    border-radius: 12px;\n    padding: 12px;\n    width: 220px;\n    color: #fff;\n    z-index: 10010;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n    font-family: 'Inter', sans-serif;\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n    pointer-events: auto;\n  }\n  .step-card.inactive {\n    opacity: 0.35;\n    transform: scale(0.95);\n    pointer-events: none;\n  }\n  .step-card.active {\n    opacity: 1;\n    transform: scale(1.02);\n    border-color: #004676;\n    box-shadow: 0 12px 30px rgba(0, 70, 118, 0.4), 0 0 15px rgba(0, 70, 118, 0.2);\n    pointer-events: auto;\n  }\n  .step-card h3 {\n    margin-top: 0;\n    font-size: 13px;\n    font-weight: 800;\n    color: #FF034D;\n    margin-bottom: 6px;\n  }\n  .step-card p {\n    font-size: 10.5px;\n    line-height: 1.4;\n    color: #cbd5e1;\n    margin-bottom: 8px;\n  }\n  .step-card .btn-right {\n    display: flex;\n    justify-content: flex-end;\n  }\n  .step-card button {\n    background: #10b981;\n    color: white;\n    border: none;\n    padding: 4px 12px;\n    border-radius: 5px;\n    font-weight: 700;\n    cursor: pointer;\n    font-size: 11px;\n    transition: all 0.2s;\n  }\n  .step-card button:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);\n  }\n";
document.head.appendChild(styleEl);
var steps = [
    {
        id: 0,
        title: "Step 0 – Initialize the parameters",
        text: "Before learning begins, the weights and biases of the network are initialized randomly. This establishes the initial starting point of the network's parameters."
    },
    {
        id: 1,
        title: "Step 1 – Forward pass (make a prediction)",
        text: "The input data travels forward through the network. Each neuron calculates a weighted sum of its inputs, adds a bias, applies the activation function, and passes the result to the next layer to make a prediction."
    },
    {
        id: 2,
        title: "Step 2 – Compute the error (loss)",
        text: "The predicted outputs are compared with the actual target values using a loss function. This measures the error of the model's current predictions."
    },
    {
        id: 3,
        title: "Step 3 – Backward pass (compute corrections)",
        text: "The gradient of the loss function is calculated with respect to each weight and bias, propagating the error backwards from the output layer through the hidden layers."
    },
    {
        id: 4,
        title: "Step 4 – Update the weights",
        text: "The optimizer updates the weights and biases of the network in the opposite direction of the gradient, scaled by the learning rate, to reduce the loss."
    },
    {
        id: 5,
        title: "Then the loop repeats from step 1",
        text: "With the updated parameters, the cycle starts again. Over thousands of iterations, the network progressively learns the complex decision boundary to classify the dataset."
    }
];
var currentStepIndex = -1;
function getCurrentUserId() {
    try {
        var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return user.id || user.email || null;
    }
    catch (e) {
        return null;
    }
}
function loadExerciseDataFromApi() {
    if (!apiClient) {
        return Promise.resolve();
    }
    var userId = getCurrentUserId();
    return apiClient
        .getExercise(exerciseId)
        .then(function (exoConfig) {
        if (exoConfig && Array.isArray(exoConfig.steps) && exoConfig.steps.length > 0) {
            steps = exoConfig.steps;
        }
        if (!userId) {
            return null;
        }
        return apiClient.getProgress(exerciseId, userId);
    })
        .then(function (progress) {
        if (progress && Number.isInteger(progress.current_step)) {
            currentStepIndex = progress.current_step;
        }
    })
        .catch(function (error) {
        console.warn('Unable to load exercise data from API.', error);
    });
}
function getElementCoords(selector) {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return null;
    var iframeRect = iframe.getBoundingClientRect();
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var el = iframeDoc.querySelector(selector);
        if (!el)
            return null;
        var elRect = el.getBoundingClientRect();
        return {
            cx: iframeRect.left + elRect.left + elRect.width / 2,
            cy: iframeRect.top + elRect.top + elRect.height / 2,
            left: iframeRect.left + elRect.left,
            right: iframeRect.left + elRect.right,
            top: iframeRect.top + elRect.top,
            bottom: iframeRect.top + elRect.bottom,
            width: elRect.width,
            height: elRect.height
        };
    }
    catch (e) {
        return null;
    }
}
function clearOverlay() {
    var overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    overlay.querySelectorAll('path, circle').forEach(function (e) { return e.remove(); });
}
function renderAndPositionCards() {
    steps.forEach(function (step, idx) {
        var card = document.getElementById("step-card-" + idx);
        if (!card) {
            card = document.createElement('div');
            card.id = "step-card-" + idx;
            card.className = 'step-card inactive';
            var h3 = document.createElement('h3');
            h3.innerText = step.title;
            var p = document.createElement('p');
            p.innerText = step.text;
            var okBtn = document.createElement('button');
            okBtn.innerText = "OK";
            okBtn.onclick = function (e) {
                e.stopPropagation();
                goToNextStep();
            };
            var btnContainer = document.createElement('div');
            btnContainer.className = 'btn-right';
            btnContainer.appendChild(okBtn);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(btnContainer);
            document.body.appendChild(card);
        }
        if (idx === currentStepIndex) {
            card.className = 'step-card active';
            card.querySelector('button').style.display = 'inline-block';
        }
        else {
            card.className = 'step-card inactive';
            card.querySelector('button').style.display = 'none';
        }
        var d = getElementCoords('.ui-dataset');
        var n = getElementCoords('#network');
        var h = getElementCoords('#heatmap');
        var m = getElementCoords('.metrics');
        var f = getElementCoords('.column.features');
        if (idx === 0 && d) {
            card.style.left = d.cx - 110 - 80 + "px";
            card.style.top = d.bottom + 45 + "px";
        }
        else if (idx === 1 && n && h) {
            card.style.left = (n.cx + h.cx) / 2 - 110 - 160 + "px";
            card.style.top = h.bottom + 20 + 80 + "px";
        }
        else if (idx === 2 && h) {
            card.style.left = h.cx - 110 + 40 + "px";
            card.style.top = h.top - 125 - 20 + "px";
        }
        else if (idx === 3 && n && m) {
            card.style.left = n.cx - 110 + "px";
            card.style.top = m.top - 45 - 40 + "px";
        }
        else if (idx === 4 && f) {
            card.style.left = f.cx - 110 + "px";
            card.style.top = f.top + 70 - 120 + "px";
        }
        else if (idx === 5 && f) {
            card.style.left = f.cx - 110 + "px";
            card.style.top = f.top + 215 + 120 + "px";
        }
    });
}
function drawFlowArrows() {
    clearOverlay();
    var overlay = document.getElementById('arrow-overlay');
    if (!overlay)
        return;
    var d = getElementCoords('.ui-dataset');
    var c0 = document.getElementById('step-card-0');
    var c1 = document.getElementById('step-card-1');
    var c2 = document.getElementById('step-card-2');
    var c3 = document.getElementById('step-card-3');
    var c4 = document.getElementById('step-card-4');
    var c5 = document.getElementById('step-card-5');
    if (!c0 || !c1 || !c2 || !c3 || !c4 || !c5)
        return;
    var r0 = c0.getBoundingClientRect();
    var r1 = c1.getBoundingClientRect();
    var r2 = c2.getBoundingClientRect();
    var r3 = c3.getBoundingClientRect();
    var r4 = c4.getBoundingClientRect();
    var r5 = c5.getBoundingClientRect();
    function addArrowPath(dStr) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', dStr);
        path.setAttribute('class', 'flow-arrow-grey');
        path.setAttribute('marker-end', 'url(#arrow-head-grey)');
        overlay.appendChild(path);
    }
    if (d) {
        var startX = d.cx;
        var startY = d.bottom;
        var endX = r0.left + r0.width / 2;
        var endY = r0.top;
        addArrowPath("M " + startX + "," + startY + " C " + startX + "," + (startY + endY) / 2 + " " + endX + "," + (startY + endY) / 2 + " " + endX + "," + endY);
    }
    {
        var startX = r0.right;
        var startY = r0.top + r0.height / 2;
        var endX = r1.left;
        var endY = r1.top + r1.height / 2;
        var dx = Math.abs(endX - startX);
        var controlOffset = Math.min(100, dx / 2);
        addArrowPath("M " + startX + "," + startY + " C " + (startX + controlOffset) + "," + startY + " " + (endX - controlOffset) + "," + endY + " " + endX + "," + endY);
    }
    {
        var startX = r1.right;
        var startY = r1.top + r1.height / 2;
        var endX = r2.left + r2.width / 2;
        var endY = r2.bottom;
        var midX = Math.max(r1.right, r2.right) + 60;
        var midY = (startY + endY) / 2;
        addArrowPath("M " + startX + "," + startY + " C " + (startX + 80) + "," + startY + " " + midX + "," + startY + " " + midX + "," + midY + " C " + midX + "," + (endY + 80) + " " + endX + "," + (endY + 60) + " " + endX + "," + endY);
    }
    {
        var startX = r2.left;
        var startY = r2.top + r2.height / 2;
        var endX = r3.right;
        var endY = r3.top + r3.height / 2;
        var dx = Math.abs(endX - startX);
        var controlOffset = Math.min(100, dx / 2);
        addArrowPath("M " + startX + "," + startY + " C " + (startX - controlOffset) + "," + startY + " " + (endX + controlOffset) + "," + endY + " " + endX + "," + endY);
    }
    {
        var startX = r3.left;
        var startY = r3.top + r3.height / 2;
        var endX = r4.left + r4.width / 2;
        var endY = r4.top;
        var controlX1 = (startX + endX) / 2;
        addArrowPath("M " + startX + "," + startY + " C " + controlX1 + "," + startY + " " + endX + "," + startY + " " + endX + "," + endY);
    }
    {
        var startX = r4.left + r4.width / 2;
        var startY = r4.bottom;
        var endX = r5.left + r5.width / 2;
        var endY = r5.top;
        addArrowPath("M " + startX + "," + startY + " L " + endX + "," + endY);
    }
}
function injectBlinkStyleInIframe() {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.getElementById('exo13-blink-styles'))
            return;
        var style = iframeDoc.createElement('style');
        style.id = 'exo13-blink-styles';
        style.textContent = "\n            @keyframes blink-active-anim {\n                0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; }\n                50% { background-color: #FF034D; transform: scale(1.2); box-shadow: 0 0 15px #FF034D; color: white !important; }\n            }\n            .blink-active {\n                animation: blink-active-anim 1s infinite !important;\n                border-radius: 50% !important;\n            }\n        ";
        iframeDoc.head.appendChild(style);
    }
    catch (e) { }
}
function setBlinkStatus(active) {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var btn = iframeDoc.getElementById('next-step-button');
        if (btn) {
            if (active) {
                btn.classList.add('blink-active');
            }
            else {
                btn.classList.remove('blink-active');
            }
        }
    }
    catch (e) { }
}
function bindIframeEvents() {
    var iframe = document.getElementById('iframe-playground');
    if (!iframe)
        return;
    try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var btn = iframeDoc.getElementById('next-step-button');
        if (btn) {
            btn.onclick = function (e) {
                if (currentStepIndex === -1) {
                    goToNextStep();
                }
            };
        }
    }
    catch (e) { }
}
function goToNextStep() {
    currentStepIndex++;
    if (currentStepIndex >= steps.length) {
        steps.forEach(function (s, idx) {
            var card = document.getElementById("step-card-" + idx);
            if (card)
                card.remove();
        });
        showSynthesisOverlay();
        return;
    }
    if (currentStepIndex === 0) {
        setBlinkStatus(false);
    }
    renderAndPositionCards();
    drawFlowArrows();
}
function showSynthesisOverlay() {
    clearOverlay();
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-synthesis-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "In summary";
    var p = document.createElement('p');
    p.style.textAlign = 'left';
    p.style.whiteSpace = 'pre-line';
    p.style.fontSize = '20px';
    p.innerText = "Training is an iterative loop:\npredict \u2192 measure error \u2192 correct \u2192 update\n\nEach step slightly improves the model\nLearning emerges progressively over many iterations.\n\nYou can run the model again to observe these steps in action;\n\nWhenever you are ready click \"Next\" to proceed to the next activity.";
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.innerText = "NEXT";
    nextBtn.onclick = function () {
        overlay.remove();
        var btnRealise = document.getElementById('btn-realise');
        if (btnRealise) {
            btnRealise.disabled = false;
            btnRealise.classList.remove('btn-disabled');
            btnRealise.classList.add('btn-success-ready');
            btnRealise.innerHTML = '<span class="icon">📝</span> Test your knowledge';
            btnRealise.onclick = function () {
                window.location.href = 'exoquiz/exo13_quiz.html';
            };
        }
        window.location.href = 'exoquiz/exo13_quiz.html';
    };
    popup.appendChild(h3);
    popup.appendChild(p);
    popup.appendChild(nextBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo13-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #13 : Iterative Learning Cycle";
    var p = document.createElement('p');
    p.innerText = "Observe the evolution of the decision frontier over the epochs. Pause at different times during the training (epoch 10, 100, 500) and describe what is happening visually.";
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
    var timeLeft = 5;
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
        injectBlinkStyleInIframe();
        setBlinkStatus(true);
        bindIframeEvents();
        setTimeout(function () {
            goToNextStep();
        }, 500);
    };
}
window.onresize = function () {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
        renderAndPositionCards();
        drawFlowArrows();
    }
};
var iframe = document.getElementById('iframe-playground');
if (iframe) {
    iframe.addEventListener('load', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, loadExerciseDataFromApi()];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            startTutorial();
                        }, 1200);
                        return [2];
                }
            });
        });
    });
}
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
btnSauvegarder.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success, userId, progressData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    success = false;
                    if (!apiClient) return [3, 3];
                    userId = getCurrentUserId();
                    if (!userId) {
                        alert("Please log in to save this exercise.");
                        return [2];
                    }
                    progressData = {
                        status: 'IN_PROGRESS',
                        current_step: Math.max(currentStepIndex, 0),
                        score_details: {
                            completed_steps: Math.max(currentStepIndex + 1, 0),
                            total_steps: steps.length
                        }
                    };
                    return [4, apiClient.saveProgress(exerciseId, userId, progressData).then(function () { return true; }).catch(function () { return false; })];
                case 1:
                    success = _a.sent();
                    return [3, 5];
                case 3:
                    if (!(window.StorageService && window.StorageService.save)) return [3, 5];
                    return [4, window.StorageService.save(13)];
                case 4:
                    success = _a.sent();
                    _a.label = 5;
                case 5:
                    if (success) {
                        btnSauvegarder.innerHTML = '✅ Saved !';
                        btnSauvegarder.disabled = true;
                    }
                    return [2];
            }
        });
    });
};
