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
        visitorBtn_1.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span > ';
        container.appendChild(visitorBtn_1);
        return;
    }
    var initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;';
    avatar.innerText = initiales.toUpperCase();
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var count, r, res, data, res, subs, badge, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    count = 0;
                    r = (user.role || user.profil || '').toUpperCase();
                    if (!(r.includes('TEACH') || r.includes('ENS'))) return [3, 3];
                    return [4, fetch("/api/submissions/teacher/" + user.id + "/count", { headers: { 'x-user-email': user.email } })];
                case 1:
                    res = _a.sent();
                    return [4, res.json()];
                case 2:
                    data = _a.sent();
                    count = data.count || 0;
                    return [3, 6];
                case 3: return [4, fetch("/api/submissions/student/" + user.id)];
                case 4:
                    res = _a.sent();
                    return [4, res.json()];
                case 5:
                    subs = _a.sent();
                    count = subs.filter(function (s) { return s.status !== 'PENDING'; }).length;
                    _a.label = 6;
                case 6:
                    if (count > 0) {
                        badge = document.createElement('span');
                        badge.style.cssText = 'position:absolute; top:-5px; right:-5px; background:#ef4444; color:white; border-radius:50%; width:18px; height:18px; font-size:10px; display:flex; align-items:center; justify-content:center; border:2px solid #0f172a; font-weight:800; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);';
                        badge.innerText = count;
                        avatar.appendChild(badge);
                    }
                    return [3, 8];
                case 7:
                    e_1 = _a.sent();
                    console.error("Badge error:", e_1);
                    return [3, 8];
                case 8: return [2];
            }
        });
    }); })();
    avatar.onmouseover = function () { return avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
    avatar.onmouseout = function () { return avatar.style.transform = 'scale(1) rotate(0deg)'; };
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCCA</span> Mon Historique\n          </a>\n          <a href=\"../statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCC8</span> Mes Statistiques\n          </a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;\" onmouseover=\"this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDEAA</span> D\u00E9connexion\n          </div>\n        </div>\n      ";
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
        id: 1, icon: '🧠', title: ' Exercice 1 : Modification des poids.',
        desc: 'Montrer que la régression logisitque peut être fait simplement, "à la main", et introduction de l\'objectif de la session',
        difficulty: 'easy', category: 'Fondamentaux', duration: '15 min', questions: 8
    },
    {
        id: 2, icon: '📊', title: 'Exercice 2 : Lancer un entrainement.',
        desc: 'Comprenez comment un réseau apprend en minimisant la fonction de perte.',
        difficulty: 'easy', category: 'Optimisation', duration: '20 min', questions: 10
    },
    {
        id: 3, icon: '🔢', title: 'Exercice 3+5 : Classification des données circulaires.',
        desc: 'Découvrez les limites d\'un modèle linéaire simple sur des données circulaires, puis utilisez des caractéristiques quadratiques (X² et Y²) pour réussir.',
        difficulty: 'easy', category: 'Fondamentaux', duration: '15 min', questions: 6
    },
    {
        id: 4, icon: '⚡', title: 'Exercice 4 : Modifiaction du Biais.',
        desc: 'Apprendre à coder la rétropropagation, et comprendre comment le réseau apprend.',
        difficulty: 'easy', category: 'Algorithmes', duration: '25 min', questions: 12
    },
    {
        id: 5, icon: '🌀', title: 'Exercice 5 : Entrainement avec des feautures plus complexes.',
        desc: 'Comprendre que sans couche caché, mais avec des featrues plus coplexes, on peut apprendre des relations non linéaires.',
        difficulty: 'medium', category: 'Optimisation', duration: '18 min', questions: 9
    },
    {
        id: 6, icon: '🔵', title: 'Exercice 6 : Entrainer un modèle avec des couches cachées.',
        desc: 'Comprendre la notion d\'apprentissage de features.',
        difficulty: 'medium', category: 'Fondamentaux', duration: '20 min', questions: 12
    },
    {
        id: 7, icon: '🤖', title: 'Exercice 7 : Tester les fonctions d\'activation.',
        desc: 'Comprendre la notion de fonction d\'activation.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 8, icon: '🤖', title: 'Exercice 8 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 9, icon: '🤖', title: 'Exercice 9 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'medium', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 10, icon: '🤖', title: 'Exercice 10 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 11, icon: '🤖', title: 'Exercice 11 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 12, icon: '🤖', title: 'Exercice 12 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 13, icon: '🤖', title: 'Exercice 13 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 14, icon: '🤖', title: 'Exercice 14 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 15, icon: '🤖', title: 'Exercice 15 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 16, icon: '🤖', title: 'Exercice 16 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    },
    {
        id: 17, icon: '🤖', title: 'Exercice 17 : Lancer deux fois de suite un entrainement et récupérer ces paramètres.',
        desc: 'Lancer 2 fois l\'algo et comparer les fonction obtenues.',
        difficulty: 'hard', category: 'Architectures', duration: '45 min', questions: 20
    }
];
var DIFF_LABEL = { easy: 'Facile', medium: 'Intermédiaire', hard: 'Difficile' };
var currentFilter = 'tous';
var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
var isTeacher = (user.role || user.profil || '').toLowerCase() === 'enseignant';
function renderCards(gridId, list, sectionId) {
    var grid = document.getElementById(gridId);
    var section = document.getElementById(sectionId);
    grid.innerHTML = '';
    if (!list.length) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    list.forEach(function (ex, i) {
        var card = document.createElement('div');
        card.className = "ex-card " + ex.difficulty;
        var deleteBtn = '';
        if (isTeacher && ex.isCustom) {
            deleteBtn = "<button class=\"btn-delete-exo\" onclick=\"event.stopPropagation(); deleteCommunityExo(" + ex.id + ")\" title=\"Supprimer l'exercice\">\n            <span class=\"material-icons\" style=\"font-size:18px; pointer-events: none;\">delete_forever</span>\n          </button>";
        }
        card.innerHTML = "\n          <div class=\"card-top\">\n            <div class=\"card-icon\">" + ex.icon + "</div>\n            <div style=\"display:flex; align-items:center; gap:8px;\">\n               " + deleteBtn + "\n               <span class=\"badge " + ex.difficulty + "\">" + DIFF_LABEL[ex.difficulty] + "</span>\n            </div>\n          </div>\n          <div class=\"category-tag\">" + ex.category + "</div>\n          <div class=\"card-title\">" + ex.title + "</div>\n          <div class=\"card-desc\">" + ex.desc + "</div>\n          <div class=\"card-footer\">\n            <div class=\"card-meta\">\n               <div class=\"meta-item\">\uD83D\uDD52 " + ex.duration + "</div>\n               <div class=\"meta-item\">\u2753 " + ex.questions + "</div>\n            </div>\n            <button class=\"btn-start\" onclick=\"startExercise(" + ex.id + ", '" + ex.title.replace(/'/g, "\\'") + "', " + !!ex.isCustom + ")\">\n              Commencer \u2192\n            </button>\n          </div>\n        ";
        grid.appendChild(card);
    });
}
function deleteCommunityExo(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet exercice du catalogue ?"))
        return;
    var official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
    official = official.filter(function (exo) { return exo.id !== id; });
    localStorage.setItem('official_custom_exercises', JSON.stringify(official));
    applyFilters();
    alert("L'exercice a été retiré du catalogue.");
}
function setFilter(diff, btn) {
    currentFilter = diff;
    document.querySelectorAll('.filter-btn').forEach(function (b) { return b.classList.remove('active'); });
    if (btn)
        btn.classList.add('active');
    applyFilters();
}
function filterCards() { applyFilters(); }
function applyFilters() {
    var q = (document.getElementById('searchInput') ? .value || '' : ).toLowerCase().trim();
    var baseExercises = EXERCISES.slice();
    var customList = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
    var formattedCustoms = customList.map(function (exo) { return ({
        id: exo.id, icon: '👥', title: exo.title, desc: exo.description,
        difficulty: 'easy', category: 'Communauté', duration: 'Auto', questions: '?', isCustom: true
    }); });
    var fullList = baseExercises.concat(formattedCustoms);
    if (currentFilter !== 'tous') {
        fullList = fullList.filter(function (e) { return e.difficulty === currentFilter; });
    }
    if (q) {
        fullList = fullList.filter(function (e) {
            return e.title.toLowerCase().includes(q) ||
                e.desc.toLowerCase().includes(q) ||
                e.category.toLowerCase().includes(q);
        });
    }
    var statTotalValue = document.getElementById('statTotal');
    if (statTotalValue)
        statTotalValue.textContent = fullList.length;
    var statEasyValue = document.getElementById('statEasy');
    if (statEasyValue)
        statEasyValue.textContent = fullList.filter(function (e) { return e.difficulty === 'easy'; }).length;
    var statMediumValue = document.getElementById('statMedium');
    if (statMediumValue)
        statMediumValue.textContent = fullList.filter(function (e) { return e.difficulty === 'medium'; }).length;
    var statHardValue = document.getElementById('statHard');
    if (statHardValue)
        statHardValue.textContent = fullList.filter(function (e) { return e.difficulty === 'hard'; }).length;
    var filteredBase = fullList.filter(function (e) { return !e.isCustom; });
    var filteredCustom = fullList.filter(function (e) { return e.isCustom; });
    renderCards('exGridBase', filteredBase, 'baseExercisesSection');
    renderCards('exGridCustom', filteredCustom, 'customExercisesSection');
    var empty = document.getElementById('emptyState');
    if (fullList.length === 0) {
        empty.classList.add('visible');
    }
    else {
        empty.classList.remove('visible');
    }
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
applyFilters();
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
    connections.forEach(function (conn) {
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
