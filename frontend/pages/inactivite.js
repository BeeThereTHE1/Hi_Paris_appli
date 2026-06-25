// --- SYSTEME D'AUTO-DECONNEXION ET GESTION DE PROGRESSION/VERROUILLAGE ---
(function () {
    // 🔧 DEV_MODE : mettre à false pour réactiver le verrouillage en production
    const DEV_MODE = true;

    // Helper pour afficher l'écran de complétion avec confettis sur la page principale de l'exercice
    function showCompletionScreen(exoId) {
        // Enlever les overlays de complétion restants
        document.querySelectorAll(".completion-overlay").forEach(el => el.remove());

        const overlay = document.createElement("div");
        overlay.className = "completion-overlay";

        // Déterminer le lien de l'exercice suivant (max 17 exercices)
        const nextExoId = exoId + 1;
        const nextExoExists = nextExoId <= 17;
        const nextExoLink = nextExoExists ? `exo${nextExoId}.html` : `Page-demo/exercises.html`;
        const nextButtonText = nextExoExists ? "🚀 Next Exercise" : "🏠 Return to Dashboard";

        overlay.innerHTML = `
          <div class="completion-card">
            <!-- Canvas pour l'effet confettis -->
            <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

            <!-- Grande étoile animée (zoom + rotation) -->
            <div class="completion-star-wrap">
              <span class="completion-star">⭐</span>
            </div>

            <!-- Titre et message de félicitations -->
            <h2 class="completion-title">Well Done!</h2>
            <p class="completion-msg">You have finished this exercise.<br>
              Go back home to the dashboard,<br>
              <strong>next exercise has been unlocked!</strong>
            </p>

            <!-- Actions -->
            <div class="completion-actions">
              <a class="completion-btn-next pulse-btn" href="${nextExoLink}">
                ${nextButtonText}
              </a>
            </div>
          </div>

          <!-- Bouton Maison clignotant en bas à droite -->
          <a class="completion-home-icon blink-btn" href="Page-demo/exercises.html" title="Back to Dashboard">
            🏠
          </a>
        `;

        document.body.appendChild(overlay);

        // Transition d'apparition (opacity 0 -> 1)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add("show"));
        });

        // Lancement des confettis animés
        requestAnimationFrame(() => launchConfetti());
    }

    function launchConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const COLORS = ["#FF034D", "#FFD700", "#10b981", "#6366f1", "#ffffff", "#FF6B35"];
        const pieces = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            speed: Math.random() * 3 + 1.5,
            spin: (Math.random() - 0.5) * 0.15,
            angle: Math.random() * Math.PI * 2,
            drift: (Math.random() - 0.5) * 1.5
        }));

        let frame = 0;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.y += p.speed;
                p.x += p.drift;
                p.angle += p.spin;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
                ctx.restore();
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });
            frame++;
            if (frame < 300) requestAnimationFrame(draw); // ~5s
        }
        draw();
    }

    // 1. Détection et vérification de la progression/verrouillage pour les exercices (exo*.html et exo*_quiz.html)
    async function initProgressionCheck() {
        const path = window.location.pathname;
        const match = path.match(/exo(\d+)(_quiz)?\.html/);
        if (!match) return; // Pas sur un exercice ou un quiz, rien à faire

        const currentExoId = parseInt(match[1]);
        const isQuizPage = !!match[2];

        // Afficher l'écran de complétion si l'exercice vient d'être terminé
        if (!isQuizPage) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('completed') === 'true') {
                showCompletionScreen(currentExoId);
            }
        }

        if (DEV_MODE) return; // Court-circuit total : aucun verrouillage en mode dev
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

        if (!isLoggedIn || !user.email) {
            alert("🔒 Veuillez vous connecter pour accéder aux exercices.");
            const redirectPath = isQuizPage ? '../Page-demo/register.html' : 'Page-demo/register.html';
            window.location.href = redirectPath;
            return;
        }

        // Configuration des sections
        const SECTIONS_CONFIG = {
            1: [1, 2, 3, 5],
            2: [6, 4, 7, 8],
            3: [9, 10, 11, 17, 13, 14],
            4: [16, 12, 15]
        };

        function isSection0Completed() {
            const introState = JSON.parse(localStorage.getItem('section0_visited') || '{"eval":false,"res":false,"tuto":false}');
            return introState.eval && introState.res && introState.tuto;
        }

        // Récupérer la progression de l'utilisateur (Supabase API)
        let completedOfficialIds = new Set();
        try {
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
        } catch (err) {
            console.error("Erreur récupération progression dans inactivite.js :", err);
        }

        function isExerciseUnlocked(id) {
            // Trouver la section de l'exercice
            let sectionKey = null;
            for (const [key, list] of Object.entries(SECTIONS_CONFIG)) {
                if (list.includes(id)) {
                    sectionKey = parseInt(key);
                    break;
                }
            }
            if (!sectionKey) return true; // Hors parcours déverrouillés par défaut

            // Vérification des étapes de sections
            const sec1Unlocked = isSection0Completed();
            if (sectionKey === 1) {
                if (!sec1Unlocked) return false;
            } else if (sectionKey === 2) {
                const sec1QuizCompleted = localStorage.getItem('quiz_section_1_completed') === 'true';
                if (!(sec1Unlocked && sec1QuizCompleted)) return false;
            } else if (sectionKey === 3) {
                const sec1QuizCompleted = localStorage.getItem('quiz_section_1_completed') === 'true';
                const sec2QuizCompleted = localStorage.getItem('quiz_section_2_completed') === 'true';
                if (!(sec1Unlocked && sec1QuizCompleted && sec2QuizCompleted)) return false;
            } else if (sectionKey === 4) {
                const sec1QuizCompleted = localStorage.getItem('quiz_section_1_completed') === 'true';
                const sec2QuizCompleted = localStorage.getItem('quiz_section_2_completed') === 'true';
                const sec3QuizCompleted = localStorage.getItem('quiz_section_3_completed') === 'true';
                if (!(sec1Unlocked && sec1QuizCompleted && sec2QuizCompleted && sec3QuizCompleted)) return false;
            }

            // Vérification de l'ordre au sein de la section
            const sectionExos = SECTIONS_CONFIG[sectionKey];
            const index = sectionExos.indexOf(id);
            if (index === 0) {
                return true;
            } else {
                const prevEx = sectionExos[index - 1];
                return completedOfficialIds.has(prevEx);
            }
        }

        // Si c'est un quiz, on s'assure d'abord que l'exercice correspondant a été résolu localement dans la session
        if (isQuizPage) {
            const isSolved = sessionStorage.getItem(`exo_${currentExoId}_solved`) === 'true';
            const isAlreadyCompleted = completedOfficialIds.has(currentExoId);
            if (!isSolved && !isAlreadyCompleted) {
                alert("🔒 Vous devez d'abord réussir l'exercice avant de pouvoir accéder au quiz d'évaluation.");
                window.location.href = `../exo${currentExoId}.html`;
                return;
            }
        } else {
            // Si c'est l'exercice standard et qu'il est verrouillé dans le parcours
            if (!isExerciseUnlocked(currentExoId)) {
                alert("🔒 Cet exercice est verrouillé. Veuillez suivre la progression dans l'ordre.");
                window.location.href = 'Page-demo/exercises.html';
                return;
            }
        }

        // Gestion des boutons dans le footer
        const btnRealise = document.getElementById('btn-realise');
        const btnSauvegarder = document.getElementById('btn-sauvegarder');

        if (!isQuizPage) {
            // PAGE D'EXERCICE
            if (btnRealise) {
                btnRealise.innerHTML = '<span class="icon">📝</span> Évaluer mes connaissances';
                
                // Si l'exercice est complété en base de données
                const isCompletedDb = completedOfficialIds.has(currentExoId);
                if (isCompletedDb) {
                    btnRealise.disabled = false;
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    sessionStorage.setItem(`exo_${currentExoId}_solved`, 'true');
                } else {
                    // Sinon, si l'exercice n'est pas résolu dans la session en cours, on s'assure qu'il est bien désactivé
                    const isSolvedLocal = sessionStorage.getItem(`exo_${currentExoId}_solved`) === 'true';
                    if (!isSolvedLocal) {
                        btnRealise.disabled = true;
                        btnRealise.classList.add('btn-disabled');
                        btnRealise.classList.remove('btn-success-ready');
                        sessionStorage.removeItem(`exo_${currentExoId}_solved`);
                    } else {
                        btnRealise.disabled = false;
                        btnRealise.classList.remove('btn-disabled');
                        btnRealise.classList.add('btn-success-ready');
                    }
                }

                // Intercepter le clic pour rediriger vers le quiz
                btnRealise.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `exoquiz/exo${currentExoId}_quiz.html`;
                }, true);
            }

            // Écouter le message de réussite venant de la simulation
            window.addEventListener('message', (event) => {
                if (event.data.type === 'EXO_SUCCESS' && event.data.exoId == currentExoId) {
                    sessionStorage.setItem(`exo_${currentExoId}_solved`, 'true');
                    if (btnRealise) {
                        btnRealise.disabled = false;
                        btnRealise.classList.remove('btn-disabled');
                        btnRealise.classList.add('btn-success-ready');
                    }
                }
            });

        } else {
            // PAGE DE QUIZ
            // Les boutons du footer sont cachés sur les pages quiz :
            // la progression COMPLETED n'est enregistrée QU'À LA FIN du popup de félicitation,
            // déclenchée par le JS du quiz lui-même (exo*_quiz_page.js → showCompletionScreen).
            if (btnSauvegarder) btnSauvegarder.style.display = 'none';
            if (btnRealise)    btnRealise.style.display = 'none';

            // Exposer l'exoId courant pour que le quiz JS puisse appeler StorageService.complete()
            window.__currentQuizExoId = currentExoId;
        }

        // Vérification et blocage des boutons de navigation (header)
        const navButtons = document.querySelectorAll('.universal-header .btn-header, header .btn-header');
        navButtons.forEach(btn => {
            const href = btn.getAttribute('href');
            if (!href) return;
            const btnMatch = href.match(/exo(\d+)(_quiz)?\.html/);
            if (!btnMatch) return;

            const targetId = parseInt(btnMatch[1]);

            // Pour la navigation, on vérifie si la cible est déverrouillée
            if (!isExerciseUnlocked(targetId)) {
                btn.classList.add('btn-nav-locked');
                if (!btn.innerHTML.includes('🔒')) {
                    btn.innerHTML = '🔒 ' + btn.innerHTML;
                }
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert(`🔒 L'exercice ciblé est verrouillé. Veuillez d'abord terminer les exercices précédents et valider les quiz de section.`);
                }, true);
            }
        });
    }

    // Lancement du contrôle
    document.addEventListener('DOMContentLoaded', initProgressionCheck);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initProgressionCheck();
    }

    // 2. Système de déconnexion automatique d'inactivité
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;

    let timerInactivite;
    const DUREE_MAX_INACTIVITE = 1800000; // 30 minutes

    const deconnexionAutomatique = () => {
        alert("🔒: Vous avez été déconnecté suite à 30 minutes d'inactivité.");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');

        const currentPath = window.location.pathname;
        if (currentPath.includes('/Page-demo/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    };

    const resetTimer = () => {
        clearTimeout(timerInactivite);
        timerInactivite = setTimeout(deconnexionAutomatique, DUREE_MAX_INACTIVITE);
    };

    ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt => {
        window.addEventListener(evt, resetTimer, { passive: true, capture: true });
    });

    window.addEventListener('message', (event) => {
        if (event.data === 'USER_ACTIVE_IN_IFRAME') {
            resetTimer();
        }
    });

    resetTimer();
})();

