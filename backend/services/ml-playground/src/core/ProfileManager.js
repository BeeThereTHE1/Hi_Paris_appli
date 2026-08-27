/**
 * ProfileManager.js
 * Handles user profile display, login/logout logic, and avatar generation.
 * Extracted from the shared ExoCommonPage.initProfileWidget() implementation.
 */

'use strict';

var COLORS = require('../utils/constants').COLORS;
var PROFILE = require('../utils/constants').PROFILE;
var escapeHtml = require('../utils/helpers').escapeHtml;

var ProfileManager = {
  /**
   * Safely reads and parses the currentUser JSON stored in localStorage.
   *
   * @returns {object|null}
   */
  _safeUser: function () {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (e) {
      return null;
    }
  },

  /**
   * Builds and mounts the profile header widget inside the DOM element
   * identified by `options.containerId`.
   *
   * For logged-out visitors it renders a "not connected" button that links
   * to the register page.  For logged-in users it renders an avatar button
   * that opens a dropdown menu with links to history/statistics and a
   * logout button.
   *
   * @param {object} [options]
   * @param {string} [options.containerId=PROFILE.CONTAINER_ID]
   * @param {string} [options.registerHref=PROFILE.REGISTER_HREF]
   * @param {string} [options.historyHref=PROFILE.HISTORY_HREF]
   * @param {string} [options.statsHref=PROFILE.STATS_HREF]
   * @param {boolean} [options.showStats=PROFILE.SHOW_STATS]
   * @param {string} [options.notConnectedLabel=PROFILE.NOT_CONNECTED_LABEL]
   * @param {string} [options.historyLabel=PROFILE.HISTORY_LABEL]
   * @param {string} [options.statsLabel=PROFILE.STATS_LABEL]
   * @param {string} [options.logoutLabel=PROFILE.LOGOUT_LABEL]
   * @param {string} [options.profilePrefix=PROFILE.PROFILE_PREFIX]
   * @returns {void}
   */
  init: function (options) {
    options = options || {};
    var containerId      = options.containerId      || PROFILE.CONTAINER_ID;
    var registerHref     = options.registerHref     || PROFILE.REGISTER_HREF;
    var historyHref      = options.historyHref      || PROFILE.HISTORY_HREF;
    var statsHref        = options.statsHref        || PROFILE.STATS_HREF;
    var showStats        = options.showStats !== undefined ? options.showStats : PROFILE.SHOW_STATS;
    var notConnectedLabel = options.notConnectedLabel || PROFILE.NOT_CONNECTED_LABEL;
    var historyLabel     = options.historyLabel     || PROFILE.HISTORY_LABEL;
    var statsLabel       = options.statsLabel       || PROFILE.STATS_LABEL;
    var logoutLabel      = options.logoutLabel      || PROFILE.LOGOUT_LABEL;
    var profilePrefix    = options.profilePrefix    || PROFILE.PROFILE_PREFIX;

    var container = document.getElementById(containerId);
    if (!container) return;

    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    var user = ProfileManager._safeUser();

    container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';

    if (!isLoggedIn || !user) {
      var visitorBtn = document.createElement('a');
      visitorBtn.href = registerHref;
      visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
      visitorBtn.innerHTML = '<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">' + escapeHtml(notConnectedLabel) + '</span>';
      container.appendChild(visitorBtn);
      return;
    }

    var initials = ((user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '')).toUpperCase();
    var avatar = document.createElement('div');
    avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, ' + COLORS.AVATAR_START + ', ' + COLORS.AVATAR_END + '); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
    avatar.innerText = initials || 'U';
    avatar.onmouseover = function () { avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
    avatar.onmouseout  = function () { avatar.style.transform = 'scale(1) rotate(0deg)'; };

    var menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';

    var p = user.profil || user.profile || user.role || 'étudiant';
    var typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
    var statsLink = showStats
      ? '<a href="' + escapeHtml(statsHref) + '" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background=\'rgba(59, 130, 246, 0.1)\'; this.style.color=\'#60a5fa\'; this.style.transform=\'translateX(5px)\';" onmouseout="this.style.background=\'transparent\'; this.style.color=\'#e2e8f0\'; this.style.transform=\'translateX(0)\';"><span style="font-size: 16px;">📈</span> ' + escapeHtml(statsLabel) + '</a>'
      : '';

    menu.innerHTML = '<div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);"><div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">' + escapeHtml(user.prenom || '') + ' ' + escapeHtml(user.nom || '') + '</div><div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">' + escapeHtml(user.email || '') + '</div><div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 ' + escapeHtml(profilePrefix) + ' ' + escapeHtml(typeProfil) + '</div></div><div style="padding: 8px;"><a href="' + escapeHtml(historyHref) + '" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background=\'rgba(59, 130, 246, 0.1)\'; this.style.color=\'#60a5fa\'; this.style.transform=\'translateX(5px)\';" onmouseout="this.style.background=\'transparent\'; this.style.color=\'#e2e8f0\'; this.style.transform=\'translateX(0)\';"><span style="font-size: 16px;">📊</span> ' + escapeHtml(historyLabel) + '</a>' + statsLink + '<div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background=\'rgba(239, 68, 68, 0.1)\'; this.style.transform=\'translateX(5px)\';" onmouseout="this.style.background=\'transparent\'; this.style.transform=\'translateX(0)\';"><span style="font-size: 16px;">🚪</span> ' + escapeHtml(logoutLabel) + '</div></div>';

    var isOpen = false;
    avatar.onclick = function () {
      isOpen = !isOpen;
      if (isOpen) {
        menu.style.display = 'block';
        setTimeout(function () {
          menu.style.opacity = '1';
          menu.style.transform = 'scale(1) translateY(0)';
          menu.style.pointerEvents = 'auto';
        }, 10);
      } else {
        menu.style.opacity = '0';
        menu.style.transform = 'scale(0.9) translateY(-10px)';
        menu.style.pointerEvents = 'none';
        setTimeout(function () { menu.style.display = 'none'; }, 300);
      }
    };

    var logoutBtn = menu.querySelector('#btnFuturLogout');
    if (logoutBtn) {
      logoutBtn.onclick = function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      };
    }

    function outsideClickHandler(event) {
      if (!container.contains(event.target) && isOpen) {
        avatar.onclick();
      }
    }
    document.addEventListener('click', outsideClickHandler);

    container.appendChild(avatar);
    container.appendChild(menu);
  },
};

module.exports = ProfileManager;
