// Quiz 15 Page Logic
window.__currentQuizExoId = 15;

// Inject Custom CSS Styles for Checklist
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .checklist-row-card {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      margin-bottom: 8px;
    }
    .checklist-row-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .checklist-row-card.checked {
      background: rgba(16, 185, 129, 0.05) !important;
      border-color: rgba(16, 185, 129, 0.2) !important;
    }
    .check-box-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: transparent;
      font-weight: 900;
      transition: all 0.2s;
      flex-shrink: 0;
      margin-right: 12px;
    }
    .checklist-row-card.checked .check-box-circle {
      background: #10b981;
      border-color: #10b981;
      color: white;
    }
    .statement-text {
      font-size: 13.5px;
      color: #e2e8f0;
      line-height: 1.4;
    }
    .checklist-row-card.checked .statement-text {
      color: #f1f5f9;
    }

    .feedback-box {
      background: rgba(255, 255, 255, 0.05);
      border-left: 4px solid #8b5cf6;
      padding: 15px;
      border-radius: 6px;
      font-size: 14px;
      color: #e2e8f0;
      line-height: 1.5;
      margin-top: 15px;
      animation: fadeIn 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

const observations = [
  { id: 1, text: "Evolution of the training loss over time (speed and stability)", feedback: "The training loss should decrease steadily as the model learns patterns from the training data." },
  { id: 2, text: "Evolution of the test loss over time (level and fluctuations)", feedback: "The test loss may decrease initially but can stabilize or increase if the model fails to generalize." },
  { id: 3, text: "Gap between training and test loss and whether it increases", feedback: "An increasing gap indicates the model is fitting the training data better than the test data." },
  { id: 4, text: "Moment when the two curves start to diverge", feedback: "The point where test loss starts increasing while training loss keeps decreasing signals overfitting." },
  { id: 5, text: "Signs of overfitting (training improves while test worsens)", feedback: "Overfitting occurs when performance improves on training data but degrades on test data." },
  { id: 6, text: "Overall generalization performance on unseen data", feedback: "Good generalization means similar performance on both training and test data." },
  { id: 7, text: "Amount of training data available (here very limited – 10%)", feedback: "With only 10% training data, the model has limited examples to learn general patterns." },
  { id: 8, text: "Evidence of memorization of training data (rapid loss decrease)", feedback: "A very fast decrease in training loss suggests the model is memorizing rather than learning." },
  { id: 9, text: "Difficulty to generalize from few examples", feedback: "With few examples, the model struggles to apply learned patterns to new data." },
  { id: 10, text: "Impact of noise and lack of data on model behavior", feedback: "Noise and insufficient data increase the risk of learning irrelevant or misleading patterns." }
];

let checkedState = {};
observations.forEach(o => {
  checkedState[o.id] = false;
});

function initQuiz() {
  const qPanel = document.getElementById("quiz-question-panel");
  const fPanel = document.getElementById("quiz-feedback-panel");
  if (!qPanel || !fPanel) return;

  qPanel.innerHTML = `
    <div class="quiz-question-wrapper">
      <div class="quiz-question-badge">Activité 2</div>
      <div class="quiz-question-card" style="font-size: 13.5px; line-height: 1.45;">
        <strong>Key Observations Checklist</strong>: Run the model in the simulator and verify each observation point below by checking it off.
      </div>
    </div>
    <div id="checklist-container" style="display: flex; flex-direction: column; gap: 4px; margin-top: 15px; max-height: 400px; overflow-y: auto; padding-right: 5px;">
      ${observations.map(o => `
        <div class="checklist-row-card" data-id="${o.id}">
          <div class="check-box-circle">✓</div>
          <span class="statement-text">${o.text}</span>
        </div>
      `).join('')}
    </div>
  `;

  fPanel.innerHTML = `
    <div class="feedback-box" style="border-left-color: #8b5cf6; background: rgba(139, 92, 246, 0.05);">
        💡 Run the simulation and check off each observation to complete the checklist!
    </div>
  `;

  // Bind clicks
  const cards = qPanel.querySelectorAll('.checklist-row-card');
  Array.prototype.forEach.call(cards, function(card) {
    const id = parseInt(card.getAttribute('data-id'));
    const obs = observations.find(o => o.id === id);

    card.onclick = (e) => {
      e.stopPropagation();
      checkedState[id] = !checkedState[id];

      if (checkedState[id]) {
        card.classList.add('checked');
        fPanel.innerHTML = `
          <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.08);">
            <strong>Observation validated:</strong> ${obs.feedback}
          </div>
        `;
      } else {
        card.classList.remove('checked');
        fPanel.innerHTML = '';
      }

      checkQuizCompletion();
    };
  });

  // Click away to dismiss feedback box
  document.addEventListener('click', (event) => {
    const isCard = event.target.closest('.checklist-row-card');
    if (!isCard) {
      fPanel.innerHTML = '';
    }
  });
}

function checkQuizCompletion() {
  const allChecked = Object.keys(checkedState).every(function(key) {
    return checkedState[key] === true;
  });

  if (allChecked) {
    setTimeout(() => {
      showCompletionScreen();
    }, 500);
  }
}

// ─── COMPLETION SCREEN ───────────────────────────────────────────────────────
function showCompletionScreen() {
  document.querySelectorAll(".completion-overlay").forEach(el => el.remove());

  const overlay = document.createElement("div");
  overlay.className = "completion-overlay";

  overlay.innerHTML = `
    <div class="completion-card">
      <!-- Confetti canvas -->
      <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

      <!-- Big animated star -->
      <div class="completion-star-wrap">
        <span class="completion-star">⭐</span>
      </div>

      <!-- Title & message -->
      <h2 class="completion-title">Excellent Job!</h2>
      <p class="completion-msg">You have successfully completed Exercise 15 on Training/Test datasets.<br>
        Go back to the dashboard, the next exercise has been unlocked!
      </p>

      <!-- CTA buttons -->
      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../exo15.html?completed=true">
          🚀 Finish Exercise
        </a>
      </div>
    </div>

    <!-- Fixed home icon bottom-right -->
    <a class="completion-home-icon blink-btn" href="../Page-demo/exercises.html" title="Back to Dashboard">
      🏠
    </a>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("show"));
  });

  requestAnimationFrame(() => launchConfetti());

  (async () => {
    if (window.StorageService) {
      await window.StorageService.complete(15);
      console.log(`✅ Exercice 15 marqué COMPLETED.`);
    }
  })();
}

// ─── CONFETTI ENGINE ─────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const COLORS = ["#FF034D", "#FFD700", "#10b981", "#6366f1", "#ffffff", "#FF6B35"];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 3 + 1.5,
    spin: (Math.random() - 0.5) * 0.15,
    angle: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 1.5
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
      ctx.restore();
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    frame++;
    if (frame < 300) requestAnimationFrame(draw);
  }
  draw();
}

// Run init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz);
} else {
  initQuiz();
}
