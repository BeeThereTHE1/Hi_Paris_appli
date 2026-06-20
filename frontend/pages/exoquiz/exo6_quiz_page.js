// Exercice 6 Quiz page logic
window.__currentQuizExoId = 6;
let translations = null;

async function loadTranslations() {
  try {
    const response = await fetch('../texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_6;

    if (translations) {
      if (translations.title) {
        document.title = translations.title;
        const titleEl = document.querySelector('.exo-title');
        if (titleEl) titleEl.innerText = translations.title;
      }
    }
  } catch (error) {
    console.warn("Could not load translations from JSON, using fallbacks.", error);
  }
}

function initQuiz() {
  const mainPart = document.getElementById("main-part");
  if (!mainPart) return;

  // Render the Drag & Drop interface directly on the quiz panel
  const quizDiv1 = document.getElementById("quiz-question-panel");
  const quizDiv2 = document.getElementById("quiz-feedback-panel");
  if (quizDiv1) quizDiv1.style.display = "none";
  if (quizDiv2) quizDiv2.style.display = "none";

  // Create centered Drag & Drop Quiz overlay
  let ddOverlay = document.querySelector(".dragdrop-overlay");
  if (ddOverlay) ddOverlay.remove();

  ddOverlay = document.createElement("div");
  ddOverlay.className = "dragdrop-overlay";

  // Statements list loaded from texte.json or fallbacks
  let statementsData = [];
  if (translations && translations.quiz && translations.quiz.statements) {
    statementsData = translations.quiz.statements;
  } else {
    statementsData = [
      { id: 1, statement: "a hidden neuron creates an intermediate feature, not a final decision", answer: true, feedback: "A hidden neuron produces a new feature from the input data." },
      { id: 2, statement: "The final prediction is computed directly from x₁ and x₂ in all models", answer: false, feedback: "In models with hidden layers, predictions are based on learned features." },
      { id: 3, statement: "A hidden layer allows the network to learn intermediate features.", answer: true, feedback: "hidden layers are where new representations are learned." },
      { id: 4, statement: "Each neuron in a hidden layer learns the same feature.", answer: false, feedback: "different neurons learn different features." },
      { id: 5, statement: "The output of the network combines the features learned by the hidden layer.", answer: true, feedback: "the output uses learned features, not raw inputs." },
      { id: 6, statement: "Adding a hidden layer changes the network from one equation ŷ = f(x₁, x₂) to a composition of equations ŷ = g(f₁(x₁, x₂), ..., f₄(x₁, x₂))", answer: true, feedback: "hidden layers turn the model into a composition of functions, applying activation functions to each step." },
      { id: 7, statement: "Feature learning means manually choosing the right input variables", answer: false, feedback: "feature learning is automatic, not manual." },
      { id: 8, statement: "Feature learning means that a neural network automatically creates new intermediate features from the input data, instead of relying only on the original inputs defined by the user.", answer: true, feedback: "without hidden layers, the model uses a single representation." }
    ];
  }

  // Generate cards
  let cardsHtml = statementsData.map(stmt => `
    <div class="drag-card" draggable="true" id="card-${stmt.id}" data-answer="${stmt.answer}">${stmt.statement}</div>
  `).join("");

  ddOverlay.innerHTML = `
    <div class="dragdrop-container" style="margin: 20px; max-width: 650px;">
      <div class="dragdrop-header">
        <span class="dragdrop-badge">Quiz 6</span>
        <h2>Drag & Drop Statements</h2>
        <h3>Vrai ou Faux ?</h3>
      </div>
      
      <div class="dragdrop-cards-area" id="cards-source" style="max-height: 250px; overflow-y: auto;">
        ${cardsHtml}
      </div>
      
      <div class="dragdrop-zones-container">
        <div class="drop-zone" id="zone-true" data-expected="true">
          <h4>Vrai</h4>
          <div class="zone-cards"></div>
        </div>
        <div class="drop-zone" id="zone-false" data-expected="false">
          <h4>Faux</h4>
          <div class="zone-cards"></div>
        </div>
      </div>
      
      <div class="dragdrop-success-msg" style="display: none;">
        <h4>🎉 Félicitations ! Toutes les affirmations ont été triées correctement.</h4>
        <button class="dragdrop-close-btn">Terminer le Quiz</button>
      </div>
    </div>
  `;

  mainPart.appendChild(ddOverlay);

  // Fade in overlay
  setTimeout(() => {
    ddOverlay.classList.add("show");
  }, 10);

  const cards = ddOverlay.querySelectorAll(".drag-card");
  const zones = ddOverlay.querySelectorAll(".drop-zone");
  const successMsg = ddOverlay.querySelector(".dragdrop-success-msg");
  const closeBtn = ddOverlay.querySelector(".dragdrop-close-btn");

  let draggedCard = null;

  cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      draggedCard = card;
      card.classList.add("dragging");
      if (e.dataTransfer) {
        e.dataTransfer.setData("text/plain", card.id);
      }
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      draggedCard = null;
    });
  });

  // Function to show drop bubble feedback overlaying the card's explanation
  function showDropFeedback(cardId, cardText, isCorrect, onClose) {
    document.querySelectorAll(".dd-feedback-overlay").forEach(el => el.remove());
    document.querySelectorAll(".dd-feedback-bubble").forEach(el => el.remove());

    const feedbackOverlay = document.createElement("div");
    feedbackOverlay.className = "dd-feedback-overlay";

    const bubble = document.createElement("div");
    bubble.className = `dd-feedback-bubble ${isCorrect ? 'correct' : 'incorrect'}`;

    // Get explanation from statementsData
    const stmtObj = statementsData.find(s => `card-${s.id}` === cardId);
    const explanation = stmtObj ? stmtObj.feedback : "";

    bubble.innerHTML = `
      <div class="dd-feedback-status">
        ${isCorrect ? '✔ Correct !' : '✖ Incorrect'}
      </div>
      <div class="dd-feedback-statement">
        "${cardText}"
      </div>
      <div class="dd-feedback-explanation">
        ${explanation}
      </div>
      <div class="dd-feedback-click-tip">
        Cliquez n'importe où pour continuer
      </div>
    `;

    feedbackOverlay.appendChild(bubble);
    document.body.appendChild(feedbackOverlay);

    // Fade in
    setTimeout(() => {
      feedbackOverlay.classList.add("show");
      bubble.classList.add("show");
    }, 10);

    const closeFeedback = () => {
      feedbackOverlay.classList.remove("show");
      bubble.classList.remove("show");
      setTimeout(() => {
        feedbackOverlay.remove();
        document.removeEventListener("click", closeFeedback);
        if (onClose) onClose();
      }, 300);
    };

    setTimeout(() => {
      document.addEventListener("click", closeFeedback);
    }, 100);
  }

  zones.forEach(zone => {
    const zoneCards = zone.querySelector(".zone-cards");

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("hovered");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("hovered");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("hovered");
      
      const cardId = e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
      const cardElement = draggedCard || document.getElementById(cardId);
      
      if (cardElement) {
        const expected = zone.getAttribute("data-expected");
        const cardAnswer = cardElement.getAttribute("data-answer");
        const isCorrect = (cardAnswer === expected);

        // Temporarily append to zone
        zoneCards.appendChild(cardElement);

        showDropFeedback(cardElement.id, cardElement.textContent, isCorrect, () => {
          if (isCorrect) {
            // Disable dragging for successfully placed card
            cardElement.setAttribute("draggable", "false");
            cardElement.style.cursor = "default";
            checkQuizCompletion();
          } else {
            // Shake card and return to source area
            cardElement.classList.add("shake-error");
            setTimeout(() => {
              cardElement.classList.remove("shake-error");
              const sourceArea = ddOverlay.querySelector("#cards-source");
              sourceArea.appendChild(cardElement);
            }, 600);
          }
        });
      }
    });
  });

  function checkQuizCompletion() {
    const sourceArea = ddOverlay.querySelector("#cards-source");
    const remainingCards = sourceArea.querySelectorAll(".drag-card");

    if (remainingCards.length === 0) {
      successMsg.style.display = "block";
    }
  }

  closeBtn.addEventListener("click", async () => {
    ddOverlay.classList.remove("show");
    setTimeout(async () => {
      ddOverlay.remove();
      
      // Save completed status via StorageService
      if (window.StorageService) {
        await window.StorageService.complete(6);
        console.log("✅ Exercice 6 marqué COMPLETED.");
      }

      // Redirect back with completed parameter to trigger inactivite.js completion overlays
      window.location.href = `../exo6.html?completed=true`;
    }, 400);
  });
}

// Safely execute initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadTranslations().then(initQuiz);
  });
} else {
  loadTranslations().then(initQuiz);
}
