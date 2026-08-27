/**
 * ExoBase.js  –  Frontend entry point
 *
 * This file re-exports the ExoBase class for use inside the
 * frontend/playground-master exercise pages.
 *
 * The canonical source lives in:
 *   backend/services/ml-playground/src/core/ExoBase.js
 *
 * During a build step this module would typically be replaced by a bundled
 * version.  For now it simply re-exports the backend module so that both
 * front-end and back-end code share a single source of truth.
 *
 * Usage inside an exo*_page.js:
 *
 *   const ExoBase = require('../core/ExoBase');
 *
 *   class Exo13 extends ExoBase {
 *     constructor() {
 *       super();
 *       this.loadExerciseSpecificLogic();
 *     }
 *     loadExerciseSpecificLogic() { ... }
 *   }
 *
 *   new Exo13();
 */

'use strict';

module.exports = require('../../../../backend/services/ml-playground/src/core/ExoBase');
