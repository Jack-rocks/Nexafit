/**
 * NexaFit - Theme Management Script
 * Dark theme only version
 */

// Initialize theme (dark mode only)
function initTheme() {
    // Always use dark theme
    document.body.classList.add('dark');
    document.body.style.backgroundColor = 'var(--color-dark-bg)';
    document.body.style.color = 'var(--color-dark-text)';
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Get theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    
    // If theme toggle exists, hide it since we're using dark mode only
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }
});