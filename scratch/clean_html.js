const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The easiest way is to use regex or string indexOf to remove the exact old sections.
// Old Experience block:
// <section class="section-container" id="experience"> ... <div class="portfolio-grid" id="experience-grid"> ... </section>
// Let's find `<div class="portfolio-grid" id="experience-grid">` and its parent `<section class="section-container" id="experience">`
const expGridStr = '<div class="portfolio-grid" id="experience-grid">';
let expGridIdx = html.indexOf(expGridStr);
if (expGridIdx !== -1) {
    let startIdx = html.lastIndexOf('<section class="section-container" id="experience">', expGridIdx);
    let endIdx = html.indexOf('</section>', expGridIdx) + '</section>'.length;
    if (startIdx !== -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
        console.log('Removed old Experience grid section.');
    }
}

// Old Achievements block:
// <div class="portfolio-grid" id="achievements-grid">
const achGridStr = '<div class="portfolio-grid" id="achievements-grid">';
let achGridIdx = html.indexOf(achGridStr);
if (achGridIdx !== -1) {
    let startIdx = html.lastIndexOf('<section class="section-container" id="achievements">', achGridIdx);
    let endIdx = html.indexOf('</section>', achGridIdx) + '</section>'.length;
    if (startIdx !== -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
        console.log('Removed old Achievements grid section.');
    }
}

fs.writeFileSync('index.html', html);
console.log('Successfully cleaned up index.html duplicates');
