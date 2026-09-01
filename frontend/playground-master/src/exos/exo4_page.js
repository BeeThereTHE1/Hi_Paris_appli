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

      this.translations = null;
      this.tour = ExoHighlightTour ? new ExoHighlightTour({ iframeSelector: '.exo-frame' }) : null;
      this._currentClickCleanup = null;

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      // Keep original EXO_SUCCESS behavior
      window.addEventListener('message', (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 4 || event.data.exoId == '4')) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
        }
      });

      this.onIframeLoad(async () => {
        if (this.isCompletedFromQuery()) return;
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);

      window.addEventListener('beforeunload', () => this.cleanupTour());
    }

    async loadTranslations() {
      try {
        var response = await fetch('texte.json');
        if (!response.ok) throw new Error('Failed to load translation json');
        var data = await response.json();

        this.translations = data && data.exercises ? data.exercises.exercise_4 : null;

        if (this.translations) {
          if (this.translations.title) {
            document.title = this.translations.title;
            var titleEl = document.querySelector('.exo-title');
            if (titleEl) titleEl.innerText = this.translations.title;
          }
          if (this.translations.instructions && this.translations.instructions.general) {
            var instrEl = document.querySelector('.exo-instructions');
            if (instrEl) instrEl.innerText = this.translations.instructions.general;
          }
        }
      } catch (error) {
        console.warn('Could not load translations from JSON, using fallback/default texts.', error);
      }
    }

    startTutorial() {
      var title = (this.translations && this.translations.title) || 'Exercise #4 : Bias Editor';
      var text =
        (this.translations && this.translations.instructions && this.translations.instructions.general) ||
        'Instructions: In this exercise, you will adjust the bias of a neuron to understand its impact on model performance.';

      var handled = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 2,
        buttonLabel: 'Continue',
        onContinue: () => this.runStep2Highlight()
      });

      if (!handled) this.runStep2Highlight();
    }

    runStep2Highlight() {
      if (!this.tour) return;

      this.cleanupClickStep();
      this.tour.clear();
      this.tour.startAutoReposition();

      this.tour.showHighlightBox('#custom-bias-editor-group', '1');

      var tooltipTitle = 'Modify Bias';
      var tooltipText =
        'First, modify the value of the bias and train the model.<br>' +
        'Observe what happens each time the bias is modified.<br><br>' +
        'Each neuron follows the form: y = f(x) + b';

      this.tour.showTooltip('#custom-bias-editor-group', tooltipTitle, tooltipText, 'right');

      var clickHandler = () => {
        this.cleanupClickStep();
        this.cleanupTour();
      };

      setTimeout(() => {
        document.addEventListener('click', clickHandler);
        this._currentClickCleanup = function () {
          document.removeEventListener('click', clickHandler);
        };
      }, 100);
    }

    cleanupClickStep() {
      if (this._currentClickCleanup) {
        this._currentClickCleanup();
        this._currentClickCleanup = null;
      }
    }

    cleanupTour() {
      this.cleanupClickStep();
      if (this.tour) {
        this.tour.clear();
        this.tour.stopAutoReposition();
      }
    }
  }

  window.exo4Page = new Exo4();
})();
