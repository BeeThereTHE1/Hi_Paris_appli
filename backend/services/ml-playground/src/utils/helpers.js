/**
 * helpers.js
 * Pure utility functions shared across all ExoBase-derived exercise pages.
 * None of these functions have side-effects; they are safe to call in any
 * environment (browser, Node test runner, etc.).
 */

'use strict';

/**
 * Escapes a string so it is safe to embed inside an HTML attribute or text
 * node when constructing HTML via string concatenation or innerHTML.
 *
 * @param {*} value - Any value; non-strings are coerced with String().
 * @returns {string} HTML-escaped string.
 */
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Returns a random floating-point number in [min, max).
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Linear interpolation between two numbers.
 *
 * @param {number} start
 * @param {number} end
 * @param {number} amount - Value in [0, 1].
 * @returns {number}
 */
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

/**
 * Returns the absolute coordinates (relative to the host document viewport)
 * of a DOM element located inside an <iframe>.
 *
 * @param {string} selector  CSS selector for the element inside the iframe.
 * @param {string} [iframeId='iframe-playground']  id of the host <iframe>.
 * @returns {{ cx:number, cy:number, left:number, right:number, top:number, bottom:number, width:number, height:number }|null}
 */
function getElementCoords(selector, iframeId) {
  if (iframeId === undefined) { iframeId = 'iframe-playground'; }
  var iframe = document.getElementById(iframeId);
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
      height: elRect.height,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Removes all <path> and <circle> child elements from the SVG overlay used
 * to draw flow arrows between tutorial step cards.
 *
 * @param {string} [overlayId='arrow-overlay']
 * @returns {void}
 */
function clearOverlay(overlayId) {
  if (overlayId === undefined) { overlayId = 'arrow-overlay'; }
  var overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.querySelectorAll('path, circle').forEach(function (e) { return e.remove(); });
}

module.exports = {
  escapeHtml,
  getRandom,
  lerp,
  getElementCoords,
  clearOverlay,
};
