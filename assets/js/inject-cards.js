/* ==========================================================================
   inject-cards.js — Populates project content from project-data.js.
   Must be loaded after project-data.js.
   ========================================================================== */

(function () {
  function renderTags(tags) {
    return tags.map(function (t) {
      return '<span class="tag">' + t + '</span>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* Project cards (index.html, projects.html)
     * Selector: .project-card[data-project="key"]
     * Injects: .project-blurb text and .tag-group inner HTML */
    document.querySelectorAll('.project-card[data-project]').forEach(function (card) {
      var key  = card.getAttribute('data-project');
      var data = PORTFOLIO_PROJECTS[key];
      if (!data) return;

      var blurb = card.querySelector('.project-blurb');
      if (blurb) blurb.textContent = data.blurb;

      var tagGroup = card.querySelector('.tag-group');
      if (tagGroup) tagGroup.innerHTML = renderTags(data.tags);
    });

    /* Tag groups on detail pages (paperflow.html, smart-cart.html)
     * Selector: .tag-group[data-project-tags="key"]
     * Injects: tag spans only — preserves any extra classes on the container */
    document.querySelectorAll('.tag-group[data-project-tags]').forEach(function (el) {
      var key  = el.getAttribute('data-project-tags');
      var data = PORTFOLIO_PROJECTS[key];
      if (!data) return;

      el.innerHTML = renderTags(data.tags);
    });

  });
})();
