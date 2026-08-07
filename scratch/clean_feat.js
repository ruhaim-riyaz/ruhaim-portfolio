const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the malformed HTML comment
html = html.replace(/ =================================================================== -->(?=\s*<!-- FEATURED PROJECTS SECTION -->)/g, '');
html = html.replace(/<!-- =================================================================== -->\s*<!-- FEATURED PROJECTS SECTION -->\s*<!-- =================================================================== -->\s*<section class="section-container" id="featured-projects">[\s\S]*?<\/section>/g, '');

// 2. Remove from Navbar
html = html.replace(/<li><a href="#featured-projects" class="nav-link">Portfolio<\/a><\/li>\s*/g, '');

// 3. Update Hero Button
html = html.replace(/<a href="#featured-projects" class="btn-mono-outline">/g, '<a href="#photography-archive" class="btn-mono-outline">');

// If the regex above failed because the comment was exactly ` =================================================================== -->` 
// without the <!--, let's just do a manual substring removal of the section.
const featStartStr = '<section class="section-container" id="featured-projects">';
const featStartIdx = html.indexOf(featStartStr);
if (featStartIdx !== -1) {
    // Find the comment just above it
    const commentIdx = html.lastIndexOf(' =================================================================== -->', featStartIdx);
    const removeStart = commentIdx !== -1 ? commentIdx : featStartIdx;
    const featEndIdx = html.indexOf('</section>', featStartIdx) + '</section>'.length;
    html = html.substring(0, removeStart) + html.substring(featEndIdx);
    console.log('Removed Featured Projects section via substring.');
}

fs.writeFileSync('index.html', html);
console.log('HTML cleanup complete.');
