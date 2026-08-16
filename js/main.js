/**
 * ============================================================
 *  MAIN ENTRY POINT
 * ============================================================
 *  Fetches all JSON data in parallel, wires renderers + router.
 *  You should NOT need to edit this file for normal content changes.
 * ============================================================
 */

// ── Renderers ────────────────────────────────────────────────
import { renderHomePage }           from "../renderer/homeRenderer.js";
import { renderProjectsPage }       from "../renderer/projectRenderer.js";
import { renderSkillsPage }         from "../renderer/skillRenderer.js";
import { renderContactPage }        from "../renderer/contactRenderer.js";
import { renderExperiencePage }     from "../renderer/experienceRenderer.js";
import { renderCertificationsPage } from "../renderer/certificationRenderer.js";

// ── Router ───────────────────────────────────────────────────
import { Router } from "./router.js";

// ── Fetch all JSON data in parallel (top-level await, ES module) ──
const [
  profile,
  projects,
  skillCategories,
  contactLinks,
  experience,
  certifications,
] = await Promise.all([
  fetch("data/profile.json").then((r) => r.json()),
  fetch("data/projects.json").then((r) => r.json()),
  fetch("data/skills.json").then((r) => r.json()),
  fetch("data/contact.json").then((r) => r.json()),
  fetch("data/experience.json").then((r) => r.json()),
  fetch("data/certifications.json").then((r) => r.json()),
]);

// ── Page map: name → render function ─────────────────────────
const pages = {
  home:           () => renderHomePage(profile),
  projects:       () => renderProjectsPage(projects, profile.terminalUser),
  skills:         () => renderSkillsPage(skillCategories, profile.terminalUser),
  experience:     () => renderExperiencePage(experience, profile.terminalUser),
  certifications: () => renderCertificationsPage(certifications, profile.terminalUser),
  contact:        () => renderContactPage(contactLinks, profile.terminalUser),
};

// ── Bootstrap ────────────────────────────────────────────────
const contentEl = document.getElementById("main-content");

const router = new Router({
  contentEl,
  titleEl:      document.getElementById("terminal-title"),
  navItems:     document.querySelectorAll(".nav-item"),
  pages,
  terminalUser: profile.terminalUser,
});

// ── Project tag filtering (delegated listener on the content area) ──
contentEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  // Update active state on all filter buttons
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.dataset.filter;

  document.querySelectorAll("#projects-list .project-card").forEach((card) => {
    if (filter === "all") {
      card.style.display = "";
    } else {
      const tech = card.dataset.tech.split(",");
      card.style.display = tech.includes(filter) ? "" : "none";
    }
  });
});

// ── Load Home by Default ──────────────────────────────────────
router.navigate("home");
