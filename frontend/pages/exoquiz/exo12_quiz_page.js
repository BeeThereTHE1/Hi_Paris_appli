// Quiz 12 Page Logic
window.__currentQuizExoId = 12;

// Inject Custom CSS Styles for Quiz layout
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
      min-width: 60px;
      text-align: center;
      user-select: none;
    }
    .btn-choice:hover {
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
    
    .checklist-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px;
      margin-top: 15px;
    }
    .checklist-table th {
      padding: 8px 12px;
      font-size: 11px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .checklist-row-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s;
    }
    .checklist-row-card td {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      vertical-align: middle;
    }
    .checklist-row-card td:first-child {
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      font-size: 13.5px;
      color: #f1f5f9;
      line-height: 1.45;
    }
    .checklist-row-card td:last-child {
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .checklist-row-card td.center-align {
      text-align: center;
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

const statements = [
  {
    id: 1,
    text: "Training loss continuously decreases",
    feedback: "The model keeps improving its performance on the training data."
  },
  {
    id: 2,
    text: "Test loss decreases at first, then starts increasing",
    feedback: "The model initially generalizes, but then begins to fail on unseen data."
  },
  {
    id: 3,
    text: "A gap appears between training loss and test loss",
    feedback: "This gap is the main signal of overfitting."
  },
  {
    id: 4,
    text: "The more complex the model, the larger the gap",
    feedback: "Increased complexity amplifies overfitting."
  },
  {
    id: 5,
    text: "The decision boundary becomes very irregular (overly complex)",
    feedback: "The model starts fitting noise instead of the true data pattern."
  },
  {
    id: 6,
    text: "Best performance occurs before the end of training",
    feedback: "The optimal model is reached before overfitting starts (early stopping insight)."
  }
];

let answersState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null
};

function initQuiz() {
  const qPanel = document.getElementById("quiz-question-panel");
  const fPanel = document.getElementById("quiz-feedback-panel");
  if (!qPanel || !fPanel) return;

  qPanel.innerHTML = `
    <div class="quiz-question-wrapper">
      <div class="quiz-question-badge">Activité 2</div>
      <div class="quiz-question-card" style="font-size: 13.5px; line-height: 1.45;">
        <strong>Did you observe the following patterns?</strong> Assess each statement based on your observation of the training simulation.
      </div>
    </div>
    <table class="checklist-table">
      <thead>
        <tr>
          <th style="text-align: left;">Observation Statement</th>
          <th style="width: 80px; text-align: center;">Yes</th>
          <th style="width: 80px; text-align: center;">No</th>
        </tr>
      </thead>
      <tbody>
        ${statements.map(s => `
          <tr class="checklist-row-card" data-id="${s.id}">
            <td>${s.text}</td>
            <td class="center-align">
              <button class="btn-choice btn-yes" data-val="yes">Yes</button>
            </td>
            <td class="center-align">
              <button class="btn-choice btn-no" data-val="no">No</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  fPanel.innerHTML = `
    <div class="feedback-box" style="border-left-color: #8b5cf6; background: rgba(139, 92, 246, 0.05);">
        💡 Complete the checklist by selecting "Yes" or "No" for each observation pattern.
    </div>
  `;

  // Bind events
  statements.forEach(s => {
    const row = qPanel.querySelector(`tr[data-id="${s.id}"]`);
    if (!row) return;

    const yesBtn = row.querySelector('.btn-yes');
    const noBtn = row.querySelector('.btn-no');

    yesBtn.onclick = (e) => {
      e.stopPropagation();
      answersState[s.id] = 'yes';
      yesBtn.classList.add('active-yes');
      noBtn.classList.remove('active-no');

      // Display feedback
      fPanel.innerHTML = `
        <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.08);">
          <strong>Yes:</strong> ${s.feedback}
        </div>
      `;

      checkAllCompleted();
    };

    noBtn.onclick = (e) => {
      e.stopPropagation();
      answersState[s.id] = 'no';
      noBtn.classList.add('active-no');
      yesBtn.classList.remove('active-yes');

      // Do nothing in feedback box for "No" clicks, clear it
      fPanel.innerHTML = '';
      
      checkAllCompleted();
    };
  });

  // Setup click-away listener on document to dismiss feedback bubble
  document.addEventListener('click', (event) => {
    const isYesBtn = event.target.closest('.btn-yes');
    if (!isYesBtn) {
      fPanel.innerHTML = '';
    }
  });
}

function checkAllCompleted() {
  const allYes = Object.values(answersState).every(val => val === 'yes');
  if (allYes) {
    setTimeout(() => {
      showCompletionScreen();
    }, 500);
  }
}

// ─── COMPLETION SCREEN ───────────────────────────────────────────────────────
function showCompletionScreen() {
  // Remove any leftover overlay
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
      <p class="completion-msg">You have successfully mastered Exercise 12 on Overfitting and Generalization.<br>
        Go back to the dashboard, the next exercise has been unlocked!
      </p>

      <!-- CTA buttons -->
      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../exo12.html?completed=true">
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

  // Fade in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("show"));
  });

  // Launch confetti
  requestAnimationFrame(() => launchConfetti());

  // Mark exercise as COMPLETED in DB — only fires here, at the very end of the full flow
  (async () => {
    if (window.StorageService) {
      await window.StorageService.complete(12);
      console.log(`✅ Exercice 12 marqué COMPLETED.`);
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
    if (frame < 300) requestAnimationFrame(draw); // ~5s at 60fps
  }
  draw();
}

// Run init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz);
} else {
  initQuiz();
}
