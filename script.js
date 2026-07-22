// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
});

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

// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== INTERSECTION OBSERVER (fade-in al hacer scroll) =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => observer.observe(el));

// ===== AÑO DINÁMICO EN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();
