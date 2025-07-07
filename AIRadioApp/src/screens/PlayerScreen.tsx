import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import appData from '../data/appData';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentContent, setCurrentContent] = useState('Welcome to AI Radio Station');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [selectedStation, setSelectedStation] = useState('world');
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const togglePlayback = async () => {
    try {
      if (isPlaying) {
        setIsPlaying(false);
        Speech.stop();
        if (sound) {
          await sound.pauseAsync();
        }
      } else {
        setIsPlaying(true);
        await startRadioStream();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle playback');
      setIsPlaying(false);
    }
  };

  const startRadioStream = async () => {
    try {
      // Generate AI anchor content
      const newsContent = generateAnchorScript();
      setCurrentContent(newsContent);
      
      // Synthesize speech
      Speech.speak(newsContent, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          // Play music after news
          playMusic();
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to start radio stream');
    }
  };

  const generateAnchorScript = () => {
    const headlines = appData.newsHeadlines.slice(0, 3);
    const weather = appData.weatherData[0];
    
    let script = `Good ${getTimeOfDay()}, and welcome to AI Radio Station. `;
    script += `It's ${currentTime} and here are your top stories. `;
    
    headlines.forEach((news, index) => {
      script += `${news.headline} from ${news.source}. `;
    });
    
    script += `The weather today in ${weather.city} is ${weather.temperature} with ${weather.condition}. `;
    script += `Now, let's enjoy some music based on your preferences. `;
    
    return script;
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const playMusic = async () => {
    try {
      // Simulate playing a track from user's library
      const tracks = appData.musicTracks;
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      
      setCurrentContent(`Now playing: ${randomTrack.title} by ${randomTrack.artist}`);
      
      // In a real implementation, this would play actual music files
      // For demo purposes, we'll just show the track info
      setTimeout(() => {
        if (isPlaying) {
          playMusic(); // Loop to next track
        }
      }, 30000); // Play for 30 seconds in demo
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  const changeStation = (station: string) => {
    setSelectedStation(station);
    if (isPlaying) {
      Speech.stop();
      startRadioStream();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>{currentTime}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.liveIndicator, { backgroundColor: isPlaying ? '#ff4444' : '#cccccc' }]} />
          <Text style={styles.statusText}>{isPlaying ? 'LIVE' : 'OFFLINE'}</Text>
        </View>
      </View>

      <View style={styles.playerCard}>
        <Text style={styles.stationTitle}>🎙️ AI Radio Station</Text>
        
        <View style={styles.stationSelector}>
          <TouchableOpacity
            style={[styles.stationButton, selectedStation === 'world' && styles.activeStation]}
            onPress={() => changeStation('world')}
          >
            <Text style={[styles.stationText, selectedStation === 'world' && styles.activeStationText]}>
              World News
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.stationButton, selectedStation === 'music' && styles.activeStation]}
            onPress={() => changeStation('music')}
          >
            <Text style={[styles.stationText, selectedStation === 'music' && styles.activeStationText]}>
              Music & Trends
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.stationButton, selectedStation === 'local' && styles.activeStation]}
            onPress={() => changeStation('local')}
          >
            <Text style={[styles.stationText, selectedStation === 'local' && styles.activeStationText]}>
              Local Connect
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playbackControls}>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={80}
              color="#2180C8"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentArea}>
          <Text style={styles.contentTitle}>Now Broadcasting:</Text>
          <Text style={styles.contentText}>{currentContent}</Text>
        </View>
      </View>

      <View style={styles.scheduleCard}>
        <Text style={styles.cardTitle}>📅 Today's Schedule</Text>
        {appData.programmingSchedule.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{item.time}</Text>
            <View style={styles.scheduleDetails}>
              <Text style={styles.scheduleContent}>{item.content}</Text>
              <Text style={styles.scheduleDuration}>{item.duration}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2180C8',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  stationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  stationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeStation: {
    backgroundColor: '#2180C8',
  },
  stationText: {
    fontSize: 12,
    color: '#666',
  },
  activeStationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  playbackControls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArea: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scheduleItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2180C8',
    width: 80,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  scheduleDuration: {
    fontSize: 12,
    color: '#888',
  },
});