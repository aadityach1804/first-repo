// Application data adapted from web version
export interface NewsItem {
  category: string;
  headline: string;
  source: string;
  time: string;
  location: string;
}

export interface SocialPost {
  platform: string;
  username: string;
  content: string;
  likes: number;
  time: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
}

export interface WeatherData {
  city: string;
  temperature: string;
  condition: string;
  humidity: string;
}

export interface ProgrammingSchedule {
  time: string;
  content: string;
  duration: string;
  type: string;
}

export const appData = {
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
    },
    {
      category: "sports",
      headline: "World Cup Qualifying Matches Begin",
      source: "Sports Network",
      time: "30 minutes ago",
      location: "International"
    }
  ] as NewsItem[],
  
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
    },
    {
      platform: "Instagram",
      username: "lifestyle_trends",
      content: "Check out the latest trends in sustainable living! 🌱 #EcoLife #Green",
      likes: 856,
      time: "12 minutes ago"
    }
  ] as SocialPost[],
  
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
    },
    {
      title: "Chill Vibes",
      artist: "Ambient Masters",
      album: "Relaxation Station",
      duration: "5:01",
      genre: "Ambient"
    }
  ] as MusicTrack[],
  
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
  ] as WeatherData[],
  
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
      content: "Local Weather & Traffic",
      duration: "5 min",
      type: "weather"
    },
    {
      time: "7:05 AM",
      content: "Morning Playlist",
      duration: "55 min",
      type: "music"
    }
  ] as ProgrammingSchedule[]
};

export default appData;