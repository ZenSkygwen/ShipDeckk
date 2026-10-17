# ShipDecKK — Luxury Maritime Architecture & Fleet Showcase

A modern, high-performance web portfolio for **ShipDecKK**, an elite shipyard specializing in bespoke luxury superyachts, transoceanic liners, and heavy commercial cargo vessels.

---

## 🚀 Key Improvements & Modernization

### 1. ⚡ High-Speed Loading & Deployment Optimization (84.8% Size Reduction)
- **Asset Compression & WebP Conversion**: Reduced total media asset weight from **21.26 MB down to 3.24 MB**.
  - Hero banner (`4223_3ba0f.jpg`): Reduced from **9.86 MB** down to **430 KB** (95.6% bandwidth savings).
  - Background texture (`klara-kulikova...jpg`): Reduced from **4.16 MB** down to **510 KB**.
- **Modern Picture Elements & Preloading**: Implemented `<picture>` with WebP sources, image preloading (`fetchpriority="high"` on critical above-the-fold heroes), and explicit `width`/`height` preventing Cumulative Layout Shift (CLS).
- **Lazy Loading**: `loading="lazy"` and `decoding="async"` across all catalog cards.
- **Clean Asset Paths**: Removed special characters (spaces, apostrophes) to guarantee 100% compatibility with Linux CDNs (Vercel, Netlify, GitHub Pages).

### 2. 💎 Ultra-Modern Luxury Maritime Aesthetic
- **Visual Design System**: Deep Navy (`#060e1a`) with Champagne Gold accents (`#e5b869`) and subtle cyan oceanic glows.
- **Typography**: Google Fonts [`Cinzel`](https://fonts.google.com/specimen/Cinzel) for nautical serif headings, paired with [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for high-legibility interface copy.
- **Glassmorphism**: Backdrop blur (`backdrop-filter: blur(18px)`), luminous borders, and smooth hover elevation cards.
- **Responsive Navigation**: Glassmorphic sticky header with scroll detection, active indicator pills, and animated mobile drawer menu.

### 3. 🎯 Interactive Features & Logic
- **Interactive Fleet Filter & Live Search (`gallery.html`)**: Filter between *All Vessels*, *Cargo Ships*, *High-End Yachts*, and *Luxury Liners*, with real-time live search by vessel name or specs.
- **Toast & Confirmation Modal System (`java.js`)**: Replaced default browser `alert()` and `confirm()` with a luxury branded toast notification and onboarding modal.
- **Bug Fix**: Fixed broken redirection (`Main Home.html` -> `index.html`) on subscription completion.

---

## 📂 Project Structure

```text
Portofolio-main/
├── assets/
│   └── img/                    # Optimized WebP and fallbacks
├── tools/
│   ├── optimize.py             # Image compression & WebP pipeline
│   └── verify.py               # 100% asset path verification script
├── index.html                  # Landing page & featured fleet
├── gallery.html                # Interactive filterable fleet catalog
├── service.html                # Maritime concierge & engineering services
├── aboutus.html                # Founder journey, principles & achievements
├── subscription.html           # Elite circle membership portal
├── styles.css                  # Modern responsive design system
├── java.js                     # Dynamic interactions, filtering & validation
└── README.md
```

---

## 🌐 Deployment Ready

The project contains pure static HTML5, CSS3, and modern Vanilla JavaScript with zero build steps required. Simply deploy the root directory to:
- **Vercel**: Import repository, Framework Preset: *Other*, Root Directory: `./`
- **Netlify**: Drag and drop the folder, or connect Git
- **GitHub Pages**: Settings -> Pages -> Deploy from branch `/root`
