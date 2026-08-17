/**
 * CERTIFICATION RENDERER
 * Converts certification data objects to badge-style HTML cards.
 * Never edit this file — edit data/certifications.json instead.
 *
 * Image support:
 *   Add an "image" field pointing to a file in assets/certs/.
 *   The image is shown as a clickable thumbnail at the top of the card.
 *   Clicking it opens the "credential" URL if set, otherwise the image itself.
 *   If no image is provided, a 🏆 emoji is shown instead.
 */

function renderCertCard(cert) {
  // Determine click target: credential link > image src > nothing
  const clickTarget = cert.credential || (cert.image ? cert.image : null);

  const visual = cert.image
    ? `<a class="cert-img-link" ${clickTarget ? `href="${clickTarget}" target="_blank" rel="noopener"` : ""}>
         <img
           class="cert-image"
           src="${cert.image}"
           alt="${cert.name} certificate"
           loading="lazy"
         >
       </a>`
    : `<div class="cert-badge">🏆</div>`;

  const link =
    cert.credential && !cert.image
      ? `<a class="cert-link" href="${cert.credential}" target="_blank" rel="noopener">View Credential ↗</a>`
      : cert.credential && cert.image
      ? `<a class="cert-link" href="${cert.credential}" target="_blank" rel="noopener">View Credential ↗</a>`
      : "";

  return `
    <div class="cert-card" id="cert-${cert.id}">
      ${visual}
      <div class="cert-info">
        <div class="cert-name">${cert.name}</div>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-date">${cert.date}</div>
        ${link}
      </div>
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
