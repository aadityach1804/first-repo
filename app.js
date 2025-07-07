// Application data
const appData = {
  newsHeadlines: [
    {
      category: "world",
      headline: "Global Climate Summit Reaches Historic Agreement",
      source: "World News Network",
      time: "2 minutes ago",
      location: "Geneva"
    },
    {
      category: "technology", 
      headline: "AI Breakthrough in Medical Diagnosis Announced",
      source: "Tech Times",
      time: "15 minutes ago",
      location: "Silicon Valley"
    },
    {
      category: "local",
      headline: "New Public Transportation Line Opens",
      source: "City Herald",
      time: "1 hour ago",
      location: "Local"
    }
  ],
  socialPosts: [
    {
      platform: "Twitter",
      username: "@TechInfluencer",
      content: "Excited about the new AI developments! The future is here 🚀 #AI #Technology",
      likes: 1247,
      time: "3 minutes ago"
    },
    {
      platform: "Facebook",
      username: "News Daily",
      content: "Breaking: Major scientific discovery announced at international conference",
      likes: 523,
      time: "8 minutes ago"
    }
  ],
  musicTracks: [
    {
      title: "Electronic Dreams",
      artist: "Future Beats",
      album: "Digital Horizons",
      duration: "3:45",
      genre: "Electronic"
    },
    {
      title: "Morning Jazz",
      artist: "Smooth Collective",
      album: "City Sounds",
      duration: "4:12",
      genre: "Jazz"
    },
    {
      title: "Rock Anthem",
      artist: "Power Drive",
      album: "High Energy",
      duration: "3:28",
      genre: "Rock"
    }
  ],
  weatherData: [
    {
      city: "New York",
      temperature: "72°F",
      condition: "Partly Cloudy",
      humidity: "65%"
    },
    {
      city: "London",
      temperature: "18°C",
      condition: "Light Rain",
      humidity: "80%"
    },
    {
      city: "Tokyo",
      temperature: "25°C",
      condition: "Sunny",
      humidity: "55%"
    }
  ],
  programmingSchedule: [
    {
      time: "6:00 AM",
      content: "Morning News Briefing",
      duration: "15 min",
      type: "news"
    },
    {
      time: "6:15 AM",
      content: "Wake Up Music Mix",
      duration: "30 min",
      type: "music"
    },
    {
      time: "6:45 AM",
      content: "Social Media Roundup",
      duration: "10 min",
      type: "social"
    },
    {
      time: "7:00 AM",
      content: "Local News & Weather",
      duration: "15 min",
      type: "news"
    }
  ],
  radioStations: [
    {
      name: "World News Focus",
      description: "International news and analysis",
      format: "70% News, 20% Social, 10% Music"
    },
    {
      name: "Music & Trends",
      description: "Latest music with trending social topics",
      format: "60% Music, 25% Social, 15% News"
    },
    {
      name: "Local Connect",
      description: "Local news, weather, and community updates",
      format: "50% Local News, 30% Music, 20% Social"
    }
  ]
};

// Application state
let isPlaying = false;
let currentTrackIndex = 0;
let currentVolume = 75;
let currentCity = 'new-york';
let currentStation = 'world';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  startUpdateCycles();
});

function initializeApp() {
  updateCurrentTime();
  populateNewsContent();
  populateMusicContent();
  populateSocialContent();
  populateSchedule();
  updateWeatherWidget();
  updateAnchorScript();
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchSection(this.dataset.section);
    });
  });

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchTab(this.dataset.tab, this.parentElement);
    });
  });

  // Play button
  document.getElementById('playBtn').addEventListener('click', togglePlayback);
  document.getElementById('musicPlayBtn').addEventListener('click', toggleMusicPlayback);

  // Volume control
  const volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('input', function() {
    currentVolume = this.value;
    document.getElementById('volumeValue').textContent = this.value + '%';
  });

  // Station selection
  document.getElementById('stationSelect').addEventListener('change', function() {
    currentStation = this.value;
    updateStationInfo();
  });

  // Settings
  document.getElementById('voiceType').addEventListener('change', updateVoiceSettings);
  document.getElementById('speechSpeed').addEventListener('input', function() {
    document.getElementById('speedValue').textContent = this.value + 'x';
  });

  // City selection
  document.getElementById('citySelect').addEventListener('change', function() {
    currentCity = this.value;
    updateWeatherWidget();
  });
}

