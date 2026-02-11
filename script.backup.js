document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect for hero subtitle
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    const phrases = [
        'Full-Stack Developer',
        'AI/ML Engineer',
        'Aspiring Data Analyst',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle transitions
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing, wait then start deleting
            typingSpeed = 2000; // Wait 2 seconds
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Wait 0.5 seconds before starting next phrase
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start the typewriter effect
    typeWriter();

    // Blinking cursor effect
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);

    // Project card hover effects and animations
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 0 20px #6366f1';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
            });
        });
    }

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Intersection Observer for skill bar animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe languages section
    const languagesSection = document.querySelector('.languages');
    if (languagesSection) {
        observer.observe(languagesSection);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize project cards
    initProjectCards();

    // GitHub Integration
    async function fetchGitHubData() {
        try {
            const username = 'Srivardhan04';

            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
            const repos = await reposResponse.json();

            // Update stats
            document.getElementById('total-repos').textContent = userData.public_repos || '0';
            document.getElementById('total-stars').textContent = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
            document.getElementById('total-forks').textContent = repos.reduce((total, repo) => total + repo.forks_count, 0);
            document.getElementById('total-views').textContent = userData.followers || '0';

        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            document.getElementById('total-repos').textContent = '0';
            document.getElementById('total-stars').textContent = '0';
            document.getElementById('total-forks').textContent = '0';
            document.getElementById('total-views').textContent = '0';
        }
    }

    // Initialize GitHub data
    fetchGitHubData();

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to dark theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    const sections = document.querySelectorAll("section");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => sectionObserver.observe(sec));
});