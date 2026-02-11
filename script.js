/* =============================================
   GLASSMORPHISM PORTFOLIO - SCRIPT.JS
   Modern portfolio with smooth animations and interactions
   Author: Srivardhan
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // INITIALIZATION
    // =============================================
    
    // Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const typingText = document.getElementById('typing-text');
    const contactForm = document.getElementById('contact-form');
    
    // =============================================
    // TYPEWRITER EFFECT
    // =============================================
    
    const phrases = [
        'Full-Stack Developer',
        'Software Engineer',
        'AI/ML Engineer',
        'Problem Solver'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Transition handling
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Wait before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Wait before next phrase
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter
    if (typingText) {
        typeWriter();
    }
    
    // =============================================
    // NAVIGATION
    // =============================================
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // THEME TOGGLE
    // =============================================
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            
            // Update icon with rotation animation
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
                icon.style.transform = '';
            }, 200);
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
    
    // =============================================
    // BACK TO TOP BUTTON
    // =============================================
    
    function handleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stat counters
                if (entry.target.querySelector('.stat-number')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // =============================================
    // COUNTER ANIMATION
    // =============================================
    
    function animateCounters(container) {
        const counters = container.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // =============================================
    // PROJECT CARD EFFECTS
    // =============================================
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const overlay = this.querySelector('.project-overlay');
            const links = this.querySelectorAll('.project-link');
            
            links.forEach((link, index) => {
                link.style.transitionDelay = `${index * 0.1}s`;
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const links = this.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        });
    });
    
    // =============================================
    // SKILL TAG HOVER EFFECT
    // =============================================
    
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // =============================================
    // CONTACT FORM
    // =============================================
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%) translateY(100px)',
            padding: '1rem 2rem',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
    
    // =============================================
    // INPUT FOCUS EFFECTS
    // =============================================
    
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // =============================================
    // PARALLAX EFFECT FOR FLOATING SHAPES
    // =============================================
    
    let ticking = false;
    
    function handleParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                document.querySelectorAll('.floating-shape').forEach((shape, index) => {
                    const speed = (index + 1) * 0.05;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // =============================================
    // SCROLL EVENT HANDLER
    // =============================================
    
    function handleScroll() {
        handleNavScroll();
        updateActiveNavLink();
        handleBackToTop();
        handleParallax();
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Initial calls
    handleScroll();
    
    // =============================================
    // PRELOADER (Optional Enhancement)
    // =============================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        document.querySelectorAll('.animate-fade-up, .animate-fade-left').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    });
    
    // =============================================
    // GLASS CARD MOUSE TRACKING EFFECT
    // =============================================
    
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // =============================================
    // KEYBOARD NAVIGATION SUPPORT
    // =============================================
    
    document.addEventListener('keydown', function(e) {
        // Escape to close mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // =============================================
    // GITHUB STATS (Optional - fetches real data)
    // =============================================
    
    async function fetchGitHubStats() {
        try {
            const username = 'Srivardhan04';
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userData = await response.json();
            
            // You can use this data to display real-time GitHub stats
            console.log('GitHub Stats:', {
                repos: userData.public_repos,
                followers: userData.followers,
                following: userData.following
            });
        } catch (error) {
            console.log('GitHub API rate limited or unavailable');
        }
    }
    
    // Uncomment to enable GitHub stats fetching
    // fetchGitHubStats();
    
    // =============================================
    // CONSOLE WELCOME MESSAGE
    // =============================================
    
    console.log(`
    ╔═══════════════════════════════════════════════╗
    ║                                               ║
    ║   👋 Hello there, curious developer!          ║
    ║                                               ║
    ║   This portfolio was built with:              ║
    ║   • Glassmorphism UI Design                   ║
    ║   • Vanilla JavaScript                        ║
    ║   • CSS3 Animations                           ║
    ║   • Intersection Observer API                 ║
    ║                                               ║
    ║   Let's connect:                              ║
    ║   GitHub: github.com/Srivardhan04             ║
    ║                                               ║
    ╚═══════════════════════════════════════════════╝
    `);
});

// =============================================
// LAZY LOADING IMAGES
// =============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============================================
// SMOOTH REVEAL ON SCROLL
// =============================================

const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();
