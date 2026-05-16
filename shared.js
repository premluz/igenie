/**
 * SHARED JAVASCRIPT — NEURAL GRID & COMMON UTILITIES
 * Used by both index.html and all detail-*.html pages
 */

// ═══════════════════════════════════════════════════════════════════
//  PORTFOLIO PROJECTS AND NAVIGATION
// ═══════════════════════════════════════════════════════════════════

// Static array of portfolio project pages
const PROJECTS = [
     'detail-galachain.html',
        'detail-tracr.html',  
        'detail-vodafoneapp.html',
  'detail-vodafone.html',
    'detail-sony.html',
  
];

function handleBack() {
  document.body.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1), filter .35s, opacity .35s';
  document.body.style.transform  = 'scale(.95)';
  document.body.style.filter     = 'blur(10px)';
  document.body.style.opacity    = '.6';
  setTimeout(() => window.history.back(), 250);
}

// Navigate to next/previous portfolio projects
function navigateNextProject() {
  navigateToAdjacentProject(1);
}

function navigatePrevProject() {
  navigateToAdjacentProject(-1);
}

function navigateToAdjacentProject(direction) {
  // Get current page filename from URL
  const url = window.location.pathname;
  const match = url.match(/([^\/]+\.html)$/);
  if (!match) return;

  const currentPage = match[1];

  // Find current project index
  const currentIdx = PROJECTS.indexOf(currentPage);
  if (currentIdx === -1) return;

  // Calculate next index (wrap around)
  const nextIdx = (currentIdx + direction + PROJECTS.length) % PROJECTS.length;
  const nextProject = PROJECTS[nextIdx];

  // Navigate to next project using relative link
  window.location.href = nextProject;
}

window.addEventListener('pageshow', () => {
  document.body.style.transition = '';
  document.body.style.transform  = '';
  document.body.style.filter     = '';
  document.body.style.opacity    = '';
});

// ═══════════════════════════════════════════════════════════════════
//  NEURAL GRID - FINAL PERFECT VERSION
// ═══════════════════════════════════════════════════════════════════
/**
 * Grid lines: Static SVG elements with dynamic stroke-dasharray animation
 * Nodes: Pull toward cursor with smooth easing
 * Cursor lines: Purple lines always connected to nearby nodes
 * Result: No glitter, elastic network effect, smooth animation
 */

class NeuralGridFinalPerfect {
    constructor(config = {}) {
        // Desktop configuration
        this.desktopConfig = {
            starCount: config.starCount || 400,
            lineDistance: config.lineDistance || 200,
            lineOpacity: config.lineOpacity || 0.60,
            cursorDistance: config.cursorDistance || 150,
            magneticPullDistance: config.magneticPullDistance || 150,
            magneticPullStrength: config.magneticPullStrength || 20,
            ...config
        };

        // Mobile configuration (reduced for performance)
        this.mobileConfig = {
            starCount: config.mobileStarCount || 10,
            lineDistance: config.mobileLineDistance || 50,
            lineOpacity: config.mobileLineOpacity || 0.40,
            cursorDistance: config.mobileCursorDistance || 100,
            magneticPullDistance: config.mobileMagneticPullDistance || 100,
            magneticPullStrength: config.mobileMagneticPullStrength || 15,
            ...config
        };

        // Apply appropriate config based on viewport
        this.isMobile = this.detectMobileViewport();
        this.config = this.isMobile ? this.mobileConfig : this.desktopConfig;

        this.starsContainer = document.querySelector('.neural-grid-stars');
        this.gridLinesElement = document.querySelector('.neural-grid-lines');
        this.cursorLinesElement = document.querySelector('.neural-grid-cursor-lines');

        this.stars = [];
        this.gridLines = [];
        this.cursorX = window.innerWidth / 2;
        this.cursorY = window.innerHeight / 2;
        this.frameCount = 0;
        this.lastFpsTime = Date.now();

        this.init();
    }

    detectMobileViewport() {
        return window.innerWidth < 768;
    }

    regenerateForViewport() {
        const isMobileNow = this.detectMobileViewport();

        // Only regenerate if viewport type changed
        if (isMobileNow === this.isMobile) return;

        this.isMobile = isMobileNow;
        this.config = this.isMobile ? this.mobileConfig : this.desktopConfig;

        // Clear existing elements
        if (this.starsContainer) this.starsContainer.innerHTML = '';
        if (this.gridLinesElement) this.gridLinesElement.innerHTML = '';
        if (this.cursorLinesElement) this.cursorLinesElement.innerHTML = '';

        // Reset arrays
        this.stars = [];
        this.gridLines = [];

        // Regenerate with new config
        this.createStars();
        this.createStaticGridLines();
    }

