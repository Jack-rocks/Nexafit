/**
 * NexaFit - Data Management Script
 * Handles data storage, retrieval, and manipulation for the fitness app
 */

// Motivational Quotes Array
const motivationalQuotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "The hard days are what make you stronger.", author: "Aly Raisman" },
    { text: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
    { text: "You don't have to be extreme, just consistent.", author: "Simeon Panda" },
    { text: "The clock is ticking. Are you becoming the person you want to be?", author: "Greg Plitt" },
    { text: "The difference between try and triumph is a little umph.", author: "Marvin Phillips" },
    { text: "The successful warrior is the average person with laser-like focus.", author: "Bruce Lee" },
    { text: "You're only one workout away from a good mood.", author: "Unknown" }
];

// Initialize Quote Rotator
function initQuoteRotator() {
    // Set initial quote or get from localStorage
    const savedQuoteIndex = localStorage.getItem('currentQuoteIndex');
    const quoteIndex = savedQuoteIndex ? parseInt(savedQuoteIndex) : Math.floor(Math.random() * motivationalQuotes.length);
    
    updateQuoteDisplay(quoteIndex);
}

// Rotate to a new quote
function rotateQuote() {
    const currentIndex = parseInt(localStorage.getItem('currentQuoteIndex') || '0');
    let newIndex;
    
    // Ensure we get a different quote
    do {
        newIndex = Math.floor(Math.random() * motivationalQuotes.length);
    } while (newIndex === currentIndex && motivationalQuotes.length > 1);
    
    updateQuoteDisplay(newIndex);
    
    // Add sparkle effect
    addSuccessParticles(document.getElementById('quote-text'));
}

// Update the quote display
function updateQuoteDisplay(index) {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    if (quoteText && quoteAuthor) {
        quoteText.textContent = `"${motivationalQuotes[index].text}"`;
        quoteAuthor.textContent = `- ${motivationalQuotes[index].author}`;
        
        // Save current index to localStorage
        localStorage.setItem('currentQuoteIndex', index.toString());
    }
}

// Initialize Mood Selector
function initMoodSelector() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    // Load today's mood if already set
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const userMoods = JSON.parse(localStorage.getItem('userMoods') || '[]');
    const todayMood = userMoods.find(m => m.date === today);
    
    if (todayMood) {
        // Highlight the selected mood
        moodButtons.forEach(btn => {
            if (btn.dataset.mood === todayMood.mood) {
                btn.classList.add('active');
            }
        });
    }
    
    // Add click event listeners
    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Save mood to localStorage
            saveMood(this.dataset.mood);
            
            // Add sparkle effect
            addSuccessParticles(this);
        });
    });
}

// Save mood to localStorage
function saveMood(mood) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    let userMoods = JSON.parse(localStorage.getItem('userMoods') || '[]');
    
    // Check if today's mood already exists
    const existingIndex = userMoods.findIndex(m => m.date === today);
    
    if (existingIndex >= 0) {
        // Update existing mood
        userMoods[existingIndex].mood = mood;
    } else {
        // Add new mood
        userMoods.push({
            date: today,
            mood: mood
        });
    }
    
    // Keep only the last 30 days
    if (userMoods.length > 30) {
        userMoods = userMoods.slice(-30);
    }
    
    // Save to localStorage
    localStorage.setItem('userMoods', JSON.stringify(userMoods));
}

// Initialize Footstep Trail
function initFootstepTrail() {
    const footstepTrail = document.querySelector('.footstep-trail');
    if (!footstepTrail) return;
    
    // Create initial footsteps
    createFootstep(footstepTrail);
    
    // Create new footsteps periodically
    setInterval(() => {
        createFootstep(footstepTrail);
    }, 3000);
}

// Create a single footstep
function createFootstep(container) {
    const footstep = document.createElement('div');
    footstep.className = 'footstep';
    
    // Random position vertically
    const topPosition = Math.random() * container.offsetHeight;
    footstep.style.top = `${topPosition}px`;
    
    container.appendChild(footstep);
    
    // Remove footstep after animation completes
    setTimeout(() => {
        footstep.remove();
    }, 3000);
}

