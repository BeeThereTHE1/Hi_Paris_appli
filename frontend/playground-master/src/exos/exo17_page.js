// Script Exercice 17
(function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const container = document.getElementById('widget-profil-header');
  if (container) {
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !currentUser) {
      const visitorBtn = document.createElement('a');
      visitorBtn.href = 'Page-demo/register.html';
      visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
      visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span>';
      container.appendChild(visitorBtn);
    } else {
      const initiales = (currentUser.prenom ? currentUser.prenom[0] : '') + (currentUser.nom ? currentUser.nom[0] : '');
      const avatar = document.createElement('div');
      avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); transition: 0.3s;';
      avatar.innerText = initiales.toUpperCase();
      const menu = document.createElement('div');
      menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
      const p = currentUser.profil || currentUser.profile || currentUser.role || 'étudiant';
      const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
      menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 17px; font-weight: 800; color: #fff;">${currentUser.prenom || ''} ${currentUser.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${currentUser.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📊 Mon Historique</a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;">🚪 Logout</div>
        </div>
      `;
      let isOpen = false;
      avatar.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
          menu.style.display = 'block'; setTimeout(() => { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        } else {
          menu.style.opacity = '0'; menu.style.transform = 'scale(0.9) translateY(-10px)'; setTimeout(() => menu.style.display = 'none', 300);
        }
      };
      menu.querySelector('#btnFuturLogout').onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
      container.appendChild(avatar); container.appendChild(menu);
    }
  }

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
        btnSauvegarder.innerHTML = '✅ Sauvegardé !';
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
      btnNext.innerText = `Veuillez lire (${readingTime}s)`;
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
          badge.innerText = "⚡ Testé";
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
              <span class="rate-status-badge" style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);">⏳ Non testé</span>
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
              Veuillez d'abord modifier et tester la valeur <strong>${row.getAttribute('data-rate')}</strong> dans le sélecteur Learning Rate du simulateur.
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
            Il reste <strong>${untestedCount}</strong> valeur(s) de learning rate à tester dans le simulateur avant de valider.
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
            Vous avez <strong>${incorrectCount}</strong> réponse(s) incorrecte(s). Observez bien la trajectoire de la perte (Loss) dans le graphe : si elle stagne vers le bas, il y a convergence.
          </div>
        `;
        return;
      }

      // Succès Activity 1 -> Passer à l'Activity 2 (Drag & Drop)
      fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
          ✨ Congratulations ! Tous les comportements de taux d'apprentissage sont corrects. Passage à l'étape suivante...
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
        btnRealise.innerHTML = '✨ Submit l\'exercice';
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
