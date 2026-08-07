const fs = require('fs');
let js = fs.readFileSync('main.js', 'utf8');

// 1. Fix Modal Logic
const modalStartStr = "const allPortfolioCards = document.querySelectorAll('.portfolio-card');";
const modalEndStr = "lightboxModal.classList.add('active');\n    });\n  });";

const modalStartIdx = js.indexOf(modalStartStr);
const modalEndIdx = js.indexOf(modalEndStr) + modalEndStr.length;

if (modalStartIdx !== -1 && modalEndIdx !== -1) {
    const newModalLogic = `const allModalTriggers = document.querySelectorAll('.portfolio-card, .modal-trigger');
  const modalCta = document.getElementById('modal-cta');

  allModalTriggers.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || '';
      const org = card.getAttribute('data-org') || '';
      const desc = card.getAttribute('data-desc') || '';
      const category = card.getAttribute('data-category') || '';
      const imageSrc = card.getAttribute('data-image') || '';
      const photographer = card.getAttribute('data-photographer');
      const designer = card.getAttribute('data-designer');
      const isExperience = card.classList.contains('experience-trigger');
      const isAchievement = card.classList.contains('achievement-trigger');
      const isTimeline = isExperience || isAchievement;

      if (modalImg) modalImg.src = imageSrc;
      if (modalTitle) modalTitle.textContent = title;
      
      if (modalDesc) {
        if (isTimeline && org) {
          modalDesc.innerHTML = \`<strong style="color: #fff; display:block; margin-bottom: 0.5rem;">\${org}</strong>\${desc}\`;
        } else {
          modalDesc.textContent = desc;
        }
      }
      
      if (modalCategory) modalCategory.textContent = category.toUpperCase();

      const isGraphic = card.classList.contains('graphic-card') || !!designer;

      if (modalCredit) {
        if (isTimeline) {
          modalCredit.style.display = 'none';
        } else {
          modalCredit.style.display = 'block';
          if (photographer) {
            modalCredit.textContent = \`Photographed by: \${photographer}\`;
          } else if (designer) {
            modalCredit.textContent = \`Designed by: \${designer}\`;
          } else {
            modalCredit.textContent = \`Photographed by Ruhaim Riyaz\`;
          }
        }
      }

      if (ipNoticeBox) {
        if (isGraphic || isTimeline) {
          ipNoticeBox.style.display = 'none';
        } else {
          ipNoticeBox.style.display = 'block';
        }
      }

      if (modalCta) {
        if (isTimeline) {
          modalCta.style.display = 'none';
        } else {
          modalCta.style.display = 'inline-flex';
        }
      }

      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });`;
  
    js = js.substring(0, modalStartIdx) + newModalLogic + js.substring(modalEndIdx);
}

// 2. Fix Preloader Fallback
const preloaderEndStr = "}, 60);\n  }";
const preloaderEndIdx = js.indexOf(preloaderEndStr);

if (preloaderEndIdx !== -1) {
    const fallbackCode = `
    // Maximum preloader duration fallback
    setTimeout(() => {
      if (!preloader.classList.contains('hidden')) {
        console.warn('Preloader timeout reached. Force hiding preloader.');
        clearInterval(progressInterval);
        preloaderFill.style.width = '100%';
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo('.hero-tag-badge', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' });
            gsap.fromTo('.hero-logo-wrapper', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: 'back.out(1.2)' });
            gsap.fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: 'power3.out' });
            gsap.fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: 'power3.out' });
          }
        }, 800);
      }
    }, 3000);`;
    
    js = js.substring(0, preloaderEndIdx + 9) + fallbackCode + js.substring(preloaderEndIdx + 9);
}

fs.writeFileSync('main.js', js);
console.log('main.js successfully patched');
