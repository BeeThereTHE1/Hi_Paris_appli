(function () {
  let activeQuizAnswers = {
    q1: null,
    q2: null,
    q3: null,
    q4: null
  };

  const correctAnswers = {
    q1: 'yes', // In one model, the weights keep increasing
    q2: 'yes', // One model shows a constant training loss
    q3: 'yes', // One model shows a decreasing training loss
    q4: 'no'   // Both models achieve stable parameter values
  };

  const questionTexts = {
    q1: "In one model, the weights keep increasing",
    q2: "One model shows a constant training loss",
    q3: "One model shows a decreasing training loss",
    q4: "Both models achieve stable parameter values"
  };

  function initQuiz() {
    // --- Étape 1 : Overlay de lecture obligatoire ---
    const btnNext = document.getElementById("btnNext");
    let readingTime = 2; // Règle : environ 2s comme demandé dans exo9_10.md
    
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
      document.getElementById("readingOverlay").style.display = "none";
      showIntroGuide();
    };
  }

  // --- Étape 2 : Passage en revue interactive definitions/guides ---
  const introSteps = [
    {
      text: "First, let’s review the key features you’ll require for this exercise",
      targetId: "main-part"
    },
    {
      text: "Move the cursor and observe the effect on the dataset",
      targetId: "iframe-model1"
    },
    {
      text: "The training loss measures how well the model fits the training dataset. It represents the difference between the model’s predictions and the true values during training.",
      targetId: "iframe-model1"
    },
    {
      text: "Noise is random variation added to the data that makes patterns less separable, more overlapping.",
      targetId: "iframe-model2"
    },
    {
      text: "Now, run the models twice with noise set at 5 and 50, for up to 3,000 epochs, and compare their training behavior.",
      targetId: "iframe-model1"
    }
  ];

  let currentIntroStep = 0;

  function showIntroGuide() {
    if (currentIntroStep >= introSteps.length) {
      renderActivity1();
      return;
    }

    const step = introSteps[currentIntroStep];
    
    // Highlight target element
    const targetEl = document.getElementById(step.targetId);
    if (targetEl) {
      targetEl.style.outline = "3px solid #FF034D";
      targetEl.style.boxShadow = "0 0 20px rgba(255, 3, 77, 0.6)";
    }

    const quizDiv1 = document.querySelector(".quiz-div-1");
    quizDiv1.innerHTML = `
      <div class="quiz-question-wrapper">
        <div class="quiz-question-badge">Introduction</div>
        <div class="quiz-question-card" style="font-size: 14px; text-align: left; background: #003052; color: #fff; border-left: 4px solid #FF034D;">
          ${step.text}
        </div>
      </div>
      <button id="btn-guide-next" class="feedback-next-btn" style="width: 100%; margin-top: 15px; background: #FF034D;">OK</button>
    `;

    document.getElementById("btn-guide-next").onclick = () => {
      // Clear highlight
      if (targetEl) {
        targetEl.style.outline = "none";
        targetEl.style.boxShadow = "none";
      }
      currentIntroStep++;
      showIntroGuide();
    };
  }

  // --- Étape 3 : Activité 1 - Questionnaire Observation ---
  function renderActivity1() {
    const quizDiv1 = document.querySelector(".quiz-div-1");
    const quizDiv2 = document.querySelector(".quiz-div-2");
    quizDiv2.innerHTML = "";

    quizDiv1.innerHTML = `
      <div style="margin-bottom: 15px; font-weight: 700; color: #FF034D; text-transform: uppercase; font-size: 13px;">Activity 1 - Observation</div>
      <div class="quiz-question-card" style="font-size: 13px; text-align: left; margin-bottom: 20px; line-height: 1.4;">
        Run the model twice: first with the noise set to 5, and then with the noise set to 50. What differences do you observe?
      </div>
      <div style="display: flex; flex-direction: column; gap: 15px;">
        ${Object.keys(questionTexts).map(key => `
          <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">
            <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600;">${questionTexts[key]}</p>
            <div style="display: flex; gap: 10px;">
              <button class="btn-obs-yes-no option-yes" data-q="${key}" data-val="yes" style="flex: 1; padding: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer; border-radius: 6px; font-weight: 600;">Yes</button>
              <button class="btn-obs-yes-no option-no" data-q="${key}" data-val="no" style="flex: 1; padding: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer; border-radius: 6px; font-weight: 600;">No</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button id="btn-validate-obs" class="btn-validate" style="display: block; width: 100%; margin-top: 20px; background: #8b5cf6; border: none; color: white; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; text-transform: uppercase;">Submit</button>
    `;

    // Attacher les events Yes/No
    document.querySelectorAll(".btn-obs-yes-no").forEach(btn => {
      btn.onclick = () => {
        const q = btn.getAttribute("data-q");
        const val = btn.getAttribute("data-val");
        activeQuizAnswers[q] = val;

        // Toggle selected state styles
        btn.parentNode.querySelectorAll(".btn-obs-yes-no").forEach(b => {
          b.style.background = "rgba(255,255,255,0.05)";
          b.style.borderColor = "rgba(255,255,255,0.1)";
        });
        btn.style.background = "#FF034D";
        btn.style.borderColor = "#FF034D";
      };
    });

    document.getElementById("btn-validate-obs").onclick = () => {
      // Vérifier si toutes les questions received une réponse
      if (Object.values(activeQuizAnswers).some(val => val === null)) {
        alert("Please answer all statements d'observation.");
        return;
      }

      // Submit the answers
      let allCorrect = true;
      Object.keys(correctAnswers).forEach(key => {
        if (activeQuizAnswers[key] !== correctAnswers[key]) {
          allCorrect = false;
        }
      });

      if (allCorrect) {
        quizDiv2.innerHTML = `
          <div class="feedback-box" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
            <strong>Correct!</strong><br>
            What conclusions can be drawn from these observations?
            <button id="btn-start-dd" class="btn-validate" style="display: block; width: 100%; margin-top: 10px; background: #10b981; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;">Activité Suivante (Drag & Drop) →</button>
          </div>
        `;
        document.getElementById("btn-start-dd").onclick = () => {
          showDragDropActivity();
        };
      } else {
        quizDiv2.innerHTML = `
          <div class="feedback-box" style="border-left: 4px solid #FF034D; background: rgba(255, 3, 77, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
            <strong>Not quite!</strong><br>
            Please run the models again and make sure to look at weight stabilization and training loss behavior.
          </div>
        `;
      }
    };
  }

  // --- Étape 4 : Activité 2 - Drag & Drop ---
  const statements = [
    { id: 1, text: "The model converges toward a unique optimal solution", category: "high" },
    { id: 2, text: "The weights stabilize around an equilibrium value", category: "high" },
    { id: 3, text: "There is a reachable global minimum error toward which the model can move", category: "high" },
    { id: 4, text: "The model eventually stabilizes around an optimal solution, which corresponds to convergence.", category: "high" },
    { id: 5, text: "The error remains constant, preventing the model from improving.", category: "low" },
    { id: 6, text: "The presence of multiple equivalent minima leads to unstable optimization", category: "low" },
    { id: 7, text: "The absence of error variation prevents convergence", category: "low" },
    { id: 8, text: "The weights increase without stabilizing due to repeated updates", category: "low" }
  ];

  function showDragDropActivity() {
    // Griser l'exercice de fond
    const simulator = document.querySelector(".simulator-container");
    if (simulator) {
      simulator.style.opacity = "0.15";
      simulator.style.pointerEvents = "none";
    }

    const mainPart = document.getElementById("main-part");
    const ddOverlay = document.createElement("div");
    ddOverlay.className = "dragdrop-overlay show";
    ddOverlay.id = "ddOverlayContainer";

    // Mélanger les statements
    const shuffled = statements.slice().sort(() => Math.random() - 0.5);

    ddOverlay.innerHTML = `
      <div class="dragdrop-container" style="background: #0b0f1a; border: 2px solid #FF034D; border-radius: 20px; padding: 30px; width: 90%; max-width: 850px; color: #ffffff; box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7); position: relative; z-index: 5000; margin: 40px auto; max-height: 85vh; overflow-y: auto;">
        <div class="dragdrop-header" style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #FF034D; text-transform: uppercase; font-size: 20px; font-weight: 800; margin: 0 0 10px 0;">Activity 2 – Drag and drop</h2>
          <p style="font-size: 13.5px; color: #94a3b8; margin: 0;">Faites glisser les affirmations ci-dessous dans la bonne catégorie. Le dépôt n'est possible que dans la bonne case.</p>
        </div>

        <!-- Zone des Statements en haut -->
        <div class="dragdrop-cards-area" id="cards-source" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; min-height: 120px; padding: 15px; border: 1.5px dashed rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 25px; background: rgba(255,255,255,0.01);">
          ${shuffled.map(s => `
            <div class="drag-card" draggable="true" id="dd-card-${s.id}" data-category="${s.category}" style="background: rgba(0, 70, 118, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 14px; font-size: 12px; color: #ffffff; cursor: grab; user-select: none; max-width: 320px; line-height: 1.4;">
              ${s.text}
            </div>
          `).join('')}
        </div>

        <!-- Zones de dépôt en bas, côte à côte -->
        <div class="dragdrop-zones-container" style="display: flex; gap: 20px; justify-content: space-between;">
          
          <!-- Catégorie 1 : Low Noise / Divergent Model -->
          <div class="drop-zone" id="zone-low" data-expected="low" style="flex: 1; border: 2px dashed rgba(255, 3, 77, 0.4); border-radius: 12px; padding: 20px; background: rgba(255, 3, 77, 0.02); min-height: 250px; display: flex; flex-direction: column; transition: all 0.3s;">
            <h4 style="color: #FF034D; font-size: 14px; font-weight: 800; text-transform: uppercase; margin: 0 0 15px 0; text-align: center; border-bottom: 1.5px solid rgba(255, 3, 77, 0.2); padding-bottom: 10px;">Low noise / divergent model</h4>
            <div class="zone-cards" style="display: flex; flex-direction: column; gap: 10px; flex-grow: 1;"></div>
          </div>

          <!-- Catégorie 2 : High Noise / Convergent Model -->
          <div class="drop-zone" id="zone-high" data-expected="high" style="flex: 1; border: 2px dashed rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 20px; background: rgba(16, 185, 129, 0.02); min-height: 250px; display: flex; flex-direction: column; transition: all 0.3s;">
            <h4 style="color: #10b981; font-size: 14px; font-weight: 800; text-transform: uppercase; margin: 0 0 15px 0; text-align: center; border-bottom: 1.5px solid rgba(16, 185, 129, 0.2); padding-bottom: 10px;">High noise / convergent model</h4>
            <div class="zone-cards" style="display: flex; flex-direction: column; gap: 10px; flex-grow: 1;"></div>
          </div>

        </div>

        <!-- Success overlay modal elements inside container -->
        <div id="dd-success-banner" style="display: none; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 12px; padding: 15px; margin-top: 25px; text-align: center;">
          <h3 style="color: #10b981; font-size: 16px; font-weight: 800; margin: 0 0 10px 0;">🎉 BRAVO ! Tri des affirmations complété !</h3>
          <p style="font-size: 13px; line-height: 1.5; color: #e2e8f0; margin: 0 0 15px 0;">
            When the error remains constant, the model applies the same correction at every step, causing the weights to grow continuously. Divergence occurs.
            With High noise, weights slow down and stabilize instead of increasing continuously, yielding convergence.
          </p>
          <button id="btn-finish-dd" class="btn-validate" style="background: #10b981; border: none; color: white; padding: 10px 30px; font-weight: 700; border-radius: 6px; cursor: pointer; text-transform: uppercase;">Terminer l'Exercice</button>
        </div>
      </div>
    `;

    mainPart.appendChild(ddOverlay);

    // Setup drag and drop events
    let draggedCard = null;
    const cards = ddOverlay.querySelectorAll(".drag-card");
    const zones = ddOverlay.querySelectorAll(".drop-zone");

    cards.forEach(card => {
      card.addEventListener("dragstart", () => {
        draggedCard = card;
        card.style.opacity = "0.5";
      });

      card.addEventListener("dragend", () => {
        card.style.opacity = "1";
        draggedCard = null;
      });
    });

    zones.forEach(zone => {
      const zoneCards = zone.querySelector(".zone-cards");
      const expected = zone.getAttribute("data-expected");

      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.style.background = expected === "low" ? "rgba(255, 3, 77, 0.1)" : "rgba(16, 185, 129, 0.1)";
      });

      zone.addEventListener("dragleave", () => {
        zone.style.background = expected === "low" ? "rgba(255, 3, 77, 0.02)" : "rgba(16, 185, 129, 0.02)";
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.style.background = expected === "low" ? "rgba(255, 3, 77, 0.02)" : "rgba(16, 185, 129, 0.02)";

        if (draggedCard) {
          const category = draggedCard.getAttribute("data-category");
          if (category === expected) {
            // Correct placement
            zoneCards.appendChild(draggedCard);
            draggedCard.style.cursor = "default";
            draggedCard.setAttribute("draggable", "false");
            draggedCard.style.background = expected === "low" ? "rgba(255, 3, 77, 0.2)" : "rgba(16, 185, 129, 0.2)";
            draggedCard.style.borderColor = expected === "low" ? "#FF034D" : "#10b981";

            // Check if D&D is finished
            const sourcePool = document.getElementById("cards-source");
            if (sourcePool.children.length === 0) {
              document.getElementById("dd-success-banner").style.display = "block";
              document.getElementById("btn-finish-dd").onclick = () => {
                finishFullExercise();
              };
            }
          } else {
            // Shake card or visual cue for incorrect drop (drop rejected)
            draggedCard.animate([
              { transform: 'translateX(0px)' },
              { transform: 'translateX(-6px)' },
              { transform: 'translateX(6px)' },
              { transform: 'translateX(0px)' }
            ], { duration: 300 });
          }
        }
      });
    });
  }

  // --- Étape 5 : Clôture & Enregistrement de la progression ---
  function finishFullExercise() {
    // Retirer l'overlay D&D
    const overlay = document.getElementById("ddOverlayContainer");
    if (overlay) overlay.remove();

    // Rétablir la visibilité du simulateur
    const simulator = document.querySelector(".simulator-container");
    if (simulator) {
      simulator.style.opacity = "1";
      simulator.style.pointerEvents = "auto";
    }

    // Activer l'état de complétion et faire clignoter le bouton réalisé
    const btnRealise = document.getElementById("btn-realise");
    if (btnRealise) {
      btnRealise.disabled = false;
      btnRealise.classList.remove("btn-disabled");
      btnRealise.classList.add("btn-success-ready");
      btnRealise.innerHTML = '✨ Finish and Save !';
      btnRealise.onclick = async () => {
        // Enregistrer la progression via StorageService
        if (window.StorageService) {
          await window.StorageService.complete(9);
        }
        // Clignoter le bouton Accueil dans exercises.html (retour auto)
        window.location.href = "../Page-demo/exercises.html";
      };
    }
  }

  // Initialisation au chargement
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuiz);
  } else {
    initQuiz();
  }
})();
