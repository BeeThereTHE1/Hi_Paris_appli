(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;
  var ExoHighlightTour = window.ExoHighlightTour;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 6.');
    return;
  }

  class Exo6 extends ExoPageBase {
    constructor() {
      super({
        exoId: 6,
        quizUrl: 'exoquiz/exo6_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.translations = null;
      this.activeArrow = null;
      this.mathSequenceStarted = false;
      this._activeDismissClick = null;

      this.tour = ExoHighlightTour
        ? new ExoHighlightTour({ iframeSelector: '.exo-frame' })
        : null;

      this.injectLocalStyles();
      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      window.addEventListener('message', (event) => this.handleWindowMessage(event));

      this.onIframeLoad(async () => {
        if (this.isCompletedFromQuery()) return;
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);

      window.addEventListener('beforeunload', () => this.cleanupAll());
    }

    async loadTranslations() {
      try {
        var response = await fetch('texte.json');
        if (!response.ok) throw new Error('Failed to load translation json');
        var data = await response.json();
        this.translations = data && data.exercises ? data.exercises.exercise_6 : null;

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
        console.warn('Could not load translations from JSON.', error);
      }
    }

    startTutorial() {
      var title = (this.translations && this.translations.title) || 'Exercise #6';
      var text =
        (this.translations && this.translations.instructions && this.translations.instructions.general) ||
        'In this exercise, you will explore how a neural network builds its prediction step by step.';

      var handled = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 7,
        buttonLabel: 'Continue',
        onContinue: () => this.showFlashingArrow('.timeline-controls', 4)
      });

      if (!handled) this.showFlashingArrow('.timeline-controls', 4);
    }

    handleWindowMessage(event) {
      if (!event || !event.data) return;
      var data = event.data;

      if (data.type === 'EXO_SUCCESS' && (data.exoId == 6 || data.exoId == '6')) {
        this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
        return;
      }

      if (data.type === 'EXO6_EPOCH_300') {
        this.showWarningBanner();
        setTimeout(() => this.showFlashingArrow('.ui-numHiddenLayers', 4), 100);
        return;
      }

      if (data.type === 'EXO6_STATE_CHANGE') {
        var numLayers = data.numHiddenLayers;
        var shape = data.networkShape;

        if (numLayers > 0) this.removeWarningBanner();

        if (numLayers === 1 && shape && shape[0] === 4) {
          this.runMathSequence();
        }
      }
    }

    getIframeDoc() {
      var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
      if (!iframe) return null;
      try {
        return iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
      } catch (_e) {
        return null;
      }
    }

    getIframeElement(selector) {
      var doc = this.getIframeDoc();
      if (!doc) return null;
      return doc.querySelector(selector);
    }

    getFirstHiddenNeuronCanvas() {
      var doc = this.getIframeDoc();
      if (!doc) return null;
      var canvases = doc.querySelectorAll('#network .canvas');
      return canvases && canvases.length > 0 ? canvases[0] : null;
    }

    getIframeElementRect(targetSelectorOrElement) {
      var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
      var doc = this.getIframeDoc();
      if (!iframe || !doc) return null;

      var el = typeof targetSelectorOrElement === 'string'
        ? doc.querySelector(targetSelectorOrElement)
        : targetSelectorOrElement;

      if (!el) return null;

      var iframeRect = iframe.getBoundingClientRect();
      var elRect = el.getBoundingClientRect();

      return {
        top: iframeRect.top + elRect.top,
        left: iframeRect.left + elRect.left,
        bottom: iframeRect.top + elRect.bottom,
        right: iframeRect.left + elRect.right,
        width: elRect.width,
        height: elRect.height
      };
    }

    showFlashingArrow(targetSelectorOrElement, flashesCount) {
      if (flashesCount === undefined) flashesCount = 4;
      this.removeActiveArrow();

      var rect = this.getIframeElementRect(targetSelectorOrElement);
      if (!rect) return;

      var arrow = document.createElement('div');
      arrow.className = 'tutorial-arrow';
      arrow.innerHTML =
        '<svg width="60" height="60" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 8px rgba(255, 3, 77, 0.6));">' +
        '<path d="M50,10 L10,50 M10,50 L25,50 M10,50 L10,35" stroke="#FF034D" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '</svg>';

      arrow.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
      arrow.style.top = (rect.top - 60 + window.scrollY) + 'px';
      arrow.style.animationIterationCount = String(flashesCount);

      document.body.appendChild(arrow);
      this.activeArrow = arrow;

      setTimeout(() => this.removeActiveArrow(), flashesCount * 600);
    }

    removeActiveArrow() {
      if (this.activeArrow) {
        this.activeArrow.remove();
        this.activeArrow = null;
      }
    }

    showWarningBanner() {
      var doc = this.getIframeDoc();
      if (!doc) return;

      var topControls = doc.querySelector('#top-controls');
      if (!topControls) return;
      if (doc.getElementById('exo6-warning-banner')) return;

      var banner = doc.createElement('div');
      banner.id = 'exo6-warning-banner';
      banner.style.cssText =
        'background: rgba(255, 3, 77, 0.12); border: 1px solid #FF034D; color: #ffffff; padding: 12px 18px; border-radius: 8px; margin: 15px auto 5px auto; max-width: 900px; text-align: center; font-size: 14px; line-height: 1.4;';

      var warningText =
        (this.translations && this.translations.instructions && this.translations.instructions.activity_1) ||
        'As seen earlier, complex data cannot be classified with linear features only. Try one hidden layer with 4 neurons.';
      banner.innerHTML = '<strong>⚠️ Note :</strong> ' + warningText;

      topControls.appendChild(banner);
    }

    removeWarningBanner() {
      var doc = this.getIframeDoc();
      if (!doc) return;
      var banner = doc.getElementById('exo6-warning-banner');
      if (banner) banner.remove();
    }

    runMathSequence() {
      if (this.mathSequenceStarted) return;
      this.mathSequenceStarted = true;

      this.removeWarningBanner();
      this.clearHighlights();

      setTimeout(() => {
        var linkA = this.getIframeElement('#linkx-1');
        if (!linkA) {
          console.warn('Could not find #linkx-1, starting with step B.');
          this.runStepB();
          return;
        }

        var titleA =
          '1- ' +
          ((this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[0] && this.translations.pedagogical_overlay[0].title) ||
            'Simple model: one equation');
        var descA =
          (this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[0] && this.translations.pedagogical_overlay[0].description) ||
          'prediction = f(w1·x1 + w2·x2 + b)';

        this.showStepTooltip(linkA, titleA, descA, 'right', () => this.runStepB());
      }, 2000);
    }

    runStepB() {
      var nodeB = this.getFirstHiddenNeuronCanvas();
      if (!nodeB) return this.runStepC();

      var titleB =
        '2- ' +
        ((this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[1] && this.translations.pedagogical_overlay[1].title) ||
          'What the hidden layer computes');
      var descB =
        (this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[1] && this.translations.pedagogical_overlay[1].description) ||
        'Each hidden neuron creates a learned feature from x₁ and x₂.';

      this.showStepTooltip(nodeB, titleB, descB, 'bottom', () => this.runStepC());
    }

    runStepC() {
      var linkC = this.getIframeElement('#link1-5');
      if (!linkC) return this.runStepD();

      var titleC =
        '3- ' +
        ((this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[2] && this.translations.pedagogical_overlay[2].title) ||
          'How the full model works');
      var descC =
        (this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[2] && this.translations.pedagogical_overlay[2].description) ||
        'prediction = f(v1·a1 + v2·a2 + v3·a3 + v4·a4 + c)';

      this.showStepTooltip(linkC, titleC, descC, 'top', () => this.runStepD());
    }

    runStepD() {
      var heatmap = this.getIframeElement('#heatmap');
      if (!heatmap) return this.clearHighlights();

      var titleD =
        '4- ' +
        ((this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[3] && this.translations.pedagogical_overlay[3].title) ||
          'In Summary');
      var descD =
        (this.translations && this.translations.pedagogical_overlay && this.translations.pedagogical_overlay[3] && this.translations.pedagogical_overlay[3].description) ||
        'A neural network learns features, then combines them to solve complex tasks.';

      this.showStepTooltip(heatmap, titleD, descD, 'bottom', () => this.clearHighlights());
    }

    showStepTooltip(target, title, text, position, onDismiss) {
      if (!this.tour) return;
      this.clearHighlights();

      this.tour.startAutoReposition();
      this.tour.showHighlightBox(target, null);
      this.tour.showTooltip(target, title, text, position || 'bottom');

      this.armDismissClick(() => {
        this.clearHighlights();
        if (onDismiss) onDismiss();
      });
    }

    armDismissClick(callback) {
      this.cleanupDismissClick();
      var handler = (e) => {
        if (e) e.stopPropagation();
        this.cleanupDismissClick();
        callback();
      };
      setTimeout(() => {
        document.addEventListener('click', handler);
        this._activeDismissClick = function () {
          document.removeEventListener('click', handler);
        };
      }, 100);
    }

    cleanupDismissClick() {
      if (this._activeDismissClick) {
        this._activeDismissClick();
        this._activeDismissClick = null;
      }
    }

    clearHighlights() {
      this.cleanupDismissClick();
      if (this.tour) {
        this.tour.clear();
        this.tour.stopAutoReposition();
      }
      this.removeActiveArrow();
    }

    injectLocalStyles() {
      if (document.getElementById('exo6-local-styles')) return;
      var styleEl = document.createElement('style');
      styleEl.id = 'exo6-local-styles';
      styleEl.textContent =
        '@keyframes arrow-flash{0%,100%{opacity:0;transform:translate(0,0)}50%{opacity:1;transform:translate(-10px,10px)}}' +
        '.tutorial-arrow{position:absolute;z-index:10000;pointer-events:none;animation:arrow-flash .6s ease-in-out infinite;}';
      document.head.appendChild(styleEl);
    }

    cleanupAll() {
      this.clearHighlights();
      this.removeWarningBanner();
    }
  }

  window.exo6Page = new Exo6();
})();
