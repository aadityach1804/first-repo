import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import appData, { MusicTrack } from '../data/appData';

export default function MusicScreen() {
  const [tracks, setTracks] = useState<MusicTrack[]>(appData.musicTracks);
  const [deviceTracks, setDeviceTracks] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        loadDeviceMusic();
      } else {
        Alert.alert('Permission Denied', 'Media library access is needed to play your music');
      }
    } catch (error) {
      console.error('Error requesting media library permission:', error);
    }
  };

  const loadDeviceMusic = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 20,
      });
      setDeviceTracks(media.assets);
    } catch (error) {
      console.error('Error loading device music:', error);
    }
  };

  const playTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real app, this would integrate with audio playback
    Alert.alert('Now Playing', `${track.title} by ${track.artist}`);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const filterByGenre = (genre: string) => {
    setSelectedGenre(genre);
    if (genre === 'all') {
      setTracks(appData.musicTracks);
    } else {
      const filtered = appData.musicTracks.filter(track => 
        track.genre.toLowerCase() === genre.toLowerCase()
      );
      setTracks(filtered);
    }
  };

  const genres = ['all', 'electronic', 'jazz', 'rock', 'ambient'];

  const getGenreIcon = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'electronic': return '🎛️';
      case 'jazz': return '🎷';
      case 'rock': return '🎸';
      case 'ambient': return '🌊';
      default: return '🎵';
    }
  };

  const renderTrackItem = ({ item, index }: { item: MusicTrack; index: number }) => (
    <TouchableOpacity
      style={[
        styles.trackCard,
        currentTrack?.title === item.title && styles.currentTrackCard
      ]}
      onPress={() => playTrack(item)}
    >
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <Text style={styles.trackAlbum}>{item.album}</Text>
      </View>
      <View style={styles.trackMeta}>
        <Text style={styles.trackGenre}>{getGenreIcon(item.genre)} {item.genre}</Text>
        <Text style={styles.trackDuration}>{item.duration}</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons
          name={currentTrack?.title === item.title && isPlaying ? 'pause' : 'play'}
          size={24}
          color="#2180C8"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {currentTrack && (
        <View style={styles.nowPlayingCard}>
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingLabel}>Now Playing</Text>
            <Text style={styles.nowPlayingTitle}>{currentTrack.title}</Text>
            <Text style={styles.nowPlayingArtist}>{currentTrack.artist}</Text>
          </View>
          <TouchableOpacity style={styles.nowPlayingButton} onPress={togglePlayback}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={50}
              color="#2180C8"
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.genreContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreContent}
        >
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreButton,
                selectedGenre === genre && styles.activeGenreButton
              ]}
              onPress={() => filterByGenre(genre)}
            >
              <Text style={styles.genreEmoji}>{getGenreIcon(genre)}</Text>
              <Text style={[
                styles.genreText,
                selectedGenre === genre && styles.activeGenreText
              ]}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎶 Your Music Library</Text>
        <Text style={styles.trackCount}>{tracks.length} tracks</Text>
      </View>

      <FlatList
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        style={styles.trackList}
        showsVerticalScrollIndicator={false}
      />

      {deviceTracks.length > 0 && (
        <View style={styles.deviceMusicSection}>
          <Text style={styles.sectionTitle}>📱 Device Music</Text>
          <Text style={styles.deviceMusicNote}>
            Found {deviceTracks.length} tracks on your device
          </Text>
          <TouchableOpacity style={styles.deviceMusicButton}>
            <Text style={styles.deviceMusicButtonText}>Browse Device Music</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  nowPlayingCard: {
    backgroundColor: '#2180C8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingLabel: {
    fontSize: 12,
    color: '#E3F2FD',
    marginBottom: 4,
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  nowPlayingArtist: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  nowPlayingButton: {
    marginLeft: 16,
  },
  genreContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginTop: 20,
  },
  genreContent: {
    paddingHorizontal: 20,
  },
  genreButton: {
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    minWidth: 80,
  },
  activeGenreButton: {
    backgroundColor: '#2180C8',
  },
  genreEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeGenreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trackCount: {
    fontSize: 14,
    color: '#666',
  },
  trackList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  trackCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentTrackCard: {
    borderColor: '#2180C8',
    borderWidth: 2,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  trackAlbum: {
    fontSize: 12,
    color: '#888',
  },
  trackMeta: {
    alignItems: 'flex-end',
    marginHorizontal: 12,
  },
  trackGenre: {
    fontSize: 12,
    color: '#2180C8',
    fontWeight: '500',
    marginBottom: 4,
  },
  trackDuration: {
    fontSize: 12,
    color: '#888',
  },
  playButton: {
    padding: 8,
  },
  deviceMusicSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  deviceMusicNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  deviceMusicButton: {
    backgroundColor: '#2180C8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deviceMusicButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});