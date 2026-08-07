const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const rx = /class="portfolio-card[^"]*"/g;
let match;
const res = new Set();
while ((match = rx.exec(html)) !== null) {
  res.add(match[0]);
}
console.log(Array.from(res));
