'use strict';
/* ══════════════════════════════════════════════════════
   HARISH — Premium Portfolio  |  main.js
   No custom cursor — normal OS pointer/cursor used.
   Scroll Progress · Nav · Smooth Scroll · Particles
   Parallax · Scroll Reveal · Counters · Skill Bars
   3D Tilt · Contact Form · Footer Year · Cert Stagger
══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. SCROLL PROGRESS BAR
───────────────────────────────────────── */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────────
   2. NAV — scroll glass + active links
───────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe;

  // Re-implement properly
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      links.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
})();

/* ─────────────────────────────────────────
   3. HAMBURGER MENU
───────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('nav-burger');
  const menu = document.getElementById('nav-mobile');
  if (!btn || !menu) return;
  const toggle = close => {
    const open = !close && !btn.classList.contains('open');
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  };
  btn.addEventListener('click', () => toggle());
  menu.querySelectorAll('.nav-mobile-link')
      .forEach(l => l.addEventListener('click', () => toggle(true)));
})();

/* ─────────────────────────────────────────
   4. SMOOTH SCROLL
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

/* ─────────────────────────────────────────
   5. PARTICLE CANVAS (hero overlay)
───────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 55;
  const pts = Array.from({ length: COUNT }, () => ({
    x:   Math.random() * canvas.width,
    y:   Math.random() * canvas.height,
    r:   Math.random() * 1.5 + 0.3,
    vx:  (Math.random() - 0.5) * 0.25,
    vy:  (Math.random() - 0.5) * 0.25,
    a:   Math.random() * 0.40 + 0.08,
    hue: Math.random() < 0.55 ? 192 : 262
  }));

  (function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},88%,65%,${p.a})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    // Connecting lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 105) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - d / 105)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  })();
})();

/* ─────────────────────────────────────────
   6. HERO PHOTO PARALLAX
───────────────────────────────────────── */
(function () {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      bg.style.transform = `translateY(${window.scrollY * 0.22}px) scale(1.06)`;
    }
  }, { passive: true });
})();

/* ─────────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.10 }).observe;

  // Proper impl
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.10 });
  els.forEach(el => io.observe(el));
})();

/* ─────────────────────────────────────────
   8. ANIMATED STAT COUNTERS
───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.stat-num');
  if (!els.length) return;

  const animate = el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const dur    = 1800, start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(e * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();

/* ─────────────────────────────────────────
   9. SKILL BAR FILL ANIMATION
───────────────────────────────────────── */
(function () {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); io.unobserve(e.target); }
    });
  }, { threshold: 0.35 });
  bars.forEach(b => io.observe(b));
})();

/* ─────────────────────────────────────────
   10. PROJECT CARD 3-D TILT
───────────────────────────────────────── */
(function () {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `translateY(-8px) rotateY(${x * 9}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition =
        'transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();

/* ─────────────────────────────────────────
   11. CONTACT FORM
───────────────────────────────────────── */
(function () {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const nameEl  = document.getElementById('c-name');
  const emailEl = document.getElementById('c-email');
  const msgEl   = document.getElementById('c-msg');

  [nameEl, emailEl, msgEl].forEach(el => {
    if (el) el.addEventListener('input', () => el.classList.remove('error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = ''; status.className = 'form-status';
    let ok = true;
    if (!nameEl?.value.trim())                                 { nameEl.classList.add('error');  ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl?.value))   { emailEl.classList.add('error'); ok = false; }
    if (!msgEl?.value.trim())                                  { msgEl.classList.add('error');   ok = false; }
    if (!ok) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.classList.add('error');
      return;
    }
    const btn = document.getElementById('c-submit');
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    setTimeout(() => {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.classList.add('success');
      form.reset();
      if (btn) { btn.textContent = 'Send Message ✈'; btn.disabled = false; }
    }, 1800);
  });
})();

/* ─────────────────────────────────────────
   12. FOOTER YEAR
───────────────────────────────────────── */
(function () {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─────────────────────────────────────────
   13. CERT CARD STAGGER
───────────────────────────────────────── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes certPop {
      from { opacity:0; transform:scale(.9) translateY(18px); }
      to   { opacity:1; transform:scale(1)   translateY(0); }
    }
  `;
  document.head.appendChild(style);

  const cards = document.querySelectorAll('.cert-card');
  if (!cards.length) return;
  cards.forEach(c => { c.style.opacity = '0'; });

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.animation = `certPop .45s cubic-bezier(.34,1.56,.64,1) forwards`;
        }, i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(c => io.observe(c));
})();
