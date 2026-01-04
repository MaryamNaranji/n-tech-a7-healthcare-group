// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const menu      = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Smooth scroll for same-page #links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  });
});