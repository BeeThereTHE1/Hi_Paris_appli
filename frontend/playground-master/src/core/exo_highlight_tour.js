(function () {
  'use strict';

  class ExoHighlightTour {
    constructor(opts) {
      var o = opts || {};
      this.iframeSelector = o.iframeSelector || '.exo-frame';

      this.activeHighlightBox = null;
      this.activeTooltip = null;
      this.activeIndicator = null;

      this.currentHighlightSelector = null;
      this.currentTooltipSelector = null;
      this.currentTooltipPosition = 'bottom';

      this._active = false;
      this._rafId = null;
      this._boundSchedule = this.scheduleReposition.bind(this);
    }

    // --- Public API ---

    showHighlightBox(selectorOrEl, label) {
      this.clearHighlightOnly();
      this.currentHighlightSelector = selectorOrEl;

      var box = document.createElement('div');
      box.className = 'tutorial-highlight-box';
      this.activeHighlightBox = box;
      document.body.appendChild(box);

      if (label) {
        var dot = document.createElement('div');
        dot.className = 'tutorial-indicator-dot';
        dot.innerText = String(label);
        this.activeIndicator = dot;
        document.body.appendChild(dot);
      }

      this.scheduleReposition();
    }

    showTooltip(selectorOrEl, title, text, position) {
      if (position === void 0) position = 'bottom';

      if (this.activeTooltip) {
        this.activeTooltip.remove();
        this.activeTooltip = null;
      }

      this.currentTooltipSelector = selectorOrEl;
      this.currentTooltipPosition = position || 'bottom';

      var tooltip = document.createElement('div');
      tooltip.className = 'tutorial-tooltip';
      tooltip.innerHTML =
        '<h4 style="margin:0 0 8px 0; font-size:15px; font-weight:800; color:#fff;">' + (title || '') + '</h4>' +
        '<p style="margin:0; font-size:13px; color:#cbd5e1;">' + (text || '') + '</p>' +
        '<div class="tooltip-arrow"></div>';

      this.activeTooltip = tooltip;
      document.body.appendChild(tooltip);

      this.scheduleReposition();
    }

    clear() {
      if (this.activeHighlightBox) {
        this.activeHighlightBox.remove();
        this.activeHighlightBox = null;
      }
      if (this.activeTooltip) {
        this.activeTooltip.remove();
        this.activeTooltip = null;
      }
      if (this.activeIndicator) {
        this.activeIndicator.remove();
        this.activeIndicator = null;
      }

      this.currentHighlightSelector = null;
      this.currentTooltipSelector = null;
      this.currentTooltipPosition = 'bottom';
    }

    startAutoReposition() {
      if (this._active) return;
      this._active = true;

      window.addEventListener('scroll', this._boundSchedule, { passive: true });
      window.addEventListener('resize', this._boundSchedule);

      this.scheduleReposition();
    }

    stopAutoReposition() {
      if (!this._active && !this._rafId) return;

      this._active = false;
      window.removeEventListener('scroll', this._boundSchedule);
      window.removeEventListener('resize', this._boundSchedule);

      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    }

    // --- Internals ---

    clearHighlightOnly() {
      if (this.activeHighlightBox) {
        this.activeHighlightBox.remove();
        this.activeHighlightBox = null;
      }
      if (this.activeIndicator) {
        this.activeIndicator.remove();
        this.activeIndicator = null;
      }
    }

    scheduleReposition() {
      if (!this._active && !this.activeHighlightBox && !this.activeTooltip) return;
      if (this._rafId) return;

      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        this.reposition();
      });
    }

    reposition() {
      if (this.currentHighlightSelector && this.activeHighlightBox) {
        var rect = this.resolveRect(this.currentHighlightSelector);
        if (rect) {
          var pad = 15;
          var left = rect.left - pad + window.scrollX;
          var top = rect.top - pad + window.scrollY;
          var width = rect.width + pad * 2;
          var height = rect.height + pad * 2;

          this.activeHighlightBox.style.left = left + 'px';
          this.activeHighlightBox.style.top = top + 'px';
          this.activeHighlightBox.style.width = width + 'px';
          this.activeHighlightBox.style.height = height + 'px';

          if (this.activeIndicator) {
            this.activeIndicator.style.left = left + 'px';
            this.activeIndicator.style.top = top + 'px';
          }
        }
      }

      if (this.currentTooltipSelector && this.activeTooltip) {
        var target = this.resolveRect(this.currentTooltipSelector);
        if (target) {
          var tRect = this.activeTooltip.getBoundingClientRect();
          var topPos = 0;
          var leftPos = 0;

          if (this.currentTooltipPosition === 'bottom') {
            topPos = target.bottom + window.scrollY + 10;
            leftPos = target.left + target.width / 2 - tRect.width / 2 + window.scrollX;
          } else if (this.currentTooltipPosition === 'top') {
            topPos = target.top - tRect.height - 10 + window.scrollY;
            leftPos = target.left + target.width / 2 - tRect.width / 2 + window.scrollX;
          } else if (this.currentTooltipPosition === 'right') {
            topPos = target.top + target.height / 2 - tRect.height / 2 + window.scrollY;
            leftPos = target.right + 10 + window.scrollX;
          } else {
            topPos = target.top + target.height / 2 - tRect.height / 2 + window.scrollY;
            leftPos = target.left - tRect.width - 10 + window.scrollX;
          }

          if (leftPos < 10) leftPos = 10;
          if (leftPos + tRect.width > window.innerWidth - 10) leftPos = window.innerWidth - tRect.width - 10;
          if (topPos < 10) topPos = 10;

          this.activeTooltip.style.left = leftPos + 'px';
          this.activeTooltip.style.top = topPos + 'px';
        }
      }
    }

    resolveRect(selectorOrEl) {
      if (!selectorOrEl) return null;

      // HTMLElement from iframe or main doc
      if (selectorOrEl && typeof selectorOrEl.getBoundingClientRect === 'function') {
        return this.normalizeRectForElement(selectorOrEl);
      }

      // String selector
      if (typeof selectorOrEl !== 'string') return null;

      if (selectorOrEl.indexOf(',') !== -1) {
        return this.getMergedRect(selectorOrEl);
      }

      return this.getSingleRect(selectorOrEl);
    }

    normalizeRectForElement(el) {
      var iframe = document.querySelector(this.iframeSelector);
      if (!iframe) return el.getBoundingClientRect();

      try {
        var iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (iframeDoc && iframeDoc.contains(el)) {
          var iRect = iframe.getBoundingClientRect();
          var r = el.getBoundingClientRect();
          return {
            top: iRect.top + r.top,
            left: iRect.left + r.left,
            bottom: iRect.top + r.bottom,
            right: iRect.left + r.right,
            width: r.width,
            height: r.height
          };
        }
      } catch (_e) {}

      return el.getBoundingClientRect();
    }

    getSingleRect(selector) {
      var inMain = document.querySelector(selector);
      if (inMain) return inMain.getBoundingClientRect();

      var iframe = document.querySelector(this.iframeSelector);
      if (!iframe) return null;

      try {
        var iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!iframeDoc) return null;

        var el = iframeDoc.querySelector(selector);
        if (!el) return null;

        var iRect = iframe.getBoundingClientRect();
        var r = el.getBoundingClientRect();

        return {
          top: iRect.top + r.top,
          left: iRect.left + r.left,
          bottom: iRect.top + r.bottom,
          right: iRect.left + r.right,
          width: r.width,
          height: r.height
        };
      } catch (_e) {
        return null;
      }
    }

    getMergedRect(selectorCsv) {
      var selectors = selectorCsv.split(',').map(function (s) { return s.trim(); });

      var minTop = Infinity, minLeft = Infinity, maxBottom = -Infinity, maxRight = -Infinity;
      var found = false;

      for (var i = 0; i < selectors.length; i++) {
        var rect = this.getSingleRect(selectors[i]);
        if (!rect) continue;
        found = true;
        if (rect.top < minTop) minTop = rect.top;
        if (rect.left < minLeft) minLeft = rect.left;
        if (rect.bottom > maxBottom) maxBottom = rect.bottom;
        if (rect.right > maxRight) maxRight = rect.right;
      }

      if (!found) return null;

      return {
        top: minTop,
        left: minLeft,
        bottom: maxBottom,
        right: maxRight,
        width: maxRight - minLeft,
        height: maxBottom - minTop
      };
    }
  }

  window.ExoHighlightTour = ExoHighlightTour;
})();
