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
(function () {
    var _this = this;
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        var visitorBtn_1 = document.createElement('a');
        visitorBtn_1.href = 'register.html';
        visitorBtn_1.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn_1.onmouseover = function () { return visitorBtn_1.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)'; };
        visitorBtn_1.onmouseout = function () { return visitorBtn_1.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)'; };
        visitorBtn_1.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span > ';
        container.appendChild(visitorBtn_1);
        return;
    }
    var initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;';
    avatar.innerText = initiales.toUpperCase();
    (function () {
        return __awaiter(_this, void 0, void 0, function () {
            var count, r, res, data, res, subs, badge, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        count = 0;
                        r = (user.role || user.profil || '').toUpperCase();
                        if (!(r.includes('TEACH') || r.includes('ENS'))) return [3, 3];
                        return [4, fetch("/api/submissions/teacher/" + user.id + "/count", { headers: { 'x-user-email': user.email } })];
                    case 1:
                        res = _b.sent();
                        return [4, res.json()];
                    case 2:
                        data = _b.sent();
                        count = data.count || 0;
                        return [3, 6];
                    case 3: return [4, fetch("/api/submissions/student/" + user.id)];
                    case 4:
                        res = _b.sent();
                        return [4, res.json()];
                    case 5:
                        subs = _b.sent();
                        count = subs.filter(function (s) { return s.status !== 'PENDING'; }).length;
                        _b.label = 6;
                    case 6:
                        if (count > 0) {
                            badge = document.createElement('span');
                            badge.style.cssText = 'position:absolute; top:-5px; right:-5px; background:#ef4444; color:white; border-radius:50%; width:18px; height:18px; font-size:10px; display:flex; align-items:center; justify-content:center; border:2px solid #0f172a; font-weight:800; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);';
                            badge.innerText = count;
                            avatar.appendChild(badge);
                        }
                        return [3, 8];
                    case 7:
                        e_1 = _b.sent();
                        console.error("Badge error:", e_1);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    })();
    avatar.onmouseover = function () { return avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
    avatar.onmouseout = function () { return avatar.style.transform = 'scale(1) rotate(0deg)'; };
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfile = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;\">\uD83D\uDFE2 Profile " + typeProfile + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCCA</span> My History\n          </a>\n          <a href=\"../statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCC8</span> My Statistics\n          </a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;\" onmouseover=\"this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDEAA</span> D\u00E9connexion\n          </div>\n        </div>\n      ";
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
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    };
    document.addEventListener('click', function (e) {
        if (!container.contains(e.target) && isOpen)
            avatar.onclick();
    });
    container.appendChild(avatar);
    container.appendChild(menu);
})();
var EXERCISES = [
    {
        id: 1, icon: '🧠', title: 'Exercice 1 : Linear classification',
        desc: 'Adjust model parameters to understand how a simple model separates data into two classes.',
        difficulty: 'easy', category: 'Fundamentals', duration: '15 min', questions: 8
    },
    {
        id: 2, icon: '📊', title: 'Exercice 2 : Model training',
        desc: "Explore how model's predictions is based on an iterative process",
        difficulty: 'easy', category: 'Optimization', duration: '20 min', questions: 10
    },
    {
        id: 3, icon: '🔢', title: 'Exercice 3 : Linear and non-linear features',
        desc: 'Observe the limitations of a linear model and the role of non-linear features in learning complex patterns',
        difficulty: 'easy', category: 'Fundamentals', duration: '15 min', questions: 6
    },
    {
        id: 6, icon: '🔵', title: 'Exercice 4 : Neurons and Hidden layers',
        desc: 'Identify how a neural network builds predictions from intermediate features.',
        difficulty: 'medium', category: 'Fundamentals', duration: '20 min', questions: 12
    },
    {
        id: 4, icon: '⚡', title: 'Exercice 5 : Bias',
        desc: 'Explore Bias impact on Neural network model',
        difficulty: 'easy', category: 'Algorithms', duration: '25 min', questions: 12
    },
    {
        id: 7, icon: '🤖', title: 'Exercice 6 : Activation functions',
        desc: 'Manipulate different activation functions and observe their impact on classification.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 8, icon: '🤖', title: 'Exercice 7 : Model Instability and weigh initialization',
        desc: 'Observe how parameter changes affect model behavior.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 9, icon: '🤖', title: 'Exercice 8 : Optimization and convergence',
        desc: 'Compare situations where the model converges or diverges depending on parameter settings.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 11, icon: '🤖', title: 'Exercice 9 : Learning rate and divergence',
        desc: 'Analyze how Learning rate affects model capacity.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 17, icon: '🤖', title: 'Exercice 10 : Learning rate and convergence',
        desc: 'Analyze how Learning rate affects a linear model capacity.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 13, icon: '🤖', title: 'Exercice 11 : Model complexity and features learning',
        desc: 'Review the iterative process of a neural network and Observe how data is transformed across deeper layers of the network.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 16, icon: '🤖', title: 'Exercice 12 : Deep learning and gradient killing',
        desc: 'Understand how gradients affect learning and why they can vanish in deep networks.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 12, icon: '🤖', title: 'Exercice 13 : Overfitting',
        desc: 'Observe how an overly complex model fits training data too closely.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 15, icon: '🤖', title: 'Exercice 14 : Generalization',
        desc: 'Understand the difference between performance on training data and test data.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    }
];
var DIFF_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
var currentFilter = 'tous';
var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
var role = (user.role || user.profil || user.profile || 'ETUDIANT').toUpperCase();
var isTeacher = role.includes('TEACH') || role.includes('ENS') || role.includes('PROF');
function getLockSvg(locked, size) {
    if (size === void 0) { size = 35; }
    var color = locked ? "#EF4444" : "#10B981";
    var opacity = locked ? 1 : 0.65;
    var lockClass = locked ? "locked-svg" : "unlocked-svg";
    if (locked) {
        return "<svg class=\"" + lockClass + "\" width=\"" + size + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"opacity: " + opacity + "; transition: all 0.3s ease;\">\n            <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"" + color + "\" />\n            <path d=\"M7 11V7a5 5 0 0110 0v4\" fill=\"none\" />\n        </svg>";
    }
    else {
        return "<svg class=\"" + lockClass + "\" width=\"" + size + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"opacity: " + opacity + "; transition: all 0.3s ease;\">\n            <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" fill=\"" + color + "\" />\n            <path d=\"M7 11V7a5 5 0 019-3\" fill=\"none\" />\n        </svg>";
    }
}
function getStarSvg(active, size) {
    if (size === void 0) { size = 38; }
    var color = active ? "#FACC15" : "#4B5563";
    var fillClass = active ? "validated" : "unvalidated";
    return "<svg class=\"star-interactive " + fillClass + "\" width=\"" + size + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + color + "\" stroke=\"none\" style=\"transition: transform 0.2s ease, fill 0.3s ease;\">\n        <path d=\"M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z\" />\n    </svg>";
}
var SECTIONS_CONFIG = {
    1: { name: "Basic models: Foundations of neural network", exos: [1, 2, 3], gridId: "exGridSec1", containerId: "section-1-container" },
    2: { name: "The Building Blocks of Neural Networks", exos: [6, 4, 7, 8], gridId: "exGridSec2", containerId: "section-2-container" },
    3: { name: "Training & Optimization", exos: [9, 11, 17, 13], gridId: "exGridSec3", containerId: "section-3-container" },
    4: { name: "Generalization & Deep Learning Limits", exos: [16, 12, 15], gridId: "exGridSec4", containerId: "section-4-container" }
};
var FUN_FACTS = {
    1: "Logistic regression was invented by Joseph Berkson in 1944. It is one of the most widely used classification models in the world!",
    2: "Supervised learning is directly inspired by how a child learns by making mistakes and being corrected by an adult.",
    3: "Circular data cannot be separated by a simple straight line. That's why we need non-linear activation functions!",
    4: "The bias allows the activation function to be shifted to the left or right, providing a crucial degree of freedom to the neuron.",
    5: "Combining several complex input features (like x² or xy) allows solving non-linear problems without adding hidden layers.",
    6: "Hidden layers act as extractors of increasingly abstract features. The deeper you go, the more complex the concept.",
    7: "ReLU (Rectified Linear Unit) is the most popular activation function because it avoids the vanishing gradient problem while being very fast to compute.",
    8: "A neural network with the same hyperparameters can converge to different solutions due to random weight initialization!",
    9: "Stochastic Gradient Descent (SGD) uses a single sample at a time to update weights, making learning extremely fast but noisy.",
    10: "The learning rate is the most sensitive hyperparameter: too large, the model oscillates; too small, it takes forever to converge.",
    11: "Backpropagation was popularized by Geoffrey Hinton in 1986. It calculates the partial derivatives of the error with respect to each weight.",
    12: "Overfitting occurs when the model memorizes the noise of the training data, losing its ability to generalize.",
    13: "L2 Regularization (Ridge) adds a penalty proportional to the square of the weight values to force the network to keep weights small and simple.",
    14: "Dropout randomly disables a percentage of neurons at each iteration, forcing the network not to rely on a single path of neurons.",
    15: "Cross-validation divides the data to reliably estimate the model's actual performance on future data.",
    16: "Deep networks can learn functions of infinite complexity. This is the universal approximation theorem!",
    17: "Loss functions like mean squared error or cross-entropy measure the gap between predictions and reality."
};
var QUIZZES = {
    1: {
        title: "Quiz Section 1: Network Foundations",
        questions: [
            {
                q: "Which activation function is essential for logistic regression to return a probability between 0 and 1?",
                options: ["Sigmoid", "ReLU", "Linear", "Hyperbolic Tangent"],
                answer: 0,
                fallbackExo: 1
            },
            {
                q: "If classification data forms a perfect circle surrounding another class, what type of separation is necessary?",
                options: ["A linear separation", "A non-linear separation", "No separation possible"],
                answer: 1,
                fallbackExo: 3
            }
        ]
    },
    2: {
        title: "Quiz Section 2: Building Blocks",
        questions: [
            {
                q: "What is the main role of the bias in an artificial neuron?",
                options: ["Shift the activation function", "Multiply the weight of the input", "Calculate the prediction error"],
                answer: 0,
                fallbackExo: 4
            },
            {
                q: "Pourquoi les fonctions d'activation non-linéaires (comme ReLU ou Sigmoid) sont-elles cruciales dans les couches cachées ?",
                options: ["To speed up hardware computation", "To allow the network to learn complex non-linear relationships", "To stabilize initial weights at zero"],
                answer: 1,
                fallbackExo: 7
            }
        ]
    },
    3: {
        title: "Quiz Section 3 : Entraînement & Optimization",
        questions: [
            {
                q: "What problem can occur if the learning rate is too high?",
                options: ["Training is too slow", "The model risks oscillating and never converging to the minimum", "The weights all become equal to zero"],
                answer: 1,
                fallbackExo: 10
            },
            {
                q: "What technique allows propagating the error from the output to the input to adjust the weights?",
                options: ["Backpropagation", "Stochastic gradient descent", "L1/L2 regularization"],
                answer: 0,
                fallbackExo: 11
            }
        ]
    },
    4: {
        title: "Quiz Section 4: Generalization & Limits",
        questions: [
            {
                q: "What is the phenomenon called where a model is excellent on training data but very poor on new data?",
                options: ["Underfitting", "Overfitting", "Extreme regularization"],
                answer: 1,
                fallbackExo: 12
            },
            {
                q: "What is the purpose of 'Dropout' during the training of a deep network?",
                options: ["Permanently remove bad data", "Randomly disable neurons to avoid overfitting", "Increase the dimension of the input space"],
                answer: 1,
                fallbackExo: 14
            }
        ]
    }
};
var ARROW_LOTTIE_JSON = { "nm": "Main Scene", "ddd": 0, "h": 200, "w": 200, "meta": { "g": "@lottiefiles/creator@1.94.0" }, "layers": [{ "ty": 4, "nm": "Shape Layer 7", "sr": 1, "st": 0, "op": 840, "ip": 0, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [-2, 77.25, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.833, "y": 1 }, "s": [50, 50, 100], "t": 0 }, { "s": [50, 50, 100], "t": 24 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, -1, 0], "t": 0, "ti": [0, -31.667, 0], "to": [0, 31.667, 0] }, { "s": [100, 94, 0], "t": 24 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.833, "y": 1 }, "s": [0], "t": 0 }, { "s": [100], "t": 24 }], "ix": 11 } }, "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Shape 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "sh", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Group", "nm": "Path 1", "ix": 1, "d": 1, "ks": { "a": 0, "k": { "c": true, "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "v": [[104.5, -23.5], [-2, 48.5], [-107, -22.5], [-107, 49.5], [-2.25, 120], [104.5, 48.125]] }, "ix": 2 } }, { "ty": "st", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Stroke", "nm": "Stroke 1", "lc": 1, "lj": 1, "ml": 4, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 3 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 1 }, { "ty": 4, "nm": "Shape Layer 6", "sr": 1, "st": 0, "op": 840, "ip": 0, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [-2, 77.25, 0], "ix": 1 }, "s": { "a": 0, "k": [50, 50, 100], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 94, 0], "t": 0, "ti": [0, -15, 0], "to": [0, 15, 0] }, { "s": [100, 139, 0], "t": 24 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Shape 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "sh", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Group", "nm": "Path 1", "ix": 1, "d": 1, "ks": { "a": 0, "k": { "c": true, "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "v": [[104.5, -23.5], [-2, 48.5], [-107, -22.5], [-107, 49.5], [-2.25, 120], [104.5, 48.125]] }, "ix": 2 } }, { "ty": "st", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Stroke", "nm": "Stroke 1", "lc": 1, "lj": 1, "ml": 4, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 3 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 2 }, { "ty": 4, "nm": "Shape Layer 5", "sr": 1, "st": 0, "op": 840, "ip": 0, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [-2, 77.25, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [50, 50, 100], "t": 0 }, { "s": [25, 25, 100], "t": 24 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 139, 0], "t": 0, "ti": [0, -20.333, 0], "to": [0, 20.333, 0] }, { "s": [100, 200, 0], "t": 24 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100], "t": 0 }, { "s": [0], "t": 24 }], "ix": 11 } }, "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Shape 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "sh", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Group", "nm": "Path 1", "ix": 1, "d": 1, "ks": { "a": 0, "k": { "c": true, "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], "v": [[104.5, -23.5], [-2, 48.5], [-107, -22.5], [-107, 49.5], [-2.25, 120], [104.5, 48.125]] }, "ix": 2 } }, { "ty": "st", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Stroke", "nm": "Stroke 1", "lc": 1, "lj": 1, "ml": 4, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 3 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [0.8863, 0.2902, 0.2588], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 3 }], "v": "5.7.0", "fr": 24, "op": 24, "ip": 0, "assets": [] };
var completedOfficialIds = new Set();
var userCreatedCount = 0;
var activeQuizSection = null;
var activeQuizAnswers = {};
var introState = JSON.parse(localStorage.getItem('section0_visited') || '{"eval":false,"res":false,"tuto":false}');
function visitIntroItem(type) {
    introState[type] = true;
    localStorage.setItem('section0_visited', JSON.stringify(introState));
    var clickedCard = document.getElementById("card-intro-" + type);
    if (clickedCard)
        clickedCard.classList.remove('pulsing');
    if (type === 'eval' && !introState.res) {
        document.getElementById('card-intro-res').classList.add('pulsing');
    }
    else if (type === 'res' && !introState.tuto) {
        document.getElementById('card-intro-tuto').classList.add('pulsing');
    }
    updateIntroUI();
    applyFilters();
    
    // Navigation
    if (type === 'eval') {
        window.location.href = '../evaluate.html';
    } else if (type === 'res') {
        window.open('https://fr.wikipedia.org/wiki/Apprentissage_profond', '_blank');
    } else if (type === 'tuto') {
        window.location.href = '../exo1.html';
    }
}
function updateIntroUI() {
    var keys = ['eval', 'res', 'tuto'];
    keys.forEach(function (k) {
        var el = document.getElementById("status-intro-" + k);
        if (el) {
            if (introState[k]) {
                el.innerHTML = "✅ Visited";
                el.style.color = "var(--green)";
            }
            else {
                el.innerHTML = "❌ Not visited";
                el.style.color = "var(--red)";
            }
        }
    });
}
function isSection0Completed() {
    return introState.eval && introState.res && introState.tuto;
}
function fetchProgressAndCreatedExos() {
    return __awaiter(this, void 0, void 0, function () {
        var user, tempCompleted, progressRes, progressData, exercisesRes, exercisesData, createdByUser, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = JSON.parse(localStorage.getItem('currentUser'));
                    if (!user || !user.email) {
                        // Si non connecté, on charge la progression temporaire depuis localStorage
                        tempCompleted = JSON.parse(localStorage.getItem('temp_completed_exos') || '[]');
                        completedOfficialIds = new Set(tempCompleted);
                        return [2];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    return [4, fetch("/api/progress/" + user.email)];
                case 2:
                    progressRes = _b.sent();
                    if (!progressRes.ok) return [3, 4];
                    return [4, progressRes.json()];
                case 3:
                    progressData = _b.sent();
                    completedOfficialIds = new Set(progressData
                        .filter(function (p) { return p.status === 'COMPLETED'; })
                        .map(function (p) { return p.exercises ? p.exercises.official_id : null; })
                        .filter(function (id) { return id !== null; }));
                    _b.label = 4;
                case 4: return [4, fetch("/api/exercises")];
                case 5:
                    exercisesRes = _b.sent();
                    if (!exercisesRes.ok) return [3, 7];
                    return [4, exercisesRes.json()];
                case 6:
                    exercisesData = _b.sent();
                    createdByUser = exercisesData.filter(function (exo) { return exo.creator_id === user.id; });
                    userCreatedCount = createdByUser.length;
                    _b.label = 7;
                case 7: return [3, 9];
                case 8:
                    err_1 = _b.sent();
                    console.error("Erreur lors de la récupération de la progression :", err_1);
                    return [3, 9];
                case 9: return [2];
            }
        });
    });
}
function renderSectionCards(gridId, list, isSectionUnlocked) {
    var grid = document.getElementById(gridId);
    if (!grid)
        return;
    grid.innerHTML = '';
    list.forEach(function (ex, index) {
        var card = document.createElement('div');
        var isExUnlocked = true;
        var isCompleted = completedOfficialIds.has(ex.id);
        var lockIcon = getLockSvg(!isExUnlocked);
        var starIcon = getStarSvg(isCompleted);
        card.className = "ex-card " + ex.difficulty + " " + (!isExUnlocked ? 'locked-card' : '');
        if (isSectionUnlocked && isExUnlocked && !isCompleted && (index === 0 || completedOfficialIds.has(list[index - 1].id))) {
            card.classList.add('pulsing');
        }
        card.innerHTML = "\n          <div class=\"card-top\">\n            <div class=\"card-actions-top\">\n                <span class=\"lock-indicator\">" + lockIcon + "</span>\n                <span class=\"star-indicator\" onclick=\"event.stopPropagation(); showFunFact(" + ex.id + ", " + isCompleted + ")\">" + starIcon + "</span>\n            </div>\n            <span class=\"badge " + ex.difficulty + "\">" + DIFF_LABEL[ex.difficulty] + "</span>\n          </div>\n          <div class=\"category-tag\">" + ex.category + "</div>\n          <div class=\"card-title\">" + ex.title + "</div>\n          <div class=\"card-desc\">" + ex.desc + "</div>\n          <div class=\"card-footer\">\n            <div class=\"card-meta\">\n               <div class=\"meta-item\">\uD83D\uDD52 " + ex.duration + "</div>\n               <div class=\"meta-item\">\u2753 " + ex.questions + "</div>\n            </div>\n            <button class=\"btn-start\" " + (!isExUnlocked ? 'disabled' : '') + " onclick=\"startExercise('" + ex.id + "', '" + ex.title.replace(/'/g, "\\'") + "', false)\">\n              Start \u2192\n            </button>\n          </div>\n        ";
        grid.appendChild(card);
    });
}
function deleteCommunityExo(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, err, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!confirm("Do you really want to delete this exercise from the catalog?"))
                        return [2];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4, fetch("/api/exercises/" + id, { method: 'DELETE' })];
                case 2:
                    res = _b.sent();
                    if (!res.ok) return [3, 4];
                    alert("The exercise has been removed from the catalog.");
                    return [4, loadAndRender()];
                case 3:
                    _b.sent();
                    return [3, 6];
                case 4: return [4, res.json()];
                case 5:
                    err = _b.sent();
                    alert("Error: " + (err.error || 'Unable to delete'));
                    _b.label = 6;
                case 6: return [3, 8];
                case 7:
                    err_2 = _b.sent();
                    console.error('Erreur suppression:', err_2);
                    alert("Network error during deletion.");
                    return [3, 8];
                case 8: return [2];
            }
        });
    });
}
function setFilter(diff, btn) {
    currentFilter = diff;
    document.querySelectorAll('.filter-btn').forEach(function (b) { return b.classList.remove('active'); });
    if (btn)
        btn.classList.add('active');
    applyFilters();
}
function filterCards() { applyFilters(); }
var CUSTOM_EXERCISES_FROM_API = [];
function loadAndRender() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, communityOnly, err_3, localCustom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4, fetch('/api/exercises')];
                case 1:
                    res = _b.sent();
                    if (!res.ok) return [3, 3];
                    return [4, res.json()];
                case 2:
                    data = _b.sent();
                    communityOnly = data.filter(function (exo) { return !exo.is_official && !exo.official_id; });
                    CUSTOM_EXERCISES_FROM_API = communityOnly.map(function (exo) {
                        return ({
                            id: exo.id,
                            icon: '👥',
                            title: exo.title,
                            desc: exo.description || 'Custom exercise',
                            difficulty: 'easy',
                            category: 'Community',
                            duration: 'Auto',
                            questions: '?',
                            isCustom: true,
                            creator_id: exo.creator_id
                        });
                    });
                    _b.label = 3;
                case 3: return [3, 5];
                case 4:
                    err_3 = _b.sent();
                    console.warn('⚠️ API indisponible pour les exos custom:', err_3.message);
                    localCustom = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
                    CUSTOM_EXERCISES_FROM_API = localCustom.map(function (exo) {
                        return ({
                            id: exo.id, icon: '👥', title: exo.title, desc: exo.description || '',
                            difficulty: 'easy', category: 'Community', duration: 'Auto', questions: '?', isCustom: true
                        });
                    });
                    return [3, 5];
                case 5:
                    applyFilters();
                    return [2];
            }
        });
    });
}
function applyFilters() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, q, baseExercises, formattedCustoms, statTotalValue, statEasyValue, statMediumValue, statHardValue, sec1Unlocked, sec1QuizCompleted, sec2Unlocked, sec2QuizCompleted, sec3Unlocked, sec3QuizCompleted, sec4Unlocked, sec4QuizCompleted, finalUnlocked, filteredCustom, gridCustom, empty, hasAnyExos;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, fetchProgressAndCreatedExos()];
                case 1:
                    _b.sent();
                    updateIntroUI();
                    q = (((_a = document.getElementById('searchInput')) === null || _a === void 0 ? void 0 : _a.value) || '').toLowerCase().trim();
                    baseExercises = EXERCISES.slice();
                    formattedCustoms = CUSTOM_EXERCISES_FROM_API.slice();
                    statTotalValue = document.getElementById('statTotal');
                    if (statTotalValue)
                        statTotalValue.textContent = baseExercises.length + formattedCustoms.length;
                    statEasyValue = document.getElementById('statEasy');
                    if (statEasyValue)
                        statEasyValue.textContent = baseExercises.filter(function (e) { return e.difficulty === 'easy'; }).length + formattedCustoms.filter(function (e) { return e.difficulty === 'easy'; }).length;
                    statMediumValue = document.getElementById('statMedium');
                    if (statMediumValue)
                        statMediumValue.textContent = baseExercises.filter(function (e) { return e.difficulty === 'medium'; }).length + formattedCustoms.filter(function (e) { return e.difficulty === 'medium'; }).length;
                    statHardValue = document.getElementById('statHard');
                    if (statHardValue)
                        statHardValue.textContent = baseExercises.filter(function (e) { return e.difficulty === 'hard'; }).length + formattedCustoms.filter(function (e) { return e.difficulty === 'hard'; }).length;
                    sec1Unlocked = isSection0Completed();
                    sec1QuizCompleted = localStorage.getItem('quiz_section_1_completed') === 'true';
                    sec2Unlocked = sec1QuizCompleted;
                    sec2QuizCompleted = localStorage.getItem('quiz_section_2_completed') === 'true';
                    sec3Unlocked = sec2QuizCompleted;
                    sec3QuizCompleted = localStorage.getItem('quiz_section_3_completed') === 'true';
                    sec4Unlocked = sec3QuizCompleted;
                    sec4QuizCompleted = localStorage.getItem('quiz_section_4_completed') === 'true';
                    finalUnlocked = sec4QuizCompleted;
                    updateSectionContainer('section-1-container', sec1Unlocked);
                    updateSectionContainer('section-2-container', sec2Unlocked);
                    updateSectionContainer('section-3-container', sec3Unlocked);
                    updateSectionContainer('section-4-container', sec4Unlocked);
                    updateSectionContainer('section-final-container', finalUnlocked);
                    toggleArrowLottie('arrow-0-1', sec1Unlocked, 0);
                    toggleArrowLottie('arrow-1-2', sec2Unlocked, 1);
                    toggleArrowLottie('arrow-2-3', sec3Unlocked, 2);
                    toggleArrowLottie('arrow-3-4', sec4Unlocked, 3);
                    toggleArrowLottie('arrow-4-final', finalUnlocked, 4);
                    Object.keys(SECTIONS_CONFIG).forEach(function (secKey) {
                        var conf = SECTIONS_CONFIG[secKey];
                        var secExos = baseExercises.filter(function (e) { return conf.exos.includes(e.id); });
                        var filteredSecExos = secExos.filter(function (e) {
                            if (currentFilter !== 'tous' && e.difficulty !== currentFilter)
                                return false;
                            if (q && !e.title.toLowerCase().includes(q) && !(e.desc || '').toLowerCase().includes(q))
                                return false;
                            return true;
                        });
                        var isSecUnlocked = secKey == 1 ? sec1Unlocked : (secKey == 2 ? sec2Unlocked : (secKey == 3 ? sec3Unlocked : sec4Unlocked));
                        renderSectionCards(conf.gridId, filteredSecExos, isSecUnlocked);
                        appendQuizCard(conf.gridId, secKey, isSecUnlocked);
                    });
                    filteredCustom = formattedCustoms.filter(function (e) {
                        if (currentFilter !== 'tous' && e.difficulty !== currentFilter)
                            return false;
                        if (q && !e.title.toLowerCase().includes(q) && !(e.desc || '').toLowerCase().includes(q))
                            return false;
                        return true;
                    });
                    gridCustom = document.getElementById('exGridCustom');
                    if (gridCustom) {
                        gridCustom.innerHTML = '';
                        filteredCustom.forEach(function (ex) {
                            var card = document.createElement('div');
                            card.className = "ex-card " + ex.difficulty;
                            var deleteBtn = '';
                            if (isTeacher) {
                                deleteBtn = "<button class=\"btn-delete-exo\" onclick=\"event.stopPropagation(); deleteCommunityExo('" + ex.id + "')\" title=\"Supprimer l'exercice\">\n                <span class=\"material-icons\" style=\"font-size:18px; pointer-events: none;\">delete_forever</span>\n              </button>";
                            }
                            card.innerHTML = "\n              <div class=\"card-top\">\n                <div class=\"card-icon\">" + ex.icon + "</div>\n                <div style=\"display:flex; align-items:center; gap:8px;\">\n                   " + deleteBtn + "\n                   <span class=\"badge " + ex.difficulty + "\">" + DIFF_LABEL[ex.difficulty] + "</span>\n                </div>\n              </div>\n              <div class=\"category-tag\">" + ex.category + "</div>\n              <div class=\"card-title\">" + ex.title + "</div>\n              <div class=\"card-desc\">" + ex.desc + "</div>\n              <div class=\"card-footer\">\n                <div class=\"card-meta\">\n                   <div class=\"meta-item\">\uD83D\uDD52 " + ex.duration + "</div>\n                   <div class=\"meta-item\">\u2753 " + ex.questions + "</div>\n                </div>\n                <button class=\"btn-start\" onclick=\"startExercise('" + ex.id + "', '" + ex.title.replace(/'/g, "\\'") + "', true)\">\n                  Start \u2192\n                </button>\n              </div>\n            ";
                            gridCustom.appendChild(card);
                        });
                    }
                    updateFinalProjectStatus(finalUnlocked);
                    empty = document.getElementById('emptyState');
                    hasAnyExos = baseExercises.length > 0 || formattedCustoms.length > 0;
                    if (!hasAnyExos) {
                        empty.classList.add('visible');
                    }
                    else {
                        empty.classList.remove('visible');
                    }
                    return [2];
            }
        });
    });
}
function updateSectionContainer(id, unlocked) {
    var el = document.getElementById(id);
    if (!el)
        return;
    if (unlocked) {
        el.classList.remove('locked');
        el.style.pointerEvents = 'auto';
    }
    else {
        el.classList.add('locked');
        el.style.pointerEvents = 'none';
    }
}
var lottieArrows = {};
function toggleArrowLottie(containerId, show, index) {
    var el = document.getElementById(containerId);
    if (!el)
        return;
    if (show) {
        el.style.display = 'flex';
        if (!lottieArrows[containerId]) {
            lottieArrows[containerId] = lottie.loadAnimation({
                container: el,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: ARROW_LOTTIE_JSON
            });
        }
    }
    else {
        el.style.display = 'none';
        if (lottieArrows[containerId]) {
            lottieArrows[containerId].destroy();
            delete lottieArrows[containerId];
        }
    }
}
function appendQuizCard(gridId, sectionKey, isSectionUnlocked) {
    var grid = document.getElementById(gridId);
    if (!grid)
        return;
    var conf = SECTIONS_CONFIG[sectionKey];
    var quizCompleted = localStorage.getItem("quiz_section_" + sectionKey + "_completed") === 'true';
    var allExosCompleted = conf.exos.every(function (id) { return completedOfficialIds.has(id); });
    var isQuizUnlocked = true;
    var card = document.createElement('div');
    card.className = "ex-card quiz-card medium " + (!isQuizUnlocked ? 'locked-card' : '') + " " + (quizCompleted ? 'quiz-completed' : '');
    if (isQuizUnlocked && !quizCompleted) {
        card.classList.add('pulsing');
    }
    var lockIcon = getLockSvg(!isQuizUnlocked);
    var starIcon = getStarSvg(quizCompleted);
    card.innerHTML = "\n      <div class=\"card-top\">\n        <div class=\"card-actions-top\">\n            <span class=\"lock-indicator\">" + lockIcon + "</span>\n            <span class=\"star-indicator\">" + starIcon + "</span>\n        </div>\n        <span class=\"badge medium quiz-badge\">\uD83C\uDFC5 Quiz</span>\n      </div>\n      <div class=\"category-tag\">\u00C9valuation</div>\n      <div class=\"card-title\">Validation of the Section " + sectionKey + "</div>\n      <div class=\"card-desc\">Testez vos acquis th\u00E9oriques pour d\u00E9bloquer la section suivante.</div>\n      <div class=\"card-footer\">\n        <div class=\"card-meta\">\n           <div class=\"meta-item\">\uD83D\uDD52 5 min</div>\n           <div class=\"meta-item\">\u2753 2</div>\n        </div>\n        <button class=\"btn-start\" " + (!isQuizUnlocked ? 'disabled' : '') + " onclick=\"openQuizModal(" + sectionKey + ")\">\n          " + (quizCompleted ? 'Restart →' : 'Evaluate →') + "\n        </button>\n      </div>\n    ";
    grid.appendChild(card);
}
function updateFinalProjectStatus(unlocked) {
    var statusText = document.getElementById('final-creation-status');
    var rewardCard = document.getElementById('reward-card');
    var trophyEmoji = document.getElementById('trophy-emoji');
    var btnCert = document.getElementById('btn-download-cert');
    if (userCreatedCount > 0) {
        statusText.innerHTML = "\u2705 " + userCreatedCount + " exercice(s) cr\u00E9\u00E9(s)";
        statusText.style.color = "var(--green)";
    }
    else {
        statusText.innerHTML = "\u274C Aucun exercice cr\u00E9\u00E9";
        statusText.style.color = "var(--red)";
    }
    var allQuizzesDone = [1, 2, 3, 4].every(function (sec) { return localStorage.getItem("quiz_section_" + sec + "_completed") === 'true'; });
    var isRewardUnlocked = unlocked && allQuizzesDone && userCreatedCount > 0;
    if (isRewardUnlocked) {
        rewardCard.classList.remove('locked');
        rewardCard.classList.add('unlocked');
        trophyEmoji.textContent = '🏆';
        btnCert.removeAttribute('disabled');
    }
    else {
        rewardCard.classList.add('locked');
        rewardCard.classList.remove('unlocked');
        trophyEmoji.textContent = '🔒';
        btnCert.setAttribute('disabled', 'true');
    }
}
function showFunFact(exoId, isCompleted) {
    if (!isCompleted)
        return;
    var titleEl = document.getElementById('funfact-title');
    var bodyEl = document.getElementById('funfact-content');
    titleEl.textContent = "\uD83D\uDCA1 Did you know ? (Exercice " + exoId + ")";
    bodyEl.textContent = FUN_FACTS[exoId] || "Artificial intelligence is full of surprises !";
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-funfact').style.display = 'block';
}
var SECTION_QUIZ_CONFIG = {
    1: {
        title: "QUIZ Section 1 : Basic models: Foundations of neural network",
        totalItems: 13,
        terms: [
            { id: 'feat', name: 'Feature' },
            { id: 'weight', name: 'Weight' },
            { id: 'out', name: 'Output' },
            { id: 'loss', name: 'Training loss' }
        ],
        targets: [
            { id: 'feat', def: 'Input variable used by the model', jalonIndex: 0, fallbackExo: 1 },
            { id: 'weight', def: 'Value controlling the importance of a feature', jalonIndex: 1, fallbackExo: 1 },
            { id: 'out', def: 'Model prediction / decision boundary', jalonIndex: 2, fallbackExo: 1 },
            { id: 'loss', def: 'Measure of prediction error', jalonIndex: 3, fallbackExo: 2 }
        ],
        statements: [
            {
                text: "Two clusters can always be separated with a line",
                isTrue: false,
                feedback: "Not quite. Some datasets (circles, spirals) are not linearly separable, so a straight line is not enough.",
                fallbackExo: 3
            },
            {
                text: "Hidden layers are required for linear classification",
                isTrue: false,
                feedback: "Incorrect. Linear problems can be solved without hidden layers using a simple linear model.",
                fallbackExo: 6
            },
            {
                text: "Logistic regression creates a linear boundary",
                isTrue: true,
                feedback: "Not quite. Logistic regression always produces a linear decision boundary, not non-linear ones.",
                fallbackExo: 1
            },
            {
                text: "A neural network without hidden layer behaves like a linear model",
                isTrue: true,
                feedback: "Incorrect. Without hidden layers, a neural network is equivalent to a linear model.",
                fallbackExo: 6
            },
            {
                text: "Training is an iterative loop: prediction → evaluation → optimization",
                isTrue: true,
                feedback: "Not quite. Training follows this repeating loop, not a single-step process.",
                fallbackExo: 2
            },
            {
                text: "when training progresses correctly, loss increases",
                isTrue: false,
                feedback: "Incorrect. If learning works properly, loss should decrease, not increase.",
                fallbackExo: 2
            },
            {
                text: "Parameters initialization is the second step of training",
                isTrue: false,
                feedback: "Not quite. Initialization happens first, before any prediction or training begins.",
                fallbackExo: 2
            },
            {
                text: "Linear features lead to straight decision boundaries, limiting performance on complex data.",
                isTrue: true,
                feedback: "Incorrect. Linear features can only create straight boundaries, which limits performance on complex data.",
                fallbackExo: 3
            },
            {
                text: "Without hidden layers, a model can learn non‑linear patterns with non‑linear features (e.g., X1², X2²)",
                isTrue: true,
                feedback: "Not quite. Even without hidden layers, non-linear features transform the input space, enabling complex patterns.",
                fallbackExo: 5
            }
        ]
    },
    2: {
        title: "QUIZ Section 2 : Hidden layers, activations & backpropagation",
        totalItems: 17,
        terms: [
            { id: 'hidden', name: 'Hidden layer' },
            { id: 'neuron', name: 'Neuron' },
            { id: 'bias', name: 'Bias' },
            { id: 'activation', name: 'Activation function' },
            { id: 'gradient', name: 'Gradient descent' },
            { id: 'init', name: 'Initialization' },
            { id: 'instability', name: 'Model instability' }
        ],
        targets: [
            { id: 'hidden', def: 'Layer that learns intermediate features from data', jalonIndex: 0, fallbackExo: 7 },
            { id: 'neuron', def: 'Unit computing weighted sum + bias (+ activation)', jalonIndex: 1, fallbackExo: 6 },
            { id: 'bias', def: 'Parameter that shifts the decision boundary', jalonIndex: 2, fallbackExo: 6 },
            { id: 'activation', def: 'Function transforming neuron output', jalonIndex: 3, fallbackExo: 7 },
            { id: 'gradient', def: 'Algorithm that updates weights to reduce loss', jalonIndex: 4, fallbackExo: 8 },
            { id: 'init', def: 'Random starting values of weights before training', jalonIndex: 5, fallbackExo: 9 },
            { id: 'instability', def: 'Different results with the same setup due to random initialization', jalonIndex: 6, fallbackExo: 9 }
        ],
        statements: [
            {
                text: "A hidden layer allows a model to learn more complex patterns.",
                isTrue: true,
                feedback: "Without hidden layers, the model remains limited to simple linear relationships.",
                fallbackExo: 7
            },
            {
                text: "The bias shifts the decision boundary without changing its orientation.",
                isTrue: true,
                feedback: "Bias does not change the slope—it only moves the boundary.",
                fallbackExo: 6
            },
            {
                text: "Gradients are only computed once during training.",
                isTrue: false,
                feedback: "Gradients are computed at every step to update the model iteratively.",
                fallbackExo: 8
            },
            {
                text: "Hidden layers directly produce the final prediction.",
                isTrue: false,
                feedback: "Hidden layers create intermediate features; the output layer makes the prediction.",
                fallbackExo: 7
            },
            {
                text: "Activation functions determine how neurons transform their inputs.",
                isTrue: true,
                feedback: "Activation is what introduces non-linearity into the model.",
                fallbackExo: 7
            },
            {
                text: "The bias controls how fast the model learns.",
                isTrue: false,
                feedback: "Learning speed is controlled by the learning rate, not the bias.",
                fallbackExo: 6
            },
            {
                text: "Linear activation functions allow learning complex non-linear patterns.",
                isTrue: false,
                feedback: "Without non-linearity, the model remains equivalent to a linear model.",
                fallbackExo: 7
            },
            {
                text: "All neural networks produce the same result given the same data.",
                isTrue: false,
                feedback: "Results can differ due to random initialization of weights.",
                fallbackExo: 9
            },
            {
                text: "Training loss should decrease when learning is working correctly.",
                isTrue: true,
                feedback: "Increasing loss means the model is not learning properly.",
                fallbackExo: 8
            },
            {
                text: "Running the same model twice can give different results.",
                isTrue: true,
                feedback: "Random initialization leads to different starting points and outcomes.",
                fallbackExo: 9
            }
        ]
    },
    3: {
        title: "QUIZ Section 3 : Training & Optimization",
        totalItems: 19,
        terms: [
            { id: 'epoch', name: 'Epoch' },
            { id: 'lr', name: 'Learning rate' },
            { id: 'conv', name: 'Convergence' },
            { id: 'div', name: 'Divergence' },
            { id: 'feat_learn', name: 'Feature learning' },
            { id: 'noise', name: 'Noise' },
            { id: 'grad', name: 'Gradient' }
        ],
        targets: [
            { id: 'epoch', def: 'One full pass over the training data', jalonIndex: 0, fallbackExo: 10 },
            { id: 'lr', def: 'Step size used to update model parameters', jalonIndex: 1, fallbackExo: 10 },
            { id: 'conv', def: 'When the model stabilizes and loss stops changing significantly', jalonIndex: 2, fallbackExo: 10 },
            { id: 'div', def: 'When loss increases or becomes unstable during training', jalonIndex: 3, fallbackExo: 10 },
            { id: 'feat_learn', def: 'Process where the model builds new internal representations', jalonIndex: 4, fallbackExo: 6 },
            { id: 'noise', def: 'Random variation that makes patterns harder to learn', jalonIndex: 5, fallbackExo: 11 },
            { id: 'grad', def: 'Signal indicating how to update weights to reduce loss', jalonIndex: 6, fallbackExo: 11 }
        ],
        statements: [
            {
                text: "A model has converged when its behavior becomes stable.",
                isTrue: true,
                feedback: "Convergence means stability of learning, not necessarily perfect accuracy.",
                fallbackExo: 10
            },
            {
                text: "A high learning rate can make training unstable.",
                isTrue: true,
                feedback: "Large updates can overshoot the optimal solution and prevent convergence.",
                fallbackExo: 10
            },
            {
                text: "If two models use the same data, they always converge to the same solution.",
                isTrue: false,
                feedback: "Different random initializations can lead to different final solutions.",
                fallbackExo: 9
            },
            {
                text: "High noise always helps the model converge faster.",
                isTrue: false,
                feedback: "Noise can destabilize learning and prevent proper convergence.",
                fallbackExo: 11
            },
            {
                text: "Divergence occurs when the model stops updating its weights.",
                isTrue: false,
                feedback: "Divergence happens when updates become unstable or too large, not when they stop.",
                fallbackExo: 10
            },
            {
                text: "Feature learning means manually selecting better inputs.",
                isTrue: false,
                feedback: "Feature learning is automatic: the model builds internal representations during training.",
                fallbackExo: 6
            },
            {
                text: "Noise in the data can make learning more difficult.",
                isTrue: true,
                feedback: "Noise reduces separability between data points, making patterns harder to learn.",
                fallbackExo: 11
            },
            {
                text: "During training, weights are updated at every iteration.",
                isTrue: true,
                feedback: "Weights are continuously adjusted using gradients at each step.",
                fallbackExo: 10
            },
            {
                text: "Neural networks learn intermediate features inside hidden layers.",
                isTrue: true,
                feedback: "Hidden layers transform inputs into more abstract and useful representations.",
                fallbackExo: 6
            },
            {
                text: "A decreasing loss always means the model has found the best solution.",
                isTrue: false,
                feedback: "Loss can decrease while the model is still far from the optimal or global solution.",
                fallbackExo: 10
            },
            {
                text: "A very low learning rate makes training faster.",
                isTrue: false,
                feedback: "Small updates slow down learning and require more iterations to converge.",
                fallbackExo: 10
            },
            {
                text: "Training is an iterative process that improves the model over time.",
                isTrue: true,
                feedback: "Learning does not happen in one step—it requires repeated updates over many iterations.",
                fallbackExo: 10
            }
        ]
    },
    4: {
        title: "QUIZ Section 4 : Generalization & Deep Learning Limits",
        totalItems: 12,
        terms: [
            { id: 'seq', name: 'Generate predictions, compute loss, compute gradients, and update weights' },
            { id: 'bias', name: 'Shifts decision boundary' },
            { id: 'weights', name: 'Starting weights are set randomly' },
            { id: 'act', name: 'Transforms the output' },
            { id: 'noise', name: 'Model moves back and forth / follows a noisy path' },
            { id: 'lr', name: 'The learning rate' },
            { id: 'high_lr', name: 'Fast but unstable' },
            { id: 'low_lr', name: 'Slow but stable' },
            { id: 'layers', name: 'More layers' },
            { id: 'vanishing', name: 'Vanishing Gradient' },
            { id: 'overfitting', name: 'Overfitting: model fails to generalize' },
            { id: 'non_lin', name: 'They add non-linearity' }
        ],
        targets: [
            { id: 'seq', def: 'What sequence of operations is repeatedly executed during the training of a neural network to progressively improve its predictions?', jalonIndex: 0, fallbackExo: 12 },
            { id: 'bias', def: 'In the equation of a neuron, what is the role of the bias term?', jalonIndex: 1, fallbackExo: 4 },
            { id: 'weights', def: 'Why can running the exact same model multiple times with identical data and parameters produce different outcomes?', jalonIndex: 2, fallbackExo: 9 },
            { id: 'act', def: 'What role does an activation function play inside a neuron?', jalonIndex: 3, fallbackExo: 7 },
            { id: 'noise', def: 'How does increasing noise in a dataset affect the model’s ability to converge toward a stable solution?', jalonIndex: 4, fallbackExo: 11 },
            { id: 'lr', def: 'What hyperparameter controls the magnitude of parameter updates during each training step?', jalonIndex: 5, fallbackExo: 10 },
            { id: 'high_lr', def: 'What is a typical consequence of using a very high learning rate during training?', jalonIndex: 6, fallbackExo: 10 },
            { id: 'low_lr', def: 'What is a typical consequence of using a very low learning rate during training?', jalonIndex: 7, fallbackExo: 10 },
            { id: 'layers', def: 'What architectural factor increases the model’s ability to learn more complex representations and abstract patterns?', jalonIndex: 8, fallbackExo: 6 },
            { id: 'vanishing', def: 'What phenomenon occurs when gradients become extremely small and learning stops in early layers of a deep network?', jalonIndex: 9, fallbackExo: 15 },
            { id: 'overfitting', def: 'When a model performs extremely well on training data but poorly on unseen data, what issue does it illustrate?', jalonIndex: 10, fallbackExo: 12 },
            { id: 'non_lin', def: 'Why are activation functions essential for learning complex patterns?', jalonIndex: 11, fallbackExo: 7 }
        ],
        statements: []
    }
};
var customQuizErrors = 0;
var customQuizItemErrors = [];
var customQuiz1Matches = {};
var customQuiz2CurrentIndex = 0;
var customQuizIncorrectExos = new Set();
var selectedDraggableId = null;
function initCustomQuizTicks() {
    var ticksGroup = document.getElementById('quiz-gauge-ticks');
    if (!ticksGroup)
        return;
    ticksGroup.innerHTML = '';
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var total = config ? config.totalItems : 13;
    for (var i = 0; i < total; i++) {
        var angle = (i * 360 / total) * Math.PI / 180;
        var rStart = 35;
        var rEnd = 39;
        var x1 = 50 + rStart * Math.cos(angle);
        var y1 = 50 + rStart * Math.sin(angle);
        var x2 = 50 + rEnd * Math.cos(angle);
        var y2 = 50 + rEnd * Math.sin(angle);
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.setAttribute('class', 'gauge-tick');
        line.setAttribute('id', "gauge-tick-" + i);
        line.setAttribute('stroke', '#4B5563');
        ticksGroup.appendChild(line);
    }
}
function updateCustomQuizGauge() {
    var percentEl = document.getElementById('quiz-gauge-percent');
    var scoreEl = document.getElementById('quiz-gauge-score');
    var fillEl = document.getElementById('quiz-gauge-fill');
    if (!percentEl || !scoreEl || !fillEl)
        return;
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var total = config ? config.totalItems : 13;
    var score = Math.max(0, total - customQuizErrors);
    var percent = Math.round((score / total) * 100);
    percentEl.textContent = percent + "%";
    scoreEl.textContent = score + "/" + total;
    var circ = 282.74;
    var offset = circ - (percent / 100) * circ;
    fillEl.style.strokeDashoffset = offset.toString();
    if (percent >= 80) {
        fillEl.style.stroke = '#10B981';
    }
    else {
        fillEl.style.stroke = '#FF034D';
    }
}
function updateTickColor(i, success) {
    var tick = document.getElementById("gauge-tick-" + i);
    if (tick) {
        tick.setAttribute('stroke', success ? '#10B981' : '#FF034D');
    }
}
function openQuizModal(sectionKey) {
    activeQuizSection = sectionKey;
    activeQuizAnswers = {};
    var modal = document.getElementById('modal-quiz');
    if (modal) {
        if (sectionKey === 1 || sectionKey === 2 || sectionKey === 3 || sectionKey === 4) {
            modal.classList.add('large-modal');
        }
        else {
            modal.classList.remove('large-modal');
        }
    }
    var titleEl = document.getElementById('quiz-title');
    var bodyEl = document.getElementById('quiz-content');
    var footerEl = document.querySelector('.modal-footer');
    if (!titleEl || !bodyEl)
        return;
    if (sectionKey === 1 || sectionKey === 2 || sectionKey === 3 || sectionKey === 4) {
        var config = SECTION_QUIZ_CONFIG[sectionKey];
        titleEl.textContent = config.title;
        if (footerEl)
            footerEl.style.display = 'none';
        customQuizErrors = 0;
        customQuizItemErrors = Array(config.totalItems).fill(0);
        customQuiz1Matches = {};
        config.terms.forEach(function (t) {
            customQuiz1Matches[t.id] = null;
        });
        customQuiz2CurrentIndex = 0;
        customQuizIncorrectExos.clear();
        selectedDraggableId = null;
        bodyEl.innerHTML = "\n            <div class=\"quiz-split-container\">\n              <div class=\"quiz-left-panel\" id=\"quiz-left-panel\"></div>\n              <div class=\"quiz-right-panel\">\n                <div class=\"gauge-container\">\n                  <svg class=\"gauge-svg\" viewBox=\"0 0 100 100\">\n                    <circle class=\"gauge-bg\" cx=\"50\" cy=\"50\" r=\"45\"></circle>\n                    <circle class=\"gauge-fill\" id=\"quiz-gauge-fill\" cx=\"50\" cy=\"50\" r=\"45\"></circle>\n                    <g id=\"quiz-gauge-ticks\"></g>\n                  </svg>\n                  <div class=\"gauge-text\">\n                    <span class=\"gauge-percent\" id=\"quiz-gauge-percent\">100%</span>\n                    <span class=\"gauge-score\" id=\"quiz-gauge-score\">" + config.totalItems + "/" + config.totalItems + "</span>\n                  </div>\n                </div>\n                <div class=\"gauge-info-text\" id=\"quiz-gauge-status\">Required threshold : 80%</div>\n                <button class=\"btn-quit-quiz\" onclick=\"closeAllModals()\">\n                  \uD83D\uDEAA Back to exercises\n                </button>\n              </div>\n            </div>\n        ";
        initCustomQuizTicks();
        updateCustomQuizGauge();
        renderCustomQuiz1Matching();
    }
    else {
        if (footerEl)
            footerEl.style.display = 'flex';
        var quiz = QUIZZES[sectionKey];
        titleEl.textContent = quiz.title;
        bodyEl.innerHTML = '';
        quiz.questions.forEach(function (qObj, qIdx) {
            var qDiv = document.createElement('div');
            qDiv.className = 'quiz-question';
            qDiv.innerHTML = "<p>" + (qIdx + 1) + ". " + qObj.q + "</p>";
            var optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';
            qObj.options.forEach(function (opt, optIdx) {
                var optBtn = document.createElement('div');
                optBtn.className = 'quiz-option';
                optBtn.id = "q-" + qIdx + "-opt-" + optIdx;
                optBtn.textContent = opt;
                optBtn.onclick = function () { return selectQuizOption(qIdx, optIdx); };
                optionsDiv.appendChild(optBtn);
            });
            qDiv.appendChild(optionsDiv);
            bodyEl.appendChild(qDiv);
        });
    }
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-quiz').style.display = 'block';
}
function selectQuizOption(qIdx, optionIdx) {
    var quiz = QUIZZES[activeQuizSection];
    var qObj = quiz.questions[qIdx];
    qObj.options.forEach(function (_, optIdx) {
        var el = document.getElementById("q-" + qIdx + "-opt-" + optIdx);
        if (el)
            el.classList.remove('selected');
    });
    var selectedEl = document.getElementById("q-" + qIdx + "-opt-" + optionIdx);
    if (selectedEl)
        selectedEl.classList.add('selected');
    activeQuizAnswers[qIdx] = optionIdx;
}
function submitQuiz() {
    var quiz = QUIZZES[activeQuizSection];
    var allCorrect = true;
    var fallbackExo = null;
    quiz.questions.forEach(function (qObj, qIdx) {
        var userAnswer = activeQuizAnswers[qIdx];
        if (userAnswer !== qObj.answer) {
            allCorrect = false;
            if (fallbackExo === null) {
                fallbackExo = qObj.fallbackExo;
            }
        }
    });
    closeAllModals();
    if (allCorrect) {
        localStorage.setItem("quiz_section_" + activeQuizSection + "_completed", 'true');
        showToast("\uD83C\uDF89 F\u00E9licitations ! Quiz de la section " + activeQuizSection + " valid\u00E9.", true);
        applyFilters();
    }
    else {
        showToast("\u274C Certaines r\u00E9ponses sont incorrectes. R\u00E9visez le cours.", false);
        if (fallbackExo) {
            setTimeout(function () {
                alert("Pour mieux comprendre vos erreurs, nous vous conseillons de r\u00E9viser l'exercice " + fallbackExo + ".");
                var link = EXERCISE_LINKS[fallbackExo];
                if (link)
                    window.location.href = link;
            }, 1000);
        }
    }
}
function renderCustomQuiz1Matching() {
    var leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel)
        return;
    leftPanel.innerHTML = "\n        <h4 style=\"margin:0; font-size:16px; color:#fff; font-weight: 700;\">Quiz 1 : Match les termes et leurs d\u00E9finitions</h4>\n        <p style=\"margin:4px 0 16px 0; font-size:12.5px; color:#94a3b8; line-height:1.4;\">\n            Glissez-d\u00E9posez les termes bleus dans les zones pointill\u00E9es correspondantes, ou cliquez sur un terme puis sur sa zone cible.\n        </p>\n        \n        <div class=\"matching-deck\" id=\"matching-deck\"></div>\n        <div class=\"matching-targets\" id=\"matching-targets\"></div>\n        <div class=\"quiz-feedback-box\" id=\"quiz-feedback-box\" style=\"display:none; margin-top: 15px;\">\n            <span class=\"feedback-icon\" id=\"feedback-icon\"></span>\n            <span class=\"feedback-text\" id=\"feedback-text\"></span>\n        </div>\n    ";
    var deck = document.getElementById('matching-deck');
    var targetsContainer = document.getElementById('matching-targets');
    if (!deck || !targetsContainer)
        return;
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var terms = config.terms;
    var targets = config.targets;
    var shuffledTerms = terms.slice().sort(function () { return Math.random() - 0.5; });
    shuffledTerms.forEach(function (t) {
        var item = document.createElement('div');
        item.className = 'draggable-item';
        item.id = "drag-" + t.id;
        item.textContent = t.name;
        item.draggable = true;
        item.ondragstart = function (e) {
            e.dataTransfer.setData('text/plain', t.id);
            item.classList.add('dragging');
        };
        item.ondragend = function () {
            item.classList.remove('dragging');
        };
        item.onclick = function (e) {
            e.stopPropagation();
            document.querySelectorAll('.draggable-item').forEach(function (el) {
                el.style.border = '1px solid rgba(255, 255, 255, 0.15)';
            });
            if (selectedDraggableId === t.id) {
                selectedDraggableId = null;
            }
            else {
                selectedDraggableId = t.id;
                item.style.border = '2px solid #3b82f6';
            }
        };
        deck.appendChild(item);
    });
    var shuffledTargets = targets.slice().sort(function () { return Math.random() - 0.5; });
    shuffledTargets.forEach(function (tgt) {
        var row = document.createElement('div');
        row.className = 'matching-target-row';
        row.id = "row-" + tgt.id;
        row.innerHTML = "\n            <div class=\"matching-zone\" id=\"zone-" + tgt.id + "\">D\u00E9pose ici</div>\n            <div class=\"matching-definition\">" + tgt.def + "</div>\n        ";
        var zone = row.querySelector("#zone-" + tgt.id);
        zone.ondragover = function (e) {
            e.preventDefault();
            zone.classList.add('dragover');
        };
        zone.ondragleave = function () {
            zone.classList.remove('dragover');
        };
        zone.ondrop = function (e) {
            e.preventDefault();
            zone.classList.remove('dragover');
            var termId = e.dataTransfer.getData('text/plain');
            handleMatchingDrop(termId, tgt.id, tgt.jalonIndex, tgt.fallbackExo);
        };
        row.onclick = function () {
            if (selectedDraggableId) {
                handleMatchingDrop(selectedDraggableId, tgt.id, tgt.jalonIndex, tgt.fallbackExo);
                selectedDraggableId = null;
                document.querySelectorAll('.draggable-item').forEach(function (el) {
                    el.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                });
            }
        };
        targetsContainer.appendChild(row);
    });
}
function handleMatchingDrop(termId, targetId, jalonIndex, fallbackExo) {
    if (customQuiz1Matches[targetId] !== null)
        return;
    var row = document.getElementById("row-" + targetId);
    var zone = document.getElementById("zone-" + targetId);
    var dragItem = document.getElementById("drag-" + termId);
    if (!row || !zone || !dragItem)
        return;
    if (termId === targetId) {
        customQuiz1Matches[targetId] = termId;
        zone.textContent = dragItem.textContent;
        zone.style.background = 'rgba(16, 185, 129, 0.1)';
        zone.style.border = '2px solid #10B981';
        zone.style.color = '#10B981';
        row.classList.add('correct');
        dragItem.style.display = 'none';
        updateTickColor(jalonIndex, customQuizItemErrors[jalonIndex] === 0);
        var allMatched = Object.values(customQuiz1Matches).every(function (v) { return v !== null; });
        if (allMatched) {
            var feedbackBox = document.getElementById('quiz-feedback-box');
            if (feedbackBox) {
                feedbackBox.style.display = 'flex';
                feedbackBox.className = 'quiz-feedback-box correct';
                if (activeQuizSection === 4) {
                    feedbackBox.innerHTML = "\n                        <span class=\"feedback-icon\">\uD83C\uDF89</span>\n                        <span class=\"feedback-text\">Excellent ! Quiz compl\u00E9t\u00E9 avec succ\u00E8s. Calcul des r\u00E9sultats...</span>\n                    ";
                }
                else {
                    feedbackBox.innerHTML = "\n                        <span class=\"feedback-icon\">\uD83C\uDF89</span>\n                        <span class=\"feedback-text\">Excellent ! Quiz 1 compl\u00E9t\u00E9 avec succ\u00E8s. Moving to Quiz 2 in 2 seconds...</span>\n                    ";
                }
            }
            setTimeout(function () {
                if (activeQuizSection === 4) {
                    renderCustomQuizResults();
                }
                else {
                    renderCustomQuiz2Sorting();
                }
            }, 2000);
        }
    }
    else {
        customQuizErrors++;
        customQuizItemErrors[jalonIndex]++;
        customQuizIncorrectExos.add(fallbackExo);
        row.classList.add('incorrect');
        updateCustomQuizGauge();
        setTimeout(function () {
            row.classList.remove('incorrect');
        }, 500);
    }
}
function renderCustomQuiz2Sorting() {
    var leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel)
        return;
    customQuiz2CurrentIndex = 0;
    selectedDraggableId = null;
    leftPanel.innerHTML = "\n        <h4 style=\"margin:0; font-size:20px; color:#fff; font-weight: 700;\">Quiz 2 : True Or False ?</h4>\n        <p style=\"margin:4px 0 16px 0; font-size:15px; color:#94a3b8; line-height:1.4;\">\n            Drag and drop each statement into the TRUE or FALSE zone, or click on a card and then on a zone.\n        </p>\n\n        <div class=\"dragdrop-source\" id=\"dragdrop-source\"></div>\n\n        <div class=\"dragdrop-drop-zones\">\n            <div class=\"dragdrop-drop-zone drop-zone-true\" id=\"drop-zone-true\">\n                <div class=\"dragdrop-zone-header true-header\">\uD83D\uDC4D TRUE</div>\n                <div class=\"dragdrop-zone-cards\" id=\"dropped-true-cards\"></div>\n            </div>\n            <div class=\"dragdrop-drop-zone drop-zone-false\" id=\"drop-zone-false\">\n                <div class=\"dragdrop-zone-header false-header\">\uD83D\uDC4E FALSE</div>\n                <div class=\"dragdrop-zone-cards\" id=\"dropped-false-cards\"></div>\n            </div>\n        </div>\n    ";
    var rightPanel = document.querySelector('.quiz-right-panel');
    if (rightPanel) {
        var feedbackArea = document.getElementById('quiz2-feedback-area');
        if (!feedbackArea) {
            feedbackArea = document.createElement('div');
            feedbackArea.id = 'quiz2-feedback-area';
            feedbackArea.className = 'quiz2-feedback-area';
            rightPanel.appendChild(feedbackArea);
        }
        feedbackArea.innerHTML = '<span style="color:#64748b; font-size:13px;">Drop a card here to see feedback.</span>';
    }
    var source = document.getElementById('dragdrop-source');
    if (!source)
        return;
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var shuffledIndices = config.statements.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; });
    shuffledIndices.forEach(function (idx) {
        var stmt = config.statements[idx];
        var card = document.createElement('div');
        card.className = 'drag-statement-card';
        card.id = "stmt-card-" + idx;
        card.draggable = true;
        card.textContent = stmt.text;
        card.setAttribute('data-idx', idx.toString());
        card.ondragstart = function (e) {
            e.dataTransfer.setData('text/plain', idx.toString());
            card.classList.add('dragging');
        };
        card.ondragstart = function (e) {
            e.dataTransfer.setData('text/plain', idx.toString());
            card.classList.add('dragging');
        };
        card.ondragend = function () {
            card.classList.remove('dragging');
        };
        card.onclick = function (e) {
            e.stopPropagation();
            if (card.classList.contains('placed'))
                return;
            document.querySelectorAll('.drag-statement-card:not(.placed)').forEach(function (el) {
                el.classList.remove('selected-stmt');
            });
            if (selectedDraggableId === idx.toString()) {
                selectedDraggableId = null;
            }
            else {
                selectedDraggableId = idx.toString();
                card.classList.add('selected-stmt');
            }
        };
        source.appendChild(card);
    });
    setupQuiz2DropZone('drop-zone-true', true);
    setupQuiz2DropZone('drop-zone-false', false);
}
function setupQuiz2DropZone(zoneId, isTrue) {
    var zone = document.getElementById(zoneId);
    if (!zone)
        return;
    zone.ondragover = function (e) {
        e.preventDefault();
        zone.classList.add('dragover');
    };
    zone.ondragleave = function () {
        zone.classList.remove('dragover');
    };
    zone.ondrop = function (e) {
        e.preventDefault();
        zone.classList.remove('dragover');
        var stmtIdx = parseInt(e.dataTransfer.getData('text/plain'));
        if (!isNaN(stmtIdx)) {
            handleQuiz2Drop(stmtIdx, isTrue);
        }
    };
    zone.onclick = function () {
        if (selectedDraggableId !== null) {
            var stmtIdx = parseInt(selectedDraggableId);
            if (!isNaN(stmtIdx)) {
                handleQuiz2Drop(stmtIdx, isTrue);
            }
            selectedDraggableId = null;
            document.querySelectorAll('.drag-statement-card').forEach(function (el) {
                el.classList.remove('selected-stmt');
            });
        }
    };
}
function handleQuiz2Drop(stmtIdx, chosenTrue) {
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var statement = config.statements[stmtIdx];
    if (!statement)
        return;
    var card = document.getElementById("stmt-card-" + stmtIdx);
    if (!card || card.classList.contains('placed'))
        return;
    var isCorrect = chosenTrue === statement.isTrue;
    var jalonIndex = config.terms.length + stmtIdx;
    var targetCards = document.getElementById(chosenTrue ? 'dropped-true-cards' : 'dropped-false-cards');
    if (targetCards) {
        card.classList.add('placed');
        card.draggable = false;
        card.classList.remove('selected-stmt', 'dragging');
        if (isCorrect) {
            card.classList.add('correct-placed');
        }
        else {
            card.classList.add('incorrect-placed');
        }
        targetCards.appendChild(card);
    }
    if (isCorrect) {
        updateTickColor(jalonIndex, true);
    }
    else {
        customQuizErrors++;
        customQuizItemErrors[jalonIndex]++;
        customQuizIncorrectExos.add(statement.fallbackExo);
        updateCustomQuizGauge();
        updateTickColor(jalonIndex, false);
    }
    var feedbackArea = document.getElementById('quiz2-feedback-area');
    if (feedbackArea) {
        feedbackArea.className = "quiz2-feedback-area " + (isCorrect ? 'fb-correct' : 'fb-incorrect');
        feedbackArea.innerHTML = "\n            <div class=\"quiz2-fb-icon\">" + (isCorrect ? '✅' : '❌') + "</div>\n            <div class=\"quiz2-fb-text\">" + (isCorrect ? 'Correct !' : 'Faux !') + " " + statement.feedback + "</div>\n        ";
    }
    var totalPlaced = document.querySelectorAll('.drag-statement-card.placed').length;
    if (totalPlaced === config.statements.length) {
        setTimeout(function () {
            renderCustomQuizResults();
        }, 2500);
    }
}
function loadNextSortingStatement() { }
function handleSortingDecision(chosenTrue) { }
function startFireworks() {
    var canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    window.addEventListener('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    var particles = [];
    var colors = ['#FF034D', '#FACC15', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'];
    var Particle = (function () {
        function Particle(x, y, color) {
            this.x = x;
            this.y = y;
            var angle = Math.random() * Math.PI * 2;
            var speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
            this.color = color;
            this.size = Math.random() * 3 + 2;
        }
        Particle.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
        };
        Particle.prototype.draw = function () {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };
        return Particle;
    }());
    var Firework = (function () {
        function Firework() {
            this.x = Math.random() * width;
            this.y = height;
            this.tx = Math.random() * width;
            this.ty = Math.random() * (height * 0.5);
            var angle = Math.atan2(this.ty - this.y, this.tx - this.x);
            var speed = Math.random() * 5 + 10;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
        }
        Firework.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            if (this.vy >= 0 || this.y <= this.ty) {
                this.explode();
                this.exploded = true;
            }
        };
        Firework.prototype.explode = function () {
            var count = Math.floor(Math.random() * 40) + 60;
            for (var i = 0; i < count; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        };
        Firework.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        };
        return Firework;
    }());
    var fireworks = [];
    var active = true;
    var interval = setInterval(function () {
        if (!active)
            return;
        fireworks.push(new Firework());
    }, 300);
    setTimeout(function () {
        active = false;
        clearInterval(interval);
        setTimeout(function () {
            canvas.remove();
        }, 3000);
    }, 6000);
    function loop() {
        ctx.clearRect(0, 0, width, height);
        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            }
            else {
                fireworks[i].draw();
            }
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
            else {
                particles[i].draw();
            }
        }
        if (active || fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(loop);
        }
    }
    loop();
}
function renderCustomQuizResults() {
    var leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel)
        return;
    var config = SECTION_QUIZ_CONFIG[activeQuizSection];
    var total = config ? config.totalItems : 13;
    var score = Math.max(0, total - customQuizErrors);
    var percent = Math.round((score / total) * 100);
    var passed = percent >= 80;
    if (passed) {
        localStorage.setItem("quiz_section_" + activeQuizSection + "_completed", 'true');
        try {
            startFireworks();
        }
        catch (e) {
            console.error(e);
        }
        leftPanel.innerHTML = "\n            <div style=\"text-align: center; padding: 20px 0;\">\n                <span style=\"font-size: 64px; display: block; margin-bottom: 15px; animation: bounce 1s infinite alternate;\">\uD83C\uDFC6</span>\n                <h3 style=\"font-size: 22px; font-weight: 800; color: #10B981; margin: 0 0 10px 0;\">Section " + activeQuizSection + " Valid\u00E9e !</h3>\n                <p style=\"font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0 0 24px 0;\">\n                    F\u00E9licitations, vous avez obtenu un score de <strong>" + score + "/" + total + " (" + percent + "%)</strong>. \n                    Vous ma\u00EEtrisez parfaitement les concepts de cette section ! Le parcours suivant est d\u00E9bloqu\u00E9.\n                </p>\n                <button class=\"btn-start\" onclick=\"closeAndApplyFilters()\" style=\"background:#10B981; padding: 12px 36px; font-size: 15px; font-weight:700; border-radius:12px;\">\n                    Continue the Path\n                </button>\n            </div>\n        ";
    }
    else {
        var recommendationHTML_1 = '';
        if (customQuizIncorrectExos.size > 0) {
            recommendationHTML_1 = "\n                <div style=\"text-align: left; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 15px; margin: 20px 0;\">\n                    <h5 style=\"margin: 0 0 8px 0; color: #ef4444; font-size: 13.5px; font-weight: 700;\">\uD83D\uDCDA Recommandations de r\u00E9vision (V3) :</h5>\n                    <p style=\"margin: 0 0 10px 0; font-size: 12px; color: #94a3b8; line-height: 1.4;\">\n                        En analysant vos erreurs, nous vous conseillons vivement de refaire les exercices suivants pour ma\u00EEtriser ces concepts :\n                    </p>\n                    <ul style=\"margin: 0; padding-left: 20px; font-size: 12.5px; color: #cbd5e1; line-height: 1.6;\">\n            ";
            customQuizIncorrectExos.forEach(function (exId) {
                var exoObj = EXERCISES.find(function (e) { return e.id === exId; });
                var exoTitle = exoObj ? exoObj.title : "Exercice " + exId;
                recommendationHTML_1 += "<li>" + exoTitle + "</li>";
            });
            recommendationHTML_1 += "\n                    </ul>\n                </div>\n            ";
        }
        leftPanel.innerHTML = "\n            <div style=\"text-align: center; padding: 20px 0;\">\n                <span style=\"font-size: 64px; display: block; margin-bottom: 15px;\">\u274C</span>\n                <h3 style=\"font-size: 22px; font-weight: 800; color: #FF034D; margin: 0 0 10px 0;\">Score insuffisant (" + percent + "%)</h3>\n                <p style=\"font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0 0 15px 0;\">\n                    Vous avez obtenu <strong>" + score + "/" + total + "</strong>. Le seuil requis pour valider cette section est de <strong>80% (" + Math.ceil(total * 0.8) + "/" + total + ")</strong>.\n                </p>\n                \n                " + recommendationHTML_1 + "\n                \n                <button class=\"btn-start\" onclick=\"openQuizModal(" + activeQuizSection + ")\" style=\"background:#FF034D; padding: 12px 36px; font-size: 15px; font-weight:700; border-radius:12px;\">\n                    Restart the Quiz\n                </button>\n            </div>\n        ";
    }
}
function closeAndApplyFilters() {
    closeAllModals();
    applyFilters();
}
function closeAllModals() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-funfact').style.display = 'none';
    document.getElementById('modal-quiz').style.display = 'none';
}
function showToast(message, isSuccess) {
    var toast = document.getElementById('toast');
    if (!toast)
        return;
    toast.textContent = message;
    toast.style.background = isSuccess ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)';
    toast.style.color = 'white';
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 4000);
}
function downloadCertificate() {
    var canvas = document.getElementById('cert-canvas');
    if (!canvas)
        return;
    var ctx = canvas.getContext('2d');
    var user = JSON.parse(localStorage.getItem('currentUser')) || { prenom: 'Étudiant', nom: 'Neural' };
    var fullName = ((user.prenom || '') + " " + (user.nom || '')).trim();
    var grad = ctx.createLinearGradient(0, 0, 800, 600);
    grad.addColorStop(0, '#0b0f1a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 760, 560);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(35, 35, 730, 530);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF SUCCESS', 400, 150);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText('This certificate is awarded to', 400, 230);
    ctx.fillStyle = '#FACC15';
    ctx.font = '800 42px Inter, sans-serif';
    ctx.fillText(fullName.toUpperCase(), 400, 300);
    ctx.fillStyle = '#eef2ff';
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText("For having successfully completed the entire learning path", 400, 370);
    ctx.fillText("and validated the final evaluation of Neural Playground.", 400, 400);
    var today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '500 14px Inter, sans-serif';
    ctx.fillText("D\u00E9livr\u00E9 le " + today, 400, 480);
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '800 22px Inter, sans-serif';
    ctx.fillText("Hi! Paris Playground", 400, 520);
    var link = document.createElement('a');
    link.download = "Certificat_HiParis_" + fullName.replace(/\s+/g, '_') + ".png";
    link.href = canvas.toDataURL();
    link.click();
}
var EXERCISE_LINKS = {
    1: '../exo1.html',
    2: '../exo2.html',
    3: '../exo3.html',
    4: '../exo4.html',
    5: '../exo5.html',
    6: '../exo6.html',
    7: '../exo7.html',
    8: '../exo8.html',
    9: '../exo9.html',
    10: '../exo10.html',
    11: '../exo11.html',
    12: '../exo12.html',
    13: '../exo13.html',
    14: '../exo14.html',
    15: '../exo15.html',
    16: '../exo16.html',
    17: '../exo17.html'
};
function startExercise(id, title, isCustom) {
    if (isCustom) {
        window.location.href = "../custom_exo_template.html?id=" + id;
        return;
    }
    var link = EXERCISE_LINKS[id];
    if (link) {
        window.location.href = link;
    }
    else {
        window.location.href = "../playground/index.html?exo=" + id;
    }
}
window.visitIntroItem = visitIntroItem;
window.openQuizModal = openQuizModal;
window.selectQuizOption = selectQuizOption;
window.submitQuiz = submitQuiz;
window.closeAllModals = closeAllModals;
window.downloadCertificate = downloadCertificate;
window.showFunFact = showFunFact;
window.closeAndApplyFilters = closeAndApplyFilters;
loadAndRender();
var backgroundContainer = document.getElementById('background-container');
var formulas = [
    '\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c',
    '\\frac{dy}{dx}', '\\lim_{x \\to \\infty}', '\\binom{n}{k}',
    '\\alpha', '\\beta', '\\gamma', '\\delta', '\\epsilon', '\\zeta', '\\eta', '\\theta',
    '\\sin(t)', '\\cos(t)', 'e^{-t}', 't^2',
    'x(t) = r \\cos(t), y(t) = r \\sin(t)'
];
var numFormulas = 25;
var numNeurons = 30;
var numConnections = 50;
var neurons = [];
var connections = [];
var formulasElements = [];
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function createAnimatedElement(type, elementClass, styleProperties) {
    if (styleProperties === void 0) { styleProperties = {}; }
    var element = document.createElement('div');
    element.className = elementClass;
    element.style.position = 'absolute';
    Object.assign(element.style, styleProperties);
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = "clamp(" + getRandom(0.8, 1.2) + "rem, " + getRandom(3, 7) + "vw, " + getRandom(2, 4) + "rem)";
        element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = "rgba(255, 255, 255, " + element.style.opacity + ")";
        element.style.left = getRandom(-20, 120) + "vw";
        element.style.top = getRandom(-20, 120) + "vh";
        element.style.transform = "rotate(" + getRandom(-30, 30) + "deg)";
        formulasElements.push(element);
    }
    else if (type === 'neuron') {
        element.style.width = getRandom(10, 25) + "px";
        element.style.height = element.style.width;
        element.style.backgroundColor = "hsl(" + getRandom(190, 250) + ", 70%, 50%)";
        element.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px " + element.style.backgroundColor;
        element.style.left = getRandom(-10, 110) + "vw";
        element.style.top = getRandom(-10, 110) + "vh";
        element.style.opacity = 0;
        element.style.transform = 'scale(0)';
        neurons.push({ element: element, size: parseFloat(element.style.width), x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
    return element;
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
function initializeBackground() {
    for (var i = 0; i < numFormulas; i++) {
        createAnimatedElement('formula', "math-formula formula-" + (i + 1), {
            animationDuration: getRandom(20, 40) + "s",
            animationDelay: getRandom(-10, 0) + "s"
        });
    }
    for (var i = 0; i < numNeurons; i++) {
        createAnimatedElement('neuron', "neuron neuron-" + i);
    }
    for (var i = 0; i < numConnections; i++) {
        if (neurons.length < 2)
            continue;
        var n1 = neurons[Math.floor(Math.random() * neurons.length)];
        var n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2) {
            createConnection(n1, n2);
        }
    }
}
function animateBackground() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    formulasElements.forEach(function (formula) {
        var currentX = parseFloat(formula.style.left);
        var currentY = parseFloat(formula.style.top);
        formula.style.transform = "translate(" + (currentX + Math.sin(Date.now() * 0.0001) * 5) + "px, " + (currentY + Math.cos(Date.now() * 0.0001) * 5) + "px) rotate(" + (parseFloat(formula.style.transform.split(' ')[1].replace('rotate(', '').replace('deg)', '')) + Math.sin(Date.now() * 0.0002) * 0.1) + "deg)";
        if (currentX > windowWidth * 1.1)
            formula.style.left = getRandom(-20, 0) + "vw";
        if (currentX < -windowWidth * 0.1)
            formula.style.left = getRandom(windowWidth, windowWidth * 1.2) + "vw";
        if (currentY > windowHeight * 1.1)
            formula.style.top = getRandom(-20, 0) + "vh";
        if (currentY < -windowHeight * 0.1)
            formula.style.top = getRandom(windowHeight, windowHeight * 1.2) + "vh";
    });
    var time = Date.now() * 0.0005;
    neurons.forEach(function (neuron, index) {
        var element = neuron.element;
        var angle = index * (2 * Math.PI / numNeurons) + time;
        var radius = Math.min(windowWidth, windowHeight) * 0.3;
        var targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        var targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        var appearanceFactor = Math.min(1, Math.max(0, (time * 2 - index * 0.1)));
        element.style.opacity = neuron.opacity = Math.max(neuron.opacity, appearanceFactor * 0.1);
        element.style.transform = "scale(" + (neuron.scale = Math.max(neuron.scale, appearanceFactor)) + ") rotate(" + appearanceFactor * 10 + "deg)";
        element.style.left = (neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)) + "px";
        element.style.top = (neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)) + "px";
    });
    connections.forEach(function (conn, index) {
        var timeFactor = Date.now() * 0.0001;
        var appearanceFactor = Math.min(1, Math.max(0, (timeFactor * 2 - neurons.findIndex(function (n) { return n.element === conn.neuron1.element; }) * 0.1)));
        conn.element.style.opacity = conn.opacity = Math.max(conn.opacity, appearanceFactor * 0.3);
        conn.element.style.transform = "scale(" + appearanceFactor * 1.1 + ")";
        var connElem = conn.element, neuron1 = conn.neuron1, neuron2 = conn.neuron2;
        var rect1 = neuron1.element.getBoundingClientRect();
        var rect2 = neuron2.element.getBoundingClientRect();
        var x1 = neuron1.x + neuron1.size / 2;
        var y1 = neuron1.y + neuron1.size / 2;
        var x2 = neuron2.x + neuron2.size / 2;
        var y2 = neuron2.y + neuron2.size / 2;
        var length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        connElem.style.width = length + "px";
        connElem.style.left = x1 + "px";
        connElem.style.top = y1 + "px";
        connElem.style.transform = "rotate(" + angle + "deg) scale(" + appearanceFactor + ")";
        var pulse = 1 + Math.sin(timeFactor * 2 + index * 0.2) * 0.1;
        connElem.style.transform = "rotate(" + angle + "deg) scale(" + appearanceFactor * pulse + ")";
    });
    requestAnimationFrame(animateBackground);
}
function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}
initializeBackground();
animateBackground();
var resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        connections.forEach(function (conn) { return conn.element.remove(); });
        connections = [];
        if (neurons.length >= 2) {
            for (var i = 0; i < numConnections; i++) {
                var n1 = neurons[Math.floor(Math.random() * neurons.length)];
                var n2 = neurons[Math.floor(Math.random() * neurons.length)];
                if (n1 !== n2) {
                    createConnection(n1, n2);
                }
            }
        }
    }, 100);
});
applyFilters();
window.startExercise = startExercise;
window.filterCards = filterCards;
window.setFilter = setFilter;
window.deleteCommunityExo = deleteCommunityExo;

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const openQuiz = urlParams.get('openQuiz');
    if (openQuiz) {
        setTimeout(() => {
            if (typeof window.openQuizModal === 'function') {
                window.openQuizModal(parseInt(openQuiz, 10));
            }
        }, 800);
    }
});
