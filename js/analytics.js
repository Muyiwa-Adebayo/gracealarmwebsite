/**
 * GraceAlarm Landing Page — Analytics Event Tracking
 * Tracks: download clicks, scroll depth, interactions, outbound links.
 * Requires GA4 to be loaded first (via cookie consent).
 */

(function () {
  'use strict';

  // Track a GA4 event (safe wrapper)
  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  // ==============================
  // Scroll Depth Tracking
  // ==============================
  function initScrollTracking() {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set();

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = Math.round(
            ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
          );

          thresholds.forEach((t) => {
            if (scrollPercent >= t && !tracked.has(t)) {
              tracked.add(t);
              trackEvent('scroll_depth', { percent: t });
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==============================
  // CTA Click Tracking
  // ==============================
  function initCTATracking() {
    // Hero CTA
    const heroBtn = document.getElementById('cta-hero');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => {
        trackEvent('cta_click_hero');
      });
    }

    // Bottom download CTA
    const downloadBtn = document.getElementById('cta-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        trackEvent('cta_click_bottom');
        trackEvent('apk_download_start', {
          version: '1.0',
        });
      });
    }

    // Learn More
    const learnMoreBtns = document.querySelectorAll('a[href="#features"]');
    learnMoreBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        trackEvent('learn_more_click');
      });
    });
  }

  // ==============================
  // Theme Chip Click Tracking
  // ==============================
  function initThemeTracking() {
    document.querySelectorAll('.theme-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        trackEvent('theme_chip_click', {
          theme_name: chip.dataset.theme,
        });
      });
    });
  }

  // ==============================
  // Verse Carousel Interaction Tracking
  // ==============================
  function initCarouselTracking() {
    document.querySelectorAll('.verse-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        trackEvent('verse_carousel_interact', {
          slide_index: dot.dataset.dot,
        });
      });
    });
  }

  // ==============================
  // Footer Link Tracking
  // ==============================
  function initFooterTracking() {
    const privacyLink = document.querySelector('a[href="privacy.html"]');
    if (privacyLink) {
      privacyLink.addEventListener('click', () => {
        trackEvent('privacy_policy_click');
      });
    }

    const workpressLink = document.querySelector('a[href*="workpress.free.nf"]');
    if (workpressLink) {
      workpressLink.addEventListener('click', () => {
        trackEvent('workpress_credit_click');
      });
    }
  }

  // ==============================
  // Outbound Link Tracking
  // ==============================
  function initOutboundTracking() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.addEventListener('click', () => {
        trackEvent('outbound_link', {
          url: link.href,
        });
      });
    });
  }

  // ==============================
  // Initialize All Analytics Events
  // Called after GA4 loads successfully
  // ==============================
  window.initAnalyticsEvents = function () {
    initScrollTracking();
    initCTATracking();
    initThemeTracking();
    initCarouselTracking();
    initFooterTracking();
    initOutboundTracking();
  };
})();
