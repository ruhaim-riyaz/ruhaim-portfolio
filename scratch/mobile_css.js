const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const mobileCSS = `
/* ==========================================================================
   STRICT MOBILE OPTIMIZATIONS (320px - 414px)
   ========================================================================== */
@media (max-width: 480px) {
  /* Prevent any horizontal overflow on body */
  body {
    overflow-x: hidden !important;
    width: 100vw;
  }
  
  /* Fix Container Paddings */
  .section-container {
    padding: 3rem 1.2rem;
  }

  /* Fix Modal sizing for 320px */
  #lightbox-modal {
    padding: 1rem;
  }
  
  .modal-content {
    width: 100%;
    margin: 0;
    max-width: 100vw;
  }
  
  .modal-info {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }
  
  /* Timeline Adjustments for Ultra Small */
  .career-timeline-item {
    padding-left: 2.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  .career-timeline-node {
    width: 12px;
    height: 12px;
    left: 10px !important;
  }
  
  .career-timeline-track {
    left: 16px;
  }

  /* Achievements Grid Fallback */
  .prestigious-achievements-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .plaque-image {
    height: 180px;
  }
  
  .plaque-title {
    font-size: 1rem;
  }

  /* Hero Section Polish */
  .hero-title {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
}
`;

css += mobileCSS;
fs.writeFileSync('styles.css', css);
console.log('Successfully applied strict mobile CSS optimizations.');
