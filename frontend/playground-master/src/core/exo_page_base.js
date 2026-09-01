(function () {
  'use strict';

  var ParentBase = window.MLPlaygroundExoBase;
  var ApiClient = window.MLPlaygroundApiClient;
  var ExoInteractions = window.ExoInteractions;

  if (!ParentBase) {
    console.error('MLPlaygroundExoBase is required before exo_page_base.js');
    return;
  }

  class MLPlaygroundExoPageBase extends ParentBase {
    constructor(options) {
      super(options || {});
      var o = options || {};

      this.exoId = Number.isInteger(o.exoId) ? o.exoId : null;
      this.quizUrl = o.quizUrl || null;
      this.iframeId = o.iframeId || 'iframe-playground';
      this.saveBtnId = o.saveBtnId || 'btn-sauvegarder';
      this.doneBtnId = o.doneBtnId || 'btn-realise';
      this.registerUrl = o.registerUrl || 'Page-demo/register.html';
      this.completedQueryParam = o.completedQueryParam || 'completed';

      this.apiClient = ApiClient ? new ApiClient() : null;
      this.currentStepIndex = -1;
      this.steps = [];

      this.btnSave = null;
      this.btnDone = null;
    }

    async initProgressContext() {
      if (!this.apiClient || !this.exoId) return;

      try {
        var exoConfig = await this.apiClient.getExercise(this.exoId).catch(function () { return null; });
        if (exoConfig && Array.isArray(exoConfig.steps)) {
          this.steps = exoConfig.steps;
        }

        var userId = this.getCurrentUserIdentifier && this.getCurrentUserIdentifier();
        if (userId) {
          var progress = await this.apiClient.getProgress(this.exoId, userId).catch(function () { return null; });
          if (progress && Number.isInteger(progress.current_step)) {
            this.currentStepIndex = progress.current_step;
          }
        }
      } catch (error) {
        console.warn('Unable to initialize progress context for exercise', this.exoId, error);
      }
    }

    async saveProgress(stepIndex, status, scoreDetails) {
      if (!this.apiClient || !this.exoId) return false;
      var userId = this.getCurrentUserIdentifier && this.getCurrentUserIdentifier();
      if (!userId) return false;

      try {
        await this.apiClient.saveProgress(this.exoId, userId, {
          current_step: Number.isInteger(stepIndex) ? stepIndex : 0,
          status: status || 'IN_PROGRESS',
          score_details: scoreDetails && typeof scoreDetails === 'object' ? scoreDetails : {}
        });
        if (Number.isInteger(stepIndex)) this.currentStepIndex = stepIndex;
        return true;
      } catch (error) {
        console.warn('Unable to save progress for exercise', this.exoId, error);
        return false;
      }
    }

    wireStandardActionButtons(options) {
      var o = options || {};
      var exoId = Number.isInteger(o.exoId) ? o.exoId : this.exoId;
      var quizUrl = o.quizUrl || this.quizUrl;
      var saveLabelOnSuccess = o.saveLabelOnSuccess || '✅ Sauvegardé !';
      var doneLabelOnSuccess = o.doneLabelOnSuccess || '✨ Redirection...';
      var redirectDelayMs = Number.isInteger(o.redirectDelayMs) ? o.redirectDelayMs : 800;

      this.btnSave = document.getElementById(o.saveBtnId || this.saveBtnId);
      this.btnDone = document.getElementById(o.doneBtnId || this.doneBtnId);

      if (this.btnSave) {
        this.btnSave.onclick = async () => {
          if (!window.StorageService || !exoId) return;
          var success = await window.StorageService.save(exoId);
          if (success) {
            this.btnSave.innerHTML = saveLabelOnSuccess;
            this.btnSave.style.opacity = '0.7';
            this.btnSave.disabled = true;
          }
        };
      }

      if (this.btnDone) {
        this.btnDone.onclick = async () => {
          var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
          if (!isLoggedIn) {
            window.location.href = this.registerUrl;
            return;
          }
          if (!window.StorageService || !exoId) return;

          var success = await window.StorageService.complete(exoId);
          if (success) {
            this.btnDone.innerHTML = doneLabelOnSuccess;
            this.btnDone.disabled = true;
            if (quizUrl) {
              setTimeout(function () {
                window.location.href = quizUrl;
              }, redirectDelayMs);
            }
          }
        };
      }
    }

    onIframeLoad(callback, delayMs) {
      var iframe = document.getElementById(this.iframeId);
      if (!iframe) return null;

      var wait = Number.isInteger(delayMs) ? delayMs : 0;
      iframe.addEventListener('load', () => {
        if (wait > 0) {
          setTimeout(() => callback && callback(), wait);
        } else {
          callback && callback();
        }
      });

      return iframe;
    }

    isCompletedFromQuery() {
      try {
        var params = new URLSearchParams(window.location.search);
        return params.get(this.completedQueryParam) === 'true';
      } catch (_e) {
        return false;
      }
    }

    unlockQuizButton(btnId, labelHtml) {
      var targetId = btnId || this.doneBtnId;
      var html = labelHtml || '<span class="icon">📝</span> Take the quiz';

      if (ExoInteractions && typeof ExoInteractions.enableQuizButton === 'function') {
        ExoInteractions.enableQuizButton(targetId, html);
        return;
      }

      var btn = document.getElementById(targetId);
      if (!btn) return;
      btn.removeAttribute('disabled');
      btn.classList.remove('btn-disabled');
      btn.classList.add('btn-success-ready');
      btn.innerHTML = html;
    }

    showTimedIntro(config) {
      if (ExoInteractions && typeof ExoInteractions.showTimedIntro === 'function') {
        ExoInteractions.showTimedIntro(config || {});
        return true;
      }
      return false;
    }

    showDefinitionModal(title, text) {
      if (ExoInteractions && typeof ExoInteractions.showDefinitionModal === 'function') {
        ExoInteractions.showDefinitionModal(title, text);
        return true;
      }
      return false;
    }

    injectIframeInfoTip(config) {
      if (ExoInteractions && typeof ExoInteractions.injectIframeInfoTip === 'function') {
        return ExoInteractions.injectIframeInfoTip(config || {});
      }
      return false;
    }

    getPanels(questionPanelId, feedbackPanelId) {
      var q = document.getElementById(questionPanelId || 'quiz-question-panel');
      var f = document.getElementById(feedbackPanelId || 'quiz-feedback-panel');
      return { questionPanel: q, feedbackPanel: f };
    }
  }

  window.MLPlaygroundExoPageBase = MLPlaygroundExoPageBase;
})();
