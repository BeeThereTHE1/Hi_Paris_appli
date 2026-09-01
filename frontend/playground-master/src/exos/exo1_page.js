(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;
  var ExoHighlightTour = window.ExoHighlightTour;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 1.');
    return;
  }

  class Exo1 extends ExoPageBase {
    constructor() {
      super({
        exoId: 1,
        quizUrl: 'exoquiz/exo1_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.translations = null;
      this._successShown = false;
      this._stepClickCleanup = null;

      this.tour = ExoHighlightTour
        ? new ExoHighlightTour({ iframeSelector: '.exo-frame' })
        : null;

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      window.addEventListener('message', (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 1 || event.data.exoId == '1')) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          if (!this._successShown) {
            this._successShown = true;
            this.showStep5Congrats();
          }
        }
      });

      this.onIframeLoad(async () => {
        if (this.isCompletedFromQuery()) return;
        this.pulseIframeInfoTips();
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);

      window.addEventListener('beforeunload', () => this.cleanupTutorialArtifacts());
    }

    async loadTranslations() {
      try {
        var response = await fetch('texte.json');
        if (!response.ok) throw new Error('Failed to load translation json');
        var data = await response.json();

        this.translations = data && data.exercises ? data.exercises.exercise_1 : null;

        if (this.translations) {
          if (this.translations.title) {
            document.title = this.translations.title;
            var titleEl = document.querySelector('.exo-title');
            if (titleEl) titleEl.innerText = this.translations.title;
          }
          if (this.translations.instructions && this.translations.instructions.text) {
            var instrEl = document.querySelector('.exo-instructions');
            if (instrEl) instrEl.innerText = this.translations.instructions.text;
          }
        }
      } catch (error) {
        console.warn('Could not load translations from JSON, using fallback/default texts.', error);
      }
    }

    startTutorial() {
      var title = (this.translations && this.translations.title) || 'Exercice #1 : Separate the data';
      var defaultText =
        "Vous devez modifier les poids de la liaison entre X1 et l'output et X2 et l'output afin d'obtenir une line that separates le plan en deux regions distinctes.";
      var text =
        (this.translations && this.translations.instructions && this.translations.instructions.text) || defaultText;

      var handled = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 7,
        buttonLabel: 'Continue',
        onContinue: () => this.runStep1Highlight()
      });

      if (!handled) this.runStep1Highlight();
    }

    runStep1Highlight() {
      var instructions = document.querySelector('.exo-instructions');
      if (!instructions) return this.runStep2();

      instructions.classList.add('highlight-glow-border');

      var indicator = document.createElement('div');
      indicator.className = 'tutorial-indicator-dot';
      indicator.innerText = '1';
      var rect = instructions.getBoundingClientRect();
      indicator.style.left = rect.left + 20 + 'px';
      indicator.style.top = rect.top + 'px';
      document.body.appendChild(indicator);

      var clickHandler = () => {
        instructions.classList.remove('highlight-glow-border');
        indicator.remove();
        this.cleanupStepClick();
        this.runStep2();
      };

      this.armOneShotClick(clickHandler);
    }

    runStep2() {
      this.highlightParameter('XAxis');
    }

    highlightParameter(paramType) {
      if (!this.tour) return;

      this.cleanupStepClick();
      this.tour.clear();
      this.tour.startAutoReposition();

      var selector = '';
      var title = '';
      var text = '';
      var nextParam = null;
      var indicatorNum = '2';

      if (paramType === 'XAxis') {
        selector = '.x.axis';
        title = (this.translations && this.translations.definitions && this.translations.definitions.x_axis && this.translations.definitions.x_axis.term) || 'Axe X (Abscisses)';
        text = (this.translations && this.translations.definitions && this.translations.definitions.x_axis && this.translations.definitions.x_axis.definition) || 'Représente la première caractéristique d’entrée.';
        nextParam = 'YAxis';
        indicatorNum = '2';
      } else if (paramType === 'YAxis') {
        selector = '.y.axis';
        title = (this.translations && this.translations.definitions && this.translations.definitions.y_axis && this.translations.definitions.y_axis.term) || 'Axe Y (Ordonnées)';
        text = (this.translations && this.translations.definitions && this.translations.definitions.y_axis && this.translations.definitions.y_axis.definition) || 'Représente la deuxième caractéristique d’entrée.';
        nextParam = 'Colormap';
        indicatorNum = '3';
      } else if (paramType === 'Colormap') {
        selector = '#colormap';
        title = (this.translations && this.translations.definitions && this.translations.definitions.color_scale && this.translations.definitions.color_scale.term) || 'Palette & Options';
        text = (this.translations && this.translations.definitions && this.translations.definitions.color_scale && this.translations.definitions.color_scale.definition) || 'La palette indique les valeurs et options visuelles.';
        nextParam = 'Features';
        indicatorNum = '4';
      } else if (paramType === 'Features') {
        selector = '.column.features';
        title = (this.translations && this.translations.definitions && this.translations.definitions.features && this.translations.definitions.features.term) || 'Caractéristiques (Features)';
        text = (this.translations && this.translations.definitions && this.translations.definitions.features && this.translations.definitions.features.definition) || 'Les features sont les variables d’entrée du modèle.';
        nextParam = 'Step3';
        indicatorNum = '5';
      }

      var targetExists = this.getIframeElement(selector) !== null;
      if (!targetExists) {
        if (nextParam === 'Step3') this.runStep3();
        else if (nextParam) this.highlightParameter(nextParam);
        return;
      }

      this.tour.showHighlightBox(selector, indicatorNum);
      this.tour.showTooltip(selector, title, text, 'bottom');

      var clickHandler = () => {
        this.cleanupStepClick();
        if (nextParam === 'Step3') {
          this.tour.clear();
          this.tour.stopAutoReposition();
          this.runStep3();
        } else if (nextParam) {
          this.highlightParameter(nextParam);
        }
      };

      this.armOneShotClick(clickHandler);
    }

    runStep3() {
      var leftPopup = document.createElement('div');
      leftPopup.className = 'tutorial-popup-left';
      leftPopup.id = 'exo1-step3-leftpopup';

      var startText =
        (this.translations && this.translations.start_marker) ||
        "Let’s Start! Use the slider to change the weight of features X1 and X2 and test separability.";

      var titleText = 'Let’s Start!';
      var bodyText = startText;
      if (startText.startsWith("Let's Start!")) bodyText = startText.substring("Let's Start!".length).trim();
      if (startText.startsWith('Let’s Start!')) bodyText = startText.substring('Let’s Start!'.length).trim();

      leftPopup.innerHTML =
        '<h3>' + titleText + '</h3>' +
        '<p>' + bodyText + '</p>' +
        '<div class="btn-right"><button id="exo1-step3-next">Next >></button></div>';

      document.body.appendChild(leftPopup);

      var nextBtn = document.getElementById('exo1-step3-next');
      if (nextBtn) {
        nextBtn.onclick = (e) => {
          e.stopPropagation();
          leftPopup.remove();
          this.runStep4();
        };
      }
    }

    runStep4() {
      if (!this.tour) return;

      this.tour.clear();
      this.tour.startAutoReposition();

      var wTitle =
        (this.translations && this.translations.definitions && this.translations.definitions.weight && this.translations.definitions.weight.term) ||
        'Modify Weights';
      var wDesc =
        (this.translations && this.translations.definitions && this.translations.definitions.weight && this.translations.definitions.weight.definition) ||
        'Drag sliders or click on X1/X2 links to modify weights and observe boundary changes.';

      this.tour.showHighlightBox('#custom-weight-editor-x, #custom-weight-editor-y', '7');
      this.tour.showTooltip('#custom-weight-editor-x, #custom-weight-editor-y', wTitle, wDesc, 'right');

      var clickHandler = () => {
        this.cleanupStepClick();
        this.cleanupTutorialArtifacts();
      };

      this.armOneShotClick(clickHandler);
    }

    showStep5Congrats() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'exo1-step5-overlay';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.background = '#004676';

      var congratsText =
        (this.translations && this.translations.target_achieved) ||
        "Your settings lead to a good classification of the data into two clusters.";

      popup.innerHTML =
        '<h3 style="color:#fff;">Great job!</h3>' +
        '<p style="color:#fff;white-space:pre-line;">' + congratsText + '</p>';

      var nextBtn = document.createElement('button');
      nextBtn.className = 'tutorial-btn';
      nextBtn.style.background = '#FF553F';
      nextBtn.innerText = 'Next';

      var dismiss = () => {
        overlay.remove();
        document.removeEventListener('click', dismiss);
      };

      nextBtn.onclick = function (e) {
        e.stopPropagation();
        dismiss();
      };

      popup.appendChild(nextBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      setTimeout(function () {
        document.addEventListener('click', dismiss);
      }, 100);
    }

    pulseIframeInfoTips() {
      try {
        var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
        if (!iframe) return;
        var iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!iframeDoc) return;

        var tips = iframeDoc.querySelectorAll('.info-tip');
        tips.forEach(function (el) {
          if ((el.innerText || '').trim() === '?') {
            el.innerText = 'i';
            el.classList.add('info-tip-pulse');
            el.addEventListener('click', function () {
              el.classList.remove('info-tip-pulse');
            }, { once: true });
          }
        });
      } catch (e) {
        console.error("Erreur lors de la modification des info-tips dans l'iframe:", e);
      }
    }

    getIframeElement(selector) {
      try {
        var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
        if (!iframe) return null;
        var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc) return null;

        if (selector.indexOf(',') !== -1) {
          var selectors = selector.split(',').map(function (s) { return s.trim(); });
          for (var i = 0; i < selectors.length; i++) {
            if (doc.querySelector(selectors[i])) return doc.querySelector(selectors[i]);
          }
          return null;
        }
        return doc.querySelector(selector);
      } catch (_e) {
        return null;
      }
    }

    armOneShotClick(handler) {
      this.cleanupStepClick();
      var fn = (e) => {
        if (e) e.stopPropagation();
        this.cleanupStepClick();
        handler();
      };
      setTimeout(() => {
        document.addEventListener('click', fn);
        this._stepClickCleanup = function () {
          document.removeEventListener('click', fn);
        };
      }, 100);
    }

    cleanupStepClick() {
      if (this._stepClickCleanup) {
        this._stepClickCleanup();
        this._stepClickCleanup = null;
      }
    }

    cleanupTutorialArtifacts() {
      this.cleanupStepClick();
      if (this.tour) {
        this.tour.clear();
        this.tour.stopAutoReposition();
      }
      var leftover = document.getElementById('exo1-step3-leftpopup');
      if (leftover) leftover.remove();
    }
  }

  window.exo1Page = new Exo1();
})();
