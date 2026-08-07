const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Remove old timeline CSS
const oldTimelineStart = css.indexOf('/* ==========================================================================');
const oldTimelineStr = 'ACHIEVEMENTS TIMELINE STYLES';
const timelineIdx = css.indexOf(oldTimelineStr);
if (timelineIdx > -1) {
  // Find the comment block start
  let startIdx = css.lastIndexOf('/*', timelineIdx);
  
  // Find the end. Let's just find the next section, which is /* ==========================================================================
  // Actually, wait, let's just find the end of the file or the next section.
  let endIdx = css.indexOf('/* ==========================================================================', startIdx + 10);
  if (endIdx === -1) endIdx = css.length;

  css = css.substring(0, startIdx) + css.substring(endIdx);
  console.log("Removed old timeline CSS.");
}

const newStyles = `

/* ==========================================================================
   ABOUT SECTION - LAYERED DEPTH EFFECT
   ========================================================================== */
.layered-depth {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  aspect-ratio: 4/5;
  background: var(--surface-light);
  border: 1px solid var(--border-liquid);
}

.avatar-primary,
.avatar-secondary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.avatar-secondary {
  opacity: 0;
  transform: scale(1.05) translateZ(-50px);
}

.layered-depth:hover .avatar-primary {
  opacity: 0;
  transform: scale(1.05) translateZ(50px);
}

.layered-depth:hover .avatar-secondary {
  opacity: 1;
  transform: scale(1) translateZ(0);
}

/* ==========================================================================
   EXPERIENCE SECTION - CAREER TIMELINE
   ========================================================================== */
.career-timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

.career-timeline-track {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--border-liquid) 10%, var(--border-liquid) 90%, transparent);
  transform: translateX(-50%);
}

.career-timeline-item {
  position: relative;
  width: 50%;
  padding: 2rem;
  box-sizing: border-box;
  opacity: 1;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.career-timeline-item:nth-child(even) {
  left: 0;
  text-align: right;
  padding-right: 3rem;
}

.career-timeline-item:nth-child(odd) {
  left: 50%;
  text-align: left;
  padding-left: 3rem;
}

.career-timeline-node {
  position: absolute;
  top: 2.5rem;
  width: 16px;
  height: 16px;
  background: var(--accent-white);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255,255,255,0.5);
  z-index: 2;
}

.career-timeline-item:nth-child(even) .career-timeline-node {
  right: -8px;
}

.career-timeline-item:nth-child(odd) .career-timeline-node {
  left: -8px;
}

.career-timeline-content {
  background: var(--surface-light);
  border: 1px solid var(--border-liquid);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-bottom: 1rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.career-timeline-item:hover .career-timeline-content {
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-5px);
}

.career-timeline-category {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: var(--accent-white);
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 0.2rem;
}

.career-timeline-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #fff;
}

.career-timeline-org {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.career-timeline-desc {
  font-size: 0.85rem;
  color: #999;
  line-height: 1.5;
}

.career-timeline-thumb {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-liquid);
  max-height: 180px;
}

.career-timeline-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.career-timeline-item:hover .career-timeline-thumb img {
  transform: scale(1.05);
}

.thumb-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.career-timeline-item:hover .thumb-overlay {
  opacity: 1;
}

.thumb-overlay i {
  color: #fff;
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .career-timeline-track {
    left: 20px;
  }
  .career-timeline-item {
    width: 100%;
    padding-left: 3.5rem !important;
    padding-right: 1rem !important;
    text-align: left !important;
  }
  .career-timeline-item:nth-child(even),
  .career-timeline-item:nth-child(odd) {
    left: 0;
  }
  .career-timeline-item:nth-child(even) .career-timeline-node,
  .career-timeline-item:nth-child(odd) .career-timeline-node {
    left: 12px;
    right: auto;
  }
}


/* ==========================================================================
   ACHIEVEMENTS SECTION - PRESTIGIOUS MASONRY
   ========================================================================== */
.prestigious-achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.achievement-plaque {
  background: var(--surface-light);
  border: 1px solid var(--border-liquid);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.achievement-plaque:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  border-color: rgba(255,255,255,0.25);
}

.plaque-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.plaque-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.achievement-plaque:hover .plaque-image img {
  transform: scale(1.08);
}

.plaque-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.achievement-plaque:hover .plaque-overlay {
  opacity: 1;
}

.plaque-overlay i {
  margin-right: 8px;
  width: 18px;
  height: 18px;
}

.plaque-content {
  padding: 1.5rem;
  text-align: center;
}

.plaque-category {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.plaque-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.plaque-org {
  font-size: 0.8rem;
  color: #888;
}

`;

css += newStyles;

fs.writeFileSync('styles.css', css);
console.log('Successfully updated CSS');
