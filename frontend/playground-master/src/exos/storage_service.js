// Chronomètre global pour les exercices natifs
let pageStartTime = Date.now();

(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        const keysToClear = [
            'section0_visited',
            'quiz_section_1_completed',
            'quiz_section_2_completed',
            'quiz_section_3_completed',
            'quiz_section_4_completed',
            'temp_completed_exos'
        ];
        if (!sessionStorage.getItem('session_active')) {
            keysToClear.forEach(key => localStorage.removeItem(key));
            sessionStorage.setItem('session_active', 'true');
        }
    } else {
        sessionStorage.removeItem('session_active');
    }
})();

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser') || '{}');
    } catch (_error) {
        return {};
    }
}

function getCurrentUserId() {
    const user = getCurrentUser();
    return user.id || user.email || null;
}

function getApiClient() {
    return window.MLPlaygroundApiClient ? new window.MLPlaygroundApiClient() : null;
}

async function saveWithApiClient(officialId, payload) {
    const apiClient = getApiClient();
    const userId = getCurrentUserId();
    if (!apiClient || !userId) return null;
    return apiClient.saveProgress(officialId, userId, payload);
}

async function saveWithLegacyProgressApi(body) {
    const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || 'Unknown progress API error');
    }
    return result;
}

const StorageService = {
    async save(officialId) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = getCurrentUser();
        if (!isLoggedIn || !user.email) {
            alert('Please log in to save this exercise.');
            window.location.href = 'Page-demo/register.html';
            return false;
        }

        try {
            const payload = {
                status: 'IN_PROGRESS',
                current_step: 0,
                score_details: {}
            };
            const apiResult = await saveWithApiClient(officialId, payload);
            if (apiResult) {
                console.log(`✅ Exercice ${officialId} sauvegardé via ApiClient.`, apiResult);
                return true;
            }

            const result = await saveWithLegacyProgressApi({
                email: user.email.toLowerCase(),
                official_id: officialId,
                is_saved: true
            });
            console.log(`✅ Exercice ${officialId} sauvegardé.`, result);
            return true;
        } catch (error) {
            console.error('❌ Error saving progress:', error);
            alert('Network error. Check that the server is running.');
            return false;
        }
    },

    async complete(officialId, manualTime = null) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = getCurrentUser();

        if (!isLoggedIn || !user.email) {
            console.log(`ℹ️ Succès temporaire pour l'exercice ${officialId} (non connecté)`);
            const tempExos = JSON.parse(localStorage.getItem('temp_completed_exos') || '[]');
            if (!tempExos.includes(officialId)) {
                tempExos.push(officialId);
                localStorage.setItem('temp_completed_exos', JSON.stringify(tempExos));
            }
            return true;
        }

        const timeSpent = manualTime !== null ? manualTime : Math.floor((Date.now() - pageStartTime) / 1000);

        try {
            const payload = {
                status: 'COMPLETED',
                current_step: 0,
                score_details: { time_spent: timeSpent }
            };
            const apiResult = await saveWithApiClient(officialId, payload);
            if (apiResult) {
                console.log(`✅ Exercice ${officialId} validé via ApiClient.`, apiResult);
                return true;
            }

            const result = await saveWithLegacyProgressApi({
                email: user.email.toLowerCase(),
                official_id: officialId,
                status: 'COMPLETED',
                time_spent: timeSpent
            });
            console.log(`✅ Exercice ${officialId} validé.`, result);
            return true;
        } catch (error) {
            console.error('❌ Error validating progress:', error);
            alert('Network error. Check that the server is running.');
            return false;
        }
    },

    async unSave(officialId, exerciseId = null) {
        const user = getCurrentUser();
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
            console.error('❌ Error unSave:', error);
            return false;
        }
    },

    async unComplete(officialId, exerciseId = null) {
        const user = getCurrentUser();
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
            console.error('❌ Error unComplete:', error);
            return false;
        }
    }
};

window.StorageService = StorageService;
