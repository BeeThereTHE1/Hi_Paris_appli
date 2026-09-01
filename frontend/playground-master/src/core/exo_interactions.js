(function () {
  class ExoInteractions {
    static ensureStyles() {
      if (document.getElementById('exo-interactions-styles')) return;
      var style = document.createElement('style');
      style.id = 'exo-interactions-styles';
      style.textContent = `
        .tutorial-overlay { position: fixed; inset: 0; background: rgba(2,6,23,.72); display:flex; align-items:center; justify-content:center; z-index:10000; }
        .tutorial-popup { width:min(680px,92vw); background:rgba(15,23,42,.96); border:1px solid rgba(148,163,184,.2); border-radius:12px; padding:18px; color:#e2e8f0; }
        .tutorial-popup h3{ margin:0 0 10px; color:#fff; font-size:20px; }
        .tutorial-popup p{ margin:0 0 12px; line-height:1.5; font-size:14px; }
        .tutorial-btn{ border:0; border-radius:8px; padding:10px 14px; background:#8b5cf6; color:#fff; cursor:pointer; font-weight:700; }
        .tutorial-btn:disabled{ opacity:.45; cursor:not-allowed; }
        .feedback-box { background: rgba(255,255,255,.05); border-left: 4px solid #8b5cf6; padding: 12px; border-radius: 4px; font-size: 13.5px; color: #e2e8f0; line-height: 1.4; margin-top: 10px; }
      `;
      document.head.appendChild(style);
    }

    static showTimedIntro(opts) {
      this.ensureStyles();
      var o = opts || {};
      var seconds = Number.isInteger(o.seconds) ? o.seconds : 8;

      var overlay = document.createElement('div');
      overlay.className = 'tutorial-overlay';
      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.innerHTML = `
        <h3>${o.title || 'Exercise'}</h3>
        <p>${o.text || ''}</p>
        <span id="exo-intro-timer" style="display:block;margin:10px 0;color:#94a3b8;font-size:13px;"></span>
        <button id="exo-intro-next" class="tutorial-btn" disabled>${o.buttonLabel || 'Continue'}</button>
      `;
      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      var timerEl = popup.querySelector('#exo-intro-timer');
      var btn = popup.querySelector('#exo-intro-next');

      function tick() {
        if (seconds > 0) {
          timerEl.textContent = 'Temps de lecture restant : ' + seconds + 's';
          seconds--;
          setTimeout(tick, 1000);
        } else {
          timerEl.style.display = 'none';
          btn.disabled = false;
        }
      }
      tick();

      btn.onclick = function () {
        overlay.remove();
        if (typeof o.onContinue === 'function') o.onContinue();
      };
    }

    static showDefinitionModal(title, text) {
      this.ensureStyles();
      var existing = document.getElementById('definition-popup-overlay');
      if (existing) existing.remove();

      var overlay = document.createElement('div');
      overlay.id = 'definition-popup-overlay';
      overlay.className = 'tutorial-overlay';
      overlay.style.zIndex = '10005';

      var popup = document.createElement('div');
      popup.className = 'tutorial-popup';
      popup.innerHTML = `
        <h3>${title || 'Definition'}</h3>
        <p>${text || ''}</p>
        <button id="def-ok" class="tutorial-btn">OK</button>
      `;
      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      popup.querySelector('#def-ok').onclick = function () { overlay.remove(); };
    }

    static enableQuizButton(btnId, labelHtml) {
      var btn = document.getElementById(btnId);
      if (!btn) return;
      btn.removeAttribute('disabled');
      btn.classList.remove('btn-disabled');
      btn.classList.add('btn-success-ready');
      btn.innerHTML = labelHtml || '<span class="icon">📝</span> Take the quiz';
    }

    static injectIframeInfoTip(opts) {
      var o = opts || {};
      try {
        var iframe = document.getElementById(o.iframeId || 'iframe-playground');
        if (!iframe) return false;
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var host = doc.querySelector(o.hostSelector);
        if (!host) return false;

        if (!doc.getElementById('exo-tip-style')) {
          var style = doc.createElement('style');
          style.id = 'exo-tip-style';
          style.textContent = `
            .info-tip-loss{font-size:11px;color:#8b5cf6;cursor:pointer;margin-left:6px;font-weight:bold;display:inline-block;width:14px;height:14px;line-height:14px;text-align:center;border-radius:50%;border:1px solid #8b5cf6;user-select:none;background:transparent;transition:all .2s}
            .info-tip-loss:hover{background:#8b5cf6;color:#fff}
          `;
          doc.head.appendChild(style);
        }

        if (host.querySelector('.info-tip-loss')) return true;
        var label = host.querySelector('span') || host.firstElementChild || host;
        var tip = doc.createElement('span');
        tip.className = 'info-tip-loss';
        tip.textContent = '?';
        tip.onclick = function (e) {
          e.stopPropagation();
          if (typeof o.onClick === 'function') o.onClick();
        };
        label.parentNode.insertBefore(tip, label.nextSibling);
        return true;
      } catch (_e) {
        return false;
      }
    }
  }

  window.ExoInteractions = ExoInteractions;
})();
