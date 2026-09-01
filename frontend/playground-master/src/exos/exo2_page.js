(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 2.');
    return;
  }

  class Exo2 extends ExoPageBase {
    constructor() {
      super({
        exoId: 2,
        quizUrl: 'exoquiz/exo2_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this._successShown = false;
      this._activeCleanup = null;
      this._boundMessageHandler = null;
      this._boundReposition = null;
      this._activeHintMeta = null;

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      this._boundMessageHandler = (event) => {
        if (!event || !event.data) return;
        if (event.data.type === 'EXO_SUCCESS' && (event.data.exoId == 2 || event.data.exoId == '2')) {
          this.unlockQuizButton(this.doneBtnId, '✨ Exercise Successful !!');
          if (!this._successShown) {
            this._successShown = true;
            this.showExerciseSuccessCongrats();
          }
        }
      };
      window.addEventListener('message', this._boundMessageHandler);

      this._boundReposition = () => this.repositionActiveHint();
      window.addEventListener('scroll', this._boundReposition, { passive: true });
      window.addEventListener('resize', this._boundReposition);

      this.onIframeLoad(() => {
        if (this.isCompletedFromQuery()) return;
        this.startTutorial();
      }, 1200);

      window.addEventListener('beforeunload', () => this.cleanupAll());
    }

    cleanupAll() {
      this.cleanupActiveListeners();
      this.clearHints();

      if (this._boundMessageHandler) {
        window.removeEventListener('message', this._boundMessageHandler);
        this._boundMessageHandler = null;
      }

      if (this._boundReposition) {
        window.removeEventListener('scroll', this._boundReposition);
        window.removeEventListener('resize', this._boundReposition);
        this._boundReposition = null;
      }
    }

    startTutorial() {
      var handled = this.showTimedIntro({
        title: 'Exercise #2 : Train the network',
        text: 'Launch training step-by-step and observe how weights change and loss decreases over time.',
        seconds: 4,
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
      indicator.style.left = (rect.left + 20) + 'px';
      indicator.style.top = rect.top + 'px';
      document.body.appendChild(indicator);

      var clickHandler = () => {
        instructions.classList.remove('highlight-glow-border');
        indicator.remove();
        this.cleanupActiveListeners();
        this.runStep2();
      };

      this.armOneShotDocumentClick(clickHandler);
    }

    runStep2() {
      this.showHint('2', '.timeline-controls', 'Simulation Controls', 'Click Play to start training, or use Step and Reset.');
      this.armOneShotDocumentClick(() => this.runStep3());
    }

    runStep3() {
      this.showHint('3', '.control.ui-epoch', 'Number of Epochs', 'This counter indicates how many epochs have been run.');
      this.armOneShotDocumentClick(() => this.runStep4());
    }

    runStep4() {
      this.showHint('4', '.output-stats.train.ui-trainLoss', 'Training Loss', 'Training loss should decrease as the model learns.');
      this.armOneShotDocumentClick(() => this.runStep5());
    }

    runStep5() {
      this.showHint('5', '#linechart', 'Loss Evolution Graph', 'Visualize training/test loss curves in real time.');
      this.armOneShotDocumentClick(() => this.runFinalStep());
    }

    runFinalStep() {
      this.showHint('1', '.timeline-controls', 'Ready to start the training?', '', true);
      setTimeout(() => this.clearHints(), 4000);
    }

    showHint(label, selector, title, text, compactTitleOnly) {
      this.clearHints();

      var target = this.findInIframe(selector);
      if (!target) return;

      var rect = this.getIframeRectFor(target);
      if (!rect) return;

      var box = document.createElement('div');
      box.className = 'tutorial-highlight-box';
      document.body.appendChild(box);

      var dot = document.createElement('div');
      dot.className = 'tutorial-indicator-dot';
      dot.innerText = label;
      document.body.appendChild(dot);

      var tooltip = document.createElement('div');
      tooltip.className = 'tutorial-tooltip';
      tooltip.innerHTML = compactTitleOnly
        ? '<h4 style="margin:0;text-align:center;">' + title + '</h4>'
        : '<h4 style="margin:0 0 8px 0;">' + title + '</h4><p style="margin:0;">' + text + '</p><div class="tooltip-arrow"></div>';
      document.body.appendChild(tooltip);

      this._activeHint = { box: box, dot: dot, tooltip: tooltip };
      this._activeHintMeta = { selector: selector };

      this.positionHintFromRect(rect);
    }

    positionHintFromRect(rect) {
      if (!this._activeHint || !rect) return;

      this._activeHint.box.style.left = (rect.left - 15 + window.scrollX) + 'px';
      this._activeHint.box.style.top = (rect.top - 15 + window.scrollY) + 'px';
      this._activeHint.box.style.width = (rect.width + 30) + 'px';
      this._activeHint.box.style.height = (rect.height + 30) + 'px';

      this._activeHint.dot.style.left = (rect.left - 15 + window.scrollX) + 'px';
      this._activeHint.dot.style.top = (rect.top - 15 + window.scrollY) + 'px';

      var tRect = this._activeHint.tooltip.getBoundingClientRect();
      this._activeHint.tooltip.style.left = (rect.left + rect.width / 2 - tRect.width / 2 + window.scrollX) + 'px';
      this._activeHint.tooltip.style.top = (rect.bottom + 10 + window.scrollY) + 'px';
    }

    repositionActiveHint() {
      if (!this._activeHint || !this._activeHintMeta || !this._activeHintMeta.selector) return;
      var target = this.findInIframe(this._activeHintMeta.selector);
      if (!target) return;
      var rect = this.getIframeRectFor(target);
      if (!rect) return;
      this.positionHintFromRect(rect);
    }

    clearHints() {
      if (!this._activeHint) return;
      if (this._activeHint.box) this._activeHint.box.remove();
      if (this._activeHint.dot) this._activeHint.dot.remove();
      if (this._activeHint.tooltip) this._activeHint.tooltip.remove();
      this._activeHint = null;
      this._activeHintMeta = null;
    }

    armOneShotDocumentClick(handler) {
      this.cleanupActiveListeners();
      var fn = (e) => {
        if (e) e.stopPropagation();
        this.cleanupActiveListeners();
        this.clearHints();
        handler();
      };
      setTimeout(() => {
        document.addEventListener('click', fn);
        this._activeCleanup = () => document.removeEventListener('click', fn);
      }, 100);
    }

    cleanupActiveListeners() {
      if (this._activeCleanup) {
        this._activeCleanup();
        this._activeCleanup = null;
      }
    }

    findInIframe(selector) {
      var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
      if (!iframe) return null;
      try {
        var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        return doc ? doc.querySelector(selector) : null;
      } catch (_e) {
        return null;
      }
    }

    getIframeRectFor(el) {
      var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
      if (!iframe || !el) return null;

      var iframeRect = iframe.getBoundingClientRect();
      var r = el.getBoundingClientRect();

      return {
        left: iframeRect.left + r.left,
        top: iframeRect.top + r.top,
        right: iframeRect.left + r.right,
        bottom: iframeRect.top + r.bottom,
        width: r.width,
        height: r.height
      };
    }

    showExerciseSuccessCongrats() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'exo2-success-overlay';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.background = '#004676';
      popup.innerHTML =
        '<h3 style="color:#fff;">Great!</h3>' +
        '<p style="color:#fff;">The model has successfully learned to classify the data. Now let’s go to the quiz.</p>';

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

  window.exo2Page = new Exo2();
})();
