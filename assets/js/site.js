(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const filterButtons = [...document.querySelectorAll('[data-pub-filter]')];
  const publicationGroups = [...document.querySelectorAll('.pub-group')];

  const closeMenu = (restoreFocus = false) => {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    if (restoreFocus) menu.focus({ preventScroll: true });
  };

  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  const setPublicationFilter = category => {
    filterButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.pubFilter === category));
    });
    publicationGroups.forEach(group => {
      group.hidden = category !== 'all' && group.dataset.category !== category;
    });
    const count = publicationGroups.filter(group => !group.hidden)
      .reduce((total, group) => total + group.querySelectorAll('.pub').length, 0);
    document.getElementById('pub-status').textContent = `${count} publication${count === 1 ? '' : 's'} shown.`;
  };
  filterButtons.forEach(button => {
    button.addEventListener('click', () => setPublicationFilter(button.dataset.pubFilter));
  });

  const revealHash = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;

    // A direct article link must reveal the article even after a filter hid it.
    const publicationGroup = target.closest('.pub-group');
    if (publicationGroup && publicationGroup.hidden) setPublicationFilter('all');
    let parent = target;
    while (parent) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      parent = parent.parentElement;
    }
    if (location.hash) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('href') === location.hash) revealHash();
    });
  });
  if (location.hash) revealHash();

  const sections = [...nav.querySelectorAll('a')].map(link => document.querySelector(link.getAttribute('href')));
  let pendingHighlight = false;
  const highlight = () => {
    let current = null;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 140) current = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    nav.querySelectorAll('a').forEach(link => {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pendingHighlight = false;
  };
  window.addEventListener('scroll', () => {
    if (!pendingHighlight) {
      pendingHighlight = true;
      requestAnimationFrame(highlight);
    }
  }, { passive: true });
  highlight();

  const viewer = document.getElementById('media-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const stage = document.getElementById('viewer-stage');
  const zoomOut = document.getElementById('zoom-out');
  const zoomIn = document.getElementById('zoom-in');
  let zoom = 1;
  let lastImageTrigger = null;

  const setZoom = () => {
    viewerImage.style.width = `${zoom * 100}%`;
    document.getElementById('zoom-value').textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= 0.5;
    zoomIn.disabled = zoom >= 3;
  };
  const showImage = (src, title, trigger) => {
    lastImageTrigger = trigger;
    zoom = 1;
    setZoom();
    document.getElementById('viewer-title').textContent = title;
    const sourceImage = trigger.querySelector('img');
    const sourceMedia = sourceImage || trigger.querySelector('svg');
    if (sourceMedia) {
      // Reserve the figure's aspect ratio while an external asset loads.
      viewerImage.width = sourceImage?.naturalWidth || Number(sourceMedia.getAttribute('width'));
      viewerImage.height = sourceImage?.naturalHeight || Number(sourceMedia.getAttribute('height'));
    }
    viewerImage.src = src;
    viewerImage.alt = sourceImage?.alt || title;
    if (typeof viewer.showModal === 'function') {
      viewer.showModal();
      document.body.classList.add('viewer-open');
      stage.scrollTo({ top: 0, left: 0 });
    } else window.open(src, '_blank', 'noopener');
  };
  document.querySelectorAll('[data-image-title]').forEach(button => {
    button.addEventListener('click', () => showImage(button.querySelector('img').src, button.dataset.imageTitle, button));
  });
  document.querySelectorAll('[data-diagram-title]').forEach(button => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      if (image) showImage(image.src, button.dataset.diagramTitle, button);
      else {
        const svg = new XMLSerializer().serializeToString(button.querySelector('svg'));
        showImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), button.dataset.diagramTitle, button);
      }
    });
  });
  document.getElementById('close-viewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    viewerImage.removeAttribute('src');
    if (lastImageTrigger) lastImageTrigger.focus({ preventScroll: true });
  });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  zoomIn.addEventListener('click', () => { zoom = Math.min(3, zoom + 0.25); setZoom(); });
  zoomOut.addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.25); setZoom(); });

  const marathonTrigger = document.getElementById('marathon-trigger');
  const profileMarathonTrigger = document.getElementById('profile-marathon-trigger');
  const marathonPopup = document.getElementById('marathon-popup');
  let lastMarathonTrigger = marathonTrigger;
  const showMarathon = trigger => {
    if (marathonPopup.open) return;
    lastMarathonTrigger = trigger;
    if (typeof marathonPopup.showModal !== 'function') {
      window.alert('Sub-4 marathoner\n42.195 km · 3:59:22\n2025 Incheon Marathon · 23 November 2025');
      return;
    }
    marathonPopup.showModal();
    document.body.classList.add('marathon-open');
  };
  [marathonTrigger, profileMarathonTrigger].forEach(trigger => {
    trigger.addEventListener('click', () => showMarathon(trigger));
  });
  document.getElementById('close-marathon').addEventListener('click', () => marathonPopup.close());
  marathonPopup.addEventListener('close', () => {
    document.body.classList.remove('marathon-open');
    lastMarathonTrigger.focus({ preventScroll: true });
  });
  marathonPopup.addEventListener('click', event => {
    if (event.target !== marathonPopup) return;
    const bounds = marathonPopup.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) marathonPopup.close();
  });
  marathonTrigger.hidden = false;
  profileMarathonTrigger.disabled = false;

  let printStates = [];
  window.addEventListener('beforeprint', () => {
    if (printStates.length) return;
    printStates = [...document.querySelectorAll('.study,.past-posters,.more-cv')]
      .map(element => ({ element, open: element.open }));
    printStates.forEach(({ element }) => { element.open = true; });
  });
  window.addEventListener('afterprint', () => {
    printStates.forEach(({ element, open }) => { element.open = open; });
    printStates = [];
  });
})();
