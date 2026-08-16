/**
 * CERTIFICATION RENDERER
 * Converts certification data objects to badge-style HTML cards.
 * Never edit this file — edit data/certifications.json instead.
 */

function renderCertCard(cert) {
  const link = cert.credential
    ? `<a class="cert-link" href="${cert.credential}" target="_blank" rel="noopener">View Credential ↗</a>`
    : "";

  return `
    <div class="cert-card" id="cert-${cert.id}">
      <div class="cert-badge">🏆</div>
      <div class="cert-name">${cert.name}</div>
      <div class="cert-issuer">${cert.issuer}</div>
      <div class="cert-date">${cert.date}</div>
      ${link}
    </div>`;
}

/**
 * Renders the full certifications page.
 * @param {Object[]} certifications
 * @param {string} terminalUser
 */
export function renderCertificationsPage(certifications, terminalUser) {
  const cards = certifications.map(renderCertCard).join("");
  return `
    <div class="fade-in">
      <div class="prompt-line">
        <span class="p-user">${terminalUser}</span>:<span class="p-path">~/certifications</span>$ ls --badges
      </div>
      <div class="cert-grid">${cards}</div>
    </div>`;
}
