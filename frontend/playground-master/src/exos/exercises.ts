// @ts-nocheck
(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // On cible la boîte qu'on a créée dans le header !
    const container = document.getElementById('widget-profil-header');
    if (!container)
        return;
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
        window.location.href = '../index.html';
    };
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && isOpen)
            avatar.onclick();
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
const role = (user.role || user.profil || user.profile || 'ETUDIANT').toUpperCase();
const isTeacher = role.includes('TEACH') || role.includes('ENS') || role.includes('PROF');
/* ─── RENDU ─── */
/* ─── RENDU ─── */
/* === CODES SVG DES CADENAS & ETOILES === */
function getLockSvg(locked, size = 35) {
    const color = locked ? "#EF4444" : "#10B981";
    const opacity = locked ? 1 : 0.65;
    const lockClass = locked ? "locked-svg" : "unlocked-svg";
    if (locked) {
        return `<svg class="${lockClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: ${opacity}; transition: all 0.3s ease;">
            <rect x="3" y="11" width="18" height="11" rx="2" fill="${color}" />
            <path d="M7 11V7a5 5 0 0110 0v4" fill="none" />
        </svg>`;
    } else {
        return `<svg class="${lockClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: ${opacity}; transition: all 0.3s ease;">
            <rect x="3" y="11" width="18" height="11" rx="2" fill="${color}" />
            <path d="M7 11V7a5 5 0 019-3" fill="none" />
        </svg>`;
    }
}

function getStarSvg(active, size = 38) {
    const color = active ? "#FACC15" : "#4B5563";
    const fillClass = active ? "validated" : "unvalidated";
    return `<svg class="star-interactive ${fillClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="none" style="transition: transform 0.2s ease, fill 0.3s ease;">
        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
    </svg>`;
}


/* === MAPPINGS DE SECTIONS ET D'EXERCICES === */
const SECTIONS_CONFIG = {
    1: { name: "Basic models: Foundations of neural network", exos: [1, 2, 3, 5], gridId: "exGridSec1", containerId: "section-1-container" },
    2: { name: "The Building Blocks of Neural Networks", exos: [6, 4, 7, 8], gridId: "exGridSec2", containerId: "section-2-container" },
    3: { name: "Training & Optimization", exos: [9, 10, 11, 17, 13, 14], gridId: "exGridSec3", containerId: "section-3-container" },
    4: { name: "Generalization & Deep Learning Limits", exos: [16, 12, 15], gridId: "exGridSec4", containerId: "section-4-container" }
};

const FUN_FACTS = {
    1: "La régression logistique a été inventée par Joseph Berkson en 1944. C'est l'un des modèles de classification les plus utilisés au monde !",
    2: "L'apprentissage supervisé s'inspire directement de la façon dont un enfant apprend en faisant des erreurs et en étant corrigé par un adulte.",
    3: "Les données circulaires ne peuvent pas être séparées par une simple ligne droite. C'est pourquoi nous avons besoin de fonctions d'activation non linéaires !",
    4: "Le biais permet de décaler la fonction d'activation vers la gauche ou la droite, offrant un degré de liberté crucial au neurone.",
    5: "Combiner plusieurs caractéristiques d'entrée complexes (comme x² ou xy) permet de résoudre des problèmes non linéaires sans ajouter de couches cachées.",
    6: "Les couches cachées agissent comme des extracteurs de caractéristiques de plus en plus abstraites. Plus on va profond, plus le concept est complexe.",
    7: "ReLU (Rectified Linear Unit) est la fonction d'activation la plus populaire car elle évite le problème de la disparition du gradient tout en étant très rapide à calculer.",
    8: "Un réseau de neurones avec les mêmes hyperparamètres peut converger vers des solutions différentes à cause de l'initialisation aléatoire des poids !",
    9: "La descente de gradient stochastique (SGD) utilise un seul échantillon à la fois pour mettre à jour les poids, rendant l'apprentissage extrêmement rapide mais bruyant.",
    10: "Le taux d'apprentissage (learning rate) est l'hyperparamètre le plus sensible : trop grand, le modèle oscille ; trop petit, il met une éternité à converger.",
    11: "La rétropropagation du gradient (backpropagation) a été popularisée par Geoffrey Hinton en 1986. Elle calcule les dérivées partielles de l'erreur par rapport à chaque poids.",
    12: "Le surapprentissage (overfitting) se produit lorsque le modèle apprend par cœur le bruit des données d'entraînement, perdant sa capacité de généralisation.",
    13: "La régularisation L2 (Ridge) ajoute une pénalité proportionnelle au carré de la valeur des poids pour forcer le réseau à garder des poids petits et simples.",
    14: "Le dropout désactive aléatoirement un pourcentage de neurones à chaque itération, forçant le réseau à ne pas dépendre d'un seul chemin de neurones.",
    15: "La validation croisée (cross-validation) divise les données pour estimer de manière fiable les performances réelles du modèle sur de futures données.",
    16: "Les réseaux profonds peuvent apprendre des fonctions d'une complexité infinie. C'est le théorème d'approximation universelle !",
    17: "Les fonctions d'erreur (loss functions) comme l'erreur quadratique moyenne ou la cross-entropy mesurent l'écart entre les prédictions et la réalité."
};

const QUIZZES = {
    1: {
        title: "Quiz Section 1 : Fondations des Réseaux",
        questions: [
            {
                q: "Quelle fonction d'activation est indispensable pour que la régression logistique retourne une probabilité entre 0 et 1 ?",
                options: ["Sigmoïde", "ReLU", "Linéaire", "Tangente Hyperbolique"],
                answer: 0,
                fallbackExo: 1
            },
            {
                q: "Si des données de classification forment un cercle parfait entourant une autre classe, quel type de séparation est nécessaire ?",
                options: ["Une séparation linéaire", "Une séparation non linéaire", "Aucune séparation possible"],
                answer: 1,
                fallbackExo: 3
            }
        ]
    },
    2: {
        title: "Quiz Section 2 : Les Blocs de Construction",
        questions: [
            {
                q: "Quel est le rôle principal du biais (bias) dans un neurone artificiel ?",
                options: ["Décaler la fonction d'activation", "Multiplier le poids de l'entrée", "Calculer l'erreur de prédiction"],
                answer: 0,
                fallbackExo: 4
            },
            {
                q: "Pourquoi les fonctions d'activation non-linéaires (comme ReLU ou Sigmoïde) sont-elles cruciales dans les couches cachées ?",
                options: ["Pour accélérer le calcul matériel", "Pour permettre au réseau d'apprendre des relations complexes non-linéaires", "Pour stabiliser les poids initiaux à zéro"],
                answer: 1,
                fallbackExo: 7
            }
        ]
    },
    3: {
        title: "Quiz Section 3 : Entraînement & Optimisation",
        questions: [
            {
                q: "Quel problème peut survenir si le taux d'apprentissage (learning rate) est trop élevé ?",
                options: ["L'entraînement est trop lent", "Le modèle risque d'osciller et ne jamais converger vers le minimum", "Les poids deviennent tous égaux à zéro"],
                answer: 1,
                fallbackExo: 10
            },
            {
                q: "Quelle technique permet de propager l'erreur de la sortie vers l'entrée pour ajuster les poids ?",
                options: ["La rétropropagation du gradient", "La descente de gradient stochastique", "La régularisation L1/L2"],
                answer: 0,
                fallbackExo: 11
            }
        ]
    },
    4: {
        title: "Quiz Section 4 : Généralisation & Limites",
        questions: [
            {
                q: "Comment appelle-t-on le phénomène où un modèle est excellent sur les données d'entraînement mais très mauvais sur les nouvelles données ?",
                options: ["Sous-apprentissage (Underfitting)", "Surapprentissage (Overfitting)", "Régularisation extrême"],
                answer: 1,
                fallbackExo: 12
            },
            {
                q: "Quel est le but du 'Dropout' lors de l'entraînement d'un réseau profond ?",
                options: ["Supprimer définitivement les mauvaises données", "Désactiver aléatoirement des neurones pour éviter le surapprentissage", "Augmenter la dimension de l'espace d'entrée"],
                answer: 1,
                fallbackExo: 14
            }
        ]
    }
};

