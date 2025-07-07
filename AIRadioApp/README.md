# 🎙️ AI Radio Station Mobile App

A personalized AI-powered radio application that syncs with your social media, news feeds, and music library to provide a unique radio broadcasting experience.

## Features

### 🎤 AI Professional Anchor
- Professional AI voice synthesis for news delivery
- Customizable voice styles (Professional/Casual)
- Real-time news script generation from multiple sources

### 📰 News Integration
- World news headlines
- Local news based on location
- Technology, sports, and business updates
- Weather information

### 🎵 Music Integration
- Access to device music library
- Genre-based music filtering
- Personalized playlists
- Music playback controls

### 📱 Social Media Sync
- Twitter integration
- Facebook posts
- Instagram content
- Social media trending topics

### ⚙️ Customization
- Voice style preferences
- Notification settings
- Location services
- Auto-play options

## Installation

### Prerequisites
- Node.js 16+ 
- Expo CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Setup
1. Clone the repository
2. Navigate to the AIRadioApp directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Building for Different Platforms

#### Web
```bash
npm run web
```

#### Android APK
```bash
# Prebuild native Android project
npx expo prebuild --platform android

# Build APK
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

#### iOS
```bash
npx expo run:ios
```

### Using the Build Script
```bash
./build.sh
```

## Permissions

### Android
- `RECORD_AUDIO` - For voice recording features
- `READ_EXTERNAL_STORAGE` - Access to music library
- `ACCESS_FINE_LOCATION` - Local news and weather
- `INTERNET` - News and social media APIs
- `ACCESS_NETWORK_STATE` - Network connectivity

### iOS
- Microphone access
- Media Library access
- Location services
- Network access

## Architecture

The app is built using:
- **React Native** with Expo
- **TypeScript** for type safety
- **Expo AV** for audio playback
- **Expo Speech** for text-to-speech
- **React Navigation** for navigation
- **Expo Location** for local content
- **Expo Media Library** for music access

## Project Structure

```
AIRadioApp/
├── src/
│   ├── screens/          # Main app screens
│   │   ├── PlayerScreen.tsx
│   │   ├── NewsScreen.tsx
│   │   ├── MusicScreen.tsx
│   │   ├── SocialScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/       # Reusable components
│   ├── services/         # API services
│   └── data/            # Data models and mock data
├── android/             # Native Android project
├── assets/              # Images and static assets
└── App.tsx             # Main app entry point
```

## Features in Detail

### AI Radio Player
- Real-time news aggregation and script generation
- Professional AI anchor voice synthesis
- Dynamic content mixing (news + music)
- Multiple radio station themes

### News Feed
- Category-based filtering
- Location-aware content
- Real-time updates
- Weather integration

### Music Library
- Device music library access
- Genre-based filtering
- Now playing controls
- Personalized recommendations

### Social Media
- Multi-platform content aggregation
- Content sharing to radio
- Trending topics integration
- Account connection management

### Settings
- Voice customization
- Notification preferences
- Privacy controls
- App information

## Development

### Running in Development
```bash
npm start
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## API Integration

The app is designed to integrate with:
- News APIs (NewsAPI, Currents API)
- Social Media APIs (Twitter, Facebook, Instagram)
- Music streaming APIs (Spotify, Apple Music)
- Weather APIs
- Text-to-Speech services

Currently uses mock data for demonstration purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the AI Radio Station ecosystem.

## Support

For issues and feature requests, please create an issue in the repository.

---

**AI Radio Station** - Your Personalized Radio Experience 🎙️