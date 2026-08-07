const fs = require('fs');
const path = require('path');

const expDir = 'c:\\\\Users\\\\mruha\\\\.antigravity-ide\\\\assets\\\\Experience';
const files = fs.readdirSync(expDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

// Predefined professional data
const dataMap = {
  "Appointed as the editro for the year 2025.26 in the 36th installation ceremoney of intercat club of isiapthana college.JPG": {
    title: "Editor (2025/26)",
    org: "Interact Club of Isipathana College",
    desc: "Appointed as the Editor for the 2025/26 term during the 36th Installation Ceremony.",
    category: "LEADERSHIP"
  },
  "Completed Speak course and gave speech for 1000+ people.JPG": {
    title: "Keynote Speaker & Graduate",
    org: "Speak Course",
    desc: "Successfully completed the Speak course and delivered a speech to an audience of over 1,000 attendees.",
    category: "PUBLIC SPEAKING"
  },
  "Grateful to have been the official photographer of Isipathana College Rugby throughout this incredible journey..JPG": {
    title: "Official Photographer",
    org: "Isipathana College Rugby",
    desc: "Served as the official sports photographer covering the Isipathana College Rugby season.",
    category: "SPORTS PHOTOGRAPHY"
  },
  "Honored to be appointed as the Editor of the All Island School Photographers' Association - AISPA for the year 202627 (2).JPEG": {
    title: "Editor (2026/27)",
    org: "All Island School Photographers' Association (AISPA)",
    desc: "Appointed as Editor of AISPA for the 2026/27 term, overseeing island-wide school photography publications.",
    category: "EDITORIAL"
  },
  "Honored to be appointed as the Editor of the All Island School Photographers' Association - AISPA for the year 202627. (1).JPEG": {
    title: "AISPA Installation Delegate",
    org: "All Island School Photographers' Association (AISPA)",
    desc: "Attended the official installation ceremony representing the editorial board for 2026/27.",
    category: "EVENT"
  },
  "Honored to be appointed as the Editor of the All Island School Photographers' Association - AISPA for the year 202627.JPEG": {
    title: "AISPA Executive Board",
    org: "All Island School Photographers' Association (AISPA)",
    desc: "Official appointment ceremony for the All Island School Photographers' Association Executive Board.",
    category: "LEADERSHIP"
  },
  "Honoured to have attended the 3rd AISSA Installation Ceremony, marking my final official event as the Chief Editor of the Isipathana College Science Society for the Year 202526..JPG": {
    title: "Chief Editor (2025/26)",
    org: "Isipathana College Science Society",
    desc: "Concluded tenure as Chief Editor during the 3rd AISSA Installation Ceremony.",
    category: "LEADERSHIP"
  },
  "The installation ceremoney of mahanama college.JPG": {
    title: "Official Delegate & Photographer",
    org: "Mahanama College",
    desc: "Represented as an official delegate and covered photography for the Installation Ceremony.",
    category: "EVENT PHOTOGRAPHY"
  },
  "the installation ceremoney of st.johns college nugegoda.JPG": {
    title: "Official Delegate & Photographer",
    org: "St. John's College Nugegoda",
    desc: "Participated as a delegate and event photographer for the installation ceremony.",
    category: "EVENT PHOTOGRAPHY"
  }
};

function escapeHtml(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let newExperienceCardsHTML = '<div class="career-timeline">\n  <div class="career-timeline-track"></div>\n';
files.forEach((file) => {
  const item = dataMap[file] || {
      title: "Experience Timeline",
      org: "Professional Event",
      desc: "Attended and photographed the official event.",
      category: "EXPERIENCE"
  };
  let imgPath = `assets/Experience/${encodeURIComponent(file).replace(/%20/g, '%20')}`;
  newExperienceCardsHTML += `
  <div class="career-timeline-item modal-trigger experience-trigger" 
       data-title="${escapeHtml(item.title)}" 
       data-org="${escapeHtml(item.org)}" 
       data-desc="${escapeHtml(item.desc)}" 
       data-category="${escapeHtml(item.category)}" 
       data-image="${escapeHtml(imgPath)}" 
       data-type="experience">
    <div class="career-timeline-node"></div>
    <div class="career-timeline-content">
      <span class="career-timeline-category">${item.category}</span>
      <h3 class="career-timeline-title">${item.title}</h3>
      <p class="career-timeline-org">${item.org}</p>
      <p class="career-timeline-desc">${item.desc}</p>
    </div>
    <div class="career-timeline-thumb">
      <img src="${imgPath}" alt="${escapeHtml(item.title)}">
      <div class="thumb-overlay"><i data-lucide="maximize-2"></i></div>
    </div>
  </div>
`;
});
newExperienceCardsHTML += '</div>';

let html = fs.readFileSync('index.html', 'utf8');

const expStartStr = '<section class="section-container" id="experience">';
let expStartIdx = html.indexOf(expStartStr);
const expGridEndIdx = html.indexOf('</section>', expStartIdx);

if (expStartIdx !== -1) {
    let htmlBeforeExp = html.substring(0, expStartIdx);
    let expHeader = `
      <section class="section-container" id="experience">
        <div class="section-header">
          <h2 class="section-title monochrome-gradient-text">EXPERIENCE</h2>
          <p class="section-subtitle">My professional and creative involvements in photography, graphic design, and leadership.</p>
        </div>
`;
    htmlBeforeExp += expHeader + newExperienceCardsHTML + '\n      </section>';
    const htmlAfterExp = html.substring(expGridEndIdx + '</section>'.length);
    html = htmlBeforeExp + htmlAfterExp;
    fs.writeFileSync('index.html', html);
    console.log('Successfully updated Experience section');
} else {
    console.log('Failed to find Experience section');
}
