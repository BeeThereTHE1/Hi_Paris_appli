// Chronomètre global pour les exercices natifs
let pageStartTime = Date.now();

const StorageService = {
    /**
     * Sauvegarde l'exercice dans le profil (is_saved = true)
     * @param {number} officialId - L'ID numérique de l'exercice (1 à 17)
     */
    async save(officialId) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!isLoggedIn || !user.email) {
            alert("Veuillez vous connecter pour sauvegarder cet exercice.");
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
                console.error("❌ Erreur API sauvegarde:", result);
                alert("Erreur lors de la sauvegarde : " + (result.error || "Inconnu"));
                return false;
            }
        } catch (error) {
            console.error("❌ Erreur réseau sauvegarde:", error);
            alert("Erreur réseau. Vérifiez que le serveur est lancé.");
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
            alert("Veuillez vous connecter pour enregistrer votre progression.");
            window.location.href = 'Page-demo/register.html';
            return false;
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
                console.error("❌ Erreur API validation:", result);
                alert("Erreur lors de la validation : " + (result.error || "Inconnu"));
                return false;
            }
        } catch (error) {
            console.error("❌ Erreur réseau validation:", error);
            alert("Erreur réseau. Vérifiez que le serveur est lancé.");
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
            console.error("❌ Erreur unSave:", error);
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
            console.error("❌ Erreur unComplete:", error);
            return false;
        }
    }
};

// Exportation globale pour être accessible depuis tous les fichiers exoX_page.js
window.StorageService = StorageService;
