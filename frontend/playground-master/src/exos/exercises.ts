// @ts-nocheck

(function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // On cible la boîte qu'on a créée dans le header !
  const container = document.getElementById('widget-profil-header');
  if (!container) return;

  container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';

  if (!isLoggedIn || !user) {
    const visitorBtn = document.createElement('a');
    visitorBtn.href = 'register.html';
    visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
    visitorBtn.onmouseover = () => visitorBtn.style.boxShadow = '0 0 25px rgba(139,92,246,0.6)';
    visitorBtn.onmouseout = () => visitorBtn.style.boxShadow = '0 0 15px rgba(139,92,246,0.2)';
    visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">Vous n\'êtes pas connecté!</span > ';
    container.appendChild(visitorBtn);
    return;
  }

  const initiales = (user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '');

  // Bouton Avatar Lumineux
  const avatar = document.createElement('div');
  avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;';
  avatar.innerText = initiales.toUpperCase();

  // --- NOUVEAU : Notifications ---
  (async () => {
    try {
      let count = 0;
      const r = (user.role || user.profil || '').toUpperCase();
      if (r.includes('TEACH') || r.includes('ENS')) {
        const res = await fetch(`/api/submissions/teacher/${user.id}/count`, { headers: { 'x-user-email': user.email } });
        const data = await res.json();
        count = data.count || 0;
      } else {
        const res = await fetch(`/api/submissions/student/${user.id}`);
        const subs = await res.json();
        count = subs.filter(s => s.status !== 'PENDING').length;
      }
      if (count > 0) {
        const badge = document.createElement('span');
        badge.style.cssText = 'position:absolute; top:-5px; right:-5px; background:#ef4444; color:white; border-radius:50%; width:18px; height:18px; font-size:10px; display:flex; align-items:center; justify-content:center; border:2px solid #0f172a; font-weight:800; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);';
        badge.innerText = count;
        avatar.appendChild(badge);
      }
    } catch (e) { console.error("Badge error:", e); }
  })();

  avatar.onmouseover = () => avatar.style.transform = 'scale(1.1) rotate(5deg)';
  avatar.onmouseout = () => avatar.style.transform = 'scale(1) rotate(0deg)';

  // Menu Premium (ajusté pour descendre proprement sous le header)
  const menu = document.createElement('div');
  menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none;';

  const p = user.profil || user.profile || user.role || 'étudiant';
  const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);

  menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);">
          <div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📊</span> Mon Historique
          </a>
          <a href="../statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📈</span> Mes Statistiques
          </a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">🚪</span> Déconnexion
          </div>
        </div>
      `;

  // Animation d'ouverture magique
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
    } else {
      menu.style.opacity = '0';
      menu.style.transform = 'scale(0.9) translateY(-10px)';
      menu.style.pointerEvents = 'none';
      setTimeout(() => menu.style.display = 'none', 300);
    }
  };

  menu.querySelector('#btnFuturLogout').onclick = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../index.html';
  };

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target) && isOpen) avatar.onclick();
  });

  container.appendChild(avatar);
  container.appendChild(menu);
})();

/* ─── DONNÉES ─── */
const EXERCISES = [
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

const DIFF_LABEL = { easy: 'Facile', medium: 'Intermédiaire', hard: 'Difficile' };
let currentFilter = 'tous';

/* ─── Controle et suppresison des exos ─── */
const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
const isTeacher = (user.role || user.profil || '').toLowerCase() === 'enseignant';

/* ─── RENDU ─── */
/* ─── RENDU ─── */
function renderCards(gridId, list, sectionId) {
  const grid = document.getElementById(gridId);
  const section = document.getElementById(sectionId);
  grid.innerHTML = '';
  if (!list.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';

  list.forEach((ex, i) => {
    const card = document.createElement('div');
    card.className = `ex-card ${ex.difficulty}`;

    // --- NOUVEAU : Bouton de suppression pour profs ---
    let deleteBtn = '';
    if (isTeacher && ex.isCustom) {
      deleteBtn = `<button class="btn-delete-exo" onclick="event.stopPropagation(); deleteCommunityExo(${ex.id})" title="Supprimer l'exercice">
            <span class="material-icons" style="font-size:18px; pointer-events: none;">delete_forever</span>
          </button>`;
    }

    card.innerHTML = `
          <div class="card-top">
            <div class="card-icon">${ex.icon}</div>
            <div style="display:flex; align-items:center; gap:8px;">
               ${deleteBtn}
               <span class="badge ${ex.difficulty}">${DIFF_LABEL[ex.difficulty]}</span>
            </div>
          </div>
          <div class="category-tag">${ex.category}</div>
          <div class="card-title">${ex.title}</div>
          <div class="card-desc">${ex.desc}</div>
          <div class="card-footer">
            <div class="card-meta">
               <div class="meta-item">🕒 ${ex.duration}</div>
               <div class="meta-item">❓ ${ex.questions}</div>
            </div>
            <button class="btn-start" onclick="startExercise(${ex.id}, '${ex.title.replace(/'/g, "\\'")}', ${!!ex.isCustom})">
              Commencer →
            </button>
          </div>
        `;
    grid.appendChild(card);
  });
}



function deleteCommunityExo(id) {
  if (!confirm("Voulez-vous vraiment supprimer cet exercice du catalogue ?")) return;

  let official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
  official = official.filter(exo => exo.id !== id);

  localStorage.setItem('official_custom_exercises', JSON.stringify(official));
  applyFilters();
  alert("L'exercice a été retiré du catalogue.");
}

/* ─── FILTRES ─── */
function setFilter(diff, btn) {
  currentFilter = diff;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFilters();
}

function filterCards() { applyFilters(); }

function applyFilters() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();

  // Récupération des deux listes
  const baseExercises = [...EXERCISES];
  const customList = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
  const formattedCustoms = customList.map(exo => ({
    id: exo.id, icon: '👥', title: exo.title, desc: exo.description,
    difficulty: 'easy', category: 'Communauté', duration: 'Auto', questions: '?', isCustom: true
  }));

  // Construction de la liste globale pour les stats et le filtrage
  let fullList = [...baseExercises, ...formattedCustoms];

  // Filtre par difficulté
  if (currentFilter !== 'tous') {
    fullList = fullList.filter(e => e.difficulty === currentFilter);
  }

  // Filtre par recherche
  if (q) {
    fullList = fullList.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  }

  // Mise à jour des stats globales
  const statTotalValue = document.getElementById('statTotal');
  if (statTotalValue) statTotalValue.textContent = fullList.length;

  const statEasyValue = document.getElementById('statEasy');
  if (statEasyValue) statEasyValue.textContent = fullList.filter(e => e.difficulty === 'easy').length;

  const statMediumValue = document.getElementById('statMedium');
  if (statMediumValue) statMediumValue.textContent = fullList.filter(e => e.difficulty === 'medium').length;

  const statHardValue = document.getElementById('statHard');
  if (statHardValue) statHardValue.textContent = fullList.filter(e => e.difficulty === 'hard').length;

  // Séparation pour le rendu par section
  const filteredBase = fullList.filter(e => !e.isCustom);
  const filteredCustom = fullList.filter(e => e.isCustom);

  // Rendu des deux sections
  renderCards('exGridBase', filteredBase, 'baseExercisesSection');
  renderCards('exGridCustom', filteredCustom, 'customExercisesSection');

  // Affichage du Empty State si aucun résultat total
  const empty = document.getElementById('emptyState');
  if (fullList.length === 0) {
    empty.classList.add('visible');
  } else {
    empty.classList.remove('visible');
  }
}

/* ─── LANCEMENT ─── */
const EXERCISE_LINKS = {
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
  17: '../exo17.html',
};

function startExercise(id, title, isCustom) {
  if (isCustom) {
    window.location.href = `../custom_exo_template.html?id=${id}`;
    return;
  }
  const link = EXERCISE_LINKS[id];
  if (link) {
    window.location.href = link;
  } else {
    // Redirection vers le playground par défaut pour les exercices sans wrapper
    window.location.href = `../playground/index.html?exo=${id}`;
  }
}

applyFilters();

const backgroundContainer = document.getElementById('background-container');
const formulas = [
  '\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c',
  '\\frac{dy}{dx}', '\\lim_{x \\to \\infty}', '\\binom{n}{k}',
  '\\alpha', '\\beta', '\\gamma', '\\delta', '\\epsilon', '\\zeta', '\\eta', '\\theta',
  '\\sin(t)', '\\cos(t)', 'e^{-t}', 't^2',
  'x(t) = r \\cos(t), y(t) = r \\sin(t)' // Arc paramétrique
];
const numFormulas = 25; // Augmentation du nombre de formules
const numNeurons = 30;   // Augmentation du nombre de neurones
const numConnections = 50; // Augmentation du nombre de connexions

let neurons = [];
let connections = [];
let formulasElements = [];

// Fonction pour obtenir un nombre aléatoire dans une plage
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Fonction pour créer un élément (formule ou neurone)
function createAnimatedElement(type, elementClass, styleProperties = {}) {
  const element = document.createElement('div');
  element.className = elementClass;
  element.style.position = 'absolute';
  Object.assign(element.style, styleProperties);

  if (type === 'formula') {
    element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
    element.style.fontSize = `clamp(${getRandom(0.8, 1.2)}rem, ${getRandom(3, 7)}vw, ${getRandom(2, 4)}rem)`;
    element.style.opacity = getRandom(0.04, 0.12);
    element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
    element.style.left = `${getRandom(-20, 120)}vw`; // Permet aux formules d'entrer et sortir
    element.style.top = `${getRandom(-20, 120)}vh`;
    element.style.transform = `rotate(${getRandom(-30, 30)}deg)`;
    formulasElements.push(element);
  } else if (type === 'neuron') {
    element.style.width = `${getRandom(10, 25)}px`;
    element.style.height = element.style.width;
    element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
    element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
    element.style.left = `${getRandom(-10, 110)}vw`;
    element.style.top = `${getRandom(-10, 110)}vh`;
    element.style.opacity = 0; // Commence invisible
    element.style.transform = 'scale(0)';
    neurons.push({ element, size: parseFloat(element.style.width), x: 0, y: 0, opacity: 0, scale: 0 }); // Stockage pour l'animation
  }
  backgroundContainer.appendChild(element);
  return element;
}

// Fonction pour créer une connexion entre deux neurones
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

// Initialisation des éléments
function initializeBackground() {
  // Création des formules
  for (let i = 0; i < numFormulas; i++) {
    createAnimatedElement('formula', `math-formula formula-${i + 1}`, {
      animationDuration: `${getRandom(20, 40)}s`,
      animationDelay: `${getRandom(-10, 0)}s`
    });
  }

  // Création des neurones (initialement invisibles)
  for (let i = 0; i < numNeurons; i++) {
    createAnimatedElement('neuron', `neuron neuron-${i}`);
  }

  // Création des connexions initiales (elles seront animées pour apparaître)
  for (let i = 0; i < numConnections; i++) {
    if (neurons.length < 2) continue;
    const n1 = neurons[Math.floor(Math.random() * neurons.length)];
    const n2 = neurons[Math.floor(Math.random() * neurons.length)];
    if (n1 !== n2) {
      createConnection(n1, n2);
    }
  }
}

// Animation des éléments
function animateBackground() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Animation des formules
  formulasElements.forEach(formula => {
    const currentX = parseFloat(formula.style.left);
    const currentY = parseFloat(formula.style.top);

    // Légère dérive et rotation continue
    formula.style.transform = `translate(${currentX + Math.sin(Date.now() * 0.0001) * 5}px, ${currentY + Math.cos(Date.now() * 0.0001) * 5}px) rotate(${parseFloat(formula.style.transform.split(' ')[1].replace('rotate(', '').replace('deg)', '')) + Math.sin(Date.now() * 0.0002) * 0.1}deg)`;

    // Faire "sortir" les formules du cadre pour qu'elles réapparaissent de l'autre côté
    if (currentX > windowWidth * 1.1) formula.style.left = `${getRandom(-20, 0)}vw`;
    if (currentX < -windowWidth * 0.1) formula.style.left = `${getRandom(windowWidth, windowWidth * 1.2)}vw`;
    if (currentY > windowHeight * 1.1) formula.style.top = `${getRandom(-20, 0)}vh`;
    if (currentY < -windowHeight * 0.1) formula.style.top = `${getRandom(windowHeight, windowHeight * 1.2)}vh`;
  });

  // Animation des neurones (apparition progressive) et mise à jour des positions
  const time = Date.now() * 0.0005;
  neurons.forEach((neuron, index) => {
    const element = neuron.element;
    const angle = index * (2 * Math.PI / numNeurons) + time;
    const radius = Math.min(windowWidth, windowHeight) * 0.3;

    // Positionnement en cercle et déplacement sinusoïdal
    const targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
    const targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;

    // Animation d'apparition (scale et opacity)
    const appearanceFactor = Math.min(1, Math.max(0, (time * 2 - index * 0.1))); // Apparaît plus tard pour les neurones suivants
    element.style.opacity = neuron.opacity = Math.max(neuron.opacity, appearanceFactor * 0.1);
    element.style.transform = `scale(${neuron.scale = Math.max(neuron.scale, appearanceFactor)}) rotate(${appearanceFactor * 10}deg)`;

    // Mouvement fluide vers la nouvelle position
    element.style.left = `${neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)}px`;
    element.style.top = `${neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)}px`;
  });

  // Animation des connexions (apparition et pulsation)
  connections.forEach(conn => {
    const timeFactor = Date.now() * 0.0001; // Vitesse de pulsation
    const appearanceFactor = Math.min(1, Math.max(0, (timeFactor * 2 - neurons.findIndex(n => n.element === conn.neuron1.element) * 0.1))); // Apparaît après les neurones

    conn.element.style.opacity = conn.opacity = Math.max(conn.opacity, appearanceFactor * 0.3); // Apparition progressive
    conn.element.style.transform = `scale(${appearanceFactor * 1.1})`; // Légère pulsation lors de l'apparition

    // Calcul dynamique de la position et de la taille de la connexion
    const { element: connElem, neuron1, neuron2 } = conn;
    const rect1 = neuron1.element.getBoundingClientRect();
    const rect2 = neuron2.element.getBoundingClientRect();

    const x1 = neuron1.x + neuron1.size / 2;
    const y1 = neuron1.y + neuron1.size / 2;
    const x2 = neuron2.x + neuron2.size / 2;
    const y2 = neuron2.y + neuron2.size / 2;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    connElem.style.width = `${length}px`;
    connElem.style.left = `${x1}px`;
    connElem.style.top = `${y1}px`;
    connElem.style.transform = `rotate(${angle}deg) scale(${appearanceFactor})`; // Ajustement rotation et échelle

    // Effet de pulsation simple
    const pulse = 1 + Math.sin(timeFactor * 2 + index * 0.2) * 0.1;
    connElem.style.transform = `rotate(${angle}deg) scale(${appearanceFactor * pulse})`;
  });

  requestAnimationFrame(animateBackground);
}

// Fonction de lerp (interpolation linéaire) pour un mouvement fluide
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

// Initialisation et lancement de l'animation
initializeBackground();
animateBackground();

// Recalcul des connexions lors du redimensionnement (plus robuste)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Vider et recréer les connexions pour s'adapter à la nouvelle taille
    connections.forEach(conn => conn.element.remove());
    connections = [];
    if (neurons.length >= 2) {
      for (let i = 0; i < numConnections; i++) {
        const n1 = neurons[Math.floor(Math.random() * neurons.length)];
        const n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2) {
          createConnection(n1, n2);
        }
      }
    }
  }, 100); // Délai pour éviter les calculs répétitifs pendant le redimensionnement
});
// Initialisation finale
applyFilters();

// Expose functions to global window object for HTML onclick/oninput events
window.startExercise = startExercise;
window.filterCards = filterCards;
window.setFilter = setFilter;
window.deleteCommunityExo = deleteCommunityExo;
