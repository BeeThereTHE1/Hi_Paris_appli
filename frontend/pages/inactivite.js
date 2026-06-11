// --- SYSTEME D'AUTO-DECONNEXION ET GESTION DE PROGRESSION/VERROUILLAGE ---
(function () {
    // 1. Détection et vérification de la progression/verrouillage pour les exercices (exo*.html et exo*_quiz.html)
    async function initProgressionCheck() {
        const path = window.location.pathname;
        const match = path.match(/exo(\d+)(_quiz)?\.html/);
        if (!match) return; // Pas sur un exercice ou un quiz, rien à faire

        const currentExoId = parseInt(match[1]);
        const isQuizPage = !!match[2];
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
            if (btnSauvegarder) {
                btnSauvegarder.style.display = 'none'; // Pas de sauvegarde de simulation sur le quiz
            }
            if (btnRealise) {
                btnRealise.innerHTML = '<span class="icon">⏭️</span> Quiz suivant';
                
                // Le bouton est actif pour le quiz
                btnRealise.disabled = false;
                btnRealise.classList.remove('btn-disabled');
                btnRealise.classList.add('btn-success-ready');

                btnRealise.addEventListener('click', async function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    btnRealise.disabled = true;
                    btnRealise.innerHTML = '⚡ Enregistrement...';
                    
                    // Sauvegarde dans la base de données (Supabase) via le service de stockage
                    if (window.StorageService) {
                        const success = await window.StorageService.complete(currentExoId);
                        if (success) {
                            alert("🎉 Quiz réussi et progression enregistrée !");
                            window.location.href = '../Page-demo/exercises.html';
                        } else {
                            btnRealise.disabled = false;
                            btnRealise.innerHTML = '<span class="icon">⏭️</span> Quiz suivant';
                        }
                    } else {
                        console.error("StorageService introuvable.");
                        alert("Erreur technique : Service de stockage manquant.");
                        btnRealise.disabled = false;
                        btnRealise.innerHTML = '<span class="icon">⏭️</span> Quiz suivant';
                    }
                }, true);
            }
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