// Initialize Streak Flame
function initStreakFlame() {
    const streakCounter = document.querySelector('.streak-counter');
    const streakFlame = document.querySelector('.streak-flame');
    
    if (!streakCounter || !streakFlame) return;
    
    const streakCount = parseInt(streakCounter.textContent);
    
    // Adjust flame size based on streak count
    if (streakCount > 0) {
        // Base size
        let scale = 1.0;
        
        // Increase scale based on streak length
        if (streakCount > 7) scale = 1.2;
        if (streakCount > 14) scale = 1.4;
        if (streakCount > 21) scale = 1.6;
        if (streakCount > 30) scale = 1.8;
        
        streakFlame.style.transform = `scale(${scale})`;
        
        // Adjust color based on streak length
        let color1 = 'rgba(249, 115, 22, 0.4)';
        let color2 = 'rgba(249, 115, 22, 0.1)';
        
        if (streakCount > 14) {
            color1 = 'rgba(249, 115, 22, 0.6)';
            color2 = 'rgba(249, 115, 22, 0.2)';
        }
        
        if (streakCount > 30) {
            color1 = 'rgba(239, 68, 68, 0.6)';
            color2 = 'rgba(249, 115, 22, 0.2)';
        }
        
        streakFlame.style.background = `radial-gradient(ellipse at center, ${color1} 0%, ${color2} 70%, rgba(0, 0, 0, 0) 100%)`;
    }
}

// Add success particles effect
function addSuccessParticles(element) {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around the element
        const x = rect.left + Math.random() * rect.width;
        const y = rect.bottom;
        
        // Random color
        const colors = [
            'rgba(124, 58, 237, 0.8)',  // Purple
            'rgba(34, 211, 238, 0.8)',   // Cyan
            'rgba(249, 115, 22, 0.8)',   // Orange
            'rgba(16, 185, 129, 0.8)'    // Green
        ];
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = 4 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 1 + Math.random() * 1;
        particle.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

// Animate counter numbers
function animateCounter(element, targetValue, duration = 1500) {
    if (!element) return;
    
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const formatValue = (value) => {
        // Check if the element's text contains a unit (km, L, etc.)
        const text = element.textContent;
        const unit = text.replace(/[\d,\.]/g, '').trim();
        
        // Format with commas for thousands
        return value.toLocaleString() + (unit ? ' ' + unit : '');
    };
    
    const updateCounter = () => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            element.textContent = formatValue(targetValue);
            return;
        }
        
        element.textContent = formatValue(Math.floor(currentValue));
        requestAnimationFrame(updateCounter);
    };
    
    updateCounter();
}

// Initialize animated counters
function initAnimatedCounters() {
    // Get all counter elements
    const counters = {
        steps: document.getElementById('steps-count'),
        calories: document.getElementById('calories-count'),
        distance: document.getElementById('distance-count'),
        water: document.getElementById('water-count')
    };
    
    // Animate each counter if it exists
    if (counters.steps) {
        const stepsValue = parseInt(counters.steps.textContent.replace(/,/g, ''));
        animateCounter(counters.steps, stepsValue);
    }
    
    if (counters.calories) {
        const caloriesValue = parseInt(counters.calories.textContent.replace(/,/g, ''));
        animateCounter(counters.calories, caloriesValue);
    }
    
    if (counters.distance) {
        const distanceText = counters.distance.textContent;
        const distanceValue = parseFloat(distanceText.replace(/[^\d\.]/g, ''));
        
        // Special handling for distance with unit
        const startValue = 0;
        const increment = distanceValue / (1500 / 16);
        let currentValue = startValue;
        
        const updateCounter = () => {
            currentValue += increment;
            
            if (currentValue >= distanceValue) {
                counters.distance.textContent = distanceText;
                return;
            }
            
            counters.distance.textContent = currentValue.toFixed(1) + ' km';
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }
    
    if (counters.water) {
        const waterText = counters.water.textContent;
        const waterValue = parseFloat(waterText.replace(/[^\d\.]/g, ''));
        
        // Special handling for water with unit
        const startValue = 0;
        const increment = waterValue / (1500 / 16);
        let currentValue = startValue;
        
        const updateCounter = () => {
            currentValue += increment;
            
            if (currentValue >= waterValue) {
                counters.water.textContent = waterText;
                return;
            }
            
            counters.water.textContent = currentValue.toFixed(1) + ' L';
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }
}

// Initialize all data-related features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated counters if on dashboard page
    if (document.getElementById('steps-count')) {
        initAnimatedCounters();
    }
});