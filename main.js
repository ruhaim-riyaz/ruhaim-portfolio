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

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = sec.getAttribute('id');
      }
    });

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
      } else {
        navContainer.classList.add('active');
        navToggle.classList.add('active');
      }
    });

    // Close menu when clicking any nav link
    const mobileNavLinks = navContainer.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside navbar
    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target) && !navToggle.contains(e.target)) {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
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
        // Autoplay policy prevented immediate unmuted playback until first interaction
      });
    }
  }

  // Attempt to play on load
  forcePlayAudio();
  window.addEventListener('load', forcePlayAudio);

  // Attach to all user interaction events so the audio plays instantly on first click, tap, scroll, or movement
  const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousemove', 'scroll', 'keydown', 'focus'];

  function handleUserInteraction() {
    forcePlayAudio();
    if (isAudioStarted && !bgAudio.paused) {
      interactionEvents.forEach(evt => window.removeEventListener(evt, handleUserInteraction, { capture: true }));
    }
  }

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleUserInteraction, { passive: true, capture: true });
  });

});
