(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 8.');
    return;
  }

  class Exo8 extends ExoPageBase {
    constructor() {
      super({
        exoId: 8,
        quizUrl: 'exoquiz/exo8_quiz.html',
        iframeId: 'iframe-model1', // exo8 uses two iframes; primary one for hook timing
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.translations = null;
      this.activeArrows = [];

      this.q1Answers = { weights: false, features: false, stops: false, boundaries: false };
      this.q2Answers = { starts: false, dataset: false, random: false };

      this.model1Started = false;
      this.model2Started = false;
      this.model1MinLoss = Infinity;
      this.model2MinLoss = Infinity;
      this.activity1Rendered = false;

      this.injectLocalStyles();
      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      window.addEventListener('message', (event) => this.handleWindowMessage(event));
      window.addEventListener('resize', () => this.repositionArrows());
      window.addEventListener('scroll', () => this.repositionArrows());
      window.addEventListener('beforeunload', () => this.clearArrows());

      this.onIframeLoad(async () => {
        if (this.isCompletedFromQuery()) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          this.renderCompletedState();
          return;
        }
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);
    }

    async loadTranslations() {
      try {
        var response = await fetch('texte.json');
        if (!response.ok) throw new Error('Failed to load translation json');
        var data = await response.json();
        this.translations = data && data.exercises ? data.exercises.exercise_8 : null;

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
      } catch (e) {
        console.warn('Could not load translations from JSON.', e);
      }
    }

    startTutorial() {
      var title = (this.translations && this.translations.title) || 'Exercise #8 : Instability';
      var text =
        (this.translations && this.translations.instructions && this.translations.instructions.general) ||
        'Run both models and identify what explains result differences.';

      var handled = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 2,
        buttonLabel: 'Continue',
        onContinue: () => {
          setTimeout(() => {
            this.showFlashingArrows();
            this.renderActivity0();
          }, 1000);
        }
      });

      if (!handled) {
        this.showFlashingArrows();
        this.renderActivity0();
      }
    }

    renderCompletedState() {
      var qPanel = document.getElementById('quiz-question-panel');
      if (!qPanel) return;
      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Exercise Successful</div>' +
          '<div class="quiz-question-card">You already completed this exercise. You can take the quiz now.</div>' +
        '</div>';
    }

    getIframeElementRect(iframeId, selector) {
      var iframe = document.getElementById(iframeId);
      if (!iframe) return null;

      try {
        var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc) return null;
        var el = doc.querySelector(selector);
        if (!el) return null;

        var i = iframe.getBoundingClientRect();
        var r = el.getBoundingClientRect();

        return {
          left: i.left + r.left,
          top: i.top + r.top,
          width: r.width,
          height: r.height
        };
      } catch (_e) {
        return null;
      }
    }

    showFlashingArrows() {
      this.clearArrows();

      ['iframe-model1', 'iframe-model2'].forEach((iframeId) => {
        var rect = this.getIframeElementRect(iframeId, '#play-pause-button');
        if (!rect) return;

        var arrow = document.createElement('div');
        arrow.className = 'tutorial-arrow';
        arrow.dataset.iframeId = iframeId;
        arrow.dataset.selector = '#play-pause-button';
        arrow.innerHTML =
          '<svg width="60" height="60" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 8px rgba(255,3,77,.6));">' +
          '<path d="M50,10 L10,50 M10,50 L25,50 M10,50 L10,35" stroke="#FF034D" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
          '</svg>';

        arrow.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
        arrow.style.top = (rect.top - 60 + window.scrollY) + 'px';

        document.body.appendChild(arrow);
        this.activeArrows.push(arrow);
      });

      var dismiss = () => this.clearArrows();
      setTimeout(() => {
        document.addEventListener('click', dismiss, { once: true });
        ['iframe-model1', 'iframe-model2'].forEach((iframeId) => {
          try {
            var iframe = document.getElementById(iframeId);
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.document.addEventListener('click', dismiss, { once: true });
            }
          } catch (_e) {}
        });
      }, 100);
    }

    repositionArrows() {
      if (!this.activeArrows.length) return;

      this.activeArrows.forEach((arrow) => {
        var iframeId = arrow.dataset.iframeId;
        var selector = arrow.dataset.selector;
        if (!iframeId || !selector) return;
        var rect = this.getIframeElementRect(iframeId, selector);
        if (!rect) return;
        arrow.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
        arrow.style.top = (rect.top - 60 + window.scrollY) + 'px';
      });
    }

    clearArrows() {
      this.activeArrows.forEach(function (a) { a.remove(); });
      this.activeArrows = [];
    }

    renderActivity0() {
      var p = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      if (!p.questionPanel || !p.feedbackPanel) return;

      p.questionPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 0</div>' +
          '<div class="quiz-question-card">' +
            'Run both models until they converge (very low loss), then continue.' +
            '<div style="margin-top:10px;">' +
              'Model 1: <span id="model1-status-text" style="color:#ef4444;">Not started ⏳</span><br>' +
              'Model 2: <span id="model2-status-text" style="color:#ef4444;">Not started ⏳</span>' +
            '</div>' +
          '</div>' +
        '</div>';

      p.feedbackPanel.innerHTML = '';
    }

    renderActivity1() {
      var p = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      if (!p.questionPanel || !p.feedbackPanel) return;

      this.q1Answers = { weights: false, features: false, stops: false, boundaries: false };
      p.feedbackPanel.innerHTML = '';

      p.questionPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 1</div>' +
          '<div class="quiz-question-card">Which differences did you observe between model outputs?</div>' +
        '</div>' +
        this.optionBtn('weights', 'Weights are different') +
        this.optionBtn('features', 'Input features change') +
        this.optionBtn('stops', 'Training stops earlier in one model') +
        this.optionBtn('boundaries', 'Decision boundaries are different') +
        '<div style="margin-top:10px;"><button id="btn-validate-act1" class="tutorial-btn">Validate</button></div>';

      this.bindOptionButtons(this.q1Answers);

      var validateBtn = document.getElementById('btn-validate-act1');
      if (validateBtn) validateBtn.onclick = () => this.validateActivity1();
    }

    renderActivity2() {
      var p = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      if (!p.questionPanel || !p.feedbackPanel) return;

      this.q2Answers = { starts: false, dataset: false, random: false };
      p.feedbackPanel.innerHTML = '';

      p.questionPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 2</div>' +
          '<div class="quiz-question-card">Why can two runs produce different results?</div>' +
        '</div>' +
        this.optionBtn('starts', 'Different random starting weights') +
        this.optionBtn('dataset', 'Different datasets are used') +
        this.optionBtn('random', 'Random initialization without fixed seed') +
        '<div style="margin-top:10px;"><button id="btn-validate-act2" class="tutorial-btn">Validate</button></div>';

      this.bindOptionButtons(this.q2Answers);

      var validateBtn = document.getElementById('btn-validate-act2');
      if (validateBtn) validateBtn.onclick = () => this.validateActivity2();
    }

    optionBtn(key, label) {
      return (
        '<button class="quiz-option-btn" data-key="' + key + '">' +
          '<span class="quiz-option-checkbox"></span>' +
          '<span>' + label + '</span>' +
        '</button>'
      );
    }

    bindOptionButtons(stateObj) {
      var buttons = document.querySelectorAll('.quiz-option-btn');
      buttons.forEach((btn) => {
        var key = btn.getAttribute('data-key');
        if (!key) return;

        btn.onclick = () => {
          stateObj[key] = !stateObj[key];
          var checkbox = btn.querySelector('.quiz-option-checkbox');
          if (!checkbox) return;

          if (stateObj[key]) {
            checkbox.style.backgroundColor = '#8b5cf6';
            checkbox.innerHTML = '✓';
            checkbox.style.display = 'inline-flex';
            checkbox.style.alignItems = 'center';
            checkbox.style.justifyContent = 'center';
            checkbox.style.color = '#fff';
            checkbox.style.fontSize = '12px';
          } else {
            checkbox.style.backgroundColor = 'transparent';
            checkbox.innerHTML = '';
          }
        };
      });
    }

    validateActivity1() {
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!fPanel) return;

      var isCorrect = this.q1Answers.weights && !this.q1Answers.features && !this.q1Answers.stops && this.q1Answers.boundaries;
      if (isCorrect) {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
            '<strong>That’s right.</strong> The key observed differences are weights and boundaries.' +
          '</div>' +
          '<div style="margin-top:10px;"><button id="btn-ok-act1" class="tutorial-btn">Continue</button></div>';
        var okBtn = document.getElementById('btn-ok-act1');
        if (okBtn) okBtn.onclick = () => this.renderActivity2();
      } else {
        var msg = 'Try again by focusing on actual model-output differences.';
        if (this.q1Answers.features) msg = 'Input features do not change between the two models.';
        else if (this.q1Answers.stops) msg = 'Both use the same training process; early stop is not the explanation here.';
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' + msg + '</div>';
      }
    }

    validateActivity2() {
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!fPanel) return;

      var isCorrect = this.q2Answers.starts && !this.q2Answers.dataset && this.q2Answers.random;
      if (isCorrect) {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
            '<strong>Correct.</strong> Random initialization changes the optimization path.' +
          '</div>' +
          '<div style="margin-top:10px;"><button id="btn-ok-act2" class="tutorial-btn">Finish</button></div>';
        var okBtn = document.getElementById('btn-ok-act2');
        if (okBtn) okBtn.onclick = () => this.showFinalSummary();
      } else {
        var msg2 = 'Some answers are incorrect.';
        if (this.q2Answers.dataset) msg2 = 'Dataset is identical in both runs; randomness comes from initialization.';
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' + msg2 + '</div>';
      }
    }

    showFinalSummary() {
      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.style.zIndex = '10005';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.style.maxWidth = '550px';
      popup.innerHTML =
        '<h3>The model is unstable.</h3>' +
        '<p style="text-align:left;">Without a fixed seed, random initialization gives different starting points, so each run can converge differently.</p>';

      var okBtn = document.createElement('button');
      okBtn.className = 'tutorial-btn';
      okBtn.innerText = 'OK';
      okBtn.onclick = () => {
        overlay.remove();
        this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');

        var fPanel = document.getElementById('quiz-feedback-panel');
        if (fPanel) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);margin-top:15px;font-weight:700;">' +
              '✅ You can now proceed to the quiz.' +
            '</div>';
        }
      };

      popup.appendChild(okBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
    }

    handleWindowMessage(event) {
      if (!event || !event.data) return;
      var d = event.data;

      if (d.type === 'EXO8_STEP') {
        var modelId = d.modelId;
        var lossTrain = typeof d.lossTrain === 'number' ? d.lossTrain : Number(d.lossTrain);

        if (modelId === '1') {
          this.model1Started = true;
          if (lossTrain < this.model1MinLoss) this.model1MinLoss = lossTrain;
          this.updateModelStatus('model1-status-text', this.model1MinLoss, lossTrain);
        } else if (modelId === '2') {
          this.model2Started = true;
          if (lossTrain < this.model2MinLoss) this.model2MinLoss = lossTrain;
          this.updateModelStatus('model2-status-text', this.model2MinLoss, lossTrain);
        }

        if (
          this.model1Started &&
          this.model2Started &&
          this.model1MinLoss <= 0.01 &&
          this.model2MinLoss <= 0.01 &&
          !this.activity1Rendered
        ) {
          this.activity1Rendered = true;
          this.clearArrows();
          setTimeout(() => this.renderActivity1(), 900);
        }
      }

      if (d.type === 'EXO8_RESET') {
        if (d.modelId === '1') {
          this.model1Started = false;
          this.model1MinLoss = Infinity;
          this.resetModelStatus('model1-status-text');
        } else if (d.modelId === '2') {
          this.model2Started = false;
          this.model2MinLoss = Infinity;
          this.resetModelStatus('model2-status-text');
        }
      }
    }

    updateModelStatus(elId, minLoss, currentLoss) {
      var el = document.getElementById(elId);
      if (!el) return;

      if (minLoss <= 0.01) {
        el.innerHTML = 'Ready! loss = ' + minLoss.toFixed(5) + ' ✅';
        el.style.color = '#10b981';
      } else {
        el.innerHTML = 'In progress (loss: ' + currentLoss.toFixed(4) + ') ⏳';
        el.style.color = '#3b82f6';
      }
    }

    resetModelStatus(elId) {
      var el = document.getElementById(elId);
      if (!el) return;
      el.innerHTML = 'Not started ⏳';
      el.style.color = '#ef4444';
    }

    injectLocalStyles() {
      if (document.getElementById('exo8-local-styles')) return;
      var styleEl = document.createElement('style');
      styleEl.id = 'exo8-local-styles';
      styleEl.textContent =
        '@keyframes arrow-flash{0%,100%{opacity:0;transform:translate(0,0)}50%{opacity:1;transform:translate(-10px,10px)}}' +
        '.tutorial-arrow{position:absolute;pointer-events:none;z-index:10000;animation:arrow-flash .6s ease-in-out infinite;}' +
        '.quiz-option-btn{display:flex;gap:10px;align-items:center;width:100%;margin:8px 0;padding:10px 12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);border-radius:8px;cursor:pointer;color:#e2e8f0;text-align:left;}' +
        '.quiz-option-checkbox{width:18px;height:18px;border:1px solid #8b5cf6;border-radius:4px;display:inline-block;}';
      document.head.appendChild(styleEl);
    }
  }

  window.exo8Page = new Exo8();
})();
