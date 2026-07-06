// Chronomètre global pour les exercices natifs
let pageStartTime = Date.now();

// Si l'utilisateur n'est pas connecté et qu'il actualise la page, on nettoie son état local temporaire
(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Liste des clés de progression temporaire à nettoyer au rafraîchissement
        const keysToClear = [
            'section0_visited',
            'quiz_section_1_completed',
            'quiz_section_2_completed',
            'quiz_section_3_completed',
            'quiz_section_4_completed',
            'temp_completed_exos' // Clé pour stocker les IDs d'exos réussis temporairement
        ];
        // Si c'est un chargement initial/rechargement de page (sessionStorage sert à détecter la session active de l'onglet)
        if (!sessionStorage.getItem('session_active')) {
            keysToClear.forEach(key => localStorage.removeItem(key));
            sessionStorage.setItem('session_active', 'true');
        }
    } else {
        // Si l'utilisateur se connecte, on s'assure d'effacer la clé de session active temporaire
        sessionStorage.removeItem('session_active');
    }
})();

const StorageService = {
    /**
     * Sauvegarde l'exercice dans le profil (is_saved = true)
     * @param {number} officialId - L'ID numérique de l'exercice (1 à 17)
     */
    async save(officialId) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!isLoggedIn || !user.email) {
            alert("Please log in to save this exercise.");
            window.location.href = 'Page-demo/register.html';
            return false;
        }

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email.toLowerCase(),
                    official_id: officialId,
                    is_saved: true
                })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`✅ Exercice ${officialId} sauvegardé.`, result);
                return true;
            } else {
                console.error("❌ API error saving:", result);
                alert("Error during saving : " + (result.error || "Inconnu"));
                return false;
            }
        } catch (error) {
            console.error("❌ Network error saving:", error);
            alert("Network error. Check that the server is running.");
            return false;
        }
    },

    /**
     * Valide l'exercice (status = 'COMPLETED')
     * @param {number} officialId - L'ID numérique de l'exercice (1 à 17)
     * @param {number} manualTime - Temps optionnel fourni manuellement
     */
    async complete(officialId, manualTime = null) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!isLoggedIn || !user.email) {
            // Permet la réussite temporaire hors connexion
            console.log(`ℹ️ Succès temporaire pour l'exercice ${officialId} (non connecté)`);
            const tempExos = JSON.parse(localStorage.getItem('temp_completed_exos') || '[]');
            if (!tempExos.includes(officialId)) {
                tempExos.push(officialId);
                localStorage.setItem('temp_completed_exos', JSON.stringify(tempExos));
            }
            return true;
        }

        // Si le temps n'est pas fourni, on le calcule automatiquement
        const timeSpent = manualTime !== null ? manualTime : Math.floor((Date.now() - pageStartTime) / 1000);

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email.toLowerCase(), // On s'assure que c'est en minuscule
                    official_id: officialId,
                    status: 'COMPLETED',
                    time_spent: timeSpent
                })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`✅ Exercice ${officialId} validé.`, result);
                return true;
            } else {
                console.error("❌ API error validating:", result);
                alert("Error during validation : " + (result.error || "Inconnu"));
                return false;
            }
        } catch (error) {
            console.error("❌ Network error validation:", error);
            alert("Network error. Check that the server is running.");
            return false;
        }
    },

    /**
     * Retire l'exercice des favoris (is_saved = false)
     */
    async unSave(officialId, exerciseId = null) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!user.email) return false;

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    official_id: officialId,
                    exercise_id: exerciseId,
                    is_saved: false
                })
            });
            return response.ok;
        } catch (error) {
            console.error("❌ Error unSave:", error);
            return false;
        }
    },

    /**
     * Retire le statut réalisé (status = null)
     */
    async unComplete(officialId, exerciseId = null) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!user.email) return false;

        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    official_id: officialId,
                    exercise_id: exerciseId,
                    status: null
                })
            });
            return response.ok;
        } catch (error) {
            console.error("❌ Error unComplete:", error);
            return false;
        }
    }
};

// Exportation globale pour être accessible depuis tous les fichiers exoX_page.js
window.StorageService = StorageService;
