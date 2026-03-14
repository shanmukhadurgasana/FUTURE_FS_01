const typingTexts = [
  'Tech Enthusiast',
  'Web Developer',
  'Full Stack Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const typingElement = document.getElementById('typingText');
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typingSpeed = 500;
  }

  setTimeout(typeText, typingSpeed);
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

function initScrollEffects() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        if (entry.target.classList.contains('skills')) {
          animateSkills();
        }
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.about, .skills, .projects, .resume, .contact');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
}

function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-progress');

  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress-width', progress + '%');
    bar.classList.add('animate');
  });
}

function initContactForm() {
  // ── Formspree Setup (2 minutes, only ONE thing to replace) ───────────────
  // 1. Go to https://formspree.io/ → click "Get Started"
  // 2. Sign up / log in with shanmukhadurgasana@gmail.com
  // 3. Click "+ New Form" → give it a name → "Create Form"
  // 4. Copy the endpoint shown (e.g. https://formspree.io/f/xyzabc12)
  //    and replace YOUR_FORM_ID below with the part after /f/
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';
  // ─────────────────────────────────────────────────────────────────────────

  const contactForm = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = '#22c55e';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.style.background = '';
          }, 3000);
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(() => {
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed – Try Again';
        submitBtn.style.background = '#ef4444';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.style.background = '';
        }, 3000);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  typeText();
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initContactForm();
});
