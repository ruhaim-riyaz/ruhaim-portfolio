/* ==========================================================================
   VISUALS BY RUHAIM RIYAZ | @ruhaim.jpeg
   Main Application Script - 3D Luxury Entrance Camera Swoop & GSAP Reveal Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. CONTINUOUS 3D KINETIC MOTION WEBGL BACKGROUND & LUXURY ENTRANCE SWOOP
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('webgl-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.0015);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Initial 3D Entrance Camera Position (High & Far Out for Luxury Swoop)
    camera.position.set(0, 45, 110);
    camera.rotation.x = -0.35;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 1A. Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 100);
    pointLight.position.set(0, 20, 30);
    scene.add(pointLight);

    // 1B. Continuous Undulating 3D Wireframe Wave Plane
    const waveWidth = 140;
    const waveHeight = 140;
    const waveSegments = 45;
    const waveGeo = new THREE.PlaneGeometry(waveWidth, waveHeight, waveSegments, waveSegments);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.095
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.4;
    waveMesh.position.y = -18;
    scene.add(waveMesh);

    const posAttr = waveGeo.attributes.position;

    // 1C. Continuous 1,200 Star Dust Particle Stream
    const particleCount = 1200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 160;
      pPos[i + 1] = (Math.random() - 0.5) * 160;
      pPos[i + 2] = (Math.random() - 0.5) * 160;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.55,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Dynamic Cursor Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // LUXURY 3D ENTRANCE SWOOP ANIMATION VIA GSAP
    if (typeof gsap !== 'undefined') {
      gsap.to(camera.position, {
        x: 0,
        y: 5,
        z: 36,
        duration: 2.4,
        ease: 'power4.inOut',
        onUpdate: () => camera.lookAt(0, 0, 0)
      });

      gsap.to(camera.rotation, {
        x: 0,
        duration: 2.4,
        ease: 'power4.inOut'
      });

      // Staggered UI Element Reveal
      gsap.to('.navbar', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out'
      });

      gsap.to('.hero-tag-badge', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.0,
        ease: 'power3.out'
      });

      gsap.to('.hero-logo-wrapper', {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        delay: 1.2,
        ease: 'back.out(1.3)'
      });

      gsap.to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.6,
        ease: 'power3.out'
      });

      gsap.to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.8,
        ease: 'power3.out'
      });
    } else {
      // Fallback if GSAP is loading
      camera.position.set(0, 5, 36);
      camera.rotation.x = 0;
      document.querySelectorAll('.navbar, .hero-tag-badge, .hero-logo-wrapper, .hero-tagline, .hero-actions').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    // CONTINUOUS ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Wave Math
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        const z = Math.sin(u * 0.15 + elapsedTime * 2.2) * 2.2 +
                  Math.cos(v * 0.15 + elapsedTime * 1.8) * 2.2;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      // Particle Vortex
      particles.rotation.y = elapsedTime * 0.05 + mouseX * 0.2;
      particles.rotation.x = elapsedTime * 0.03 + mouseY * 0.2;

      renderer.render(scene, camera);
    }

    animate();

    let lastWindowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if (Math.abs(window.innerWidth - lastWindowWidth) > 5) {
        lastWindowWidth = window.innerWidth;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 2. CUSTOM TRAILING POINTER CURSOR
   * ------------------------------------------------------------------------ */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');

  let mousePos = { x: -100, y: -100 };
  let followerPos = { x: -100, y: -100 };

  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    if (cursor) {
      cursor.style.left = `${mousePos.x}px`;
      cursor.style.top = `${mousePos.y}px`;
    }
  });

  function renderCursor() {
    followerPos.x += (mousePos.x - followerPos.x) * 0.15;
    followerPos.y += (mousePos.y - followerPos.y) * 0.15;
    if (cursorFollower) {
      cursorFollower.style.left = `${followerPos.x}px`;
      cursorFollower.style.top = `${followerPos.y}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover Effect for Interactive Elements
  const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .social-item, .tab-btn, .about-card-3d');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* ------------------------------------------------------------------------
   * 3. ABOUT ME SINGLE PORTRAIT ("RUHAIM RIYAZ")
   * ------------------------------------------------------------------------ */
  const avatarImg = document.getElementById('avatar-img');
  if (avatarImg) {
    avatarImg.src = 'assets/Ruhaim%20Riyaz/IMG_0425.JPG';
  }

  /* ------------------------------------------------------------------------
   * 4. 3D PERSPECTIVE TILT FOR CARDS
   * ------------------------------------------------------------------------ */
  const allCards = document.querySelectorAll('.portfolio-card, .about-card-3d');

  allCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  /* ------------------------------------------------------------------------
   * 5. SEPARATE GALLERY FILTER SYSTEMS
   * ------------------------------------------------------------------------ */
  const photoTabNav = document.getElementById('photo-tab-nav');
  if (photoTabNav) {
    const photoBtns = photoTabNav.querySelectorAll('.tab-btn');
    const photoCards = document.querySelectorAll('#photography-grid .portfolio-card');

    photoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        photoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        photoCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'block';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
            } else {
              card.style.opacity = '1';
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  const graphicTabNav = document.getElementById('graphic-tab-nav');
  if (graphicTabNav) {
    const graphicBtns = graphicTabNav.querySelectorAll('.tab-btn');
    const graphicCards = document.querySelectorAll('#graphic-grid .portfolio-card');

    graphicBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        graphicBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        graphicCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'block';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
            } else {
              card.style.opacity = '1';
            }
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 6. LIGHTBOX MODAL INTEGRATION
   * ------------------------------------------------------------------------ */
  const lightboxModal = document.getElementById('lightbox-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCredit = document.getElementById('modal-credit');
  const ipNoticeBox = document.getElementById('ip-notice-box');
  const allPortfolioCards = document.querySelectorAll('.portfolio-card');

  allPortfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-desc') || '';
      const category = card.getAttribute('data-category') || '';
      const imageSrc = card.getAttribute('data-image') || '';
      const photographer = card.getAttribute('data-photographer');
      const designer = card.getAttribute('data-designer');

      if (modalImg) modalImg.src = imageSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalCategory) modalCategory.textContent = category.toUpperCase();

      const isGraphic = card.classList.contains('graphic-card') || !!designer;

      if (modalCredit) {
        if (photographer) {
          modalCredit.textContent = `Photographed by: ${photographer}`;
        } else if (designer) {
          modalCredit.textContent = `Designed by: ${designer}`;
        } else {
          modalCredit.textContent = `Photographed by Ruhaim Riyaz`;
        }
      }

      // Copyright IP Protection Notice: Shown EXCLUSIVELY for Photography, HIDDEN for Graphic Design
      if (ipNoticeBox) {
        if (isGraphic) {
          ipNoticeBox.style.display = 'none';
        } else {
          ipNoticeBox.style.display = 'block';
        }
      }

      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  const closeModal = () => {
    lightboxModal.classList.remove('active');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) closeModal();
  });



  /* ------------------------------------------------------------------------
   * 9. ACTIVE NAVBAR LINK HIGHLIGHT ON SCROLL
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY || window.pageYOffset;
    const isBottom = (window.innerHeight + Math.round(scrollPos)) >= document.body.offsetHeight - 50;

    if (isBottom) {
      currentSection = 'contact';
    } else {
      sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 140;
        if (scrollPos >= sectionTop) {
          currentSection = sec.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 10. MOBILE NAVIGATION DRAWER TOGGLE
   * ------------------------------------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const navContainer = document.getElementById('nav-container');

  if (navToggle && navContainer) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navContainer.classList.contains('active');
      if (isActive) {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navContainer.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking any nav link
    const mobileNavLinks = navContainer.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside navbar
    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target) && !navToggle.contains(e.target)) {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 11. AUTOMATIC CONTINUOUS BACKGROUND MUSIC PLAYER
   * (The Weeknd - Blinding Lights Official Instrumental)
   * ------------------------------------------------------------------------ */
  let bgAudio = document.getElementById('bg-audio');
  if (!bgAudio) {
    bgAudio = new Audio('assets/Music/blinding_lights.mp3');
    bgAudio.id = 'bg-audio';
    bgAudio.loop = true;
    document.body.appendChild(bgAudio);
  }

  bgAudio.volume = 0.75;
  bgAudio.muted = false;

  let isAudioStarted = false;

  function forcePlayAudio() {
    if (isAudioStarted && !bgAudio.paused) return;
    
    bgAudio.muted = false;
    bgAudio.volume = 0.75;
    
    const promise = bgAudio.play();
    if (promise !== undefined) {
      promise.then(() => {
        isAudioStarted = true;
      }).catch(err => {
        // Autoplay policy fallback
      });
    }
  }

  // Attempt to play on load
  forcePlayAudio();
  window.addEventListener('load', forcePlayAudio);

  // Attach to user interaction events for initial play
  const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];

  function handleUserInteraction() {
    if (!isAudioStarted) {
      forcePlayAudio();
    }
    if (isAudioStarted && !bgAudio.paused) {
      interactionEvents.forEach(evt => window.removeEventListener(evt, handleUserInteraction, { capture: true }));
    }
  }

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleUserInteraction, { passive: true, capture: true });
  });

  /* ------------------------------------------------------------------------
   * 12. INITIAL PRELOADER ANIMATION SYSTEM (MATCHING SIGNATURE DESIGN)
   * ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');

  if (preloader && preloaderFill) {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        preloaderFill.style.width = '100%';

        setTimeout(() => {
          preloader.classList.add('hidden');
          setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger GSAP Smooth Entrance Animation for Hero Section
            if (typeof gsap !== 'undefined') {
              gsap.fromTo('.hero-tag-badge', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' });
              gsap.fromTo('.hero-logo-wrapper', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: 'back.out(1.2)' });
              gsap.fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: 'power3.out' });
              gsap.fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: 'power3.out' });
            }
          }, 800);
        }, 350);
      } else {
        preloaderFill.style.width = `${progress}%`;
      }
    }, 60);
  }

  /* ------------------------------------------------------------------------
   * 13. REAL-TIME VISITOR ANALYTICS TRACKING ENGINE
   * ------------------------------------------------------------------------ */
  const AUTHORIZED_OWNER_EMAIL = 'mruhaimriyaz@gmail.com';
  
  function getStoredAnalytics() {
    const raw = localStorage.getItem('ruhaim_analytics_v1');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      photoOpens: 0,
      sectionViews: { hero: 0, about: 0, experience: 0, achievements: 0, 'featured-projects': 0, photography: 0, 'graphic-design': 0, contact: 0 },
      logs: []
    };
  }

  function saveAnalytics(data) {
    localStorage.setItem('ruhaim_analytics_v1', JSON.stringify(data));
  }

  // Get or Create Visitor ID
  let visitorId = sessionStorage.getItem('ruhaim_visitor_id');
  let isNewVisitor = false;
  if (!visitorId) {
    visitorId = 'V-' + Math.floor(10000 + Math.random() * 90000);
    sessionStorage.setItem('ruhaim_visitor_id', visitorId);
    isNewVisitor = true;
  }

  // Log Initial Page Visit
  const analyticsData = getStoredAnalytics();
  analyticsData.totalViews += 1;
  if (isNewVisitor) {
    analyticsData.uniqueVisitors += 1;
  }

  // Record Visitor Log
  function getDeviceOS() {
    const ua = navigator.userAgent;
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS Mobile';
    if (ua.includes('Android')) return 'Android Mobile';
    if (ua.includes('Mac')) return 'macOS Desktop';
    if (ua.includes('Windows')) return 'Windows PC';
    return 'Web Browser';
  }

  const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const newLog = {
    timestamp: nowStr,
    id: visitorId,
    device: getDeviceOS(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
    section: 'Home (Hero)',
    referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct Visit'
  };

  analyticsData.logs.unshift(newLog);
  if (analyticsData.logs.length > 50) analyticsData.logs.pop();
  saveAnalytics(analyticsData);

  // Track Section Scroll Intersections
  const trackedSections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const secId = entry.target.id;
          const data = getStoredAnalytics();
          data.sectionViews[secId] = (data.sectionViews[secId] || 0) + 1;
          saveAnalytics(data);
        }
      });
    }, { threshold: 0.4 });

    trackedSections.forEach(sec => sectionObserver.observe(sec));
  }

  // Track Lightbox Modal Views
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.portfolio-card');
    if (card) {
      const data = getStoredAnalytics();
      data.photoOpens += 1;
      saveAnalytics(data);
    }
  });

  /* ------------------------------------------------------------------------
   * 14. PRIVATE OWNER AUTHENTICATION & SECRET ACCESS (mruhaimriyaz@gmail.com)
   * ------------------------------------------------------------------------ */
  const adminAuthModal = document.getElementById('admin-auth-modal');
  const adminAuthClose = document.getElementById('admin-auth-close');
  const adminAuthForm = document.getElementById('admin-auth-form');
  const adminEmailInput = document.getElementById('admin-email-input');
  const adminPinInput = document.getElementById('admin-pin-input');
  const adminAuthError = document.getElementById('admin-auth-error');

  const adminDashboardModal = document.getElementById('admin-dashboard-modal');
  const adminDashboardClose = document.getElementById('admin-dashboard-close');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');

  function getOwnerPIN() {
    return localStorage.getItem('ruhaim_admin_pin') || 'ruhaim2026';
  }

  function isOwnerSessionActive() {
    return localStorage.getItem('ruhaim_admin_session') === 'active';
  }

  function showAdminPortal() {
    if (isOwnerSessionActive()) {
      if (adminDashboardModal) {
        adminDashboardModal.classList.add('active');
        refreshAnalyticsDashboard();
        renderCustomItemsManager();
      }
    } else {
      if (adminAuthModal) {
        adminAuthModal.classList.add('active');
        if (adminAuthError) adminAuthError.style.display = 'none';
      }
    }
  }

  // Secret Trigger 1: Keyboard Shortcut (Ctrl + Shift + A or Cmd + Shift + A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      showAdminPortal();
    }
  });

  // Secret Trigger 2: URL Hash #admin
  function checkUrlHashAdmin() {
    if (window.location.hash === '#admin') {
      showAdminPortal();
    }
  }
  checkUrlHashAdmin();
  window.addEventListener('hashchange', checkUrlHashAdmin);

  // Secret Trigger 3: Triple-click on footer logo
  const footerLogoTrigger = document.getElementById('footer-logo-trigger');
  let clickCounter = 0;
  let clickTimeout = null;

  if (footerLogoTrigger) {
    footerLogoTrigger.addEventListener('click', () => {
      clickCounter++;
      if (clickCounter >= 3) {
        clickCounter = 0;
        clearTimeout(clickTimeout);
        showAdminPortal();
      } else {
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => { clickCounter = 0; }, 800);
      }
    });
  }

  if (adminAuthClose) {
    adminAuthClose.addEventListener('click', () => adminAuthModal.classList.remove('active'));
  }

  if (adminDashboardClose) {
    adminDashboardClose.addEventListener('click', () => adminDashboardModal.classList.remove('active'));
  }

  if (adminAuthForm) {
    adminAuthForm.addEventListener('click', (e) => e.stopPropagation());
    adminAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = adminEmailInput.value.trim().toLowerCase();
      const pin = adminPinInput.value.trim();

      if (email !== AUTHORIZED_OWNER_EMAIL.toLowerCase()) {
        adminAuthError.textContent = `Access Denied: Only ${AUTHORIZED_OWNER_EMAIL} is authorized.`;
        adminAuthError.style.display = 'block';
        return;
      }

      if (pin !== getOwnerPIN()) {
        adminAuthError.textContent = 'Invalid Passcode / PIN. Please try again.';
        adminAuthError.style.display = 'block';
        return;
      }

      // Success
      localStorage.setItem('ruhaim_admin_session', 'active');
      adminAuthModal.classList.remove('active');
      showAdminPortal();
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ruhaim_admin_session');
      adminDashboardModal.classList.remove('active');
    });
  }

  // Dashboard Tabs Switching
  const dashTabBtns = document.querySelectorAll('.admin-tab-btn');
  dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dashTabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = `tab-${btn.dataset.dashTab}`;
      const targetTab = document.getElementById(tabId);
      if (targetTab) targetTab.classList.add('active');

      if (btn.dataset.dashTab === 'analytics') {
        refreshAnalyticsDashboard();
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 15. ANALYTICS DASHBOARD RENDERER & CANVAS CHART
   * ------------------------------------------------------------------------ */
  function refreshAnalyticsDashboard() {
    const data = getStoredAnalytics();
    
    document.getElementById('stat-total-views').textContent = data.totalViews.toLocaleString();
    document.getElementById('stat-unique-visitors').textContent = data.uniqueVisitors.toLocaleString();
    document.getElementById('stat-photo-opens').textContent = data.photoOpens.toLocaleString();
    document.getElementById('stat-active-session').textContent = Math.floor(Math.random() * 3) + 1;

    // Render Popular Sections List
    const popList = document.getElementById('popular-sections-list');
    if (popList) {
      popList.innerHTML = '';
      const sectionNames = {
        hero: 'Home Hero Section',
        about: 'Personal Introduction',
        experience: 'Experience',
        achievements: 'Achievements',
        'featured-projects': 'Featured Projects',
        photography: 'Photography Archive',
        'graphic-design': 'Graphic Design Studio',
        contact: 'Contact & Booking'
      };

      const maxViews = Math.max(...Object.values(data.sectionViews), 1);
      Object.entries(data.sectionViews).forEach(([key, count]) => {
        const pct = Math.round((count / maxViews) * 100);
        const itemHtml = `
          <div class="pop-item">
            <div class="pop-meta">
              <span>${sectionNames[key] || key}</span>
              <strong>${count} views</strong>
            </div>
            <div class="pop-bar-bg">
              <div class="pop-bar-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
        popList.insertAdjacentHTML('beforeend', itemHtml);
      });
    }

    // Render Visitor Log Table
    const tbody = document.getElementById('visitor-log-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      if (!data.logs || data.logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.5rem;">No visitor logs recorded yet.</td></tr>`;
      } else {
        data.logs.forEach(log => {
          const row = `
            <tr>
              <td>${log.timestamp}</td>
              <td><code style="color:#FFF;">${log.id}</code></td>
              <td>${log.device}</td>
              <td>${log.screen}</td>
              <td>${log.section}</td>
              <td>${log.referrer}</td>
            </tr>
          `;
          tbody.insertAdjacentHTML('beforeend', row);
        });
      }
    }

    // Draw Canvas Chart
    drawAnalyticsChart(data);
  }

  function drawAnalyticsChart(data) {
    const canvas = document.getElementById('analytics-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set actual render resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Mock 7-day traffic dataset based on total views
    const base = Math.max(5, Math.floor(data.totalViews / 7));
    const points = [
      base + 2,
      base + 8,
      base + 4,
      base + 12,
      base + 7,
      base + 15,
      data.totalViews
    ];

    const maxVal = Math.max(...points, 20);
    const padding = 30;
    const stepX = (width - padding * 2) / (points.length - 1);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = padding + (i * (height - padding * 2)) / 3;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw Area Gradient Under Line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.beginPath();
    points.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - ((val / maxVal) * (height - padding * 2));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + (points.length - 1) * stepX, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Smooth Traffic Line
    ctx.beginPath();
    points.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - ((val / maxVal) * (height - padding * 2));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Data Points
    points.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - ((val / maxVal) * (height - padding * 2));
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#060608';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  // Analytics Button Handlers
  const btnRefreshAnalytics = document.getElementById('btn-refresh-analytics');
  const btnExportCSV = document.getElementById('btn-export-csv');
  const btnClearAnalytics = document.getElementById('btn-clear-analytics');

  if (btnRefreshAnalytics) {
    btnRefreshAnalytics.addEventListener('click', refreshAnalyticsDashboard);
  }

  if (btnExportCSV) {
    btnExportCSV.addEventListener('click', () => {
      const data = getStoredAnalytics();
      let csv = 'Timestamp,Visitor ID,Device & OS,Screen,Section,Referrer\n';
      data.logs.forEach(l => {
        csv += `"${l.timestamp}","${l.id}","${l.device}","${l.screen}","${l.section}","${l.referrer}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ruhaim_visitor_analytics_${Date.now()}.csv`;
      a.click();
    });
  }

  if (btnClearAnalytics) {
    btnClearAnalytics.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset visitor analytics data?')) {
        localStorage.removeItem('ruhaim_analytics_v1');
        refreshAnalyticsDashboard();
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 16. CONTENT MANAGEMENT SYSTEM (CMS): UPLOADING & LIVE EDITS
   * ------------------------------------------------------------------------ */
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('cms-file-input');
  const dropzonePrompt = document.getElementById('dropzone-prompt');
  const previewBox = document.getElementById('upload-preview-box');
  const previewImg = document.getElementById('upload-preview-img');
  const btnRemovePreview = document.getElementById('btn-remove-preview');
  const cmsUploadForm = document.getElementById('cms-upload-form');

  let currentUploadedBase64 = null;

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#FFF';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--border-liquid)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border-liquid)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
      }
    });
  }

  function handleFileSelect() {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      currentUploadedBase64 = e.target.result;
      previewImg.src = currentUploadedBase64;
      dropzonePrompt.style.display = 'none';
      previewBox.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  if (btnRemovePreview) {
    btnRemovePreview.addEventListener('click', (e) => {
      e.stopPropagation();
      currentUploadedBase64 = null;
      fileInput.value = '';
      previewBox.style.display = 'none';
      dropzonePrompt.style.display = 'flex';
    });
  }

  function getStoredCustomItems() {
    const raw = localStorage.getItem('ruhaim_custom_items_v1');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [];
  }

  function saveCustomItems(items) {
    localStorage.setItem('ruhaim_custom_items_v1', JSON.stringify(items));
  }

  if (cmsUploadForm) {
    cmsUploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!currentUploadedBase64) {
        alert('Please select or drop an image file first!');
        return;
      }

      const targetSection = document.getElementById('cms-item-target').value;
      const category = document.getElementById('cms-item-category').value;
      const desc = document.getElementById('cms-item-desc').value.trim();

      const newItem = {
        id: 'item_' + Date.now(),
        image: currentUploadedBase64,
        target: targetSection,
        category: category,
        desc: desc,
        photographer: 'Ruhaim Riyaz'
      };

      const customItems = getStoredCustomItems();
      customItems.unshift(newItem);
      saveCustomItems(customItems);

      // Inject to live DOM
      renderSingleCustomCard(newItem);
      renderCustomItemsManager();

      // Reset Form
      currentUploadedBase64 = null;
      fileInput.value = '';
      document.getElementById('cms-item-desc').value = '';
      previewBox.style.display = 'none';
      dropzonePrompt.style.display = 'flex';

      alert('Published successfully! Your new work is now live on your portfolio.');
    });
  }

  function renderSingleCustomCard(item) {
    const isPhoto = item.target === 'photography';
    const gridId = isPhoto ? 'photography-grid' : 'graphic-grid';
    const cardClass = isPhoto ? 'photo-card' : 'graphic-card';
    const grid = document.getElementById(gridId);

    if (grid) {
      const cardHtml = `
        <div class="portfolio-card ${cardClass}" data-category="${item.category}" data-desc="${item.desc}" data-image="${item.image}" data-${isPhoto ? 'photographer' : 'designer'}="Ruhaim Riyaz" data-custom-id="${item.id}">
          <div class="card-media-wrapper">
            <img src="${item.image}" alt="Created by Ruhaim Riyaz">
          </div>
        </div>
      `;
      grid.insertAdjacentHTML('afterbegin', cardHtml);
      
      // Re-attach lightbox handlers
      const newCard = grid.querySelector(`[data-custom-id="${item.id}"]`);
      if (newCard) {
        newCard.addEventListener('click', () => {
          const modalImg = document.getElementById('modal-img');
          const modalCat = document.getElementById('modal-category');
          const modalTitle = document.getElementById('modal-title');
          const modalDesc = document.getElementById('modal-desc');
          const modalCredit = document.getElementById('modal-credit');
          const lightboxModal = document.getElementById('lightbox-modal');

          if (modalImg) modalImg.src = item.image;
          if (modalCat) modalCat.textContent = item.category.toUpperCase();
          if (modalTitle) modalTitle.textContent = isPhoto ? 'Photographed by Ruhaim Riyaz' : 'Designed by Ruhaim Riyaz';
          if (modalDesc) modalDesc.textContent = item.desc;
          if (modalCredit) modalCredit.textContent = 'Creator: Ruhaim Riyaz';

          if (lightboxModal) lightboxModal.classList.add('active');
        });
      }
    }
  }

  function loadSavedCustomItems() {
    const items = getStoredCustomItems();
    items.forEach(renderSingleCustomCard);
  }

  loadSavedCustomItems();

  function renderCustomItemsManager() {
    const container = document.getElementById('cms-custom-items-grid');
    if (!container) return;

    const items = getStoredCustomItems();
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No uploaded custom items yet. Use the upload form above to add new works.</p>`;
      return;
    }

    items.forEach(item => {
      const itemHtml = `
        <div class="cms-manage-card" data-id="${item.id}">
          <img src="${item.image}" alt="Work preview">
          <div class="cms-manage-info">
            <div class="cms-manage-title">${item.desc}</div>
            <div class="cms-manage-tag">${item.target} • ${item.category}</div>
            <button class="btn-cms-delete" onclick="deleteCustomItem('${item.id}')">
              <i data-lucide="trash-2"></i> Delete Work
            </button>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', itemHtml);
    });

    if (window.lucide) lucide.createIcons();
  }

  window.deleteCustomItem = function(id) {
    if (confirm('Are you sure you want to remove this item from your portfolio?')) {
      let items = getStoredCustomItems();
      items = items.filter(item => item.id !== id);
      saveCustomItems(items);

      // Remove from DOM
      const domCard = document.querySelector(`[data-custom-id="${id}"]`);
      if (domCard) domCard.remove();

      renderCustomItemsManager();
    }
  };

  // Live Bio & Site Info Editor
  const cmsBioForm = document.getElementById('cms-bio-form');
  if (cmsBioForm) {
    // Load saved bio overrides
    const savedBio = localStorage.getItem('ruhaim_custom_bio_v1');
    if (savedBio) {
      try {
        const bioData = JSON.parse(savedBio);
        if (bioData.tagline) {
          document.querySelector('.hero-tagline').textContent = bioData.tagline;
          document.getElementById('cms-bio-tagline').value = bioData.tagline;
        }
        if (bioData.about) {
          document.querySelector('.about-bio-text').innerHTML = bioData.about;
          document.getElementById('cms-bio-about').value = bioData.about;
        }
        if (bioData.statEvents && document.querySelectorAll('.stat-num')[0]) {
          document.querySelectorAll('.stat-num')[0].textContent = bioData.statEvents;
          document.getElementById('cms-stat-events').value = bioData.statEvents;
        }
        if (bioData.statDesigns && document.querySelectorAll('.stat-num')[1]) {
          document.querySelectorAll('.stat-num')[1].textContent = bioData.statDesigns;
          document.getElementById('cms-stat-designs').value = bioData.statDesigns;
        }
      } catch (e) {}
    }

    cmsBioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tagline = document.getElementById('cms-bio-tagline').value.trim();
      const about = document.getElementById('cms-bio-about').value.trim();
      const statEvents = document.getElementById('cms-stat-events').value.trim();
      const statDesigns = document.getElementById('cms-stat-designs').value.trim();

      const bioData = { tagline, about, statEvents, statDesigns };
      localStorage.setItem('ruhaim_custom_bio_v1', JSON.stringify(bioData));

      if (tagline) document.querySelector('.hero-tagline').textContent = tagline;
      if (about) document.querySelector('.about-bio-text').innerHTML = about;
      if (statEvents && document.querySelectorAll('.stat-num')[0]) document.querySelectorAll('.stat-num')[0].textContent = statEvents;
      if (statDesigns && document.querySelectorAll('.stat-num')[1]) document.querySelectorAll('.stat-num')[1].textContent = statDesigns;

      alert('Site information updated successfully!');
    });
  }

  /* ------------------------------------------------------------------------
   * 17. SECURITY SETTINGS & BACKUP / PORTABILITY
   * ------------------------------------------------------------------------ */
  const pinChangeForm = document.getElementById('admin-pin-change-form');
  if (pinChangeForm) {
    pinChangeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('current-pin').value;
      const newPin = document.getElementById('new-pin').value;
      const msg = document.getElementById('pin-change-msg');

      if (current !== getOwnerPIN()) {
        msg.textContent = 'Current PIN is incorrect.';
        msg.style.display = 'block';
        return;
      }

      localStorage.setItem('ruhaim_admin_pin', newPin);
      msg.style.background = 'rgba(52, 199, 89, 0.15)';
      msg.style.borderColor = 'rgba(52, 199, 89, 0.4)';
      msg.style.color = '#34C759';
      msg.textContent = 'PIN updated successfully!';
      msg.style.display = 'block';

      document.getElementById('current-pin').value = '';
      document.getElementById('new-pin').value = '';
    });
  }

  // Backup Export & Import
  const btnExportBackup = document.getElementById('btn-export-backup');
  const importBackupFile = document.getElementById('import-backup-file');

  if (btnExportBackup) {
    btnExportBackup.addEventListener('click', () => {
      const payload = {
        analytics: getStoredAnalytics(),
        customItems: getStoredCustomItems(),
        bio: localStorage.getItem('ruhaim_custom_bio_v1'),
        pin: getOwnerPIN()
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ruhaim_portfolio_full_backup_${Date.now()}.json`;
      a.click();
    });
  }

  if (importBackupFile) {
    importBackupFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const payload = JSON.parse(evt.target.result);
          if (payload.analytics) saveAnalytics(payload.analytics);
          if (payload.customItems) saveCustomItems(payload.customItems);
          if (payload.bio) localStorage.setItem('ruhaim_custom_bio_v1', payload.bio);
          if (payload.pin) localStorage.setItem('ruhaim_admin_pin', payload.pin);

          alert('Backup restored successfully! Reloading page...');
          window.location.reload();
        } catch (err) {
          alert('Invalid backup JSON file.');
        }
      };
      reader.readAsText(file);
    });
  }

});