/* Lottie Arrow JSON Data */
const ARROW_LOTTIE_JSON = {"nm":"Main Scene","ddd":0,"h":200,"w":200,"meta":{"g":"@lottiefiles/creator@1.94.0"},"layers":[{"ty":4,"nm":"Shape Layer 7","sr":1,"st":0,"op":840,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[-2,77.25,0],"ix":1},"s":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.833,"y":1},"s":[50,50,100],"t":0},{"s":[50,50,100],"t":24}],"ix":6},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1},"s":[100,-1,0],"t":0,"ti":[0,-31.667,0],"to":[0,31.667,0]},{"s":[100,94,0],"t":24}],"ix":2},"r":{"a":0,"k":0,"ix":10},"sa":{"a":0,"k":0},"o":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.833,"y":1},"s":[0],"t":0},{"s":[100],"t":24}],"ix":11}},"shapes":[{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"Shape 1","ix":1,"cix":2,"np":3,"it":[{"ty":"sh","bm":0,"hd":false,"mn":"ADBE Vector Shape - Group","nm":"Path 1","ix":1,"d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[104.5,-23.5],[-2,48.5],[-107,-22.5],[-107,49.5],[-2.25,120],[104.5,48.125]]},"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"Stroke 1","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":3}},{"ty":"fl","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Fill","nm":"Fill 1","c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":4},"r":1,"o":{"a":0,"k":100,"ix":5}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[0,0],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]}],"ind":1},{"ty":4,"nm":"Shape Layer 6","sr":1,"st":0,"op":840,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[-2,77.25,0],"ix":1},"s":{"a":0,"k":[50,50,100],"ix":6},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1},"s":[100,94,0],"t":0,"ti":[0,-15,0],"to":[0,15,0]},{"s":[100,139,0],"t":24}],"ix":2},"r":{"a":0,"k":0,"ix":10},"sa":{"a":0,"k":0},"o":{"a":0,"k":100,"ix":11}},"shapes":[{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"Shape 1","ix":1,"cix":2,"np":3,"it":[{"ty":"sh","bm":0,"hd":false,"mn":"ADBE Vector Shape - Group","nm":"Path 1","ix":1,"d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[104.5,-23.5],[-2,48.5],[-107,-22.5],[-107,49.5],[-2.25,120],[104.5,48.125]]},"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"Stroke 1","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":3}},{"ty":"fl","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Fill","nm":"Fill 1","c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":4},"r":1,"o":{"a":0,"k":100,"ix":5}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[0,0],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]}],"ind":2},{"ty":4,"nm":"Shape Layer 5","sr":1,"st":0,"op":840,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[-2,77.25,0],"ix":1},"s":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1},"s":[50,50,100],"t":0},{"s":[25,25,100],"t":24}],"ix":6},"sk":{"a":0,"k":0},"p":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1},"s":[100,139,0],"t":0,"ti":[0,-20.333,0],"to":[0,20.333,0]},{"s":[100,200,0],"t":24}],"ix":2},"r":{"a":0,"k":0,"ix":10},"sa":{"a":0,"k":0},"o":{"a":1,"k":[{"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1},"s":[100],"t":0},{"s":[0],"t":24}],"ix":11}},"shapes":[{"ty":"gr","bm":0,"hd":false,"mn":"ADBE Vector Group","nm":"Shape 1","ix":1,"cix":2,"np":3,"it":[{"ty":"sh","bm":0,"hd":false,"mn":"ADBE Vector Shape - Group","nm":"Path 1","ix":1,"d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[104.5,-23.5],[-2,48.5],[-107,-22.5],[-107,49.5],[-2.25,120],[104.5,48.125]]},"ix":2}},{"ty":"st","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Stroke","nm":"Stroke 1","lc":1,"lj":1,"ml":4,"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":3}},{"ty":"fl","bm":0,"hd":false,"mn":"ADBE Vector Graphic - Fill","nm":"Fill 1","c":{"a":0,"k":[0.8863,0.2902,0.2588],"ix":4},"r":1,"o":{"a":0,"k":100,"ix":5}},{"ty":"tr","a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"sk":{"a":0,"k":0,"ix":4},"p":{"a":0,"k":[0,0],"ix":2},"r":{"a":0,"k":0,"ix":6},"sa":{"a":0,"k":0,"ix":5},"o":{"a":0,"k":100,"ix":7}}]}],"ind":3}],"v":"5.7.0","fr":24,"op":24,"ip":0,"assets":[]};

/* === VARIABLES DE PROGRESSION GLOBALES === */
let completedOfficialIds = new Set();
let userCreatedCount = 0;
let activeQuizSection = null;
let activeQuizAnswers = {};

/* Initialisation des variables intro de Section 0 */
let introState = JSON.parse(localStorage.getItem('section0_visited') || '{"eval":false,"res":false,"tuto":false}');

function visitIntroItem(type) {
    introState[type] = true;
    localStorage.setItem('section0_visited', JSON.stringify(introState));
    
    // Enlever le clignotement de la carte cliquée
    const clickedCard = document.getElementById(`card-intro-${type}`);
    if (clickedCard) clickedCard.classList.remove('pulsing');
    
    // Faire clignoter la carte suivante non visitée
    if (type === 'eval' && !introState.res) {
        document.getElementById('card-intro-res').classList.add('pulsing');
    } else if (type === 'res' && !introState.tuto) {
        document.getElementById('card-intro-tuto').classList.add('pulsing');
    }

    updateIntroUI();
    applyFilters(); // Recalculer l'état global et verrous
}

function updateIntroUI() {
    const keys = ['eval', 'res', 'tuto'];
    keys.forEach(k => {
        const el = document.getElementById(`status-intro-${k}`);
        if (el) {
            if (introState[k]) {
                el.innerHTML = "✅ Visité";
                el.style.color = "var(--green)";
            } else {
                el.innerHTML = "❌ Non visité";
                el.style.color = "var(--red)";
            }
        }
    });
}

function isSection0Completed() {
    return introState.eval && introState.res && introState.tuto;
}

/* === RECUPERATION DES STATUTS DEPUIS L'API SUPABASE === */
async function fetchProgressAndCreatedExos() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.email) return;

    try {
        // 1. Récupérer l'historique de progression
        const progressRes = await fetch(`/api/progress/${user.email}`);
        if (progressRes.ok) {
            const progressData = await progressRes.json();
            completedOfficialIds = new Set(
                progressData
                    .filter(p => p.status === 'COMPLETED')
                    .map(p => p.exercises ? p.exercises.official_id : null)
                    .filter(id => id !== null)
            );
        }

        // 2. Récupérer le nombre de créations de cet utilisateur
        const exercisesRes = await fetch(`/api/exercises`);
        if (exercisesRes.ok) {
            const exercisesData = await exercisesRes.json();
            const createdByUser = exercisesData.filter(exo => exo.creator_id === user.id);
            userCreatedCount = createdByUser.length;
        }

    } catch (err) {
        console.error("Erreur lors de la récupération de la progression :", err);
    }
}

