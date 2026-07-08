(function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        var visitorBtn = document.createElement('a');
        visitorBtn.href = 'Page-demo/register.html';
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span>';
        container.appendChild(visitorBtn);
        return;
    }
    var initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 200px rgba(16, 185, 129, 0.4); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
    avatar.innerText = initiales.toUpperCase();
    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = "\n        <div style=\"padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);\">\n          <div style=\"font-size: 17px; font-weight: 800; color: #fff;\">" + (user.prenom || '') + " " + (user.nom || '') + "</div>\n          <div style=\"font-size: 12px; color: #94a3b8; margin-top: 4px;\">" + (user.email || '') + "</div>\n          <div style=\"display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;\">\uD83D\uDFE2 Profil " + typeProfil + "</div>\n        </div>\n        <div style=\"padding: 8px;\">\n          <a href=\"Page-demo/historique.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCCA Mon Historique</a>\n          <a href=\"statsetudiant.html\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;\">\uD83D\uDCC8 Mes Statistiques</a>\n          <div id=\"btnFuturLogout\" style=\"display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;\">\uD83D\uDEAA Logout</div>\n        </div>\n      ";
    var isOpen = false;
    avatar.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block';
            setTimeout(function () { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        }
        else {
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.9) translateY(-10px)';
            setTimeout(function () { return menu.style.display = 'none'; }, 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = function () { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
    container.appendChild(avatar);
    container.appendChild(menu);
})();
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
    var user = JSON.parse(localStorage.getItem('currentUser'));
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
var backgroundContainer = document.getElementById('background-container');
var formulas = ['\\sqrt{x}', '\\int', 'f(x) = ax^2', '\\frac{dy}{dx}', '\\sin(t)', 'e^{-t}'];
var numFormulas = 25;
var numNeurons = 30;
var numConnections = 50;
var neurons = [];
var connections = [];
var formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass) {
    var element = document.createElement('div');
    element.className = elementClass;
    element.style.position = 'absolute';
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = "clamp(1rem, 5vw, 2.5rem)";
        element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = "rgba(255, 255, 255, " + element.style.opacity + ")";
        element.style.left = getRandom(-20, 120) + "vw";
        element.style.top = getRandom(-20, 120) + "vh";
        element.style.transform = "rotate(" + getRandom(-30, 30) + "deg)";
        formulasElements.push(element);
    }
    else if (type === 'neuron') {
        var size = getRandom(10, 25);
        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.backgroundColor = "hsl(" + getRandom(190, 250) + ", 70%, 50%)";
        element.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px " + element.style.backgroundColor;
        element.style.left = getRandom(-10, 110) + "vw";
        element.style.top = getRandom(-10, 110) + "vh";
        element.style.opacity = 0;
        element.style.transform = 'scale(0)';
        neurons.push({ element: element, size: size, x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
}
function createConnection(n1, n2) {
    var conn = document.createElement('div');
    conn.className = 'connection';
    conn.style.position = 'absolute';
    conn.style.height = '1.5px';
    conn.style.background = "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))";
    conn.style.filter = 'blur(4px)';
    connections.push({ element: conn, neuron1: n1, neuron2: n2, opacity: 0 });
    backgroundContainer.appendChild(conn);
}
function lerp(start, end, amount) { return (1 - amount) * start + amount * end; }
function initializeBackground() {
    for (var i = 0; i < numFormulas; i++)
        createAnimatedElement('formula', 'math-formula');
    for (var i = 0; i < numNeurons; i++)
        createAnimatedElement('neuron', 'neuron');
    for (var i = 0; i < numConnections; i++) {
        var n1 = neurons[Math.floor(Math.random() * neurons.length)];
        var n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2)
            createConnection(n1, n2);
    }
}
function animateBackground() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var time = Date.now() * 0.0005;
    neurons.forEach(function (neuron, index) {
        var angle = index * (2 * Math.PI / numNeurons) + time;
        var radius = Math.min(windowWidth, windowHeight) * 0.3;
        var targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        var targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        neuron.element.style.opacity = neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.element.style.transform = "scale(" + (neuron.scale = Math.max(neuron.scale, 1)) + ")";
        neuron.element.style.left = (neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)) + "px";
        neuron.element.style.top = (neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)) + "px";
    });
    connections.forEach(function (conn) {
        var element = conn.element, neuron1 = conn.neuron1, neuron2 = conn.neuron2;
        var x1 = neuron1.x + neuron1.size / 2;
        var y1 = neuron1.y + neuron1.size / 2;
        var x2 = neuron2.x + neuron2.size / 2;
        var y2 = neuron2.y + neuron2.size / 2;
        var length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        element.style.opacity = 0.3;
        element.style.width = length + "px";
        element.style.left = x1 + "px";
        element.style.top = y1 + "px";
        element.style.transform = "rotate(" + angle + "deg)";
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground();
animateBackground();
