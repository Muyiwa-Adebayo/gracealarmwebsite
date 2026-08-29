/**
 * GraceAlarm Landing Page — Main JavaScript
 * Handles: scroll reveal, header scroll, nav toggle,
 * verse carousel, theme chip interaction, install toggle,
 * cookie consent, and smooth scroll.
 */

(function () {
  'use strict';

  // ==============================
  // Scroll Reveal (Intersection Observer)
  // ==============================
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ==============================
  // Header Scroll Effect
  // ==============================
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==============================
  // Mobile Nav Toggle
  // ==============================
  function initNavToggle() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==============================
  // Verse Carousel
  // ==============================
  function initVerseCarousel() {
    const carousel = document.getElementById('verse-carousel');
    const dotsContainer = document.getElementById('verse-dots');
    if (!carousel || !dotsContainer) return;

    const slides = carousel.querySelectorAll('.verse-slide');
    const dots = dotsContainer.querySelectorAll('.verse-dot');
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
      slides.forEach((slide) => slide.classList.remove('active'));
      dots.forEach((dot) => dot.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }

    function startAutoPlay() {
      interval = setInterval(nextSlide, 8000);
    }

    function stopAutoPlay() {
      clearInterval(interval);
    }

    // Dot navigation
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.dot, 10);
        goToSlide(index);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide((currentIndex + 1) % slides.length);
        } else {
          goToSlide((currentIndex - 1 + slides.length) % slides.length);
        }
      }
      startAutoPlay();
    }, { passive: true });

    startAutoPlay();
  }

  // ==============================
  // Theme Chip Interaction
  // ==============================
  function initThemeChips() {
    const chips = document.querySelectorAll('.theme-chip');
    const verseText = document.getElementById('theme-verse-text');
    if (!chips.length || !verseText) return;

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        // Toggle active state
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        // Show verse preview with fade
        const verse = chip.dataset.verse;
        const ref = chip.dataset.ref;

        verseText.classList.remove('visible');
        setTimeout(() => {
          verseText.innerHTML = verse + '<br><strong style="color: var(--color-primary); font-style: normal;">' + ref + '</strong>';
          verseText.classList.add('visible');
        }, 200);
      });
    });

    // Initial state — make text visible
    verseText.style.opacity = '0.6';
    verseText.style.fontStyle = 'normal';
    verseText.style.color = 'var(--color-text-muted)';
    verseText.style.fontSize = '0.875rem';
  }

  // ==============================
  // Install Instructions Toggle
  // ==============================
  function initInstallToggle() {
    const toggle = document.getElementById('install-toggle');
    const steps = document.getElementById('install-steps');
    if (!toggle || !steps) return;

    toggle.addEventListener('click', () => {
      const isOpen = steps.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ==============================
  // Cookie Consent
  // ==============================
  function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    if (!banner || !acceptBtn || !declineBtn) return;

    // Check if consent already given
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      if (consent === 'accepted') {
        loadGA4();
      }
      return; // Don't show banner
    }

    // Show banner after a short delay
    setTimeout(() => {
      banner.classList.add('visible');
    }, 1500);

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      banner.classList.remove('visible');
      loadGA4();
    });

    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined');
      banner.classList.remove('visible');
    });
  }

  // ==============================
  // GA4 Loader
  // ==============================
  function loadGA4() {
    // GA4 Measurement ID — replace with actual ID when set up
    const GA_ID = 'G-XXXXXXXXXX';

    if (document.getElementById('ga4-script')) return;

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    script.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID);

      // Initialize analytics event tracking
      if (typeof initAnalyticsEvents === 'function') {
        initAnalyticsEvents();
      }
    };
  }

  // ==============================
  // Download Handler
  // ==============================
  window.handleDownload = function (e) {
    // APK not yet available — show message
    e.preventDefault();
    const btn = document.getElementById('cta-download');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<svg class="btn-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Coming Soon — Stay Tuned!';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.pointerEvents = '';
    }, 3000);
  };

  // ==============================
  // Smooth Scroll for Anchor Links
  // ==============================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // ==============================
  // Initialize Everything
  // ==============================
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeaderScroll();
    initNavToggle();
    initVerseCarousel();
    initThemeChips();
    initInstallToggle();
    initCookieConsent();
    initSmoothScroll();
  });
})();