// --- SYNCHRONISATION DE LA LANGUE POUR LES BOUTONS (VALIDER/VALIDATE ET SAUVEGARDER/SAVE) ---
(function () {
    const syncLanguage = () => {
        let lang = 'fr';
        
        const checkDocLang = (doc) => {
            if (!doc) return null;
            
            // Cookie googtrans de Google Translate
            const cookieMatch = doc.cookie.match(/googtrans=([^;]+)/);
            if (cookieMatch) {
                const parts = cookieMatch[1].split('/');
                const l = parts[parts.length - 1];
                if (l) return l.toLowerCase();
            }
            
            // Attribut lang de la balise html
            const htmlLang = doc.documentElement.getAttribute('lang');
            if (htmlLang) {
                const l = htmlLang.split('-')[0].toLowerCase();
                if (l === 'en' || l === 'fr') return l;
            }
            
            // Classes de Google Translate
            if (doc.documentElement.classList.contains('translated-ltr') || 
                doc.documentElement.classList.contains('translated-rtl')) {
                return 'en';
            }
            return null;
        };

        let detected = checkDocLang(document);
        if (!detected && window.parent && window.parent !== window) {
            try {
                detected = checkDocLang(window.parent.document);
            } catch (e) {}
        }
        
        lang = detected || 'fr';
        const isEnglish = (lang === 'en');

        // 2. Mettre à jour les boutons du document courant (SAUVEGARDER / SAVE)
        const btnSauvegarder = document.getElementById('btn-sauvegarder');
        if (btnSauvegarder) {
            const text = btnSauvegarder.textContent || "";
            if (text.includes('SAUVEGARDER') || text.includes('SAVE')) {
                btnSauvegarder.innerHTML = isEnglish ? '<span class="icon">💾</span> SAVE' : '<span class="icon">💾</span> SAUVEGARDER';
            } else if (text.includes('Sauvegardé !') || text.includes('Saved !') || text.includes('Enregistré !')) {
                btnSauvegarder.innerHTML = isEnglish ? '✅ Saved !' : '✅ Sauvegardé !';
            } else if (text.includes('Enregistrer & Valider') || text.includes('Save & Validate')) {
                btnSauvegarder.innerHTML = isEnglish ? 'Save & Validate' : 'Enregistrer & Valider';
            }
        }

        const localValBtn = document.getElementById('validate-button');
        if (localValBtn) {
            const text = localValBtn.textContent || "";
            if (text.trim() === 'Valider' || text.trim() === 'Validate') {
                localValBtn.textContent = isEnglish ? 'Validate' : 'Valider';
            }
        }

        // 3. Mettre à jour les boutons dans les iFrames enfants (Valider / Validate)
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc) {
                    const iframeValBtn = iframeDoc.getElementById('validate-button');
                    if (iframeValBtn) {
                        const text = iframeValBtn.textContent || "";
                        if (text.trim() === 'Valider' || text.trim() === 'Validate') {
                            iframeValBtn.textContent = isEnglish ? 'Validate' : 'Valider';
                        }
                    }
                }
            } catch (e) {
                // Ignorer les erreurs d'origines ou d'initialisation d'iframes
            }
        });
    };

    // Exécuter immédiatement
    syncLanguage();

    // Exécuter au chargement du DOM
    document.addEventListener('DOMContentLoaded', syncLanguage);

    // Écouter le chargement des iframes pour réappliquer la traduction
    window.addEventListener('load', (event) => {
        if (event.target.tagName === 'IFRAME') {
            syncLanguage();
        }
    }, true);

    // Écouter les changements d'attributs sur l'élément HTML (lang / class)
    const observer = new MutationObserver(syncLanguage);
    if (document.documentElement) {
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang', 'class']
        });
    }

    if (window.parent && window.parent !== window) {
        try {
            const parentObserver = new MutationObserver(syncLanguage);
            parentObserver.observe(window.parent.document.documentElement, {
                attributes: true,
                attributeFilter: ['lang', 'class']
            });
        } catch (e) {}
    }

    // Intervalle léger (toutes les 800ms) pour assurer la synchronisation en toutes circonstances
    setInterval(syncLanguage, 800);
})();
