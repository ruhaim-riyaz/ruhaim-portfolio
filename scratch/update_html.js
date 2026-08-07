const fs = require('fs');

const indexFile = 'index.html';
let html = fs.readFileSync(indexFile, 'utf8');

const experienceData = [
  {
    file: "Appointed as the editro for the year 2025.26 in the 36th installation ceremoney of intercat club of isiapthana college.JPG",
    title: "Editor (2025/26)",
    org: "Interact Club of Isipathana College",
    desc: "Appointed as the Editor for the 2025/26 term during the 36th Installation Ceremony.",
    category: "LEADERSHIP"
  },
  {
    file: "Completed Speak course and gave speech for 1000+ people.JPG",
    title: "Keynote Speaker & Graduate",
    org: "Speak Course",
    desc: "Successfully completed the Speak course and delivered a speech to an audience of over 1,000 attendees.",
    category: "PUBLIC SPEAKING"
  },
  {
    file: "Grateful to have been the official photographer of Isipathana College Rugby throughout this incredible journey..JPG",
    title: "Official Photographer",
    org: "Isipathana College Rugby",
    desc: "Served as the official sports photographer covering the Isipathana College Rugby season.",
    category: "SPORTS PHOTOGRAPHY"
  },
  {
    file: "Honored to be appointed as the Editor of the All Island School Photographers' Association - AISPA for the year 202627 (2).JPEG",
    title: "Editor (2026/27)",
    org: "All Island School Photographers' Association (AISPA)",
    desc: "Appointed as Editor of AISPA for the 2026/27 term, overseeing island-wide school photography publications.",
    category: "EDITORIAL"
  },
  {
    file: "Honoured to have attended the 3rd AISSA Installation Ceremony, marking my final official event as the Chief Editor of the Isipathana College Science Society for the Year 202526..JPG",
    title: "Chief Editor (2025/26)",
    org: "Isipathana College Science Society",
    desc: "Concluded tenure as Chief Editor during the 3rd AISSA Installation Ceremony.",
    category: "LEADERSHIP"
  },
  {
    file: "The installation ceremoney of mahanama college.JPG",
    title: "Official Delegate & Photographer",
    org: "Mahanama College",
    desc: "Represented as an official delegate and covered photography for the Installation Ceremony.",
    category: "EVENT PHOTOGRAPHY"
  },
  {
    file: "the installation ceremoney of st.johns college nugegoda.JPG",
    title: "Official Delegate & Photographer",
    org: "St. John's College Nugegoda",
    desc: "Participated as a delegate and event photographer for the installation ceremony.",
    category: "EVENT PHOTOGRAPHY"
  }
];

const achievementsData = [
  {
    file: "Apprecitaion awrd for being a excutive commitie in the scince socity of isipathana college (1).JPG",
    title: "Appreciation Award – Chief Editor",
    org: "Isipathana College Science Society (ENIGMA '25)",
    desc: "Received in recognition of outstanding leadership and dedicated service as a Top Board Member.",
    category: "LEADERSHIP AWARD"
  },
  {
    file: "DAMPAL Seya 2025 the photography day of dharmapala vidayalayta awrded for photography.JPG",
    title: "Multiple Awards – Mobile Photography",
    org: "Photographic Art Society, Dharmapala Vidyalaya (DAMPAL Seya 2025)",
    desc: "Won multiple photography awards including the Mobile Photography category at DAMPAL Seya 2025.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "Eclat 24 the photography day mahanam girls college kandy awarded for photography.JPG",
    title: "3rd Place – Monochrome Category",
    org: "Mahanama Girls College Kandy (ECLAT '24)",
    desc: "Secured 3rd place in the Monochrome photography category at the ECLAT '24 photography day.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "Expozia 24 the media day of zahira college awarded in photography cateogry.JPG",
    title: "Award in Photography",
    org: "Zahira College (EXPOZIA '25 Media Day)",
    desc: "Awarded in the photography category at the EXPOZIA '25 Media Day.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "HE SARA 24 the media day competition of gothami balika vidayalaya awarded in photography.JPG",
    title: "Media & Photography Award",
    org: "Gothami Balika Vidyalaya (HEESARA 2024)",
    desc: "Recognized for media and photography excellence at HEESARA 2024 All Island Bilingual Media Competition.",
    category: "MEDIA AWARD"
  },
  {
    file: "Honored to receive the District Appreciation Award at the Invictus Inaugural District Conference of Leo District 306 D7. Grateful for the recognition and inspired to continue serving with dedicat.JPG",
    title: "President's Appreciation Award",
    org: "Leo District 306 D7 (Invictus Inaugural District Conference)",
    desc: "Honored to receive the District Appreciation Award for dedicated service and recognition as a Leo.",
    category: "LEADERSHIP AWARD"
  },
  {
    file: "Kiriana 25 the photographic day of sirimavo banadaranayaka vidayalaya awrded for mbile cateogry (1).JPG",
    title: "2nd Place & Merit Award",
    org: "Sirimavo Bandaranaike Vidyalaya (Kirana '25)",
    desc: "Secured 2nd place and a Merit award across photography categories at Kirana '25.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "LOOM LENS 25 the all island photography competitin organised by the all isand photography association won prize in photography.JPG",
    title: "Photography Excellence Award",
    org: "All Island School Photographers' Association (LOOM LENS '25)",
    desc: "Awarded for photography excellence at the all-island photography competition.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "NETHINETHARA The Media Day of Isipathana College, held on the fifth of May. Proud to secure 1st place in Graphic Design and 2nd place in Photography (Monochrome & Street categories)..JPG",
    title: "1st Place – Graphic Design & 2nd Place – Photography",
    org: "Isipathana College Media Unit (NETHINETHARA Media Day)",
    desc: "Secured 1st place in Graphic Design and 2nd place in Monochrome & Street Photography categories.",
    category: "DESIGN & PHOTOGRAPHY"
  },
  {
    file: "NOOR ’25 The Islamic Day of Isipathana College, held on the second of May 2026 Honoured to win a prize English Oratory.JPG",
    title: "Prize in English Oratory",
    org: "Isipathana College Islamic Society (NOOR '25 Islamic Day)",
    desc: "Honored to win a prize in English Oratory at NOOR '25.",
    category: "PUBLIC SPEAKING"
  },
  {
    file: "Pilibimbu 2025 the photographic day of ananda college Arded 1st place in monochrome categorey.JPG",
    title: "1st Place – Monochrome (Inter-School)",
    org: "Ananda College Photographic Art Society (Pilibimbu 2025)",
    desc: "Awarded 1st place in the Inter-School Monochrome category.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "Serenity 24 the islamic day of DS senanayaka College awared for oaratory.JPG",
    title: "Photography Award",
    org: "Photography Society of D.S. Senanayake College (Serenity '24)",
    desc: "Awarded at Serenity '24 organized by the Photography Society of D.S. Senanayake College.",
    category: "PHOTOGRAPHY AWARD"
  },
  {
    file: "Successfully completed the ILT examination and proud to be recognized as an ILT Graduate.JPG",
    title: "ILT Graduate",
    org: "ILT Examination",
    desc: "Successfully completed the ILT examination and officially recognized as a graduate.",
    category: "CERTIFICATION"
  },
  {
    file: "Top performing leo of leo disrict 306 d7.JPG",
    title: "Top Performing Leo",
    org: "Leo District 306 D7",
    desc: "Recognized as a Top Performing Leo for outstanding dedication and service in Leo District 306 D7.",
    category: "LEADERSHIP AWARD"
  },
  {
    file: "VIDASA 24 the photography day of anula vidyalaya awarded in photography.JPG",
    title: "Merit Award – Photography",
    org: "Anula Vidyalaya (VIDASA '24)",
    desc: "Received a Merit Award at the VIDASA '24 photography day exhibition.",
    category: "PHOTOGRAPHY AWARD"
  }
];

