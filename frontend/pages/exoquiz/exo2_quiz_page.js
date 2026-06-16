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
      desc: "After making predictions using the current parameters, the model computes the **training loss. This value measures the difference between the model’s predictions and the expected outputs, providing a numerical indication of how wrong the model currently is.",
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
      selector: ".column.hidden-layers",
      html: `
        <div class="column hidden-layers" style="visibility: visible; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); max-width: 250px; margin: 0 auto; text-align: center;">
          <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #cbd5e1;">
            <span id="num-layers">0</span>
            <span id="layers-label">Hidden layers</span>
            <span class="info-tip" style="background:rgba(255,255,255,0.2); color:#fff; border-radius:50%; width:14px; height:14px; display:inline-flex; align-items:center; justify-content:center; font-size:9px;">?</span>
          </h4>
          <div class="bracket" style="border: 2px solid rgba(255,255,255,0.2); border-top: none; width: 60px; height: 10px; border-radius: 0 0 6px 6px;"></div>
        </div>
      `
    },
    {
      badge: "Step 5",
      title: "A new training step begins",
      desc: "With the updated parameters, the model starts a new training step. This cycle—prediction, loss calculation, and parameter update—is repeated over many steps and epochs until the loss stabilizes.",
      selector: ".column.features",
      html: `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); max-width: 220px; margin: 0 auto; text-align: center;">
          <h4 style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 700;">
            Caractéristiques <span class="info-tip info-tip-pulse" style="background:#FF034D; color:#fff; border-radius:50%; width:14px; height:14px; display:inline-flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold;">i</span>
          </h4>
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
    // Green highlight class defined in exo2_quiz.html styles
    activeHighlightBox.className = 'tutorial-highlight-box green-highlight';
    document.body.appendChild(activeHighlightBox);

    repositionActiveElements();
  }

  async function finishQuiz() {
    clearHighlights();
    
    // Save completion state in database
    if (window.StorageService) {
      await window.StorageService.complete(2);
      console.log("✅ Exercice 2 marqué COMPLETED dans la base de données.");
    }
    
    // Redirect back to exercise page with completed parameter
    window.location.href = `../exo2.html?completed=true`;
  }

  function showStep(index) {
    if (index >= stepsData.length) {
      finishQuiz();
      return;
    }

    const step = stepsData[index];
    const panel = document.getElementById('quiz-step-panel');
    if (!panel) return;

    // Clear previous card
    panel.innerHTML = '';

    // Create the step card
    const card = document.createElement('div');
    card.className = 'quiz-step-card';
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

    // Apply fade/appearance transition
    setTimeout(() => {
      card.classList.add('show');
    }, 50);

    // Highlight the target element inside the iframe
    showHighlightBox(step.selector);
  }

  function nextStep() {
    currentStep++;
    showStep(currentStep);
  }

  // Setup the global click listener
  document.addEventListener('click', (e) => {
    // Avoid proceeding when clicking headers, footers, or action elements
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