    init() {
        this.createStars();
        this.createStaticGridLines();
        this.startAnimationLoop();
        this.attachMouseListener();
        this.attachResizeListener();
        this.startFpsCounter();
    }

    attachResizeListener() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            // Debounce resize to avoid excessive regeneration
            resizeTimer = setTimeout(() => {
                this.regenerateForViewport();
            }, 300);
        });
    }

    createStars() {
        for (let i = 0; i < this.config.starCount; i++) {
            const starElement = document.createElement('div');
            starElement.className = 'star';

            const size = Math.random() * Math.pow(Math.random(), 2) * 3.5 + 0.5;
            const colorRandom = Math.random();
            let background, boxShadow;

            if (colorRandom > 0.9) {
                background = 'radial-gradient(circle, rgba(230, 203, 166, 0.9), rgba(230, 203, 166, 0.3))';
                boxShadow = 'rgba(230, 203, 166, 0.6) 0px 0px 6px';
            } else if (colorRandom > 0.7) {
                background = 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.2))';
                boxShadow = 'rgba(139, 92, 246, 0.4) 0px 0px 4px';
            } else {
                background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))';
                boxShadow = 'none';
            }

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.6 + 0.4;

            starElement.style.left = `${x}%`;
            starElement.style.top = `${y}%`;
            starElement.style.width = `${size}px`;
            starElement.style.height = `${size}px`;
            starElement.style.background = background;
            starElement.style.boxShadow = boxShadow;
            starElement.style.opacity = opacity;
            starElement.style.animationDelay = `${Math.random() * 5}s`;
            starElement.style.setProperty('--star-opacity', opacity);

            this.starsContainer.appendChild(starElement);

            this.stars.push({
                element: starElement,
                x: x,
                y: y,
                size: size,
                offsetX: 0,
                offsetY: 0,
                targetOffsetX: 0,
                targetOffsetY: 0
            });
        }

        const starCountEl = document.getElementById('starCount');
        if (starCountEl) starCountEl.textContent = this.config.starCount;
    }

    getElementCenter(star) {
        const rect = star.element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    createStaticGridLines() {
        this.gridLinesElement.innerHTML = '';
        let lineCount = 0;

        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const pos1 = this.getElementCenter(this.stars[i]);
                const pos2 = this.getElementCenter(this.stars[j]);
                const dist = this.distance(pos1.x, pos1.y, pos2.x, pos2.y);

                if (dist < this.config.lineDistance) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', pos1.x);
                    line.setAttribute('y1', pos1.y);
                    line.setAttribute('x2', pos2.x);
                    line.setAttribute('y2', pos2.y);

                    const opacity = this.config.lineOpacity * (1 - dist / this.config.lineDistance);
                    const color = Math.random() > 0.5
                        ? `rgba(230, 203, 166, ${opacity})`
                        : `rgba(139, 92, 246, ${opacity})`;

                    line.setAttribute('stroke', color);
                    line.setAttribute('stroke-width', '0.5');
                    this.gridLinesElement.appendChild(line);

                    this.gridLines.push({
                        element: line,
                        i: i,
                        j: j,
                        baseOpacity: opacity,
                        baseColor: color
                    });

                    lineCount++;
                }
            }
        }

        const gridLineCountEl = document.getElementById('gridLineCount');
        if (gridLineCountEl) gridLineCountEl.textContent = lineCount;
    }

    updateGridLines() {
        for (let lineData of this.gridLines) {
            const star1 = this.stars[lineData.i];
            const star2 = this.stars[lineData.j];

            const pos1 = this.getElementCenter(star1);
            const pos2 = this.getElementCenter(star2);

            const offsetPos1X = pos1.x + star1.offsetX;
            const offsetPos1Y = pos1.y + star1.offsetY;
            const offsetPos2X = pos2.x + star2.offsetX;
            const offsetPos2Y = pos2.y + star2.offsetY;

            lineData.element.setAttribute('x1', offsetPos1X);
            lineData.element.setAttribute('y1', offsetPos1Y);
            lineData.element.setAttribute('x2', offsetPos2X);
            lineData.element.setAttribute('y2', offsetPos2Y);
        }
    }

    updateMagneticPull() {
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            const pos = this.getElementCenter(star);
            const distToCursor = this.distance(this.cursorX, this.cursorY, pos.x, pos.y);

            if (distToCursor < this.config.magneticPullDistance) {
                const pullStrength = (1 - distToCursor / this.config.magneticPullDistance) * this.config.magneticPullStrength;
                const angle = Math.atan2(this.cursorY - pos.y, this.cursorX - pos.x);

                star.targetOffsetX = Math.cos(angle) * pullStrength;
                star.targetOffsetY = Math.sin(angle) * pullStrength;
            } else {
                star.targetOffsetX = 0;
                star.targetOffsetY = 0;
            }

            star.offsetX += (star.targetOffsetX - star.offsetX) * 0.15;
            star.offsetY += (star.targetOffsetY - star.offsetY) * 0.15;

            star.element.style.transform = `translate(${star.offsetX}px, ${star.offsetY}px)`;
        }
    }

    updateCursorLines() {
        this.cursorLinesElement.innerHTML = '';
        let cursorLineCount = 0;

        for (let i = 0; i < this.stars.length; i++) {
            const pos = this.getElementCenter(this.stars[i]);
            const distToCursor = this.distance(this.cursorX, this.cursorY, pos.x, pos.y);

            if (distToCursor < this.config.cursorDistance) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

                const offsetPosX = pos.x + this.stars[i].offsetX;
                const offsetPosY = pos.y + this.stars[i].offsetY;

                line.setAttribute('x1', this.cursorX);
                line.setAttribute('y1', this.cursorY);
                line.setAttribute('x2', offsetPosX);
                line.setAttribute('y2', offsetPosY);

                const opacity = (1 - distToCursor / this.config.cursorDistance) * 0.5;
                line.setAttribute('stroke', `rgba(139, 92, 246, ${opacity})`);
                line.setAttribute('stroke-width', ((1 - distToCursor / this.config.cursorDistance) * 0.5 + 0.3).toString());

                this.cursorLinesElement.appendChild(line);
                cursorLineCount++;
            }
        }

        const cursorLineCountEl = document.getElementById('cursorLineCount');
        if (cursorLineCountEl) cursorLineCountEl.textContent = cursorLineCount;
    }

    animationLoop = () => {
        this.updateMagneticPull();
        this.updateGridLines();
        this.updateCursorLines();

        this.frameCount++;
        requestAnimationFrame(this.animationLoop);
    };

    handleMouseMove = (event) => {
        this.cursorX = event.clientX;
        this.cursorY = event.clientY;
    };

    startFpsCounter() {
        setInterval(() => {
            const now = Date.now();
            const elapsed = now - this.lastFpsTime;
            const fps = Math.round((this.frameCount * 1000) / elapsed);
            const fpsEl = document.getElementById('fps');
            if (fpsEl) fpsEl.textContent = fps;
            this.frameCount = 0;
            this.lastFpsTime = now;
        }, 1000);
    }

    startAnimationLoop() {
        this.animationLoop();
    }

    attachMouseListener() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    destroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// ═══════════════════════════════════════════════════════════════════
