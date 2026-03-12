// Intersection Observer for Section Zoom Effect
// NOTE: tailwind.config is set inline in index.html AFTER the Tailwind CDN
// script loads, which is the correct and required order for it to work.

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply zoom class and observe all main sections and revealable images
document.querySelectorAll('section, header, footer, .reveal-img').forEach(el => {
    if (el.tagName.toLowerCase() === 'section' || el.tagName.toLowerCase() === 'header' || el.tagName.toLowerCase() === 'footer') {
        el.classList.add('section-zoom');
    }
    observer.observe(el);
});

// Tab Switching for How It Works Section
function switchTab(tabName) {
    // Get all tab buttons and content
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active class from all buttons and content
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab button and content
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById(`content-${tabName}`).classList.add('active');
}

// Parallax scroll effect for images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
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

    // Smoothly close all FAQs
    document.querySelectorAll('.faq-group').forEach(group => {
        group.classList.remove('active');
    });

    // Open the one clicked if it wasn't already open
    if (!isCurrentlyActive) {
        parent.classList.add('active');
    }
}

// ================================================================
// NEW FAQ — Editorial Split Section
// ================================================================

/**
 * Switch the active FAQ category panel (left nav → right content)
 */
function switchFAQCategory(cat) {
    // Update left nav buttons
    document.querySelectorAll('.faq-cat-btn').forEach(btn => {
        const isActive = btn.dataset.cat === cat;
        btn.classList.toggle('faq-cat-active', isActive);
        // bg overlay
        const bg = btn.querySelector('.faq-cat-bg');
        if (bg) bg.style.opacity = isActive ? '1' : '0';
        // icon wrapper
        const iconWrap = btn.querySelector('.faq-cat-icon-wrap');
        if (iconWrap) {
            iconWrap.style.background = isActive ? 'rgba(200,62,62,0.2)' : 'rgba(255,255,255,0.05)';
        }
        // icon color
        btn.querySelectorAll('.faq-cat-icon, .material-icons-outlined').forEach(ic => {
            ic.style.color = isActive ? '#C83E3E' : 'rgba(232,216,196,0.4)';
        });
        // label
        const label = btn.querySelector('.faq-cat-label');
        if (label) label.style.color = isActive ? '#FBF7F1' : 'rgba(232,216,196,0.4)';
        // count
        const count = btn.querySelector('.faq-cat-count');
        if (count) count.style.color = isActive ? 'rgba(200,62,62,0.6)' : 'rgba(232,216,196,0.2)';
    });

    // Swap right content panels
    document.querySelectorAll('.faq-content-panel').forEach(panel => {
        if (panel.id === `faq-content-${cat}`) {
            panel.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
            // Close all open items in hidden panels
            panel.querySelectorAll('.faq-item-new.faq-open').forEach(item => {
                item.classList.remove('faq-open');
            });
        }
    });
}

/**
 * Toggle a single FAQ item open/closed
 */
function toggleNewFAQ(itemEl) {
    const isOpen = itemEl.classList.contains('faq-open');

    // Close all others in the same panel
    const panel = itemEl.closest('.faq-content-panel');
    if (panel) {
        panel.querySelectorAll('.faq-item-new.faq-open').forEach(open => {
            open.classList.remove('faq-open');
        });
    }

    // Toggle this one
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

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
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
    const principalBar = document.getElementById('principal-bar');
    const interestBar = document.getElementById('interest-bar');

    if (emiResult) emiResult.textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    if (loanAmtVal) loanAmtVal.textContent = `₹${principal.toLocaleString('en-IN')}`;
    if (interestRateVal) interestRateVal.textContent = `${rate}%`;
    if (tenureVal) tenureVal.textContent = `${tenure} Yrs`;
    if (principalVal) principalVal.textContent = `₹${principal.toLocaleString('en-IN')}`;
    if (interestAmtVal) interestAmtVal.textContent = `₹${Math.round(interest).toLocaleString('en-IN')}`;

    if (principalBar && interestBar) {
        const total = principal + interest;
        const pRatio = (principal / total) * 100;
        const iRatio = (interest / total) * 100;
        principalBar.style.width = `${pRatio}%`;
        interestBar.style.width = `${iRatio}%`;
    }
}

// Initialize and bind calculator events
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['loan-amount', 'interest-rate', 'tenure'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateEMI);
        }
    });
    calculateEMI();

    // Initialize Testimonial Carousel
    initCarousel();
});

// ================================================================
// Testimonial Carousel Logic
// ================================================================
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
    
    // Normalize index
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    
    slides.forEach((slide, i) => {
        // Reset classes
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
    // Automatically switch slide every 5 seconds
    autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoSlide() {
    if(autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

