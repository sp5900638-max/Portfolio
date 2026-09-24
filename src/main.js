import { InteractiveTerminal } from './terminal.js';
import { projects } from './projectsData.js';
import { LandingPlatformScene } from './threeScene.js';

const GITHUB_SVG = `
<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 4.435 9.795 10.59 11.235.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
</svg>
`;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Scrolling Landing Platform Canvas
  try {
    new LandingPlatformScene('webgl-canvas');
  } catch (err) {
    console.warn('WebGL platform scene failed to initialize:', err);
  }

  // 2. Initialize Interactive Production Terminal
  new InteractiveTerminal('terminal-body', 'terminal-input', 'terminal-output');

  // 3. Initialize Top Scroll Progress Indicator
  initScrollProgressBar();

  // 3. Initialize Intersection-Observer Content Reveals
  initIntersectionReveals();

  // 4. Setup Architecture Blueprint Modal
  initModalLogic();

  // 5. Setup One-Click Copy Email
  initCopyEmail();

  // 6. Mobile Navigation Drawer
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 7. Scrollspy for Active Navigation Links
  initScrollspy();
});

// Top Scroll Progress Bar (0% to 100%)
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

// Intersection-Observer Clean Entry Reveals
function initIntersectionReveals() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

// Modal Logic for Architectural Blueprints
function initModalLogic() {
  const modal = document.getElementById('arch-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalBody) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-arch-btn');
    if (btn) {
      const projId = btn.getAttribute('data-project-id');
      const proj = projects.find((p) => p.id === projId);
      if (proj) {
        openModal(proj);
      }
    }
  });

  function openModal(proj) {
    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
        <span class="case-badge ${proj.variant === 'violet' ? 'violet' : ''}">${proj.tag}</span>
        <span class="font-mono" style="font-size: 0.74rem; color: #94a3b8;">SYSTEM BLUEPRINT SPEC</span>
      </div>

      <h2 id="modal-title" class="font-display" style="font-size: 1.5rem; margin-bottom: 0.6rem; color: #fff;">
        ${proj.title}
      </h2>
      <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.25rem;">
        ${proj.architecture.overview}
      </p>

      <div style="color: var(--cyan-primary); font-weight: 600; font-size: 0.82rem; margin-bottom: 0.35rem;" class="font-mono">
        ARCHITECTURE &amp; DATA FLOW:
      </div>
      <pre class="arch-flow-diagram"><code>${proj.architecture.flowChart.trim()}</code></pre>

      <div style="color: #c084fc; font-weight: 600; font-size: 0.82rem; margin-bottom: 0.45rem;" class="font-mono">
        KEY ARCHITECTURAL DECISIONS:
      </div>
      <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.45rem;">
        ${proj.architecture.keyDecisions
          .map(
            (d) => `
          <li style="display: flex; gap: 0.5rem; font-size: 0.84rem; color: #cbd5e1;">
            <span style="color: #10b981; font-weight: 700;">✔</span>
            <span>${d}</span>
          </li>
        `
          )
          .join('')}
      </ul>

      <div style="color: #34d399; font-weight: 600; font-size: 0.82rem; margin-bottom: 0.45rem;" class="font-mono">
        CORE API CONTRACT:
      </div>
      <div style="background: #06080d; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.75rem; margin-bottom: 1.5rem; font-family: monospace; font-size: 0.78rem; display: flex; flex-direction: column; gap: 0.35rem;">
        ${proj.architecture.endpoints
          .map((ep) => `<div style="color: #38bdf8;">• ${ep}</div>`)
          .join('')}
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.2rem;">
        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.84rem; padding: 0.55rem 1.1rem;">
          ${GITHUB_SVG}
          <span>Inspect Repository</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// One-Click Copy Email with Toast
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  const btnText = document.getElementById('copy-email-text');
  const email = 'sp59600638@gmail.com';

  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      showToast('Email copied to clipboard: ' + email);

      if (btnText) {
        const originalText = btnText.textContent;
        btnText.textContent = 'Copied to Clipboard! ✔';
        setTimeout(() => {
          btnText.textContent = originalText;
        }, 2500);
      }
    } catch (err) {
      showToast('Contact: ' + email);
    }
  });
}

// Toast Notification
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Scrollspy for Nav Links
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}