/* === RENDU DES CARTES D'EXERCICES AVEC PROGRESSION === */
function renderSectionCards(gridId, list, isSectionUnlocked) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';

    list.forEach((ex, index) => {
        const card = document.createElement('div');
        
        // Déterminer le statut de verrouillage
        // L'exercice 0 d'une section déverrouillée est ouvert. L'exercice K est ouvert si l'exercice K-1 est terminé.
        let isExUnlocked = true; // TEMP UNLOCK FOR TESTING

        const isCompleted = completedOfficialIds.has(ex.id);
        const lockIcon = getLockSvg(!isExUnlocked);
        const starIcon = getStarSvg(isCompleted);

        card.className = `ex-card ${ex.difficulty} ${!isExUnlocked ? 'locked-card' : ''}`;
        
        // Ajouter un effet de clignotement sur le premier exercice disponible non complété
        if (isSectionUnlocked && isExUnlocked && !isCompleted && (index === 0 || completedOfficialIds.has(list[index - 1].id))) {
            card.classList.add('pulsing');
        }

        card.innerHTML = `
          <div class="card-top">
            <div class="card-actions-top">
                <span class="lock-indicator">${lockIcon}</span>
                <span class="star-indicator" onclick="event.stopPropagation(); showFunFact(${ex.id}, ${isCompleted})">${starIcon}</span>
            </div>
            <span class="badge ${ex.difficulty}">${DIFF_LABEL[ex.difficulty]}</span>
          </div>
          <div class="category-tag">${ex.category}</div>
          <div class="card-title">${ex.title}</div>
          <div class="card-desc">${ex.desc}</div>
          <div class="card-footer">
            <div class="card-meta">
               <div class="meta-item">🕒 ${ex.duration}</div>
               <div class="meta-item">❓ ${ex.questions}</div>
            </div>
            <button class="btn-start" ${!isExUnlocked ? 'disabled' : ''} onclick="startExercise('${ex.id}', '${ex.title.replace(/'/g, "\\'")}', false)">
              Commencer →
            </button>
          </div>
        `;
        grid.appendChild(card);
    });
}

async function deleteCommunityExo(id) {
    if (!confirm("Voulez-vous vraiment supprimer cet exercice du catalogue ?"))
        return;
    try {
        const res = await fetch(`/api/exercises/${id}`, { method: 'DELETE' });
        if (res.ok) {
            alert("L'exercice a été retiré du catalogue.");
            await loadAndRender(); // Recharge depuis l'API
        } else {
            const err = await res.json();
            alert("Erreur : " + (err.error || 'Impossible de supprimer'));
        }
    } catch(err) {
        console.error('Erreur suppression:', err);
        alert("Erreur réseau lors de la suppression.");
    }
}
/* ─── FILTRES ─── */
function setFilter(diff, btn) {
    currentFilter = diff;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn)
        btn.classList.add('active');
    applyFilters();
}
function filterCards() { applyFilters(); }
// ✅ Source de vérité pour les exos custom (remplie par l'API)
let CUSTOM_EXERCISES_FROM_API = [];


async function loadAndRender() {
    try {
        const res = await fetch('/api/exercises');
        if (res.ok) {
            const data = await res.json();
            // Filtrer pour ne garder que les exercices créés par les utilisateurs (non officiels)
            const communityOnly = data.filter(exo => !exo.is_official && !exo.official_id);
            
            // Mapping format API → format carte
            CUSTOM_EXERCISES_FROM_API = communityOnly.map(exo => ({
                id: exo.id,
                icon: '👥',
                title: exo.title,
                desc: exo.description || 'Exercice personnalisé',
                difficulty: 'easy',
                category: 'Communauté',
                duration: 'Auto',
                questions: '?',
                isCustom: true,
                creator_id: exo.creator_id
            }));
        }
    } catch(err) {
        console.warn('⚠️ API indisponible pour les exos custom:', err.message);
        // Fallback localStorage
        const localCustom = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
        CUSTOM_EXERCISES_FROM_API = localCustom.map(exo => ({
            id: exo.id, icon: '👥', title: exo.title, desc: exo.description || '',
            difficulty: 'easy', category: 'Communauté', duration: 'Auto', questions: '?', isCustom: true
        }));
    }
    applyFilters();
}

