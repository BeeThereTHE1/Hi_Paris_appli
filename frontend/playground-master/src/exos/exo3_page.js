(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 3.');
    return;
  }

  class Exo3 extends ExoPageBase {
    constructor() {
      super({
        exoId: 3,
        quizUrl: 'exoquiz/exo3_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this._successShown = false;
      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      window.addEventListener('message', (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 3 || event.data.exoId == '3')) {
          this.unlockQuizButton(this.doneBtnId, '✨ Exercise Successful !!');
          if (!this._successShown) {
            this._successShown = true;
            this.showExerciseSuccessCongrats();
          }
        }
      });

      this.onIframeLoad(() => {
        if (this.isCompletedFromQuery()) return;
        this.startTutorial();
      }, 1200);
    }

    startTutorial() {
      this.showTimedIntro({
        title: 'Exercise #3: Linear vs Non-linear',
        text: 'Observe the limitations of a linear model and the role of non-linear features.',
        seconds: 2,
        buttonLabel: 'Continue',
        onContinue: () => this.pulseFocus()
      });
    }

    pulseFocus() {
      var styleId = 'highlight-pulse-style';
      if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML =
          '@keyframes highlight-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,3,77,0);border-color:#004676!important;transform:scale(1);}50%{box-shadow:0 0 0 10px rgba(255,3,77,.15);border-color:#FF034D!important;transform:scale(1.01);}}' +
          '.trigger-pulse .exo-instructions{animation:highlight-pulse 1s ease-in-out 3;}';
        document.head.appendChild(style);
      }

      document.body.classList.add('trigger-pulse');
      setTimeout(function () {
        document.body.classList.remove('trigger-pulse');
      }, 3200);
    }

    showExerciseSuccessCongrats() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'exo3-success-overlay';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.background = '#004676';
      popup.innerHTML =
        '<h3 style="color:#fff;">Excellent!</h3>' +
        '<p style="color:#fff;">The model classified circular data using non-linear features (X², Y²). Let’s validate with the quiz.</p>';

      var nextBtn = document.createElement('button');
      nextBtn.className = 'tutorial-btn';
      nextBtn.style.background = '#FF553F';
      nextBtn.innerText = 'Go to quiz';

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

  window.exo3Page = new Exo3();
})();
