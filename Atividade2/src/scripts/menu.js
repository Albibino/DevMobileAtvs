document.addEventListener('DOMContentLoaded', () => {
  const body     = document.body;
  const header   = document.querySelector('header');
  const toggle   = document.querySelector('.nav-toggle');
  const nav      = document.getElementById('menu');
  const closeBtn = nav?.querySelector('.nav-close');
  const backdrop = document.querySelector('.backdrop');
  if (!toggle || !nav || !backdrop) return;

  const focusableSel = [
    'a[href]', 'button:not([disabled])', 'input', 'select', 'textarea',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const firstLink = nav.querySelector('a');

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const nodes = nav.querySelectorAll(focusableSel);
    if (!nodes.length) return;
    const first = nodes[0];
    const last  = nodes[nodes.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

function openMenu() {
  if (mql.matches) return;
  document.body.classList.add('menu-open', 'no-scroll');
  toggle.setAttribute('aria-expanded', 'true');
  nav.setAttribute('aria-hidden', 'false');
  nav.removeAttribute('inert');
  backdrop.hidden = false;
  document.addEventListener('keydown', onKeydown);
  nav.addEventListener('keydown', trapFocus);
  firstLink?.focus({ preventScroll: true });
}

function closeMenu() {
  document.body.classList.remove('menu-open', 'no-scroll');
  toggle.setAttribute('aria-expanded', 'false');

  if (!mql.matches) {
    nav.setAttribute('aria-hidden', 'true');
    nav.setAttribute('inert', '');
    backdrop.hidden = true;
  }

  document.removeEventListener('keydown', onKeydown);
  nav.removeEventListener('keydown', trapFocus);
  toggle.focus({ preventScroll: true });
}

  function onKeydown(e) {
    if (e.key === 'Escape') closeMenu();
  }

  toggle.addEventListener('click', () => {
    const open = body.classList.contains('menu-open');
    open ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  const mql = window.matchMedia('(min-width: 1024px)');
  const sync = (e) => { if (e.matches) closeMenu(); };
  mql.addEventListener('change', sync);

  closeMenu();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}
});
