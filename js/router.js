/**
 * ============================================================
 *  ROUTER
 * ============================================================
 *  Manages navigation between pages. Wires sidebar clicks,
 *  updates active state, and delegates rendering to page modules.
 * ============================================================
 */

export class Router {
  /**
   * @param {Object} config
   * @param {HTMLElement} config.contentEl   - The main content container
   * @param {HTMLElement} config.titleEl     - The terminal title bar element
   * @param {NodeList}   config.navItems     - All sidebar nav-item elements
   * @param {Object}     config.pages        - Map of pageName → render function
   * @param {string}     config.terminalUser - Username prefix for the title bar
   */
  constructor({ contentEl, titleEl, navItems, pages, terminalUser }) {
    this.contentEl = contentEl;
    this.titleEl = titleEl;
    this.navItems = navItems;
    this.pages = pages;
    this.terminalUser = terminalUser;

    this._bindNav();
  }

  /** Attaches click listeners to every sidebar nav item. */
  _bindNav() {
    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.navigate(item.dataset.target);
      });
    });
  }

  /** Updates the active highlight in the sidebar. */
  _setActive(page) {
    this.navItems.forEach((item) => {
      if (item.dataset.target === page) item.classList.add("active");
      else item.classList.remove("active");
    });
  }

  /**
   * Navigates to a named page.
   * @param {string} page - The page name (must be a key in this.pages)
   */
  navigate(page) {
    if (!this.pages[page]) {
      console.error(`[Router] Unknown page: "${page}"`);
      return;
    }

    // Render the page HTML
    this.contentEl.innerHTML = this.pages[page]();

    // Update title bar
    this.titleEl.innerText = `${this.terminalUser}: ~/${page}`;

    // Syntax highlighting
    if (window.Prism) Prism.highlightAll();

    // Typewriter on home page only
    if (page === "home" && window.Typed) {
      new Typed("#typed-name", {
        strings: [document.getElementById("typed-name").dataset.name],
        typeSpeed: 50,
        showCursor: false,
      });
    }

    this._setActive(page);
  }
}
