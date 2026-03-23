/* ==========================================================================
   project-data.js — Single source of truth for project card content.

   To update a project's blurb or tags across the entire site, edit only
   this file. The inject-cards.js script reads this data and populates:
     - .project-card[data-project="key"]   on index.html and projects.html
     - .tag-group[data-project-tags="key"] on detail pages

   Hardcoded HTML in each page acts as a no-JS fallback and should be kept
   in sync with this file if it ever changes.
   ========================================================================== */

const PORTFOLIO_PROJECTS = {

  paperflow: {
    blurb: "Paperflow is an LLM-assisted research presentation workspace that transforms academic papers into structured presentation timelines with aligned talking points and speaker notes. It combines automated content extraction with interactive editing tools so users can quickly generate presentations while maintaining control over structure, timing, and narrative flow.",
    tags:  ["React", "Python", "PDF Parsing", "Human-AI Interaction"]
  },

  "smart-cart": {
    blurb: "Smart Cart is a mobile meal-planning and grocery aggregation app that helps users turn recipes into structured shopping lists with normalized ingredient quantities and nearby store discovery. It streamlines planning, list building, and shopping into a single workflow-driven interface.",
    tags:  ["Flutter", "Isar Database", "Ingredient Aggregation Logic", "GPS Integration"]
  }

};
