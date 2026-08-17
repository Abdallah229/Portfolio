# Abdallah Mohammed — Terminal Portfolio

A terminal-themed developer portfolio built with **pure HTML, CSS, and vanilla JavaScript** (ES Modules). No build tools, no dependencies to install — just open `index.html` through a server and it works.

Live site → **[abdallah229.github.io/Portfolio](https://abdallah229.github.io/Portfolio/)**

---

## Project Structure

```
Portfolio/
├── index.html              ← Shell only. Never add content here.
├── css/
│   └── style.css           ← All styling (terminal theme, cards, grid, etc.)
├── js/
│   ├── main.js             ← Entry point: fetches data, wires pages + router
│   └── router.js           ← Navigation logic (sidebar clicks, active state)
├── data/                   ← ✅ THE ONLY FOLDER YOU EDIT FOR CONTENT CHANGES
│   ├── profile.json        ← Your name, tagline, about-me block
│   ├── projects.json       ← Array of project objects
│   ├── skills.json         ← Skill categories and items
│   ├── experience.json     ← Work/internship history
│   ├── certifications.json ← Certificates and credentials
│   └── contact.json        ← Email, GitHub, LinkedIn links
└── renderer/               ← HTML factory functions (never edit these)
    ├── homeRenderer.js
    ├── projectRenderer.js
    ├── skillRenderer.js
    ├── experienceRenderer.js
    ├── certificationRenderer.js
    └── contactRenderer.js
```

---

## How to Edit Content (Reference Guide)

> **Rule of thumb:** Every content change lives in the `data/` folder. You never touch HTML.

### Add / Remove a Project — `data/projects.json`

```json
[
  {
    "id": "my-app",              // Unique slug (used as HTML element id)
    "title": "My App",           // Display name on the card
    "category": "Mobile",        // Filter tab: "Mobile" | "Web Backend" | "Desktop" | "Competitive Programming"
    "tech": ["Flutter", "Hive"], // Tech badges shown on the card
    "description": "What it does.",
    "github": "https://github.com/abdallah229/my-app", // null to show "Repository private"
    "demo": null                 // null to hide the Live Demo button
  }
]
```

- **Add** → append a new object to the array.
- **Remove** → delete the object.
- **Filter buttons** on the Projects page are auto-generated from all unique `tech` values — no manual update needed.

---

### Add / Remove a Skill — `data/skills.json`

```json
[
  {
    "category": "Languages & Frameworks",
    "items": ["Dart & Flutter (Expert)", "C++ (Competitive Programming)"]
  }
]
```

- **Add a skill** → append to `items` of the matching category.
- **Add a category** → append a new `{ "category": "...", "items": [] }` object.
- **Remove** → delete the entry.

---

### Add / Remove Work Experience — `data/experience.json`

```json
[
  {
    "id": "company-role",         // Unique slug
    "role": "Flutter Developer",
    "company": "Company Name",
    "period": "Jan 2025 – Present",
    "location": "Cairo, Egypt",   // Optional, omit or set to ""
    "description": "One-line summary of your role.",
    "highlights": [               // Bullet points (can be empty array [])
      "Built X feature that improved Y by Z%",
      "Led migration from A to B"
    ],
    "tech": ["Flutter", "Firebase"]
  }
]
```

---

### Add / Remove a Certification — `data/certifications.json`

```json
[
  {
    "id": "cert-slug",
    "name": "ECPC 2024",
    "issuer": "Egyptian Collegiate Programming Contest",
    "date": "2024",
    "image": "assets/certs/ecpc-2024.jpg",  // optional — drop image in assets/certs/
    "credential": "https://link-to-certificate"  // null to hide the link
  }
]
```

> Place certificate image files in **`assets/certs/`**. Supported formats: JPG, PNG, WebP.
> If `image` is omitted or `null`, a 🏆 emoji is shown instead.

---

### Update Personal Info — `data/profile.json`

```json
{
  "name": "Abdallah Mohammed",
  "tagline": "Flutter Developer",
  "terminalUser": "user@cairo-university",
  "aboutMe": {
    "education": "Cairo University",
    "major": "Computer Science",
    "focus": "Clean Architecture & SOLID",
    "status": "Ready to work"
  }
}
```

---

### Update Contact Links — `data/contact.json`

```json
[
  { "label": "EMAIL",    "href": "mailto:you@example.com", "display": "you@example.com" },
  { "label": "GITHUB",   "href": "https://github.com/...", "display": "github.com/..." },
  { "label": "LINKEDIN", "href": "https://linkedin.com/in/...", "display": "linkedin.com/in/..." }
]
```

---

## Running Locally

The site uses ES Modules and `fetch()`, so it **must** be served over HTTP (not opened as a `file://` URL directly).

```bash
# Python (no install needed)
python3 -m http.server 8080 --directory /path/to/Portfolio

# Then open → http://localhost:8080
```

---

## Architecture Overview

```
index.html  ──loads──▶  js/main.js  (ES Module, top-level await)
                              │
                    fetch() all data/*.json in parallel
                              │
                    passes data to renderers
                              │
                    creates Router with page map
                              │
                         Router
                    (sidebar click → render fn → innerHTML)
```

The **renderers** are pure functions: they take a data array and return an HTML string. They have zero knowledge of the DOM or navigation — making them trivially testable and replaceable.

---

## Deploying to GitHub Pages

No build step required. Just push to the `main` branch — GitHub Pages serves `index.html` directly.

```bash
git add .
git commit -m "your message"
git push origin main
```

The live site updates within ~30 seconds.