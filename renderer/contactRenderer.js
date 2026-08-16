/**
 * ============================================================
 *  CONTACT RENDERER
 * ============================================================
 *  Renders the contact page from contact link data.
 * ============================================================
 */

/**
 * Renders a single contact card.
 * @param {{ label: string, href: string, display: string }} link
 * @returns {string} HTML string
 */
function renderContactCard(link) {
  return `
    <div class="project-card">
      <span class="contact-label">${link.label}</span><br>
      <a href="${link.href}" class="contact-link">${link.display}</a>
    </div>`;
}

/**
 * Renders the full contact page HTML.
 * @param {Object[]} contactLinks - Array of link objects from data/contact.js
 * @param {string} terminalUser - Username string for the prompt line
 * @returns {string} Full page HTML string
 */
export function renderContactPage(contactLinks, terminalUser) {
  const cards = contactLinks.map(renderContactCard).join("");
  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${terminalUser}</span>:<span class="p-path">~/contact</span>$ ./connect.sh
      </div>
      ${cards}
    </div>`;
}
