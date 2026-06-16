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
            <button class="mdl-button mdl-js-button mdl-button--icon" id="reset-button" title="Réinitialiser le réseau" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">replay</i>
            </button>
          </div>
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored ui-playButton" id="play-pause-button" title="Lancer/Mettre en pause" style="background:#FF034D; color:#fff; border-radius: 50%; width: 40px; height: 40px; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="material-icons">play_arrow</i>
          </button>
          <div class="ui-stepButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="next-step-button" title="Étape par étape" style="color:#fff; background:none; border:none; cursor:pointer;">
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
          <span class="label" style="font-size: 11px; color: #cbd5e1; margin-bottom: 5px;">Nombre d'époques <span class="info-tip info-tip-pulse" style="background:#FF034D; color:#fff; border-radius:50%; width:14px; height:14px; display:inline-flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold;">i</span></span>
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
          <span style="font-size: 11px; color: #cbd5e1; margin-bottom: 5px;">Perte entraînement</span>
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
            <button class="mdl-button mdl-js-button mdl-button--icon" id="reset-button" title="Réinitialiser le réseau" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">replay</i>
            </button>
          </div>
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored ui-playButton" id="play-pause-button" title="Lancer/Mettre en pause" style="background:#FF034D; color:#fff; border-radius: 50%; width: 40px; height: 40px; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="material-icons">play_arrow</i>
          </button>
          <div class="ui-stepButton">
            <button class="mdl-button mdl-js-button mdl-button--icon" id="next-step-button" title="Étape par étape" style="color:#fff; background:none; border:none; cursor:pointer;">
              <i class="material-icons">skip_next</i>
            </button>
          </div>
        </div>
      `
    }
  ];

  const quizStatements = [
    { id: 1, text: "Initialize basic parameters (weights & bias) randomly." },
    { id: 2, text: "Make predictions on the training data." },
    { id: 3, text: "Compute training loss to measure error." },
    { id: 4, text: "Adjust weights & bias using gradient descent." },
    { id: 5, text: "Start a new training step with updated parameters." }
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
      panel.scrollTop = panel.scrollHeight;
    }, 50);

    // Highlight the target element inside the iframe
    showHighlightBox(step.selector);

    // If we reached step 5, enable the "Faire le quiz suivant" button in footer
    if (index === 5) {
      const btnRealise = document.getElementById('btn-realise');
      if (btnRealise) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = 'Faire le quiz suivant';
        btnRealise.onclick = () => {
          openDragDropQuizModal();
        };
      }
    }
  }

  function nextStep() {
    if (currentStep >= 5) return;
    currentStep++;
    showStep(currentStep);
  }

  // INTERACTIVE DRAG & DROP MODAL FOR ORDERING QUIZ
  function openDragDropQuizModal() {
    clearHighlights();

    // Create the overlay container
    const overlay = document.createElement('div');
    overlay.className = 'dd-quiz-overlay';
    overlay.id = 'dd-quiz-overlay';

    // Shuffle statements
    const shuffled = [...quizStatements].sort(() => Math.random() - 0.5);

    overlay.innerHTML = `
      <div class="dd-quiz-container">
        <!-- Column Left: Step 3-5 explanations -->
        <div class="dd-quiz-left">
          <h3 style="margin: 0 0 15px 0; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-weight: 800;">Review Steps 3 - 5</h3>
          
          <div>
            <h4>Step 3 - The training loss is calculated</h4>
            <p>After making predictions using the current parameters, the model computes the training loss. This value measures the difference between the model's predictions and the expected outputs.</p>
          </div>
          
          <div>
            <h4>Step 4 - Gradient descent updates the parameters</h4>
            <p>The gradient descent algorithm uses the training loss to compute how the model's parameters should be adjusted. It updates the weights and bias in a direction that reduces the loss.</p>
          </div>
          
          <div>
            <h4>Step 5 - A new training step begins</h4>
            <p>With the updated parameters, the model starts a new training step. This cycle—prediction, loss calculation, and parameter update—is repeated until the loss stabilizes.</p>
          </div>
        </div>

        <!-- Column Right: Drag and Drop sorting -->
        <div class="dd-quiz-right">
          <h3 class="dd-quiz-title">Rearrange the statements to reflect the training process</h3>
          
          <div class="dd-slots-list" id="dd-slots-list">
            ${shuffled.map((item, idx) => `
              <div class="dd-slot" data-slot="${idx + 1}">
                <div class="dd-card" draggable="true" data-id="${item.id}">
                  <span class="dd-card-num">${item.id}</span>
                  <span class="dd-card-text">${item.text}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <button class="dd-quiz-validate-btn" id="dd-quiz-validate-btn">OK</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger overlay fade-in
    setTimeout(() => {
      overlay.classList.add('show');
    }, 10);

    // Setup Drag and Drop events
    let draggedCard = null;

    function checkCurrentCardsOrder() {
      const slots = document.querySelectorAll('.dd-slot');
      slots.forEach((slot) => {
        const expectedOrder = parseInt(slot.dataset.slot, 10);
        const card = slot.querySelector('.dd-card');
        if (card) {
          const cardId = parseInt(card.dataset.id, 10);
          if (cardId === expectedOrder) {
            card.classList.add('correct');
          } else {
            card.classList.remove('correct');
          }
        }
      });
    }

    // Call order check initially
    checkCurrentCardsOrder();

    const cards = overlay.querySelectorAll('.dd-card');
    const slots = overlay.querySelectorAll('.dd-slot');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        draggedCard = card;
        e.dataTransfer.setData('text/plain', card.dataset.id);
        card.style.opacity = '0.5';
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
        draggedCard = null;
      });
    });

    slots.forEach(slot => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedCard) return;

        const targetCard = slot.querySelector('.dd-card');
        const sourceSlot = draggedCard.parentElement;

        if (targetCard) {
          // Swap the elements inside the slots
          slot.appendChild(draggedCard);
          sourceSlot.appendChild(targetCard);
        } else {
          slot.appendChild(draggedCard);
        }

        checkCurrentCardsOrder();
      });
    });

    // Handle OK button click validation
    const validateBtn = document.getElementById('dd-quiz-validate-btn');
    validateBtn.addEventListener('click', () => {
      const slotsList = document.querySelectorAll('.dd-slot');
      let isCorrectOrder = true;

      slotsList.forEach(slot => {
        const slotNum = parseInt(slot.dataset.slot, 10);
        const card = slot.querySelector('.dd-card');
        if (card) {
          const cardId = parseInt(card.dataset.id, 10);
          if (cardId !== slotNum) {
            isCorrectOrder = false;
            card.classList.add('shake-error');
            setTimeout(() => card.classList.remove('shake-error'), 600);
          }
        } else {
          isCorrectOrder = false;
        }
      });

      if (isCorrectOrder) {
        // Correct answers! Hide D&D and display Loop Animation
        showSuccessAnimationScreen(overlay);
      }
    });
  }

  // RENDER THE SUCCESS ANIMATION AND FINAL PROGRESS REDIRECT
  function showSuccessAnimationScreen(overlay) {
    const rightCol = overlay.querySelector('.dd-quiz-right');
    if (!rightCol) return;

    // Clear right column contents
    rightCol.innerHTML = `
      <div class="success-message-card">
        <h2>🎉 Well done!</h2>
        <p>You have correctly identified the steps.</p>
      </div>

      <!-- Loops Animation Container -->
      <div class="anim-container">
        <div class="anim-init">Parameters initialized</div>
        
        <div class="anim-step-row" id="anim-step-1">
          <span class="anim-step-num">1</span>
          <div class="anim-step-text"><strong>PREDICTION</strong> → Model makes predictions</div>
        </div>

        <div class="anim-step-row" id="anim-step-2">
          <span class="anim-step-num">2</span>
          <div class="anim-step-text"><strong>EVALUATION</strong> → Training loss is computed</div>
        </div>

        <div class="anim-step-row" id="anim-step-3">
          <span class="anim-step-num">3</span>
          <div class="anim-step-text"><strong>OPTIMIZATION</strong> → Gradient descent updates parameters</div>
        </div>

        <div class="anim-loop-arrow" id="anim-loop-arrow">
          <span>🔁 repeat to reduce loss</span>
        </div>
      </div>

      <!-- Container for congrats final badges & next actions -->
      <div id="success-footer-container"></div>
    `;

    // Loop animation mechanics
    let currentCycle = 0;
    let currentAnimStep = 1;

    const step1 = document.getElementById('anim-step-1');
    const step2 = document.getElementById('anim-step-2');
    const step3 = document.getElementById('anim-step-3');
    const loopArrow = document.getElementById('anim-loop-arrow');

    function playLoop() {
      // Clear active highlights
      step1.classList.remove('highlight');
      step2.classList.remove('highlight');
      step3.classList.remove('highlight');
      loopArrow.classList.remove('highlight');

      if (currentCycle >= 3) {
        // Freeze everything lit up on the screen
        step1.classList.add('highlight');
        step2.classList.add('highlight');
        step3.classList.add('highlight');
        showFinalSuccessFooter();
        return;
      }

      if (currentAnimStep === 1) {
        step1.classList.add('highlight');
        currentAnimStep = 2;
        setTimeout(playLoop, 1000);
      } else if (currentAnimStep === 2) {
        step2.classList.add('highlight');
        currentAnimStep = 3;
        setTimeout(playLoop, 1000);
      } else if (currentAnimStep === 3) {
        step3.classList.add('highlight');
        loopArrow.classList.add('highlight');
        currentAnimStep = 1;
        currentCycle++;
        setTimeout(playLoop, 1200);
      }
    }

    function showFinalSuccessFooter() {
      const footerContainer = document.getElementById('success-footer-container');
      if (!footerContainer) return;

      footerContainer.innerHTML = `
        <div class="success-footer">
          <div style="display: flex; gap: 10px; align-items: center;">
            <span class="success-footer-badge">Badge [5]</span>
            <span style="font-size: 13px; color: #cbd5e1;">You can now return to the dashboard...</span>
          </div>
          <button class="success-footer-btn" id="dd-success-finish-btn">Retour au Dashboard</button>
        </div>
      `;

      const finishBtn = document.getElementById('dd-success-finish-btn');
      finishBtn.addEventListener('click', async () => {
        overlay.classList.remove('show');
        setTimeout(async () => {
          overlay.remove();
          
          // Save completion state and redirect
          if (window.StorageService) {
            await window.StorageService.complete(2);
            console.log("✅ Exercice 2 marqué COMPLETED.");
          }
          window.location.href = `../exo2.html?completed=true`;
        }, 400);
      });
    }

    // Start loop animation
    playLoop();
  }

  // Setup the global click listener for early steps
  document.addEventListener('click', (e) => {
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

  // Attach positioning listeners
  window.addEventListener('resize', repositionActiveElements);
  window.addEventListener('scroll', repositionActiveElements);
  setInterval(repositionActiveElements, 100);

  // Initialize once iframe is loaded
  const iframe = document.querySelector('.exo-frame');
  if (iframe) {
    iframe.addEventListener('load', () => {
      setTimeout(() => {
        showStep(currentStep);
      }, 1000);
    });
  }
})();
