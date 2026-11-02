(() => {
  'use strict';
  const root = document.documentElement;
  const storageKey = 'hyeonjun-color-theme';
  const systemTheme = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const normalize = value => value === 'light' || value === 'dark' ? value : 'system';
  let preference = 'system';
  try { preference = normalize(window.localStorage.getItem(storageKey)); } catch {}
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  let control, toggle, panel;
  let choices = [];

  const applyTheme = () => {
    const theme = preference === 'dark' || (preference === 'system' && systemTheme && systemTheme.matches)
      ? 'dark' : 'light';
    root.dataset.theme = theme;
    root.dataset.themePreference = preference;
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#141414' : '#ffffff');
    if (toggle) {
      const label = preference === 'system' ? `System (${theme})` : preference;
      toggle.setAttribute('aria-label', `Color theme: ${label}`);
    }
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference)));
  };
  applyTheme();

  const followSystem = () => { if (preference === 'system') applyTheme(); };
  if (systemTheme) {
    if (typeof systemTheme.addEventListener === 'function') systemTheme.addEventListener('change', followSystem);
    else if (typeof systemTheme.addListener === 'function') systemTheme.addListener(followSystem);
  }
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = normalize(event.newValue);
    applyTheme();
  });

  document.addEventListener('DOMContentLoaded', () => {
    control = document.getElementById('theme-control');
    toggle = document.getElementById('theme-toggle');
    panel = document.getElementById('theme-panel');
    if (!control || !toggle || !panel) return;
    choices = [...control.querySelectorAll('[data-theme-choice]')];
    const menu = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const closePanel = (restoreFocus = false) => {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open && menu && nav) {
        menu.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
    choices.forEach(button => button.addEventListener('click', () => {
      preference = normalize(button.dataset.themeChoice);
      applyTheme();
      try {
        if (preference === 'system') window.localStorage.removeItem(storageKey);
        else window.localStorage.setItem(storageKey, preference);
      } catch {}
      closePanel(true);
    }));
    document.addEventListener('click', event => {
      if (!control.contains(event.target)) closePanel();
    });
    control.addEventListener('focusout', event => {
      if (!control.contains(event.relatedTarget)) closePanel();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) closePanel(true);
    });
    if (menu) menu.addEventListener('click', () => closePanel());
    applyTheme();
    control.hidden = false;
  });
})();
