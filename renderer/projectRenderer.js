/**
 * PROJECT RENDERER
 * Converts project data objects to HTML cards with category-based filtering.
 * Never edit this file when adding projects — edit data/projects.json instead.
 */

// Canonical category order for the filter tab bar.
// Add a new string here if you introduce a new category.
const CATEGORY_ORDER = [
  "Mobile",
  "Web Backend",
  "Desktop",
  "Competitive Programming",
];

function renderProjectCard(project) {
  const techBadges = project.tech.map((t) => `<span>${t}</span>`).join("");
  const category = project.category || "";

  const githubBtn = project.github
    ? `<a class="proj-action-btn" href="${project.github}" target="_blank" rel="noopener">
         <span class="action-icon">⎇</span> View on GitHub
       </a>`
    : `<span class="proj-no-link">⎇ Repository private</span>`;

  const demoBtn = project.demo
    ? `<a class="proj-action-btn proj-action-demo" href="${project.demo}" target="_blank" rel="noopener">
         <span class="action-icon">↗</span> Live Demo
       </a>`
    : "";

  return `
    <div class="project-card" id="proj-${project.id}" data-category="${category}">
      <div class="card-header">
        <span class="proj-title">${project.title}</span>
        <div class="tech-stack">${techBadges}</div>
      </div>
      <p class="proj-desc">${project.description}</p>
      <div class="proj-actions">
        ${githubBtn}
        ${demoBtn}
      </div>
    </div>`;
}

/**
 * Renders the full projects page with a category filter tab bar.
 * @param {Object[]} projects
 * @param {string} terminalUser
 */
export function renderProjectsPage(projects, terminalUser) {
  // Collect categories present in the data, preserving canonical order.
  const usedCategories = new Set(projects.map((p) => p.category).filter(Boolean));
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => usedCategories.has(c)),
    // Any category not in CATEGORY_ORDER appears at the end
    ...[...usedCategories].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const filterBar = `
    <div class="filter-bar category-tabs">
      <button class="filter-btn active" data-filter="all">All</button>
      ${orderedCategories
        .map((c) => `<button class="filter-btn" data-filter="${c}">${c}</button>`)
        .join("")}
    </div>`;

  const cards = projects.map(renderProjectCard).join("");

  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${terminalUser}</span>:<span class="p-path">~/projects</span>$ ls -la
      </div>
      ${filterBar}
      <div id="projects-list">${cards}</div>
    </div>`;
}
