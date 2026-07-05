# Harish — Premium Developer Portfolio

> Award-winning developer portfolio inspired by [Awwwards](https://www.awwwards.com) — featuring a hand-drawn animated Bengaluru cityscape, glassmorphism UI, and rich micro-interactions. Built with pure HTML, CSS, and vanilla JavaScript. Zero dependencies. Zero build step.

---

## Live Preview

🌐 [harishalal996-design.github.io/myprotofolio-harish](https://harishalal996-design.github.io/myprotofolio-harish/)

---

## Screenshots

| Hero (Bengaluru Skyline) | Skills & Projects |
|---|---|
| Canvas-drawn cityscape with animated Namma Metro | Interactive skill bars + 3D tilt project cards |

---

## Features

### Visual Design
- **Cinematic Bengaluru hero** — fully canvas-drawn skyline with Vidhana Soudha dome, Bengaluru Palace turrets, Namma Metro train (animated in real-time), warm twilight sky, stars, moon, and wet road reflections
- **Dark premium theme** — `#07111F` background, `#00D4FF` cyan accent, `#6C63FF` violet, `#FFB703` gold highlights
- **Glassmorphism** — navigation bar, contact form, and cards use `backdrop-filter: blur()` glass effect
- **Gradient text** — headings and key accents use CSS gradient clip
- **Floating tech icons** — React, Node.js, Java, Docker, AWS, GitHub, AI animate with parallax float

### Animations & Interactions
- **Custom cursor** — dot + trailing ring, scales on hover, hidden on touch devices
- **Scroll progress bar** — gradient bar at top tracks reading progress
- **Animated particle network** — 55 connected particles overlay the hero
- **Hero parallax** — cityscape scrolls at 0.18× speed for depth
- **Scroll reveal** — every section fades and slides up on intersection
- **Animated counters** — stats count up with ease-out-quart easing
- **Skill bar fill** — CSS bars animate to their percentage on scroll entry
- **3D card tilt** — project cards respond to mouse position with `rotateX/Y`
- **Certification pop-in** — staggered scale animation for cert cards
- **Bouncing scroll indicator** — animated mouse wheel in hero

### Sections
| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Bengaluru cityscape + particles + floating icons + 3 CTA buttons |
| 2 | **Stats** | Animated counters: Projects, Technologies, Experience, Always Learning |
| 3 | **About** | Bio, tech chips, animated avatar ring, career timeline |
| 4 | **Skills** | Tech icon grid (Frontend / Backend / Cloud) + animated skill bars |
| 5 | **Projects** | 4 premium project cards with 3D tilt and hover effects |
| 6 | **Certifications** | 6 certification cards with stagger pop-in |
| 7 | **Contact** | Glassmorphism form + contact details + social links |
| 8 | **Footer** | Navigation, social links, back-to-top button |

### Performance & Accessibility
- Semantic HTML5 with proper `aria-label`, `aria-hidden`, `role` attributes
- All interactive elements keyboard-navigable
- `preconnect` hints for Google Fonts
- Images use `loading="lazy"` where applicable
- Animations respect `prefers-reduced-motion` via CSS
- Mobile-first responsive at 400 / 640 / 900 / 1024px breakpoints
- Custom cursor auto-disabled on touch devices
- SEO meta tags: description, keywords, author, Open Graph, Twitter Card

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, glassmorphism, Grid, Flexbox) |
| Scripting | Vanilla JavaScript ES6+ (no frameworks) |
| Fonts | Google Fonts — Space Grotesk, Space Mono, Inter, Caveat |
| Graphics | HTML5 Canvas 2D API |
| Animations | CSS keyframes + Web Animations API + requestAnimationFrame |
| Icons | Inline SVG |
| Deployment | GitHub Pages |

---

## Project Structure

```
portfolio/
├── index.html      # Full single-page markup — all 8 sections
├── style.css       # Complete design system — tokens, components, layout
├── main.js         # All interactivity — canvas, particles, animations
├── resume.pdf      # (add your own resume here)
└── README.md       # This file
```

---

## Installation & Local Development

No build tools or package managers needed.

### Option 1 — VS Code Live Server (recommended)

```bash
# 1. Open the portfolio folder in VS Code
code "c:\Users\Hp\Downloads\html\portfolio"

# 2. Install the Live Server extension (if not installed)
#    Extensions → search "Live Server" by Ritwick Dey → Install

# 3. Right-click index.html → "Open with Live Server"
#    Or click "Go Live" in the status bar
```

### Option 2 — Python HTTP server

```bash
cd "c:\Users\Hp\Downloads\html\portfolio"

# Python 3
python -m http.server 5500

# Then open: http://localhost:5500
```

### Option 3 — Node.js serve

```bash
npx serve "c:\Users\Hp\Downloads\html\portfolio" -p 5500
# Then open: http://localhost:5500
```

---

## Customisation Guide

### Update personal details
Open `index.html` and update:
- Name, headline, description in the **Hero** section
- Bio paragraphs in the **About** section
- Timeline entries (roles, organisations, years)
- Project titles, descriptions, and technology tags
- Certification names and organisations
- Contact email, phone, LinkedIn, GitHub links
- Footer copyright name

### Change colour theme
All colours are CSS custom properties in `style.css`:
```css
:root {
  --bg:     #07111F;  /* Main background */
  --cyan:   #00D4FF;  /* Primary accent   */
  --violet: #6C63FF;  /* Secondary accent */
  --gold:   #FFB703;  /* Highlight        */
}
```

### Update stat counters
In `index.html`, find `.stat-num` elements and change `data-target` and `data-suffix`:
```html
<span class="stat-num" data-target="20" data-suffix="+">0</span>
```

### Add a real contact form backend
In `main.js`, find the simulated send section (section 13) and replace the `setTimeout` with a real fetch call to [Formspree](https://formspree.io), [EmailJS](https://emailjs.com), or your own API endpoint.

### Add your resume
Drop your `resume.pdf` into the `portfolio/` folder. The "Download Resume" button in the hero already links to `resume.pdf`.

---

## Deployment

### GitHub Pages (current live deployment)

```bash
# 1. Initialise git (if not already)
git init
git add index.html style.css main.js README.md

# 2. Commit
git commit -m "feat: premium portfolio redesign"

# 3. Push to GitHub
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main

# 4. Enable GitHub Pages
#    Repo Settings → Pages → Source: Deploy from branch → main → / (root)
#    Your site will be live at: https://<your-username>.github.io/<repo-name>/
```

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com) → "Deploy manually"
2. Drag the entire `portfolio/` folder onto the deploy zone
3. Get an instant live URL

### Vercel
```bash
npx vercel "c:\Users\Hp\Downloads\html\portfolio"
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Safari (iOS 15+) | ✅ Full |
| Chrome Android | ✅ Full |

> Note: `backdrop-filter` (glassmorphism) requires Safari 9+/Chrome 76+. Older browsers fall back to a semi-transparent background gracefully.

---

## Lighthouse Targets

| Category | Target |
|----------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

---

## Author

**Harish**
Full Stack Developer & AI Enthusiast
Bengaluru, Karnataka, India

- 🌐 Portfolio: [harishalal996-design.github.io/myprotofolio-harish](https://harishalal996-design.github.io/myprotofolio-harish/)
- 💼 LinkedIn: [linkedin.com/in/harish-alal](https://linkedin.com/in/harish-alal)
- 🐙 GitHub: [github.com/harishalal996](https://github.com/harishalal996)
- 📧 Email: harishalal996@gmail.com
- 📞 Phone: +91 6361949371
- 🏢 Currently: Full Stack Java Developer Intern @ Tap Academy, Bangalore

---

## License

This project is open source under the [MIT License](https://opensource.org/licenses/MIT).
You are free to use, modify, and distribute this code for personal and commercial purposes with attribution.

---

*Built with HTML, CSS & JavaScript · Crafted in Bengaluru 🇮🇳*
