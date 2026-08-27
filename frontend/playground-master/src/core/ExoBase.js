'use strict';

(function (globalScope) {
  function injectSharedStyles(doc) {
    doc = doc || document;
    if (!doc || !doc.head || doc.querySelector('style[data-exobase="true"]')) return;

    var styleEl = doc.createElement('style');
    styleEl.setAttribute('data-exobase', 'true');
    styleEl.textContent = [
      '.flow-arrow { stroke: #FF034D; stroke-width: 8; fill: none; stroke-linecap: round; stroke-dasharray: 16 10; animation: flow-anim 1s linear infinite; }',
      '.flow-arrow-blue { stroke: #004676; stroke-width: 8; fill: none; stroke-linecap: round; stroke-dasharray: 16 10; animation: flow-anim 1.2s linear infinite; }',
      '.flow-arrow-grey { stroke: rgba(148, 163, 184, 0.55); stroke-width: 5; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 10 8; animation: flow-anim-grey 12s linear infinite; }',
      '@keyframes flow-anim { to { stroke-dashoffset: -26; } }',
      '@keyframes flow-anim-grey { to { stroke-dashoffset: -36; } }',
      '.step-card { position: fixed; background: rgba(15, 23, 42, 0.95); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 12px; width: 220px; color: #fff; z-index: 10010; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); font-family: "Inter", sans-serif; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); pointer-events: auto; }',
      '.step-card.inactive { opacity: 0.35; transform: scale(0.95); pointer-events: none; }',
      '.step-card.active { opacity: 1; transform: scale(1.02); border-color: #004676; box-shadow: 0 12px 30px rgba(0, 70, 118, 0.4), 0 0 15px rgba(0, 70, 118, 0.2); pointer-events: auto; }',
      '.step-card h3 { margin-top: 0; font-size: 13px; font-weight: 800; color: #FF034D; margin-bottom: 6px; }',
      '.step-card p { font-size: 10.5px; line-height: 1.4; color: #cbd5e1; margin-bottom: 8px; }',
      '.step-card .btn-right { display: flex; justify-content: flex-end; }',
      '.step-card button { background: #10b981; color: white; border: none; padding: 4px 12px; border-radius: 5px; font-weight: 700; cursor: pointer; font-size: 11px; transition: all 0.2s; }',
      '.step-card button:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4); }'
    ].join('\n');
    doc.head.appendChild(styleEl);
  }

  function safeUser() {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (_error) {
      return null;
    }
  }

  function getFallbackCoords(selector, iframeId) {
    var targetIframeId = iframeId || 'iframe-playground';
    var iframe = document.getElementById(targetIframeId);
    if (!iframe) return null;
    var iframeRect = iframe.getBoundingClientRect();
    try {
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      var el = iframeDoc.querySelector(selector);
      if (!el) return null;
      var elRect = el.getBoundingClientRect();
      return {
        cx: iframeRect.left + elRect.left + elRect.width / 2,
        cy: iframeRect.top + elRect.top + elRect.height / 2,
        left: iframeRect.left + elRect.left,
        right: iframeRect.left + elRect.right,
        top: iframeRect.top + elRect.top,
        bottom: iframeRect.top + elRect.bottom,
        width: elRect.width,
        height: elRect.height
      };
    } catch (_error) {
      return null;
    }
  }

  function clearOverlayById(overlayId) {
    var targetOverlayId = overlayId || 'arrow-overlay';
    var overlay = document.getElementById(targetOverlayId);
    if (!overlay) return;
    overlay.querySelectorAll('path, circle').forEach(function (element) { element.remove(); });
  }

  var CommonJsExoBase = null;
  if (typeof module !== 'undefined' && module.exports) {
    try {
      CommonJsExoBase = require('../../../../backend/services/ml-playground/src/core/ExoBase');
    } catch (_error) {
      CommonJsExoBase = null;
    }
  }

  class BrowserExoBase {
    constructor(options) {
      options = options || {};
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.currentUser = safeUser();
      this.setupGlobalStyles();
      this.setupProfileHeader(options.profile);
      this.setupBackgroundAnimation(options.animation);
    }

    setupGlobalStyles() {
      injectSharedStyles(document);
    }

    setupProfileHeader(profileOptions) {
      if (globalScope.ExoCommonPage && typeof globalScope.ExoCommonPage.initProfileWidget === 'function') {
        globalScope.ExoCommonPage.initProfileWidget(profileOptions || {});
      }
    }

    setupBackgroundAnimation(animationOptions) {
      if (globalScope.ExoCommonPage && typeof globalScope.ExoCommonPage.initBackgroundAnimation === 'function') {
        globalScope.ExoCommonPage.initBackgroundAnimation(animationOptions || {});
      }
    }

    getElementCoords(selector, iframeId) {
      return getFallbackCoords(selector, iframeId);
    }

    clearOverlay(overlayId) {
      clearOverlayById(overlayId);
    }

    saveToStorage(key, exoData) {
      if (globalScope.ExoCommonPage && typeof globalScope.ExoCommonPage.saveToStorage === 'function') {
        return globalScope.ExoCommonPage.saveToStorage(key, exoData);
      }
      var user = this.currentUser;
      if (!user || !user.email) return false;
      var userKey = key + '_' + user.email;
      var list = JSON.parse(localStorage.getItem(userKey) || '[]');
      if (!list.find(function (entry) { return entry.id === exoData.id; })) {
        list.push(exoData);
        localStorage.setItem(userKey, JSON.stringify(list));
        return true;
      }
      return false;
    }

    getCurrentUserIdentifier() {
      return this.currentUser && (this.currentUser.id || this.currentUser.email) || null;
    }

    showErrorMessage(message) {
      if (!message) return;
      if (typeof alert === 'function') {
        alert(message);
      }
    }
  }

  var ExportedExoBase = CommonJsExoBase || BrowserExoBase;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExportedExoBase;
  }
  globalScope.MLPlaygroundExoBase = ExportedExoBase;
})(typeof window !== 'undefined' ? window : globalThis);
