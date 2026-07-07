// Exercice 3 Quiz page logic
window.__currentQuizExoId = 3;
let translations = null;

async function loadTranslations() {
  try {
    const response = await fetch('../texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_3;
  } catch (error) {
    console.warn("Could not load translations from JSON, using fallback/default texts.", error);
  }
}

let quizStep = "1a"; // "1a", "1b", "2"

function initQuiz() {
  renderStep();
}

function renderStep() {
  const questionPanel = document.getElementById("quiz-question-panel");
  const feedbackPanel = document.getElementById("quiz-feedback-panel");
  if (!questionPanel || !feedbackPanel) return;

  feedbackPanel.innerHTML = ""; // Clear feedback

  if (quizStep === "1a") {
    questionPanel.innerHTML = `
      <div class="quiz-question-wrapper">
        <div class="quiz-question-badge">Question 1/2</div>
        <div class="quiz-question-card">
          What type of decision boundary was the model with only <strong>X₁ and X₂</strong> (linear features) able to draw?
        </div>
      </div>
      <div class="quiz-options-container">
        <button class="quiz-option-btn" data-correct="true" data-index="0">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">Linear (a separating straight line)</span>
        </button>
        <button class="quiz-option-btn" data-correct="false" data-index="1">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">Circular (a circle surrounding the points)</span>
        </button>
        <button class="quiz-option-btn" data-correct="false" data-index="2">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">No boundary possible</span>
        </button>
      </div>
    `;
    setupOptionListeners();
  } else if (quizStep === "1b") {
    questionPanel.innerHTML = `
      <div class="quiz-question-wrapper">
        <div class="quiz-question-badge">Question 1/2</div>
        <div class="quiz-question-card">
          What type of decision boundary was the model with <strong>X₁, X₂, X₁² and X₂²</strong> (quadratic features) able to draw?
        </div>
      </div>
      <div class="quiz-options-container">
        <button class="quiz-option-btn" data-correct="false" data-index="0">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">Linear (a separating straight line)</span>
        </button>
        <button class="quiz-option-btn" data-correct="true" data-index="1">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">Circular (a circle surrounding the points)</span>
        </button>
        <button class="quiz-option-btn" data-correct="false" data-index="2">
          <span class="quiz-option-checkbox"></span>
          <span class="quiz-option-text">A complex spiral shape</span>
        </button>
      </div>
    `;
    setupOptionListeners();
  } else if (quizStep === "2") {
    // Render static indicator in right panel
    questionPanel.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; border: 1.5px dashed rgba(255,255,255,0.15); border-radius: 16px;">
        <h3 style="color: #cbd5e1; margin-bottom: 15px;">Final step unlocked!</h3>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
          Answer the floating question to finish the exercise. You can drag and move the box if it hides the playground.
        </p>
      </div>
    `;
    showQuiz2Overlay();
  }
}

function setupOptionListeners() {
  const options = document.querySelectorAll(".quiz-option-btn");
  const feedbackPanel = document.getElementById("quiz-feedback-panel");

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      // Clear previous styles
      options.forEach(o => o.classList.remove("selected", "selected-correct", "selected-incorrect"));

      const isCorrect = btn.getAttribute("data-correct") === "true";
      if (isCorrect) {
        btn.classList.add("selected-correct");
      } else {
        btn.classList.add("selected-incorrect");
      }

      let feedbackTitle = isCorrect ? "✔ Correct!" : "✖ Incorrect";
      let feedbackText = "";

      if (quizStep === "1a") {
        feedbackText = isCorrect 
          ? "Excellent! With only X₁ and X₂, the model can only perform linear combinations, which limits the boundary to a separating straight line."
          : "Not quite. X₁ and X₂ are linear Cartesian coordinates. Without hidden layers or transformations, the boundary remains a straight line.";
      } else if (quizStep === "1b") {
        feedbackText = isCorrect 
          ? "Exactly! Introducing X₁² and X₂² allows the model to express quadratic terms, thus drawing circles or ellipses to separate the dataset."
          : "Remember the mathematical equation for a circle (x² + y² = r²). Quadratic features are essential to draw curved boundaries.";
      }

      feedbackPanel.innerHTML = `
        <div class="quiz-feedback-bubble" style="background: ${isCorrect ? '#10b981' : '#FF034D'}; border-color: ${isCorrect ? '#10b981' : '#FF034D'}; display: block;">
          <h3 style="color: #ffffff; margin-top: 0; font-weight: 800; font-size: 15px;">${feedbackTitle}</h3>
          <p style="font-size: 13px; line-height: 1.5; color: #ffffff; margin: 0;">${feedbackText}</p>
        </div>
      `;

      if (isCorrect) {
        // Proceed to next step after 2.5 seconds
        setTimeout(() => {
          if (quizStep === "1a") {
            quizStep = "1b";
            renderStep();
          } else if (quizStep === "1b") {
            quizStep = "2";
            renderStep();
          }
        }, 2500);
      }
    });
  });
}

function showQuiz2Overlay() {
  const mainPart = document.getElementById("main-part");
  if (!mainPart) return;

  // Remove existing overlay if any
  const existing = document.querySelector(".dd-overlay-quiz2");
  if (existing) existing.remove();

  const ddOverlay = document.createElement("div");
  ddOverlay.className = "dd-overlay-quiz2";
  ddOverlay.style.cssText = "position: fixed; z-index: 12000; left: 0; top: 0; width: 100vw; height: 100vh; background: rgba(11, 15, 26, 0.4); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; transition: opacity 0.3s ease;";

  // Center Draggable Modal Card
  const container = document.createElement("div");
  container.className = "dragdrop-container";
  container.style.cssText = "background: #004676; border: 2px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 25px; max-width: 480px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.5); position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); transition: box-shadow 0.2s;";

  container.innerHTML = `
    <div class="dragdrop-header" style="cursor: move; display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <span style="background: #FF034D; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">2</span>
      <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #fff;">Last Check! (Draggable ↕️)</h3>
    </div>
    <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 15px;">
      Here, we compared linear and non-linear features. Which proposition best describes a non-linear feature?
    </p>
    <div class="quiz-options-container" style="display: flex; flex-direction: column; gap: 10px;">
      <button class="quiz-option-btn opt-q2" data-correct="false">
        <span class="quiz-option-checkbox"></span>
        <span class="quiz-option-text">A) A feature combined with other inputs by linear weights.</span>
      </button>
      <button class="quiz-option-btn opt-q2" data-correct="true">
        <span class="quiz-option-checkbox"></span>
        <span class="quiz-option-text">B) A feature created by applying a non-linear transformation to an input.</span>
      </button>
      <button class="quiz-option-btn opt-q2" data-correct="false">
        <span class="quiz-option-checkbox"></span>
        <span class="quiz-option-text">C) A feature that produces random and irregular outputs.</span>
      </button>
      <button class="quiz-option-btn opt-q2" data-correct="false">
        <span class="quiz-option-checkbox"></span>
        <span class="quiz-option-text">D) A feature usable only in deep networks.</span>
      </button>
    </div>
    <div id="q2-feedback" style="margin-top: 15px; font-size: 12px; border-radius: 8px; padding: 10px; display: none; color: #fff;"></div>
  `;

  ddOverlay.appendChild(container);
  mainPart.appendChild(ddOverlay);

  // Setup dragging
  const header = container.querySelector(".dragdrop-header");
  makeElementDraggable(container, header);

  // Setup options
  const optButtons = container.querySelectorAll(".opt-q2");
  const q2Feedback = container.querySelector("#q2-feedback");

  optButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      optButtons.forEach(o => o.classList.remove("selected", "selected-correct", "selected-incorrect"));
      const isCorrect = btn.getAttribute("data-correct") === "true";

      if (isCorrect) {
        btn.classList.add("selected-correct");
        q2Feedback.style.display = "block";
        q2Feedback.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
        q2Feedback.style.border = "1px solid #10b981";
        q2Feedback.innerHTML = "<strong>Congratulations!</strong> You identified that a non-linear transformation (e.g., x²) projects the data into a space where it becomes linearly separable.";

        setTimeout(() => {
          ddOverlay.remove();
          showCompletionScreen();
        }, 2500);
      } else {
        btn.classList.add("selected-incorrect");
        q2Feedback.style.display = "block";
        q2Feedback.style.backgroundColor = "rgba(255, 3, 77, 0.2)";
        q2Feedback.style.border = "1px solid #FF034D";
        q2Feedback.innerHTML = "<strong>Incorrect.</strong> Think about the transition from X to X²: we apply a non-linear function (power of 2) to change the feature space.";
      }
    });
  });
}

function makeElementDraggable(elmnt, header) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'INPUT') {
      return;
    }
    e.preventDefault();
    
    // Clear CSS transforms if present to avoid absolute offset calculation issues
    if (elmnt.style.transform && elmnt.style.transform !== "none") {
      const rect = elmnt.getBoundingClientRect();
      elmnt.style.transform = "none";
      elmnt.style.top = rect.top + "px";
      elmnt.style.left = rect.left + "px";
    }

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function showCompletionScreen() {
  const mainPart = document.getElementById("main-part");
  if (!mainPart) return;

  const overlay = document.createElement("div");
  overlay.className = "completion-overlay";

  overlay.innerHTML = `
    <div class="completion-card">
      <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

      <div class="completion-star-wrap">
        <span class="completion-star">⭐</span>
      </div>

      <h2 class="completion-title">Well done!</h2>
      <p class="completion-msg">You have successfully completed exercise 3.<br>
        The analysis of linear and non-linear boundaries is now acquired.<br>
        <strong>The next exercise has been unlocked!</strong>
      </p>

      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../Page-demo/exercises.html">
          🚀 Return to Exercises
        </a>
      </div>
    </div>

    <a class="completion-home-icon blink-btn" href="../Page-demo/exercises.html" title="Return to exercises">
      🏠
    </a>
  `;

  document.body.appendChild(overlay);

  // Trigger opacity fade-in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("show"));
  });

  // Launch confetti
  requestAnimationFrame(() => launchConfetti());

  // Mark completion
  (async () => {
    localStorage.setItem('quiz_section_1_completed', 'true');
    if (window.StorageService) {
      await window.StorageService.complete(3);
      console.log("✅ Exercise 3 marked COMPLETED in database.");
    }
  })();
}

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

// Safely execute initQuiz
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadTranslations().then(initQuiz);
  });
} else {
  loadTranslations().then(initQuiz);
}
