window.ExoCommonPage && window.ExoCommonPage.initProfileWidget();
var btnSauvegarder = document.getElementById('btn-sauvegarder');
var btnRealise = document.getElementById('btn-realise');
window.addEventListener('message', function (event) {
    if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == 5) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '✨ Exercise Successful !!';
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
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'Page-demo/register.html';
        return;
    }
    var now = new Date().toLocaleDateString('fr-FR');
    var saved = saveToStorage('saved_exercises', { id: 5, date: now });
    if (saved) {
        btnSauvegarder.innerHTML = '✅ Sauvegardé !';
        btnSauvegarder.style.opacity = '0.7';
        btnSauvegarder.disabled = true;
    }
    else {
        alert("This exercise is already in your profile.");
    }
};
btnRealise.onclick = function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'Page-demo/register.html';
        return;
    }
    var now = new Date().toLocaleDateString('fr-FR');
    var saved = saveToStorage('completed_exercises', { id: 5, date: now });
    if (saved) {
        btnRealise.innerHTML = '✨ Validé !';
        btnRealise.disabled = true;
        setTimeout(function () { window.location.href = 'Page-demo/historique.html#completed'; }, 1000);
    }
};
window.ExoCommonPage && window.ExoCommonPage.initBackgroundAnimation();
