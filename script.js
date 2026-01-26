// Main JavaScript for Enhanced Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeTheme();
  initializeLoadingScreen();
  initializeNavigation();
  initializeSmoothScrolling();
  initializeRevealAnimations();
  initializeCounters();
  initializeBackToTop();
  initializeContactForm();
  initializeTypewriter();
  initializeParticles();
  initializeTooltips();
  initializeSkillBars();
  initializeParallax();
});

// =========================
// THEME MANAGEMENT
// =========================
function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    enableLightTheme();
  } else {
    enableDarkTheme();
  }
  
  // Add event listener for theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Theme functions
  function toggleTheme() {
    if (body.classList.contains('light-theme')) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
    
    // Add animation class for toggle effect
    themeToggle.classList.add('toggling');
    setTimeout(() => {
      themeToggle.classList.remove('toggling');
    }, 600);
  }
  
  function enableLightTheme() {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    localStorage.setItem('portfolio-theme', 'light');
  }
  
  function enableDarkTheme() {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    localStorage.setItem('portfolio-theme', 'dark');
  }
}

// =========================
// LOADING SCREEN
// =========================
function initializeLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Simulate loading delay
  setTimeout(() => {
    loadingScreen.classList.add('loaded');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
}

// =========================
// NAVIGATION
// =========================
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Update active nav link on scroll
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Add click event listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update on scroll
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call
}

// =========================
// SMOOTH SCROLLING
// =========================
function initializeSmoothScrolling() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') === '#') return;
    
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =========================
// REVEAL ANIMATIONS
// =========================
function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('show');
      }
    });
  }
  
  // Initial check and scroll listener
  checkReveal();
  window.addEventListener('scroll', checkReveal);
  
  // Also check on resize
  window.addEventListener('resize', checkReveal);
}

// =========================
// ANIMATED COUNTERS
// =========================
function initializeCounters() {
  const counterElements = document.querySelectorAll('.stat-number[data-count]');
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      
      if (current >= target) {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
      }
    }, 16);
  }
  
  // Use Intersection Observer to trigger counters when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.stat-number');
        if (counter && !counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  
  // Observe all stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });
}

// =========================
// BACK TO TOP BUTTON
// =========================
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  
  // Show/hide button on scroll
  window.addEventListener('scroll', toggleBackToTop);
  
  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initial check
  toggleBackToTop();
}

// =========================
// CONTACT FORM
// =========================
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMessage = document.querySelector('.toast-message');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
  });
  
  function showToast(message, type = 'success') {
    // Update toast content
    const icon = toast.querySelector('i');
    toastMessage.textContent = message;
    
    // Update icon based on type
    if (type === 'error') {
      icon.className = 'fas fa-exclamation-circle';
      icon.style.color = 'var(--danger-color)';
    } else {
      icon.className = 'fas fa-check-circle';
      icon.style.color = 'var(--success-color)';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
}

// =========================
// TYPEWRITER EFFECT
// =========================
function initializeTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;
  
  const texts = [
    'Software Engineer',
    'Full-Stack Developer',
    'DSA Expert',
    'Problem Solver',
    'Algorithm Specialist'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function typeWriter() {
    if (isPaused) return;
    
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
      // Typing
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 30);
    } else if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        typeWriter();
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWriter, 500);
    }
  }
  
  // Start typewriter effect after a delay
  setTimeout(typeWriter, 1000);
}

// =========================
// PARTICLES ANIMATION
// =========================
function initializeParticles() {
  const particlesContainer = document.querySelector('.particles-container');
  
  // Create additional particles for more density
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 20}s`;
    
    // Random color variation
    const colors = [
      'var(--accent-color)',
      '#667eea',
      '#10b981',
      '#f59e0b',
      '#ef4444'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particlesContainer.appendChild(particle);
  }
}

// =========================
// TOOLTIPS
// =========================
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
    element.addEventListener('focus', showTooltip);
    element.addEventListener('blur', hideTooltip);
  });
  
  function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    // Remove existing tooltip if any
    if (e.target.tooltipElement) {
      e.target.tooltipElement.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'var(--bg-tertiary)';
    tooltip.style.color = 'var(--text-primary)';
    tooltip.style.padding = '6px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '0.85rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = '0 4px 12px var(--shadow-color)';
    tooltip.style.border = '1px solid var(--border-light)';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.pointerEvents = 'none';
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    
    // Store reference for removal
    e.target.tooltipElement = tooltip;
  }
  
  function hideTooltip(e) {
    if (e.target.tooltipElement) {
      e.target.tooltipElement.remove();
      e.target.tooltipElement = null;
    }
  }
}

// =========================
// SKILL BARS ANIMATION
// =========================
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }
  
  // Use Intersection Observer to trigger animation when section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  // Observe skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// =========================
// PARALLAX EFFECT
// =========================
function initializeParallax() {
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.1 * (index + 1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
  
  // Update on scroll
  window.addEventListener('scroll', updateParallax);
}

// =========================
// KEYBOARD NAVIGATION
// =========================
document.addEventListener('keydown', (e) => {
  // Escape key closes any open modals or toasts
  if (e.key === 'Escape') {
    const toast = document.getElementById('toast');
    if (toast) toast.classList.remove('show');
  }
  
  // Tab key navigation enhancement
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Remove keyboard navigation class on mouse click
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardNavigationCSS = `
  .keyboard-navigation *:focus {
    outline: 3px solid var(--accent-color) !important;
    outline-offset: 2px;
  }
`;

const style = document.createElement('style');
style.textContent = keyboardNavigationCSS;
document.head.appendChild(style);

// =========================
// DEBOUNCE FUNCTION
// =========================
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// =========================
// SCROLL OPTIMIZATION
// =========================
window.addEventListener('scroll', debounce(() => {
  // Update scroll-based effects here
}, 10));

// =========================
// RESUME DOWNLOAD TRACKING
// =========================
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', function() {
    console.log('Resume downloaded');
    // You can add analytics tracking here
  });
});