//  GLOBAL TOOLTIP — body-anchored, works inside overflow:hidden
//  Reads data-tooltip and optional data-tooltip-pos="top|bottom"
// ═══════════════════════════════════════════════════════════════════
(function initGlobalTooltip() {
  const tip = document.createElement('div');
  tip.id = 'global-tooltip';
  document.body.appendChild(tip);

  let hideTimer = null;
  let cursorX = 0, cursorY = 0;
  let activeEl = null;

  // Track cursor globally so position is always fresh
  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    // If following cursor mode, reposition on every move
    if (activeEl && activeEl.getAttribute('data-tooltip-follow') !== 'false') {
      positionAtCursor();
    }
  }, { passive: true });

  function positionAtCursor() {
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const offset = 14;
    let left = cursorX - tw / 2;
    let top  = cursorY - th - offset;

    // Flip below cursor if not enough space above
    if (top < 8) top = cursorY + offset;

    // Keep inside viewport horizontally
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
  }

  function show(el) {
    clearTimeout(hideTimer);
    const text = el.getAttribute('data-tooltip');
    if (!text) return;
    activeEl = el;
    tip.textContent = text;

    requestAnimationFrame(() => {
      positionAtCursor();
      tip.classList.add('visible');
    });
  }

  function hide() {
    activeEl = null;
    hideTimer = setTimeout(() => tip.classList.remove('visible'), 80);
  }

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-tooltip]');
    if (el) show(el);
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('[data-tooltip]')) hide();
  });
})();

// Auto-initialize neural grid on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if neural grid elements exist before initializing
    if (document.querySelector('.neural-grid-stars')) {
        new NeuralGridFinalPerfect({
            starCount: 100,
            lineDistance: 320,
            lineOpacity: 0.2,
            cursorDistance: 350,
            magneticPullDistance: 650,
            magneticPullStrength: 30
        });
    }
});
