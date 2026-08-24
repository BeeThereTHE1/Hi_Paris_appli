// Quiz 11 Page Logic
window.__currentQuizExoId = 11;
let translations = null;

// Inject styles for Activity 1 choices
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .btn-choice {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      padding: 6px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
      min-width: 70px;
      text-align: center;
    }
    .btn-choice:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
    }
    .btn-choice:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
    .rate-row.rate-locked {
      opacity: 0.5;
    }
    .btn-validate {
      display: block;
      width: 100%;
      margin-top: 20px;
      background: #8b5cf6;
      border: none;
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-validate:hover:not(:disabled) {
      background: #7c3aed;
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
    }
    .btn-validate:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .feedback-box {
      background: rgba(255, 255, 255, 0.05);
      border-left: 4px solid #8b5cf6;
      padding: 12px;
      border-radius: 4px;
      font-size: 13.5px;
      color: #e2e8f0;
      line-height: 1.4;
      margin-top: 10px;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();


async function loadTranslations() {
  try {
    const response = await fetch('../texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_11;
  } catch (error) {
    console.warn("Could not load translations from JSON, using fallback/default texts.", error);
  }
}

// Learning rates to test
const learningRates = [
  { value: "0.00001", expected: "convergence" },
  { value: "0.0001", expected: "convergence" },
  { value: "0.001", expected: "convergence" },
  { value: "0.003", expected: "convergence" },
  { value: "0.01", expected: "convergence" },
  { value: "0.03", expected: "convergence" },
  { value: "0.1", expected: "convergence" },
  { value: "0.3", expected: "convergence" },
  { value: "1", expected: "divergence" },
  { value: "3", expected: "divergence" },
  { value: "10", expected: "divergence" }
];

// Tracking state
let testedRates = {};
learningRates.forEach(rate => {
  testedRates[rate.value] = false;
});

let userAnswers = {};
learningRates.forEach(rate => {
  userAnswers[rate.value] = null;
});

// Setup postMessage listener from iframe simulator
window.addEventListener('message', (event) => {
  if (event.data.type === 'EXO11_STEP') {
    const { learningRate, iter } = event.data;
    // Map learning rate values (normalize format)
    const normalizedRate = String(learningRate);
    if (testedRates.hasOwnProperty(normalizedRate) && iter >= 15) {
      if (!testedRates[normalizedRate]) {
        testedRates[normalizedRate] = true;
        unlockLearningRateRow(normalizedRate);
      }
    }
  }
});

function unlockLearningRateRow(rate) {
  const row = document.querySelector(`.rate-row[data-rate="${rate}"]`);
  if (row) {
    row.classList.remove('rate-locked');
    const badge = row.querySelector('.rate-status-badge');
    if (badge) {
      badge.innerHTML = "🔓 Testé";
      badge.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
      badge.style.color = "#10b981";
      badge.style.borderColor = "rgba(16, 185, 129, 0.3)";
    }
    const btns = row.querySelectorAll('.btn-choice');
    btns.forEach(btn => btn.removeAttribute('disabled'));
  }
}

function initQuiz() {
  loadTranslations().then(() => {
    renderTestingScreen();
  });
}

function renderTestingScreen() {
  const qPanel = document.getElementById("quiz-question-panel");
  const fPanel = document.getElementById("quiz-feedback-panel");
  if (!qPanel || !fPanel) return;

  fPanel.innerHTML = "";
  qPanel.innerHTML = `
    <div class="quiz-question-wrapper">
      <div class="quiz-question-badge">Activité 1</div>
      <div class="quiz-question-card">
        Test the different learning rates in the simulator. Run the model for each rate for at least 15 epochs, and assess whether it converges or diverges.
      </div>
    </div>
    <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto; padding-right: 5px;">
      ${learningRates.map(rate => `
        <div class="rate-row rate-locked" data-rate="${rate.value}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; transition: all 0.2s;">
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
    <button class="btn-validate" id="btn-validate-testing" style="margin-top:15px;">Submit</button>
  `;

  // Add event listeners to choices
  learningRates.forEach(rate => {
    const row = qPanel.querySelector(`.rate-row[data-rate="${rate.value}"]`);
    if (!row) return;
    const convBtn = row.querySelector('.btn-choice[data-choice="convergence"]');
    const divBtn = row.querySelector('.btn-choice[data-choice="divergence"]');

    convBtn.onclick = (e) => {
      e.stopPropagation();
      if (row.classList.contains('rate-locked')) return;
      userAnswers[rate.value] = 'convergence';
      convBtn.classList.add('active-yes');
      divBtn.classList.remove('active-no');
    };

    divBtn.onclick = (e) => {
      e.stopPropagation();
      if (row.classList.contains('rate-locked')) return;
      userAnswers[rate.value] = 'divergence';
      divBtn.classList.add('active-no');
      convBtn.classList.remove('active-yes');
    };
  });

  // Locked click tip on rows
  const rows = qPanel.querySelectorAll('.rate-row');
  rows.forEach(row => {
    row.onclick = () => {
      if (row.classList.contains('rate-locked')) {
        fPanel.innerHTML = `
          <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
            Please first test the value <strong>${row.getAttribute('data-rate')}</strong> in the simulator by running the training for 15 epochs.
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

    if (allCorrect) {
      fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.1);">
          <strong>✅ Excellent !</strong> All learning rate behaviors have been correctly identified.<br>
          Transitioning to the final activity...
        </div>
      `;
      validateBtn.disabled = true;
      validateBtn.style.opacity = '0.5';

      setTimeout(() => {
        showDragDropOverlay();
      }, 1500);
    } else {
      fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1);">
          <strong>❌ Oops!</strong> ${incorrectCount} incorrect response(s). Incorrect choices have been reset.
        </div>
      `;

      // Reset incorrect choices
      learningRates.forEach(rate => {
        if (userAnswers[rate.value] !== rate.expected) {
          userAnswers[rate.value] = null;
          const row = qPanel.querySelector(`.rate-row[data-rate="${rate.value}"]`);
          if (row) {
            const convBtn = row.querySelector('.btn-choice[data-choice="convergence"]');
            const divBtn = row.querySelector('.btn-choice[data-choice="divergence"]');
            if (convBtn) convBtn.classList.remove('active-yes');
            if (divBtn) divBtn.classList.remove('active-no');
          }
        }
      });
    }
  };
}

// Drag & Drop Statements Sorting activity
function showDragDropOverlay() {
  const mainPart = document.body;
  
  // Remove existing overlays
  document.querySelectorAll(".dragdrop-overlay").forEach(el => el.remove());

  const ddOverlay = document.createElement("div");
  ddOverlay.className = "dragdrop-overlay";

  const statements = [
    { id: 1, statement: "a hidden neuron creates an intermediate feature, not a final decision", answer: "true", explanation: "a hidden neuron creates an intermediate feature, not a final decision." },
    { id: 2, statement: "A very high learning rate can cause the model to diverge", answer: "true", explanation: "large updates can make training unstable." },
    { id: 3, statement: "A low learning rate usually leads to more stable training", answer: "true", explanation: "small updates make learning more stable." },
    { id: 4, statement: "A very low learning rate can make training extremely slow", answer: "true", explanation: "small updates slow down progress." },
    { id: 5, statement: "A high learning rate can cause the model to overshoot the optimal solution", answer: "true", explanation: "large steps can go past the minimum." },
    { id: 6, statement: "Divergence occurs when updates are too large and unstable", answer: "true", explanation: "instability comes from excessive updates." },
    { id: 7, statement: "If the learning rate is too high, the model may oscillate instead of converging", answer: "true", explanation: "large updates can cause oscillations." },
    { id: 8, statement: "A low learning rate can prevent the model from reaching the optimal solution within a limited time", answer: "true", explanation: "learning may be too slow to converge properly." },
    { id: 9, statement: "A high learning rate can make the model learn faster", answer: "true", explanation: "larger updates can speed up learning." },
    { id: 10, statement: "A very high learning rate can cause the model to diverge", answer: "true", explanation: "large updates can make training unstable." }
  ];

  const cardsHtml = statements.map(stmt => `
    <div class="drag-card" draggable="true" id="card-${stmt.id}" data-answer="${stmt.answer}">${stmt.statement}</div>
  `).join('');

  ddOverlay.innerHTML = `
    <div class="dragdrop-container">
      <div class="dragdrop-header">
        <span class="dragdrop-badge">2</span>
        <h2>Drag and drop statements</h2>
        <h3>True or False?</h3>
      </div>
      
      <div class="dragdrop-cards-area" id="cards-source">
        ${cardsHtml}
      </div>
      
      <div class="dragdrop-zones-container">
        <div class="drop-zone" id="zone-true" data-expected="true">
          <h4>True</h4>
          <div class="zone-cards"></div>
        </div>
        <div class="drop-zone" id="zone-false" data-expected="false">
          <h4>False</h4>
          <div class="zone-cards"></div>
        </div>
      </div>
      
      <div class="dragdrop-success-msg" style="display: none;">
        <h4>🎉 Good Job! All cards sorted correctly.</h4>
        <button class="dragdrop-close-btn">Finish Quiz</button>
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
  const cardsSource = ddOverlay.querySelector("#cards-source");
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

  zones.forEach(zone => {
    const zoneCards = zone.querySelector(".zone-cards");

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("dragover");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("dragover");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");

      const cardId = e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
      const card = draggedCard || document.getElementById(cardId);
      if (!card) return;

      const expected = zone.getAttribute("data-expected");
      const cardAnswer = card.getAttribute("data-answer");
      const isCorrect = (cardAnswer === expected);

      // Append immediately to target zone
      zoneCards.appendChild(card);

      showDropFeedback(card.id, card.textContent, isCorrect, () => {
        if (isCorrect) {
          card.setAttribute("draggable", "false");
          card.style.cursor = "default";
          card.style.transform = "none";

          // Check if all cards sorted
          const sourceCards = cardsSource.querySelectorAll(".drag-card");
          if (sourceCards.length === 0) {
            successMsg.style.display = "block";
            closeBtn.onclick = () => {
              ddOverlay.classList.remove("show");
              setTimeout(() => {
                ddOverlay.remove();
                showCompletionScreen();
              }, 400);
            };
          }
        } else {
          // Shake card and return to source area
          card.classList.add("shake-error");
          setTimeout(() => {
            card.classList.remove("shake-error");
            cardsSource.appendChild(card);
          }, 500);
        }
      });
    });
  });

  function showDropFeedback(cardId, cardText, isCorrect, onClose) {
    document.querySelectorAll(".dd-feedback-overlay").forEach(el => el.remove());
    document.querySelectorAll(".dd-feedback-bubble").forEach(el => el.remove());

    const feedbackOverlay = document.createElement("div");
    feedbackOverlay.className = "dd-feedback-overlay";

    const bubble = document.createElement("div");
    bubble.className = `dd-feedback-bubble ${isCorrect ? 'correct' : 'incorrect'}`;

    const stmtObj = statements.find(s => `card-${s.id}` === cardId);
    const explanation = stmtObj ? stmtObj.explanation : "";

    bubble.innerHTML = `
      <div class="dd-feedback-status">
        ${isCorrect ? '✔ Correct!' : '✖ Incorrect'}
      </div>
      <div class="dd-feedback-statement">
        "${cardText}"
      </div>
      <div class="dd-feedback-explanation">
        ${isCorrect ? '✅ Correct — ' + explanation : '❌ Incorrect — ' + explanation}
      </div>
      <div class="dd-feedback-click-tip">
        Click anywhere to continue
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
}

function showCompletionScreen() {
  const mainPart = document.body;
  const overlay = document.createElement("div");
  overlay.className = "completion-overlay";

  overlay.innerHTML = `
    <div class="completion-card">
      <canvas id="confetti-canvas" style="position: absolute; pointer-events: none; left: 0; top: 0; width: 100%; height: 100%; z-index: 1;"></canvas>

      <div style="font-size: 60px; margin-bottom: 20px; z-index: 2; position: relative;">⭐</div>

      <h2 style="font-size: 32px; font-weight: 800; margin: 0 0 15px 0; z-index: 2; position: relative;">Congratulations !</h2>
      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; margin: 0 0 30px 0; z-index: 2; position: relative;">
        You have successfully completed Exercise 11.<br>
        The role and impact of the learning rate on convergence are now clear.<br>
      </p>

      <div style="z-index: 2; position: relative;">
        <button id="btn-finish-all" class="pulse-btn" style="background: #FF034D; color: white; border: none; padding: 12px 30px; border-radius: 50px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; box-shadow: 0 0 15px rgba(255, 3, 77, 0.4); text-transform: uppercase;">
          Return to Exercise
        </button>
      </div>
    </div>
  `;

  mainPart.appendChild(overlay);
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  // Confetti effect
  const canvas = overlay.querySelector("#confetti-canvas");
  initConfetti(canvas);

  const finishBtn = overlay.querySelector("#btn-finish-all");
  finishBtn.onclick = async () => {
    if (window.StorageService) {
      const success = await window.StorageService.complete(11);
      if (success) {
        window.location.href = "../exo11.html?completed=true";
      } else {
        window.location.href = "../exo11.html?completed=true";
      }
    } else {
      window.location.href = "../exo11.html?completed=true";
    }
  };
}

function initConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const confettiCount = 80;
  const confettis = [];
  const colors = ["#FF034D", "#004676", "#10b981", "#8b5cf6", "#eab308"];

  for (let i = 0; i < confettiCount; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.tilt = Math.sin(c.tiltAngle - c.r / 2) * 5;

      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();

      if (c.y > canvas.height) {
        c.x = Math.random() * canvas.width;
        c.y = -20;
        c.tilt = Math.random() * 10 - 5;
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
});
