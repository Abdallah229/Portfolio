/**
 * ============================================================
 *  HOME RENDERER
 * ============================================================
 *  Renders the home / whoami page from profile data.
 * ============================================================
 */

/**
 * Serializes the aboutMe object into a JS-style code literal
 * for the Prism.js code block.
 * @param {Object} aboutMe
 * @returns {string}
 */
function serializeAboutMe(aboutMe) {
  const entries = Object.entries(aboutMe)
    .map(([k, v]) => `  ${k}: "${v}"`)
    .join(",\n");
  return `const aboutMe = {\n${entries}\n};`;
}

/**
 * Renders the full home page HTML.
 * @param {Object} profile - Profile object from data/profile.js
 * @returns {string} Full page HTML string
 */
export function renderHomePage(profile) {
  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${profile.terminalUser}</span>:<span class="p-path">~</span>$ whoami
      </div>

      <h1><span id="typed-name" data-name="${profile.name}"></span></h1>
      <p class="subtitle">${profile.tagline}</p>

      <br>
      <pre><code class="language-javascript">${serializeAboutMe(profile.aboutMe)}</code></pre>
    </div>`;
}
