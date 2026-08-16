/**
 * ============================================================
 *  SKILL RENDERER
 * ============================================================
 *  Transforms skill category data into an HTML string.
 *  You should never need to edit this file when adding skills.
 * ============================================================
 */

/** Maps a proficiency keyword to a CSS class. */
const LEVEL_CLASS = {
  Expert:       "lvl-expert",
  Proficient:   "lvl-proficient",
  Intermediate: "lvl-intermediate",
  Familiar:     "lvl-familiar",
};

/**
 * Wraps the "(Level)" suffix in a coloured span.
 * e.g. "Flutter (Expert)" → 'Flutter <span class="lvl-expert">(Expert)</span>'
 */
function formatSkillItem(skill) {
  return skill.replace(
    /\((Expert|Proficient|Intermediate|Familiar)\)/,
    (_, level) => `<span class="${LEVEL_CLASS[level]}">(${level})</span>`
  );
}

/**
 * Renders a single skill category block.
 * @param {{ category: string, items: string[] }} cat
 * @returns {string} HTML string
 */
function renderCategory(cat) {
  const items = cat.items
    .map(
      (skill) =>
        `<div class="skill-item"><span class="skill-check">✔</span> ${formatSkillItem(skill)}</div>`
    )
    .join("");

  return `
    <div class="skill-category">
      <div class="skill-cat-label"># ${cat.category}</div>
      <div class="skill-items">${items}</div>
    </div>`;
}

/**
 * Renders the full skills page HTML.
 * @param {Object[]} skillCategories - Array of category objects from data/skills.js
 * @param {string} terminalUser - Username string for the prompt line
 * @returns {string} Full page HTML string
 */
export function renderSkillsPage(skillCategories, terminalUser) {
  const categories = skillCategories.map(renderCategory).join("");
  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${terminalUser}</span>:<span class="p-path">~/skills</span>$ cat packages.txt
      </div>
      <div class="skills-grid">${categories}</div>
      <div class="process-exit">Process finished with exit code 0</div>
    </div>`;
}
