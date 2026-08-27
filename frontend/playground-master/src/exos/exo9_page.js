window.ExoCommonPage && window.ExoCommonPage.initProfileWidget({ showStats: false, historyLabel: 'Mon Historique', logoutLabel: 'Logout' });
(function () {

  // --- Sauvegarde et validation ---
  const btnSauvegarder = document.getElementById('btn-sauvegarder');
  const btnRealise = document.getElementById('btn-realise');

  function saveToStorage(key, exoData) {
    if (window.ExoCommonPage) {
      return window.ExoCommonPage.saveToStorage(key, exoData);
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.email) return false;
    const userKey = `${key}_${user.email}`;
    const list = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (!list.find(e => e.id === exoData.id)) {
      list.push(exoData);
      localStorage.setItem(userKey, JSON.stringify(list));
      return true;
    }
    return false;
  }

  if (btnSauvegarder) {
    btnSauvegarder.onclick = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) { window.location.href = 'Page-demo/register.html'; return; }
      const now = new Date().toLocaleDateString('fr-FR');
      const saved = saveToStorage('saved_exercises', { id: 9, date: now });
      if (saved) {
        btnSauvegarder.innerHTML = '✅ Saved !';
        btnSauvegarder.style.opacity = '0.7';
        btnSauvegarder.disabled = true;
      } else {
        alert("This exercise is already in your profile.");
      }
    };
  }

  if (btnRealise) {
    btnRealise.onclick = () => {
      window.location.href = 'exoquiz/exo9_quiz.html';
    };
  }

  // --- Scenario management / Guidage ---
  const btnNext = document.getElementById("btnNext");
  const readingOverlay = document.getElementById("readingOverlay");
  const guideTopBox = document.getElementById("guide-top-box");
  const guideTextContent = document.getElementById("guide-text-content");
  const btnGuideOk = document.getElementById("btn-guide-ok");
  const instructionStickyBar = document.getElementById("instruction-sticky-bar");

  let readingTime = 3;
  let timer = setInterval(() => {
    readingTime--;
    if (readingTime <= 0) {
      clearInterval(timer);
      btnNext.innerText = "Next";
      btnNext.style.opacity = "1";
      btnNext.style.pointerEvents = "auto";
    } else {
      btnNext.innerText = `Please read (${readingTime}s)`;
    }
  }, 1000);

  btnNext.onclick = () => {
    readingOverlay.style.display = "none";
    instructionStickyBar.style.display = "block";
    startGuideSequence();
  };

  const steps = [
    {
      text: "- First, let’s review the key features you’ll require for this exercise",
      label: "OK(1)",
      highlightId: "main-part"
    },
    {
      text: "- Move the cursor and observe the effect on the dataset",
      label: "OK(2)",
      highlightId: "iframe-model1",
      action: "show_noise_highlight"
    },
    {
      text: "- The training loss measures how well the model fits the training dataset. It represents the difference between the model’s predictions and the true values during training",
      label: "OK(3)",
      highlightId: "iframe-model1"
    },
    {
      text: "- Noise is random variation added to the data that makes patterns less separable, more overlapping.",
      label: "OK(4)",
      highlightId: "iframe-model2",
      action: "show_noise_highlight_m2"
    },
    {
      text: "- Now, run the models twice with noise set at 5 and 50, for up to 3,000 epochs, and compare their training behavior",
      label: "OK(5)",
      highlightId: "main-part",
      action: "restore_noise"
    }
  ];

  let currentStepIndex = 0;

  function startGuideSequence() {
    guideTopBox.style.display = "block";
    guideTopBox.style.position = "absolute";
    showStep(currentStepIndex);
  }

  function showStep(index) {
    if (index >= steps.length) {
      guideTopBox.style.display = "none";
      // Activer les contrôles des simulateurs
      document.querySelectorAll(".exo-frame").forEach(frame => {
        frame.style.pointerEvents = "auto";
      });
      // Allow success de l'exercice après le guide
      if (btnRealise) {
        btnRealise.disabled = false;
        btnRealise.classList.remove('btn-disabled');
        btnRealise.classList.add('btn-success-ready');
        btnRealise.innerHTML = '📝 Take the Quiz';
        btnRealise.onclick = () => {
          window.location.href = 'exoquiz/exo9_quiz.html';
        };
      }
      return;
    }

    const step = steps[index];
    guideTextContent.innerText = step.text;
    btnGuideOk.innerText = step.label;

    // Highlighting et positionnement dynamique près du composant cible
    const targetEl = document.getElementById(step.highlightId);
    if (targetEl) {
      targetEl.style.outline = "3px solid #FF034D";
      targetEl.style.boxShadow = "0 0 20px rgba(255, 3, 77, 0.6)";

      // Calculer l'emplacement pour placer le pop-up à côté/sur le composant décrit
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      if (step.highlightId === "main-part") {
        // Au milieu si c'est la vue globale
        guideTopBox.style.top = `${rect.top + scrollTop + 60}px`;
        guideTopBox.style.left = "50%";
        guideTopBox.style.transform = "translateX(-50%)";
      } else {
        // Positionner à droite ou au dessus de l'iframe concernée pour désigner les contrôles
        guideTopBox.style.top = `${rect.top + scrollTop + 20}px`;
        guideTopBox.style.left = `${rect.left + scrollLeft + (rect.width / 4)}px`;
        guideTopBox.style.transform = "none";
      }
    }

    // Actions spécifiques
    if (step.action === "show_noise_highlight" || step.action === "show_noise_highlight_m2") {
      const activeIframe = document.getElementById(step.highlightId);
      if (activeIframe && activeIframe.contentWindow) {
        activeIframe.contentWindow.postMessage({ type: 'HIGHLIGHT_NOISE_CONTROL' }, '*');
      }
    } else if (step.action === "restore_noise") {
      const model1 = document.getElementById("iframe-model1");
      const model2 = document.getElementById("iframe-model2");
      if (model1 && model1.contentWindow) {
        model1.contentWindow.postMessage({ type: 'SET_NOISE_VAL', value: 5 }, '*');
      }
      if (model2 && model2.contentWindow) {
        model2.contentWindow.postMessage({ type: 'SET_NOISE_VAL', value: 50 }, '*');
      }
    }

    btnGuideOk.onclick = () => {
      if (targetEl) {
        targetEl.style.outline = "none";
        targetEl.style.boxShadow = "none";
      }
      currentStepIndex++;
      showStep(currentStepIndex);
    };
  }

  // Désactiver les contrôles du simulateur pendant le guide
  document.querySelectorAll(".exo-frame").forEach(frame => {
    frame.style.pointerEvents = "none";
  });

})();
