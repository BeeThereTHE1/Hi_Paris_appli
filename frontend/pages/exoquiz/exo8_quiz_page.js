// Exercise 7 Quiz page logic
(function () {
  let translations = null;

  async function loadTranslations() {
    try {
      const response = await fetch('../texte.json');
      if (!response.ok) throw new Error("Failed to load translation json");
      const data = await response.json();
      translations = data.exercises.exercise_8;

      if (translations) {
        if (translations.title) {
          document.title = translations.title;
          const titleEl = document.querySelector('.exo-title');
          if (titleEl) titleEl.innerText = translations.title;
        }
      }
    } catch (error) {
      console.warn("Could not load translations from JSON, using fallbacks.", error);
    }
  }

  // Quiz State
  let q1Answers = {
    weights: false,
    features: false,
    stops: false,
    boundaries: false
  };

  let q2Answers = {
    starts: false,
    dataset: false,
    random: false
  };

  function initQuiz() {
    renderQuestion1();
  }

  function renderQuestion1() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = '';

    qPanel.innerHTML = `
      <div class="quiz-question-wrapper">
          <div class="quiz-question-badge">Quiz 8 - Q1</div>
          <div class="quiz-question-card">
              What differences do you observe between the two results? (Select all correct answers)
          </div>
      </div>
      <div class="quiz-options-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
          <button class="quiz-option-btn" data-key="weights" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The final weights</span>
          </button>
          <button class="quiz-option-btn" data-key="features" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The input features change</span>
          </button>
          <button class="quiz-option-btn" data-key="stops" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The training stops earlier in one model</span>
          </button>
          <button class="quiz-option-btn" data-key="boundaries" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The decision boundaries are different</span>
          </button>
      </div>
      <button class="btn-validate" id="btn-validate-act1" style="display: block; width: 100%; margin-top: 20px; background: #8b5cf6; border: none; color: white; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; text-transform: uppercase;">Submit</button>
    `;

    const optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      const key = btn.getAttribute('data-key');
      btn.onclick = () => {
        q1Answers[key] = !q1Answers[key];
        const checkbox = btn.querySelector('.quiz-option-checkbox');
        if (q1Answers[key]) {
          checkbox.style.backgroundColor = '#8b5cf6';
          checkbox.innerHTML = '✓';
          checkbox.style.display = 'inline-flex';
          checkbox.style.alignItems = 'center';
          checkbox.style.justifyContent = 'center';
          checkbox.style.color = '#fff';
          checkbox.style.fontSize = '12px';
        } else {
          checkbox.style.backgroundColor = 'transparent';
          checkbox.innerHTML = '';
        }
      };
    });

    const validateBtn = document.getElementById('btn-validate-act1');
    validateBtn.onclick = () => {
      const isCorrect = q1Answers.weights && !q1Answers.features && !q1Answers.stops && q1Answers.boundaries;

      if (isCorrect) {
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
                <strong>That’s right!</strong> The models use the same data and settings, but their results differ (boundaries and weights).
                <button class="btn-validate" id="btn-ok-act1" style="display: block; width: 100%; margin-top: 10px; background: #10b981; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;">Continue</button>
            </div>
        `;
        const okBtn = document.getElementById('btn-ok-act1');
        okBtn.onclick = () => {
          renderQuestion2();
        };
      } else {
        let fbMsg = "Try again. Find all the differences between both models.";
        if (q1Answers.features) {
          fbMsg = "The input features change: The input features remain the same in both models.";
        } else if (q1Answers.stops) {
          fbMsg = "The training stops earlier in one model: Both models use the same training process.";
        }
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
                ${fbMsg}
                <button class="btn-validate" id="btn-retry-act1" style="display: block; width: 100%; margin-top: 10px; background: #475569; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;">OK</button>
            </div>
        `;
        const retryBtn = document.getElementById('btn-retry-act1');
        retryBtn.onclick = () => {
          fPanel.innerHTML = '';
        };
      }
    };
  }

  function renderQuestion2() {
    const qPanel = document.getElementById('quiz-question-panel');
    const fPanel = document.getElementById('quiz-feedback-panel');
    if (!qPanel || !fPanel) return;

    fPanel.innerHTML = '';

    qPanel.innerHTML = `
      <div class="quiz-question-wrapper">
          <div class="quiz-question-badge">Quiz 8 - Q2</div>
          <div class="quiz-question-card">
              You observed that the decision boundaries are different in each run, even though nothing was changed. What is the main reason? (Select all correct answers)
          </div>
      </div>
      <div class="quiz-options-container" style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
          <button class="quiz-option-btn" data-key="starts" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">Each run starts from a different set of weights</span>
          </button>
          <button class="quiz-option-btn" data-key="dataset" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The dataset changes slightly between runs</span>
          </button>
          <button class="quiz-option-btn" data-key="random" style="display:flex; align-items:center; gap:10px; width:100%; text-align:left; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:8px; cursor:pointer;">
              <span class="quiz-option-checkbox" style="width:16px; height:16px; border:1px solid #fff; border-radius:3px; display:inline-block; transition: background-color 0.2s;"></span>
              <span class="quiz-option-text">The initial weights are randomly assigned at the start</span>
          </button>
      </div>
      <button class="btn-validate" id="btn-validate-act2" style="display: block; width: 100%; margin-top: 20px; background: #8b5cf6; border: none; color: white; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; text-transform: uppercase;">Submit</button>
    `;

    const optionBtns = qPanel.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      const key = btn.getAttribute('data-key');
      btn.onclick = () => {
        q2Answers[key] = !q2Answers[key];
        const checkbox = btn.querySelector('.quiz-option-checkbox');
        if (q2Answers[key]) {
          checkbox.style.backgroundColor = '#8b5cf6';
          checkbox.innerHTML = '✓';
          checkbox.style.display = 'inline-flex';
          checkbox.style.alignItems = 'center';
          checkbox.style.justifyContent = 'center';
          checkbox.style.color = '#fff';
          checkbox.style.fontSize = '12px';
        } else {
          checkbox.style.backgroundColor = 'transparent';
          checkbox.innerHTML = '';
        }
      };
    });

    const validateBtn = document.getElementById('btn-validate-act2');
    validateBtn.onclick = () => {
      const isCorrect = q2Answers.starts && !q2Answers.dataset && q2Answers.random;

      if (isCorrect) {
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
                <strong>That’s correct!</strong> Each run starts with randomly initialized weights, so the model begins learning from a different starting point and converges to a different solution.
                <button class="btn-validate" id="btn-ok-act2" style="display: block; width: 100%; margin-top: 10px; background: #10b981; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;">Finish the Quiz</button>
            </div>
        `;
        const okBtn = document.getElementById('btn-ok-act2');
        okBtn.onclick = async () => {
          // Complete exercise 7
          localStorage.setItem('quiz_section_2_completed', 'true');
          if (window.StorageService) {
            await window.StorageService.complete(8);
          }
          // Redirect to exercises.html
          window.location.href = `../Page-demo/exercises.html`;
        };
      } else {
        let fbMsg = "Some answers are incorrect.";
        if (q2Answers.dataset) {
          fbMsg = "The dataset does not change. Both models use exactly the same data — the difference comes from how the model is initialized, not from the data itself.";
        }
        fPanel.innerHTML = `
            <div class="feedback-box" style="border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 15px;">
                ${fbMsg}
                <button class="btn-validate" id="btn-retry-act2" style="display: block; width: 100%; margin-top: 10px; background: #475569; border: none; color: white; padding: 8px; border-radius: 6px; font-weight: 700; cursor: pointer; text-transform: uppercase;">OK</button>
            </div>
        `;
        const retryBtn = document.getElementById('btn-retry-act2');
        retryBtn.onclick = () => {
          fPanel.innerHTML = '';
        };
      }
    };
  }

  // Safely execute initialization
  const iframe1 = document.getElementById('iframe-model1');
  if (iframe1) {
    iframe1.addEventListener('load', () => {
      setTimeout(async () => {
        await loadTranslations();
        initQuiz();
      }, 1000);
    });
  }
})();