async function applyFilters() {
    // 1. Charger la progression utilisateur et les exos créés depuis l'API
    await fetchProgressAndCreatedExos();

    updateIntroUI();

    var _a;
    const q = (((_a = document.getElementById('searchInput')) === null || _a === void 0 ? void 0 : _a.value) || '').toLowerCase().trim();
    const baseExercises = [...EXERCISES];
    const formattedCustoms = [...CUSTOM_EXERCISES_FROM_API];

    // Mettre à jour les statistiques de la barre d'outils
    const statTotalValue = document.getElementById('statTotal');
    if (statTotalValue) statTotalValue.textContent = baseExercises.length + formattedCustoms.length;
    const statEasyValue = document.getElementById('statEasy');
    if (statEasyValue) statEasyValue.textContent = baseExercises.filter(e => e.difficulty === 'easy').length + formattedCustoms.filter(e => e.difficulty === 'easy').length;
    const statMediumValue = document.getElementById('statMedium');
    if (statMediumValue) statMediumValue.textContent = baseExercises.filter(e => e.difficulty === 'medium').length + formattedCustoms.filter(e => e.difficulty === 'medium').length;
    const statHardValue = document.getElementById('statHard');
    if (statHardValue) statHardValue.textContent = baseExercises.filter(e => e.difficulty === 'hard').length + formattedCustoms.filter(e => e.difficulty === 'hard').length;

    // Détermination de l'état de déverrouillage de chaque section
    const sec1Unlocked = true; // TEMP UNLOCK FOR TESTING
    const sec1QuizCompleted = true; // TEMP UNLOCK FOR TESTING

    const sec2Unlocked = true; // TEMP UNLOCK FOR TESTING
    const sec2QuizCompleted = true; // TEMP UNLOCK FOR TESTING

    const sec3Unlocked = true; // TEMP UNLOCK FOR TESTING
    const sec3QuizCompleted = true; // TEMP UNLOCK FOR TESTING

    const sec4Unlocked = true; // TEMP UNLOCK FOR TESTING
    const sec4QuizCompleted = true; // TEMP UNLOCK FOR TESTING

    const finalUnlocked = true; // TEMP UNLOCK FOR TESTING

    // Configurer l'opacité et les filtres des conteneurs de section
    updateSectionContainer('section-1-container', sec1Unlocked);
    updateSectionContainer('section-2-container', sec2Unlocked);
    updateSectionContainer('section-3-container', sec3Unlocked);
    updateSectionContainer('section-4-container', sec4Unlocked);
    updateSectionContainer('section-final-container', finalUnlocked);

    // Initialiser et afficher les flèches Lottie si les quiz précédents sont complétés
    toggleArrowLottie('arrow-0-1', sec1Unlocked, 0);
    toggleArrowLottie('arrow-1-2', sec2Unlocked, 1);
    toggleArrowLottie('arrow-2-3', sec3Unlocked, 2);
    toggleArrowLottie('arrow-3-4', sec4Unlocked, 3);
    toggleArrowLottie('arrow-4-final', finalUnlocked, 4);

    // Rendu de chaque section d'exercices officiels
    Object.keys(SECTIONS_CONFIG).forEach(secKey => {
        const conf = SECTIONS_CONFIG[secKey];
        const secExos = baseExercises.filter(e => conf.exos.includes(e.id));
        
        // Appliquer la recherche locale
        const filteredSecExos = secExos.filter(e => {
            if (currentFilter !== 'tous' && e.difficulty !== currentFilter) return false;
            if (q && !e.title.toLowerCase().includes(q) && !(e.desc || '').toLowerCase().includes(q)) return false;
            return true;
        });

        const isSecUnlocked = secKey == 1 ? sec1Unlocked : (secKey == 2 ? sec2Unlocked : (secKey == 3 ? sec3Unlocked : sec4Unlocked));
        renderSectionCards(conf.gridId, filteredSecExos, isSecUnlocked);
        
        // Ajouter la carte de Quiz de Section à la fin de la grille
        appendQuizCard(conf.gridId, secKey, isSecUnlocked);
    });

    // Rendu des exercices communautaires
    const filteredCustom = formattedCustoms.filter(e => {
        if (currentFilter !== 'tous' && e.difficulty !== currentFilter) return false;
        if (q && !e.title.toLowerCase().includes(q) && !(e.desc || '').toLowerCase().includes(q)) return false;
        return true;
    });
    
    const gridCustom = document.getElementById('exGridCustom');
    if (gridCustom) {
        gridCustom.innerHTML = '';
        filteredCustom.forEach(ex => {
            const card = document.createElement('div');
            card.className = `ex-card ${ex.difficulty}`;
            
            let deleteBtn = '';
            if (isTeacher) {
                deleteBtn = `<button class="btn-delete-exo" onclick="event.stopPropagation(); deleteCommunityExo('${ex.id}')" title="Supprimer l'exercice">
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
                <button class="btn-start" onclick="startExercise('${ex.id}', '${ex.title.replace(/'/g, "\\'")}', true)">
                  Commencer →
                </button>
              </div>
            `;
            gridCustom.appendChild(card);
        });
    }

    // Gérer l'affichage de l'état final et des récompenses
    updateFinalProjectStatus(finalUnlocked);

    const empty = document.getElementById('emptyState');
    const hasAnyExos = baseExercises.length > 0 || formattedCustoms.length > 0;
    if (!hasAnyExos) {
        empty.classList.add('visible');
    } else {
        empty.classList.remove('visible');
    }
}

/* Helper pour mettre à jour l'opacité et l'accès d'une section entière */
function updateSectionContainer(id, unlocked) {
    const el = document.getElementById(id);
    if (!el) return;
    if (unlocked) {
        el.classList.remove('locked');
        el.style.pointerEvents = 'auto';
    } else {
        el.classList.add('locked');
        el.style.pointerEvents = 'none';
    }
}

/* Helper pour instancier les flèches Lottie */
let lottieArrows = {};
function toggleArrowLottie(containerId, show, index) {
    const el = document.getElementById(containerId);
    if (!el) return;

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
    } else {
        el.style.display = 'none';
        if (lottieArrows[containerId]) {
            lottieArrows[containerId].destroy();
            delete lottieArrows[containerId];
        }
    }
}

/* Insère la carte Quiz à la fin de la grille d'exercices d'une section */
function appendQuizCard(gridId, sectionKey, isSectionUnlocked) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const conf = SECTIONS_CONFIG[sectionKey];
    const quizCompleted = localStorage.getItem(`quiz_section_${sectionKey}_completed`) === 'true';
    
    // Le quiz n'est disponible que si TOUS les exercices de la section sont validés
    const allExosCompleted = conf.exos.every(id => completedOfficialIds.has(id));
    const isQuizUnlocked = true; // TEMP UNLOCK FOR TESTING

    const card = document.createElement('div');
    card.className = `ex-card quiz-card medium ${!isQuizUnlocked ? 'locked-card' : ''} ${quizCompleted ? 'quiz-completed' : ''}`;
    
    if (isQuizUnlocked && !quizCompleted) {
        card.classList.add('pulsing');
    }

    const lockIcon = getLockSvg(!isQuizUnlocked);
    const starIcon = getStarSvg(quizCompleted);

    card.innerHTML = `
      <div class="card-top">
        <div class="card-actions-top">
            <span class="lock-indicator">${lockIcon}</span>
            <span class="star-indicator">${starIcon}</span>
        </div>
        <span class="badge medium quiz-badge">🏅 Quiz</span>
      </div>
      <div class="category-tag">Évaluation</div>
      <div class="card-title">Validation de la Section ${sectionKey}</div>
      <div class="card-desc">Testez vos acquis théoriques pour débloquer la section suivante.</div>
      <div class="card-footer">
        <div class="card-meta">
           <div class="meta-item">🕒 5 min</div>
           <div class="meta-item">❓ 2</div>
        </div>
        <button class="btn-start" ${!isQuizUnlocked ? 'disabled' : ''} onclick="openQuizModal(${sectionKey})">
          ${quizCompleted ? 'Recommencer →' : 'Évaluer →'}
        </button>
      </div>
    `;
    grid.appendChild(card);
}

