(function () {
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
      this._boundReposition = this.reposition.bind(this);
      this._interval = null;
    }
    getIframeElementRect(selector) { /* logique factorisée */ }
    showHighlightBox(selector, label) { /* ... */ }
    showTooltip(selector, title, text, position) { /* ... */ }
    clear() { /* ... */ }
    reposition() { /* ... */ }
    startAutoReposition() {
      window.addEventListener('resize', this._boundReposition);
      window.addEventListener('scroll', this._boundReposition);
      if (!this._interval) this._interval = setInterval(this._boundReposition, 120);
    }
    stopAutoReposition() {
      window.removeEventListener('resize', this._boundReposition);
      window.removeEventListener('scroll', this._boundReposition);
      if (this._interval) { clearInterval(this._interval); this._interval = null; }
    }
  }
  window.ExoHighlightTour = ExoHighlightTour;
})();
