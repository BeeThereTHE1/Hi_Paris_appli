(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 17.');
        return;
    }
    class Exo17 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 17;
            this.currentStepIndex = -1;
            this.steps = [];
            this.initExercise();
        }

        async initExercise() {
            try {
                if (this.apiClient) {
                    var exoConfig = await this.apiClient.getExercise(this.exoId).catch(function () { return null; });
                    if (exoConfig && Array.isArray(exoConfig.steps)) {
                        this.steps = exoConfig.steps;
                    }
                    var userId = this.getCurrentUserIdentifier();
                    if (userId) {
                        var progress = await this.apiClient.getProgress(this.exoId, userId).catch(function () { return null; });
                        if (progress && Number.isInteger(progress.current_step)) {
                            this.currentStepIndex = progress.current_step;
                        }
                    }
                }
            } catch (error) {
                console.warn('Unable to initialize exercise 17.', error);
            }
            this.setupEventListeners();
        }

        setupEventListeners() {}

        async saveProgress(stepIndex, status, scoreDetails) {
            if (!this.apiClient) return false;
            var userId = this.getCurrentUserIdentifier();
            if (!userId) return false;
            try {
                await this.apiClient.saveProgress(this.exoId, userId, {
                    current_step: Number.isInteger(stepIndex) ? stepIndex : 0,
                    status: status || 'IN_PROGRESS',
                    score_details: scoreDetails && typeof scoreDetails === 'object' ? scoreDetails : {}
                });
                this.currentStepIndex = Number.isInteger(stepIndex) ? stepIndex : this.currentStepIndex;
                return true;
            } catch (error) {
                console.warn('Unable to save progress for exercise 17.', error);
                return false;
            }
        }
    }

    window.exo17Page = new Exo17();
})();

