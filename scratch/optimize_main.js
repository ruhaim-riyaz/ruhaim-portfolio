const fs = require('fs');

let js = fs.readFileSync('main.js', 'utf8');

// 1. Optimize WebGL Geometry for Mobile
// Find waveSegments = 45; and replace
js = js.replace('const waveSegments = 45;', 'const isMobile = window.innerWidth < 768;\n    const waveSegments = isMobile ? 20 : 45;');

// 2. Optimize Particles for Mobile
// The file has a loop for particles, typically it generates them dynamically. Let's find it.
// e.g. "for (let i = 0; i < 900; i++)" or similar.
const pCountMatch = js.match(/for\s*\(\s*let\s*i\s*=\s*0;\s*i\s*<\s*(\d+);\s*i\+\+\s*\)/);
if (pCountMatch) {
    const pCountStr = pCountMatch[0];
    const originalCount = pCountMatch[1];
    js = js.replace(pCountStr, `const pCount = isMobile ? Math.floor(${originalCount}/3) : ${originalCount};\n    for (let i = 0; i < pCount; i++)`);
}

fs.writeFileSync('main.js', js);
console.log('Successfully optimized main.js for mobile performance.');
