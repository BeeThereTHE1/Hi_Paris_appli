(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 5.');
        return;
    }

    class Exo5 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 5;
            this.currentStepIndex = -1;
            this.steps = [];
            this.initExercise();
        }

        async initExercise() {
            try {
                if (this.apiClient) {
                    var exoConfig = await this.apiClient.getExercise(this.exoId).catch(function () { return null; });
                    if (exoConfig && Array.isArray(exoConfig.steps)) {
                        this.steps = exoConfig.steps;
                    }
                    var userId = this.getCurrentUserIdentifier();
                    if (userId) {
                        var progress = await this.apiClient.getProgress(this.exoId, userId).catch(function () { return null; });
                        if (progress && Number.isInteger(progress.current_step)) {
                            this.currentStepIndex = progress.current_step;
                        }
                    }
                }
            } catch (error) {
                console.warn('Unable to initialize exercise 5.', error);
            }
            this.setupEventListeners();
        }

        setupEventListeners() {
            var btnSauvegarder = document.getElementById('btn-sauvegarder');
            var btnRealise = document.getElementById('btn-realise');
            var self = this;

            window.addEventListener('message', function (event) {
                if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 5 || event.data.exoId == '5')) {
                    btnRealise.disabled = false;
                    btnRealise.classList.remove('btn-disabled');
                    btnRealise.classList.add('btn-success-ready');
                    btnRealise.innerHTML = '✨ Exercise Successful !!';
                }
            });

            btnSauvegarder.onclick = function () {
                self.handleSaveDraft();
            };

            btnRealise.onclick = function () {
                self.handleComplete();
            };
        }

        async handleSaveDraft() {
            if (!this.isLoggedIn) {
                window.location.href = 'Page-demo/register.html';
                return;
            }

            var saved = await this.saveProgress(Math.max(this.currentStepIndex, 0), 'IN_PROGRESS', { total_steps: this.steps.length });
            if (saved) {
                var btnSauvegarder = document.getElementById('btn-sauvegarder');
                btnSauvegarder.innerHTML = '✅ Sauvegardé !';
                btnSauvegarder.style.opacity = '0.7';
                btnSauvegarder.disabled = true;
            } else {
                this.showErrorMessage('Unable to save your draft right now.');
            }
        }

        async handleComplete() {
            if (!this.isLoggedIn) {
                window.location.href = 'Page-demo/register.html';
                return;
            }

            var completedStep = this.steps.length > 0 ? this.steps.length : Math.max(this.currentStepIndex, 0);
            var saved = await this.saveProgress(completedStep, 'COMPLETED', { total_steps: this.steps.length });
            if (saved) {
                var btnRealise = document.getElementById('btn-realise');
                btnRealise.innerHTML = '✨ Validé !';
                btnRealise.disabled = true;
                setTimeout(function () {
                    window.location.href = 'Page-demo/historique.html#completed';
                }, 1000);
            } else {
                this.showErrorMessage('Unable to validate this exercise right now.');
            }
        }

        async saveProgress(stepIndex, status, scoreDetails) {
            if (!this.apiClient) return false;
            var userId = this.getCurrentUserIdentifier();
            if (!userId) return false;
            try {
                await this.apiClient.saveProgress(this.exoId, userId, {
                    current_step: Number.isInteger(stepIndex) ? stepIndex : 0,
                    status: status || 'IN_PROGRESS',
                    score_details: scoreDetails && typeof scoreDetails === 'object' ? scoreDetails : {}
                });
                this.currentStepIndex = Number.isInteger(stepIndex) ? stepIndex : this.currentStepIndex;
                return true;
            } catch (error) {
                console.warn('Unable to save progress for exercise 5.', error);
                return window.StorageService ? window.StorageService[status === 'COMPLETED' ? 'complete' : 'save'](this.exoId) : false;
            }
        }
    }

    new Exo5();
})();
