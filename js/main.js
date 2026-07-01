/* =========================================================
   worr4bl33hwder — main.js
   Vanilla JS. No dependencies, no tracking, no nonsense.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initBackToTop();
  initFooterYear();
  initHeroTyping();
  initTerminal();
  initCodeCopyButtons();
});

/* ---------- Header background on scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const toggle = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggleBtn || !links) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 600) btn.classList.add('visible');
      else btn.classList.remove('visible');
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Hero typing effect ---------- */
function initHeroTyping() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'web security researcher.',
    'bug bounty hunter.',
    'breaker of broken auth.',
    'full-time IDOR enjoyer.',
    'professional 403-to-200 converter.',
    'CSP bypass enthusiast.',
    'reverse engineer with Binary Ninja Ultimate.',
    'smart contract auditor on Code4rena.',
    'reader of other people\u2019s JS bundles.'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? 35 : 55);
  };

  tick();
}

/* ---------- Terminal widget ---------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const log = document.getElementById('terminal-log');
  const body = document.getElementById('terminal-body');
  if (!input || !log || !body) return;

  const bio =
    'worr4bl33hwder — appsec researcher, bug bounty hunter, reverse engineer & smart contract auditor.\n' +
    'I hunt broken access control, auth flaws, and logic bugs across web apps, binaries (Binary Ninja Ultimate), and Solidity contracts (Code4rena).\n' +
    'Full write-ups live in the blog. Scroll down for the long version.';

  const skills =
    'Access Control (IDOR/BOLA)  Auth & Session  SSRF  XSS & CSP  GraphQL/REST APIs\n' +
    'Recon & OSINT  Race Conditions  JWT/OAuth  Cloud Misconfig  Automation (Python/Go/Bash)\n' +
    'Reverse Engineering (Binary Ninja Ultimate)  Smart Contract / DLT Audits (Solidity, Code4rena)';

  const contact =
    'github: github.com/watermelonich\n' +
    'h1:     hackerone.com/worr4bl33hwder\n' +
    'c4:     code4rena.com/@eightzerofour';

  const neofetch =
    'worr4bl33hwder@bugbounty\n' +
    '------------------------\n' +
    'OS: probably your target\u2019s\n' +
    'Shell: this fake one\n' +
    'Uptime: since the last 403\n' +
    'Focus: appsec, RE, smart contract audits\n' +
    'Status: hacking (with permission)';

  const commands = {
    help: () =>
      'available commands:\n' +
      '  help            show this list\n' +
      '  whoami          who am i\n' +
      '  about           short bio\n' +
      '  skills          focus areas\n' +
      '  contact         how to reach me\n' +
      '  socials         social links\n' +
      '  ls              list files\n' +
      '  cat <file>      read a file (about.txt, skills.txt, contact.txt)\n' +
      '  neofetch        yes, really\n' +
      '  date            current date\n' +
      '  clear           clear the terminal',
    whoami: () => 'worr4bl33hwder',
    about: () => bio,
    skills: () => skills,
    contact: () => contact,
    socials: () => contact,
    ls: () => 'about.txt  skills.txt  contact.txt  writeups/  blog/',
    'cat about.txt': () => bio,
    'cat skills.txt': () => skills,
    'cat contact.txt': () => contact,
    neofetch: () => neofetch,
    date: () => new Date().toString(),
    exit: () => 'this isn\u2019t a real shell, but I respect the effort.'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const raw = input.value;
    const trimmed = raw.trim();
    input.value = '';

    const echo = document.createElement('p');
    echo.className = 'echoed';
    echo.innerHTML = `<span class="prompt">$</span>${escapeHtml(raw)}`;
    log.appendChild(echo);

    if (trimmed === '') {
      scrollTerminal();
      return;
    }

    if (trimmed === 'clear') {
      log.innerHTML = '';
      return;
    }

    const lower = trimmed.toLowerCase();
    let output;

    if (lower.startsWith('sudo')) {
      output = 'permission denied: nice try \uD83D\uDE0F (this shell has no root, sorry)';
    } else if (commands[lower]) {
      output = commands[lower]();
    } else {
      output = `command not found: ${trimmed} \u2014 type 'help' for a list of commands`;
    }

    const out = document.createElement('p');
    out.textContent = output;
    log.appendChild(out);

    scrollTerminal();
  });

  function scrollTerminal() {
    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* ---------- Copy-to-clipboard for code blocks ---------- */
function initCodeCopyButtons() {
  const blocks = document.querySelectorAll('.article pre');
  if (!blocks.length) return;

  blocks.forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'copy';
    pre.appendChild(btn);

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const text = code ? code.textContent : pre.textContent;

      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      btn.textContent = 'copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 1600);
    });
  });
}