/* Gère l'affichage des verrous du projet final et du certificat */
function updateFinalProjectStatus(unlocked) {
    const statusText = document.getElementById('final-creation-status');
    const rewardCard = document.getElementById('reward-card');
    const trophyEmoji = document.getElementById('trophy-emoji');
    const btnCert = document.getElementById('btn-download-cert');

    if (userCreatedCount > 0) {
        statusText.innerHTML = `✅ ${userCreatedCount} exercice(s) créé(s)`;
        statusText.style.color = "var(--green)";
    } else {
        statusText.innerHTML = `❌ Aucun exercice créé`;
        statusText.style.color = "var(--red)";
    }

    const allQuizzesDone = [1, 2, 3, 4].every(sec => localStorage.getItem(`quiz_section_${sec}_completed`) === 'true');
    const isRewardUnlocked = unlocked && allQuizzesDone && userCreatedCount > 0;

    if (isRewardUnlocked) {
        rewardCard.classList.remove('locked');
        rewardCard.classList.add('unlocked');
        trophyEmoji.textContent = '🏆';
        btnCert.removeAttribute('disabled');
    } else {
        rewardCard.classList.add('locked');
        rewardCard.classList.remove('unlocked');
        trophyEmoji.textContent = '🔒';
        btnCert.setAttribute('disabled', 'true');
    }
}

/* === FUN FACTS WINDOWS / MODALS === */
function showFunFact(exoId, isCompleted) {
    if (!isCompleted) return;

    const titleEl = document.getElementById('funfact-title');
    const bodyEl = document.getElementById('funfact-content');
    
    titleEl.textContent = `💡 Le Saviez-vous ? (Exercice ${exoId})`;
    bodyEl.textContent = FUN_FACTS[exoId] || "L'intelligence artificielle est pleine de surprises !";

    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-funfact').style.display = 'block';
}

/* === GESTIONNAIRE DE QUIZ === */
const SECTION_QUIZ_CONFIG = {
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
        statements: [] // No Quiz 2 statements
    }
};

let customQuizErrors = 0;
let customQuizItemErrors: number[] = [];
let customQuiz1Matches: { [key: string]: string | null } = {};
let customQuiz2CurrentIndex = 0;
let customQuizIncorrectExos = new Set<number>();
let selectedDraggableId: string | null = null;

function initCustomQuizTicks() {
    const ticksGroup = document.getElementById('quiz-gauge-ticks');
    if (!ticksGroup) return;
    ticksGroup.innerHTML = '';
    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    const total = config ? config.totalItems : 13;
    for (let i = 0; i < total; i++) {
        const angle = (i * 360 / total) * Math.PI / 180;
        const rStart = 35;
        const rEnd = 39;
        const x1 = 50 + rStart * Math.cos(angle);
        const y1 = 50 + rStart * Math.sin(angle);
        const x2 = 50 + rEnd * Math.cos(angle);
        const y2 = 50 + rEnd * Math.sin(angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.setAttribute('class', 'gauge-tick');
        line.setAttribute('id', `gauge-tick-${i}`);
        line.setAttribute('stroke', '#4B5563'); // default gray
        ticksGroup.appendChild(line);
    }
}

function updateCustomQuizGauge() {
    const percentEl = document.getElementById('quiz-gauge-percent');
    const scoreEl = document.getElementById('quiz-gauge-score');
    const fillEl = document.getElementById('quiz-gauge-fill');
    if (!percentEl || !scoreEl || !fillEl) return;

    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    const total = config ? config.totalItems : 13;
    const score = Math.max(0, total - customQuizErrors);
    const percent = Math.round((score / total) * 100);

    percentEl.textContent = `${percent}%`;
    scoreEl.textContent = `${score}/${total}`;

    const circ = 282.74;
    const offset = circ - (percent / 100) * circ;
    fillEl.style.strokeDashoffset = offset.toString();

    if (percent >= 80) {
        fillEl.style.stroke = '#10B981';
    } else {
        fillEl.style.stroke = '#FF034D';
    }
}

function updateTickColor(i, success) {
    const tick = document.getElementById(`gauge-tick-${i}`);
    if (tick) {
        tick.setAttribute('stroke', success ? '#10B981' : '#FF034D');
    }
}

function openQuizModal(sectionKey) {
    activeQuizSection = sectionKey;
    activeQuizAnswers = {};

    const modal = document.getElementById('modal-quiz');
    if (modal) {
        if (sectionKey === 1 || sectionKey === 2 || sectionKey === 3 || sectionKey === 4) {
            modal.classList.add('large-modal');
        } else {
            modal.classList.remove('large-modal');
        }
    }

    const titleEl = document.getElementById('quiz-title');
    const bodyEl = document.getElementById('quiz-content');
    const footerEl = document.querySelector('.modal-footer');

    if (!titleEl || !bodyEl) return;

    if (sectionKey === 1 || sectionKey === 2 || sectionKey === 3 || sectionKey === 4) {
        const config = SECTION_QUIZ_CONFIG[sectionKey];
        titleEl.textContent = config.title;
        if (footerEl) footerEl.style.display = 'none';

        customQuizErrors = 0;
        customQuizItemErrors = Array(config.totalItems).fill(0);
        customQuiz1Matches = {};
        config.terms.forEach(t => {
            customQuiz1Matches[t.id] = null;
        });
        customQuiz2CurrentIndex = 0;
        customQuizIncorrectExos.clear();
        selectedDraggableId = null;

        bodyEl.innerHTML = `
            <div class="quiz-split-container">
              <div class="quiz-left-panel" id="quiz-left-panel"></div>
              <div class="quiz-right-panel">
                <div class="gauge-container">
                  <svg class="gauge-svg" viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="45"></circle>
                    <circle class="gauge-fill" id="quiz-gauge-fill" cx="50" cy="50" r="45"></circle>
                    <g id="quiz-gauge-ticks"></g>
                  </svg>
                  <div class="gauge-text">
                    <span class="gauge-percent" id="quiz-gauge-percent">100%</span>
                    <span class="gauge-score" id="quiz-gauge-score">${config.totalItems}/${config.totalItems}</span>
                  </div>
                </div>
                <div class="gauge-info-text" id="quiz-gauge-status">Seuil requis : 80%</div>
                <button class="btn-quit-quiz" onclick="closeAllModals()">
                  🚪 Retour aux exercices
                </button>
              </div>
            </div>
        `;

        initCustomQuizTicks();
        updateCustomQuizGauge();
        renderCustomQuiz1Matching();
    } else {
        if (footerEl) footerEl.style.display = 'flex';
        const quiz = QUIZZES[sectionKey];
        titleEl.textContent = quiz.title;
        bodyEl.innerHTML = '';

        quiz.questions.forEach((qObj, qIdx) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'quiz-question';
            qDiv.innerHTML = `<p>${qIdx + 1}. ${qObj.q}</p>`;

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            qObj.options.forEach((opt, optIdx) => {
                const optBtn = document.createElement('div');
                optBtn.className = 'quiz-option';
                optBtn.id = `q-${qIdx}-opt-${optIdx}`;
                optBtn.textContent = opt;
                optBtn.onclick = () => selectQuizOption(qIdx, optIdx);
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
    const quiz = QUIZZES[activeQuizSection];
    const qObj = quiz.questions[qIdx];
    
    qObj.options.forEach((_, optIdx) => {
        const el = document.getElementById(`q-${qIdx}-opt-${optIdx}`);
        if (el) el.classList.remove('selected');
    });

    const selectedEl = document.getElementById(`q-${qIdx}-opt-${optionIdx}`);
    if (selectedEl) selectedEl.classList.add('selected');

    activeQuizAnswers[qIdx] = optionIdx;
}

function submitQuiz() {
    const quiz = QUIZZES[activeQuizSection];
    let allCorrect = true;
    let fallbackExo = null;

    quiz.questions.forEach((qObj, qIdx) => {
        const userAnswer = activeQuizAnswers[qIdx];
        if (userAnswer !== qObj.answer) {
            allCorrect = false;
            if (fallbackExo === null) {
                fallbackExo = qObj.fallbackExo;
            }
        }
    });

    closeAllModals();

    if (allCorrect) {
        localStorage.setItem(`quiz_section_${activeQuizSection}_completed`, 'true');
        showToast(`🎉 Félicitations ! Quiz de la section ${activeQuizSection} validé.`, true);
        applyFilters();
    } else {
        showToast(`❌ Certaines réponses sont incorrectes. Révisez le cours.`, false);
        if (fallbackExo) {
            setTimeout(() => {
                alert(`Pour mieux comprendre vos erreurs, nous vous conseillons de réviser l'exercice ${fallbackExo}.`);
                const link = EXERCISE_LINKS[fallbackExo];
                if (link) window.location.href = link;
            }, 1000);
        }
    }
}

function renderCustomQuiz1Matching() {
    const leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel) return;

    leftPanel.innerHTML = `
        <h4 style="margin:0; font-size:16px; color:#fff; font-weight: 700;">Quiz 1 : Match les termes et leurs définitions</h4>
        <p style="margin:4px 0 16px 0; font-size:12.5px; color:#94a3b8; line-height:1.4;">
            Glissez-déposez les termes bleus dans les zones pointillées correspondantes, ou cliquez sur un terme puis sur sa zone cible.
        </p>
        
        <div class="matching-deck" id="matching-deck"></div>
        <div class="matching-targets" id="matching-targets"></div>
        <div class="quiz-feedback-box" id="quiz-feedback-box" style="display:none; margin-top: 15px;">
            <span class="feedback-icon" id="feedback-icon"></span>
            <span class="feedback-text" id="feedback-text"></span>
        </div>
    `;

    const deck = document.getElementById('matching-deck');
    const targetsContainer = document.getElementById('matching-targets');
    if (!deck || !targetsContainer) return;

    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    const terms = config.terms;
    const targets = config.targets;

    const shuffledTerms = [...terms].sort(() => Math.random() - 0.5);
    shuffledTerms.forEach(t => {
        const item = document.createElement('div');
        item.className = 'draggable-item';
        item.id = `drag-${t.id}`;
        item.textContent = t.name;
        item.draggable = true;
        
        item.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', t.id);
            item.classList.add('dragging');
        };
        item.ondragend = () => {
            item.classList.remove('dragging');
        };

        item.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.draggable-item').forEach(el => {
                el.style.border = '1px solid rgba(255, 255, 255, 0.15)';
            });
            if (selectedDraggableId === t.id) {
                selectedDraggableId = null;
            } else {
                selectedDraggableId = t.id;
                item.style.border = '2px solid #3b82f6';
            }
        };

        deck.appendChild(item);
    });

    const shuffledTargets = [...targets].sort(() => Math.random() - 0.5);
    shuffledTargets.forEach(tgt => {
        const row = document.createElement('div');
        row.className = 'matching-target-row';
        row.id = `row-${tgt.id}`;
        
        row.innerHTML = `
            <div class="matching-zone" id="zone-${tgt.id}">Dépose ici</div>
            <div class="matching-definition">${tgt.def}</div>
        `;

        const zone = row.querySelector(`#zone-${tgt.id}`);
        
        zone.ondragover = (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        };
        zone.ondragleave = () => {
            zone.classList.remove('dragover');
        };
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const termId = e.dataTransfer.getData('text/plain');
            handleMatchingDrop(termId, tgt.id, tgt.jalonIndex, tgt.fallbackExo);
        };

        row.onclick = () => {
            if (selectedDraggableId) {
                handleMatchingDrop(selectedDraggableId, tgt.id, tgt.jalonIndex, tgt.fallbackExo);
                selectedDraggableId = null;
                document.querySelectorAll('.draggable-item').forEach(el => {
                    el.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                });
            }
        };

        targetsContainer.appendChild(row);
    });
}

