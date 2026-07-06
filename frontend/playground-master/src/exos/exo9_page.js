(function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const container = document.getElementById('widget-profil-header');
  if (container) {
    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';
    if (!isLoggedIn || !currentUser) {
      const visitorBtn = document.createElement('a');
      visitorBtn.href = 'Page-demo/register.html';
      visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
      visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">You are not connected!</span > ';
      container.appendChild(visitorBtn);
    } else {
      const initiales = (currentUser.prenom ? currentUser.prenom[0] : '') + (currentUser.nom ? currentUser.nom[0] : '');
      const avatar = document.createElement('div');
      avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); transition: 0.3s;';
      avatar.innerText = initiales.toUpperCase();
      const menu = document.createElement('div');
      menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.9) translateY(-10px); z-index: 1001; transition: 0.3s;';
      const p = currentUser.profil || currentUser.profile || currentUser.role || 'étudiant';
      const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
      menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 17px; font-weight: 800; color: #fff;">${currentUser.prenom || ''} ${currentUser.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${currentUser.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px;">📊 Mon Historique</a>
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; cursor: pointer;">🚪 Logout</div>
        </div>
      `;
      let isOpen = false;
      avatar.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
          menu.style.display = 'block'; setTimeout(() => { menu.style.opacity = '1'; menu.style.transform = 'scale(1) translateY(0)'; }, 10);
        } else {
          menu.style.opacity = '0'; menu.style.transform = 'scale(0.9) translateY(-10px)'; setTimeout(() => menu.style.display = 'none', 300);
        }
      };
      menu.querySelector('#btnFuturLogout').onclick = () => { localStorage.removeItem('isLoggedIn'); window.location.href = 'index.html'; };
      container.appendChild(avatar); container.appendChild(menu);
    }
  }

  // --- Sauvegarde et validation ---
  const btnSauvegarder = document.getElementById('btn-sauvegarder');
  const btnRealise = document.getElementById('btn-realise');

  function saveToStorage(key, exoData) {
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
        btnSauvegarder.innerHTML = '✅ Sauvegardé !';
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
      btnNext.innerText = `Veuillez lire (${readingTime}s)`;
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
        btnRealise.innerHTML = '📝 Faire le Quiz';
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
