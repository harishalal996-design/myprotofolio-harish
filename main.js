'use strict';
/* ══════════════════════════════════════════════════
   PREMIUM PORTFOLIO — main.js
   Cursor · Progress · Nav · Particles · Counters
   Scroll Reveal · Skill Bars · Tilt · Contrib Graph
══════════════════════════════════════════════════ */

/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(0.6)');
  document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
})();

/* ── 2. SCROLL PROGRESS BAR ── */
(function initProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* ── 3. NAV SCROLL STATE ── */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  function check() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', check, { passive: true });
  check();
})();

/* ── 4. NAV ACTIVE HIGHLIGHT ── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ── 5. HAMBURGER MENU ── */
(function initHamburger() {
  const btn  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (!btn || !menu) return;

  function toggle(forceClose) {
    const open = !forceClose && !btn.classList.contains('open');
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  }
  btn.addEventListener('click', () => toggle());
  menu.querySelectorAll('.nav-mobile-link').forEach(l => l.addEventListener('click', () => toggle(true)));
})();

/* ── 6. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = (document.getElementById('nav')?.offsetHeight || 68);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ── 7. PARTICLES CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 60;
  const particles = Array.from({ length: COUNT }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    r:    Math.random() * 1.5 + 0.4,
    vx:   (Math.random() - 0.5) * 0.3,
    vy:   (Math.random() - 0.5) * 0.3,
    a:    Math.random() * 0.5 + 0.1,
    hue:  Math.random() < 0.6 ? 220 : 270,   // blue or violet
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.a})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 8. SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();

/* ── 9. SKILL BARS ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => obs.observe(b));
})();

/* ── 10. ANIMATED STAT COUNTERS ── */
(function initCounters() {
  const els = document.querySelectorAll('.stat-number');
  if (!els.length) return;

  function animate(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const dur     = 1600;
    const start   = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / dur, 1);
      const ease     = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
})();

/* ── 11. 3D TILT ON PROJECT CARDS ── */
(function initTilt() {
  document.querySelectorAll('.project-card:not(.project-card--placeholder)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.3s';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
})();

/* ── 12. CONTRIBUTION GRAPH ── */
(function initContribGraph() {
  const grid     = document.getElementById('contrib-grid');
  const monthRow = document.getElementById('activity-months');
  if (!grid) return;

  const WEEKS   = 36;
  const DAYS    = 7;
  const LEVELS  = [
    'rgba(15,23,42,0.05)',
    '#1a3a5c',
    '#2563a8',
    '#3b82f6',
    '#60a5fa',
  ];

  const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const today   = new Date();
  const cells   = [];

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const cell  = document.createElement('div');
      cell.className = 'contrib-cell';

      // Weighted random activity — more activity in recent weeks
      const recency = (w / WEEKS);
      const rand    = Math.random();
      let level;
      if (rand < 0.30 - recency * 0.05) level = 0;
      else if (rand < 0.55) level = 1;
      else if (rand < 0.75) level = 2;
      else if (rand < 0.90) level = 3;
      else level = 4;

      cell.style.setProperty('--c-cell', LEVELS[level]);
      cell.style.background = LEVELS[level];
      cell.title = `${level === 0 ? 'No' : level} contribution${level !== 1 ? 's' : ''}`;
      grid.appendChild(cell);
      cells.push(cell);
    }
  }

  // Month labels under the grid (approximate)
  if (monthRow) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 6; i++) {
      const idx  = (today.getMonth() - 5 + i + 12) % 12;
      const span = document.createElement('span');
      span.textContent = months[idx];
      span.style.cssText = `flex:1; font-size:11px; font-weight:700; color:rgba(15,23,42,0.35); font-family: monospace; min-width: 0; overflow: hidden;`;
      frag.appendChild(span);
    }
    monthRow.appendChild(frag);
  }

  // Animate cells in on scroll
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      cells.forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.3s, transform 0.3s';
          c.style.opacity = '1';
        }, i * 1.2);
      });
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(grid);
})();

/* ── 13. CONTACT FORM ── */
(function initForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const nameEl    = document.getElementById('contact-name');
  const emailEl   = document.getElementById('contact-email');
  const messageEl = document.getElementById('contact-message');

  [nameEl, emailEl, messageEl].forEach(el => {
    if (el) el.addEventListener('input', () => el.classList.remove('error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = ''; status.className = 'form-status';
    let valid = true;

    if (!nameEl?.value.trim())                               { nameEl.classList.add('error');    valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl?.value)) { emailEl.classList.add('error');   valid = false; }
    if (!messageEl?.value.trim())                            { messageEl.classList.add('error'); valid = false; }

    if (!valid) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.classList.add('error');
      return;
    }

    const btn = document.getElementById('contact-submit');
    btn.textContent = 'Sending…'; btn.disabled = true;

    setTimeout(() => {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.classList.add('success');
      form.reset();
      btn.textContent = 'Send Message ✈'; btn.disabled = false;
    }, 1800);
  });
})();

/* ── 14. FOOTER YEAR ── */
(function() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── 15. HERO BG PARALLAX ── */
(function initParallax() {
  const bg = document.querySelector('.hero-photo-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      bg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }
  }, { passive: true });
})();
