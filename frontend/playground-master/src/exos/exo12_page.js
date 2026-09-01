(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 12.');
    return;
  }

  class Exo12 extends ExoPageBase {
    constructor() {
      super({
        exoId: 12,
        quizUrl: 'exoquiz/exo12_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.definitionsData = {
        training_loss: { term: 'Training loss', def: 'Error of the model on the data it was trained on.' },
        test_loss: { term: 'Test loss', def: 'Error of the model on new, unseen data.' }
      };

      this.matchingData = {
        concepts: [
          { id: 'training_loss', name: 'Training loss' },
          { id: 'test_loss', name: 'Test loss' },
          { id: 'divergence', name: 'Divergence' },
          { id: 'overfitting', name: 'Overfitting' }
        ],
        definitions: [
          { id: 'training_loss', text: 'Error of the model on the data it was trained on' },
          { id: 'test_loss', text: 'Error of the model on new, unseen data' },
          { id: 'divergence', text: 'Situation where the loss increases instead of decreasing during training' },
          { id: 'overfitting', text: 'When the model learns training data too well but performs poorly on new data' }
        ]
      };

      this.resetMatchingState();
      this.injectLocalStyles();
      this.init();
    }

    resetMatchingState() {
      this.matchesState = {
        training_loss: null,
        test_loss: null,
        divergence: null,
        overfitting: null
      };
      this.draggedCardId = null;
      this.selectedForMatchCardId = null;
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
        title: 'Exercise #12: Overfitting & Generalization',
        text: 'In this exercise, you will explore Training/Test Loss, Overfitting, and Generalization. First, complete the matching activity.',
        seconds: 10,
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
      this.injectIframeInfoTip({
        iframeId: this.iframeId,
        hostSelector: '.ui-testLoss',
        onClick: () => this.showDefinitionModal(
          this.definitionsData.test_loss.term,
          this.definitionsData.test_loss.def
        )
      });

      this.injectIframeInfoTip({
        iframeId: this.iframeId,
        hostSelector: '.ui-trainLoss',
        onClick: () => this.showDefinitionModal(
          this.definitionsData.training_loss.term,
          this.definitionsData.training_loss.def
        )
      });
    }

    renderActivity1() {
      this.resetMatchingState();

      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Activity 1</div>' +
          '<div class="quiz-question-card" style="font-size:13.5px;line-height:1.45;">' +
            '<strong>Drag and drop</strong> - Match each concept with its definition.' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:15px;margin-top:15px;">' +
          '<div style="flex:1;display:flex;flex-direction:column;">' +
            '<h4 style="font-size:11px;text-transform:uppercase;color:#94a3b8;margin:0 0 8px;letter-spacing:.5px;">Definitions</h4>' +
            '<div id="drag-source-area" style="display:flex;flex-direction:column;gap:2px;"></div>' +
          '</div>' +
          '<div style="flex:1;display:flex;flex-direction:column;">' +
            '<h4 style="font-size:11px;text-transform:uppercase;color:#94a3b8;margin:0 0 8px;letter-spacing:.5px;">Concepts</h4>' +
            '<div id="drop-target-area" style="display:flex;flex-direction:column;gap:2px;"></div>' +
          '</div>' +
        '</div>';

      fPanel.innerHTML =
        '<div class="feedback-box" style="border-left-color:#8b5cf6;background:rgba(139,92,246,.05);">' +
          '💡 Use the (?) buttons next to simulator loss stats if needed.' +
        '</div>';

      var sourceArea = qPanel.querySelector('#drag-source-area');
      var targetArea = qPanel.querySelector('#drop-target-area');
      if (!sourceArea || !targetArea) return;

      var shuffledDefs = this.matchingData.definitions.slice().sort(function () { return Math.random() - 0.5; });
      var shuffledConcepts = this.matchingData.concepts.slice().sort(function () { return Math.random() - 0.5; });

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

      shuffledConcepts.forEach((c) => {
        var wrapper = document.createElement('div');
        wrapper.className = 'drop-zone-wrapper';
        wrapper.id = 'target-wrapper-' + c.id;
        wrapper.innerHTML =
          '<div class="drop-zone-concept">' + c.name + '</div>' +
          '<div class="drop-zone-target" id="zone-' + c.id + '">Drop definition here</div>';

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
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!fPanel || !sourceId) return;

      var dragCard = document.getElementById('drag-' + sourceId);
      var zone = document.getElementById('zone-' + conceptId);
      if (!dragCard || !zone) return;

      var concept = this.matchingData.concepts.find(function (c) { return c.id === conceptId; });

      if (sourceId === conceptId) {
        this.matchesState[conceptId] = sourceId;
        zone.innerText = dragCard.innerText;
        zone.classList.add('matched');
        dragCard.style.display = 'none';
        this.selectedForMatchCardId = null;
        dragCard.classList.remove('selected-for-match');

        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
            '✅ Correct! You matched <strong>' + (concept ? concept.name : conceptId) + '</strong>.' +
          '</div>';

        var allDone = Object.keys(this.matchesState).every((k) => this.matchesState[k] !== null);
        if (allDone) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);font-weight:700;">' +
              '🎉 Great! You identified the key concepts — now run the model and observe behavior.' +
            '</div>';
        }
      } else {
        dragCard.classList.add('shake-error');
        setTimeout(function () { dragCard.classList.remove('shake-error'); }, 500);
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
            '❌ Not quite. That definition does not match <strong>' + (concept ? concept.name : conceptId) + '</strong>. Try again.' +
          '</div>';
      }
    }

    injectLocalStyles() {
      if (document.getElementById('exo12-local-styles')) return;
      var styleEl = document.createElement('style');
      styleEl.id = 'exo12-local-styles';
      styleEl.textContent = `
        .drag-card { background: rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:12px; font-size:13px; color:#e2e8f0; cursor:grab; user-select:none; transition:all .2s; margin-bottom:10px; box-shadow:0 4px 6px rgba(0,0,0,.15);}
        .drag-card:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.25); transform: translateY(-2px); }
        .drag-card.dragging { opacity:.4; }
        .drag-card.selected-for-match { border:2px solid #8b5cf6 !important; background: rgba(139,92,246,.15) !important; box-shadow:0 0 10px rgba(139,92,246,.4); }
        .drop-zone-wrapper { background: rgba(255,255,255,.02); border:1px dashed rgba(255,255,255,.15); border-radius:8px; padding:10px; margin-bottom:10px; display:flex; flex-direction:column; gap:6px; min-height:80px; transition:all .2s; cursor:pointer; }
        .drop-zone-wrapper.dragover { background: rgba(139,92,246,.1) !important; border-color:#8b5cf6 !important; border-style:solid !important; }
        .drop-zone-concept { font-weight:700; font-size:13.5px; color:#a78bfa; }
        .drop-zone-target { min-height:40px; display:flex; align-items:center; justify-content:center; font-size:12.5px; color:#94a3b8; background: rgba(0,0,0,.2); border-radius:6px; padding:8px; text-align:center; transition:all .2s; }
        .drop-zone-target.matched { background: rgba(16,185,129,.1) !important; border:1px solid #10b981 !important; color:#10b981 !important; font-weight:500; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
        .shake-error { animation: shake .4s ease-in-out; border-color:#ef4444 !important; background: rgba(239,68,68,.15) !important; }
      `;
      document.head.appendChild(styleEl);
    }
  }

  window.exo12Page = new Exo12();
})();
