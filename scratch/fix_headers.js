const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Use regex to fix the Experience duplication
const expRegex = /<section class="section-container" id="experience">\s*<div class="section-header">\s*<h2 class="section-title monochrome-gradient-text">EXPERIENCE<\/h2>\s*<p class="section-subtitle">My professional and creative involvements in photography, graphic design, and leadership\.<\/p>\s*<\/div>\s*<section class="section-container" id="experience">/g;

html = html.replace(expRegex, '<section class="section-container" id="experience">');

// Use regex to fix the Achievements duplication
const achRegex = /<section class="section-container" id="achievements">\s*<div class="section-header">\s*<h2 class="section-title monochrome-gradient-text">ACHIEVEMENTS<\/h2>\s*<p class="section-subtitle">Awards, recognitions, and milestones reflecting my dedication to creative and leadership excellence\.<\/p>\s*<\/div>\s*<section class="section-container" id="achievements">/g;

html = html.replace(achRegex, '<section class="section-container" id="achievements">');

fs.writeFileSync('index.html', html);
console.log('Successfully removed duplicate section headers');
