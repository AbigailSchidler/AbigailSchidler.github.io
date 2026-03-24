/**
 * theme.js — Light / dark mode toggle
 *
 * Applies data-theme="light"|"dark" to <html> before first paint
 * so there is no flash of the wrong theme on load.
 *
 * Priority: localStorage > prefers-color-scheme > light
 */
(function () {
  var STORAGE_KEY = 'portfolio-theme';
  var root = document.documentElement;

  function getPreferred() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  // Set theme before first paint (no animation on initial load)
  apply(getPreferred());

  // Wire up toggle buttons after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );

      btn.addEventListener('click', function () {
        var current = root.getAttribute('data-theme');
        apply(current === 'dark' ? 'light' : 'dark');
      });
    });
  });
}());
