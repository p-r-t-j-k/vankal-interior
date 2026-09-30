const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('mobile-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('mobile-open')));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
  const strength = Number(card.dataset.tilt || 8);
  card.addEventListener('pointermove', e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 700) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.setProperty('--rx', `${(-y * strength).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${(x * strength).toFixed(2)}deg`);
    card.style.transform = `perspective(1200px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translateZ(5px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--rx'); card.style.removeProperty('--ry');
    card.style.transform = '';
  });
});

// Subtle depth movement for the hero photo stack.
const hero = document.querySelector('.hero-3d');
if (hero) {
  hero.addEventListener('pointermove', e => {
    if (window.innerWidth < 700 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    hero.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    hero.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
  });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--rx','0deg'); hero.style.setProperty('--ry','0deg'); });
}
