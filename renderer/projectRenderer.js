/**
 * PROJECT RENDERER
 * Converts project data objects to HTML cards with tag-based filtering.
 * Never edit this file when adding projects — edit data/projects.json instead.
 */

function renderProjectCard(project) {
  const techBadges = project.tech.map((t) => `<span>${t}</span>`).join("");
  // Store all tech tags as a comma-separated data attribute for filter logic
  const techData = project.tech.join(",");

  const links = [
    project.github
      ? `<a class="proj-link" href="${project.github}" target="_blank" rel="noopener"><span class="link-icon">⎇</span> git clone</a>`
      : "",
    project.demo
      ? `<a class="proj-link" href="${project.demo}" target="_blank" rel="noopener"><span class="link-icon">↗</span> open demo</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `
    <div class="project-card" id="proj-${project.id}" data-tech="${techData}">
      <div class="card-header">
        <span class="proj-title">${project.title}</span>
        <div class="tech-stack">${techBadges}</div>
      </div>
      <p class="proj-desc">${project.description}</p>
      <div class="run-command">$ ${project.runCommand}</div>
      ${links ? `<div class="proj-links">${links}</div>` : ""}
    </div>`;
}

/**
 * Renders the full projects page with a filter bar.
 * @param {Object[]} projects
 * @param {string} terminalUser
 */
export function renderProjectsPage(projects, terminalUser) {
  // Collect all unique tech tags across all projects
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
