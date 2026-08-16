/**
 * EXPERIENCE RENDERER
 * Converts experience data objects to timeline-style HTML cards.
 * Never edit this file — edit data/experience.json instead.
 */

function renderExpCard(exp) {
  const highlights =
    exp.highlights && exp.highlights.length
      ? `<ul class="exp-highlights">${exp.highlights
          .map((h) => `<li>${h}</li>`)
          .join("")}</ul>`
      : "";

  const techBadges =
    exp.tech && exp.tech.length
      ? `<div class="tech-stack exp-tech">${exp.tech
          .map((t) => `<span>${t}</span>`)
          .join("")}</div>`
      : "";

  return `
    <div class="exp-card" id="exp-${exp.id}">
      <div class="exp-header">
        <div class="exp-title-block">
          <div class="exp-role">${exp.role}</div>
          <div class="exp-company">${exp.company}</div>
        </div>
        <div class="exp-meta">
          <div class="exp-period">${exp.period}</div>
          ${exp.location ? `<div class="exp-location">${exp.location}</div>` : ""}
        </div>
      </div>
      <p class="exp-desc">${exp.description}</p>
      ${highlights}
      ${techBadges}
    </div>`;
}

/**
 * Renders the full experience page.
 * @param {Object[]} experience
 * @param {string} terminalUser
 */
export function renderExperiencePage(experience, terminalUser) {
  const cards = experience.map(renderExpCard).join("");
  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${terminalUser}</span>:<span class="p-path">~/experience</span>$ cat career.log
      </div>
      <div class="exp-list">${cards}</div>
    </div>`;
}
