/**
 * PROJECT RENDERER
 * Converts project data objects to HTML cards with tag-based filtering.
 * Never edit this file when adding projects — edit data/projects.json instead.
 */

function renderProjectCard(project) {
  const techBadges = project.tech.map((t) => `<span>${t}</span>`).join("");
  const techData = project.tech.join(",");

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
    <div class="project-card" id="proj-${project.id}" data-tech="${techData}">
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
 * Renders the full projects page with a filter bar.
 * @param {Object[]} projects
 * @param {string} terminalUser
 */
export function renderProjectsPage(projects, terminalUser) {
  const allTech = [...new Set(projects.flatMap((p) => p.tech))].sort();

  const filterBar = `
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All</button>
      ${allTech
        .map((t) => `<button class="filter-btn" data-filter="${t}">${t}</button>`)
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
