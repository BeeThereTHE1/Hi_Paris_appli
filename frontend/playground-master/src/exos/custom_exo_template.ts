// @ts-nocheck

// 1. Initialisation du Profil
    async function initProfileWidget() {
      const container = document.getElementById('widget-profil-header');
      if (!container) return;

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const currentUserStr = localStorage.getItem('currentUser');
      let currentUser = null;
      try {
        currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
      } catch (e) {
        console.error(e);
      }

      if (!isLoggedIn || !currentUser || !currentUser.email) {
        container.innerHTML = `<a href="Page-demo/login_with_catalog.html" class="btn-header">Connexion</a>`;
        return;
      }

      container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';

      const initials = (((currentUser.prenom || "")[0] || "") + ((currentUser.nom || "")[0] || "")).toUpperCase() || "U";
      const role = (currentUser.role || currentUser.profil || 'étudiant').toUpperCase();
      let badgeHtml = '';

      try {
        if (role.includes('TEACH') || role.includes('ENS')) {
          const res = await fetch(`/api/submissions/teacher/${currentUser.id}/count`, { headers: { 'x-user-email': currentUser.email } });
          const { count } = await res.json();
          if (count > 0) badgeHtml = `<span class="badge-notif">${count}</span>`;
        } else {
          const res = await fetch(`/api/submissions/student/${currentUser.id}`);
          const subs = await res.json();
          const feedbackCount = subs.filter(s => s.status !== 'PENDING').length;
          if (feedbackCount > 0) badgeHtml = `<span class="badge-notif">${feedbackCount}</span>`;
        }
      } catch (e) { console.error("Erreur badge:", e); }

      const avatar = document.createElement('div');
      avatar.id = 'avatar-btn';
      avatar.style.cssText = 'position: relative; width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, rgb(16, 185, 129), rgb(59, 130, 246)); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255, 255, 255, 0.2); box-shadow: rgba(16, 185, 129, 0.4) 0px 0px 20px, rgba(255, 255, 255, 0.3) 0px 0px 10px inset; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); transform: scale(1) rotate(0deg);';
      avatar.innerHTML = `${initials}${badgeHtml}`;

      avatar.onmouseover = () => avatar.style.transform = 'scale(1.1) rotate(5deg)';
      avatar.onmouseout = () => avatar.style.transform = 'scale(1) rotate(0deg)';

      const menu = document.createElement('div');
      menu.id = 'profile-menu';
      menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0px; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset; overflow: hidden; transform-origin: right top; transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';

      const typeProfil = role.includes('TEACH') || role.includes('ENS') ? 'TEACHER' : role;

      menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);">
          <div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">${currentUser.prenom} ${currentUser.nom}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${currentUser.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 Profil ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="Page-demo/historique.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📊</span> Mon Historique
          </a>
          <a href="statsetudiant.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">📈</span> Mes Statistiques
          </a>
          <div id="logout-btn" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateX(0)';">
            <span style="font-size: 16px;">🚪</span> Déconnexion
          </div>
        </div>
      `;

      let isOpen = false;
      avatar.onclick = (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        if (isOpen) {
          menu.style.display = 'block';
          setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.transform = 'scale(1) translateY(0)';
            menu.style.pointerEvents = 'auto';
          }, 10);
        } else {
          menu.style.opacity = '0';
          menu.style.transform = 'scale(0.9) translateY(-10px)';
          menu.style.pointerEvents = 'none';
          setTimeout(() => menu.style.display = 'none', 300);
        }
      };

      document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && isOpen) {
          isOpen = false;
          menu.style.opacity = '0';
          menu.style.transform = 'scale(0.9) translateY(-10px)';
          menu.style.pointerEvents = 'none';
          setTimeout(() => menu.style.display = 'none', 300);
        }
      });

      menu.querySelector('#logout-btn').onclick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      };

      container.innerHTML = '';
      container.appendChild(avatar);
      container.appendChild(menu);
    }

    // Fermeture du menu si clic ailleurs
    document.addEventListener('click', () => {
      const menu = document.querySelector('.profile-menu');
      if (menu) menu.classList.remove('show');
    });

    const urlParams = new URLSearchParams(window.location.search);
    const exoId = urlParams.get('id');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const email = (user.email || '').toLowerCase();
    const allOfficial = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
    const allSaved = JSON.parse(localStorage.getItem(`saved_exercises_${email}`) || '[]');
    const allPending = JSON.parse(localStorage.getItem('pending_validations') || '[]');
    const allSubmitted = JSON.parse(localStorage.getItem(`submitted_exercises_${email}`) || '[]');

    // On donne la priorité aux brouillons (allSaved) sur les officiels (allOfficial)
    // pour que l'auteur voie toujours ses dernières modifications.
    let allExos = [...allSaved, ...allOfficial, ...allPending, ...allSubmitted];
    let exo = null;

    // Si l'ID est absent de l'URL, on essaie de prendre le plus récent (dernier de la liste)
    if (!exoId && allExos.length > 0) {
      console.warn("ID manquant dans l'URL, tentative avec le dernier exercice trouvé.");
      const lastExo = allExos[allExos.length - 1];
      if (lastExo) exo = lastExo;
    }

    // Recherche par ID (comparaison flexible string/number)
    if (!exo && exoId) {
      exo = allExos.find(e => e && String(e.id).trim() === String(exoId).trim());
    }

    // Fallback : recherche agressive dans TOUT le localStorage si non trouvé
    if (!exo && exoId) {
      console.log("Recherche agressive pour l'ID:", exoId);
      Object.keys(localStorage).forEach(key => {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(data)) {
            const found = data.find(e => e && String(e.id).trim() === String(exoId).trim());
            if (found) {
              console.log("Exercice trouvé dans la clé :", key);
              exo = found;
            }
          }
        } catch (err) {
          // Pas un JSON valide, on ignore
        }
      });
    }

    const currentEmail = (user.email || '').toLowerCase().trim();

    // 3. Fallback : Si on vient du Studio (pas d'ID mais données en localStorage)
    if (!exo && !exoId) {
      const tempCss = localStorage.getItem('custom_exo_css');
      const tempHash = localStorage.getItem('custom_exo_hash');
      if (tempCss || tempHash) {
        console.log("Mode Prévisualisation activé (données temporaires du Studio)");
        exo = {
          id: 'preview',
          title: "Prévisualisation Studio",
          description: "Ceci est un aperçu de votre configuration actuelle.",
          css: tempCss || "",
          hash: tempHash || "",
          isCustom: true,
          authorEmail: currentEmail // Par défaut, l'utilisateur actuel est l'auteur
        };
      }
    }

    // 4. Détermination robuste si c'est un brouillon ou si l'utilisateur est l'auteur
    const isSavedDraft = exo && allSaved.some(e => String(e.id) === String(exo.id));
    const isAuthor = exo && exo.authorEmail && String(exo.authorEmail).toLowerCase().trim() === currentEmail;

    // On est en mode édition si c'est un brouillon OU si l'utilisateur connecté est l'auteur
    // OU si c'est une prévisualisation du studio
    const isDraft = isSavedDraft || (isAuthor && !allOfficial.some(e => String(e.id) === String(exo.id))) || (exo?.id === 'preview');

    console.log("--- Debug Mode Édition ---");
    console.log("Email actuel:", currentEmail);
    console.log("ID Exo:", exo ? exo.id : 'aucun');
    console.log("Est dans les brouillons:", isSavedDraft);
    console.log("Est l'auteur original:", isAuthor);
    console.log("Résultat Mode Édition (isDraft):", isDraft);
    console.log("--------------------------");

    if (exo) {
      console.log("Exercice chargé avec succès:", exo);
      document.getElementById('page-title').innerText = exo.title || "Exercice";
      document.getElementById('display-title').innerText = exo.title || "Exercice";

      let conditionText = "";
      if (exo.quiz && exo.quiz.question) {
        conditionText = `<b>Objectif :</b> ${exo.description || 'Non défini'}<br><br><b>Challenge :</b> Répondre correctement au quiz final.`;
      } else {
        conditionText = `<b>Objectif :</b> ${exo.description || 'Non défini'}<br><br><b>Condition :</b> Atteindre une perte de ${exo.targetValue || '0.050'} (${exo.condition || 'test loss'})`;
      }
      document.getElementById('display-desc').innerHTML = conditionText;

      const iframe = document.getElementById('exo-frame');
      const hash = exo.hash || '';
      const css = exo.css || '';

      iframe.src = 'preview_index.html' + hash;
      iframe.onload = () => {
        iframe.contentWindow.postMessage({ type: 'update-css', css: css }, '*');
      };
    } else {
      console.error("Impossible de trouver l'exercice ID:", exoId);
      document.getElementById('display-title').innerText = "Exercice introuvable";
      document.getElementById('display-desc').innerHTML = `
        Désolé, nous n'avons pas pu trouver l'exercice avec l'ID <b>${exoId || 'inconnu'}</b>.<br><br>
        <b>Causes possibles :</b><br>
        - L'exercice a été créé sur un autre navigateur ou appareil.<br>
        - Vous avez vidé le cache de votre navigateur.<br>
        - Vous n'êtes pas connecté avec le compte qui a créé l'exercice (compte actuel : <i>${user.email || 'non connecté'}</i>).
      `;
    }

    // 2. Logique de réussite
    const btnRealise = document.getElementById('btn-realise');
    let selectedAnswerIndex = -1;

    btnRealise.onclick = () => {
      // Pour un brouillon, on veut TOUJOURS ouvrir la modale pour pouvoir éditer le QCM
      // Même si le quiz n'existe pas encore
      if (isDraft || (exo && exo.quiz && exo.quiz.question)) {
        openQuizModal();
      } else {
        validateExercise();
      }
    };

    function openQuizModal() {
      const modal = document.getElementById('quiz-modal');
      const qContainer = document.getElementById('quiz-modal-question');
      const aContainer = document.getElementById('quiz-modal-answers');
      const confirmBtn = document.querySelector('.btn-modal-primary');

      selectedAnswerIndex = -1;
      aContainer.innerHTML = '';

      if (isDraft) {
        // Mode ÉDITION pour les brouillons
        // Initialisation par défaut si le quiz n'existe pas encore
        if (!exo.quiz) {
          exo.quiz = { question: "", answers: [{ text: "", isCorrect: true }, { text: "", isCorrect: false }] };
        }

        qContainer.innerHTML = `<textarea id="edit-quiz-question" class="quiz-edit-input" rows="3" placeholder="Insérez votre question ici...">${exo.quiz.question || ''}</textarea>`;
        confirmBtn.innerText = "Enregistrer & Valider";

        exo.quiz.answers.forEach((ans, idx) => {
          const opt = document.createElement('div');
          opt.className = 'quiz-opt editable';
          if (ans.isCorrect) {
            opt.classList.add('selected');
            selectedAnswerIndex = idx;
          }

          opt.innerHTML = `
            <div class="radio-circle" onclick="selectCorrectAnswer(${idx})"></div>
            <input type="text" class="answer-text-input" value="${ans.text || ''}" placeholder="Option ${idx + 1}...">
          `;
          aContainer.appendChild(opt);
        });

        // Mise à jour des actions de la modale pour les brouillons
        const actions = document.querySelector('.modal-actions');
        actions.innerHTML = `
          <button onclick="closeQuizModal()" class="btn-modal btn-modal-secondary">Annuler</button>
          <button onclick="submitQuiz(false)" class="btn-modal btn-modal-secondary">Enregistrer le brouillon</button>
          <button onclick="submitQuiz(true)" class="btn-modal btn-modal-primary">Publier au Catalogue 🚀</button>
        `;

        // Bouton pour ajouter une réponse
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-modal btn-modal-secondary';
        addBtn.style.width = '100%';
        addBtn.style.marginTop = '10px';
        addBtn.innerText = "+ Ajouter une option";
        addBtn.onclick = () => {
          const newIdx = exo.quiz.answers.length;
          exo.quiz.answers.push({ text: "", isCorrect: false });
          openQuizModal(); // On rafraîchit pour afficher la nouvelle ligne
        };
        aContainer.appendChild(addBtn);
      } else {
        // Mode LECTURE SEULE pour les publiés
        qContainer.innerText = exo.quiz.question;

        // On remet les actions par défaut pour le mode lecture
        const actions = document.querySelector('.modal-actions');
        actions.innerHTML = `
          <button onclick="closeQuizModal()" class="btn-modal btn-modal-secondary">Annuler</button>
          <button onclick="submitQuiz()" class="btn-modal btn-modal-primary">Confirmer ma réponse</button>
        `;

        exo.quiz.answers.forEach((ans, idx) => {
          const opt = document.createElement('div');
          opt.className = 'quiz-opt';
          opt.innerHTML = `<div class="radio-circle"></div> <span>${ans.text}</span>`;
          opt.onclick = () => {
            document.querySelectorAll('.quiz-opt').forEach(el => el.classList.remove('selected'));
            opt.classList.add('selected');
            selectedAnswerIndex = idx;
          };
          aContainer.appendChild(opt);
        });
      }

      modal.classList.add('open');
    }

    function selectCorrectAnswer(idx) {
      selectedAnswerIndex = idx;
      const opts = document.querySelectorAll('.quiz-opt');
      opts.forEach((opt, i) => {
        if (i === idx) opt.classList.add('selected');
        else opt.classList.remove('selected');
      });
    }

    function closeQuizModal() {
      document.getElementById('quiz-modal').classList.remove('open');
    }

    function submitQuiz(publish = false) {
      if (selectedAnswerIndex === -1) {
        alert("Veuillez sélectionner la bonne réponse.");
        return;
      }

      if (isDraft) {
        // Logique de sauvegarde pour les brouillons
        const newQuestion = document.getElementById('edit-quiz-question').value;
        const answerInputs = document.querySelectorAll('.answer-text-input');
        const newAnswers = [];

        answerInputs.forEach((input, idx) => {
          newAnswers.push({
            text: input.value,
            isCorrect: idx === selectedAnswerIndex
          });
        });

        exo.quiz.question = newQuestion;
        exo.quiz.answers = newAnswers;

        saveQuizEdits();

        if (publish) {
          publishExercise();
        } else {
          alert("Brouillon mis à jour avec succès ! ✨");
          closeQuizModal();
        }
      } else {
        // Logique classique pour les publiés
        const answer = exo.quiz.answers[selectedAnswerIndex];
        if (answer.isCorrect) {
          alert("Bravo ! Bonne réponse ✨. L'exercice est maintenant marqué comme réussi.");
          closeQuizModal();
          validateExercise();
        } else {
          alert("Dommage, ce n'est pas la bonne réponse. Réessayez pour valider l'exercice !");
        }
      }
    }

    function saveQuizEdits() {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const email = (user.email || '').toLowerCase().trim();

      let updatedCount = 0;

      // 1. Mise à jour dans les brouillons personnels
      const draftKey = `saved_exercises_${email}`;
      let drafts = JSON.parse(localStorage.getItem(draftKey) || '[]');
      const dIdx = drafts.findIndex(e => String(e.id) === String(exo.id));
      if (dIdx !== -1) {
        drafts[dIdx] = exo;
        localStorage.setItem(draftKey, JSON.stringify(drafts));
        updatedCount++;
      }

      // 2. Mise à jour dans le catalogue officiel (si on est l'auteur)
      let official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
      const oIdx = official.findIndex(e => String(e.id) === String(exo.id));
      if (oIdx !== -1) {
        // On ne met à jour que si on est l'auteur (sécurité)
        if (exo.authorEmail && exo.authorEmail.toLowerCase().trim() === email) {
          official[oIdx] = exo;
          localStorage.setItem('official_custom_exercises', JSON.stringify(official));
          updatedCount++;
        }
      }

      console.log(`Mise à jour effectuée dans ${updatedCount} liste(s)`);
      return updatedCount > 0;
    }

    function publishExercise() {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const profil = (user.role || user.profil || '').toLowerCase();

      // 1. Préparation des données (on s'assure d'avoir l'auteur)
      if (!exo.author) exo.author = `${user.prenom || ''} ${user.nom || ''}`;
      if (!exo.authorEmail) exo.authorEmail = user.email;

      // 2. Ajout au catalogue officiel
      let official = JSON.parse(localStorage.getItem('official_custom_exercises') || '[]');
      // On évite les doublons si déjà publié
      if (!official.find(e => String(e.id) === String(exo.id))) {
        official.push(exo);
        localStorage.setItem('official_custom_exercises', JSON.stringify(official));
      }

      // 3. Optionnel : Retirer des brouillons si on veut un transfert propre
      const email = (user.email || '').toLowerCase();
      const draftKey = `saved_exercises_${email}`;
      let drafts = JSON.parse(localStorage.getItem(draftKey) || '[]');
      drafts = drafts.filter(e => String(e.id) !== String(exo.id));
      localStorage.setItem(draftKey, JSON.stringify(drafts));

      alert("Félicitations ! Votre exercice est maintenant publié dans le catalogue officiel. 🚀");
      window.location.href = 'Page-demo/exercises.html';
    }

    function validateExercise() {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const key = `completed_exercises_${user.email}`;
      let list = JSON.parse(localStorage.getItem(key) || '[]');
      if (!list.find(e => e.id == exoId)) {
        list.push({ ...exo, date: new Date().toLocaleDateString('fr-FR') });
        localStorage.setItem(key, JSON.stringify(list));
      }
      btnRealise.innerHTML = '✨ Validé !';
      // Redirection supprimée
    btnRealise.disabled = true;
    }

    // 3. Écoute du bouton "Valider" interne au Playground
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'PLAYGROUND_VALIDATE_CLICK') {
        console.log("Validation déclenchée depuis le Playground");
        btnRealise.click(); // On réutilise la logique du bouton externe
      }
    });

    // 3. Sauvegarde
    document.getElementById('btn-sauvegarder').onclick = (e) => {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const key = `saved_exercises_${user.email}`;
      let list = JSON.parse(localStorage.getItem(key) || '[]');
      if (!list.find(e => e.id == exoId)) {
        list.push({ ...exo, date: new Date().toLocaleDateString('fr-FR') });
        localStorage.setItem(key, JSON.stringify(list));
      }
      e.target.innerHTML = '✅ Enregistré !';
    };
    // Initialisation au chargement
    document.addEventListener('DOMContentLoaded', () => {
      initProfileWidget();
    });

// Expose functions to global window object for HTML onclick events
window.closeQuizModal = closeQuizModal;
window.submitQuiz = submitQuiz;
window.selectCorrectAnswer = selectCorrectAnswer;
window.initProfileWidget = initProfileWidget;
