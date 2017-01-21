if (!window.Element.prototype.matches) {
  window.Element.prototype.matches =
    window.Element.prototype.matchesSelector ||
    window.Element.prototype.mozMatchesSelector ||
    window.Element.prototype.msMatchesSelector ||
    window.Element.prototype.oMatchesSelector ||
    window.Element.prototype.webkitMatchesSelector ||

    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s)
      var i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
}