function handleMatchingDrop(termId, targetId, jalonIndex, fallbackExo) {
    if (customQuiz1Matches[targetId] !== null) return;

    const row = document.getElementById(`row-${targetId}`);
    const zone = document.getElementById(`zone-${targetId}`);
    const dragItem = document.getElementById(`drag-${termId}`);

    if (!row || !zone || !dragItem) return;

    if (termId === targetId) {
        customQuiz1Matches[targetId] = termId;
        zone.textContent = dragItem.textContent;
        zone.style.background = 'rgba(16, 185, 129, 0.1)';
        zone.style.border = '2px solid #10B981';
        zone.style.color = '#10B981';
        row.classList.add('correct');
        dragItem.style.display = 'none';

        updateTickColor(jalonIndex, customQuizItemErrors[jalonIndex] === 0);

        const allMatched = Object.values(customQuiz1Matches).every(v => v !== null);
        if (allMatched) {
            const feedbackBox = document.getElementById('quiz-feedback-box');
            if (feedbackBox) {
                feedbackBox.style.display = 'flex';
                feedbackBox.className = 'quiz-feedback-box correct';
                if (activeQuizSection === 4) {
                    feedbackBox.innerHTML = `
                        <span class="feedback-icon">🎉</span>
                        <span class="feedback-text">Excellent ! Quiz complété avec succès. Calcul des résultats...</span>
                    `;
                } else {
                    feedbackBox.innerHTML = `
                        <span class="feedback-icon">🎉</span>
                        <span class="feedback-text">Excellent ! Quiz 1 complété avec succès. Passage au Quiz 2 dans 2 secondes...</span>
                    `;
                }
            }
            setTimeout(() => {
                if (activeQuizSection === 4) {
                    renderCustomQuizResults();
                } else {
                    renderCustomQuiz2Sorting();
                }
            }, 2000);
        }
    } else {
        customQuizErrors++;
        customQuizItemErrors[jalonIndex]++;
        customQuizIncorrectExos.add(fallbackExo);

        row.classList.add('incorrect');
        updateCustomQuizGauge();
        
        setTimeout(() => {
            row.classList.remove('incorrect');
        }, 500);
    }
}

