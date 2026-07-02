/* =========================================================
   TULIZO FOUNDATION — JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ---------- NAV: scroll shadow ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- NAV: mobile toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    header.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- HERO VIDEO CONTROLS ---------- */
  const heroVideo = document.getElementById('heroVideo');
  const heroPlayPauseBtn = document.getElementById('heroPlayPauseBtn');
  const heroMuteBtn = document.getElementById('heroMuteBtn');

  if (heroVideo) {
    // Attempt play and catch rejection (e.g. Low Power Mode or Autoplay restrictions)
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Autoplay blocked or failed, displaying poster backdrop:", error);
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.classList.add('video-blocked');
        }
      });
    }

    // Play/Pause Toggle
    if (heroPlayPauseBtn) {
      heroPlayPauseBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
          heroVideo.play().then(() => {
            heroPlayPauseBtn.textContent = '✦ PAUSE';
          }).catch(err => {
            console.error("Failed to play video:", err);
          });
        } else {
          heroVideo.pause();
          heroPlayPauseBtn.textContent = '✦ PLAY';
        }
      });
    }

    // Mute/Unmute Toggle
    if (heroMuteBtn) {
      heroMuteBtn.addEventListener('click', () => {
        if (heroVideo.muted) {
          heroVideo.muted = false;
          heroMuteBtn.textContent = '✦ MUTE';
          heroMuteBtn.style.background = 'var(--riso-magenta)';
          heroMuteBtn.style.color = 'var(--paper-natural)';
        } else {
          heroVideo.muted = true;
          heroMuteBtn.textContent = '✦ UNMUTE';
          heroMuteBtn.style.background = '';
          heroMuteBtn.style.color = '';
        }
      });
    }
  }

  /* ---------- OUR JOURNEY SLIDESHOW ---------- */
  const journeySlides = document.querySelectorAll('.journey-slide');
  const journeyDots   = document.querySelectorAll('.journey-dot');
  const journeyPrevBtn = document.getElementById('journeyPrev');
  const journeyNextBtn = document.getElementById('journeyNext');
  let currentJourneySlide = 0;
  let journeyInterval = null;

  const showJourneySlide = (index) => {
    if (journeySlides.length === 0) return;

    if (index >= journeySlides.length) currentJourneySlide = 0;
    else if (index < 0) currentJourneySlide = journeySlides.length - 1;
    else currentJourneySlide = index;

    journeySlides.forEach(s => s.classList.remove('active'));
    journeyDots.forEach(d => d.classList.remove('active'));

    journeySlides[currentJourneySlide].classList.add('active');
    if (journeyDots[currentJourneySlide]) {
      journeyDots[currentJourneySlide].classList.add('active');
    }
  };

  const nextJourneySlide = () => {
    showJourneySlide(currentJourneySlide + 1);
  };

  const prevJourneySlide = () => {
    showJourneySlide(currentJourneySlide - 1);
  };

  const startJourneyAutoSlide = () => {
    stopJourneyAutoSlide();
    journeyInterval = setInterval(nextJourneySlide, 5000);
  };

  const stopJourneyAutoSlide = () => {
    if (journeyInterval) {
      clearInterval(journeyInterval);
    }
  };

  if (journeyNextBtn && journeyPrevBtn) {
    journeyNextBtn.addEventListener('click', () => {
      nextJourneySlide();
      startJourneyAutoSlide();
    });

    journeyPrevBtn.addEventListener('click', () => {
      prevJourneySlide();
      startJourneyAutoSlide();
    });
  }

  journeyDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-journey-target'), 10) - 1;
      showJourneySlide(targetIndex);
      startJourneyAutoSlide();
    });
  });

  if (journeySlides.length > 0) {
    startJourneyAutoSlide();
  }

  /* ---------- YEAR in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INTERSECTION OBSERVER: reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(
    '.about-text, .about-imagery, .program-card, .impact-stat, ' +
    '.partner-card, .gallery-item, .featured-text, .featured-visual, ' +
    '.video-text, .video-player-wrap, .involved-text, .involved-form-wrap, ' +
    '.impact-quote-wrap'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
    revealObserver.observe(el);
  });

  // Legacy custom play video button overlay logic removed as video is now loop-autoplay in the Hero

  /* ---------- CONTACT FORM: prevent default + feedback ---------- */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#C0347A';
          valid = false;
        }
      });

      if (!valid) return;

      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent. Thank You.';
        submitBtn.style.background = '#2E7D32';
        submitBtn.style.borderColor = '#2E7D32';
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }

  /* ---------- GALLERY: lightbox-like zoom hint ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  galleryItems.forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', img.closest('.gallery-item').querySelector('.gallery-caption')?.textContent || 'View image');
  });

  /* ---------- NAV: active link highlighting on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          a.style.fontWeight = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--riso-purple)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

})();
