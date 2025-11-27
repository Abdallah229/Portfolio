const pages = {
    home: `
        <div class="fade-in">
            <div class="prompt-line">
                <span class="p-user">user@cairo-university</span>:<span class="p-path">~</span>$ whoami
            </div>
            
            <h1><span id="typed-name"></span></h1>
            <p class="subtitle">Flutter Developer</p>

            <br>
            <pre><code class="language-javascript">const aboutMe = {
    education: "Cairo University",
    major: "Computer Science",
    focus: "Clean Architecture & SOLID",
    status: "Ready to work"
};</code></pre>
        </div>
    `,
    projects: `
        <div class="fade-in">
            <div class="prompt-line">
                <span class="p-user">user@cairo-university</span>:<span class="p-path">~/projects</span>$ ls -la
            </div>

            <div class="project-card">
                <div class="card-header">
                    <span class="proj-title">Expenses Tracker</span>
                    <div class="tech-stack">
                        <span>Flutter</span><span>Hive</span><span>BLoC</span>
                    </div>
                </div>
                <p style="color: #ccc; font-size: 0.9rem;">Comprehensive finance app with custom budgeting and spending visualization.</p>
                <div class="run-command">$ ./run_tracker.sh --offline-mode</div>
            </div>

            <div class="project-card">
                <div class="card-header">
                    <span class="proj-title">Flash Chat</span>
                    <div class="tech-stack">
                        <span>Flutter</span><span>Firebase</span><span>Auth</span>
                    </div>
                </div>
                <p style="color: #ccc; font-size: 0.9rem;">Real-time messaging platform with secure cloud sync.</p>
                <div class="run-command">$ ./start_server.py</div>
            </div>
        </div>
    `,
    skills: `
        <div class="fade-in">
            <div class="prompt-line">
                <span class="p-user">user@cairo-university</span>:<span class="p-path">~/skills</span>$ cat packages.txt
            </div>
            <div style="line-height: 1.8; color: #ccc;">
                <div><span style="color: var(--accent-green)">✔</span> Dart & Flutter (Expert)</div>
                <div><span style="color: var(--accent-green)">✔</span> Firebase Ecosystem</div>
                <div><span style="color: var(--accent-green)">✔</span> State Management (BLoC)</div>
                <div><span style="color: var(--accent-green)">✔</span> REST API Integration</div>
                <div><span style="color: var(--accent-green)">✔</span> Git & GitHub Actions</div>
                <div><span style="color: var(--accent-green)">✔</span> Linux / Podman</div>
            </div>
             <br>
            <div style="color: var(--text-muted)">Process finished with exit code 0</div>
        </div>
    `,
    contact: `
        <div class="fade-in">
            <div class="prompt-line">
                <span class="p-user">user@cairo-university</span>:<span class="p-path">~/contact</span>$ ./connect.sh
            </div>
            
            <div class="project-card">
                <span style="color: var(--accent-cmd)">EMAIL</span><br>
                <a href="mailto:abdallahmekky22@gmail.com" style="color: var(--accent-blue); text-decoration: none;">abdallahmekky22@gmail.com</a>
            </div>
             <div class="project-card">
                <span style="color: var(--accent-cmd)">GITHUB</span><br>
                <a href="#" style="color: var(--accent-blue); text-decoration: none;">github.com/abdallah</a>
            </div>
             <div class="project-card">
                <span style="color: var(--accent-cmd)">LINKEDIN</span><br>
                <a href="#" style="color: var(--accent-blue); text-decoration: none;">linkedin.com/in/abdallah</a>
            </div>
        </div>
    `
};

const mainContent = document.getElementById('main-content');
const title = document.getElementById('terminal-title');
const navItems = document.querySelectorAll('.nav-item');

function loadPage(page) {
    mainContent.innerHTML = pages[page];
    title.innerText = `user@cairo-university: ~/${page}`;
    
    // Highlight Code (Prism.js)
    if(window.Prism) Prism.highlightAll();

    // Typewriter Effect (Typed.js) - Only on Home page
    if (page === 'home') {
        new Typed('#typed-name', {
            strings: ['Abdallah Mohammed'],
            typeSpeed: 50,
            showCursor: false
        });
    }

    // Update Sidebar Active State
    navItems.forEach(item => {
        if (item.dataset.target === page) item.classList.add('active');
        else item.classList.remove('active');
    });
}

// Navigation Click Events
navItems.forEach(item => {
    item.addEventListener('click', () => {
        loadPage(item.dataset.target);
    });
});

// Load Home by Default
loadPage('home');