function switchSection(sectionId) {
  // Update navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

  // Show selected section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

function switchTab(tabId, tabContainer) {
  // Update tab buttons
  tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  tabContainer.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

  // Update content based on tab
  if (tabId === 'world' || tabId === 'local' || tabId === 'breaking') {
    populateNewsContent(tabId);
  } else if (tabId === 'feed' || tabId === 'trending') {
    populateSocialContent(tabId);
  }
}

function togglePlayback() {
  const playBtn = document.getElementById('playBtn');
  const statusIndicator = document.getElementById('statusIndicator');
  
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    playBtn.textContent = '⏸️';
    playBtn.classList.add('playing');
    statusIndicator.textContent = '● LIVE';
  } else {
    playBtn.textContent = '▶️';
    playBtn.classList.remove('playing');
    statusIndicator.textContent = '● OFFLINE';
  }
}

function toggleMusicPlayback() {
  const musicPlayBtn = document.getElementById('musicPlayBtn');
  
  if (musicPlayBtn.textContent === '▶️') {
    musicPlayBtn.textContent = '⏸️';
  } else {
    musicPlayBtn.textContent = '▶️';
  }
}

function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('currentTime').textContent = timeString;
}

function populateNewsContent(category = 'world') {
  const newsGrid = document.getElementById('newsGrid');
  let filteredNews = appData.newsHeadlines;

  if (category === 'local') {
    filteredNews = appData.newsHeadlines.filter(news => news.category === 'local');
  } else if (category === 'world') {
    filteredNews = appData.newsHeadlines.filter(news => news.category === 'world' || news.category === 'technology');
  }

  newsGrid.innerHTML = filteredNews.map(news => `
    <div class="news-item">
      <h4>${news.headline}</h4>
      <p>${news.source} • ${news.location}</p>
      <div class="news-meta">
        <span>${news.time}</span>
        <span class="status status--info">${news.category}</span>
      </div>
    </div>
  `).join('');
}

function populateMusicContent() {
  const currentTrack = appData.musicTracks[currentTrackIndex];
  document.getElementById('trackTitle').textContent = currentTrack.title;
  document.getElementById('trackArtist').textContent = currentTrack.artist;
  document.getElementById('trackAlbum').textContent = currentTrack.album;

  const playlist = document.getElementById('playlist');
  playlist.innerHTML = appData.musicTracks.map((track, index) => `
    <div class="playlist-item ${index === currentTrackIndex ? 'active' : ''}">
      <div>
        <strong>${track.title}</strong><br>
        <small>${track.artist}</small>
      </div>
      <span>${track.duration}</span>
    </div>
  `).join('');
}

function populateSocialContent(tab = 'feed') {
  const socialFeed = document.getElementById('socialFeed');
  
  if (tab === 'trending') {
    socialFeed.innerHTML = `
      <div class="social-post">
        <div class="social-post-header">
          <span class="social-platform">Trending Topics</span>
          <span class="social-time">Live</span>
        </div>
        <div class="social-content-text">
          <strong>🔥 #AI #Technology #Innovation</strong><br>
          <strong>📈 #ClimateChange #Environment</strong><br>
          <strong>🎵 #Music #NewReleases</strong>
        </div>
      </div>
    `;
  } else {
    socialFeed.innerHTML = appData.socialPosts.map(post => `
      <div class="social-post">
        <div class="social-post-header">
          <span class="social-platform">${post.platform}</span>
          <span class="social-time">${post.time}</span>
        </div>
        <div class="social-username">${post.username}</div>
        <div class="social-content-text">${post.content}</div>
        <div class="social-engagement">❤️ ${post.likes} likes</div>
      </div>
    `).join('');
  }
}

function populateSchedule() {
  const schedule = document.getElementById('upcomingSchedule');
  schedule.innerHTML = appData.programmingSchedule.map(item => `
    <div class="schedule-item">
      <div class="schedule-time">${item.time}</div>
      <div class="schedule-content">${item.content}</div>
      <div class="schedule-duration">${item.duration}</div>
    </div>
  `).join('');
}

