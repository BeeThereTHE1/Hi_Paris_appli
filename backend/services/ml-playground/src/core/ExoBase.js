/**
 * ExoBase.js  –  Phase 1 Base Class
 *
 * Central base class for all ML Playground exercise pages.
 * Centralises the three concerns that are duplicated in every exo*_page.js:
 *
 *   1. Profile header management  (via ProfileManager)
 *   2. Background animation       (via AnimationEngine)
 *   3. Global CSS injection       (via StyleManager)
 *
 * Usage (browser-side, after bundling or via <script> tags):
 *
 *   class Exo13 extends ExoBase {
 *     constructor() {
 *       super();
 *       this.loadExerciseSpecificLogic();
 *     }
 *     loadExerciseSpecificLogic() { ... }
 *   }
 *   new Exo13();
 *
 * Usage (Node / CommonJS):
 *
 *   const ExoBase = require('./ExoBase');
 *   class Exo13 extends ExoBase { ... }
 */

'use strict';

var ProfileManager  = require('./ProfileManager');
var AnimationEngine = require('./AnimationEngine');
var StyleManager    = require('./StyleManager');
var helpers         = require('../utils/helpers');

class ExoBase {
  /**
   * @param {object} [options]
   * @param {object} [options.profile]   - Forwarded to ProfileManager.init()
   * @param {object} [options.animation] - Forwarded to AnimationEngine.init()
   */
  constructor(options) {
    options = options || {};

    /** Whether the current visitor is logged in. */
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    /** The currentUser object from localStorage, or null. */
    this.currentUser = ProfileManager._safeUser();

    this.setupGlobalStyles();
    this.setupProfileHeader(options.profile);
    this.setupBackgroundAnimation(options.animation);
  }

  // ---------------------------------------------------------------------------
  // Setup methods (may be overridden by subclasses)
  // ---------------------------------------------------------------------------

  /**
   * Injects the shared CSS stylesheet into the host document.
   * @returns {void}
   */
  setupGlobalStyles() {
    StyleManager.injectGlobalStyles();
  }

  /**
   * Mounts the user profile widget.
   * @param {object} [profileOptions] - Options forwarded to ProfileManager.init()
   * @returns {void}
   */
  setupProfileHeader(profileOptions) {
    ProfileManager.init(profileOptions);
  }

  /**
   * Starts the background animation.
   * @param {object} [animationOptions] - Options forwarded to AnimationEngine.init()
   * @returns {void}
   */
  setupBackgroundAnimation(animationOptions) {
    this._animation = AnimationEngine.init(animationOptions);
  }

  // ---------------------------------------------------------------------------
  // Utility methods available to all subclasses
  // ---------------------------------------------------------------------------

  /**
   * Returns absolute coordinates for a DOM element inside an <iframe>.
   * @see helpers.getElementCoords
   */
  getElementCoords(selector, iframeId) {
    return helpers.getElementCoords(selector, iframeId);
  }

  /**
   * Removes all paths/circles from the SVG arrow-overlay.
   * @see helpers.clearOverlay
   */
  clearOverlay(overlayId) {
    helpers.clearOverlay(overlayId);
  }

  /**
   * Saves exercise data to localStorage under a per-user key.
   *
   * @param {string} key      - Base storage key (e.g. 'exo13_progress').
   * @param {object} exoData  - Object to persist; must have a unique `id` field.
   * @returns {boolean} true if the item was added, false if it already existed.
   */
  saveToStorage(key, exoData) {
    var user = this.currentUser;
    if (!user || !user.email) return false;
    var userKey = key + '_' + user.email;
    var list = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (!list.find(function (e) { return e.id === exoData.id; })) {
      list.push(exoData);
      localStorage.setItem(userKey, JSON.stringify(list));
      return true;
    }
    return false;
  }
}

module.exports = ExoBase;
