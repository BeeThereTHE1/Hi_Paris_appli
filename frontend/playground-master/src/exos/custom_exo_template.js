var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
function initProfileWidget() {
    return __awaiter(this, void 0, void 0, function () {
        var container, isLoggedIn, currentUserStr, currentUser, initials, role, badgeHtml, res, count, res, subs, feedbackCount, e_1, avatar, menu, typeProfil, isOpen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.getElementById('widget-profil-header');
                    if (!container)
                        return [2];
                    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    currentUserStr = localStorage.getItem('currentUser');
                    currentUser = null;
                    try {
                        currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
                    }
                    catch (e) {
                        console.error(e);
                    }
                    if (!isLoggedIn || !currentUser || !currentUser.email) {
                        container.innerHTML = "<a href=\"Page-demo/login_with_catalog.html\" class=\"btn-header\">Connexion</a>";
                        return [2];
                    }
                    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
                    initials = (((currentUser.prenom || "")[0] || "") + ((currentUser.nom || "")[0] || "")).toUpperCase() || "U";
                    role = (currentUser.role || currentUser.profil || 'étudiant').toUpperCase();
                    badgeHtml = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    if (!(role.includes('TEACH') || role.includes('ENS'))) return [3, 4];
                    return [4, fetch("/api/submissions/teacher/" + currentUser.id + "/count", { headers: { 'x-user-email': currentUser.email } })];
                case 2:
                    res = _a.sent();
                    return [4, res.json()];
                case 3:
                    count = (_a.sent()).count;
                    if (count > 0)
                        badgeHtml = "<span class=\"badge-notif\">" + count + "</span>";
                    return [3, 7];
                case 4: return [4, fetch("/api/submissions/student/" + currentUser.id)];
                case 5:
                    res = _a.sent();
                    return [4, res.json()];
                case 6:
                    subs = _a.sent();
                    feedbackCount = subs.filter(function (s) { return s.status !== 'PENDING'; }).length;
                    if (feedbackCount > 0)
                        badgeHtml = "<span class=\"badge-notif\">" + feedbackCount + "</span>";
                    _a.label = 7;
                case 7: return [3, 9];
                case 8:
                    e_1 = _a.sent();
                    console.error("Erreur badge:", e_1);
                    return [3, 9];
                case 9:
                    avatar = document.createElement('div');
                    avatar.id = 'avatar-btn';
                    avatar.style.cssText = 'position: relative; width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, rgb(16, 185, 129), rgb(59, 130, 246)); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255, 255, 255, 0.2); box-shadow: rgba(16, 185, 129, 0.4) 0px 0px 20px, rgba(255, 255, 255, 0.3) 0px 0px 10px inset; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); transform: scale(1) rotate(0deg);';
                    avatar.innerHTML = "" + initials + badgeHtml;
                    avatar.onmouseover = function () { return avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
                    avatar.onmouseout = function () { return avatar.style.transform = 'scale(1) rotate(0deg)'; };
                    menu = document.createElement('div');
                    menu.id = 'profile-menu';
                    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0px; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset; overflow: hidden; transform-origin: right top; transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';
                    typeProfil = role.includes('TEACH') || role.includes('ENS') ? 'TEACHER' : role;
                    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;\">" + currentUser.prenom + " " + currentUser.nom + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (currentUser.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCCA</span> Mon Historique\n          </a>\n          <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;\" onmouseover=\"this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDCC8</span> Mes Statistiques\n          </a>\n          <div id=\"logout-btn\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;\" onmouseover=\"this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';\" onmouseout=\"this.style.background='transparent'; this.style.transform='translateX(0)';\">\n            <span style=\"font-size: 16px;\">\uD83D\uDEAA</span> D\u00E9connexion\n          </div>\n        </div>\n      ";
                    isOpen = false;
                    avatar.onclick = function (e) {
                        e.stopPropagation();
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
                    document.addEventListener('click', function (e) {
                        if (!container.contains(e.target) && isOpen) {
                            isOpen = false;
                            menu.style.opacity = '0';
                            menu.style.transform = 'scale(0.9) translateY(-10px)';
                            menu.style.pointerEvents = 'none';
                            setTimeout(function () { return menu.style.display = 'none'; }, 300);
                        }
                    });
                    menu.querySelector('#logout-btn').onclick = function () {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('currentUser');
                        window.location.href = 'index.html';
                    };
                    container.innerHTML = '';
                    container.appendChild(avatar);
                    container.appendChild(menu);
                    return [2];
            }
        });
    });
}
document.addEventListener('click', function () {
    var menu = document.querySelector('.profile-menu');
    if (menu)
        menu.classList.remove('show');
});
var urlParams = new URLSearchParams(window.location.search);
var exoId = urlParams.get('id');
var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
var email = (user.email || '').toLowerCase();
var allOfficial = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
var allSaved = JSON.parse(localStorage.getItem("saved_exercises_" + email) || '[]');
var allPending = JSON.parse(localStorage.getItem('pending_validations') || '[]');
var allSubmitted = JSON.parse(localStorage.getItem("submitted_exercises_" + email) || '[]');
var allExos = allSaved.concat(allOfficial, allPending, allSubmitted);
var exo = null;
if (!exoId && allExos.length > 0) {
    console.warn("ID manquant dans l'URL, tentative avec le dernier exercice trouvé.");
    var lastExo = allExos[allExos.length - 1];
    if (lastExo)
        exo = lastExo;
}
if (!exo && exoId) {
    exo = allExos.find(function (e) { return e && String(e.id).trim() === String(exoId).trim(); });
}
if (!exo && exoId) {
    console.log("Recherche agressive pour l'ID:", exoId);
    Object.keys(localStorage).forEach(function (key) {
        try {
            var data = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(data)) {
                var found = data.find(function (e) { return e && String(e.id).trim() === String(exoId).trim(); });
                if (found) {
                    console.log("Exercice trouvé dans la clé :", key);
                    exo = found;
                }
            }
        }
        catch (err) {
        }
    });
}
var currentEmail = (user.email || '').toLowerCase().trim();
if (!exo && !exoId) {
    var tempCss = localStorage.getItem('custom_exo_css');
    var tempHash = localStorage.getItem('custom_exo_hash');
    if (tempCss || tempHash) {
        console.log("Mode Prévisualisation activé (données temporaires du Studio)");
        exo = {
            id: 'preview',
            title: "Prévisualisation Studio",
            description: "Ceci est un aperçu de votre configuration actuelle.",
            css: tempCss || "",
            hash: tempHash || "",
            isCustom: true,
            authorEmail: currentEmail
        };
    }
}
var isSavedDraft = exo && allSaved.some(function (e) { return String(e.id) === String(exo.id); });
var isAuthor = exo && exo.authorEmail && String(exo.authorEmail).toLowerCase().trim() === currentEmail;
var isDraft = isSavedDraft || (isAuthor && !allOfficial.some(function (e) { return String(e.id) === String(exo.id); })) || (exo && exo.id === 'preview');
console.log("--- Debug Mode Édition ---");
console.log("Email actuel:", currentEmail);
console.log("ID Exo:", exo ? exo.id : 'aucun');
console.log("Est dans les brouillons:", isSavedDraft);
console.log("Est l'auteur original:", isAuthor);
console.log("Résultat Mode Édition (isDraft):", isDraft);
console.log("--------------------------");
if (exo) {
    console.log("Exercice chargé avec succès:", exo);
    document.getElementById('page-title').innerText = exo.title || "Exercice";
    document.getElementById('display-title').innerText = exo.title || "Exercice";
    var conditionText = "";
    if (exo.quiz && exo.quiz.question) {
        conditionText = "<b>Objectif :</b> " + (exo.description || 'Non défini') + "<br><br><b>Challenge :</b> R\u00E9pondre correctement au quiz final.";
    }
    else {
        conditionText = "<b>Objectif :</b> " + (exo.description || 'Non défini') + "<br><br><b>Condition :</b> Atteindre une perte de " + (exo.targetValue || '0.050') + " (" + (exo.condition || 'test loss') + ")";
    }
    document.getElementById('display-desc').innerHTML = conditionText;
    var iframe_1 = document.getElementById('exo-frame');
    var hash = exo.hash || '';
    var css_1 = exo.css || '';
    iframe_1.src = 'preview_index.html' + hash;
    iframe_1.onload = function () {
        iframe_1.contentWindow.postMessage({ type: 'update-css', css: css_1 }, '*');
    };
}
else {
    console.error("Impossible de trouver l'exercice ID:", exoId);
    document.getElementById('display-title').innerText = "Exercice introuvable";
    document.getElementById('display-desc').innerHTML = "\n        D\u00E9sol\u00E9, nous n'avons pas pu trouver l'exercice avec l'ID <b>" + (exoId || 'inconnu') + "</b>.<br><br>\n        <b>Causes possibles :</b><br>\n        - L'exercice a \u00E9t\u00E9 cr\u00E9\u00E9 sur un autre navigateur ou appareil.<br>\n        - Vous avez vid\u00E9 le cache de votre navigateur.<br>\n        - Vous n'\u00EAtes pas connect\u00E9 avec le compte qui a cr\u00E9\u00E9 l'exercice (compte actuel : <i>" + (user.email || 'non connecté') + "</i>).\n      ";
}
var btnRealise = document.getElementById('btn-realise');
var selectedAnswerIndex = -1;
btnRealise.onclick = function () {
    if (isDraft || (exo && exo.quiz && exo.quiz.question)) {
        openQuizModal();
    }
    else {
        validateExercise();
    }
};
function openQuizModal() {
    var modal = document.getElementById('quiz-modal');
    var qContainer = document.getElementById('quiz-modal-question');
    var aContainer = document.getElementById('quiz-modal-answers');
    var confirmBtn = document.querySelector('.btn-modal-primary');
    selectedAnswerIndex = -1;
    aContainer.innerHTML = '';
    if (isDraft) {
        if (!exo.quiz) {
            exo.quiz = { question: "", answers: [{ text: "", isCorrect: true }, { text: "", isCorrect: false }] };
        }
        qContainer.innerHTML = "<textarea id=\"edit-quiz-question\" class=\"quiz-edit-input\" rows=\"3\" placeholder=\"Ins\u00E9rez votre question ici...\">" + (exo.quiz.question || '') + "</textarea>";
        confirmBtn.innerText = "Enregistrer & Valider";
        exo.quiz.answers.forEach(function (ans, idx) {
            var opt = document.createElement('div');
            opt.className = 'quiz-opt editable';
            if (ans.isCorrect) {
                opt.classList.add('selected');
                selectedAnswerIndex = idx;
            }
            opt.innerHTML = "\n            <div class=\"radio-circle\" onclick=\"selectCorrectAnswer(" + idx + ")\"></div>\n            <input type=\"text\" class=\"answer-text-input\" value=\"" + (ans.text || '') + "\" placeholder=\"Option " + (idx + 1) + "...\">\n          ";
            aContainer.appendChild(opt);
        });
        var actions = document.querySelector('.modal-actions');
        actions.innerHTML = "\n          <button onclick=\"closeQuizModal()\" class=\"btn-modal btn-modal-secondary\">Annuler</button>\n          <button onclick=\"submitQuiz(false)\" class=\"btn-modal btn-modal-secondary\">Enregistrer le brouillon</button>\n          <button onclick=\"submitQuiz(true)\" class=\"btn-modal btn-modal-primary\">Publier au Catalogue \uD83D\uDE80</button>\n        ";
        var addBtn = document.createElement('button');
        addBtn.className = 'btn-modal btn-modal-secondary';
        addBtn.style.width = '100%';
        addBtn.style.marginTop = '10px';
        addBtn.innerText = "+ Ajouter une option";
        addBtn.onclick = function () {
            var newIdx = exo.quiz.answers.length;
            exo.quiz.answers.push({ text: "", isCorrect: false });
            openQuizModal();
        };
        aContainer.appendChild(addBtn);
    }
    else {
        qContainer.innerText = exo.quiz.question;
        var actions = document.querySelector('.modal-actions');
        actions.innerHTML = "\n          <button onclick=\"closeQuizModal()\" class=\"btn-modal btn-modal-secondary\">Annuler</button>\n          <button onclick=\"submitQuiz()\" class=\"btn-modal btn-modal-primary\">Confirmer ma r\u00E9ponse</button>\n        ";
        exo.quiz.answers.forEach(function (ans, idx) {
            var opt = document.createElement('div');
            opt.className = 'quiz-opt';
            opt.innerHTML = "<div class=\"radio-circle\"></div> <span>" + ans.text + "</span>";
            opt.onclick = function () {
                document.querySelectorAll('.quiz-opt').forEach(function (el) { return el.classList.remove('selected'); });
                opt.classList.add('selected');
                selectedAnswerIndex = idx;
            };
            aContainer.appendChild(opt);
        });
    }
    modal.classList.add('open');
}
function selectCorrectAnswer(idx) {
    selectedAnswerIndex = idx;
    var opts = document.querySelectorAll('.quiz-opt');
    opts.forEach(function (opt, i) {
        if (i === idx)
            opt.classList.add('selected');
        else
            opt.classList.remove('selected');
    });
}
function closeQuizModal() {
    document.getElementById('quiz-modal').classList.remove('open');
}
function submitQuiz(publish) {
    if (publish === void 0) { publish = false; }
    if (selectedAnswerIndex === -1) {
        alert("Veuillez sélectionner la bonne réponse.");
        return;
    }
    if (isDraft) {
        var newQuestion = document.getElementById('edit-quiz-question').value;
        var answerInputs = document.querySelectorAll('.answer-text-input');
        var newAnswers_1 = [];
        answerInputs.forEach(function (input, idx) {
            newAnswers_1.push({
                text: input.value,
                isCorrect: idx === selectedAnswerIndex
            });
        });
        exo.quiz.question = newQuestion;
        exo.quiz.answers = newAnswers_1;
        saveQuizEdits();
        if (publish) {
            publishExercise();
        }
        else {
            alert("Brouillon mis à jour avec succès ! ✨");
            closeQuizModal();
        }
    }
    else {
        var answer = exo.quiz.answers[selectedAnswerIndex];
        if (answer.isCorrect) {
            alert("Bravo ! Bonne réponse ✨. L'exercice est maintenant marqué comme réussi.");
            closeQuizModal();
            validateExercise();
        }
        else {
            alert("Dommage, ce n'est pas la bonne réponse. Réessayez pour valider l'exercice !");
        }
    }
}
function saveQuizEdits() {
    var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var email = (user.email || '').toLowerCase().trim();
    var updatedCount = 0;
    var draftKey = "saved_exercises_" + email;
    var drafts = JSON.parse(localStorage.getItem(draftKey) || '[]');
    var dIdx = drafts.findIndex(function (e) { return String(e.id) === String(exo.id); });
    if (dIdx !== -1) {
        drafts[dIdx] = exo;
        localStorage.setItem(draftKey, JSON.stringify(drafts));
        updatedCount++;
    }
    var official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
    var oIdx = official.findIndex(function (e) { return String(e.id) === String(exo.id); });
    if (oIdx !== -1) {
        if (exo.authorEmail && exo.authorEmail.toLowerCase().trim() === email) {
            official[oIdx] = exo;
            localStorage.setItem('official_custom_exercises', JSON.stringify(official));
            updatedCount++;
        }
    }
    console.log("Mise \u00E0 jour effectu\u00E9e dans " + updatedCount + " liste(s)");
    return updatedCount > 0;
}
function publishExercise() {
    var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var profil = (user.role || user.profil || '').toLowerCase();
    if (!exo.author)
        exo.author = (user.prenom || '') + " " + (user.nom || '');
    if (!exo.authorEmail)
        exo.authorEmail = user.email;
    var official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
    if (!official.find(function (e) { return String(e.id) === String(exo.id); })) {
        official.push(exo);
        localStorage.setItem('official_custom_exercises', JSON.stringify(official));
    }
    var email = (user.email || '').toLowerCase();
    var draftKey = "saved_exercises_" + email;
    var drafts = JSON.parse(localStorage.getItem(draftKey) || '[]');
    drafts = drafts.filter(function (e) { return String(e.id) !== String(exo.id); });
    localStorage.setItem(draftKey, JSON.stringify(drafts));
    alert("Félicitations ! Votre exercice est maintenant publié dans le catalogue officiel. 🚀");
    window.location.href = 'Page-demo/exercises.html';
}
function validateExercise() {
    var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var key = "completed_exercises_" + user.email;
    var list = JSON.parse(localStorage.getItem(key) || '[]');
    if (!list.find(function (e) { return e.id == exoId; })) {
        list.push(__assign({}, exo, { date: new Date().toLocaleDateString('fr-FR') }));
        localStorage.setItem(key, JSON.stringify(list));
    }
    btnRealise.innerHTML = '✨ Validé !';
    btnRealise.disabled = true;
}
window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'PLAYGROUND_VALIDATE_CLICK') {
        console.log("Validation déclenchée depuis le Playground");
        btnRealise.click();
    }
});
document.getElementById('btn-sauvegarder').onclick = function (e) {
    var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var key = "saved_exercises_" + user.email;
    var list = JSON.parse(localStorage.getItem(key) || '[]');
    if (!list.find(function (e) { return e.id == exoId; })) {
        list.push(__assign({}, exo, { date: new Date().toLocaleDateString('fr-FR') }));
        localStorage.setItem(key, JSON.stringify(list));
    }
    e.target.innerHTML = '✅ Enregistré !';
};
document.addEventListener('DOMContentLoaded', function () {
    initProfileWidget();
});
window.closeQuizModal = closeQuizModal;
window.submitQuiz = submitQuiz;
window.selectCorrectAnswer = selectCorrectAnswer;
window.initProfileWidget = initProfileWidget;
