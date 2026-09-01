(function () {
  'use strict';

  var ExoPageBase = window.MLPlaygroundExoPageBase;

  if (!ExoPageBase) {
    console.error('MLPlaygroundExoPageBase is not available for exercise 11.');
    return;
  }

  class Exo11 extends ExoPageBase {
    constructor() {
      super({
        exoId: 11,
        quizUrl: 'exoquiz/exo11_quiz.html',
        iframeId: 'iframe-playground',
        saveBtnId: 'btn-sauvegarder',
        doneBtnId: 'btn-realise'
      });

      this.translations = null;
      this.statementCorrectStates = [false, false];
      this.questions = [
        { statement: 'Training loss measures the error on training data.', answer: true, feedback_true: 'Correct.', feedback_false: 'Incorrect.' },
        { statement: 'Convergence always means correct solution.', answer: false, feedback_true: 'Incorrect.', feedback_false: 'Correct.' }
      ];

      this.init();
    }

    async init() {
      await this.initProgressContext();
      this.wireStandardActionButtons();
      this.onIframeLoad(async () => {
        await this.loadTranslations();
        this.startTutorial();
      }, 1200);
    }

    async loadTranslations() {
      try {
        var res = await fetch('texte.json');
        if (!res.ok) throw new Error('Cannot load texte.json');
        var data = await res.json();
        this.translations = data && data.exercises ? data.exercises.exercise_11 : null;
      } catch (e) {
        console.warn('Translation load failed (exo11):', e);
      }
    }

    startTutorial() {
      var title = (this.translations && this.translations.title) || 'Exercise 11';
      var text = 'Open the learning-rate definition in the simulator, then complete Activity 1.';

      var handledByCore = this.showTimedIntro({
        title: title,
        text: text,
        seconds: 6,
        buttonLabel: 'Continue',
        onContinue: () => this.renderActivity1()
      });

      if (!handledByCore) this.renderActivity1();
    }

    renderActivity1() {
      var panels = this.getPanels('quiz-question-panel', 'quiz-feedback-panel');
      var qPanel = panels.questionPanel;
      var fPanel = panels.feedbackPanel;
      if (!qPanel || !fPanel) return;

      var questions = this.questions;
      if (this.translations && this.translations.activity_1 && Array.isArray(this.translations.activity_1.statements)) {
        questions = this.translations.activity_1.statements;
      }

      this.statementCorrectStates = questions.map(function () { return false; });

      qPanel.innerHTML = questions.map(function (q, i) {
        return (
          '<div class="true-false-row-card" data-idx="' + i + '">' +
            '<div style="margin-bottom:8px;">' + q.statement + '</div>' +
            '<button class="btn-choice" data-v="true">True</button> ' +
            '<button class="btn-choice" data-v="false">False</button>' +
          '</div>'
        );
      }).join('');

      var rows = qPanel.querySelectorAll('.true-false-row-card');
      rows.forEach((row) => {
        var idx = Number(row.getAttribute('data-idx'));
        var q = questions[idx];
        var tBtn = row.querySelector('[data-v="true"]');
        var fBtn = row.querySelector('[data-v="false"]');

        var answer = (choice) => {
          var isCorrect = choice === q.answer;
          fPanel.innerHTML = '<div class="feedback-box">' + (choice ? q.feedback_true : q.feedback_false) + '</div>';
          if (!isCorrect) return;

          this.statementCorrectStates[idx] = true;
          tBtn.disabled = true;
          fBtn.disabled = true;
          row.classList.add('correct-locked');

          if (this.statementCorrectStates.every(Boolean)) {
            this.unlockQuizButton('btn-realise', '<span class="icon">📝</span> Take the quiz');
          }
        };

        if (tBtn) tBtn.onclick = function () { answer(true); };
        if (fBtn) fBtn.onclick = function () { answer(false); };
      });
    }
  }

  window.exo11Page = new Exo11();
})();
