// Quiz 7 matching grid drag-and-drop
(function () {
  let translations = null;

  async function loadTranslations() {
    try {
      const response = await fetch('../texte.json');
      if (!response.ok) throw new Error("Failed to load translations");
      const data = await response.json();
      translations = data.exercises.exercise_7;
    } catch (e) {
      console.warn("Could not load translations.", e);
    }
  }

  function initQuiz() {
    const qDiv1 = document.querySelector(".quiz-div-1");
    const qDiv2 = document.querySelector(".quiz-div-2");
    if (!qDiv1 || !qDiv2) return;

    // Set styling for matching grid and cells
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .quiz-matching-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        font-family: 'Inter', sans-serif;
      }
      .quiz-matching-table th, .quiz-matching-table td {
        padding: 8px 10px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .quiz-matching-table th {
        color: #e2e8f0;
        font-weight: 700;
        font-size: 12.5px;
        background: rgba(255, 255, 255, 0.03);
      }
      .quiz-matching-table td:first-child {
        text-align: left;
        font-weight: 700;
        color: #94a3b8;
        font-size: 12px;
        width: 110px;
        background: rgba(255, 255, 255, 0.01);
      }
      .drop-cell {
        background: rgba(255, 255, 255, 0.02);
        min-height: 44px;
        min-width: 75px;
        transition: all 0.3s;
        position: relative;
      }
      .drop-cell.hovered {
        background: rgba(139, 92, 246, 0.15) !important;
        border: 1px dashed #8b5cf6;
      }
      
      .drag-card {
        padding: 5px 8px;
        background: #3b82f6;
        border-radius: 6px;
        color: white;
        cursor: grab;
        font-size: 11.5px;
        font-weight: 700;
        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        user-select: none;
        display: inline-block;
        transition: background-color 0.3s;
        text-align: center;
        width: 90%;
        box-sizing: border-box;
      }
      .drag-card.dragging {
        opacity: 0.5;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }
      .shake-error {
        animation: shake 0.4s ease-in-out;
        background: #ef4444 !important;
      }
      
      .feedback-box {
        background: rgba(255, 255, 255, 0.05);
        border-left: 4px solid #8b5cf6;
        padding: 12px;
        border-radius: 4px;
        font-size: 13.5px;
        color: #e2e8f0;
        line-height: 1.4;
        margin-top: 15px;
        animation: fadeIn 0.3s ease;
      }
    `;
    document.head.appendChild(styleEl);

    // Render table
    qDiv1.innerHTML = `
      <div class="quiz-question-wrapper">
          <div class="quiz-question-badge">Quiz 7</div>
          <div class="quiz-question-card">
              Using the graphical representations of each activation function, and by testing them again in the Playground, drag the properties below into the correct columns.
          </div>
      </div>
      
      <table class="quiz-matching-table">
        <thead>
          <tr>
            <th>Properties</th>
            <th>LINEAR</th>
            <th>SIGMOID</th>
            <th>TANH</th>
            <th>ReLU</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Curves</td>
            <td><img src="../../assets/images/or.jpg.png" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);" alt="Linear"></td>
            <td><img src="../../assets/images/output.jpg.png" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);" alt="Sigmoid"></td>
            <td><img src="../../assets/images/output.jpg.png" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);" alt="Tanh"></td>
            <td><img src="../../assets/images/spiral.jpg.png" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);" alt="ReLU"></td>
          </tr>
          <tr>
            <td>Transformation</td>
            <td class="drop-cell" data-expected="Linear"></td>
            <td class="drop-cell" data-expected="Non-linear"></td>
            <td class="drop-cell" data-expected="Non-linear"></td>
            <td class="drop-cell" data-expected="Non-linear"></td>
          </tr>
          <tr>
            <td>Output range</td>
            <td class="drop-cell" data-expected="Any real value"></td>
            <td class="drop-cell" data-expected="0 ; 1"></td>
            <td class="drop-cell" data-expected="-1 ; 1"></td>
            <td class="drop-cell" data-expected="0 / positive"></td>
          </tr>
          <tr>
            <td>Non-linear bound.</td>
            <td class="drop-cell" data-expected="No"></td>
            <td class="drop-cell" data-expected="Yes"></td>
            <td class="drop-cell" data-expected="Yes"></td>
            <td class="drop-cell" data-expected="Yes"></td>
          </tr>
          <tr>
            <td>Observed behavior</td>
            <td class="drop-cell" data-expected="Very limited"></td>
            <td class="drop-cell" data-expected="Often slower"></td>
            <td class="drop-cell" data-expected="More stable"></td>
            <td class="drop-cell" data-expected="Often faster"></td>
          </tr>
        </tbody>
      </table>
    `;

    // Render cards pool
    qDiv2.innerHTML = `
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
        <h4 style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px; font-weight: 700; text-transform: uppercase;">DRAG ZONE ELEMENTS</h4>
        <div id="cards-source" style="display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; background: rgba(0,0,0,0.25); border-radius: 8px; min-height: 80px; align-items: center; justify-content: center;">
        </div>
      </div>
    `;

    const rawCardsValues = [
      "Linear", "Non-linear", "Non-linear", "Non-linear",
      "Any real value", "0 ; 1", "-1 ; 1", "0 / positive",
      "No", "Yes", "Yes", "Yes",
      "Very limited", "Often slower", "More stable", "Often faster"
    ];

    // Shuffle cards helper
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledValues = shuffleArray([...rawCardsValues]);
    const sourceArea = document.getElementById("cards-source");

    shuffledValues.forEach((val, idx) => {
      const card = document.createElement("div");
      card.className = "drag-card";
      card.draggable = true;
      card.id = `card-${idx}`;
      card.setAttribute("data-val", val);
      card.innerText = val;
      sourceArea.appendChild(card);
    });

    // Attach drag events to pool cards
    let draggedCard = null;
    const cards = document.querySelectorAll(".drag-card");
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

    // Attach drop cell events
    const dropCells = document.querySelectorAll(".drop-cell");
    dropCells.forEach(cell => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        cell.classList.add("hovered");
      });

      cell.addEventListener("dragleave", () => {
        cell.classList.remove("hovered");
      });

      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        cell.classList.remove("hovered");

        if (cell.children.length > 0) return; // Only 1 card per cell

        if (draggedCard) {
          const expected = cell.getAttribute("data-expected");
          const val = draggedCard.getAttribute("data-val");

          if (val === expected) {
            // Correct placement: snap in cell and lock
            cell.appendChild(draggedCard);
            draggedCard.setAttribute("draggable", "false");
            draggedCard.style.cursor = "default";
            draggedCard.style.background = "#10b981"; // Snap green
            draggedCard.style.width = "100%";
            draggedCard.style.boxShadow = "none";
            
            checkQuizCompletion();
          } else {
            // Incorrect placement: shake card and send back to pool
            draggedCard.classList.add("shake-error");
            const parent = draggedCard.parentElement;
            
            // Temporarily append to cell to show the shake effect inside the cell
            cell.appendChild(draggedCard);
            
            setTimeout(() => {
              draggedCard.classList.remove("shake-error");
              sourceArea.appendChild(draggedCard);
            }, 600);
          }
        }
      });
    });

    function checkQuizCompletion() {
      const placedCount = document.querySelectorAll(".drop-cell .drag-card").length;
      if (placedCount === 16) {
        // All correctly matched!
        qDiv2.innerHTML = `
          <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
              🎉 Bravo ! Tout est correctement classé.
              <br><br>
              👉 Cliquez sur le bouton d'aide clignotant <strong>"?"</strong> dans la zone <strong>Activation</strong> du simulateur à gauche pour terminer l'exercice.
          </div>
        `;

        // Make the help "?" button inside the simulator blink
        const iframe = document.querySelector('.exo-frame');
        if (iframe) {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const helpBtn = iframeDoc.querySelector('.ui-activation .info-tip');
            if (helpBtn) {
              const helpStyle = iframeDoc.createElement('style');
              helpStyle.id = 'help-blink-style';
              helpStyle.textContent = `
                @keyframes help-blink {
                  0%, 100% { background: #8b5cf6; transform: scale(1); box-shadow: 0 0 5px #8b5cf6; }
                  50% { background: #ef4444; transform: scale(1.3); box-shadow: 0 0 15px #ef4444; }
                }
                .help-blinking {
                  animation: help-blink 0.8s ease-in-out infinite !important;
                  color: white !important;
                  cursor: pointer !important;
                }
              `;
              iframeDoc.head.appendChild(helpStyle);
              helpBtn.classList.add('help-blinking');

              // Listen for click on "?" to redirect after 4s
              helpBtn.addEventListener('click', () => {
                helpBtn.classList.remove('help-blinking');
                
                // Show redirection notice
                qDiv2.innerHTML = `
                  <div class="feedback-box" style="border-left-color: #10b981; background: rgba(16, 185, 129, 0.15); margin-top: 15px; font-weight: 700;">
                      ✨ Redirection dans 4 secondes... Félicitations !
                  </div>
                `;

                setTimeout(async () => {
                  if (window.StorageService) {
                    await window.StorageService.complete(7);
                  }
                  window.location.href = `../exo7.html?completed=true`;
                }, 4000);
              });
            }
          } catch (e) {
            console.error("Could not access iframe to blink help button:", e);
          }
        }
      }
    }
  }

  // Load translations and trigger UI creation
  const iframe = document.querySelector('.exo-frame');
  if (iframe) {
    iframe.addEventListener('load', () => {
      setTimeout(async () => {
        await loadTranslations();
        initQuiz();
      }, 1000);
    });
  }
})();
