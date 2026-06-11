// --- SYSTEME D'AUTO-DECONNEXION ET GESTION DE PROGRESSION/VERROUILLAGE ---
(function () {
    // 1. Détection et vérification de la progression/verrouillage pour les exercices (exo*.html)
    async function initProgressionCheck() {
        const path = window.location.pathname;
        const match = path.match(/exo(\d+)\.html/);
        if (!match) return; // Pas sur un exercice, rien à faire

        const currentExoId = parseInt(match[1]);
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

        if (!isLoggedIn || !user.email) {
            alert("🔒 Veuillez vous connecter pour accéder aux exercices.");
            window.location.href = 'Page-demo/register.html';
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
            if (!sectionKey) return true; // Exercices hors parcours (communauté...) déverrouillés par défaut

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

        // Si l'exercice en cours est verrouillé, on redirige
        if (!isExerciseUnlocked(currentExoId)) {
            alert("🔒 Cet exercice est verrouillé. Veuillez suivre la progression dans l'ordre.");
            window.location.href = 'Page-demo/exercises.html';
            return;
        }

        // Vérification et blocage des boutons Précédent / Suivant dans le header
        const navButtons = document.querySelectorAll('.universal-header .btn-header, header .btn-header');
        navButtons.forEach(btn => {
            const href = btn.getAttribute('href');
            if (!href) return;
            const btnMatch = href.match(/exo(\d+)\.html/);
            if (!btnMatch) return;

            const targetId = parseInt(btnMatch[1]);
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

    // Lancement du contrôle de verrouillage
    document.addEventListener('DOMContentLoaded', initProgressionCheck);
    // Cas où le script charge après DOMContentLoaded
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
