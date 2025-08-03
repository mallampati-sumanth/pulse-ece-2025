// ======== FUTURISTIC INDEX.JS ========

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroCanvas();
    initAnimations();
    initParticles();
    initScrollEffects();
    initStudentCommunity();
    initLearningPaths();
    initContributionGraph();
    initSkillTree();
    initInteractiveElements();
    initPageTransitions();
});

// ======== NAVIGATION ========
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('#mobileMenuToggle');
    const navMenu = document.querySelector('#navMenu');
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Advanced navbar scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 15, 13, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 15, 13, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
        
        // Hide/show navbar on scroll (only on desktop)
        if (window.innerWidth > 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        // Update scroll progress
        updateScrollProgress();
        
        lastScrollY = currentScrollY;
    }, 16));
}

// ======== PAGE TRANSITIONS ========
function initPageTransitions() {
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInSection 1s ease-out forwards';
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.stat-card, .quick-card, .activity-category, .testimonial-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => observer.observe(section));
    
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// ======== HERO CANVAS ========
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            hue: 120 + Math.random() * 60 // Green spectrum
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ======== ANIMATIONS ========
function initAnimations() {
    // Enhanced counter animation for stats
    const stats = document.querySelectorAll('.interactive-stat');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatProgress(entry.target);
                animateCounter(entry.target.querySelector('.stat-number'));
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Enhanced fade in animation for sections
    const sections = document.querySelectorAll('.project-showcase, .learning-paths, .features, .cta');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.quick-card, .project-card, .learning-path, .feature-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
        
        // Hide child elements initially
        const children = section.querySelectorAll('.quick-card, .project-card, .learning-path, .feature-item');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
}

// ======== ENHANCED COUNTER ANIMATION ========
function animateCounter(element) {
    if (!element) return;
    
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, 16);
}

function animateStatProgress(statElement) {
    const progressFill = statElement.querySelector('.stat-fill');
    if (!progressFill) return;
    
    const targetProgress = Math.random() * 70 + 30; // Random progress between 30-100%
    progressFill.style.strokeDashoffset = 100 - targetProgress;
}

// ======== PARTICLE SYSTEM ========
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Create enhanced floating particles
    for (let i = 0; i < 30; i++) {
        createEnhancedParticle(particlesContainer);
    }
    
    // Create tech-themed floating elements
    createTechElements(particlesContainer);
}

function createEnhancedParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle enhanced';
    
    // Random properties
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 30 + 15;
    const delay = Math.random() * 10;
    const hue = 120 + Math.random() * 60; // Green spectrum
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: hsla(${hue}, 70%, 60%, 0.6);
        border-radius: 50%;
        animation: particleFloat ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px hsla(${hue}, 70%, 60%, 0.3);
    `;
    
    container.appendChild(particle);
}

function createTechElements(container) {
    const techSymbols = ['⚡', '🔬', '🔭', '⚙️', '📡', '🛰️', '🔋', '💾'];
    
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'tech-element';
        element.textContent = techSymbols[i];
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        element.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            font-size: ${Math.random() * 20 + 15}px;
            color: rgba(0, 255, 136, 0.3);
            animation: floatChip ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
        `;
        
        container.appendChild(element);
    }
}

// ======== SCROLL EFFECTS ========
function initScrollEffects() {
    // Enhanced parallax effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for other elements
        const parallaxElements = document.querySelectorAll('.holographic-card, .project-card');
        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const parallaxRate = (index % 2 === 0) ? 0.1 : -0.1;
                const yPos = scrolled * parallaxRate;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 16));
    
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

function updateScrollProgress() {
    const scrollProgress = document.querySelector('.progress-fill');
    if (!scrollProgress) return;
    
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / scrollHeight) * 126; // 126 is the circumference
    
    scrollProgress.style.strokeDashoffset = 126 - progress;
}

// ======== STUDENT COMMUNITY ========
function initStudentCommunity() {
    // Animate statistics counters
    animateStatCounters();
    
    // Add hover effects to activity items
    initActivityHoverEffects();
    
    // Initialize testimonial cards
    initTestimonialEffects();
    
    // Initialize community interactions
    initCommunityInteractions();
}

function animateStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target;
                const finalValue = parseInt(statValue.textContent);
                const duration = 2000; // 2 seconds
                const increment = finalValue / (duration / 16); // 60fps
                let currentValue = 0;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    statValue.textContent = Math.floor(currentValue);
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => observer.observe(stat));
}

function initActivityHoverEffects() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
            item.style.background = 'rgba(0, 255, 136, 0.15)';
            item.style.borderColor = 'var(--neon-green)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.background = 'rgba(0, 255, 136, 0.05)';
            item.style.borderColor = 'rgba(0, 255, 136, 0.2)';
        });
    });
}

function initTestimonialEffects() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.2)';
        });
    });
}

function initCommunityInteractions() {
    // Add click effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1)';
            }, 150);
        });
    });
    
    // Add pulse effect to activity status badges
    const statusBadges = document.querySelectorAll('.activity-status.active');
    statusBadges.forEach(badge => {
        setInterval(() => {
            badge.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                badge.style.animation = '';
            }, 1000);
        }, 3000);
    });
}

