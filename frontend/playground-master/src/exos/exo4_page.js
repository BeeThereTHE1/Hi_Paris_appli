(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;
  var ExoHighlightTour = window.ExoHighlightTour;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 4.');
    return;
  }

  class Exo4 extends ExoPageBase {
    constructor() {
      super({
        exoId: 4,
        quizUrl: 'exoquiz/exo4_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.tour = ExoHighlightTour ? new ExoHighlightTour({ iframeSelector: '.exo-frame' }) : null;
      this._successShown = false;
      this._boundMessageHandler = null;
      this._destroyed = false;

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      this._boundMessageHandler = (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 4 || event.data.exoId == '4')) {
          this.unlockQuizButton(this.doneBtnId, '✨ Exercise Successful !!');
          if (!this._successShown) {
            this._successShown = true;
            this.showExerciseSuccessCongrats();
          }
        }
      };
      window.addEventListener('message', this._boundMessageHandler);

      this.onIframeLoad(() => {
        if (this.isCompletedFromQuery()) return;
        this.startTutorial();
      }, 1200);

      window.addEventListener('beforeunload', () => this.cleanup());
    }

    cleanup() {
      if (this._destroyed) return;
      this._destroyed = true;

      if (this._boundMessageHandler) {
        window.removeEventListener('message', this._boundMessageHandler);
        this._boundMessageHandler = null;
      }

      if (this.tour) {
        this.tour.stopAutoReposition();
        this.tour.clear();
      }
    }

    startTutorial() {
      var handled = this.showTimedIntro({
        title: 'Exercise #4 : Feature Engineering',
        text: 'Enable non-linear features and observe how the decision boundary improves.',
        seconds: 3,
        buttonLabel: 'Continue',
        onContinue: () => this.runGuideStep1()
      });

      if (!handled) this.runGuideStep1();
    }

    runGuideStep1() {
      this.showTourHint(
        '1',
        '.column.features',
        'Feature panel',
        'These features transform inputs and can make linear models solve non-linear data.'
      );
      this.armOneShotDocumentClick(() => this.runGuideStep2());
    }

    runGuideStep2() {
      this.showTourHint(
        '2',
        '.column.features .ui-xSquared, .column.features .ui-ySquared',
        'Try X² and Y²',
        'Enable quadratic terms to let the model learn curved boundaries.'
      );
      this.armOneShotDocumentClick(() => this.runGuideStep3());
    }

    runGuideStep3() {
      this.showTourHint(
        '3',
        '#heatmap',
        'Decision boundary',
        'Watch how the boundary changes once new features are active.'
      );
      this.armOneShotDocumentClick(() => this.runGuideStep4());
    }

    runGuideStep4() {
      this.showTourHint(
        '4',
        '.output-stats.train.ui-trainLoss',
        'Training loss',
        'Loss should generally decrease when the model gets a better representation.'
      );
      this.armOneShotDocumentClick(() => this.finishGuide());
    }

    finishGuide() {
      if (this.tour) {
        this.tour.stopAutoReposition();
        this.tour.clear();
      }
    }

    showTourHint(label, selector, title, text) {
      if (!this.tour) return;

      this.tour.clear();
      this.tour.showHighlightBox(selector, label);
      this.tour.showTooltip(selector, title, text, 'bottom');
      this.tour.startAutoReposition();
    }

    armOneShotDocumentClick(next) {
      var done = false;

      var handler = (e) => {
        if (done) return;
        done = true;
        if (e) e.stopPropagation();

        document.removeEventListener('click', handler, true);

        if (this.tour) {
          this.tour.stopAutoReposition();
          this.tour.clear();
        }

        if (typeof next === 'function') next();
      };

      setTimeout(() => {
        document.addEventListener('click', handler, true);
      }, 120);
    }

    showExerciseSuccessCongrats() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'exo4-success-overlay';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.background = '#004676';
      popup.innerHTML =
        '<h3 style="color:#fff;">Great work!</h3>' +
        '<p style="color:#fff;">You improved the model with feature engineering. Let’s continue with the quiz.</p>';

      var nextBtn = document.createElement('button');
      nextBtn.className = 'tutorial-btn';
      nextBtn.style.background = '#FF553F';
      nextBtn.innerText = 'Go to Quiz';

      nextBtn.onclick = async (e) => {
        e.stopPropagation();
        overlay.remove();

        if (window.StorageService) {
          var success = await window.StorageService.complete(this.exoId);
          if (success) {
            var btnDone = document.getElementById(this.doneBtnId);
            if (btnDone) {
              btnDone.innerHTML = '✨ Redirection...';
              btnDone.disabled = true;
            }
          }
        }

        setTimeout(() => { window.location.href = this.quizUrl; }, 800);
      };

      popup.appendChild(nextBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
    }
  }

  window.exo4Page = new Exo4();
})();
