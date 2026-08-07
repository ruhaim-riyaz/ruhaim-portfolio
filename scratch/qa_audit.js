const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const imgRegex = /<img[^>]+src="([^">]+)"/g;
let match;
const missingImages = [];
const allImages = [];

while ((match = imgRegex.exec(html)) !== null) {
  let imgSrc = match[1];
  allImages.push(imgSrc);
  
  // decode URI component to handle %20 etc
  let decodedSrc = decodeURIComponent(imgSrc);
  
  if (!fs.existsSync(decodedSrc)) {
    missingImages.push(imgSrc);
  }
}

console.log('Total images found in HTML:', allImages.length);
if (missingImages.length > 0) {
  console.log('Missing images:', missingImages);
} else {
  console.log('All image paths are valid.');
}

// Check for empty sections
const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/g;
let sectionMatch;
let emptySections = 0;
while ((sectionMatch = sectionRegex.exec(html)) !== null) {
  if (sectionMatch[1].trim() === '') {
    emptySections++;
  }
}
console.log('Empty sections:', emptySections);

// Check for duplicate IDs
const idRegex = /id="([^">]+)"/g;
let idMatch;
const ids = new Set();
const duplicateIds = [];
while ((idMatch = idRegex.exec(html)) !== null) {
  const id = idMatch[1];
  if (ids.has(id)) {
    duplicateIds.push(id);
  } else {
    ids.add(id);
  }
}
console.log('Duplicate IDs:', duplicateIds);
