// Preserve Scroll Position Correctly on Reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

let storedScrollY = sessionStorage.getItem('scrollPosition') || 0;
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Intersection Observer for Reveal Effects
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Initialize Lenis Smooth Scroll
if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
        lerp: 0.1, // Smoothness intensity
        duration: 1.5, // Even smoother/stickier transition
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1, // Subtle boost to responsiveness
        smoothTouch: false,
        infinite: false,
    });

    function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
} else {
    console.warn("Lenis smooth scroll library not found.");
    // Fallback or dummy object to prevent errors in later on() calls
    window.lenis = { on: () => {} };
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, we can stop observing
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Reveal everything with the reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll, .section-zoom, .reveal-img').forEach(el => {
        revealObserver.observe(el);
    });

    // Auto-add reveal class to headers and paragraphs in sections if not present
    document.querySelectorAll('section h2, section p, .property-card').forEach((el, index) => {
        if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
            // Give cards a small natural delay based on index if they are in a grid
            if (el.classList.contains('property-card')) {
                const delay = (index % 3) * 100;
                el.style.transitionDelay = `${delay}ms`;
            }
            revealObserver.observe(el);
        }
    });
});

// Tab Switching for How It Works Section
function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById(`content-${tabName}`).classList.add('active');
}

// Parallax scroll effect for images
window.lenis.on('scroll', (e) => {
    const scrolled = e.scroll;
    const parallaxImages = document.querySelectorAll('.parallax-image');

    parallaxImages.forEach((img, index) => {
        const speed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        img.style.transform = `translateY(${yPos}px)`;
    });
});

// FAQ Accordion Logic
function toggleFaq(element) {
    const parent = element.closest('.faq-group');
    const isCurrentlyActive = parent.classList.contains('active');

    document.querySelectorAll('.faq-group').forEach(group => {
        group.classList.remove('active');
    });

    if (!isCurrentlyActive) {
        parent.classList.add('active');
    }
}

// ================================================================
// NEW FAQ — Editorial Split Section
// ================================================================

function switchFAQCategory(cat) {
    document.querySelectorAll('.faq-cat-btn').forEach(btn => {
        const isActive = btn.dataset.cat === cat;
        btn.classList.toggle('faq-cat-active', isActive);
        
        const bg = btn.querySelector('.faq-cat-bg');
        if (bg) bg.style.opacity = isActive ? '1' : '0';
        
        const iconWrap = btn.querySelector('.faq-cat-icon-wrap');
        if (iconWrap) {
            iconWrap.style.background = isActive ? 'rgba(200,62,62,0.2)' : 'rgba(255,255,255,0.05)';
        }
        
        btn.querySelectorAll('.faq-cat-icon, .material-icons-outlined').forEach(ic => {
            ic.style.color = isActive ? '#C83E3E' : 'rgba(232,216,196,0.4)';
        });
        
        const label = btn.querySelector('.faq-cat-label');
        if (label) label.style.color = isActive ? '#FBF7F1' : 'rgba(232,216,196,0.4)';
        
        const count = btn.querySelector('.faq-cat-count');
        if (count) count.style.color = isActive ? 'rgba(200,62,62,0.6)' : 'rgba(232,216,196,0.2)';
    });

    document.querySelectorAll('.faq-content-panel').forEach(panel => {
        if (panel.id === `faq-content-${cat}`) {
            panel.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
            panel.querySelectorAll('.faq-item-new.faq-open').forEach(item => {
                item.classList.remove('faq-open');
            });
        }
    });
}

function toggleNewFAQ(itemEl) {
    const isOpen = itemEl.classList.contains('faq-open');

    const panel = itemEl.closest('.faq-content-panel');
    if (panel) {
        panel.querySelectorAll('.faq-item-new.faq-open').forEach(open => {
            open.classList.remove('faq-open');
        });
    }

    if (!isOpen) {
        itemEl.classList.add('faq-open');
    }
}

