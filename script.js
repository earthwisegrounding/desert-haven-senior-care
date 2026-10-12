// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Reveal sections as they scroll into view
const revealTargets = document.querySelectorAll(
  '.welcome__inner > *, .feature__photo, .feature__copy, .stats__inner > div, .steps li, .day__photo, .timeline li, .featured-quote, .quotes figure, details'
);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Contact form (front-end only; connect to a form service or backend to receive messages)
const form = document.getElementById('contact-form');
const status = form.querySelector('.form__status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    const empty = !field.value.trim();
    field.classList.toggle('invalid', empty);
    if (empty) valid = false;
  });

  if (!valid) {
    status.style.color = '#b3261e';
    status.textContent = 'Please add your name and phone number so we can reach you.';
    return;
  }

  status.style.color = '';
  status.textContent = "Thank you! We'll be in touch shortly. For urgent needs, call (623) 555-0123 anytime.";
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
