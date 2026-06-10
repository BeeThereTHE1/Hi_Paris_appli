// @ts-nocheck
(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const container = document.getElementById('widget-profil-header');
    if (!container)
        return;
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !user) {
        const visitorBtn = document.createElement('a');
        visitorBtn.href = 'Page-demo/register.html';
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.onmouseover = () => visitorBtn.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)';
        visitorBtn.onmouseout = () => visitorBtn.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)';
        visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span > ';
        container.appendChild(visitorBtn);
        return;
    }
    const initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');
    const avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
    avatar.innerText = initiales.toUpperCase();
    avatar.onmouseover = () => avatar.style.transform = 'scale(1.1) rotate(5deg)';
    avatar.onmouseout = () => avatar.style.transform = 'scale(1) rotate(0deg)';
    const menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';
    const p = user.profil || user.profile || user.role || 'étudiant';
    const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);">
          <div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📊</span> Mon Historique
          </a>
          <a href="statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📈</span> Mes Statistiques
          </a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">🚪</span> Déconnexion
          </div>
        </div>
      `;
    let isOpen = false;
    avatar.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'scale(1) translateY(0)';
                menu.style.pointerEvents = 'auto';
            }, 10);
        }
        else {
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.9) translateY(-10px)';
            menu.style.pointerEvents = 'none';
            setTimeout(() => menu.style.display = 'none', 300);
        }
    };
    menu.querySelector('#btnFuturLogout').onclick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    };
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && isOpen)
            avatar.onclick();
    });
    container.appendChild(avatar);
    container.appendChild(menu);
})();

// --- PROTECTION DU LIEN "Mon Historique" ---
document.querySelectorAll('a[href="Page-demo/historique.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            e.preventDefault();
            window.location.href = 'Page-demo/register.html';
        }
    });
});
const backgroundContainer = document.getElementById('background-container');
const formulas = ['\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c', '\\frac{dy}{dx}', '\\alpha', '\\beta', '\\gamma', '\\sin(t)', '\\cos(t)', 'e^{-t}'];
const numFormulas = 25;
const numNeurons = 30;
const numConnections = 50;
let neurons = [];
let connections = [];
let formulasElements = [];
function getRandom(min, max) { return Math.random() * (max - min) + min; }
function createAnimatedElement(type, elementClass, styleProperties = {}) {
    const element = document.createElement('div');
    element.className = elementClass;
    element.style.position = 'absolute';
    Object.assign(element.style, styleProperties);
    if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = `clamp(1rem, 5vw, 2.5rem)`;
        element.style.opacity = getRandom(0.04, 0.12);
        element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
        element.style.left = `${getRandom(-20, 120)}vw`;
        element.style.top = `${getRandom(-20, 120)}vh`;
        element.style.transform = `rotate(${getRandom(-30, 30)}deg)`;
        formulasElements.push(element);
    }
    else if (type === 'neuron') {
        const size = getRandom(10, 25);
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
        element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
        element.style.left = `${getRandom(-10, 110)}vw`;
        element.style.top = `${getRandom(-10, 110)}vh`;
        element.style.opacity = 0;
        element.style.transform = 'scale(0)';
        neurons.push({ element, size, x: 0, y: 0, opacity: 0, scale: 0 });
    }
    backgroundContainer.appendChild(element);
}
function createConnection(neuron1, neuron2) {
    const connection = document.createElement('div');
    connection.className = 'connection';
    connection.style.position = 'absolute';
    connection.style.height = '1.5px';
    connection.style.background = `linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))`;
    connection.style.opacity = 0;
    connection.style.transformOrigin = '0 0';
    connection.style.filter = 'blur(4px)';
    connections.push({ element: connection, neuron1, neuron2, opacity: 0 });
    backgroundContainer.appendChild(connection);
}
function lerp(start, end, amount) { return (1 - amount) * start + amount * end; }
function initializeBackground() {
    for (let i = 0; i < numFormulas; i++)
        createAnimatedElement('formula', 'math-formula');
    for (let i = 0; i < numNeurons; i++)
        createAnimatedElement('neuron', 'neuron');
    for (let i = 0; i < numConnections; i++) {
        const n1 = neurons[Math.floor(Math.random() * neurons.length)];
        const n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2)
            createConnection(n1, n2);
    }
}
function animateBackground() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const time = Date.now() * 0.0005;
    neurons.forEach((neuron, index) => {
        const angle = index * (2 * Math.PI / numNeurons) + time;
        const radius = Math.min(windowWidth, windowHeight) * 0.3;
        const targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
        const targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;
        neuron.element.style.opacity = neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.element.style.transform = `scale(${neuron.scale = Math.max(neuron.scale, 1)})`;
        neuron.element.style.left = `${neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)}px`;
        neuron.element.style.top = `${neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)}px`;
    });
    connections.forEach(conn => {
        const { element, neuron1, neuron2 } = conn;
        const x1 = neuron1.x + neuron1.size / 2;
        const y1 = neuron1.y + neuron1.size / 2;
        const x2 = neuron2.x + neuron2.size / 2;
        const y2 = neuron2.y + neuron2.size / 2;
        const length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        element.style.opacity = 0.3;
        element.style.width = `${length}px`;
        element.style.left = `${x1}px`;
        element.style.top = `${y1}px`;
        element.style.transform = `rotate(${angle}deg)`;
    });
    requestAnimationFrame(animateBackground);
}
initializeBackground();
animateBackground();
// --- LOGIQUE DE SAUVEGARDE ET VALIDATION (VIA STORAGE SERVICE) ---
const btnSauvegarder = document.getElementById('btn-sauvegarder');
const btnRealise = document.getElementById('btn-realise');

// Écouter le signal de succès venant de l'iframe
window.addEventListener('message', (event) => {
    if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == 13) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
    }
});

btnSauvegarder.onclick = async () => {
    const success = await StorageService.save(13);
    if (success) {
        btnSauvegarder.innerHTML = '✅ Sauvegardé !';
        btnSauvegarder.disabled = true;
    }
};

btnRealise.onclick = async () => {
    const success = await StorageService.complete(13);
    if (success) {
        btnRealise.innerHTML = '✨ Validé !';
        btnRealise.disabled = true;
    } else {
        alert("Une erreur est survenue lors de la validation.");
    }
};

