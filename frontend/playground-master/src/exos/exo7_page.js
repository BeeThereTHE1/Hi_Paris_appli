(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

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

      this.translations = null;
      this.activeArrow = null;

      this.selectedAnswersAct1 = {
        relu: null,
        tanh: null,
        sigmoid: null,
        linear: null
      };

      this.statementCorrectStates = [false, false, false, false];

      this.injectLocalStyles();
      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      this.onIframeLoad(async () => {
        if (this.isCompletedFromQuery()) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          return;
        }
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);

      window.addEventListener('resize', () => this.repositionArrowIfNeeded());
      window.addEventListener('scroll', () => this.repositionArrowIfNeeded());
      window.addEventListener('beforeunload', () => this.removeArrow());
    }

    async loadTranslations() {
      try {
        var response = await fetch('texte.json');
        if (!response.ok) throw new Error('Failed to load translation json');
        var data = await response.json();
        this.translations = data && data.exercises ? data.exercises.exercise_7 : null;

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
      var title = (this.translations && this.translations.title) || 'Exercise #7';
      var text =
        (this.translations && this.translations.instructions && this.translations.instructions.general) ||
        'Investigate how activation functions affect non-linear learning.';

      var handled = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 2,
        buttonLabel: 'Continue',
        onContinue: () => {
          setTimeout(() => {
            this.showFlashingArrow('.ui-activation');
            this.renderActivity1();
          }, 800);
        }
      });

      if (!handled) {
        this.showFlashingArrow('.ui-activation');
        this.renderActivity1();
      }
    }

    getIframeRectFor(selector) {
      var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
      if (!iframe) return null;

      try {
        var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc) return null;
        var el = doc.querySelector(selector);
        if (!el) return null;

        var iframeRect = iframe.getBoundingClientRect();
        var rect = el.getBoundingClientRect();

        return {
          top: iframeRect.top + rect.top,
          left: iframeRect.left + rect.left,
          bottom: iframeRect.top + rect.bottom,
          width: rect.width
        };
      } catch (_e) {
        return null;
      }
    }

    showFlashingArrow(targetSelector) {
      this.removeArrow();

      var rect = this.getIframeRectFor(targetSelector);
      if (!rect) return;

      var arrow = document.createElement('div');
      arrow.className = 'tutorial-arrow';
      arrow.dataset.targetSelector = targetSelector;
      arrow.innerHTML =
        '<svg width="60" height="60" viewBox="0 0 60 60" style="filter: drop-shadow(0 0 8px rgba(255,3,77,.6));">' +
          '<path d="M50,10 L10,50 M10,50 L25,50 M10,50 L10,35" stroke="#FF034D" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '</svg>';

      arrow.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
      arrow.style.top = (rect.top - 60 + window.scrollY) + 'px';

      document.body.appendChild(arrow);
      this.activeArrow = arrow;

      var dismiss = () => this.removeArrow();
      setTimeout(() => {
        document.addEventListener('click', dismiss, { once: true });
        try {
          var iframe = document.querySelector('.exo-frame') || document.getElementById(this.iframeId);
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.document.addEventListener('click', dismiss, { once: true });
          }
        } catch (_e) {}
      }, 100);
    }

    repositionArrowIfNeeded() {
      if (!this.activeArrow) return;
      var selector = this.activeArrow.dataset.targetSelector;
      if (!selector) return;
      var rect = this.getIframeRectFor(selector);
      if (!rect) return;
      this.activeArrow.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
      this.activeArrow.style.top = (rect.top - 60 + window.scrollY) + 'px';
    }

    removeArrow() {
      if (this.activeArrow) {
        this.activeArrow.remove();
        this.activeArrow = null;
      }
    }

    renderActivity1() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      this.selectedAnswersAct1 = { relu: null, tanh: null, sigmoid: null, linear: null };

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 1</div>' +
          '<div class="quiz-question-card">For each activation, does it help solve non-linear data (circles)?</div>' +
        '</div>' +
        '<table class="quiz-table"><tbody>' +
          this.rowAct1('relu', 'ReLU') +
          this.rowAct1('tanh', 'Tanh') +
          this.rowAct1('sigmoid', 'Sigmoid') +
          this.rowAct1('linear', 'Linear') +
        '</tbody></table>' +
        '<div style="margin-top:10px;"><button id="btn-validate-act1" class="tutorial-btn">Validate</button></div>';

      fPanel.innerHTML = '';

      var rows = qPanel.querySelectorAll('tbody tr');
      for (var i = 0; i < rows.length; i++) {
        this.bindAct1Row(rows[i]);
      }

      var validateBtn = document.getElementById('btn-validate-act1');
      if (validateBtn) validateBtn.onclick = () => this.validateActivity1();
    }

    rowAct1(key, label) {
      return (
        '<tr data-activation="' + key + '">' +
          '<td>' + label + '</td>' +
          '<td><button class="btn-choice" data-val="yes">Yes</button></td>' +
          '<td><button class="btn-choice" data-val="no">No</button></td>' +
        '</tr>'
      );
    }

    bindAct1Row(row) {
      var act = row.getAttribute('data-activation');
      var yesBtn = row.querySelector('.btn-choice[data-val="yes"]');
      var noBtn = row.querySelector('.btn-choice[data-val="no"]');
      if (!yesBtn || !noBtn) return;

      yesBtn.onclick = () => {
        this.selectedAnswersAct1[act] = 'yes';
        yesBtn.classList.add('active-yes');
        noBtn.classList.remove('active-no');
      };

      noBtn.onclick = () => {
        this.selectedAnswersAct1[act] = 'no';
        noBtn.classList.add('active-no');
        yesBtn.classList.remove('active-yes');
      };
    }

    validateActivity1() {
      var fPanel = document.getElementById('quiz-feedback-panel');
      var qPanel = document.getElementById('quiz-question-panel');
      if (!fPanel || !qPanel) return;

      var isCorrect =
        this.selectedAnswersAct1.relu === 'yes' &&
        this.selectedAnswersAct1.tanh === 'yes' &&
        this.selectedAnswersAct1.sigmoid === 'yes' &&
        this.selectedAnswersAct1.linear === 'no';

      if (isCorrect) {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
          '✅ Correct! Let’s continue.' +
          '</div>';
        setTimeout(() => this.renderActivity2(), 1200);
      } else {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
          '❌ Incorrect, test again and retry.' +
          '</div>';
        this.resetWrongAct1Rows(qPanel);
      }
    }

    resetWrongAct1Rows(qPanel) {
      var expected = { relu: 'yes', tanh: 'yes', sigmoid: 'yes', linear: 'no' };
      Object.keys(expected).forEach((k) => {
        if (this.selectedAnswersAct1[k] !== expected[k]) {
          this.selectedAnswersAct1[k] = null;
          var row = qPanel.querySelector('tr[data-activation="' + k + '"]');
          if (!row) return;
          var yes = row.querySelector('.btn-choice[data-val="yes"]');
          var no = row.querySelector('.btn-choice[data-val="no"]');
          if (yes) yes.classList.remove('active-yes', 'active-no');
          if (no) no.classList.remove('active-yes', 'active-no');
        }
      });
    }

    renderActivity2() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      this.statementCorrectStates = [false, false, false, false];

      var statements = [
        {
          text: '1- It changes the bias term, which shifts the decision boundary.',
          correct: false,
          good: '✅ Correct. Activation changes transformation, not bias directly.',
          bad: '❌ Incorrect. Bias is learned by optimization.'
        },
        {
          text: '2- It influences the shape of the decision boundary the model can learn.',
          correct: true,
          good: '✅ Correct. Activation changes representational power.',
          bad: '❌ Incorrect. Observe boundary changes per activation.'
        },
        {
          text: '3- It changes how each neuron transforms its input before passing it forward.',
          correct: true,
          good: '✅ Correct. That is exactly activation’s role.',
          bad: '❌ Incorrect. Activation is the neuron transform.'
        },
        {
          text: '4- It changes the values of weights directly.',
          correct: false,
          good: '✅ Correct. Weights are updated by training, not directly by activation.',
          bad: '❌ Incorrect. Activation affects outputs/gradients, not direct weight assignment.'
        }
      ];

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 2</div>' +
          '<div class="quiz-question-card">True / False: role of activation functions.</div>' +
        '</div>' +
        statements.map(function (s, idx) {
          return (
            '<div class="statement-row" data-idx="' + idx + '">' +
              '<div style="margin-bottom:8px;">' + s.text + '</div>' +
              '<button class="btn-choice" data-val="true">True</button> ' +
              '<button class="btn-choice" data-val="false">False</button>' +
            '</div>'
          );
        }).join('');

      fPanel.innerHTML = '';

      var rows = qPanel.querySelectorAll('.statement-row');
      for (var i = 0; i < rows.length; i++) {
        this.bindAct2Row(rows[i], statements);
      }
    }

    bindAct2Row(row, statements) {
      var idx = parseInt(row.getAttribute('data-idx'), 10);
      var stmt = statements[idx];
      var trueBtn = row.querySelector('.btn-choice[data-val="true"]');
      var falseBtn = row.querySelector('.btn-choice[data-val="false"]');
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!stmt || !trueBtn || !falseBtn || !fPanel) return;

      var answer = (choice) => {
        var isCorrect = choice === stmt.correct;

        if (isCorrect) {
          this.statementCorrectStates[idx] = true;
          row.classList.add('correct-locked');
          trueBtn.disabled = true;
          falseBtn.disabled = true;
          trueBtn.classList.toggle('active-yes', choice === true);
          falseBtn.classList.toggle('active-no', choice === false);

          fPanel.innerHTML = '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' + stmt.good + '</div>';

          if (this.statementCorrectStates.every(Boolean)) {
            this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
            fPanel.innerHTML +=
              '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);margin-top:10px;font-weight:700;">' +
              '🎉 Great job! You completed Exo 7.' +
              '</div>';
          }
        } else {
          var wrongBtn = choice ? trueBtn : falseBtn;
          wrongBtn.classList.add('active-no');
          setTimeout(function () { wrongBtn.classList.remove('active-no'); }, 500);

          fPanel.innerHTML = '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' + stmt.bad + '</div>';
        }
      };

      trueBtn.onclick = () => answer(true);
      falseBtn.onclick = () => answer(false);
    }

    injectLocalStyles() {
      if (document.getElementById('exo7-local-styles')) return;

      var styleEl = document.createElement('style');
      styleEl.id = 'exo7-local-styles';
      styleEl.textContent =
        '@keyframes arrow-flash{0%,100%{opacity:0;transform:translate(0,0)}50%{opacity:1;transform:translate(-10px,10px)}}' +
        '.tutorial-arrow{position:absolute;z-index:10000;pointer-events:none;animation:arrow-flash .6s infinite ease-in-out;}' +
        '.quiz-table{width:100%;border-collapse:collapse;margin-top:8px;}' +
        '.quiz-table td{padding:8px;border-bottom:1px solid rgba(255,255,255,.08);}' +
        '.statement-row{margin:10px 0;padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:rgba(255,255,255,.02);}' +
        '.btn-choice.active-yes{background:#10b981!important;color:#fff;}' +
        '.btn-choice.active-no{background:#ef4444!important;color:#fff;}' +
        '.correct-locked{border-color:#10b981;}';
      document.head.appendChild(styleEl);
    }
  }

  window.exo7Page = new Exo7();
})();
