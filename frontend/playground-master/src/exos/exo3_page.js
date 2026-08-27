(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 3.');
        return;
    }
    class Exo3 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 3;
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
                console.warn('Unable to initialize exercise 3.', error);
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
                console.warn('Unable to save progress for exercise 3.', error);
                return false;
            }
        }
    }

    window.exo3Page = new Exo3();
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
    overlay.id = 'exo3-success-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    popup.style.background = '#004676';
    var h3 = document.createElement('h3');
    h3.style.color = '#FFFFFF';
    h3.innerText = "Excellent !";
    var p = document.createElement('p');
    p.style.color = '#FFFFFF';
    p.innerText = "The model successfully classified the circular data without hidden layers thanks to the quadratic features (X² and Y²). Let's now take the quiz to validate your knowledge.";
    var nextBtn = document.createElement('button');
    nextBtn.className = 'tutorial-btn';
    nextBtn.style.background = '#FF553F';
    nextBtn.innerText = "go to the quiz";
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
                        return [4, window.StorageService.complete(3)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            btnRealise.innerHTML = '✨ Redirection...';
                            btnRealise.disabled = true;
                            setTimeout(function () {
                                window.location.href = 'exoquiz/exo3_quiz.html';
                            }, 800);
                        }
                        else {
                            window.location.href = 'exoquiz/exo3_quiz.html';
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
    if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == 3) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '✨ Exercise Successful !!';
        showExerciseSuccessCongrats();
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
btnSauvegarder.onclick = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, window.StorageService.save(3)];
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
                case 0: return [4, window.StorageService.complete(3)];
                case 1:
                    success = _a.sent();
                    if (success) {
                        btnRealise.innerHTML = '✨ Redirection...';
                        btnRealise.disabled = true;
                        setTimeout(function () {
                            window.location.href = 'exoquiz/exo3_quiz.html';
                        }, 800);
                    }
                    return [2];
            }
        });
    });
};
function startTutorial() {
    var overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'exo3-tutorial-overlay';
    var popup = document.createElement('div');
    popup.className = 'tutorial-popup';
    var h3 = document.createElement('h3');
    h3.innerText = "Exercise #3: Linear vs Non-linear";
    var p = document.createElement('p');
    var text = "In this exercise, you will observe the limitations of a linear model and the role of non‑linear features in learning complex patterns.";
    p.innerText = text;
    var timerSpan = document.createElement('span');
    timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8; font-weight: 500;';
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
        var styleId = 'highlight-pulse-style';
        if (!document.getElementById(styleId)) {
            var style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = "\n        @keyframes highlight-pulse {\n          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 3, 77, 0); border-color: #004676 !important; transform: scale(1); }\n          50% { box-shadow: 0 0 20px 8px rgba(255, 3, 77, 0.9) !important; border-color: #FF034D !important; transform: scale(1.03) !important; }\n        }\n        .trigger-pulse #msg-box-linear {\n          animation: highlight-pulse 0.8s ease-in-out 4 !important;\n          z-index: 1000 !important;\n          position: relative !important;\n        }\n      ";
            document.head.appendChild(style);
        }
        document.body.classList.add('trigger-pulse');
        setTimeout(function () {
            document.body.classList.remove('trigger-pulse');
        }, 3200);
    };
}
startTutorial();
