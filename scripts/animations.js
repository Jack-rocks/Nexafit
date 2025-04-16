/**
 * NexaFit - Animations Script
 * Handles scroll reveals, hover effects, and other animations
 */

// Initialize scroll reveal animations using Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.animate-fade-in');
    
    if (!revealElements.length) return;
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger content reveal for dashboard and profile elements
                if (entry.target.classList.contains('content-reveal-trigger')) {
                    setTimeout(() => {
                        const contentElements = entry.target.querySelectorAll('.content-hidden');
                        contentElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.remove('content-hidden');
                                el.classList.add('content-visible');
                            }, 100 * index);
                        });
                    }, 300);
                }
                
                // Don't unobserve the element to ensure content stays visible
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Add delay if specified
        if (element.classList.contains('animation-delay-200')) {
            element.style.transitionDelay = '0.2s';
        } else if (element.classList.contains('animation-delay-400')) {
            element.style.transitionDelay = '0.4s';
        } else if (element.classList.contains('animation-delay-600')) {
            element.style.transitionDelay = '0.6s';
        } else if (element.classList.contains('animation-delay-800')) {
            element.style.transitionDelay = '0.8s';
        } else if (element.classList.contains('animation-delay-1000')) {
            element.style.transitionDelay = '1s';
        }
        
        // Observe the element
        revealObserver.observe(element);
    });
}
    
    revealElements.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Add delay if specified
        if (element.classList.contains('animation-delay-200')) {
            element.style.transitionDelay = '0.2s';
        } else if (element.classList.contains('animation-delay-400')) {
            element.style.transitionDelay = '0.4s';
        } else if (element.classList.contains('animation-delay-600')) {
            element.style.transitionDelay = '0.6s';
        } else if (element.classList.contains('animation-delay-800')) {
            element.style.transitionDelay = '0.8s';
        } else if (element.classList.contains('animation-delay-1000')) {
            element.style.transitionDelay = '1s';
        }
        
        revealObserver.observe(element);
    });


// Initialize hover animations for feature cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.classList.add('shadow-glow');
            
            // Intensify aura if present
            const aura = card.querySelector('.stat-aura');
            if (aura) {
                aura.style.filter = 'blur(15px)';
                aura.style.opacity = '0.8';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove glow effect
            card.classList.remove('shadow-glow');
            
            // Reset aura if present
            const aura = card.querySelector('.stat-aura');
            if (aura) {
                aura.style.filter = 'blur(10px)';
                aura.style.opacity = '0.6';
            }
        });
    });
}

// Initialize button hover animations
function initButtonEffects() {
    const buttons = document.querySelectorAll('button:not(.mood-btn)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Initialize section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    if (!sections.length) return;
    
    const transitionOptions = {
        threshold: 0.1
    };
    
    const transitionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                transitionObserver.unobserve(entry.target);
            }
        });
    }, transitionOptions);
    
    sections.forEach((section, index) => {
        // Skip first section
        if (index === 0) return;
        
        // Set initial styles
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        // Add class for custom styling
        section.classList.add('section-transition');
        
        transitionObserver.observe(section);
    });
}

// Add custom cursor effect for interactive elements
function initCustomCursor() {
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .stat-card, input, .mood-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.classList.add('interactive-cursor');
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('interactive-cursor');
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize button hover effects
    initButtonEffects();
    
    // Initialize section transitions
    initSectionTransitions();
    
    // Initialize custom cursor
    initCustomCursor();
});