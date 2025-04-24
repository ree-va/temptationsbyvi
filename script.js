// script.js
// Toggle navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
    // Add subtle animation on menu toggle button
    menuToggle.classList.add('toggle-animate');
    setTimeout(() => {
      menuToggle.classList.remove('toggle-animate');
    }, 300);
  });
}

// Create lightbox elements
const createLightbox = () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.opacity = 0;
  lightbox.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(lightbox);

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  lightbox.appendChild(lightboxContent);

  const img = document.createElement('img');
  lightboxContent.appendChild(img);

  const caption = document.createElement('p');
  caption.className = 'lightbox-caption';
  lightboxContent.appendChild(caption);

  // Close lightbox on click outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      fadeOutLightbox();
    }
  });

  // Close lightbox on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      fadeOutLightbox();
    }
  });

  const fadeInLightbox = () => {
    lightbox.style.display = 'block';
    requestAnimationFrame(() => {
      lightbox.style.opacity = 1;
    });
  };

  const fadeOutLightbox = () => {
    lightbox.style.opacity = 0;
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  };

  return { lightbox, img, caption, fadeInLightbox, fadeOutLightbox };
};

const { lightbox, img, caption, fadeInLightbox, fadeOutLightbox } = createLightbox();

// Add lightbox functionality to featured section images
const featuredImages = document.querySelectorAll('.featured .card img');
featuredImages.forEach(image => {
  image.style.cursor = 'pointer';
  image.addEventListener('click', () => {
    img.src = image.src;
    img.alt = image.alt;
    caption.textContent = image.alt || '';
    fadeInLightbox();
  });
});

// Smooth scrolling for navigation links
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Close menu on small screens after clicking
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
      }
    }
  });
});

// Back to top button with fade effect and throttled scroll event
const backToTop = document.getElementById("backToTop");
let scrollTimeout;

const showBackToTop = () => {
  backToTop.style.display = "block";
  backToTop.style.opacity = 1;
};

const hideBackToTop = () => {
  backToTop.style.opacity = 0;
  setTimeout(() => {
    backToTop.style.display = "none";
  }, 300);
};

window.addEventListener('scroll', () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    if (window.scrollY > 300) {
      showBackToTop();
    } else {
      hideBackToTop();
    }
    scrollTimeout = null;
  }, 100);
});

backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-content');

dropdownToggle.addEventListener('click', (e) => {
  e.preventDefault();
  dropdownMenu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown > a');
  const dropdownMenu = document.querySelector('.dropdown .dropdown-content');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent anchor scroll
      dropdownMenu.classList.toggle('active');
    });
  }
});
