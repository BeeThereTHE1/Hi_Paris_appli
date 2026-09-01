(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 16.');
    return;
  }

  class Exo16 extends ExoPageBase {
    constructor() {
      super({
        exoId: 16,
        quizUrl: 'exoquiz/exo16_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise',
        registerUrl: 'Page-demo/register.html'
      });

      this.simulationCheckInterval = null;
      this.draggedCardId = null;
      this.selectedCardId = null;
      this.correctDropsCount = 0;

      this.observationsData = {
        dropZones: [
          { id: 'sig-weight', model: 'sigmoid', type: 'weight', correctVal: 'vsu', text: 'Very small updates in early layers' },
          { id: 'sig-learning', model: 'sigmoid', type: 'learning', correctVal: 'sba', text: 'Slow, blocked, or absent' },
          { id: 'sig-neuron', model: 'sigmoid', type: 'neuron', correctVal: 'enf', text: 'Early neurons fail to learn useful features' },
          { id: 'sig-layer', model: 'sigmoid', type: 'layer', correctVal: 'eia', text: 'Early layers are "inactive" (no learning signal)' },
          { id: 'sig-suitability', model: 'sigmoid', type: 'suitability', correctVal: 'pc', text: 'Poor choice' },
          { id: 'relu-weight', model: 'relu', type: 'weight', correctVal: 'eua', text: 'Effective updates across all layers' },
          { id: 'relu-learning', model: 'relu', type: 'learning', correctVal: 'cont', text: 'Continuous' },
          { id: 'relu-neuron', model: 'relu', type: 'neuron', correctVal: 'lmh', text: 'Neurons learn meaningful hierarchical representations' },
          { id: 'relu-layer', model: 'relu', type: 'layer', correctVal: 'alc', text: 'All layers contribute to learning' },
          { id: 'relu-suitability', model: 'relu', type: 'suitability', correctVal: 'pfc', text: 'Preferred choice' }
        ],
        cards: [
          { id: 'vsu', text: 'Very small updates in early layers', correctZone: 'sig-weight' },
          { id: 'sba', text: 'Slow, blocked, or absent', correctZone: 'sig-learning' },
          { id: 'enf', text: 'Early neurons fail to learn useful features', correctZone: 'sig-neuron' },
          { id: 'eia', text: 'Early layers are "inactive" (no learning signal)', correctZone: 'sig-layer' },
          { id: 'pc', text: 'Poor choice', correctZone: 'sig-suitability' },
          { id: 'eua', text: 'Effective updates across all layers', correctZone: 'relu-weight' },
          { id: 'cont', text: 'Continuous', correctZone: 'relu-learning' },
          { id: 'lmh', text: 'Neurons learn meaningful hierarchical representations', correctZone: 'relu-neuron' },
          { id: 'alc', text: 'All layers contribute to learning', correctZone: 'relu-layer' },
          { id: 'pfc', text: 'Preferred choice', correctZone: 'relu-suitability' }
        ]
      };

      this.injectLocalStyles();
      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();

      // completed flow: use iframe load for consistency with existing pages
      this.onIframeLoad(() => {
        if (this.isCompletedFromQuery()) {
          this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');
          this.renderCompletedState();
          return;
        }
        this.startTutorial();
      }, 1000);

      // cleanup polling when leaving page
      window.addEventListener('beforeunload', () => this.clearSimulationInterval());
    }

    renderCompletedState() {
      var qPanel = document.getElementById('quiz-question-panel');
      if (!qPanel) return;
      qPanel.innerHTML =
        '<div class="quiz-question-wrapper">' +
          '<div class="quiz-question-badge">Exercise Successful</div>' +
          '<div class="quiz-question-card">You already completed this exercise. You can directly take the quiz.</div>' +
        '</div>';
    }

    startTutorial() {
      var handled = this.showTimedIntro({
        title: 'Exercise #16: Gradient Killing & Sigmoid vs ReLU',
        text: 'Compare Sigmoid vs ReLU behavior in deep networks. Complete the 3 activities to validate your observations.',
        seconds: 7,
        buttonLabel: 'Continue',
        onContinue: () => this.renderActivity1()
      });

      if (!handled) this.renderActivity1();
    }

    renderActivity1() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper" style="margin-bottom:15px;">' +
          '<div class="quiz-question-badge" style="background:#004676;">Activity 1</div>' +
          '<div class="quiz-question-card">Read the definitions in order, then continue.</div>' +
        '</div>' +
        '<div id="def-box-1" class="def-box">Gradient: direction and magnitude used to update parameters.</div>' +
        '<div id="def-box-2" class="def-box">If gradients vanish, early layers learn very slowly.</div>' +
        '<div id="def-box-3" class="def-box">Sigmoid can saturate, producing tiny gradients.</div>' +
        '<div id="def-box-4" class="def-box">ReLU often preserves stronger gradients in deep nets.</div>' +
        '<div style="margin-top:12px;"><button id="btn-next-act1" class="tutorial-btn" disabled>Next activity</button></div>';

      fPanel.innerHTML = '<div class="feedback-box">📖 Read each definition as it appears.</div>';

      var showBox = function (id, delay, nextCallback) {
        setTimeout(function () {
          var el = document.getElementById(id);
          if (el) el.classList.add('show');
          if (nextCallback) nextCallback();
        }, delay);
      };

      showBox('def-box-1', 100, function () {
        showBox('def-box-2', 3500, function () {
          showBox('def-box-3', 7000, function () {
            showBox('def-box-4', 10500, function () {
              setTimeout(function () {
                var btn = document.getElementById('btn-next-act1');
                if (btn) {
                  btn.removeAttribute('disabled');
                  btn.classList.add('blink-next');
                }
                fPanel.innerHTML = '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">✅ Great. Continue to simulator comparison.</div>';
              }, 1200);
            });
          });
        });
      });

      var nextBtn = document.getElementById('btn-next-act1');
      if (nextBtn) nextBtn.onclick = () => this.renderActivity2();
    }

    renderActivity2() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper" style="margin-bottom:15px;">' +
          '<div class="quiz-question-badge" style="background:#FF034D;">Activity 2</div>' +
          '<div class="quiz-question-card">Run both simulators (Sigmoid/ReLU) until each reaches at least 150 epochs.</div>' +
        '</div>' +
        '<div class="status-grid">' +
          '<div>Sigmoid status: <strong id="status-sigmoid">Stopped (0 epochs)</strong></div>' +
          '<div>ReLU status: <strong id="status-relu">Stopped (0 epochs)</strong></div>' +
        '</div>' +
        '<div style="margin-top:12px;"><button id="btn-next-act2" class="tutorial-btn" disabled>Next activity</button></div>';

      fPanel.innerHTML = '<div class="feedback-box" style="border-left-color:#FF034D;">💡 Press Play in both simulators.</div>';

      this.injectPlayFlash('iframe-sigmoid');
      this.injectPlayFlash('iframe-relu');

      this.clearSimulationInterval();

      this.simulationCheckInterval = setInterval(() => {
        try {
          var sig = this.readSimulatorState('iframe-sigmoid');
          var relu = this.readSimulatorState('iframe-relu');

          this.updateStatusText('status-sigmoid', sig.epoch, sig.playing);
          this.updateStatusText('status-relu', relu.epoch, relu.playing);

          if (sig.epoch >= 150 && relu.epoch >= 150) {
            this.clearSimulationInterval();

            var btnNext = document.getElementById('btn-next-act2');
            if (btnNext) {
              btnNext.removeAttribute('disabled');
              btnNext.classList.add('blink-next');
            }

            fPanel.innerHTML =
              '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
                '✅ Both models reached 150+ epochs. Continue to the comparison table.' +
              '</div>';
          }
        } catch (e) {
          console.error('Simulation check error:', e);
        }
      }, 1000);

      var btnAct2 = document.getElementById('btn-next-act2');
      if (btnAct2) {
        btnAct2.onclick = () => {
          this.clearSimulationInterval();
          this.renderActivity3();
        };
      }
    }

    injectPlayFlash(iframeId) {
      try {
        var iframe = document.getElementById(iframeId);
        if (!iframe) return;
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        if (!doc) return;

        if (!doc.getElementById('exo16-iframe-styles')) {
          var style = doc.createElement('style');
          style.id = 'exo16-iframe-styles';
          style.textContent =
            '@keyframes play-btn-flash{0%,100%{transform:scale(1);box-shadow:0 0 5px #FF034D;background:transparent;}50%{transform:scale(1.08);box-shadow:0 0 14px #FF034D;background:rgba(255,3,77,.18);}}' +
            '.play-btn-flash{animation:play-btn-flash 1s infinite ease-in-out;}';
          doc.head.appendChild(style);
        }

        var playBtn = doc.getElementById('play-pause-button');
        if (playBtn) playBtn.classList.add('play-btn-flash');
      } catch (e) {
        console.warn('Could not inject flash to iframe', iframeId, e);
      }
    }

    readSimulatorState(iframeId) {
      var iframe = document.getElementById(iframeId);
      if (!iframe || !iframe.contentWindow) return { epoch: 0, playing: false };

      var doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return { epoch: 0, playing: false };

      var iter = doc.getElementById('iter-number');
      var epoch = iter ? (parseInt((iter.innerText || '0').replace(/,/g, ''), 10) || 0) : 0;

      var playBtn = doc.getElementById('play-pause-button');
      var playing = !!(playBtn && playBtn.classList.contains('playing'));

      if (playing && playBtn) playBtn.classList.remove('play-btn-flash');

      return { epoch: epoch, playing: playing };
    }

    updateStatusText(elId, epoch, playing) {
      var el = document.getElementById(elId);
      if (!el) return;

      if (epoch >= 150) {
        el.innerText = 'Ready (' + epoch + ' epochs)';
        el.style.color = '#10b981';
      } else if (playing) {
        el.innerText = 'Running (' + epoch + ' epochs)';
        el.style.color = '#3b82f6';
      } else {
        el.innerText = 'Stopped (' + epoch + ' epochs)';
        el.style.color = '#ef4444';
      }
    }

    renderActivity3() {
      // BUGFIX: reset activity state each time activity 3 starts
      this.correctDropsCount = 0;
      this.draggedCardId = null;
      this.selectedCardId = null;

      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      qPanel.innerHTML =
        '<div class="quiz-question-wrapper" style="margin-bottom:10px;">' +
          '<div class="quiz-question-badge" style="background:#10b981;">Activity 3</div>' +
          '<div class="quiz-question-card">Match each observation card to the correct table cell.</div>' +
        '</div>' +
        '<div id="observation-cards-container" class="cards-wrap"></div>' +
        '<div class="comparison-table">' + this.buildDropTableHtml() + '</div>';

      fPanel.innerHTML = '<div class="feedback-box">💡 Match all 10 cards to complete the exercise.</div>';

      var cardsContainer = document.getElementById('observation-cards-container');
      if (!cardsContainer) return;

      var shuffled = this.observationsData.cards.slice().sort(function () { return Math.random() - 0.5; });

      shuffled.forEach((c) => {
        var card = document.createElement('div');
        card.className = 'observation-card';
        card.id = 'card-' + c.id;
        card.innerText = c.text;
        card.draggable = true;

        card.ondragstart = (e) => {
          this.draggedCardId = c.id;
          card.classList.add('dragging');
          e.dataTransfer.setData('text/plain', c.id);
        };
        card.ondragend = () => card.classList.remove('dragging');

        card.onclick = (e) => {
          e.stopPropagation();
          if (this.selectedCardId === c.id) {
            this.selectedCardId = null;
            card.classList.remove('selected');
          } else {
            Array.prototype.forEach.call(cardsContainer.querySelectorAll('.observation-card'), function (el) { el.classList.remove('selected'); });
            this.selectedCardId = c.id;
            card.classList.add('selected');
          }
        };

        cardsContainer.appendChild(card);
      });

      var zones = qPanel.querySelectorAll('.drop-zone-cell');
      zones.forEach((zone) => {
        var zoneId = zone.getAttribute('data-zone');
        zone.ondragover = function (e) { e.preventDefault(); zone.classList.add('dragover'); };
        zone.ondragleave = function () { zone.classList.remove('dragover'); };
        zone.ondrop = (e) => {
          e.preventDefault();
          zone.classList.remove('dragover');
          var cardId = e.dataTransfer.getData('text/plain') || this.draggedCardId;
          this.handleDrop(cardId, zoneId);
        };
        zone.onclick = () => {
          if (this.selectedCardId) this.handleDrop(this.selectedCardId, zoneId);
        };
      });
    }

    buildDropTableHtml() {
      // simplified 2-column grouping by model
      var rows = [
        ['weight', 'Weight update quality'],
        ['learning', 'Learning dynamics'],
        ['neuron', 'Neuron behavior'],
        ['layer', 'Layer contribution'],
        ['suitability', 'Overall suitability']
      ];

      var html = '<table class="obs-table"><thead><tr><th>Criterion</th><th>Sigmoid</th><th>ReLU</th></tr></thead><tbody>';
      rows.forEach((r) => {
        var type = r[0], label = r[1];
        var sigId = 'sig-' + type;
        var reluId = 'relu-' + type;
        html +=
          '<tr>' +
            '<td>' + label + '</td>' +
            '<td><div id="zone-' + sigId + '" class="drop-zone-cell" data-zone="' + sigId + '"></div></td>' +
            '<td><div id="zone-' + reluId + '" class="drop-zone-cell" data-zone="' + reluId + '"></div></td>' +
          '</tr>';
      });
      html += '</tbody></table>';
      return html;
    }

    handleDrop(cardId, zoneId) {
      if (!cardId || !zoneId) return;

      var cardData = this.observationsData.cards.find(function (c) { return c.id === cardId; });
      if (!cardData) return;

      var cardEl = document.getElementById('card-' + cardId);
      var zoneEl = document.getElementById('zone-' + zoneId);
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (!cardEl || !zoneEl) return;

      // BUGFIX: prevent double counting if already filled
      if (zoneEl.classList.contains('correct-drop')) return;

      if (cardData.correctZone === zoneId) {
        this.correctDropsCount++;

        zoneEl.innerHTML = '<div class="pill-matched">' + cardData.text + '</div>';
        zoneEl.className = 'drop-zone-cell correct-drop';
        zoneEl.onclick = null;
        zoneEl.ondragover = null;
        zoneEl.ondragleave = null;
        zoneEl.ondrop = null;

        cardEl.remove();
        this.selectedCardId = null;

        if (fPanel) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.1);">' +
              '✅ Correct placement.' +
            '</div>';
        }

        if (this.correctDropsCount === this.observationsData.cards.length) {
          this.triggerCompletion();
        }
      } else {
        cardEl.classList.add('shake-error');
        setTimeout(function () { cardEl.classList.remove('shake-error'); }, 450);

        if (fPanel) {
          fPanel.innerHTML =
            '<div class="feedback-box" style="border-left-color:#ef4444;background:rgba(239,68,68,.1);">' +
              '❌ Incorrect placement. Try another cell.' +
            '</div>';
        }
      }
    }

    triggerCompletion() {
      var fPanel = document.getElementById('quiz-feedback-panel');
      if (fPanel) {
        fPanel.innerHTML =
          '<div class="feedback-box" style="border-left-color:#10b981;background:rgba(16,185,129,.15);font-weight:700;">' +
            '🎉 Excellent comparison! You can proceed to the quiz.' +
          '</div>';
      }

      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      overlay.id = 'completion-overlay';
      overlay.style.zIndex = '10006';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.innerHTML =
        '<h3>💡 Observations Validated!</h3>' +
        '<p>Excellent! Let’s now move to the quiz.</p>';

      var okBtn = document.createElement('button');
      okBtn.className = 'tutorial-btn';
      okBtn.innerText = 'Take the quiz';
      okBtn.onclick = () => {
        overlay.remove();
        this.unlockQuizButton(this.doneBtnId, '<span class="icon">📝</span> Take the quiz');

        var qPanel = document.getElementById('quiz-question-panel');
        if (qPanel) {
          qPanel.innerHTML =
            '<div class="quiz-question-wrapper">' +
              '<div class="quiz-question-badge">Congratulations</div>' +
              '<div class="quiz-question-card">You completed all activities. Click the button below to continue.</div>' +
            '</div>';
        }
      };

      popup.appendChild(okBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
    }

    clearSimulationInterval() {
      if (this.simulationCheckInterval) {
        clearInterval(this.simulationCheckInterval);
        this.simulationCheckInterval = null;
      }
    }

    injectLocalStyles() {
      if (document.getElementById('exo16-local-styles')) return;

      var styleEl = document.createElement('style');
      styleEl.id = 'exo16-local-styles';
      styleEl.textContent = `
        .def-box {
          opacity: 0; transform: translateY(6px); transition: all .35s ease;
          background: rgba(30,41,59,.7); border:1px solid rgba(255,255,255,.08);
          border-left:4px solid #004676; border-radius:8px; padding:10px; margin:8px 0; color:#e2e8f0;
        }
        .def-box.show { opacity: 1; transform: translateY(0); }
        .blink-next { animation: pulse-next 1s infinite; }
        @keyframes pulse-next { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }

        .status-grid { display:grid; gap:8px; margin:10px 0; }

        .cards-wrap { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0 14px; }
        .observation-card {
          background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.15);
          border-radius:8px; padding:8px 10px; cursor:grab; color:#e2e8f0; font-size:12.5px;
        }
        .observation-card.selected { border-color:#8b5cf6; box-shadow:0 0 0 2px rgba(139,92,246,.3); }
        .observation-card.dragging { opacity:.45; }

        .obs-table { width:100%; border-collapse:collapse; }
        .obs-table th, .obs-table td { border:1px solid rgba(255,255,255,.12); padding:8px; vertical-align:top; }
        .drop-zone-cell { min-height:44px; border:1px dashed rgba(148,163,184,.5); border-radius:8px; padding:6px; transition:.2s; }
        .drop-zone-cell.dragover { background: rgba(139,92,246,.12); border-color:#8b5cf6; }
        .drop-zone-cell.correct-drop { border:1px solid #10b981; background:rgba(16,185,129,.1); }

        .pill-matched { font-size:12px; color:#d1fae5; }

        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
        .shake-error { animation: shake .4s ease-in-out; border-color:#ef4444 !important; }
      `;
      document.head.appendChild(styleEl);
    }
  }

  window.exo16Page = new Exo16();
})();
