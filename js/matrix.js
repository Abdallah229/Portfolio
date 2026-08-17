/**
 * ============================================================
 *  MATRIX RAIN BACKGROUND
 * ============================================================
 *  Renders falling katakana / digit streams on the #matrix-bg
 *  canvas that sits behind the terminal card.
 * ============================================================
 */
(function () {
  'use strict';

  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  /* Character pool: katakana + hex digits + symbols */
  const CHARS =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピ' +
    'ウゥクスツヌフムユュルングズブヅプエェケセテネヘメレゲゼデベペ' +
    'オォコソトノホモヨョロヲゴゾドボポヴッン' +
    '0123456789ABCDEF{}[]<>/\\|-=+';

  const FONT_SIZE  = 14;        // px — one cell width = one character
  const TARGET_FPS = 20;        // lower = slower, moodier rain
  const INTERVAL   = 1000 / TARGET_FPS;

  let cols, drops, lastTime = 0;

  /** (Re)initialise on mount or resize. */
  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    /* Stagger drops so they don't all start at the top at once */
    drops = Array.from(
      { length: cols },
      () => Math.floor(Math.random() * -(canvas.height / FONT_SIZE))
    );
    /* Clear stale pixels after a resize */
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /** Draw one frame. */
  function draw() {
    /* Semi-transparent fill fades old characters → creates glowing trail */
    ctx.fillStyle = 'rgba(13, 13, 13, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${FONT_SIZE}px "Fira Code", monospace`;

    for (let i = 0; i < cols; i++) {
      /* Still in staggered delay — skip */
      if (drops[i] < 0) { drops[i]++; continue; }

      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x    = i * FONT_SIZE;
      const y    = drops[i] * FONT_SIZE;

      /* Head character: bright terminal-green (matches --accent-green: #27c93f) */
      ctx.fillStyle = '#39ff6a';
      ctx.fillText(char, x, y);

      /* Occasional white flash at the very tip */
      if (Math.random() > 0.96) {
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, x, y);
      }

      drops[i]++;

      /* Randomly reset column after it exits the bottom */
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20);
      }
    }
  }

  /** RequestAnimationFrame loop, throttled to TARGET_FPS. */
  function tick(timestamp) {
    requestAnimationFrame(tick);
    if (timestamp - lastTime < INTERVAL) return;
    lastTime = timestamp;
    draw();
  }

  init();
  window.addEventListener('resize', init);
  requestAnimationFrame(tick);
})();
