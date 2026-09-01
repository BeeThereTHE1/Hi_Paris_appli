(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 9.');
    return;
  }

  class Exo9 extends ExoPageBase {
    constructor() {
      super({
        exoId: 9,
        quizUrl: 'exoquiz/exo9_quiz.html',
        iframeId: 'iframe-model1',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.currentGuideIndex = 0;
      this.guideSteps = [
        {
          text: '- First, let’s review the key features you’ll use in this exercise.',
          label: 'OK(1)',
          highlightId: 'main-part'
        },
        {
          text: '- Move the cursor and observe the effect on the dataset.',
          label: 'OK(2)',
          highlightId: 'iframe-model1',
          action: 'show_noise_highlight_m1'
        },
        {
          text: '- Training loss measures how well the model fits the training data.',
          label: 'OK(3)',
          highlightId: 'iframe-model1'
        },
        {
          text: '- Noise is random variation that makes patterns less separable.',
          label: 'OK(4)',
          highlightId: 'iframe-model2',
          action: 'show_noise_highlight_m2'
        },
        {
          text: '- Now run models with noise 5 and 50 up to 3000 epochs, then compare.',
          label: 'OK(5)',
          highlightId: 'main-part',
          action: 'restore_noise'
        }
      ];

      this._readingTimer = null;
      this._boundResize = null;
      this._boundScroll = null;
      this._activeHighlightEl = null;

      this.init();
    }

    async init() {
      await this.initProgressContext();

      if (window.ExoCommonPage && window.ExoCommonPage.initProfileWidget) {
        window.ExoCommonPage.initProfileWidget({ showStats: false, historyLabel: 'Mon Historique', logoutLabel: 'Logout' });
      }

      this.setupButtons();
      this.setupGuideFlow();
      this.disableSimulatorInteraction();
      this.bindRepositionEvents();

      window.addEventListener('beforeunload', () => this.cleanup());
    }

    setupButtons() {
      var btnSave = document.getElementById(this.saveBtnId);
      var btnDone = document.getElementById(this.doneBtnId);

      if (btnDone) {
        btnDone.disabled = true;
        btnDone.classList.add('btn-disabled');
      }

      if (btnSave) btnSave.onclick = () => this.handleSaveDraft();
      if (btnDone) btnDone.onclick = () => this.goToQuiz();
    }

    async handleSaveDraft() {
      if (!this.isLoggedIn) {
        window.location.href = this.registerUrl;
        return;
      }

      var ok = await this.saveProgress(Math.max(this.currentStepIndex, 0), 'IN_PROGRESS', {
        completed_steps: 0,
        total_steps: this.guideSteps.length
      });

      if (!ok) {
        this.showErrorMessage('Unable to save your draft right now.');
        return;
      }

      var btn = document.getElementById(this.saveBtnId);
      if (btn) {
        btn.innerHTML = '✅ Saved !';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    }

    goToQuiz() {
      window.location.href = this.quizUrl;
    }

    setupGuideFlow() {
      var btnNext = document.getElementById('btnNext');
      var overlay = document.getElementById('readingOverlay');
      var sticky = document.getElementById('instruction-sticky-bar');

      if (!btnNext || !overlay) {
        if (sticky) sticky.style.display = 'block';
        this.startGuideSequence();
        return;
      }

      var readingTime = 3;
      btnNext.style.opacity = '0.6';
      btnNext.style.pointerEvents = 'none';

      this._readingTimer = setInterval(() => {
        readingTime--;
        if (readingTime <= 0) {
          clearInterval(this._readingTimer);
          this._readingTimer = null;
          btnNext.innerText = 'Next';
          btnNext.style.opacity = '1';
          btnNext.style.pointerEvents = 'auto';
        } else {
          btnNext.innerText = 'Please read (' + readingTime + 's)';
        }
      }, 1000);

      btnNext.onclick = () => {
        overlay.style.display = 'none';
        if (sticky) sticky.style.display = 'block';
        this.startGuideSequence();
      };
    }

    startGuideSequence() {
      this.currentGuideIndex = 0;
      var guideTopBox = document.getElementById('guide-top-box');
      if (!guideTopBox) {
        this.finishGuide();
        return;
      }
      guideTopBox.style.display = 'block';
      guideTopBox.style.position = 'absolute';
      this.showGuideStep(this.currentGuideIndex);
    }

    showGuideStep(index) {
      var guideTopBox = document.getElementById('guide-top-box');
      var guideText = document.getElementById('guide-text-content');
      var btnGuideOk = document.getElementById('btn-guide-ok');

      if (!guideTopBox || !guideText || !btnGuideOk) {
        this.finishGuide();
        return;
      }

      if (index >= this.guideSteps.length) {
        this.finishGuide();
        return;
      }

      var step = this.guideSteps[index];
      guideText.innerText = step.text;
      btnGuideOk.innerText = step.label;

      this.clearCurrentHighlight();
      this.applyHighlight(step.highlightId);
      this.positionGuideNear(step.highlightId);

      if (step.action === 'show_noise_highlight_m1') {
        this.postToIframe('iframe-model1', { type: 'HIGHLIGHT_NOISE_CONTROL' });
      } else if (step.action === 'show_noise_highlight_m2') {
        this.postToIframe('iframe-model2', { type: 'HIGHLIGHT_NOISE_CONTROL' });
      } else if (step.action === 'restore_noise') {
        this.postToIframe('iframe-model1', { type: 'SET_NOISE_VAL', value: 5 });
        this.postToIframe('iframe-model2', { type: 'SET_NOISE_VAL', value: 50 });
      }

      btnGuideOk.onclick = () => {
        this.clearCurrentHighlight();
        this.currentGuideIndex++;
        this.showGuideStep(this.currentGuideIndex);
      };
    }

    finishGuide() {
      var guideTopBox = document.getElementById('guide-top-box');
      if (guideTopBox) guideTopBox.style.display = 'none';

      this.clearCurrentHighlight();
      this.enableSimulatorInteraction();

      this.unlockQuizButton(this.doneBtnId, '📝 Take the Quiz');

      var btnDone = document.getElementById(this.doneBtnId);
      if (btnDone) btnDone.onclick = () => this.goToQuiz();
    }

    applyHighlight(elId) {
      var el = document.getElementById(elId);
      if (!el) return;
      this._activeHighlightEl = el;
      el.style.outline = '3px solid #FF034D';
      el.style.boxShadow = '0 0 20px rgba(255, 3, 77, 0.6)';
    }

    clearCurrentHighlight() {
      if (!this._activeHighlightEl) return;
      this._activeHighlightEl.style.outline = 'none';
      this._activeHighlightEl.style.boxShadow = 'none';
      this._activeHighlightEl = null;
    }

    positionGuideNear(targetId) {
      var guideTopBox = document.getElementById('guide-top-box');
      var targetEl = document.getElementById(targetId);
      if (!guideTopBox || !targetEl) return;

      var rect = targetEl.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      if (targetId === 'main-part') {
        guideTopBox.style.top = (rect.top + scrollTop + 60) + 'px';
        guideTopBox.style.left = '50%';
        guideTopBox.style.transform = 'translateX(-50%)';
      } else {
        guideTopBox.style.top = (rect.top + scrollTop + 20) + 'px';
        guideTopBox.style.left = (rect.left + scrollLeft + rect.width / 4) + 'px';
        guideTopBox.style.transform = 'none';
      }
    }

    postToIframe(iframeId, payload) {
      try {
        var iframe = document.getElementById(iframeId);
        if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage(payload, '*');
      } catch (_e) {}
    }

    disableSimulatorInteraction() {
      document.querySelectorAll('.exo-frame').forEach(function (frame) {
        frame.style.pointerEvents = 'none';
      });
    }

    enableSimulatorInteraction() {
      document.querySelectorAll('.exo-frame').forEach(function (frame) {
        frame.style.pointerEvents = 'auto';
      });
    }

    bindRepositionEvents() {
      this._boundResize = () => this.repositionCurrentGuide();
      this._boundScroll = () => this.repositionCurrentGuide();

      window.addEventListener('resize', this._boundResize);
      window.addEventListener('scroll', this._boundScroll);
    }

    repositionCurrentGuide() {
      if (this.currentGuideIndex < 0 || this.currentGuideIndex >= this.guideSteps.length) return;
      var step = this.guideSteps[this.currentGuideIndex];
      if (!step) return;
      this.positionGuideNear(step.highlightId);
    }

    cleanup() {
      if (this._readingTimer) {
        clearInterval(this._readingTimer);
        this._readingTimer = null;
      }

      if (this._boundResize) {
        window.removeEventListener('resize', this._boundResize);
        this._boundResize = null;
      }

      if (this._boundScroll) {
        window.removeEventListener('scroll', this._boundScroll);
        this._boundScroll = null;
      }

      this.clearCurrentHighlight();
    }
  }

  window.exo9Page = new Exo9();
})();
