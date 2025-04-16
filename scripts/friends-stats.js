/**
 * NexaFit - Friends Stats Script
 * Handles the display and interaction of the Friends Stats section
 */

// Sample friends data
const friends = [
  {
    name: "Aarav",
    avatar: "https://i.pravatar.cc/150?img=1",
    steps: 7632,
    streak: 5,
    goal: 84
  },
  {
    name: "Sophia",
    avatar: "https://i.pravatar.cc/150?img=2",
    steps: 10532,
    streak: 9,
    goal: 97
  },
  {
    name: "Liam",
    avatar: "https://i.pravatar.cc/150?img=3",
    steps: 2931,
    streak: 1,
    goal: 42
  },
  {
    name: "Emma",
    avatar: "https://i.pravatar.cc/150?img=4",
    steps: 8745,
    streak: 7,
    goal: 89
  }
];

// Initialize Friends Stats section
function initFriendsStats() {
  const friendsStatsSection = document.getElementById('friends-stats-section');
  if (!friendsStatsSection) {
    // Silently exit if the section doesn't exist on this page
    return;
  }
  
  // Make sure the friends stats section is visible
  friendsStatsSection.style.display = 'block';
  console.log('Friends Stats Section initialized');

  // Get stored cheers from localStorage
  const cheeredFriends = JSON.parse(localStorage.getItem('cheeredFriends') || '[]');
  
  // Get filter state from localStorage
  const showActiveOnly = localStorage.getItem('showActiveOnly') === 'true';
  const filterToggle = document.getElementById('active-friends-toggle');
  if (filterToggle) {
    filterToggle.checked = showActiveOnly;
    // Make toggle more visible with custom styling
    const toggleParent = filterToggle.closest('.relative');
    if (toggleParent) {
      // Enhance the toggle appearance
      const toggleElement = toggleParent.querySelector('div.w-11');
      if (toggleElement) {
        toggleElement.classList.remove('bg-gray-700');
        toggleElement.classList.add('bg-gradient-to-r', 'from-gray-600', 'to-gray-800');
        toggleElement.classList.add('shadow-lg', 'border', 'border-gray-600');
        
        // Make the active state more colorful
        toggleElement.classList.remove('peer-checked:bg-purple-600');
        toggleElement.classList.add('peer-checked:bg-gradient-to-r', 'peer-checked:from-purple-500', 'peer-checked:to-cyan-500');
        
        // Add a subtle animation
        toggleElement.classList.add('transition-all', 'duration-300');
        toggleElement.classList.add('hover:shadow-purple-500/30');
      }
    }
    
    filterToggle.addEventListener('change', function() {
      localStorage.setItem('showActiveOnly', this.checked);
      renderFriendCards(this.checked);
    });
  }

  // Render friend cards
  renderFriendCards(showActiveOnly);

  // Function to render friend cards
  function renderFriendCards(activeOnly) {
    const friendsContainer = document.getElementById('friends-container');
    if (!friendsContainer) return;
    
    // Clear existing cards
    friendsContainer.innerHTML = '';
    
    // Filter friends if needed
    const filteredFriends = activeOnly ? friends.filter(friend => friend.streak >= 3) : friends;
    
    // Create and append friend cards
    filteredFriends.forEach((friend, index) => {
      const card = createFriendCard(friend, index, cheeredFriends.includes(friend.name));
      friendsContainer.appendChild(card);
    });
    
    // Initialize animations after cards are added
    initCardAnimations();
  }

  // Function to create a friend card
  function createFriendCard(friend, index, isCheered) {
    const card = document.createElement('div');
    card.className = 'friend-card p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1';
    card.setAttribute('data-friend', friend.name);
    
    // Determine glow color based on goal completion
    let glowColor = 'red';
    if (friend.goal >= 80) {
      glowColor = 'green';
    } else if (friend.goal >= 50) {
      glowColor = 'orange';
    }
    
    // Add animation delay for staggered reveal
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="friend-aura absolute -top-10 -right-10 w-40 h-40 bg-${glowColor}-500/20 rounded-full filter blur-xl"></div>
      <div class="relative z-10">
        <div class="flex items-center mb-4">
          <div class="relative mr-4">
            <img src="${friend.avatar}" alt="${friend.name}" class="w-12 h-12 rounded-full border-2 border-gray-700">
            ${friend.streak >= 3 ? `<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-75"></div>` : ''}
          </div>
          <div>
            <h3 class="font-outfit font-semibold text-lg">${friend.name}</h3>
            <p class="text-gray-400 text-xs">Last updated: ${Math.floor(Math.random() * 5) + 1} hours ago</p>
          </div>
        </div>
        
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-gray-400 text-sm">Steps Today</p>
            <p class="font-outfit font-bold text-2xl steps-counter" data-target="${friend.steps}">0</p>
          </div>
          <div class="flex items-center">
            <span class="text-orange-400 mr-1">🔥</span>
            <span class="font-medium">${friend.streak}-Day Streak</span>
          </div>
        </div>
        
        <div class="relative mb-4 pt-2">
          <div class="radial-progress" data-progress="${friend.goal}"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span class="text-xs text-gray-300">Goal</span>
            <p class="font-outfit font-bold text-lg">${friend.goal}%</p>
          </div>
        </div>
        
        <button class="cheer-btn w-full py-2 px-4 rounded-lg ${isCheered ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-700 hover:bg-gray-600'} transition-all duration-300 flex items-center justify-center">
          <span class="mr-2">${isCheered ? 'Cheered!' : 'Cheer On'}</span>
          <span class="text-lg">${isCheered ? '🎉' : '👏'}</span>
        </button>
      </div>
    `;
    
    // Add event listener for cheer button
    const cheerBtn = card.querySelector('.cheer-btn');
    cheerBtn.addEventListener('click', function() {
      if (!isCheered) {
        // Update button state
        this.classList.remove('bg-gray-700', 'hover:bg-gray-600');
        this.classList.add('bg-purple-500/20', 'text-purple-300');
        this.innerHTML = `<span class="mr-2">Cheered!</span><span class="text-lg">👏</span>`;
        
        // Store in localStorage
        const cheeredFriends = JSON.parse(localStorage.getItem('cheeredFriends') || '[]');
        cheeredFriends.push(friend.name);
        localStorage.setItem('cheeredFriends', JSON.stringify(cheeredFriends));
        
        // Mark as cheered
        isCheered = true;
      }
    });
    
    return card;
  }

  // Function to initialize card animations
  function initCardAnimations() {
    // Animate step counters
    const stepCounters = document.querySelectorAll('.steps-counter');
    stepCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const duration = 2000; // 2 seconds
      const interval = 50; // Update every 50ms
      const increment = Math.ceil(target / (duration / interval));
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = count.toLocaleString();
        }
      }, interval);
    });
    
    // Create and animate radial progress rings
    const radialProgressElements = document.querySelectorAll('.radial-progress');
    radialProgressElements.forEach(element => {
      const progress = parseInt(element.getAttribute('data-progress'));
      createRadialProgress(element, progress);
    });
  }

  // Function to create radial progress ring
  function createRadialProgress(element, progress) {
    const size = 80;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.classList.add('mx-auto');
    
    // Background circle
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('cx', size / 2);
    bgCircle.setAttribute('cy', size / 2);
    bgCircle.setAttribute('r', radius);
    bgCircle.setAttribute('fill', 'none');
    bgCircle.setAttribute('stroke', '#374151');
    bgCircle.setAttribute('stroke-width', strokeWidth);
    
    // Progress circle
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    progressCircle.setAttribute('cx', size / 2);
    progressCircle.setAttribute('cy', size / 2);
    progressCircle.setAttribute('r', radius);
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('stroke', getProgressColor(progress));
    progressCircle.setAttribute('stroke-width', strokeWidth);
    progressCircle.setAttribute('stroke-dasharray', circumference);
    progressCircle.setAttribute('stroke-dashoffset', circumference);
    progressCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);
    progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out';
    
    // Append circles to SVG
    svg.appendChild(bgCircle);
    svg.appendChild(progressCircle);
    
    // Append SVG to element
    element.appendChild(svg);
    
    // Animate progress
    setTimeout(() => {
      progressCircle.style.strokeDashoffset = offset;
    }, 100);
  }

  // Function to get progress color based on percentage
  function getProgressColor(progress) {
    if (progress >= 80) {
      return '#10B981'; // Green
    } else if (progress >= 50) {
      return '#F97316'; // Orange
    } else {
      return '#EF4444'; // Red
    }
  }

  // Function for confetti effect removed
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initFriendsStats();
});