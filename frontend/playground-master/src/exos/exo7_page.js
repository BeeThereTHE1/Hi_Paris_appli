(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;
  var ExoHighlightTour = window.ExoHighlightTour;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 7.');
    return;
  }

  class Exo7 extends ExoPageBase {
    constructor() {
      super({
        exoId: 7,
        quizUrl: 'exoquiz/exo7_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.tour = ExoHighlightTour ? new ExoHighlightTour({ iframeSelector: '.exo-frame' }) : null;
      this._boundMessageHandler = null;
      this._activeDocClickCleanup = null;
      this._successShown = false;
      this._destroyed = false;

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      this._boundMessageHandler = (event) => {
        if (!event || !event.data) return;

        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 7 || event.data.exoId == '7')) {
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
      }, 1000);

      window.addEventListener('beforeunload', () => this.cleanup());
    }

    cleanup() {
      if (this._destroyed) return;
      this._destroyed = true;

      if (this._boundMessageHandler) {
        window.removeEventListener('message', this._boundMessageHandler);
        this._boundMessageHandler = null;
      }

      this.clearStepClickListener();

      if (this.tour) {
        this.tour.stopAutoReposition();
        this.tour.clear();
      }
    }

    startTutorial() {
      var handled = this.showTimedIntro({
        title: 'Exercise #7 : Overfitting and model complexity',
        text: 'Compare simple vs complex settings and observe train/test behavior.',
        seconds: 3,
        buttonLabel: 'Continue',
        onContinue: () => this.runStep1()
      });

      if (!handled) this.runStep1();
    }

    runStep1() {
      this.showStepHint(
        '1',
        '.control.ui-numHiddenLayers, .control.ui-numHiddenNodes',
        'Model complexity',
        'Increase/decrease layers or hidden units to change capacity.'
      );
      this.armOneShotClick(() => this.runStep2());
    }

    runStep2() {
      this.showStepHint(
        '2',
        '.timeline-controls',
        'Run and reset',
        'Train with one configuration, reset, then try another.'
      );
      this.armOneShotClick(() => this.runStep3());
    }

    runStep3() {
      this.showStepHint(
        '3',
        '.output-stats.train.ui-trainLoss',
        'Training loss',
        'Very low training loss can indicate memorization on complex models.'
      );
      this.armOneShotClick(() => this.runStep4());
    }

    runStep4() {
      this.showStepHint(
        '4',
        '.output-stats.test.ui-testLoss',
        'Test loss',
        'If test loss worsens while train loss improves, overfitting is likely.'
      );
      this.armOneShotClick(() => this.runStep5());
    }

    runStep5() {
      this.showStepHint(
        '5',
        '#linechart, #heatmap',
        'Visual confirmation',
        'Use both curves and decision boundary to confirm underfit/overfit.'
      );
      this.armOneShotClick(() => this.finishTutorial());
    }

    finishTutorial() {
      if (this.tour) {
        this.tour.stopAutoReposition();
        this.tour.clear();
      }
    }

    showStepHint(label, selector, title, text) {
      if (!this.tour) return;

      this.tour.clear();
      this.tour.showHighlightBox(selector, label);
      this.tour.showTooltip(selector, title, text, 'bottom');
      this.tour.startAutoReposition();
    }

    armOneShotClick(next) {
      this.clearStepClickListener();

      var done = false;
      var handler = (e) => {
        if (done) return;
        done = true;
        if (e) e.stopPropagation();

        this.clearStepClickListener();

        if (this.tour) {
          this.tour.stopAutoReposition();
          this.tour.clear();
        }

        if (typeof next === 'function') next();
      };

      setTimeout(() => {
        document.addEventListener('click', handler, true);
        this._activeDocClickCleanup = () => {
          document.removeEventListener('click', handler, true);
        };
      }, 100);
    }

    clearStepClickListener() {
      if (this._activeDocClickCleanup) {
        this._activeDocClickCleanup();
        this._activeDocClickCleanup = null;
      }
    }

    showExerciseSuccessCongrats() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'exo7-success-overlay';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.background = '#004676';
      popup.innerHTML =
        '<h3 style="color:#fff;">Well done!</h3>' +
        '<p style="color:#fff;">You analyzed overfitting behavior correctly. Let’s continue with the quiz.</p>';

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

        setTimeout(() => {
          window.location.href = this.quizUrl;
        }, 800);
      };

      popup.appendChild(nextBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
    }
  }

  window.exo7Page = new Exo7();
})();
