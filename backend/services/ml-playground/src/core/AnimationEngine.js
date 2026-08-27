/**
 * AnimationEngine.js
 * Manages the animated background of exercise pages: floating math formulas,
 * orbiting neuron nodes, and the connections drawn between them.
 *
 * Extracted from ExoCommonPage.initBackgroundAnimation() in exo_common_oop.js.
 */

'use strict';

var constants = require('../utils/constants');
var ANIMATION = constants.ANIMATION;
var FORMULAS  = constants.FORMULAS;
var COLORS    = constants.COLORS;
var BACKGROUND_CONTAINER_ID = constants.BACKGROUND_CONTAINER_ID;
var getRandom = require('../utils/helpers').getRandom;
var lerp      = require('../utils/helpers').lerp;

var AnimationEngine = {
  /**
   * Initialises and starts the background animation inside the element
   * identified by `options.containerId`.
   *
   * @param {object} [options]
   * @param {string}   [options.containerId]   - id of the background container element.
   * @param {string[]} [options.formulas]       - Array of math formula strings to display.
   * @param {number}   [options.numFormulas]    - How many formula elements to create.
   * @param {number}   [options.numNeurons]     - How many neuron elements to create.
   * @param {number}   [options.numConnections] - How many connection lines to create.
   * @returns {void}
   */
  init: function (options) {
    options = options || {};
    var containerId    = options.containerId    || BACKGROUND_CONTAINER_ID;
    var formulas       = options.formulas       || FORMULAS;
    var numFormulas    = options.numFormulas    || ANIMATION.NUM_FORMULAS;
    var numNeurons     = options.numNeurons     || ANIMATION.NUM_NEURONS;
    var numConnections = options.numConnections || ANIMATION.NUM_CONNECTIONS;

    var backgroundContainer = document.getElementById(containerId);
    if (!backgroundContainer) return;

    var neurons     = [];
    var connections = [];

    // -----------------------------------------------------------------------
    // Element factories
    // -----------------------------------------------------------------------

    function createAnimatedElement(type, elementClass) {
      var element = document.createElement('div');
      element.className = elementClass;
      element.style.position = 'absolute';

      if (type === 'formula') {
        element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
        element.style.fontSize = 'clamp(1rem, 5vw, 2.5rem)';
        var opacity = String(getRandom(0.04, 0.12));
        element.style.opacity = opacity;
        element.style.color = 'rgba(255, 255, 255, ' + opacity + ')';
        element.style.left = getRandom(-20, 120) + 'vw';
        element.style.top  = getRandom(-20, 120) + 'vh';
        element.style.transform = 'rotate(' + getRandom(-30, 30) + 'deg)';
      } else if (type === 'neuron') {
        var size = getRandom(10, 25);
        element.style.width  = size + 'px';
        element.style.height = size + 'px';
        var hue = getRandom(190, 250);
        var bgColor = 'hsl(' + hue + ', 70%, 50%)';
        element.style.backgroundColor = bgColor;
        element.style.boxShadow = '0 0 15px ' + COLORS.NEURON_GLOW + ', 0 0 25px ' + bgColor;
        element.style.left    = getRandom(-10, 110) + 'vw';
        element.style.top     = getRandom(-10, 110) + 'vh';
        element.style.opacity = '0';
        element.style.transform = 'scale(0)';
        neurons.push({ element: element, size: size, x: 0, y: 0, opacity: 0, scale: 0 });
      }

      backgroundContainer.appendChild(element);
    }

    function createConnection(neuron1, neuron2) {
      var connection = document.createElement('div');
      connection.className = 'connection';
      connection.style.position    = 'absolute';
      connection.style.height      = '1.5px';
      connection.style.background  = 'linear-gradient(to right, ' + COLORS.CONNECTION_START + ', ' + COLORS.CONNECTION_END + ')';
      connection.style.opacity     = '0';
      connection.style.transformOrigin = '0 0';
      connection.style.filter      = 'blur(4px)';
      connections.push({ element: connection, neuron1: neuron1, neuron2: neuron2, opacity: 0 });
      backgroundContainer.appendChild(connection);
    }

    // -----------------------------------------------------------------------
    // Populate the background
    // -----------------------------------------------------------------------

    for (var fi = 0; fi < numFormulas; fi++) createAnimatedElement('formula', 'math-formula');
    for (var ni = 0; ni < numNeurons; ni++) createAnimatedElement('neuron', 'neuron');
    for (var ci = 0; ci < numConnections; ci++) {
      var n1 = neurons[Math.floor(Math.random() * neurons.length)];
      var n2 = neurons[Math.floor(Math.random() * neurons.length)];
      if (n1 !== n2) createConnection(n1, n2);
    }

    // -----------------------------------------------------------------------
    // Animation loop
    // -----------------------------------------------------------------------

    var animFrameId = null;

    function animateBackground() {
      var windowWidth  = window.innerWidth;
      var windowHeight = window.innerHeight;
      var time = Date.now() * ANIMATION.TIME_SCALE;

      neurons.forEach(function (neuron, index) {
        var angle  = index * (2 * Math.PI / numNeurons) + time;
        var radius = Math.min(windowWidth, windowHeight) * ANIMATION.ORBIT_RADIUS_FACTOR;
        var targetX = windowWidth  / 2 + radius * Math.cos(angle) + Math.sin(time * ANIMATION.WOBBLE_SCALE + index * 0.1) * ANIMATION.WOBBLE_AMPLITUDE;
        var targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * ANIMATION.WOBBLE_SCALE + index * 0.1) * ANIMATION.WOBBLE_AMPLITUDE;

        neuron.opacity = Math.max(neuron.opacity, 0.15);
        neuron.scale   = Math.max(neuron.scale,   1);
        neuron.x       = lerp(neuron.x, targetX - neuron.size / 2, ANIMATION.LERP_FACTOR);
        neuron.y       = lerp(neuron.y, targetY - neuron.size / 2, ANIMATION.LERP_FACTOR);

        neuron.element.style.opacity   = String(neuron.opacity);
        neuron.element.style.transform = 'scale(' + neuron.scale + ')';
        neuron.element.style.left      = neuron.x + 'px';
        neuron.element.style.top       = neuron.y + 'px';
      });

      connections.forEach(function (conn) {
        var x1     = conn.neuron1.x + conn.neuron1.size / 2;
        var y1     = conn.neuron1.y + conn.neuron1.size / 2;
        var x2     = conn.neuron2.x + conn.neuron2.size / 2;
        var y2     = conn.neuron2.y + conn.neuron2.size / 2;
        var length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        conn.element.style.opacity   = '0.3';
        conn.element.style.width     = length + 'px';
        conn.element.style.left      = x1 + 'px';
        conn.element.style.top       = y1 + 'px';
        conn.element.style.transform = 'rotate(' + angle + 'deg)';
      });

      animFrameId = requestAnimationFrame(animateBackground);
    }

    animFrameId = requestAnimationFrame(animateBackground);

    return {
      /**
       * Cancels the running animation loop.
       * Safe to call even if the animation has already been stopped.
       */
      stop: function () {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      },
    };
  },
};

module.exports = AnimationEngine;