function renderCustomQuiz2Sorting() {
    const leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel) return;

    customQuiz2CurrentIndex = 0;
    selectedDraggableId = null;

    leftPanel.innerHTML = `
        <h4 style="margin:0; font-size:20px; color:#fff; font-weight: 700;">Quiz 2 : Vrai ou Faux ?</h4>
        <p style="margin:4px 0 16px 0; font-size:15px; color:#94a3b8; line-height:1.4;">
            Glissez-déposez chaque affirmation dans la zone VRAI ou FAUX correspondante, ou cliquez sur une carte puis sur une zone.
        </p>

        <div class="dragdrop-source" id="dragdrop-source"></div>

        <div class="dragdrop-drop-zones">
            <div class="dragdrop-drop-zone drop-zone-true" id="drop-zone-true">
                <div class="dragdrop-zone-header true-header">👍 VRAI</div>
                <div class="dragdrop-zone-cards" id="dropped-true-cards"></div>
            </div>
            <div class="dragdrop-drop-zone drop-zone-false" id="drop-zone-false">
                <div class="dragdrop-zone-header false-header">👎 FAUX</div>
                <div class="dragdrop-zone-cards" id="dropped-false-cards"></div>
            </div>
        </div>
    `;

    // Add feedback area to the right panel below the gauge
    const rightPanel = document.querySelector('.quiz-right-panel');
    if (rightPanel) {
        let feedbackArea = document.getElementById('quiz2-feedback-area');
        if (!feedbackArea) {
            feedbackArea = document.createElement('div');
            feedbackArea.id = 'quiz2-feedback-area';
            feedbackArea.className = 'quiz2-feedback-area';
            rightPanel.appendChild(feedbackArea);
        }
        feedbackArea.innerHTML = '<span style="color:#64748b; font-size:13px;">Déposez une carte pour voir le feedback ici.</span>';
    }

    const source = document.getElementById('dragdrop-source');
    if (!source) return;

    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    // Shuffle the statements for variety
    const shuffledIndices = config.statements.map((_, i) => i).sort(() => Math.random() - 0.5);

    shuffledIndices.forEach(idx => {
        const stmt = config.statements[idx];
        const card = document.createElement('div');
        card.className = 'drag-statement-card';
        card.id = `stmt-card-${idx}`;
        card.draggable = true;
        card.textContent = stmt.text;
        card.setAttribute('data-idx', idx.toString());

        card.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', idx.toString());
            card.classList.add('dragging');
        };
        card.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', idx.toString());
            card.classList.add('dragging');
        };
        card.ondragend = () => {
            card.classList.remove('dragging');
        };

        // Click-to-select fallback
        card.onclick = (e) => {
            e.stopPropagation();
            if (card.classList.contains('placed')) return;
            document.querySelectorAll('.drag-statement-card:not(.placed)').forEach(el => {
                el.classList.remove('selected-stmt');
            });
            if (selectedDraggableId === idx.toString()) {
                selectedDraggableId = null;
            } else {
                selectedDraggableId = idx.toString();
                card.classList.add('selected-stmt');
            }
        };

        source.appendChild(card);
    });

    // Setup drop zones
    setupQuiz2DropZone('drop-zone-true', true);
    setupQuiz2DropZone('drop-zone-false', false);
}

function setupQuiz2DropZone(zoneId, isTrue) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;

    zone.ondragover = (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    };
    zone.ondragleave = () => {
        zone.classList.remove('dragover');
    };
    zone.ondrop = (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const stmtIdx = parseInt(e.dataTransfer.getData('text/plain'));
        if (!isNaN(stmtIdx)) {
            handleQuiz2Drop(stmtIdx, isTrue);
        }
    };

    // Click-to-place fallback
    zone.onclick = () => {
        if (selectedDraggableId !== null) {
            const stmtIdx = parseInt(selectedDraggableId);
            if (!isNaN(stmtIdx)) {
                handleQuiz2Drop(stmtIdx, isTrue);
            }
            selectedDraggableId = null;
            document.querySelectorAll('.drag-statement-card').forEach(el => {
                el.classList.remove('selected-stmt');
            });
        }
    };
}

function handleQuiz2Drop(stmtIdx, chosenTrue) {
    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    const statement = config.statements[stmtIdx];
    if (!statement) return;

    const card = document.getElementById(`stmt-card-${stmtIdx}`);
    if (!card || card.classList.contains('placed')) return;

    const isCorrect = chosenTrue === statement.isTrue;
    const jalonIndex = config.terms.length + stmtIdx;

    // Move card to the target zone
    const targetCards = document.getElementById(chosenTrue ? 'dropped-true-cards' : 'dropped-false-cards');
    if (targetCards) {
        card.classList.add('placed');
        card.draggable = false;
        card.classList.remove('selected-stmt', 'dragging');

        if (isCorrect) {
            card.classList.add('correct-placed');
        } else {
            card.classList.add('incorrect-placed');
        }

        targetCards.appendChild(card);
    }

    // Update gauge ticks and score
    if (isCorrect) {
        updateTickColor(jalonIndex, true);
    } else {
        customQuizErrors++;
        customQuizItemErrors[jalonIndex]++;
        customQuizIncorrectExos.add(statement.fallbackExo);
        updateCustomQuizGauge();
        updateTickColor(jalonIndex, false);
    }

    // Show feedback in the right panel area
    const feedbackArea = document.getElementById('quiz2-feedback-area');
    if (feedbackArea) {
        feedbackArea.className = `quiz2-feedback-area ${isCorrect ? 'fb-correct' : 'fb-incorrect'}`;
        feedbackArea.innerHTML = `
            <div class="quiz2-fb-icon">${isCorrect ? '✅' : '❌'}</div>
            <div class="quiz2-fb-text">${isCorrect ? 'Correct !' : 'Faux !'} ${statement.feedback}</div>
        `;
    }

    // Check if all cards are placed
    const totalPlaced = document.querySelectorAll('.drag-statement-card.placed').length;
    if (totalPlaced === config.statements.length) {
        setTimeout(() => {
            renderCustomQuizResults();
        }, 2500);
    }
}

// Keep for backward compat — no longer used
function loadNextSortingStatement() {}
function handleSortingDecision(chosenTrue) {}

function startFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles: any[] = [];
    const colors = ['#FF034D', '#FACC15', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'];

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        alpha: number;
        decay: number;
        color: string;
        size: number;
        constructor(x: number, y: number, color: string) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
            this.color = color;
            this.size = Math.random() * 3 + 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravity
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class Firework {
        x: number;
        y: number;
        tx: number;
        ty: number;
        vx: number;
        vy: number;
        color: string;
        exploded: boolean;
        constructor() {
            this.x = Math.random() * width;
            this.y = height;
            this.tx = Math.random() * width;
            this.ty = Math.random() * (height * 0.5);
            const angle = Math.atan2(this.ty - this.y, this.tx - this.x);
            const speed = Math.random() * 5 + 10;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.vy >= 0 || this.y <= this.ty) {
                this.explode();
                this.exploded = true;
            }
        }
        explode() {
            const count = Math.floor(Math.random() * 40) + 60;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const fireworks: any[] = [];
    let active = true;

    const interval = setInterval(() => {
        if (!active) return;
        fireworks.push(new Firework());
    }, 300);

    setTimeout(() => {
        active = false;
        clearInterval(interval);
        setTimeout(() => {
            canvas.remove();
        }, 3000);
    }, 6000);

    function loop() {
        ctx.clearRect(0, 0, width, height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            } else {
                fireworks[i].draw();
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            } else {
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
    const leftPanel = document.getElementById('quiz-left-panel');
    if (!leftPanel) return;

    const config = SECTION_QUIZ_CONFIG[activeQuizSection];
    const total = config ? config.totalItems : 13;
    const score = Math.max(0, total - customQuizErrors);
    const percent = Math.round((score / total) * 100);
    const passed = percent >= 80;

    if (passed) {
        localStorage.setItem(`quiz_section_${activeQuizSection}_completed`, 'true');
        try {
            startFireworks();
        } catch (e) {
            console.error(e);
        }
        leftPanel.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <span style="font-size: 64px; display: block; margin-bottom: 15px; animation: bounce 1s infinite alternate;">🏆</span>
                <h3 style="font-size: 22px; font-weight: 800; color: #10B981; margin: 0 0 10px 0;">Section ${activeQuizSection} Validée !</h3>
                <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0 0 24px 0;">
                    Félicitations, vous avez obtenu un score de <strong>${score}/${total} (${percent}%)</strong>. 
                    Vous maîtrisez parfaitement les concepts de cette section ! Le parcours suivant est débloqué.
                </p>
                <button class="btn-start" onclick="closeAndApplyFilters()" style="background:#10B981; padding: 12px 36px; font-size: 15px; font-weight:700; border-radius:12px;">
                    Continuer le Parcours
                </button>
            </div>
        `;
    } else {
        let recommendationHTML = '';
        if (customQuizIncorrectExos.size > 0) {
            recommendationHTML = `
                <div style="text-align: left; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 15px; margin: 20px 0;">
                    <h5 style="margin: 0 0 8px 0; color: #ef4444; font-size: 13.5px; font-weight: 700;">📚 Recommandations de révision (V3) :</h5>
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #94a3b8; line-height: 1.4;">
                        En analysant vos erreurs, nous vous conseillons vivement de refaire les exercices suivants pour maîtriser ces concepts :
                    </p>
                    <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; color: #cbd5e1; line-height: 1.6;">
            `;
            customQuizIncorrectExos.forEach(exId => {
                const exoObj = EXERCISES.find(e => e.id === exId);
                const exoTitle = exoObj ? exoObj.title : `Exercice ${exId}`;
                recommendationHTML += `<li>${exoTitle}</li>`;
            });
            recommendationHTML += `
                    </ul>
                </div>
            `;
        }

        leftPanel.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <span style="font-size: 64px; display: block; margin-bottom: 15px;">❌</span>
                <h3 style="font-size: 22px; font-weight: 800; color: #FF034D; margin: 0 0 10px 0;">Score insuffisant (${percent}%)</h3>
                <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin: 0 0 15px 0;">
                    Vous avez obtenu <strong>${score}/${total}</strong>. Le seuil requis pour valider cette section est de <strong>80% (${Math.ceil(total * 0.8)}/${total})</strong>.
                </p>
                
                ${recommendationHTML}
                
                <button class="btn-start" onclick="openQuizModal(${activeQuizSection})" style="background:#FF034D; padding: 12px 36px; font-size: 15px; font-weight:700; border-radius:12px;">
                    Recommencer le Quiz
                </button>
            </div>
        `;
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
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isSuccess ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)';
    toast.style.color = 'white';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* === GENERATION DU CERTIFICAT === */
function downloadCertificate() {
    const canvas = document.getElementById('cert-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const user = JSON.parse(localStorage.getItem('currentUser')) || { prenom: 'Étudiant', nom: 'Neural' };
    const fullName = `${user.prenom || ''} ${user.nom || ''}`.trim();

    // Fond dégradé premium
    const grad = ctx.createLinearGradient(0, 0, 800, 600);
    grad.addColorStop(0, '#0b0f1a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);

    // Bordure dorée
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 760, 560);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(35, 35, 730, 530);

    // Titres & Textes
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICAT DE RÉUSSITE', 400, 150);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText('Le présent certificat est décerné à', 400, 230);

    // Nom de l'étudiant
    ctx.fillStyle = '#FACC15';
    ctx.font = '800 42px Inter, sans-serif';
    ctx.fillText(fullName.toUpperCase(), 400, 300);

    // Texte d'attribution
    ctx.fillStyle = '#eef2ff';
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText("Pour avoir complété avec succès l'intégralité du parcours pédagogique", 400, 370);
    ctx.fillText("et validé l'évaluation finale de Neural Playground.", 400, 400);

    // Date
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '500 14px Inter, sans-serif';
    ctx.fillText(`Délivré le ${today}`, 400, 480);

    // Signature/Logo
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '800 22px Inter, sans-serif';
    ctx.fillText("Hi! Paris Playground", 400, 520);

    // Lancer le téléchargement
    const link = document.createElement('a');
    link.download = `Certificat_HiParis_${fullName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

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
    }
    else {
        // Redirection vers le playground par défaut pour les exercices sans wrapper
        window.location.href = `../playground/index.html?exo=${id}`;
    }
}

/* Exposer les fonctions globales */
window.visitIntroItem = visitIntroItem;
window.openQuizModal = openQuizModal;
window.selectQuizOption = selectQuizOption;
window.submitQuiz = submitQuiz;
window.closeAllModals = closeAllModals;
window.downloadCertificate = downloadCertificate;
window.showFunFact = showFunFact;
window.closeAndApplyFilters = closeAndApplyFilters;

// ✅ Chargement initial depuis l'API
loadAndRender();
const backgroundContainer = document.getElementById('background-container');
const formulas = [
    '\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c',
    '\\frac{dy}{dx}', '\\lim_{x \\to \\infty}', '\\binom{n}{k}',
    '\\alpha', '\\beta', '\\gamma', '\\delta', '\\epsilon', '\\zeta', '\\eta', '\\theta',
    '\\sin(t)', '\\cos(t)', 'e^{-t}', 't^2',
    'x(t) = r \\cos(t), y(t) = r \\sin(t)' // Arc paramétrique
];
const numFormulas = 25; // Augmentation du nombre de formules
const numNeurons = 30; // Augmentation du nombre de neurones
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
    }
    else if (type === 'neuron') {
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
        if (neurons.length < 2)
            continue;
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
        if (currentX > windowWidth * 1.1)
            formula.style.left = `${getRandom(-20, 0)}vw`;
        if (currentX < -windowWidth * 0.1)
            formula.style.left = `${getRandom(windowWidth, windowWidth * 1.2)}vw`;
        if (currentY > windowHeight * 1.1)
            formula.style.top = `${getRandom(-20, 0)}vh`;
        if (currentY < -windowHeight * 0.1)
            formula.style.top = `${getRandom(windowHeight, windowHeight * 1.2)}vh`;
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
    connections.forEach((conn, index) => {
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
        const length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
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
