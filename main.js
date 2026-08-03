/* ==========================================================================
   VISUALS BY RUHAIM RIYAZ | @ruhaim.jpeg
   Apple-Inspired 3D Immersive Portfolio — Main Application Engine
   Three.js Scene + GSAP ScrollTrigger + 3D Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
   * 0. LOADING SCREEN — Logo Writing Animation Controller
   * ======================================================================== */
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderProgressBar = document.getElementById('loader-progress-bar');

  // Lock scroll during loading
  document.body.classList.add('loading');

  // Simulate progress that syncs with the 2.4s writing animation
  let progress = 0;
  const progressInterval = setInterval(() => {
    // Accelerate toward 90%, then wait for full load
    progress += (90 - progress) * 0.08;
    if (loaderProgressBar) {
      loaderProgressBar.style.width = `${Math.min(progress, 90)}%`;
    }
  }, 50);

  function dismissLoader() {
    // Complete the progress bar
    clearInterval(progressInterval);
    if (loaderProgressBar) {
      loaderProgressBar.style.width = '100%';
    }

    // Fade out loader, then trigger cinematic entrance
    setTimeout(() => {
      if (loaderOverlay) {
        loaderOverlay.classList.add('hidden');
      }
      document.body.classList.remove('loading');

      // Fire cinematic entrance after loader fades (0.8s CSS transition)
      setTimeout(playCinematicEntrance, 300);
    }, 400);
  }

  // ── CINEMATIC HERO ENTRANCE ──
  function playCinematicEntrance() {
    if (typeof gsap === 'undefined') return;

    // 1. Fade in WebGL canvas
    const webglCanvas = document.getElementById('webgl-canvas');
    if (webglCanvas) webglCanvas.classList.add('visible');

    // 2. Build the grand entrance timeline
    const entrance = gsap.timeline({
      defaults: { ease: 'power4.out' }
    });

    entrance
      // Phase 1: Ambient environment
      .to('.hero-orb-1', {
        opacity: 1, scale: 1.2, duration: 2, ease: 'power2.out'
      }, 0)
      .to('.hero-orb-2', {
        opacity: 1, scale: 1.1, duration: 2.5, ease: 'power2.out'
      }, 0.2)
      .to('.hero-orb-3', {
        opacity: 1, scale: 1, duration: 2, ease: 'power2.out'
      }, 0.4)

      // Phase 2: Decorative lines extend
      .to('.hero-line-left', {
        height: '100%', duration: 1.2, ease: 'power3.inOut'
      }, 0.1)
      .to('.hero-line-right', {
        height: '100%', duration: 1.2, ease: 'power3.inOut'
      }, 0.2)
      .to('.hero-line-top', {
        width: '100%', duration: 1.4, ease: 'power3.inOut'
      }, 0.3)
      .to('.hero-line-bottom', {
        width: '100%', duration: 1.4, ease: 'power3.inOut'
      }, 0.4)

      // Phase 3: Navbar slides down from above
      .fromTo('.navbar',
        { opacity: 0, y: -40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        0.3
      )

      // Phase 4: Hero badge pops in
      .fromTo('.hero-tag-badge',
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.6
      )

      // Phase 5: Logo — the hero moment — zooms in from deep with 3D rotation
      .fromTo('.hero-logo-wrapper',
        { opacity: 0, scale: 0.3, y: 80, rotateX: 15 },
        {
          opacity: 1, scale: 1, y: 0, rotateX: 0,
          duration: 1.6,
          ease: 'power4.out'
        },
        0.7
      )

      // Phase 6: Logo glow intensifies after landing
      .fromTo('.hero-logo-img',
        { filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' },
        {
          filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.15))',
          duration: 1.2,
          ease: 'power2.out'
        },
        1.4
      )

      // Phase 7: Tagline slides up with character spread feel
      .fromTo('.hero-tagline',
        { opacity: 0, y: 40, letterSpacing: '0.4em' },
        {
          opacity: 1, y: 0, letterSpacing: '0.15em',
          duration: 1, ease: 'power3.out'
        },
        1.2
      )

      // Phase 8: Buttons fly in from below with stagger
      .fromTo('.btn-primary',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)' },
        1.5
      )
      .fromTo('.btn-outline',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)' },
        1.65
      )

      // Phase 9: Scroll hint fades in last
      .fromTo('.hero-scroll-hint',
        { opacity: 0, y: 20 },
        { opacity: 0.6, y: 0, duration: 0.8, ease: 'power2.out' },
        2.0
      )

      // Phase 10: Lines slowly fade out after entrance
      .to('.hero-line', {
        opacity: 0.03, duration: 3, ease: 'power2.out'
      }, 2.5);
  }

  // Minimum display time = 2.8s (lets the 2.4s writing animation complete + buffer)
  const minDisplayTime = 2800;
  const loadStart = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - loadStart;
    const remaining = Math.max(0, minDisplayTime - elapsed);
    setTimeout(dismissLoader, remaining);
  });

  // Safety fallback — dismiss after 6s max regardless
  setTimeout(() => {
    if (loaderOverlay && !loaderOverlay.classList.contains('hidden')) {
      dismissLoader();
    }
  }, 6000);

  /* ========================================================================
   * 1. THREE.JS — 3D CAMERA LENS + PARTICLE FIELD
   * ======================================================================== */
  const canvas = document.getElementById('webgl-canvas');

  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8888ff, 0.4);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.3, 20);
    fillLight.position.set(0, 0, 4);
    scene.add(fillLight);

    // ── 3D Camera Lens (Procedural) ──
    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    // Glass material for lens elements
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222233,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      envMapIntensity: 1.5
    });

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });

    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x333340,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    // Main lens barrel (cylinder)
    const barrelGeo = new THREE.CylinderGeometry(1.2, 1.1, 2.0, 64, 1, true);
    const barrel = new THREE.Mesh(barrelGeo, bodyMaterial);
    barrel.rotation.x = Math.PI / 2;
    lensGroup.add(barrel);

    // Front element ring
    const frontRingGeo = new THREE.TorusGeometry(1.2, 0.06, 16, 64);
    const frontRing = new THREE.Mesh(frontRingGeo, ringMaterial);
    frontRing.position.z = 1.0;
    lensGroup.add(frontRing);

    // Inner glass elements (concentric rings)
    const glassRings = [];
    const ringRadii = [0.95, 0.7, 0.45, 0.25];
    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.025, 12, 48);
      const ring = new THREE.Mesh(ringGeo, glassMaterial.clone());
      ring.material.opacity = 0.2 + i * 0.1;
      ring.position.z = 0.95 - i * 0.08;
      lensGroup.add(ring);
      glassRings.push(ring);
    });

    // Front glass element (convex disc)
    const frontGlassGeo = new THREE.CircleGeometry(0.92, 64);
    const frontGlass = new THREE.Mesh(frontGlassGeo, glassMaterial.clone());
    frontGlass.material.opacity = 0.15;
    frontGlass.position.z = 0.98;
    lensGroup.add(frontGlass);

    // Rear ring
    const rearRingGeo = new THREE.TorusGeometry(1.1, 0.05, 16, 64);
    const rearRing = new THREE.Mesh(rearRingGeo, ringMaterial);
    rearRing.position.z = -1.0;
    lensGroup.add(rearRing);

    // Focus ring (grip texture ring)
    const focusRingGeo = new THREE.TorusGeometry(1.22, 0.08, 8, 64);
    const focusRing = new THREE.Mesh(focusRingGeo, ringMaterial.clone());
    focusRing.material.roughness = 0.4;
    focusRing.position.z = 0.3;
    lensGroup.add(focusRing);

    // Aperture blades (hexagonal iris)
    const apertureGroup = new THREE.Group();
    const bladeCount = 7;
    for (let i = 0; i < bladeCount; i++) {
      const bladeGeo = new THREE.PlaneGeometry(0.5, 0.15);
      const bladeMat = new THREE.MeshPhysicalMaterial({
        color: 0x111115,
        metalness: 0.7,
        roughness: 0.3,
        side: THREE.DoubleSide
      });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      const angle = (i / bladeCount) * Math.PI * 2;
      blade.position.x = Math.cos(angle) * 0.35;
      blade.position.y = Math.sin(angle) * 0.35;
      blade.rotation.z = angle + Math.PI / 2;
      apertureGroup.add(blade);
    }
    apertureGroup.position.z = 0.6;
    lensGroup.add(apertureGroup);

    // Position lens to the right of center, subtle presence
    lensGroup.position.set(1.8, 0.2, 0);
    lensGroup.scale.set(0.85, 0.85, 0.85);

    // ── Particle System ──
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      particleSpeeds[i] = 0.002 + Math.random() * 0.005;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Mouse Tracking ──
    let targetMX = 0, targetMY = 0;
    let smoothMX = 0, smoothMY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ── Scroll-driven lens fade ──
    let scrollProgress = 0;
    window.addEventListener('scroll', () => {
      scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
    });

    // ── Animation Loop ──
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      smoothMX += (targetMX - smoothMX) * 0.03;
      smoothMY += (targetMY - smoothMY) * 0.03;

      // Lens rotation — slow, elegant
      lensGroup.rotation.y = elapsed * 0.15 + smoothMX * 0.3;
      lensGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.1 + smoothMY * 0.15;
      lensGroup.rotation.z = Math.sin(elapsed * 0.12) * 0.05;

      // Subtle lens float
      lensGroup.position.y = 0.2 + Math.sin(elapsed * 0.5) * 0.15;

      // Glass rings shimmer
      glassRings.forEach((ring, i) => {
        ring.rotation.z = elapsed * (0.1 + i * 0.05) * (i % 2 === 0 ? 1 : -1);
      });

      // Aperture breathe animation
      const aperturePulse = 1 + Math.sin(elapsed * 0.8) * 0.08;
      apertureGroup.scale.set(aperturePulse, aperturePulse, 1);

      // Particles drift
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        // Reset particles that drift too far
        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
          positions[i * 3] = (Math.random() - 0.5) * 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle camera parallax from mouse
      camera.position.x = smoothMX * 0.3;
      camera.position.y = smoothMY * 0.15;
      camera.lookAt(0, 0, 0);

      // Fade lens on scroll
      const lensOpacity = 1 - scrollProgress;
      lensGroup.visible = lensOpacity > 0.05;
      if (lensGroup.visible) {
        lensGroup.scale.setScalar(0.85 * (0.8 + lensOpacity * 0.2));
      }
      particleMat.opacity = 0.4 * (1 - scrollProgress * 0.6);

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }



  /* ========================================================================
   * 2. GSAP SCROLL-DRIVEN ANIMATIONS
   * (Hero entrance is handled by playCinematicEntrance after loader dismiss)
   * ======================================================================== */
  if (typeof gsap !== 'undefined') {

    // ── ScrollTrigger — Scroll Reveal System ──
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Reveal-up elements
      document.querySelectorAll('.reveal-up').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Reveal-scale elements (portfolio cards)
      document.querySelectorAll('.reveal-scale').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Timeline items stagger
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40, x: -20 },
          {
            opacity: 1, y: 0, x: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#about-timeline',
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Achievement panels float-in
      document.querySelectorAll('.achievement-panel').forEach((panel, i) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 3D Wall Gallery items — stagger entrance with depth
      document.querySelectorAll('.gallery-wall-item').forEach((item, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        gsap.fromTo(item,
          {
            opacity: 0,
            rotateY: (col - 1) * 8,
            rotateX: -3,
            z: -50
          },
          {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            z: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gallery-3d-wall',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Contact card entrance
      gsap.fromTo('.contact-info-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Social items stagger
      document.querySelectorAll('.social-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.social-handles-list',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

    } else {
      // Fallback: show everything
      document.querySelectorAll('.reveal-up, .reveal-scale, .timeline-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

  } else {
    // Fallback if GSAP not loaded — show everything immediately
    document.querySelectorAll('.navbar, .hero-tag-badge, .hero-logo-wrapper, .hero-tagline, .hero-actions, .hero-scroll-hint, .hero-orb, .reveal-up, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const wc = document.getElementById('webgl-canvas');
    if (wc) wc.classList.add('visible');
    document.querySelectorAll('.hero-line-left, .hero-line-right').forEach(l => l.style.height = '100%');
    document.querySelectorAll('.hero-line-top, .hero-line-bottom').forEach(l => l.style.width = '100%');
  }


  /* ========================================================================
   * 3. CUSTOM TRAILING CURSOR
   * ======================================================================== */
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
    followerPos.x += (mousePos.x - followerPos.x) * 0.12;
    followerPos.y += (mousePos.y - followerPos.y) * 0.12;
    if (cursorFollower) {
      cursorFollower.style.left = `${followerPos.x}px`;
      cursorFollower.style.top = `${followerPos.y}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover enlargement
  const hoverEls = document.querySelectorAll('a, button, .portfolio-card, .gallery-wall-item, .social-item, .tab-btn, .about-card-3d, .achievement-panel');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  /* ========================================================================
   * 4. 3D CARD TILT SYSTEM — Mouse-tracked perspective transforms
   * ======================================================================== */
  const tiltCards = document.querySelectorAll('.portfolio-card, .gallery-wall-item, .about-card-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });


  /* ========================================================================
   * 5. GALLERY FILTER SYSTEMS
   * ======================================================================== */
  function setupFilters(tabNavId, gridId) {
    const tabNav = document.getElementById(tabNavId);
    if (!tabNav) return;

    const btns = tabNav.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll(`#${gridId} .portfolio-card`);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          const match = filter === 'all' || category.includes(filter);

          if (match) {
            card.style.display = 'block';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card,
                { opacity: 0, scale: 0.93, y: 15 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
              );
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

  setupFilters('photo-tab-nav', 'photography-grid');
  setupFilters('graphic-tab-nav', 'graphic-grid');


  /* ========================================================================
   * 6. LIGHTBOX MODAL
   * ======================================================================== */
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

      // IP Notice: Photography only
      if (ipNoticeBox) {
        ipNoticeBox.style.display = isGraphic ? 'none' : 'block';
      }

      if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) closeModal();
  });


  /* ========================================================================
   * 7. ACTIVE NAV HIGHLIGHT ON SCROLL
   * ======================================================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 150;
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


  /* ========================================================================
   * 8. MOBILE NAVIGATION
   * ======================================================================== */
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

    navContainer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target) && !navToggle.contains(e.target)) {
        navContainer.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }


  /* ========================================================================
   * 9. BACKGROUND AUDIO
   * ======================================================================== */
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
      }).catch(() => {
        // Autoplay policy — will start on first interaction
      });
    }
  }

  forcePlayAudio();
  window.addEventListener('load', forcePlayAudio);

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


  /* ========================================================================
   * 10. FLOATING SOCIAL ICONS — Subtle 3D float animation
   * ======================================================================== */
  const socialItems = document.querySelectorAll('.social-item');
  socialItems.forEach((item, i) => {
    // Each social icon gets a subtle floating animation offset
    item.style.animation = `socialFloat ${3 + i * 0.4}s ease-in-out infinite alternate`;
    item.style.animationDelay = `${i * 0.2}s`;
  });

  // Inject the floating keyframe
  const floatStyle = document.createElement('style');
  floatStyle.textContent = `
    @keyframes socialFloat {
      0% { transform: perspective(600px) translateZ(0) translateY(0); }
      100% { transform: perspective(600px) translateZ(4px) translateY(-3px); }
    }
  `;
  document.head.appendChild(floatStyle);

});
