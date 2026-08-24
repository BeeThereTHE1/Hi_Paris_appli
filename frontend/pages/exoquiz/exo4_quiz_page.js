// Exercice 5 Quiz page logic
window.__currentQuizExoId = 4;
let translations = null;

async function loadTranslations() {
  try {
    const response = await fetch('../texte.json');
    if (!response.ok) throw new Error("Failed to load translation json");
    const data = await response.json();
    translations = data.exercises.exercise_4;

    if (translations) {
      if (translations.title) {
        document.title = translations.title;
        const titleEl = document.querySelector('.exo-title');
        if (titleEl) titleEl.innerText = translations.title;
      }
    }
  } catch (error) {
    console.warn("Could not load translations from JSON, using fallback/default texts.", error);
  }
}

function initQuiz() {
  const questionPanel = document.getElementById("quiz-question-panel");
  const feedbackPanel = document.getElementById("quiz-feedback-panel");
  if (!questionPanel || !feedbackPanel) return;

  // Question & options configuration from translations or fallback
  const fallbackQuestion = "What is the main role of the bias in a neuron?";
  const questionText = translations && translations.quiz && translations.quiz.question
    ? translations.quiz.question
    : fallbackQuestion;

  let fallbackOptions = [
    { key: "A", text: "Change the slope of the line", correct: false, feedback: "Not quite. Remember that the slope is controlled by the weights of X1 and X2." },
    { key: "B", text: "Shift the line without changing its orientation", correct: true, feedback: "The bias plays the role of the intercept: it shifts the decision boundary." },
    { key: "C", text: "Add noise to the data", correct: false, feedback: "Incorrect. Noise is an inherent property of the dataset, not the neuron parameters." },
    { key: "D", text: "Speed up learning", correct: false, feedback: "Not quite. Learning rate and optimization algorithms control the speed of learning." }
  ];

  let optionsData = [];
  if (translations && translations.quiz && translations.quiz.options) {
    const opts = translations.quiz.options;
    const correctOpt = translations.quiz.correct_option || "B";
    const correctFeedback = translations.quiz.feedback || "The bias plays the role of the intercept: it shifts the decision boundary.";

    // Clean up "(true response)" or similar suffixes from options
    const cleanText = (txt) => txt ? txt.replace(/\s*\(true response\)\s*/i, "").replace(/\s*\(true\)\s*/i, "").trim() : "";

    optionsData = [
      { key: "A", text: cleanText(opts.A) || "Change the slope of the line", correct: correctOpt === "A", feedback: correctOpt === "A" ? correctFeedback : "Not quite. Remember that the slope is controlled by the weights of X1 and X2." },
      { key: "B", text: cleanText(opts.B) || "Shift the line without changing its orientation", correct: correctOpt === "B", feedback: correctOpt === "B" ? correctFeedback : "The bias plays the role of the intercept: it shifts the decision boundary." },
      { key: "C", text: cleanText(opts.C) || "Add noise to the data", correct: correctOpt === "C", feedback: correctOpt === "C" ? correctFeedback : "Incorrect. Noise is an inherent property of the dataset, not the neuron parameters." },
      { key: "D", text: cleanText(opts.D) || "Speed up learning", correct: correctOpt === "D", feedback: correctOpt === "D" ? correctFeedback : "Not quite. Learning rate and optimization algorithms control the speed of learning." }
    ];
  } else {
    optionsData = fallbackOptions;
  }

  // Render QCM interface
  let optionsHtml = optionsData.map((opt, idx) => `
    <button class="quiz-option-btn" data-index="${idx}" data-correct="${opt.correct}">
      <span class="quiz-option-checkbox"></span>
      <span class="quiz-option-text">${opt.key}) ${opt.text}</span>
    </button>
  `).join("");

  questionPanel.innerHTML = `
    <div class="quiz-question-wrapper">
      <div class="quiz-question-badge">Question</div>
      <div class="quiz-question-card">
        ${questionText}
      </div>
    </div>
    <div class="quiz-options-container">
      ${optionsHtml}
    </div>
  `;

  const optionBtns = questionPanel.querySelectorAll(".quiz-option-btn");

  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Clear previous selected states
      optionBtns.forEach(o => o.classList.remove("selected", "selected-correct", "selected-incorrect"));

      const index = parseInt(btn.getAttribute("data-index"));
      const option = optionsData[index];

      if (option.correct) {
        btn.classList.add("selected-correct");
      } else {
        btn.classList.add("selected-incorrect");
      }

      // 1. Immediately show inline speech bubble feedback in the right-bottom panel
      const isCorrect = option.correct;
      const feedbackTitle = isCorrect ? "✔ You got it!" : "✖ Not quite";
      const bubbleColor = isCorrect ? "#10b981" : "#FF034D";

      feedbackPanel.innerHTML = `
        <div class="quiz-feedback-bubble" style="background: ${bubbleColor}; border-color: ${bubbleColor}; display: block;">
          <h3 style="color: #ffffff; margin-top: 0; font-weight: 800; font-size: 15px;">${feedbackTitle}</h3>
          <p style="font-size: 13px; line-height: 1.5; color: #ffffff; margin: 0;">${option.feedback}</p>
        </div>
      `;

      // 2. Immediately trigger the simulator overlay popup
      showOverlayPopup(option);
    });
  });
}