function escapeHtml(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let newExperienceCardsHTML = '<div class="career-timeline">\n  <div class="career-timeline-track"></div>\n';
experienceData.forEach((item, index) => {
  let imgPath = `assets/Experience/${encodeURIComponent(item.file).replace(/%20/g, '%20')}`;
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

let newAchievementsCardsHTML = '<div class="prestigious-achievements-grid">\n';
achievementsData.forEach((item, index) => {
  let imgPath = `assets/Achievements/${encodeURIComponent(item.file).replace(/%20/g, '%20')}`;
  newAchievementsCardsHTML += `
  <div class="achievement-plaque modal-trigger achievement-trigger" 
       data-title="${escapeHtml(item.title)}" 
       data-org="${escapeHtml(item.org)}" 
       data-desc="${escapeHtml(item.desc)}" 
       data-category="${escapeHtml(item.category)}" 
       data-image="${escapeHtml(imgPath)}" 
       data-type="achievement">
    <div class="plaque-image">
      <img src="${imgPath}" alt="${escapeHtml(item.title)}">
      <div class="plaque-overlay"><i data-lucide="award"></i> View Details</div>
    </div>
    <div class="plaque-content">
      <span class="plaque-category">${item.category}</span>
      <h3 class="plaque-title">${item.title}</h3>
      <p class="plaque-org">${item.org}</p>
    </div>
  </div>
`;
});
newAchievementsCardsHTML += '</div>';

// Replace Experience
const expStartStr = '<div class="portfolio-grid" id="experience-grid">';
let expStartIdx = html.indexOf(expStartStr);
if (expStartIdx === -1) {
    // try finding the whole section
    expStartIdx = html.indexOf('<section class="section-container" id="experience">');
}
const expGridEndIdx = html.indexOf('</section>', expStartIdx);

let htmlBeforeExp = html.substring(0, expStartIdx);
let expHeader = `
      <section class="section-container" id="experience">
        <div class="section-header">
          <h2 class="section-title monochrome-gradient-text">EXPERIENCE</h2>
          <p class="section-subtitle">My professional and creative involvements in photography, graphic design, and leadership.</p>
        </div>
`;
htmlBeforeExp += expHeader + newExperienceCardsHTML + '\n      </section>\n';

const htmlAfterExp = html.substring(expGridEndIdx + 10);

html = htmlBeforeExp + htmlAfterExp;

// Replace Achievements
const achStartStr = '<div class="portfolio-grid" id="achievements-grid">';
let achStartIdx = html.indexOf(achStartStr);
if (achStartIdx === -1) {
    achStartIdx = html.indexOf('<section class="section-container" id="achievements">');
}
const achGridEndIdx = html.indexOf('</section>', achStartIdx);

let htmlBeforeAch = html.substring(0, achStartIdx);
let achHeader = `
      <section class="section-container" id="achievements">
        <div class="section-header">
          <h2 class="section-title monochrome-gradient-text">ACHIEVEMENTS</h2>
          <p class="section-subtitle">Prestigious awards and milestones reflecting my dedication to creative and leadership excellence.</p>
        </div>
`;
htmlBeforeAch += achHeader + newAchievementsCardsHTML + '\n      </section>\n';

const htmlAfterAch = html.substring(achGridEndIdx + 10);

html = htmlBeforeAch + htmlAfterAch;

fs.writeFileSync('index.html', html);
console.log('Successfully updated HTML');
