# AbigailSchidler.github.io

Personal portfolio site for Abigail Schidler — CS + Music @ University of Washington.

## Structure

```
/
├── index.html              # Homepage
├── projects.html           # Projects listing
├── courses.html            # Coursework
├── composing.html          # Music & composition
├── resume.pdf              # Resume (add before publishing)
├── CNAME                   # Custom domain (optional)
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles — single shared stylesheet
│   ├── images/
│   │   ├── profile.jpg     # Portrait photo
│   │   ├── project-thumbnails/   # Card thumbnails (360×240 recommended)
│   │   └── project-screenshots/ # Full-width screenshots (1200×800 recommended)
│   └── icons/              # Any custom SVG icons
└── projects/
    ├── paperflow.html      # Paperflow detail page
    └── smart-cart.html     # Smart Cart detail page
```

## Adding a new project

1. Create `projects/your-project.html` (copy an existing project page as a template)
2. Add a card to `projects.html` and a preview card to `index.html#projects`
3. Add a thumbnail to `assets/images/project-thumbnails/your-project.jpg`
4. Add screenshots to `assets/images/project-screenshots/your-project-1.jpg`

## Image naming conventions

- Profile: `assets/images/profile.jpg`
- Thumbnails: `assets/images/project-thumbnails/paperflow.jpg`
- Screenshots: `assets/images/project-screenshots/paperflow-1.jpg`, `paperflow-2.jpg`

## Deployment

Deployed via GitHub Pages from the `main` branch root.
Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**.
