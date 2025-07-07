import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

import PlayerScreen from './src/screens/PlayerScreen';
import NewsScreen from './src/screens/NewsScreen';
import MusicScreen from './src/screens/MusicScreen';
import SocialScreen from './src/screens/SocialScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      await sound?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Player':
                iconName = focused ? 'play-circle' : 'play-circle-outline';
                break;
              case 'News':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              case 'Music':
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                break;
              case 'Social':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              default:
                iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2180C8',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#2180C8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Player" 
          component={PlayerScreen} 
          options={{ title: '🎙️ AI Radio' }}
        />
        <Tab.Screen 
          name="News" 
          component={NewsScreen} 
          options={{ title: '📰 News' }}
        />
        <Tab.Screen 
          name="Music" 
          component={MusicScreen} 
          options={{ title: '🎶 Music' }}
        />
        <Tab.Screen 
          name="Social" 
          component={SocialScreen} 
          options={{ title: '📱 Social' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: '⚙️ Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