function updateWeatherWidget() {
  const weatherData = appData.weatherData.find(w => w.city.toLowerCase().replace(' ', '-') === currentCity) || appData.weatherData[0];
  
  document.getElementById('weatherCity').textContent = weatherData.city;
  document.getElementById('weatherTemp').textContent = weatherData.temperature;
  document.getElementById('weatherCondition').textContent = weatherData.condition;
}

function updateStationInfo() {
  const station = appData.radioStations.find(s => s.name.toLowerCase().includes(currentStation)) || appData.radioStations[0];
  
  document.getElementById('currentProgram').textContent = station.name;
  document.getElementById('programDescription').textContent = station.description;
  
  updateAnchorScript();
}

function updateVoiceSettings() {
  const voiceType = document.getElementById('voiceType').value;
  const anchorName = document.querySelector('.anchor-name');
  
  switch(voiceType) {
    case 'professional-male':
      anchorName.textContent = 'AI Anchor - Professional Male';
      break;
    case 'professional-female':
      anchorName.textContent = 'AI Anchor - Professional Female';
      break;
    case 'friendly-male':
      anchorName.textContent = 'AI Anchor - Friendly Male';
      break;
    case 'friendly-female':
      anchorName.textContent = 'AI Anchor - Friendly Female';
      break;
  }
}

function updateAnchorScript() {
  const scriptContent = document.getElementById('anchorScript');
  const currentHour = new Date().getHours();
  
  let greeting = '';
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  const scripts = [
    `${greeting} and welcome to AI Radio Station. I'm your AI anchor bringing you the latest updates from around the world. Coming up next, we have breaking news from Geneva where the Global Climate Summit has reached a historic agreement...`,
    `You're listening to AI Radio Station. In our next segment, we'll be diving into the latest technological breakthroughs, including exciting developments in AI-powered medical diagnosis...`,
    `This is AI Radio Station, your source for personalized news and entertainment. We've got some fantastic music lined up for you, including the latest tracks from Future Beats and Smooth Collective...`,
    `Welcome back to AI Radio Station. Let's check in on what's trending in social media right now. We're seeing a lot of excitement about new AI developments and environmental initiatives...`
  ];

  const randomScript = scripts[Math.floor(Math.random() * scripts.length)];
  scriptContent.textContent = randomScript;
}

function startUpdateCycles() {
  // Update time every second
  setInterval(updateCurrentTime, 1000);
  
  // Update content every 30 seconds
  setInterval(() => {
    if (isPlaying) {
      updateAnchorScript();
      
      // Occasionally update music track
      if (Math.random() < 0.3) {
        currentTrackIndex = (currentTrackIndex + 1) % appData.musicTracks.length;
        populateMusicContent();
      }
    }
  }, 30000);
  
  // Update news ticker
  setInterval(() => {
    const ticker = document.getElementById('newsTicker');
    const headlines = appData.newsHeadlines;
    const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
    ticker.textContent = `🚨 BREAKING: ${randomHeadline.headline} in ${randomHeadline.location}`;
  }, 15000);
}

// Additional utility functions
function simulateContentUpdate() {
  // Simulate new content arriving
  if (Math.random() < 0.5) {
    const newHeadline = {
      category: "breaking",
      headline: "Breaking: New developments in ongoing story",
      source: "Live News",
      time: "Just now",
      location: "Various"
    };
    appData.newsHeadlines.unshift(newHeadline);
    populateNewsContent();
  }
}

function simulateAudioLevels() {
  // Visual feedback for audio levels (placeholder)
  const volumeSlider = document.getElementById('volumeSlider');
  if (isPlaying) {
    volumeSlider.style.background = `linear-gradient(to right, #3498db 0%, #3498db ${currentVolume}%, rgba(255,255,255,0.2) ${currentVolume}%, rgba(255,255,255,0.2) 100%)`;
  }
}

// Initialize audio level simulation
setInterval(simulateAudioLevels, 100);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
    e.preventDefault();
    togglePlayback();
  }
});

// Initialize tooltips and accessibility features
function initializeAccessibility() {
  // Add ARIA labels
  document.getElementById('playBtn').setAttribute('aria-label', 'Play/Pause Radio');
  document.getElementById('volumeSlider').setAttribute('aria-label', 'Volume Control');
  
  // Add keyboard navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
  });
}

// Call accessibility initialization
initializeAccessibility();

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    togglePlayback,
    updateCurrentTime,
    populateNewsContent,
    populateMusicContent,
    populateSocialContent
  };
}