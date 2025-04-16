/**
 * NexaFit - Main JavaScript File
 * Handles common functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Mobile menu toggle functionality
    initMobileMenu();
    
    // Initialize friends stats if on dashboard
    if (document.getElementById('friends-stats-section')) {
        ensureFriendsStatsVisible();
    }
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClosedIcon = document.getElementById('menu-closed-icon');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle menu icons
            menuClosedIcon.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
        });
    }
}

/**
 * Ensure friends stats section is visible
 */
function ensureFriendsStatsVisible() {
    const friendsStatsSection = document.getElementById('friends-stats-section');
    const friendsContainer = document.getElementById('friends-container');
    
    if (friendsStatsSection && friendsContainer) {
        // Make sure the section is visible
        friendsStatsSection.style.display = 'block';
        
        // Add a small delay to ensure friends-stats.js has time to initialize
        setTimeout(() => {
            // If container is empty, force re-render
            if (friendsContainer.children.length === 0 && typeof renderFriendCards === 'function') {
                renderFriendCards(document.getElementById('active-friends-toggle')?.checked || false);
            }
        }, 500);
    }
}