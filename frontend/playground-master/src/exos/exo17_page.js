(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 17.');
    return;
  }

  class Exo17 extends ExoPageBase {
    constructor() {
      super({
        exoId: 17,
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.learningRates = [
        { value: '0.00001', expected: 'convergence' },
        { value: '0.0001', expected: 'convergence' },
        { value: '0.001', expected: 'convergence' },
        { value: '0.003', expected: 'convergence' },
        { value: '0.01', expected: 'convergence' },
        { value: '0.03', expected: 'convergence' },
        { value: '0.1', expected: 'convergence' },
        { value: '0.3', expected: 'convergence' },
        { value: '1', expected: 'convergence' },
        { value: '3', expected: 'convergence' },
        { value: '10', expected: 'convergence' }
      ];

      this.dragCards = [
        {
          id: 'c17-1',
          text: 'A separable dataset allows logistic regression to converge even with relatively large learning rates.',
          correct: 'true',
          feedback: '✅ Correct. On separable data, logistic regression can remain stable even with relatively high learning rates.'
        },
        {
          id: 'c17-2',
          text: 'The loss in logistic regression on separable data remains well-behaved, which prevents divergence for a wide range of learning rates.',
          correct: 'true',
          feedback: '✅ Correct. The loss is well-conditioned in this setting, which helps the model stay stable across many learning rates.'
        },
        {
          id: 'c17-3',
          text: 'A high learning rate always causes divergence, even for simple models like logistic regression.',
          correct: 'false',
          feedback: '✅ Correct. A high learning rate does not always cause divergence.'
        }
      ];

      this.incorrectFeedbackFallback = {
        'c17-1': '❌ Incorrect. In this exercise, the model can still converge with large learning rates because the dataset is separable.',
        'c17-2': '❌ Incorrect. In this exercise, the loss landscape remains stable enough to avoid divergence for many learning rates.',
        'c17-3': '❌ Incorrect. “Always diverges” is false in this context.'
      };

      this.testedRates = {};
      this.userAnswers = {};
      this.sortedStates = {};
      this._boundMessageHandler = null;
      this._readingTimer = null;

      this.init();
    }

    async init() {
      await this.initProgressContext();

      // Optional profile widget kept from legacy behavior
      if (window.ExoCommonPage && window.ExoCommonPage.initProfileWidget) {
        window.ExoCommonPage.initProfileWidget({ showStats: false, historyLabel: 'My History', logoutLabel: 'Logout' });
      }

      this.setupButtons();
      this.bindRuntimeEvents();
      this.startReadingOverlayFlow();
    }

    setupButtons() {
      var btnSave = document.getElementById(this.saveBtnId);
      var btnDone = document.getElementById(this.doneBtnId);

      if (btnDone) {
        btnDone.disabled = true;
        btnDone.classList.add('btn-disabled');
      }

      if (btnSave) btnSave.onclick = () => this.handleSaveDraft();
      if (btnDone) btnDone.onclick = () => this.handleCompleteAndLeave();
    }

    bindRuntimeEvents() {
      this._boundMessageHandler = (event) => {
        if (!event || !event.data) return;
        if (event.data.type !== 'EXO17_STEP') return;

        var rateVal = String(event.data.learningRate);
        var row = document.querySelector('.rate-row[data-rate="' + rateVal + '"]');
        if (!row || !row.classList.contains('rate-locked')) return;

        row.classList.remove('rate-locked');
        row.style.opacity = '1';

        var badge = row.querySelector('.rate-status-badge');
        if (badge) {
          badge.innerText = '⚡ Tested';
          badge.style.background = 'rgba(16, 185, 129, 0.15)';
          badge.style.color = '#10b981';
          badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        }

        row.querySelectorAll('.btn-choice').forEach(function (btn) {
          btn.removeAttribute('disabled');
        });

        this.testedRates[rateVal] = true;
      };

      window.addEventListener('message', this._boundMessageHandler);
      window.addEventListener('beforeunload', () => this.cleanup());
    }

    cleanup() {
      if (this._boundMessageHandler) {
        window.removeEventListener('message', this._boundMessageHandler);
        this._boundMessageHandler = null;
      }
      if (this._readingTimer) {
        clearInterval(this._readingTimer);
        this._readingTimer = null;
      }
    }

    startReadingOverlayFlow() {
      var btnNext = document.getElementById('btnNext');
      var readingOverlay = document.getElementById('readingOverlay');

      if (!btnNext || !readingOverlay) {
        this.initActivity1();
        return;
      }

      var readingTime = 2;
      btnNext.style.pointerEvents = 'none';
      btnNext.style.opacity = '0.6';

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
        readingOverlay.style.display = 'none';
        this.initActivity1();
      };
    }

    initActivity1() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      this.testedRates = {};
      this.userAnswers = {};

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 1</div>' +
          '<div class="quiz-question-card">' +
            'Run the model for each learning rate and decide if it converges or diverges.' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:15px;display:flex;flex-direction:column;gap:8px;max-height:380px;overflow-y:auto;padding-right:5px;">' +
          this.learningRates.map((rate) => {
            return (
              '<div class="rate-row rate-locked" data-rate="' + rate.value + '" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:8px;opacity:.65;cursor:pointer;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span class="rate-value" style="font-family:Roboto Mono,monospace;font-size:13.5px;font-weight:700;color:#fff;">' + rate.value.replace('.', ',') + '</span>' +
                  '<span class="rate-status-badge" style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:10px;background:rgba(239,68,68,.15);color:#ef4444;border:1px solid rgba(239,68,68,.3);">Not tested</span>' +
                '</div>' +
                '<div class="button-group" style="display:flex;gap:6px;">' +
                  '<button class="btn-choice" disabled data-choice="convergence" style="font-size:11.5px;padding:5px 12px;">Convergence</button>' +
                  '<button class="btn-choice" disabled data-choice="divergence" style="font-size:11.5px;padding:5px 12px;">Divergence</button>' +
                '</div>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<button class="btn-validate" id="btn-validate-testing" style="margin-top:15px;background:#FF034D;">Submit</button>';

      fPanel.innerHTML = '';

      this.ensureActivityStyles();
      this.bindActivity1Choices();
      this.bindActivity1Validation();
      this.bindLockedRowHint();
    }

    ensureActivityStyles() {
      if (document.getElementById('exo17-custom-styles')) return;
      var style = document.createElement('style');
      style.id = 'exo17-custom-styles';
      style.innerHTML =
        '.btn-choice{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;cursor:pointer;transition:all .2s ease;}' +
        '.btn-choice:hover:not([disabled]){background:rgba(255,255,255,.15);}' +
        '.btn-choice.active-yes{background:#10b981!important;border-color:#10b981!important;color:#fff!important;box-shadow:0 0 10px rgba(16,185,129,.4);}' +
        '.btn-choice.active-no{background:#ef4444!important;border-color:#ef4444!important;color:#fff!important;box-shadow:0 0 10px rgba(239,68,68,.4);}' +
        '.btn-choice[disabled]{opacity:.5;cursor:not-allowed;}';
      document.head.appendChild(style);
    }

    bindActivity1Choices() {
      var qPanel = document.getElementById('quiz-question-panel');
      if (!qPanel) return;

      this.learningRates.forEach((rate) => {
        var row = qPanel.querySelector('.rate-row[data-rate="' + rate.value + '"]');
        if (!row) return;

        var convBtn = row.querySelector('.btn-choice[data-choice="convergence"]');
        var divBtn = row.querySelector('.btn-choice[data-choice="divergence"]');
        if (!convBtn || !divBtn) return;

        convBtn.onclick = (e) => {
          e.stopPropagation();
          this.userAnswers[rate.value] = 'convergence';
          convBtn.classList.toggle('active-yes', rate.expected === 'convergence');
          convBtn.classList.toggle('active-no', rate.expected !== 'convergence');
          divBtn.classList.remove('active-yes', 'active-no');
        };

        divBtn.onclick = (e) => {
          e.stopPropagation();
          this.userAnswers[rate.value] = 'divergence';
          divBtn.classList.toggle('active-yes', rate.expected === 'divergence');
          divBtn.classList.toggle('active-no', rate.expected !== 'divergence');
          convBtn.classList.remove('active-yes', 'active-no');
        };
      });
    }

    bindLockedRowHint() {
      var qPanel = document.getElementById('quiz-question-panel');
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!qPanel || !fPanel) return;

      qPanel.querySelectorAll('.rate-row').forEach((row) => {
        row.onclick = () => {
          if (row.classList.contains('rate-locked')) {
            fPanel.innerHTML =
              '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
                'Please first test value <strong>' + row.getAttribute('data-rate') + '</strong> in the simulator.' +
              '</div>';
          }
        };
      });
    }

    bindActivity1Validation() {
      var validateBtn = document.getElementById('btn-validate-testing');
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!validateBtn || !fPanel) return;

      validateBtn.onclick = () => {
        var untested = this.learningRates.filter((rate) => !this.testedRates[rate.value]);
        if (untested.length > 0) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
              'There are <strong>' + untested.length + '</strong> learning rate value(s) left to test before validation.' +
            '</div>';
          return;
        }

        var incorrect = this.learningRates.filter((rate) => this.userAnswers[rate.value] !== rate.expected);
        if (incorrect.length > 0) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
              'You have <strong>' + incorrect.length + '</strong> incorrect response(s). Watch the loss behavior carefully.' +
            '</div>';
          return;
        }

        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
            '✨ Great! Moving to activity 2...' +
          '</div>';

        setTimeout(() => this.initActivity2(), 1200);
      };
    }

    initActivity2() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      this.sortedStates = {};
      fPanel.innerHTML = '';

      qPanel.innerHTML =
        '<div class="dragdrop-container" style="background:rgba(11,15,26,.4);border:1.5px solid rgba(255,255,255,.08);padding:15px;border-radius:12px;">' +
          '<div class="dragdrop-header" style="margin-bottom:15px;">' +
            '<span class="dragdrop-badge" style="background:#FF034D;color:white;padding:2px 8px;border-radius:4px;font-weight:700;font-size:11px;">Activity 2</span>' +
            '<h2 style="font-size:16px;margin:8px 0 4px;color:#fff;">Drag and drop statements</h2>' +
            '<h3 style="font-size:12px;margin:0;color:#94a3b8;font-weight:500;">True or False?</h3>' +
          '</div>' +
          '<div class="dragdrop-cards-area" id="cards-source" style="display:flex;flex-direction:column;gap:8px;margin-bottom:15px;min-height:80px;padding:10px;background:rgba(0,0,0,.2);border-radius:8px;">' +
            this.dragCards.map((c) => {
              return '<div class="drag-card" draggable="true" id="' + c.id + '" style="padding:10px;background:#004676;border:1px solid rgba(255,255,255,.15);border-radius:6px;color:#fff;cursor:grab;font-size:13px;line-height:1.35;">' + c.text + '</div>';
            }).join('') +
          '</div>' +
          '<div class="dragdrop-zones-container" style="display:flex;gap:15px;margin-bottom:15px;">' +
            '<div class="drop-zone" id="zone-true" data-expected="true" style="flex:1;min-height:120px;background:rgba(16,185,129,.04);border:2px dashed rgba(16,185,129,.2);border-radius:10px;padding:10px;">' +
              '<h4 style="margin:0 0 10px;font-size:13px;color:#10b981;text-align:center;">True</h4>' +
              '<div class="zone-cards" style="display:flex;flex-direction:column;gap:8px;"></div>' +
            '</div>' +
            '<div class="drop-zone" id="zone-false" data-expected="false" style="flex:1;min-height:120px;background:rgba(239,68,68,.04);border:2px dashed rgba(239,68,68,.2);border-radius:10px;padding:10px;">' +
              '<h4 style="margin:0 0 10px;font-size:13px;color:#ef4444;text-align:center;">False</h4>' +
              '<div class="zone-cards" style="display:flex;flex-direction:column;gap:8px;"></div>' +
            '</div>' +
          '</div>' +
        '</div>';

      this.bindActivity2DragDrop();
    }

    bindActivity2DragDrop() {
      var qPanel = document.getElementById('quiz-question-panel');
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!qPanel || !fPanel) return;

      var cards = qPanel.querySelectorAll('.drag-card');
      var zones = qPanel.querySelectorAll('.drop-zone');
      var draggedCard = null;

      cards.forEach((card) => {
        card.addEventListener('dragstart', function () {
          draggedCard = card;
          card.style.opacity = '0.5';
        });
        card.addEventListener('dragend', function () {
          card.style.opacity = '1';
          draggedCard = null;
        });
      });

      zones.forEach((zone) => {
        zone.addEventListener('dragover', function (e) { e.preventDefault(); });

        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          if (!draggedCard) return;

          var cardId = draggedCard.id;
          var targetState = zone.getAttribute('data-expected');
          var cardData = this.dragCards.find(function (c) { return c.id === cardId; });
          if (!cardData) return;

          var isCorrect = cardData.correct === targetState;
          zone.querySelector('.zone-cards').appendChild(draggedCard);

          if (isCorrect) {
            draggedCard.setAttribute('draggable', 'false');
            draggedCard.style.cursor = 'default';
            draggedCard.style.borderColor = '#10b981';
            draggedCard.style.background = 'rgba(16,185,129,.2)';
            this.sortedStates[cardId] = true;

            fPanel.innerHTML =
              '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
                cardData.feedback +
              '</div>';
          } else {
            draggedCard.style.borderColor = '#ef4444';
            draggedCard.style.background = 'rgba(239,68,68,.2)';

            fPanel.innerHTML =
              '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
                this.incorrectFeedbackFallback[cardId] +
              '</div>';

            setTimeout(function () {
              var source = document.getElementById('cards-source');
              if (source) source.appendChild(draggedCard);
              draggedCard.style.borderColor = 'rgba(255,255,255,.15)';
              draggedCard.style.background = '#004676';
            }, 900);
          }

          var allSorted = this.dragCards.every((c) => this.sortedStates[c.id]);
          if (allSorted) this.showFinalConclusion();
        });
      });
    }

    showFinalConclusion() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">General conclusion</div>' +
          '<div class="quiz-question-card" style="font-size:13.5px;line-height:1.6;text-align:left;background:#003052;">' +
            'Learning rate affects stability: too high can cause unstable updates, while lower values improve stable convergence. This behavior depends on model/data complexity.' +
          '</div>' +
        '</div>' +
        '<button class="btn-validate" id="btn-finish-quiz" style="margin-top:15px;background:#FF034D;">OK</button>';

      fPanel.innerHTML = '';

      var btn = document.getElementById('btn-finish-quiz');
      if (!btn) return;

      btn.onclick = () => {
        this.unlockQuizButton(this.doneBtnId, '✨ Submit the exercise');

        qPanel.innerHTML =
          '<div class="quiz-question-wrapper">' +
            '<div class="quiz-question-badge">Good job!</div>' +
            '<div class="quiz-question-card">Click the validation button in the footer to complete this exercise.</div>' +
          '</div>';
      };
    }

    async handleSaveDraft() {
      if (!this.isLoggedIn) {
        window.location.href = this.registerUrl;
        return;
      }

      var saved = await this.saveProgress(Math.max(this.currentStepIndex, 0), 'IN_PROGRESS', {
        completed_steps: 0,
        total_steps: 2
      });

      if (!saved) {
        this.showErrorMessage('Unable to save your draft right now.');
        return;
      }

      var btnSave = document.getElementById(this.saveBtnId);
      if (btnSave) {
        btnSave.innerHTML = '✅ Saved !';
        btnSave.style.opacity = '0.7';
        btnSave.disabled = true;
      }
    }

    async handleCompleteAndLeave() {
      if (!this.isLoggedIn) {
        window.location.href = this.registerUrl;
        return;
      }

      var ok = await this.saveProgress(2, 'COMPLETED', { completed_steps: 2, total_steps: 2 });
      if (!ok) {
        this.showErrorMessage('Unable to validate this exercise right now.');
        return;
      }

      var btnDone = document.getElementById(this.doneBtnId);
      if (btnDone) {
        btnDone.innerHTML = '✨ Validated !';
        btnDone.disabled = true;
      }

      setTimeout(function () {
        window.location.href = 'Page-demo/exercises.html';
      }, 900);
    }

    async saveProgress(stepIndex, status, scoreDetails) {
      var ok = await ExoPageBase.prototype.saveProgress.call(this, stepIndex, status, scoreDetails);
      if (ok) return true;

      if (!window.StorageService) return false;
      try {
        return await window.StorageService[status === 'COMPLETED' ? 'complete' : 'save'](this.exoId);
      } catch (_e) {
        return false;
      }
    }
  }

  window.exo17Page = new Exo17();
})();
