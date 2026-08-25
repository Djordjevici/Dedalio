// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
navToggle?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ---------- Pillar cards (Kada projekti postanu kompleksni) ----------
const pillarCards = document.querySelectorAll('.pillar-card');
pillarCards.forEach(card => {
  card.addEventListener('click', () => {
    pillarCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ---------- Module tabs (Naši moduli) ----------
const moduleTabs = document.querySelectorAll('.module-tab');
const modulePanels = document.querySelectorAll('.module-panel');
moduleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.module;
    moduleTabs.forEach(t => t.classList.remove('active'));
    modulePanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('module-' + id).classList.add('active');
  });
});

// ---------- Role tabs (Za koga je Dedalio) ----------
const roleTabs = document.querySelectorAll('.role-tab');
const rolePanels = document.querySelectorAll('.role-panel');
roleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const role = tab.dataset.role;
    roleTabs.forEach(t => t.classList.remove('active'));
    rolePanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector('.role-panel[data-role="' + role + '"]').classList.add('active');
  });
});

// ---------- Deep links into hidden tab panels (footer "Moduli" links) ----------
function activatePanelForHash(hash, scroll) {
  const id = hash.replace('#', '');
  if (!id) return;
  const modulePanel = document.getElementById(id);
  if (modulePanel && modulePanel.classList.contains('module-panel')) {
    const num = modulePanel.dataset.module;
    const tab = document.querySelector('.module-tab[data-module="' + num + '"]');
    tab?.click();
    if (scroll) modulePanel.closest('section').scrollIntoView();
  }
}
window.addEventListener('hashchange', () => activatePanelForHash(location.hash, true));
document.querySelectorAll('a[href^="#module-"]').forEach(link => {
  link.addEventListener('click', () => activatePanelForHash(link.getAttribute('href'), false));
});
window.addEventListener('DOMContentLoaded', () => {
  if (location.hash) activatePanelForHash(location.hash, true);
});

// ---------- Wins carousel (Male stvari) ----------
const winsCarousel = document.getElementById('winsCarousel');
const winsDotsWrap = document.getElementById('winsDots');
const winsCount = document.getElementById('winsCount');
if (winsCarousel) {
  const cards = winsCarousel.querySelectorAll('.win-card');
  const total = cards.length;
  const perPage = 4;
  const pages = Math.ceil(total / perPage);

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      const card = cards[i * perPage];
      winsCarousel.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
    });
    winsDotsWrap.appendChild(dot);
  }
  const dots = winsDotsWrap.querySelectorAll('button');

  function updateDots() {
    const scrollLeft = winsCarousel.scrollLeft;
    let closestIdx = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - 24 - scrollLeft);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });
    const page = Math.min(pages - 1, Math.floor(closestIdx / perPage));
    dots.forEach((d, i) => d.classList.toggle('active', i === page));
    winsCount.textContent = (closestIdx + 1) + ' / ' + total;
  }
  winsCarousel.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateDots);
  });
}
