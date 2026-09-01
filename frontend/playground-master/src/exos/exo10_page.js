(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 10.');
    return;
  }

  class Exo10 extends ExoPageBase {
    constructor() {
      super({
        exoId: 10,
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.setupEventListeners();
    }

    setupEventListeners() {
      var btnSave = document.getElementById(this.saveBtnId);
      var btnDone = document.getElementById(this.doneBtnId);

      window.addEventListener('message', (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 10 || event.data.exoId == '10')) {
          this.unlockQuizButton(this.doneBtnId, '✨ Exercise Successful !!');
        }
      });

      if (btnSave) btnSave.onclick = () => this.handleSaveDraft();
      if (btnDone) btnDone.onclick = () => this.handleComplete();
    }

    async handleSaveDraft() {
      if (!this.isLoggedIn) {
        window.location.href = this.registerUrl;
        return;
      }

      var saved = await this.saveProgress(
        Math.max(this.currentStepIndex, 0),
        'IN_PROGRESS',
        { total_steps: this.steps.length }
      );

      if (saved) {
        var btnSave = document.getElementById(this.saveBtnId);
        if (btnSave) {
          btnSave.innerHTML = '✅ Sauvegardé !';
          btnSave.style.opacity = '0.7';
          btnSave.disabled = true;
        }
      } else {
        this.showErrorMessage('Unable to save your draft right now.');
      }
    }

    async handleComplete() {
      if (!this.isLoggedIn) {
        window.location.href = this.registerUrl;
        return;
      }

      var completedStep = this.steps.length > 0 ? this.steps.length : Math.max(this.currentStepIndex, 0);
      var saved = await this.saveProgress(
        completedStep,
        'COMPLETED',
        { total_steps: this.steps.length }
      );

      if (saved) {
        var btnDone = document.getElementById(this.doneBtnId);
        if (btnDone) {
          btnDone.innerHTML = '✨ Validé !';
          btnDone.disabled = true;
        }
        setTimeout(function () {
          window.location.href = 'Page-demo/historique.html#completed';
        }, 1000);
      } else {
        this.showErrorMessage('Unable to validate this exercise right now.');
      }
    }

    async saveProgress(stepIndex, status, scoreDetails) {
      // keeps your original fallback behavior
      var ok = await super.saveProgress(stepIndex, status, scoreDetails);
      if (ok) return true;

      if (!window.StorageService) return false;
      try {
        if (status === 'COMPLETED') return await window.StorageService.complete(this.exoId);
        return await window.StorageService.save(this.exoId);
      } catch (_e) {
        return false;
      }
    }
  }

  window.exo10Page = new Exo10();
})();
