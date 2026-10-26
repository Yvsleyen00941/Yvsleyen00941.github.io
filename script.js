// yorben.me — reveal on scroll, hero parallax, project sheet, lightbox, copy-to-clipboard.

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projects = ['cockpit', 'cairn', 'aerocommand', 'waybill', 'homehub'];

// 1. Reveal sections as they scroll in. A wall-clock fallback shows everything
//    even when animation frames are paused (background tab, slow device).
const revealables = document.querySelectorAll('[data-reveal]');
const revealAll = () => revealables.forEach(el => el.classList.add('is-in'));
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal'));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 70}ms`;
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealables.forEach(el => io.observe(el));
  setTimeout(revealAll, 2500);
} else {
  revealAll();
}

// 2. Hero parallax: the screens drift with the pointer, each at its own depth.
const floats = document.querySelectorAll('.float');
if (floats.length && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  let frame = null;
  window.addEventListener('pointermove', e => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      floats.forEach(f => {
        const d = Number(f.dataset.depth || 10);
        f.style.setProperty('--px', (-x * d).toFixed(1));
        f.style.setProperty('--py', (-y * d).toFixed(1));
      });
    });
  }, { passive: true });
}

// 3. Active nav link follows the section in view.
const navLinks = document.querySelectorAll('.nav-links a');
const sections = ['work', 'about', 'contact'].map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = null;
  sections.forEach(s => { if (s && s.offsetTop <= y) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`));
}, { passive: true });

// 4. Project sheet, driven by the URL hash (#cockpit, #cairn, …) so links can be shared.
//    Opening from a card adds one history entry, so the back button closes the sheet.
const sheet = document.getElementById('sheet');
const panel = sheet.querySelector('.sheet-panel');
const details = sheet.querySelectorAll('[data-detail]');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const pageTitle = document.title;
let closeTimer = null;
let lastCard = null;

function showProject(slug) {
  clearTimeout(closeTimer);
  sheet.classList.remove('is-closing');
  details.forEach(d => { d.hidden = d.dataset.detail !== slug; });
  const title = sheet.querySelector(`[data-detail="${slug}"] .detail-title`);
  title.id = `title-${slug}`;
  sheet.setAttribute('aria-labelledby', title.id);
  panel.scrollTop = 0;
  if (!sheet.open) {
    sheet.showModal();
    document.documentElement.style.overflow = 'hidden';
  }
  document.title = `${title.textContent} — Yorben`;
}

function hideSheet() {
  if (!sheet.open || sheet.classList.contains('is-closing')) return;
  closeLightbox();
  sheet.classList.add('is-closing');
  closeTimer = setTimeout(() => {
    sheet.close();
    sheet.classList.remove('is-closing');
    document.documentElement.style.overflow = '';
    document.title = pageTitle;
    if (lastCard) lastCard.focus({ preventScroll: true });
  }, reduceMotion ? 0 : 260);
}

function requestClose() {
  if (history.state && history.state.sheet) {
    history.back(); // popstate below hides the sheet
  } else {
    history.replaceState(null, '', location.pathname + location.search);
    hideSheet();
  }
}

function syncWithHash() {
  const slug = location.hash.slice(1);
  if (projects.includes(slug)) showProject(slug);
  else hideSheet();
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  const slug = link.getAttribute('href').slice(1);
  if (!projects.includes(slug)) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    if (sheet.open) {
      history.replaceState(history.state, '', `#${slug}`); // "Next" swaps the project in place
    } else {
      lastCard = link;
      history.pushState({ sheet: true }, '', `#${slug}`);
    }
    showProject(slug);
  });
});

window.addEventListener('popstate', syncWithHash);
window.addEventListener('hashchange', syncWithHash);
sheet.querySelector('.sheet-close').addEventListener('click', requestClose);
sheet.addEventListener('cancel', e => {
  e.preventDefault();
  if (!lightbox.hidden) closeLightbox();
  else requestClose();
});
sheet.addEventListener('click', e => {
  if (e.target === sheet) requestClose(); // a click on the backdrop
});
syncWithHash();

// 5. Lightbox for the screenshots in the sheet.
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute('src');
}
sheet.querySelectorAll('.shot img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
  });
});
lightbox.addEventListener('click', closeLightbox);

// 6. Copy the email address.
const toast = document.getElementById('toast');
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.copy;
    const msg = val.startsWith('http') ? 'Link copied to clipboard!' : 'Address copied';
    navigator.clipboard?.writeText(val)
      .then(() => showToast(msg))
      .catch(() => showToast(val));
  });
});
