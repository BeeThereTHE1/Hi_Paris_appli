(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 15.');
    return;
  }

  class Exo15 extends ExoPageBase {
    constructor() {
      super({
        exoId: 15,
        quizUrl: 'exoquiz/exo15_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.definitionsData = {
        training_data: {
          term: "Training Data (Données d'entraînement)",
          def: "The dataset used by the model during training to directly update its weights via backpropagation."
        },
        test_data: {
          term: 'Test Data (Données de test)',
          def: 'The dataset kept unseen during weight updates, used to evaluate how well the model generalizes to new, unseen inputs.'
        }
      };

      this.matchingData = {
        concepts: [
          { id: 'training_data', name: 'Training Data' },
          { id: 'test_data', name: 'Test Data' }
        ],
        definitions: [
          { id: 'training_data_1', category: 'training_data', text: 'The model directly updates its weights using this data' },
          { id: 'training_data_2', category: 'training_data', text: 'The loss on this data decreases continuously during training' },
          { id: 'training_data_3', category: 'training_data', text: 'This dataset is seen by the model during backpropagation' },
          { id: 'training_data_4', category: 'training_data', text: 'The model can memorize patterns specific to this data' },
          { id: 'training_data_5', category: 'training_data', text: 'Performance on this data may become misleadingly good (overfitting)' },
          { id: 'test_data_1', category: 'test_data', text: 'This dataset remains unseen during weight updates' },
          { id: 'test_data_2', category: 'test_data', text: 'The model does not learn directly from this data' },
          { id: 'test_data_3', category: 'test_data', text: 'Overfitting is observed when performance worsens on this data' },
          { id: 'test_data_4', category: 'test_data', text: 'This data reflects how well the model performs on new, unseen inputs' },
          { id: 'test_data_5', category: 'test_data', text: 'This data is used to evaluate generalization performance' }
        ]
      };

      this.resetState();
      this.injectLocalStyles();
      this.init();
    }

    resetState() {
      this.draggedCardId = null;
      this.selectedForMatchCardId = null;
      this.correctMatchesCount = 0;
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      this.onIframeLoad(() => {
        if (this.isCompletedFromQuery()) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          this.renderAlreadyCompletedState();
          return;
        }

        this.startTutorial();
      }, 1200);
    }

    renderAlreadyCompletedState() {
      var qPanel = document.getElementById('quiz-question-panel');
      if (!qPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Exercise Successful</div>' +
          '<div class="quiz-question-card">' +
            'You have already validated this exercise! Vous pouvez passer au quiz final en cliquant sur le bouton ci-dessous ou retourner aux exercices.' +
          '</div>' +
        '</div>';
    }

    startTutorial() {
      var handled = this.showTimedIntro({
        title: 'Exercise #15 : Training & Test Datasets',
        text: 'In this exercise, classify statements between Training Data and Test Data, then observe behavior in the simulator.',
        seconds: 7,
        buttonLabel: 'Continue',
        onContinue: () => {
          setTimeout(() => {
            this.injectInfoTipsInIframe();
            this.renderActivity1();
          }, 800);
        }
      });

      if (!handled) {
        this.injectInfoTipsInIframe();
        this.renderActivity1();
      }
    }

    injectInfoTipsInIframe() {
      // Here we reuse existing tips in iframe (instead of creating new nodes)
      var iframe = document.getElementById(this.iframeId);
      if (!iframe) return;

      try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;

        var datasetTip = iframeDoc.querySelector('.ui-dataset h4 .info-tip');
        var testDataTip = iframeDoc.querySelector('.ui-showTestData .info-tip');

        if (datasetTip) {
          datasetTip.classList.add('info-tip-flash-active');
          datasetTip.onclick = (e) => {
            e.stopPropagation();
            this.showDefinitionModal(this.definitionsData.training_data.term, this.definitionsData.training_data.def);
          };
        }

        if (testDataTip) {
          testDataTip.classList.add('info-tip-flash-active');
          testDataTip.onclick = (e) => {
            e.stopPropagation();
            this.showDefinitionModal(this.definitionsData.test_data.term, this.definitionsData.test_data.def);
          };
        }

        if (!iframeDoc.getElementById('exo15-tip-style')) {
          var style = iframeDoc.createElement('style');
          style.id = 'exo15-tip-style';
          style.textContent =
            '@keyframes loss-tip-flash{0%,100%{background:transparent;color:#8b5cf6;transform:scale(1);box-shadow:none;border-color:#8b5cf6;}50%{background:#FF034D;color:white;transform:scale(1.3);box-shadow:0 0 10px #FF034D;border-color:#FF034D;}}' +
            '.info-tip-flash-active{animation:loss-tip-flash 1s ease-in-out;animation-iteration-count:10;}';
          iframeDoc.head.appendChild(style);
        }
      } catch (e) {
        console.warn('Could not inject info tips into playground simulator iframe.', e);
      }
    }

    renderActivity1() {
      this.resetState();

      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 1</div>' +
          '<div class="quiz-question-card" style="font-size:13.5px;line-height:1.45;">' +
            '<strong>Drag and drop</strong> - Match each statement to the correct concept (Training Data or Test Data).' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:15px;margin-top:15px;">' +
          '<div style="flex:1;display:flex;flex-direction:column;">' +
            '<h4 style="font-size:11px;text-transform:uppercase;color:#94a3b8;margin:0 0 8px;letter-spacing:.5px;">Statements</h4>' +
            '<div id="drag-source-area" style="display:flex;flex-direction:column;gap:2px;"></div>' +
          '</div>' +
          '<div style="flex:1;display:flex;flex-direction:column;">' +
            '<h4 style="font-size:11px;text-transform:uppercase;color:#94a3b8;margin:0 0 8px;letter-spacing:.5px;">Concepts</h4>' +
            '<div id="drop-target-area" style="display:flex;flex-direction:column;gap:2px;"></div>' +
          '</div>' +
        '</div>';

      fPanel.innerHTML =
        '<div class="feedback-box" style="border-left-color:#8b5cf6;background:rgba(139,92,246,.05);">' +
          '💡 Use the (?) buttons in the simulator if needed.' +
        '</div>';

      var sourceArea = qPanel.querySelector('#drag-source-area');
      var targetArea = qPanel.querySelector('#drop-target-area');
      if (!sourceArea || !targetArea) return;

      var shuffledDefs = this.matchingData.definitions.slice().sort(function () { return Math.random() - 0.5; });

      shuffledDefs.forEach((def) => {
        var card = document.createElement('div');
        card.className = 'drag-card';
        card.id = 'drag-' + def.id;
        card.innerText = def.text;
        card.draggable = true;

        card.ondragstart = (e) => {
          this.draggedCardId = def.id;
          card.classList.add('dragging');
          e.dataTransfer.setData('text/plain', def.id);
        };
        card.ondragend = () => card.classList.remove('dragging');

        card.onclick = (e) => {
          e.stopPropagation();
          if (this.selectedForMatchCardId === def.id) {
            this.selectedForMatchCardId = null;
            card.classList.remove('selected-for-match');
          } else {
            Array.prototype.forEach.call(sourceArea.querySelectorAll('.drag-card'), function (el) {
              el.classList.remove('selected-for-match');
            });
            this.selectedForMatchCardId = def.id;
            card.classList.add('selected-for-match');
          }
        };

        sourceArea.appendChild(card);
      });

      this.matchingData.concepts.forEach((c) => {
        var wrapper = document.createElement('div');
        wrapper.className = 'drop-zone-wrapper';
        wrapper.id = 'target-wrapper-' + c.id;

        wrapper.innerHTML =
          '<div class="drop-zone-concept">' + c.name + '</div>' +
          '<div class="drop-zone-content" id="zone-content-' + c.id + '">' +
            '<div style="font-size:12px;color:#94a3b8;">Drop statements here</div>' +
          '</div>';

        wrapper.ondragover = function (e) { e.preventDefault(); wrapper.classList.add('dragover'); };
        wrapper.ondragleave = function () { wrapper.classList.remove('dragover'); };
        wrapper.ondrop = (e) => {
          e.preventDefault();
          wrapper.classList.remove('dragover');
          var sourceId = e.dataTransfer.getData('text/plain') || this.draggedCardId;
          this.handleDropMatch(sourceId, c.id);
        };
        wrapper.onclick = () => {
          if (this.selectedForMatchCardId) this.handleDropMatch(this.selectedForMatchCardId, c.id);
        };

        targetArea.appendChild(wrapper);
      });
    }

    handleDropMatch(sourceId, conceptId) {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var fPanel = panels.feedbackPanel;
      if (!fPanel || !sourceId) return;

      var dragCard = document.getElementById('drag-' + sourceId);
      var zoneContent = document.getElementById('zone-content-' + conceptId);
      if (!dragCard || !zoneContent) return;

      var stmt = this.matchingData.definitions.find(function (d) { return d.id === sourceId; });
      if (!stmt) return;

      if (stmt.category === conceptId) {
        this.correctMatchesCount++;

        var placeholder = zoneContent.querySelector('div');
        if (placeholder && placeholder.innerText.indexOf('Drop statements') !== -1) placeholder.remove();

        var pill = document.createElement('div');
        pill.className = 'pill-matched';
        pill.innerText = dragCard.innerText;
        zoneContent.appendChild(pill);

        dragCard.style.display = 'none';
        this.selectedForMatchCardId = null;
        dragCard.classList.remove('selected-for-match');

        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
            '✅ Correct! This statement matches <strong>' + conceptId.replace('_', ' ') + '</strong>.' +
          '</div>';

        if (this.correctMatchesCount === this.matchingData.definitions.length) {
          this.showKeyInsightModal();
        }
      } else {
        dragCard.classList.add('shake-error');
        setTimeout(function () { dragCard.classList.remove('shake-error'); }, 500);

        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
            '❌ Incorrect. This statement belongs to the other category. Try again.' +
          '</div>';
      }
    }

    showKeyInsightModal() {
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (fPanel) {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);margin-top:15px;font-weight:700;">' +
            '🎉 Great matching! You are ready for the final check.' +
          '</div>';
      }

      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'key-insight-overlay';
      overlay.style.zIndex = '10006';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.innerHTML =
        '<h3>💡 Key insight</h3>' +
        '<p>A neural network model is trained on training data, then evaluated on test data to measure generalization.</p>';

      var okBtn = document.createElement('button');
      okBtn.className = 'tutorial-btn';
      okBtn.innerText = 'OK';
      okBtn.onclick = () => {
        overlay.remove();

        var instrEl = document.querySelector('.exo-instructions');
        if (instrEl) {
          instrEl.innerText = 'Now that you identified training vs test roles, let’s connect this to simulator behavior.';
        }

        var qCardText = document.querySelector('.quiz-question-card');
        if (qCardText) {
          qCardText.innerText = 'Now that you identified training vs test roles, let’s connect this to simulator behavior.';
        }

        if (fPanel) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);margin-top:15px;font-weight:700;">' +
              '✅ You can now proceed to the quiz.' +
            '</div>';
        }

        this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
      };

      popup.appendChild(okBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
    }

    injectLocalStyles() {
      if (document.getElementById('exo15-local-styles')) return;

      var styleEl = document.createElement('style');
      styleEl.id = 'exo15-local-styles';
      styleEl.textContent = `
        .drag-card { background: rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:10px 12px; font-size:13px; color:#e2e8f0; cursor:grab; user-select:none; transition:all .2s; margin-bottom:8px; box-shadow:0 4px 6px rgba(0,0,0,.15);}
        .drag-card:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.25); transform: translateY(-2px); }
        .drag-card.dragging { opacity:.4; }
        .drag-card.selected-for-match { border:2px solid #8b5cf6 !important; background: rgba(139,92,246,.15) !important; box-shadow:0 0 10px rgba(139,92,246,.4); }

        .drop-zone-wrapper { background: rgba(255,255,255,.02); border:1px dashed rgba(255,255,255,.15); border-radius:8px; padding:10px; margin-bottom:10px; display:flex; flex-direction:column; gap:6px; min-height:90px; transition:all .2s; cursor:pointer; }
        .drop-zone-wrapper.dragover { background: rgba(139,92,246,.1) !important; border-color:#8b5cf6 !important; border-style:solid !important; }
        .drop-zone-concept { font-weight:700; font-size:13.5px; color:#a78bfa; }
        .drop-zone-content { min-height:45px; display:flex; flex-direction:column; gap:6px; background: rgba(0,0,0,.2); border-radius:6px; padding:8px; }

        .pill-matched { background: rgba(16,185,129,.12); border:1px solid #10b981; color:#d1fae5; font-size:12.5px; border-radius:999px; padding:6px 10px; }

        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
        .shake-error { animation: shake .4s ease-in-out; border-color:#ef4444 !important; background: rgba(239,68,68,.15) !important; }
      `;
      document.head.appendChild(styleEl);
    }
  }

  window.exo15Page = new Exo15();
})();