// ======== LEARNING PATHS ========
function initLearningPaths() {
    const learningPaths = document.querySelectorAll('.learning-path');
    
    learningPaths.forEach(path => {
        const progressFill = path.querySelector('.progress-fill');
        const progressValue = progressFill.dataset.progress || 0;
        
        // Animate progress on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressFill.style.width = progressValue + '%';
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(path);
        
        // Add click interaction
        path.addEventListener('click', () => {
            path.style.transform = 'scale(1.02)';
            path.style.borderColor = 'rgba(0, 255, 136, 0.8)';
            
            setTimeout(() => {
                path.style.transform = 'scale(1)';
                path.style.borderColor = 'rgba(26, 154, 125, 0.2)';
            }, 200);
        });
    });
}

// ======== CONTRIBUTION GRAPH ========
function initContributionGraph() {
    const contributionGrid = document.getElementById('contributionGrid');
    if (!contributionGrid) return;
    
    // Generate 365 days of contribution data
    for (let i = 0; i < 365; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // Random contribution level (0-4)
        const level = Math.floor(Math.random() * 5);
        day.dataset.level = level;
        
        // Add hover effect with date info
        const date = new Date();
        date.setDate(date.getDate() - (365 - i));
        
        day.addEventListener('mouseenter', (e) => {
            showContributionTooltip(e, date, level);
        });
        
        day.addEventListener('mouseleave', hideContributionTooltip);
        
        contributionGrid.appendChild(day);
    }
}

function showContributionTooltip(e, date, level) {
    const tooltip = document.createElement('div');
    tooltip.className = 'contribution-tooltip';
    tooltip.innerHTML = `
        <div>${date.toDateString()}</div>
        <div>${level} contributions</div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 15, 13, 0.95);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        border: 1px solid rgba(0, 255, 136, 0.3);
        z-index: 1000;
        pointer-events: none;
        left: ${e.pageX}px;
        top: ${e.pageY - 60}px;
    `;
    
    document.body.appendChild(tooltip);
}

function hideContributionTooltip() {
    const tooltip = document.querySelector('.contribution-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ======== SKILL TREE ========
function initSkillTree() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach(node => {
        node.addEventListener('click', () => {
            const skill = node.dataset.skill;
            showSkillModal(skill);
        });
        
        node.addEventListener('mouseenter', () => {
            node.style.filter = 'drop-shadow(0 0 15px currentColor)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.filter = node.classList.contains('completed') ? 
                'drop-shadow(0 0 10px var(--neon-green))' : '';
        });
    });
}

function showSkillModal(skill) {
    const modal = document.createElement('div');
    modal.className = 'skill-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${skill}</h3>
            <p>Detailed information about ${skill} would go here...</p>
            <button class="close-modal">Close</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: var(--bg-card);
        padding: 2rem;
        border-radius: 16px;
        border: 1px solid var(--border-primary);
        max-width: 500px;
        text-align: center;
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.remove();
        }
    });
}

// ======== INTERACTIVE ELEMENTS ========
function initInteractiveElements() {
    // Tech stack hover effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.dataset.tech;
            showTechInfo(item, tech);
        });
        
        item.addEventListener('mouseleave', hideTechInfo);
    });
    
    // Enhanced button particles
    const glowButtons = document.querySelectorAll('.btn-glow');
    glowButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            createButtonParticles(btn);
        });
    });
    
    // Interactive stats
    const interactiveStats = document.querySelectorAll('.interactive-stat');
    interactiveStats.forEach(stat => {
        stat.addEventListener('click', () => {
            animateStatClick(stat);
        });
    });
}

function showTechInfo(element, tech) {
    const info = {
        'IoT': 'Internet of Things - Connect devices and create smart solutions',
        'AI/ML': 'Artificial Intelligence & Machine Learning - Build intelligent systems',
        'Robotics': 'Design and program autonomous robots',
        '5G': 'Next-generation wireless communication technology',
        'Blockchain': 'Decentralized and secure digital transactions'
    };
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = info[tech] || tech;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 255, 136, 0.95);
        color: var(--bg-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        transform: translateY(-100%);
        margin-top: -10px;
    `;
    
    element.appendChild(tooltip);
}

function hideTechInfo() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function createButtonParticles(button) {
    const particlesContainer = button.querySelector('.btn-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(0, 255, 136, 0.8);
            border-radius: 50%;
            animation: particle-drift 1s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function animateStatClick(stat) {
    stat.style.transform = 'scale(1.2)';
    stat.style.filter = 'drop-shadow(0 0 20px var(--neon-green))';
    
    setTimeout(() => {
        stat.style.transform = 'scale(1)';
        stat.style.filter = 'none';
    }, 300);
}

// ======== UTILITY FUNCTIONS ========

// Enhanced throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ======== ADVANCED FEATURES ========

// Matrix-style digital rain effect
function createDigitalRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01010110100101101001011010010110100101101001';
    const drops = [];
    
    for (let i = 0; i < canvas.width / 20; i++) {
        drops[i] = 1;
    }
    
    function drawRain() {
        ctx.fillStyle = 'rgba(10, 15, 13, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawRain, 100);
}

// Initialize digital rain on special occasions
if (Math.random() > 0.7) {
    setTimeout(createDigitalRain, 2000);
}

// Performance monitoring
let frameCount = 0;
let fps = 0;
let lastTime = performance.now();

function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Optimize animations based on FPS
        if (fps < 30) {
            document.documentElement.style.setProperty('--animation-quality', 'reduced');
        }
    }
    
    requestAnimationFrame(measureFPS);
}

measureFPS();