function showOverlayPopup(option) {
  const mainPart = document.getElementById("main-part");
  if (!mainPart) return;

  // Remove existing overlay if any
  const existing = document.querySelector(".feedback-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "feedback-overlay transparent-overlay";

  const bubble = document.createElement("div");
  bubble.className = "feedback-bubble blinking";

  const badge = document.createElement("div");
  badge.className = `feedback-status-badge ${option.correct ? 'correct' : 'incorrect'}`;
  badge.textContent = option.correct ? "✔ You got it!" : "✖ Not quite";

  const explanation = document.createElement("div");
  explanation.className = "feedback-text";

  if (option.correct) {
    // Show the Key Idea details
    const keyIdeaTitle = translations && translations.key_idea && translations.key_idea.title
      ? translations.key_idea.title
      : "Key Idea";
    const keyIdeaDesc = translations && translations.key_idea && translations.key_idea.description
      ? translations.key_idea.description
      : "The neuron defines a linear decision boundary: w1·x1 + w2·x2 + b = 0. Weights control orientation, Bias controls position.";

    explanation.innerHTML = `
      <div style="font-weight: 800; font-size: 16px; margin-bottom: 10px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px;">
        💡 ${keyIdeaTitle}
      </div>
      <div style="font-size: 14px; line-height: 1.5; margin-bottom: 12px; text-align: left;">
        ${keyIdeaDesc.replace("w1·x1 + w2·x2 + b = 0", "<strong style='color:#FACC15;'>w₁x₁ + w₂x₂ + b = 0</strong>")}
      </div>
      <div style="text-align: left; background: rgba(0,0,0,0.2); padding: 10px 14px; border-radius: 8px; border-left: 3px solid #10b981; font-size: 12.5px;">
        <span style="display:block; margin-bottom: 4px;">🎯 <strong>Weights</strong> → control the orientation of the separating line</span>
        <span>↔️ <strong>Bias</strong> → controls the position of the separating line</span>
      </div>
    `;
  } else {
    // Show try again feedback
    explanation.innerHTML = `
      <p style="margin: 0; font-size: 14px;">${option.feedback}</p>
    `;
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "feedback-next-btn";
  nextBtn.textContent = option.correct ? "Next" : "Try Again";
  nextBtn.style.display = "none";

  bubble.appendChild(badge);
  bubble.appendChild(explanation);
  bubble.appendChild(nextBtn);
  overlay.appendChild(bubble);
  mainPart.appendChild(overlay);

  // Animate fade-in
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  // Next button delay: 5 seconds for correct answer, 2.5 seconds for incorrect answer
  setTimeout(() => {
    nextBtn.style.display = "block";
  }, option.correct ? 5000 : 2500);

  nextBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.remove();
      if (option.correct) {
        showCompletionScreen();
      }
    }, 300);
  });
}

function showCompletionScreen() {
  const mainPart = document.getElementById("main-part");
  if (!mainPart) return;

  const overlay = document.createElement("div");
  overlay.className = "completion-overlay";

  overlay.innerHTML = `
    <div class="completion-card">
      <!-- Confetti canvas -->
      <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

      <!-- Animated star -->
      <div class="completion-star-wrap">
        <span class="completion-star">⭐</span>
      </div>

      <!-- Completion Message -->
      <h2 class="completion-title">Congratulation !</h2>
      <p class="completion-msg">
        You have successfully completed exercise 4.<br>
        The impact of bias on the decision boundary is now understood.<br>
<strong>The following exercise has been unlocked!</strong>
      </p>

      <!-- CTA buttons -->
      <div class="completion-actions">
        <a class="completion-btn-next pulse-btn" href="../exo7.html">
          🚀 Next Exercise
        </a>
      </div>
    </div>

    <!-- Fixed home button -->
    <a class="completion-home-icon blink-btn" href="../Page-demo/exercises.html" title="Retour aux exercices">
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

  // Mark completion in storage service
  (async () => {
    if (window.StorageService) {
      await window.StorageService.complete(4);
      console.log("✅ Exercise 4 marqued as COMPLETED.");
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
    if (frame < 300) requestAnimationFrame(draw); // ~5s
  }
  draw();
}

// Safely execute initialisation
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadTranslations().then(initQuiz);
  });
} else {
  loadTranslations().then(initQuiz);
}
