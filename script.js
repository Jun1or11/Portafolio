// ===== ACTIVE LINK + NAVBAR SHRINK + PROGRESS =====
const progressBar = document.getElementById('progressBar');
const navbar = document.querySelector('.navbar');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.navbar__link')];

function updateActiveLink() {
  let current = sections[0];
  let minTop = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = Math.abs(rect.top - 80);
    if (rect.top <= 250 && top < minTop) {
      minTop = top;
      current = section;
    }
  });

  navLinks.forEach((link) => link.classList.remove('navbar__link--active'));
  const active = navLinks.find(
    (link) => link.getAttribute('href') === '#' + current.id
  );
  if (active) active.classList.add('navbar__link--active');
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';

  if (scrollTop > 50) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }

  updateActiveLink();
});

updateActiveLink();

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typing-text');
const text = 'Full Stack Developer';
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting && index <= text.length) {
    typingText.textContent = text.slice(0, index);
    index++;
    setTimeout(typeEffect, 80);
  } else if (index > 0) {
    isDeleting = true;
    typingText.textContent = text.slice(0, index);
    index--;
    setTimeout(typeEffect, 30);
  } else {
    isDeleting = false;
    index = 0;
    setTimeout(typeEffect, 1000);
  }
}

typeEffect();

// ===== TYPING LOGO =====
const logoText = document.getElementById('logo-text');
const logoName = 'Junior';
let logoIndex = 0;

function typeLogo() {
  if (logoIndex <= logoName.length) {
    logoText.textContent = logoName.slice(0, logoIndex);
    logoIndex++;
    setTimeout(typeLogo, 100);
  }
}

setTimeout(typeLogo, 500);

// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== INTERSECTION OBSERVER — FADE-IN CON STAGGER =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const grid = entry.target.closest('.projects__grid, .skills__grid');
        if (grid) {
          const items = [...grid.querySelectorAll('.fade-in')];
          const hidden = items.filter((el) => !el.classList.contains('visible'));
          hidden.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 120);
            observer.unobserve(item);
          });
        } else {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ===== AÑO DINÁMICO EN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();