// EMI Calculator Logic
function calculateEMI() {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const tenureInput = document.getElementById('tenure');

    if (!loanAmountInput || !interestRateInput || !tenureInput) return;

    const P = parseFloat(loanAmountInput.value);
    const R = parseFloat(interestRateInput.value) / 12 / 100;
    const N = parseFloat(tenureInput.value) * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    updateCalculatorUI(P, emi, totalInterest, parseFloat(interestRateInput.value), parseFloat(tenureInput.value));
}

function updateCalculatorUI(principal, emi, interest, rate, tenure) {
    const emiResult = document.getElementById('emi-result');
    const loanAmtVal = document.getElementById('loan-amount-val');
    const interestRateVal = document.getElementById('interest-rate-val');
    const tenureVal = document.getElementById('tenure-val');
    const principalVal = document.getElementById('principal-val');
    const interestAmtVal = document.getElementById('interest-amt-val');
    const cashbackVal = document.getElementById('cashback-val');
    const principalBar = document.getElementById('principal-bar');
    const interestBar = document.getElementById('interest-bar');

    if (emiResult) emiResult.textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    if (loanAmtVal) loanAmtVal.textContent = `₹${principal.toLocaleString('en-IN')}`;
    if (interestRateVal) interestRateVal.textContent = `${rate}%`;
    if (tenureVal) tenureVal.textContent = `${tenure} Yrs`;
    if (principalVal) principalVal.textContent = `₹${principal.toLocaleString('en-IN')}`;
    if (interestAmtVal) interestAmtVal.textContent = `₹${Math.round(interest).toLocaleString('en-IN')}`;
    if (cashbackVal) cashbackVal.textContent = `₹${Math.round(principal * 0.005).toLocaleString('en-IN')}`;

    if (principalBar && interestBar) {
        const total = principal + interest;
        const pRatio = (principal / total) * 100;
        const iRatio = (interest / total) * 100;
        principalBar.style.width = `${pRatio}%`;
        interestBar.style.width = `${iRatio}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['loan-amount', 'interest-rate', 'tenure'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateEMI);
        }
    });

    // Trigger initial calculation once everything is ready
    if (document.getElementById('loan-amount')) {
        calculateEMI();
    }

    initCarousel();
});

// Testimonial Carousel Logic
let currentSlide = 0;
let autoSlideInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if(slides.length === 0) return;
    updateCarousel(currentSlide);
    startAutoSlide();
}

function updateCarousel(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('center', 'left', 'right', 'hidden');
        
        if (i === currentSlide) {
            slide.classList.add('center');
        } else if (i === (currentSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('left');
        } else if (i === (currentSlide + 1) % totalSlides) {
            slide.classList.add('right');
        } else {
            slide.classList.add('hidden');
        }
    });
}

function nextTestimonial() {
    updateCarousel(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
}

function previousTestimonial() {
    updateCarousel(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoSlide() {
    if(autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// ================================================================
// Scroll-Driven Hero Animation Logic
// ================================================================
function initHeroScrollAnimation() {
    const container = document.getElementById('hero-scroll-container');
    const revealLayer = document.getElementById('hero-reveal-layer');
    const animatedPath = document.getElementById('hero-animated-path');
    const animatedPathBg = document.getElementById('hero-animated-path-bg');
    
    const text1 = document.getElementById('hero-text-1');
    const text2 = document.getElementById('hero-text-2');
    const text3 = document.getElementById('hero-text-3');
    const hub = document.getElementById('hero-sticky-hub');

    if (!container || !revealLayer || !animatedPath) return;

    let pathLength = 0;

    setTimeout(() => {
        // Only run if SVG is fully loaded
        pathLength = animatedPath.getTotalLength();
        if(pathLength > 0) {
            animatedPath.style.strokeDasharray = pathLength;
            animatedPath.style.strokeDashoffset = pathLength;
        }
        
        if (animatedPathBg) {
            const pathLengthBg = animatedPathBg.getTotalLength();
            animatedPathBg.style.strokeDasharray = pathLengthBg;
            animatedPathBg.style.strokeDashoffset = pathLengthBg;
            animatedPathBg.dataset.length = pathLengthBg;
        }
    }, 100);

    const handleScroll = () => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = 0;
        if (!document.body.classList.contains('is-loading') && !document.body.classList.contains('loading-lock')) {
            const scrollableDistance = Math.max(1, rect.height - windowHeight);
            progress = -rect.top / scrollableDistance;
        }

        progress = Math.max(0, Math.min(1, progress));

        // Phase 1: Circular Expansion Reveal
        const circleProgress = Math.min(1, progress / 0.25);
        const circleRadius = circleProgress * 150;
        
        revealLayer.style.clipPath = `circle(${circleRadius}vmax at 50% 100%)`;

        const prompt = document.getElementById('hero-scroll-prompt');
        if (prompt) prompt.style.opacity = Math.max(0, 1 - (progress * 5));

        // Phase 2: SVG Line Drawing & Text Animation (start early at 0.1)
        const lineProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
        
        if (pathLength > 0) {
            const dashOffset = pathLength - (pathLength * lineProgress);
            animatedPath.style.strokeDashoffset = dashOffset;
        }

        if (animatedPathBg && animatedPathBg.dataset.length) {
            const pathLenBg = parseFloat(animatedPathBg.dataset.length);
            // Background line follows slightly slower for depth
            const dashOffsetBg = pathLenBg - (pathLenBg * lineProgress * 0.9); 
            animatedPathBg.style.strokeDashoffset = dashOffsetBg;
        }

        const t1Prog = Math.max(0, Math.min(1, (lineProgress - 0.05) * 5));
        const t2Prog = Math.max(0, Math.min(1, (lineProgress - 0.35) * 5));
        const t3Prog = Math.max(0, Math.min(1, (lineProgress - 0.65) * 5));

        if (text1) {
            text1.style.opacity = t1Prog;
            text1.style.transform = `translateY(${(1 - t1Prog) * 40}px)`;
        }
        if (text2) {
            text2.style.opacity = t2Prog;
            text2.style.transform = `translateY(${(1 - t2Prog) * 40}px)`;
        }
        if (text3) {
            text3.style.opacity = t3Prog;
            text3.style.transform = `translate(-50%, ${(1 - t3Prog) * 40}px)`;
        }
        
        // Phase 3: Hub "Cardification"
        // We animate inset (left, right, top) on the sticky hub itself.
        // This creates the card-floating-in-from-edges effect without layout thrashing.
        // The hub is sticky so 'top' is its sticky threshold — we increase it to inset from top.
        if (hub) {
            // Start the cardification earlier (last 18% of scroll) for a more gradual feel
            const rawProg = Math.max(0, (progress - 0.82) / 0.18);
            // Ease-in-out cubic for organic feel
            const hubProgress = rawProg < 0.5
                ? 4 * rawProg * rawProg * rawProg
                : 1 - Math.pow(-2 * rawProg + 2, 3) / 2;

            // Max inset: 12px horizontal (minimal left-right pull), 8px vertical
            const hInset = hubProgress * 12; // halved again as requested
            const vInset = hubProgress * 8;  // px from top — subtle

            // Inset the hub from left and right edges:
            hub.style.position = 'sticky';
            hub.style.top = `${vInset}px`;
            hub.style.left = `${hInset}px`;
            hub.style.right = `${hInset}px`;
            hub.style.width = `calc(100% - ${hInset * 2}px)`;
            hub.style.height = `calc(100vh - ${vInset * 2}px)`;

            // Rounded corners — 0 to 2rem (matches reference)
            const cornerRem = hubProgress * 2;
            hub.style.borderRadius = `${cornerRem}rem`;

            // No shadow — card blends with trust section background
            hub.style.boxShadow = 'none';

            // Reset transform (in case old code left something)
            hub.style.transform = '';
        }
        
        const stickyCta = document.getElementById('hero-sticky-cta');
        if (stickyCta) {
            stickyCta.style.opacity = progress > 0.15 ? '1' : '0';
            stickyCta.style.pointerEvents = progress > 0.15 ? 'auto' : 'none';
        }
    };

    window.lenis.on('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    handleScroll();
}

document.addEventListener('DOMContentLoaded', initHeroScrollAnimation);

// ================================================================
// DYNAMIC NAVBAR — Scroll-adaptive transparency & color detection
// ================================================================
(function initDynamicNavbar() {
    const navbar = document.getElementById('site-header');
    if (!navbar) return;

    // Helper: parse rgb/rgba string → {r, g, b, a}
    function parseRGB(str) {
        if (!str) return null;
        const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (!m) return null;
        return {
            r: +m[1], g: +m[2], b: +m[3],
            a: m[4] !== undefined ? +m[4] : 1
        };
    }

    // Helper: relative luminance (WCAG formula)
    function luminance(r, g, b) {
        const sRGB = [r, g, b].map(c => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    }

    // Walk up DOM to get the effective background color
    function getEffectiveBg(el) {
        while (el && el !== document.documentElement) {
            const bg = window.getComputedStyle(el).backgroundColor;
            const parsed = parseRGB(bg);
            // Skip transparent elements
            if (parsed && parsed.a > 0.05 && !(parsed.r === 0 && parsed.g === 0 && parsed.b === 0 && parsed.a < 0.1)) {
                return parsed;
            }
            el = el.parentElement;
        }
        // Default: treat as light
        return { r: 255, g: 255, b: 255, a: 1 };
    }

    let lastMode = '';
    let rafPending = false;

    function updateNavbar() {
        rafPending = false;
        const scrollY = window.scrollY;
        const navH = navbar.offsetHeight || 80;

        // Sample a point just below the navbar (center of page)
        const sampleX = window.innerWidth / 2;
        const sampleY = navH + 20;

        // Temporarily hide navbar to hit-test the element below it
        navbar.style.pointerEvents = 'none';
        const el = document.elementFromPoint(sampleX, sampleY);
        navbar.style.pointerEvents = '';

        const bg = el ? getEffectiveBg(el) : { r: 255, g: 255, b: 255, a: 1 };
        const lum = luminance(bg.r, bg.g, bg.b);
        const theme = lum > 0.35 ? 'light' : 'dark';

        let mode;
        if (scrollY < 30) {
            // Very top — always transparent to blend with hero
            mode = 'transparent';
        } else {
            mode = theme;
        }

        if (mode !== lastMode) {
            navbar.setAttribute('data-navbar-mode', mode);
            lastMode = mode;
        }
        
        // Also set theme so transparent state knows if background is light or dark
        navbar.setAttribute('data-navbar-theme', theme);
    }

    function scheduleUpdate() {
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(updateNavbar);
        }
    }

    window.lenis.on('scroll', scheduleUpdate);
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    // Initial run after a short delay to let page paint
    setTimeout(updateNavbar, 120);
})();

// ================================================================
// GLOBAL KINETIC LOADING SCREEN
// ================================================================
(function initGlobalLoader() {
    // Aesthetic loading time (1.3s)
    const MIN_LOADING_TIME = 1300; 
    let isPageLoaded = false;
    let minTimeElapsed = false;

    window.addEventListener('load', () => {
        isPageLoaded = true;
        checkAndRemoveLoader();
    });

    setTimeout(() => {
        minTimeElapsed = true;
        checkAndRemoveLoader();
    }, MIN_LOADING_TIME);

    function checkAndRemoveLoader() {
        if (!isPageLoaded || !minTimeElapsed) return;

        const loaderView = document.getElementById("vanilla-loader");
        if (loaderView) {
            // Circle shrink effect
            loaderView.style.clipPath = "circle(0% at 50% 50%)";
            loaderView.style.pointerEvents = "none";
            
            // Sync: Hide scrollbar during the transition animation (1.2s)
            document.body.classList.remove("is-loading");
            document.body.classList.add("loader-done", "loading-lock");

            window.dispatchEvent(new Event('resize'));
            
            // Hero video handling (if present)
            const heroVideo = document.getElementById("hero-video");
            if (heroVideo) {
                heroVideo.play().catch(e => console.log("Hero video autoplay delayed", e));
            }

            // Clear stored scroll position to prevent cross-page scroll bleeding
            // (e.g., when navigating from one page to another via link)
            sessionStorage.removeItem('scrollPosition');

            // Clean up DOM after animation is finished
            setTimeout(() => {
                loaderView.remove();
                document.body.classList.remove("loading-lock");
                window.dispatchEvent(new Event('resize'));
            }, 1200);
        }
    }
})();
