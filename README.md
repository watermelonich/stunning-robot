# worr4bl33hwder — portfolio

A static portfolio + blog for a web security researcher / bug bounty hunter persona. Pure HTML, CSS, and vanilla JavaScript — no build step, no frameworks, no CDN dependencies. Built to host on GitHub Pages as-is.

## Structure

```
.
├── index.html                  # landing page (hero, about, focus areas, featured writeups, contact)
├── blog/
│   ├── index.html               # blog index with search + tag filtering
│   └── *.html                   # 10 individual blog posts
├── css/
│   └── style.css                # entire design system (design tokens, components, responsive rules)
├── js/
│   ├── main.js                  # nav, hero typing effect, terminal easter egg, scroll reveal, copy buttons
│   └── blog.js                  # blog search + category filtering
├── assets/
│   └── favicon.svg
└── README.md
```

## Running locally

No build step required. Either open `index.html` directly in a browser, or serve it locally so relative paths behave exactly like they will on GitHub Pages:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder to it (commonly named `watermelonich.github.io` for a user site, or any name for a project site).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then save.
5. GitHub will publish the site at `https://watermelonich.github.io/stunning-robot/` (or `https://watermelonich.github.io/` for a user site repo). It usually takes a minute or two for the first deploy.

Because every internal link uses relative paths (`css/style.css`, `blog/index.html`, `../index.html`, etc.), the site works identically whether it's hosted at the domain root or in a subpath — no config changes needed either way.

## Customization checklist

Before publishing, update the placeholder content:

- **Contact info** — GitHub, HackerOne, and Code4rena links in [index.html](index.html) (`#contact` section) and in the terminal command data in [js/main.js](js/main.js)
- **Bio** — the `about.txt` copy and `~/profile.json` card in the About section
- **Handle** — a project-wide find-and-replace of `worr4bl33hwder` if you want to use a different handle
- **Blog posts** — the 10 posts under [blog/](blog/) are original educational write-ups on common bug bounty topics (IDOR, XSS/CSP, SSRF, race conditions, recon, OAuth, GraphQL, report writing, JWT, subdomain takeover). Swap in your own real write-ups and dates as you publish them, and update the featured cards on the homepage and the post-to-post prev/next links in each article if you add or remove posts.
- **Favicon** — [assets/favicon.svg](assets/favicon.svg) is a simple `>_` mark; replace with your own if desired.

## Notes

- Dark theme only, by design.
- No external font/analytics/tracking requests — everything is self-contained.
- The hero terminal is a cosmetic easter egg (`help`, `whoami`, `about`, `skills`, `contact`, `neofetch`, `clear`, etc.) implemented in `initTerminal()` in [js/main.js](js/main.js) — it's not a real shell.
- Respects `prefers-reduced-motion`.
