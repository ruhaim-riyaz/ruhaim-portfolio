const fs = require('fs');

const file = 'main.js';
let js = fs.readFileSync(file, 'utf8');

const startStr = "const allPortfolioCards = document.querySelectorAll('.portfolio-card');";
const endStr = "lightboxModal.classList.add('active');\n    });\n  });";

const startIdx = js.indexOf(startStr);
const endIdx = js.indexOf(endStr) + endStr.length;

if (startIdx > -1 && endIdx > -1) {
    const newLogic = `const allModalTriggers = document.querySelectorAll('.portfolio-card, .modal-trigger');
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
  
    js = js.substring(0, startIdx) + newLogic + js.substring(endIdx);
    fs.writeFileSync(file, js);
    console.log('Successfully updated main.js');
} else {
    console.log('Could not find injection point');
}
