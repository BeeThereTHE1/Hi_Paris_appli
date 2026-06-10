// --- SYSTEME D'AUTO-DECONNEXION (15 MINUTES) ---
(function () {
    // Si l'utilisateur n'est pas connecté, le script ne fait rien
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;

    let timerInactivite;

    // Le délai en millisecondes : 15 minutes = 15 * 60 * 1000 = 900 000 ms.
    const DUREE_MAX_INACTIVITE = 1800000;

    // Étape 2 : L'action de déconnexion
    const deconnexionAutomatique = () => {
        alert("🔒: Vous avez été déconnecté suite à 30 minutes d'inactivité.");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');

        // Redirection propre
        const currentPath = window.location.pathname;
        if (currentPath.includes('/Page-demo/')) {
            window.location.href = '../index.html'; // Si on est dans le sous-dossier
        } else {
            window.location.href = 'index.html'; // Si on est à la racine de pages/
        }
    };

    // Étape 3 : La réinitialisation
    const resetTimer = () => {
        clearTimeout(timerInactivite); // On tue l'ancien timer
        timerInactivite = setTimeout(deconnexionAutomatique, DUREE_MAX_INACTIVITE); // On en crée un nouveau
    };

    // Étape 4A : Détecter l'activité sur la page principale
    ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt => {
        window.addEventListener(evt, resetTimer, { passive: true, capture: true });
    });

    // Étape 4B : Détecter l'activité venant de l'intérieur du simulateur (iFrame) !
    window.addEventListener('message', (event) => {
        if (event.data === 'USER_ACTIVE_IN_IFRAME') {
            resetTimer();
        }
    });

    // Étape 5 : Lancement initial
    resetTimer();
})();