// Script Exercice 17
window.ExoCommonPage && window.ExoCommonPage.initProfileWidget({ showStats: false, historyLabel: 'My History', logoutLabel: 'Logout' });
(function () {

  // --- Sauvegarde et validation ---
  const btnSauvegarder = document.getElementById('btn-sauvegarder');
  const btnRealise = document.getElementById('btn-realise');

  if (btnSauvegarder) {
    btnSauvegarder.onclick = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) { window.location.href = 'Page-demo/register.html'; return; }
      const now = new Date().toLocaleDateString('fr-FR');
      const saved = saveToStorage('saved_exercises', { id: 17, date: now });
      if (saved) {
        btnSauvegarder.innerHTML = '✅ Saved !';
        btnSauvegarder.style.opacity = '0.7';
        btnSauvegarder.disabled = true;
      }
    };
  }

  if (btnRealise) {
    btnRealise.onclick = async () => {
      if (window.StorageService) {
        await window.StorageService.complete(17);
      }
      btnRealise.innerHTML = '✨ Validated !';
      btnRealise.disabled = true;
      setTimeout(() => { window.location.href = 'Page-demo/exercises.html'; }, 1000);
    };
  }

  function saveToStorage(key, exoData) {
    if (window.ExoCommonPage) {
      return window.ExoCommonPage.saveToStorage(key, exoData);
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.email) return false;
    const userKey = `${key}_${user.email}`;
    const list = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (!list.find(e => e.id === exoData.id)) {
      list.push(exoData);
      localStorage.setItem(userKey, JSON.stringify(list));
      return true;
    }
    return false;
  }

  // --- Scénario de lecture et guidage ---
  const btnNext = document.getElementById("btnNext");
  const readingOverlay = document.getElementById("readingOverlay");

  let readingTime = 2; // Règle : 2 secondes comme demandé par la consigne
  let timer = setInterval(() => {
    readingTime--;
    if (readingTime <= 0) {
      clearInterval(timer);
      btnNext.innerText = "Next";
      btnNext.style.opacity = "1";
      btnNext.style.pointerEvents = "auto";
    } else {
      btnNext.innerText = `Please read (${readingTime}s)`;
    }
  }, 1000);

  btnNext.onclick = () => {
    readingOverlay.style.display = "none";
    initActivity1();
  };

  // --- Données et structures pour l'Activity 1 (Observation du LR) ---
  const learningRates = [
    { value: "0.00001", expected: "convergence" },
    { value: "0.0001", expected: "convergence" },
    { value: "0.001", expected: "convergence" },
    { value: "0.003", expected: "convergence" },
    { value: "0.01", expected: "convergence" },
    { value: "0.03", expected: "convergence" },
    { value: "0.1", expected: "convergence" },
    { value: "0.3", expected: "convergence" },
    { value: "1", expected: "convergence" },
    { value: "3", expected: "convergence" },
    { value: "10", expected: "convergence" }
  ];

  let testedRates = {};
  let userAnswers = {};

  // Écouter les changements dans le simulateur (déblocage au run d'entraînement)
  window.addEventListener('message', (event) => {
    if (event.data.type === 'EXO17_STEP') {
      const rateVal = String(event.data.learningRate);
      const row = document.querySelector(`.rate-row[data-rate="${rateVal}"]`);
      if (row && row.classList.contains('rate-locked')) {
        // Débloquer cette ligne
        row.classList.remove('rate-locked');
        row.style.opacity = "1";
        const badge = row.querySelector('.rate-status-badge');
        if (badge) {
          badge.innerText = "⚡ Tested";
          badge.style.background = "rgba(16, 185, 129, 0.15)";
          badge.style.color = "#10b981";
          badge.style.borderColor = "rgba(16, 185, 129, 0.3)";
        }

        // Activer ses boutons
        row.querySelectorAll('.btn-choice').forEach(btn => btn.removeAttribute('disabled'));
        testedRates[rateVal] = true;
      }
    }
  });

  function initActivity1() {
    const qPanel = document.getElementById("quiz-question-panel");
    const fPanel = document.getElementById("quiz-feedback-panel");
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = "";
    qPanel.innerHTML = `
      <div class="quiz-question-wrapper">
        <div class="quiz-question-badge">Activity 1</div>
        <div class="quiz-question-card">
          Run the model for each learning rate and assess whether it converges or diverges. Use up to 3000 epochs if needed. Pause the model once you can determine the outcome, Remember to reset it before each new run!
        </div>
      </div>
      <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px; max-height: 380px; overflow-y: auto; padding-right: 5px;">
        ${learningRates.map(rate => `
          <div class="rate-row rate-locked" data-rate="${rate.value}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; opacity: 0.5; transition: all 0.2s;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="rate-value" style="font-family: 'Roboto Mono', monospace; font-size: 13.5px; font-weight: 700; color: #fff;">${rate.value.replace('.', ',')}</span>
              <span class="rate-status-badge" style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);">⏳ Not tested</span>
            </div>
            <div class="button-group" style="display: flex; gap: 6px;">
              <button class="btn-choice" disabled data-choice="convergence" style="font-size:11.5px; padding: 5px 12px;">Convergence</button>
              <button class="btn-choice" disabled data-choice="divergence" style="font-size:11.5px; padding: 5px 12px;">Divergence</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn-validate" id="btn-validate-testing" style="margin-top:15px; background: #FF034D;">Submit</button>
    `;

    // Ajout des styles manquants pour btn-choice
    if (!document.getElementById('exo17-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'exo17-custom-styles';
      style.innerHTML = `
        .btn-choice {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-choice:hover:not([disabled]) {
          background: rgba(255, 255, 255, 0.15);
        }
        .btn-choice.active-yes {
          background: #10b981 !important;
          border-color: #10b981 !important;
          color: white !important;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
        }
        .btn-choice.active-no {
          background: #ef4444 !important;
          border-color: #ef4444 !important;
          color: white !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
        }
        .btn-choice[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
      document.head.appendChild(style);
    }

    // Événements sur les choix de l'Activity 1
    learningRates.forEach(rate => {
      const row = qPanel.querySelector(`.rate-row[data-rate="${rate.value}"]`);
      if (!row) return;
      const convBtn = row.querySelector('.btn-choice[data-choice="convergence"]');
      const divBtn = row.querySelector('.btn-choice[data-choice="divergence"]');

      convBtn.onclick = (e) => {
        e.stopPropagation();
        userAnswers[rate.value] = 'convergence';
        if (rate.expected === 'convergence') {
          convBtn.classList.add('active-yes');
          convBtn.classList.remove('active-no');
        } else {
          convBtn.classList.add('active-no');
          convBtn.classList.remove('active-yes');
        }
        divBtn.classList.remove('active-yes', 'active-no');
      };

      divBtn.onclick = (e) => {
        e.stopPropagation();
        userAnswers[rate.value] = 'divergence';
        if (rate.expected === 'divergence') {
          divBtn.classList.add('active-yes');
          divBtn.classList.remove('active-no');
        } else {
          divBtn.classList.add('active-no');
          divBtn.classList.remove('active-yes');
        }
        convBtn.classList.remove('active-yes', 'active-no');
      };
    });

    // Indication de déblocage au clic sur une ligne bloquée
    qPanel.querySelectorAll('.rate-row').forEach(row => {
      row.onclick = () => {
        if (row.classList.contains('rate-locked')) {
          fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
              Please first modify and test the value <strong>${row.getAttribute('data-rate')}</strong> in the Learning Rate selector of the simulator.
            </div>
          `;
        }
      };
    });

    const validateBtn = document.getElementById('btn-validate-testing');
    validateBtn.onclick = () => {
      let allTested = true;
      let untestedCount = 0;
      learningRates.forEach(rate => {
        if (!testedRates[rate.value]) {
          allTested = false;
          untestedCount++;
        }
      });

      if (!allTested) {
        fPanel.innerHTML = `
          <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
            There are <strong>${untestedCount}</strong> learning rate value(s) left to test in the simulator before validating.
          </div>
        `;
        return;
      }

      let allCorrect = true;
      let incorrectCount = 0;
      learningRates.forEach(rate => {
        if (userAnswers[rate.value] !== rate.expected) {
          allCorrect = false;
          incorrectCount++;
        }
      });

      if (!allCorrect) {
        fPanel.innerHTML = `
          <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
            You have <strong>${incorrectCount}</strong> incorrect response(s). Observe the loss curve carefully: if it stabilizes downward, the model has converged.
          </div>
        `;
        return;
      }

      // Succès Activity 1 -> Passer à l'Activity 2 (Drag & Drop)
      fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
          ✨ Congratulations! All learning rate behaviors are correct. Moving to the next step...
        </div>
      `;
      setTimeout(() => {
        initActivity2();
      }, 1500);
    };
  }

  // --- Drag & Drop de l'Activity 2 ---
  const dragCards = [
    {
      id: "c17-1",
      text: "A separable dataset allows logistic regression to converge even with relatively large learning rates.",
      correct: "true",
      feedback: "✅ Correct. On separable data, logistic regression can remain stable even with relatively high learning rates."
    },
    {
      id: "c17-2",
      text: "The loss in logistic regression on separable data remains well-behaved, which prevents divergence for a wide range of learning rates.",
      correct: "true",
      feedback: "✅ Correct. The loss is well-conditioned in this setting, which helps the model stay stable across many learning rates."
    },
    {
      id: "c17-3",
      text: "A high learning rate always causes divergence, even for simple models like logistic regression.",
      correct: "false",
      feedback: "❌ Incorrect. A high learning rate does not always cause divergence. In simple cases like logistic regression on separable data, the model can still converge."
    }
  ];

  const incorrectFeedbackFallback = {
    "c17-1": "❌ Incorrect. In this exercise, the model can still converge with large learning rates because the dataset is separable and the optimization is well-behaved.",
    "c17-2": "❌ Incorrect. In this exercise, the loss landscape remains stable enough to avoid divergence for many learning rates.",
    "c17-3": "✅ Correct. A high learning rate can cause divergence in some cases, but not always. In this exercise, logistic regression on separable data can tolerate high values without diverging."
  };

  let sortedStates = {};

  function initActivity2() {
    const qPanel = document.getElementById("quiz-question-panel");
    const fPanel = document.getElementById("quiz-feedback-panel");
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = "";
    qPanel.innerHTML = `
      <div class="dragdrop-container" style="background: rgba(11, 15, 26, 0.4); border: 1.5px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 12px;">
        <div class="dragdrop-header" style="margin-bottom: 15px;">
          <span class="dragdrop-badge" style="background: #FF034D; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px;">Activity 2</span>
          <h2 style="font-size: 16px; margin: 8px 0 4px; color: #fff;">Drag and drop statements</h2>
          <h3 style="font-size: 12px; margin: 0; color: #94a3b8; font-weight: 500;">True or False?</h3>
        </div>
        
        <div class="dragdrop-cards-area" id="cards-source" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px; min-height: 80px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1);">
          ${dragCards.map(c => `
            <div class="drag-card" draggable="true" id="${c.id}" style="padding: 10px; background: #004676; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff; cursor: grab; font-size: 12.5px; line-height: 1.45;">
              ${c.text}
            </div>
          `).join('')}
        </div>
        
        <div class="dragdrop-zones-container" style="display: flex; gap: 15px; margin-bottom: 15px;">
          <div class="drop-zone" id="zone-true" data-expected="true" style="flex: 1; min-height: 120px; background: rgba(16, 185, 129, 0.04); border: 2px dashed rgba(16, 185, 129, 0.2); border-radius: 8px; padding: 10px;">
            <h4 style="margin: 0 0 10px; font-size: 13px; color: #10b981; text-align: center;">True</h4>
            <div class="zone-cards" style="display:flex; flex-direction:column; gap:8px;"></div>
          </div>
          <div class="drop-zone" id="zone-false" data-expected="false" style="flex: 1; min-height: 120px; background: rgba(239, 68, 68, 0.04); border: 2px dashed rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 10px;">
            <h4 style="margin: 0 0 10px; font-size: 13px; color: #ef4444; text-align: center;">False</h4>
            <div class="zone-cards" style="display:flex; flex-direction:column; gap:8px;"></div>
          </div>
        </div>
      </div>
    `;

    // Configurer les écouteurs Drag & Drop
    const cards = qPanel.querySelectorAll(".drag-card");
    const zones = qPanel.querySelectorAll(".drop-zone");

    let draggedCard = null;

    cards.forEach(card => {
      card.addEventListener("dragstart", (e) => {
        draggedCard = card;
        card.style.opacity = "0.5";
      });

      card.addEventListener("dragend", () => {
        card.style.opacity = "1";
        draggedCard = null;
      });
    });

    zones.forEach(zone => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!draggedCard) return;

        const cardId = draggedCard.id;
        const targetZoneState = zone.getAttribute("data-expected");
        const cardData = dragCards.find(c => c.id === cardId);
        const isCorrect = cardData.correct === targetZoneState;

        // Déplacer visuellement la carte dans la zone
        zone.querySelector(".zone-cards").appendChild(draggedCard);

        if (isCorrect) {
          draggedCard.setAttribute("draggable", "false");
          draggedCard.style.cursor = "default";
          draggedCard.style.borderColor = "#10b981";
          draggedCard.style.background = "rgba(16, 185, 129, 0.2)";
          sortedStates[cardId] = true;

          fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
              ${cardData.feedback}
            </div>
          `;
        } else {
          // Erreur -> Secouer la carte et retour au point de départ
          draggedCard.style.borderColor = "#ef4444";
          draggedCard.style.background = "rgba(239, 68, 68, 0.2)";
          
          fPanel.innerHTML = `
            <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
              ${incorrectFeedbackFallback[cardId]}
            </div>
          `;
          
          setTimeout(() => {
            document.getElementById("cards-source").appendChild(draggedCard);
            draggedCard.style.borderColor = "rgba(255,255,255,0.15)";
            draggedCard.style.background = "#004676";
          }, 1500);
        }

        // Vérifier si toutes les cartes sont triées correctement
        const allSorted = dragCards.every(c => sortedStates[c.id]);
        if (allSorted) {
          showFinalConclusion();
        }
      });
    });
  }

  function showFinalConclusion() {
    const qPanel = document.getElementById("quiz-question-panel");
    const fPanel = document.getElementById("quiz-feedback-panel");
    if (!qPanel || !fPanel) return;

    qPanel.innerHTML = `
      <div class="quiz-question-wrapper">
        <div class="quiz-question-badge">General conclusion</div>
        <div class="quiz-question-card" style="font-size: 13.5px; line-height: 1.6; text-align: left; background: #003052;">
          The learning rate impacts the stability of training: if it is too high, it can cause divergence due to large and unstable updates, while lower values promote stable convergence. However, this effect depends on the model and the data: simple models like logistic regression on separable datasets can tolerate much higher learning rates without diverging, unlike more complex neural networks.
        </div>
      </div>
      <button class="btn-validate" id="btn-finish-quiz" style="margin-top: 15px; background: #FF034D;">OK</button>
    `;
    fPanel.innerHTML = "";

    document.getElementById("btn-finish-quiz").onclick = () => {
      // Activer le bouton de validation du layout de page
      if (btnRealise) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '✨ Submit the exercise';
      }

      qPanel.innerHTML = `
        <div class="quiz-question-wrapper">
          <div class="quiz-question-badge">Good job!</div>
          <div class="quiz-question-card">
            Good job! Let’s get to the next exercise. Click the validation button in the footer to complete this exercise.
          </div>
        </div>
      `;
    };
  }

})();
