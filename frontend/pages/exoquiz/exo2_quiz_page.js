(function () {
  const stepsData = [
    {
      badge: "Step 0",
      title: "Initial parameters are set",
      desc: "Before training begins, the neural network’s basic parameters (such as weights and bias) are automatically initialized. These initial values are usually small and random, allowing the model to start making predictions even before learning begins.",
      selector: "g.core",
      html: `
        <svg width="100%" height="110" viewBox="0 0 600 110" style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px;">
          <g class="core" transform="translate(3,3)">
            <path class="link" id="linky-1" d="M82,70C311,70 311,18 540,18" style="stroke-dashoffset: -42.6667; stroke-width: 2.27785; stroke: rgb(73, 152, 202); fill: none;"></path>
            <path class="link" id="linkx-1" d="M82,15C311,15 311,12 540,12" style="stroke-dashoffset: -42.6667; stroke-width: 2.53604; stroke: rgb(41, 136, 196); fill: none;"></path>
            <g class="node active" id="nodex" transform="translate(50,0)">
              <rect x="0" y="0" width="30" height="30" fill="#004676" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="4"></rect>
              <text class="main-label" x="15" y="20" text-anchor="middle" fill="#fff" style="font-family: Inter, sans-serif; font-weight: bold; font-size: 11px;">X1</text>
            </g>
            <g class="node active" id="nodey" transform="translate(50,55)">
              <rect x="0" y="0" width="30" height="30" fill="#004676" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="4"></rect>
              <text class="main-label" x="15" y="20" text-anchor="middle" fill="#fff" style="font-family: Inter, sans-serif; font-weight: bold; font-size: 11px;">X2</text>
            </g>
          </g>
        </svg>
      `
    },
    {
      badge: "Step 1",
      title: "Training starts",
      desc: "The training process is launched. From this point on, the model repeatedly processes the training data in order to improve its predictions.",
      selector: ".timeline-controls",
      html: `
        <div class="timeline-controls" style="display: flex; align-items: center; justify-content: center; gap: 15px; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px;">
          <div class="ui-resetButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="reset-button" title="Reinitialize the network" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">replay</i>
            </button>
          </div>
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored ui-playButton" id="play-pause-button" title="Play/Pause" style="background:#FF034D; color:#fff; border-radius: 50%; width: 40px; height: 40px; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="material-icons">play_arrow</i>
          </button>
          <div class="ui-stepButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="next-step-button" title="Step by step" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">skip_next</i>
            </button>
          </div>
        </div>
      `
    },
    {
      badge: "Step 2",
      title: "The epoch counter records the first pass",
      desc: "The epoch counter displays the first epoch, indicating that the model is starting its first complete pass through the training dataset. An epoch represents one full cycle in which all training examples are seen by the model once.",
      selector: ".control.ui-epoch",
      html: `
        <div class="control ui-epoch" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: center; max-width: 220px; margin: 0 auto;">
          <span class="label" style="font-size: 11px; color: #cbd5e1; margin-bottom: 5px;">Number of epochs <span class="info-tip info-tip-pulse" style="background:#FF034D; color:#fff; border-radius:50%; width:14px; height:14px; display:inline-flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold;">i</span></span>
          <span class="value" id="iter-number" style="font-size: 22px; font-weight: 800; color: #ffffff;">000,128</span>
        </div>
      `
    },
    {
      badge: "Step 3",
      title: "The training loss is calculated",
      desc: "After making predictions using the current parameters, the model computes the training loss. This value measures the difference between the model’s predictions and the expected outputs, providing a numerical indication of how wrong the model currently is.",
      selector: ".output-stats.train.ui-trainLoss",
      html: `
        <div class="output-stats train ui-trainLoss" title="The training loss measures how well the model fits the training dataset." style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: center; max-width: 220px; margin: 0 auto;">
          <span style="font-size: 11px; color: #cbd5e1; margin-bottom: 5px;">Training loss</span>
          <div class="value" id="loss-train" style="font-size: 22px; font-weight: 800; color: #ffffff;">0.000</div>
        </div>
      `
    },
    {
      badge: "Step 4",
      title: "Gradient descent updates the parameters",
      desc: "The gradient descent algorithm uses the training loss to compute how the model’s parameters should be adjusted. It updates the weights and bias in a direction that reduces the loss, improving the model’s predictions.",
      selector: "g.core",
      html: `
        <svg width="100%" height="110" viewBox="0 0 600 110" style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px;">
          <g class="core" transform="translate(3,3)">
            <path class="link" id="linky-1" d="M82,70C311,70 311,18 540,18" style="stroke-dashoffset: -42.6667; stroke-width: 2.27785; stroke: rgb(73, 152, 202); fill: none;"></path>
            <path class="link" id="linkx-1" d="M82,15C311,15 311,12 540,12" style="stroke-dashoffset: -42.6667; stroke-width: 2.53604; stroke: rgb(41, 136, 196); fill: none;"></path>
            <g class="node active" id="nodex" transform="translate(50,0)">
              <rect x="0" y="0" width="30" height="30" fill="#004676" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="4"></rect>
              <text class="main-label" x="15" y="20" text-anchor="middle" fill="#fff" style="font-family: Inter, sans-serif; font-weight: bold; font-size: 11px;">X1</text>
            </g>
            <g class="node active" id="nodey" transform="translate(50,55)">
              <rect x="0" y="0" width="30" height="30" fill="#004676" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="4"></rect>
              <text class="main-label" x="15" y="20" text-anchor="middle" fill="#fff" style="font-family: Inter, sans-serif; font-weight: bold; font-size: 11px;">X2</text>
            </g>
          </g>
        </svg>
      `
    },
    {
      badge: "Step 5",
      title: "A new training step begins",
      desc: "With the updated parameters, the model starts a new training step. This cycle—prediction, loss calculation, and parameter update—is repeated over many steps and epochs until the loss stabilizes.",
      selector: ".timeline-controls",
      html: `
        <div class="timeline-controls" style="display: flex; align-items: center; justify-content: center; gap: 15px; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px;">
          <div class="ui-resetButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="reset-button" title="Reinitialize the network" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">replay</i>
            </button>
          </div>
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored ui-playButton" id="play-pause-button" title="Play/Pause" style="background:#FF034D; color:#fff; border-radius: 50%; width: 40px; height: 40px; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="material-icons">play_arrow</i>
          </button>
          <div class="ui-stepButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="next-step-button" title="Step by step" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">skip_next</i>
            </button>
          </div>
        </div>
      `
    }
  ];

  let currentStep = 0;
  let activeHighlightBox = null;
  let currentHighlightSelector = null;

  function clearHighlights() {
    if (activeHighlightBox) {
      activeHighlightBox.remove();
      activeHighlightBox = null;
    }
    currentHighlightSelector = null;
  }

  function getIframeElementRect(selector) {
    const iframe = document.querySelector('.exo-frame');
    if (!iframe) return null;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const el = iframeDoc.querySelector(selector);
    if (!el) return null;

    const iframeRect = iframe.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    return {
      top: iframeRect.top + elRect.top,
      left: iframeRect.left + elRect.left,
      bottom: iframeRect.top + elRect.bottom,
      right: iframeRect.left + elRect.right,
      width: elRect.width,
      height: elRect.height
    };
  }

  function repositionActiveElements() {
    if (currentHighlightSelector && activeHighlightBox) {
      const rect = getIframeElementRect(currentHighlightSelector);
      if (rect) {
        const padding = 15;
        let rectLeft = rect.left - padding;
        let rectTop = rect.top - padding;
        let rectWidth = rect.width + padding * 2;
        let rectHeight = rect.height + padding * 2;

        activeHighlightBox.style.left = `${rectLeft + window.scrollX}px`;
        activeHighlightBox.style.top = `${rectTop + window.scrollY}px`;
        activeHighlightBox.style.width = `${rectWidth}px`;
        activeHighlightBox.style.height = `${rectHeight}px`;
      }
    }
  }

  function showHighlightBox(selector) {
    clearHighlights();
    currentHighlightSelector = selector;

    activeHighlightBox = document.createElement('div');
    activeHighlightBox.className = 'tutorial-highlight-box green-highlight';
    document.body.appendChild(activeHighlightBox);

    repositionActiveElements();
  }

  let quizActive = false;
  const correctStatements = [
    { id: 2, text: "The model already exhibits a decision boundary, even though learning has not yet begun." },
    { id: 5, text: "Predictions are generated using the current state of the model applied to the input features." },
    { id: 1, text: "A numerical signal is produced to indicate how far the model’s current predictions are from the expected outcomes." },
    { id: 3, text: "Parameter adjustments are calculated based on how a small change would affect the error signal." },
    { id: 4, text: "The same sequence of operations is executed repeatedly as the model revisits the training data." }
  ];
  let shuffledStatements = [];

  function initShuffledStatements() {
    do {
      shuffledStatements = [...correctStatements].sort(() => Math.random() - 0.5);
    } while (shuffledStatements.every((stmt, index) => stmt.id === correctStatements[index].id));
  }

  async function finishQuiz() {
    clearHighlights();

    if (window.StorageService) {
      await window.StorageService.complete(2);
      console.log("✅ Exercise 2 marked COMPLETED.");
    }

    window.location.href = `../exo2.html?completed=true`;
  }

  function showStep(index) {
    if (index >= stepsData.length) {
      return;
    }

    const step = stepsData[index];
    const panel = document.getElementById('quiz-step-panel');
    if (!panel) return;

    // Remove active styles from previous cards
    const previousActive = panel.querySelectorAll('.quiz-step-card.active');
    previousActive.forEach(card => card.classList.remove('active'));

    // Create the step card
    const card = document.createElement('div');
    card.className = 'quiz-step-card active';
    card.innerHTML = `
      <div class="quiz-step-header">
        <span class="quiz-step-badge">${step.badge}</span>
        <h3>${step.title}</h3>
      </div>
      <p class="quiz-step-desc">${step.desc}</p>
      <div class="quiz-step-preview">
        ${step.html}
      </div>
    `;

    panel.appendChild(card);

    // Apply entry transition
    setTimeout(() => {
      card.classList.add('show');
      // Scroll to the bottom of the panel
      panel.scrollTop = panel.scrollHeight;
    }, 50);

    // Highlight the target element inside the iframe
    showHighlightBox(step.selector);

    // If step 5 is reached, transform the validation button
    if (index === 5) {
      const btnRealise = document.getElementById("btn-realise");
      if (btnRealise) {
        btnRealise.disabled = false;
        btnRealise.classList.remove("btn-disabled");
        btnRealise.classList.add("btn-success-ready");
        btnRealise.innerHTML = `<span class="icon">📝</span> Take the next quiz`;
      }
    }
  }

  function nextStep() {
    if (currentStep >= 5) {
      return;
    }
    currentStep++;
    showStep(currentStep);
  }

  function startDragDropQuiz() {
    quizActive = true;
    clearHighlights();

    // Keep simulator iframe visible in the background and show left bloc2 panel overlay
    const iframe = document.querySelector('.exo-frame');
    if (iframe) iframe.style.display = 'block';

    const bloc2Panel = document.getElementById('bloc2-panel');
    if (bloc2Panel) {
      bloc2Panel.style.display = 'flex';
      bloc2Panel.innerHTML = `
        <div style="font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5); padding: 40px 20px; text-align: center; border: 1.5px dashed rgba(255,255,255,0.15); border-radius: 16px; width:100%; max-width:450px; box-sizing:border-box;">
          Solve the ordering activity on the right to unlock the training schema...
        </div>
      `;
    }

    // Hide footer validation button during quiz
    const btnRealise = document.getElementById("btn-realise");
    if (btnRealise) {
      btnRealise.style.display = 'none';
    }
    const btnSauvegarder = document.getElementById("btn-sauvegarder");
    if (btnSauvegarder) {
      btnSauvegarder.style.display = 'none';
    }

    // Clear step panel and setup Drag & Drop interface
    const panel = document.getElementById('quiz-step-panel');
    if (panel) {
      panel.innerHTML = `
        <div class="dd-quiz-container">
          <div class="dd-quiz-header">
            <h3 class="dd-quiz-title">Rearrange the statements to reflect the order of the training process</h3>
          </div>
          <div class="dd-slots-list" id="dd-slots-list"></div>
        </div>
      `;
    }

    initShuffledStatements();
    renderDragDrop();
  }

  function renderDragDrop() {
    const container = document.getElementById("dd-slots-list");
    if (!container) return;
    container.innerHTML = "";

    shuffledStatements.forEach((stmt, index) => {
      const isCorrect = (stmt.id === correctStatements[index].id);

      const slotDiv = document.createElement("div");
      slotDiv.className = "dd-slot";

      const badge = document.createElement("div");
      badge.className = `dd-slot-badge ${isCorrect ? 'correct' : ''}`;
      badge.textContent = `(${index + 1})`;

      const card = document.createElement("div");
      card.className = `dd-card ${isCorrect ? 'correct-slot' : ''}`;
      card.setAttribute("draggable", "true");
      card.textContent = stmt.text;

      // HTML5 Drag and Drop Handlers
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", index);
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });

      slotDiv.appendChild(badge);
      slotDiv.appendChild(card);
      container.appendChild(slotDiv);

      // Handle drop on the slot row
      slotDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      slotDiv.addEventListener("drop", (e) => {
        e.preventDefault();
        const srcIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (isNaN(srcIndex) || srcIndex === index) return;

        // Swap statements
        const temp = shuffledStatements[srcIndex];
        shuffledStatements[srcIndex] = shuffledStatements[index];
        shuffledStatements[index] = temp;

        renderDragDrop();
        checkDragDropCompletion();
      });
    });
  }

  function checkDragDropCompletion() {
    const allCorrect = shuffledStatements.every((stmt, index) => stmt.id === correctStatements[index].id);
    if (allCorrect) {
      // Disable dragging on all cards
      const cards = document.querySelectorAll(".dd-card");
      cards.forEach(card => card.setAttribute("draggable", "false"));

      // Proceed to animate Bloc 2
      onDragDropCorrect();
    }
  }

  function onDragDropCorrect() {
    const bloc2Panel = document.getElementById('bloc2-panel');
    if (!bloc2Panel) return;

    // Render Notification de réussite (Bloc 2 - 3) + Schema d'entrainement (Bloc 2 - 4)
    bloc2Panel.innerHTML = `
      <div class="bloc2-success-card">
        <div class="bloc2-success-badge">[ 3 ]</div>
        <h4 class="bloc2-success-title">Well done!</h4>
        <p class="bloc2-success-text">You have correctly identified the steps.</p>
      </div>

      <div class="process-schema" id="process-schema">
        <div class="schema-init-box">Parameters initialized</div>
        <div class="schema-main-content">
          <div class="schema-steps-column">
            <!-- Step 1 -->
            <div class="schema-step-row" id="schema-step-1">
              <div class="schema-step-btn">
                <span class="schema-step-num">(1)</span>
                <span class="schema-step-label">PREDICTION</span>
              </div>
              <div class="schema-arrow">────▶</div>
              <div class="schema-desc-box">Model makes predictions</div>
            </div>
            <!-- Step 2 -->
            <div class="schema-step-row" id="schema-step-2">
              <div class="schema-step-btn">
                <span class="schema-step-num">(2)</span>
                <span class="schema-step-label">EVALUATION</span>
              </div>
              <div class="schema-arrow">────▶</div>
              <div class="schema-desc-box">Training loss is computed</div>
            </div>
            <!-- Step 3 -->
            <div class="schema-step-row" id="schema-step-3">
              <div class="schema-step-btn">
                <span class="schema-step-num">(3)</span>
                <span class="schema-step-label">OPTIMIZATION</span>
              </div>
              <div class="schema-arrow">────▶</div>
              <div class="schema-desc-box">Gradient descent updates parameters</div>
            </div>
          </div>
          
          <!-- Loop column on the right -->
          <div class="schema-loop-column" id="schema-loop">
            <svg class="schema-loop-svg" width="80" height="190" viewBox="0 0 80 190" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="yellow-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path class="schema-loop-path" d="M 0 160 L 40 160 A 20 20 0 0 0 60 140 L 60 50 A 20 20 0 0 0 40 30 L 5 30" 
                    stroke="rgba(255, 255, 255, 0.15)" stroke-width="2.5" stroke-dasharray="5,5" stroke-linecap="round" />
              <path class="schema-loop-arrow" d="M 12 24 L 2 30 L 12 36" 
                    stroke="rgba(255, 255, 255, 0.15)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
            <div class="schema-loop-pill-horizontal">Repeat to reduce loss</div>
          </div>
        </div>
      </div>

      <div id="bloc2-final-container" style="width: 100%; display: flex; justify-content: center; margin-bottom: 20px;"></div>
    `;

    // Start schema cycle animations
    runSchemaAnimation(() => {
      // Callback: Triggered after 3 cycles (frozen state)
      // Display Bloc 2fin (Final card)
      const finalContainer = document.getElementById("bloc2-final-container");
      if (finalContainer) {
        finalContainer.innerHTML = `
          <div class="bloc2-final-card">
            <div class="bloc2-final-badge">[ 5 ]</div>
            <p class="bloc2-final-text">You can now return to the dashboard to continue with the next exercise.</p>
            <button class="bloc2-final-btn" id="btn-final-dashboard">Return to Dashboard</button>
          </div>
        `;

        const btnFinal = document.getElementById("btn-final-dashboard");
        if (btnFinal) {
          btnFinal.addEventListener("click", finishQuiz);
        }
      }
    });
  }

  function runSchemaAnimation(callback) {
    const step1 = document.getElementById("schema-step-1");
    const step2 = document.getElementById("schema-step-2");
    const step3 = document.getElementById("schema-step-3");
    const loop = document.getElementById("schema-loop");

    if (!step1 || !step2 || !step3 || !loop) return;

    let cycleCount = 0;
    let activePhase = 0; // 0: Step 1, 1: Step 2, 2: Step 3, 3: Loop

    function setPhase() {
      if (cycleCount >= 3) {
        // Freeze all elements in highlighted/active state
        step1.classList.add("active");
        step2.classList.add("active");
        step3.classList.add("active");
        loop.classList.add("active");
        if (callback) callback();
        return;
      }

      // Clear highlights for current step
      step1.classList.remove("active");
      step2.classList.remove("active");
      step3.classList.remove("active");
      loop.classList.remove("active");

      if (activePhase === 0) {
        step1.classList.add("active");
      } else if (activePhase === 1) {
        step2.classList.add("active");
      } else if (activePhase === 2) {
        step3.classList.add("active");
      } else if (activePhase === 3) {
        loop.classList.add("active");
      }

      // Progress to next phase/cycle
      activePhase++;
      if (activePhase > 3) {
        activePhase = 0;
        cycleCount++;
      }

      setTimeout(setPhase, 1000);
    }

    // Launch animation after a brief delay
    setTimeout(setPhase, 800);
  }

  document.addEventListener('click', (e) => {
    if (quizActive) {
      return;
    }
    if (
      e.target.closest('header') ||
      e.target.closest('.universal-header') ||
      e.target.closest('a') ||
      e.target.closest('button') ||
      e.target.closest('.exo-actions-footer')
    ) {
      return;
    }
    nextStep();
  });

  // Action button listener for "Take the next quiz"
  const btnRealise = document.getElementById("btn-realise");
  if (btnRealise) {
    btnRealise.addEventListener("click", () => {
      if (!btnRealise.disabled && btnRealise.classList.contains("btn-success-ready")) {
        startDragDropQuiz();
      }
    });
  }

  window.addEventListener('resize', repositionActiveElements);
  window.addEventListener('scroll', repositionActiveElements);
  setInterval(repositionActiveElements, 100);

  const iframe = document.querySelector('.exo-frame');
  if (iframe) {
    iframe.addEventListener('load', () => {
      setTimeout(() => {
        showStep(currentStep);
      }, 1000);
    });
  }
})();
