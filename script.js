// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(249, 248, 243, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(249, 248, 243, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// WhatsApp Integration
// Replace this with the actual phone number when available (Format: Country Code + Number, e.g., 919876543210)
const WHATSAPP_NUMBER = "+919999347609";

function contactWhatsApp(planName, price) {
    let message = "";

    if (price > 0) {
        message = `Hello Rod Fitness! I am interested in joining the ${planName} membership plan (₹${price}). Could you provide more details?`;
    } else {
        message = `Hello Rod Fitness! I would like to get more information about your gym and training programs.`;
    }

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
}

// Scroll Animation Observer (Fade In Elements)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Carousel Auto-Slide Logic
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // Change image every 5 seconds
}

// Dynamic Headline Quotes
function initDynamicQuotes() {
    const quotes = [
        "UNLEASH YOUR<br><span>POTENTIAL</span>",
        "NO PAIN<br><span>NO GAIN</span>",
        "TRAIN INSANE<br><span>OR REMAIN THE SAME</span>",
        "SWEAT IS JUST<br><span>FAT CRYING</span>",
        "PUSH YOUR<br><span>LIMITS</span>"
    ];

    const headline = document.getElementById('dynamic-headline');
    if (!headline) return;

    let currentQuote = 0;
    setInterval(() => {
        headline.style.opacity = '0';
        setTimeout(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            headline.innerHTML = quotes[currentQuote];
            headline.style.opacity = '1';
        }, 500); // 500ms fade out before changing text
    }, 2000); // Change every 2 seconds
}

// Apply initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initDynamicQuotes();

    const animateElements = document.querySelectorAll('.trainer-card, .plan-card, .section-header, .social-links-box, .map-box, .gallery-item, .about-container, .why-container, .value-item, .program-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Gallery Drag to Scroll (Swipe Card Feature)
const slider = document.querySelector('.gallery-grid');
if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.scrollSnapType = 'none'; // Disable snap while dragging
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
}
