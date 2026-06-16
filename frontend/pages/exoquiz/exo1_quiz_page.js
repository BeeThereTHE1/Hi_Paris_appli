function initQuiz() {
  const options = document.querySelectorAll(".quiz-option-btn");
  const quizDiv2 = document.querySelector(".quiz-div-2");
  const mainPart = document.getElementById("main-part");

  const answersData = [
    {
      correct: false,
      title: "Not quite",
      text: "Not quite. Both inputs are equally important to separate the plan in the diagonal orientation of these specific clusters."
    },
    {
      correct: false,
      title: "Not quite",
      text: "Random selection is not a deterministic strategy. A proper ratio must be found."
    },
    {
      correct: true,
      title: "You got it!",
      text: "You got it! X1 and X2 must have similar or equivalent weights to position the decision boundary at a 45-degree angle, perfectly separating the clusters."
    },
    {
      correct: false,
      title: "Not quite",
      text: "Not quite. If X1 is significantly larger, the slope of the line will lean too much towards one axis."
    }
  ];

  // Helper to create the popup overlay without graying out the simulator
  function showFeedbackPopup(answer) {
    // Remove existing overlay if any
    let overlay = document.querySelector(".feedback-overlay");
    if (overlay) overlay.remove();

    overlay = document.createElement("div");
    overlay.className = "feedback-overlay transparent-overlay";

    const bubble = document.createElement("div");
    bubble.className = "feedback-bubble blinking";

    const badge = document.createElement("div");
    badge.className = `feedback-status-badge ${answer.correct ? 'correct' : 'incorrect'}`;
    badge.textContent = answer.correct ? "✔ " + answer.title : "✖ " + answer.title;

    const explanation = document.createElement("div");
    explanation.className = "feedback-text";
    explanation.textContent = answer.text;

    // Invitation message to test again
    const inviteMsg = document.createElement("div");
    inviteMsg.className = "feedback-invite-msg";
    inviteMsg.innerHTML = "💡 <strong>Want to test again!!!</strong> Try adjusting the values in the simulator on the left.";

    const nextBtn = document.createElement("button");
    nextBtn.className = "feedback-next-btn";
    nextBtn.textContent = "Next";
    nextBtn.style.display = "none";

    bubble.appendChild(badge);
    bubble.appendChild(explanation);
    bubble.appendChild(inviteMsg);
    bubble.appendChild(nextBtn);
    overlay.appendChild(bubble);
    mainPart.appendChild(overlay);

    // Show popup with transition
    setTimeout(() => {
      overlay.classList.add("show");
    }, 10);

    // Show Next button after 5 seconds
    setTimeout(() => {
      nextBtn.style.display = "block";
    }, 5000);

    nextBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.remove();
        showDragDropQuiz(); // Trigger Drag & Drop modal
      }, 300);
    });
  }

  // Centered Drag and Drop Quiz Modal
  function showDragDropQuiz() {
    let ddOverlay = document.querySelector(".dragdrop-overlay");
    if (ddOverlay) ddOverlay.remove();

    ddOverlay = document.createElement("div");
    ddOverlay.className = "dragdrop-overlay";

    ddOverlay.innerHTML = `
      <div class="dragdrop-container">
        <div class="dragdrop-header">
          <span class="dragdrop-badge">2</span>
          <h2>Drag and Drop</h2>
          <h3>True or False?</h3>
        </div>
        
        <div class="dragdrop-cards-area" id="cards-source">
          <div class="drag-card" draggable="true" id="card-1" data-answer="true">Increasing X1 weight rotates the decision boundary.</div>
          <div class="drag-card" draggable="true" id="card-2" data-answer="true">Negative weights invert the active input signal.</div>
          <div class="drag-card" draggable="true" id="card-3" data-answer="false">A higher learning rate always avoids local minima.</div>
          <div class="drag-card" draggable="true" id="card-4" data-answer="false">A single linear neuron can classify spiral datasets.</div>
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
    const successMsg = ddOverlay.querySelector(".dragdrop-success-msg");
    const closeBtn = ddOverlay.querySelector(".dragdrop-close-btn");

    let draggedCard = null;

    cards.forEach(card => {
      card.addEventListener("dragstart", (e) => {
        draggedCard = card;
        card.classList.add("dragging");
        e.dataTransfer.setData("text/plain", card.id);
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
        zone.classList.add("hovered");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("hovered");
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("hovered");
        
        if (draggedCard) {
          zoneCards.appendChild(draggedCard);
          checkQuizCompletion();
        }
      });
    });

    function checkQuizCompletion() {
      const sourceArea = ddOverlay.querySelector("#cards-source");
      const remainingCards = sourceArea.querySelectorAll(".drag-card");

      if (remainingCards.length === 0) {
        let allCorrect = true;

        zones.forEach(zone => {
          const expected = zone.getAttribute("data-expected");
          zone.querySelectorAll(".drag-card").forEach(card => {
            if (card.getAttribute("data-answer") !== expected) allCorrect = false;
          });
        });

        if (allCorrect) {
          // 1. Close drag & drop modal
          ddOverlay.classList.remove("show");
          setTimeout(async () => {
            ddOverlay.remove();
            
            // 2. Mark exercise as COMPLETED in DB — now recorded immediately at quiz success
            const exoId = window.__currentQuizExoId || 1;
            if (window.StorageService) {
              await window.StorageService.complete(exoId);
              console.log(`✅ Exercice ${exoId} marqué COMPLETED.`);
            }

            // 3. Revenir à la page principale de l'exercice avec l'état complété
            window.location.href = `../exo${exoId}.html?completed=true`;
          }, 400);
        } else {
          // Wrong placement — shake feedback then reset
          zones.forEach(zone => {
            zone.querySelectorAll(".drag-card").forEach(card => {
              card.classList.add("shake-error");
              setTimeout(() => card.classList.remove("shake-error"), 600);
            });
          });
          setTimeout(() => {
            zones.forEach(zone => {
              zone.querySelectorAll(".drag-card").forEach(card => {
                sourceArea.appendChild(card);
              });
            });
          }, 700);
        }
      }
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
        <h2 class="completion-title">Well Done!</h2>
        <p class="completion-msg">You have finished this exercise.<br>
          Go back home to the dashboard,<br>
          <strong>next exercise has been unlocked!</strong>
        </p>

        <!-- CTA buttons -->
        <div class="completion-actions">
          <a class="completion-btn-next pulse-btn" href="exo2_quiz.html">
            🚀 Next Exercise
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
      const exoId = window.__currentQuizExoId;
      if (exoId && window.StorageService) {
        await window.StorageService.complete(exoId);
        console.log(`✅ Exercice ${exoId} marqué COMPLETED.`);
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

  options.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Clear previous selection
      options.forEach(o => o.classList.remove("selected"));
      btn.classList.add("selected");

      const answer = answersData[index];

      // Update quiz-div-2 with feedback details in a speech bubble block
      quizDiv2.innerHTML = `
        <div class="quiz-feedback-bubble">
          <h3 style="color: ${answer.correct ? '#10b981' : '#58303cff'}; margin-top: 0; font-weight: 800; font-size: 16px;">
            ${answer.correct ? '✔ You got it!' : '✖ Not quite'}
          </h3>
          <p style="font-size: 13px; line-height: 1.5; color: #ffffff; margin: 0;">${answer.text}</p>
        </div>
      `;

      // Show the centered feedback popup after a 3-second delay
      setTimeout(() => {
        showFeedbackPopup(answer);
      }, 3000);
    });
  });
}

// Safely execute initQuiz regardless of document load status
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz);
} else {
  initQuiz();
}
