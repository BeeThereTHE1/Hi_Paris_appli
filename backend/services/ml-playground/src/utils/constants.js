/**
 * constants.js
 * Central repository of magic numbers, colors, and configuration used
 * across all ExoBase-derived exercise pages.
 */

'use strict';

// ---------------------------------------------------------------------------
// Background animation defaults
// ---------------------------------------------------------------------------

const ANIMATION = {
  NUM_FORMULAS: 25,
  NUM_NEURONS: 30,
  NUM_CONNECTIONS: 50,
  /** Lerp factor used for smooth neuron movement each animation frame. */
  LERP_FACTOR: 0.05,
  /** Base time multiplier applied to Date.now() to control orbit speed. */
  TIME_SCALE: 0.0005,
  /** Slow oscillation factor for figure-8 movement on top of circular orbit. */
  WOBBLE_SCALE: 0.5,
  /** Amplitude (px) of the sine/cosine wobble. */
  WOBBLE_AMPLITUDE: 50,
  /** Radius of the neuron orbit as a fraction of the smallest viewport dimension. */
  ORBIT_RADIUS_FACTOR: 0.3,
};

// ---------------------------------------------------------------------------
// Default math formulas displayed in the animated background
// ---------------------------------------------------------------------------

const FORMULAS = [
  '\\sqrt{x}',
  '\\int_{a}^{b} f(x) dx',
  'f(x) = ax^2 + bx + c',
  '\\frac{dy}{dx}',
  '\\alpha',
  '\\beta',
  '\\gamma',
  '\\sin(t)',
  '\\cos(t)',
  'e^{-t}',
];

// ---------------------------------------------------------------------------
// Color / theme tokens
// ---------------------------------------------------------------------------

const COLORS = {
  /** Primary accent – used for active step cards, blink animation, etc. */
  ACCENT: '#FF034D',
  /** Secondary accent – used for active card borders and shadows. */
  BRAND_BLUE: '#004676',
  /** Neuron glow purple. */
  NEURON_GLOW: 'rgba(139, 92, 246, 0.5)',
  /** Avatar gradient start. */
  AVATAR_START: '#10b981',
  /** Avatar gradient end. */
  AVATAR_END: '#3b82f6',
  /** Connection line gradient start color. */
  CONNECTION_START: 'rgba(139, 92, 246, 0.15)',
  /** Connection line gradient end color. */
  CONNECTION_END: 'rgba(99, 102, 241, 0.2)',
};

// ---------------------------------------------------------------------------
// Profile widget defaults
// ---------------------------------------------------------------------------

const PROFILE = {
  CONTAINER_ID: 'widget-profil-header',
  REGISTER_HREF: 'Page-demo/register.html',
  HISTORY_HREF: 'Page-demo/historique.html',
  STATS_HREF: 'statsetudiant.html',
  SHOW_STATS: true,
  NOT_CONNECTED_LABEL: 'You are not connected!',
  HISTORY_LABEL: 'Mon Historique',
  STATS_LABEL: 'Mes Statistiques',
  LOGOUT_LABEL: 'Logout',
  PROFILE_PREFIX: 'Profil',
};

// ---------------------------------------------------------------------------
// Background container default id
// ---------------------------------------------------------------------------

const BACKGROUND_CONTAINER_ID = 'background-container';

module.exports = {
  ANIMATION,
  FORMULAS,
  COLORS,
  PROFILE,
  BACKGROUND_CONTAINER_ID,
};
