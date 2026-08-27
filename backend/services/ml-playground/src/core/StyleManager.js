/**
 * StyleManager.js
 * Handles dynamic injection of shared CSS rules needed by all exercise pages.
 * All rules are injected once into <head> and are idempotent (safe to call
 * multiple times).
 */

'use strict';

var COLORS = require('../utils/constants').COLORS;

var StyleManager = {
  /**
   * Injects the global shared stylesheet into the host document <head>.
   * Calling this more than once is safe – the style tag is only appended
   * once (identified by data-exobase="true").
   *
   * @param {Document} [doc=document]
   * @returns {void}
   */
  injectGlobalStyles: function (doc) {
    if (!doc) { doc = document; }
    if (doc.querySelector('style[data-exobase="true"]')) return;

    var styleEl = doc.createElement('style');
    styleEl.setAttribute('data-exobase', 'true');
    styleEl.textContent = [
      '.flow-arrow {',
      '  stroke: ' + COLORS.ACCENT + ';',
      '  stroke-width: 8;',
      '  fill: none;',
      '  stroke-linecap: round;',
      '  stroke-dasharray: 16 10;',
      '  animation: flow-anim 1s linear infinite;',
      '}',
      '.flow-arrow-blue {',
      '  stroke: ' + COLORS.BRAND_BLUE + ';',
      '  stroke-width: 8;',
      '  fill: none;',
      '  stroke-linecap: round;',
      '  stroke-dasharray: 16 10;',
      '  animation: flow-anim 1.2s linear infinite;',
      '}',
      '.flow-arrow-grey {',
      '  stroke: rgba(148, 163, 184, 0.55);',
      '  stroke-width: 5;',
      '  fill: none;',
      '  stroke-linecap: round;',
      '  stroke-linejoin: round;',
      '  stroke-dasharray: 10 8;',
      '  animation: flow-anim-grey 12s linear infinite;',
      '}',
      '@keyframes flow-anim {',
      '  to { stroke-dashoffset: -26; }',
      '}',
      '@keyframes flow-anim-grey {',
      '  to { stroke-dashoffset: -36; }',
      '}',
      '.step-card {',
      '  position: fixed;',
      '  background: rgba(15, 23, 42, 0.95);',
      '  border: 1.5px solid rgba(255, 255, 255, 0.15);',
      '  border-radius: 12px;',
      '  padding: 12px;',
      '  width: 220px;',
      '  color: #fff;',
      '  z-index: 10010;',
      '  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);',
      '  font-family: "Inter", sans-serif;',
      '  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);',
      '  pointer-events: auto;',
      '}',
      '.step-card.inactive {',
      '  opacity: 0.35;',
      '  transform: scale(0.95);',
      '  pointer-events: none;',
      '}',
      '.step-card.active {',
      '  opacity: 1;',
      '  transform: scale(1.02);',
      '  border-color: ' + COLORS.BRAND_BLUE + ';',
      '  box-shadow: 0 12px 30px rgba(0, 70, 118, 0.4), 0 0 15px rgba(0, 70, 118, 0.2);',
      '  pointer-events: auto;',
      '}',
      '.step-card h3 {',
      '  margin-top: 0;',
      '  font-size: 13px;',
      '  font-weight: 800;',
      '  color: ' + COLORS.ACCENT + ';',
      '  margin-bottom: 6px;',
      '}',
      '.step-card p {',
      '  font-size: 10.5px;',
      '  line-height: 1.4;',
      '  color: #cbd5e1;',
      '  margin-bottom: 8px;',
      '}',
      '.step-card .btn-right {',
      '  display: flex;',
      '  justify-content: flex-end;',
      '}',
      '.step-card button {',
      '  background: #10b981;',
      '  color: white;',
      '  border: none;',
      '  padding: 4px 12px;',
      '  border-radius: 5px;',
      '  font-weight: 700;',
      '  cursor: pointer;',
      '  font-size: 11px;',
      '  transition: all 0.2s;',
      '}',
      '.step-card button:hover {',
      '  transform: translateY(-1px);',
      '  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);',
      '}',
    ].join('\n');

    doc.head.appendChild(styleEl);
  },

  /**
   * Injects the blink-active animation into an <iframe>'s document.
   * Idempotent – identified by the style element's id.
   *
   * @param {string} [iframeId='iframe-playground']
   * @returns {void}
   */
  injectBlinkStyleInIframe: function (iframeId) {
    if (!iframeId) { iframeId = 'iframe-playground'; }
    var iframe = document.getElementById(iframeId);
    if (!iframe) return;
    try {
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      var styleId = 'exobase-blink-styles';
      if (iframeDoc.getElementById(styleId)) return;
      var style = iframeDoc.createElement('style');
      style.id = styleId;
      style.textContent = [
        '@keyframes blink-active-anim {',
        '  0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; }',
        '  50% { background-color: ' + COLORS.ACCENT + '; transform: scale(1.2); box-shadow: 0 0 15px ' + COLORS.ACCENT + '; color: white !important; }',
        '}',
        '.blink-active {',
        '  animation: blink-active-anim 1s infinite !important;',
        '  border-radius: 50% !important;',
        '}',
      ].join('\n');
      iframeDoc.head.appendChild(style);
    } catch (e) { /* cross-origin iframe, silently ignored */ }
  },
};

module.exports = StyleManager;
