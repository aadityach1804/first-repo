import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appData, { NewsItem } from '../data/appData';
import * as Location from 'expo-location';

export default function NewsScreen() {
  const [news, setNews] = useState<NewsItem[]>(appData.newsHeadlines);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState<string>('Local');

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed for local news');
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      // In a real app, you would reverse geocode to get city name
      setLocation('Your Location');
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch fresh news from APIs
      const updatedNews = [...appData.newsHeadlines].map(item => ({
        ...item,
        time: `${Math.floor(Math.random() * 60)} minutes ago`
      }));
      setNews(updatedNews);
      setRefreshing(false);
    }, 2000);
  };

  const filterNews = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setNews(appData.newsHeadlines);
    } else {
      const filtered = appData.newsHeadlines.filter(item => item.category === category);
      setNews(filtered);
    }
  };

  const categories = ['all', 'world', 'technology', 'local', 'sports'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'world': return '🌍';
      case 'technology': return '💻';
      case 'local': return '📍';
      case 'sports': return '⚽';
      default: return '📰';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📰 Latest News</Text>
        <Text style={styles.locationText}>📍 {location}</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => filterNews(category)}
          >
            <Text style={styles.categoryEmoji}>{getCategoryIcon(category)}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.activeCategoryText
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.newsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {news.map((item, index) => (
          <TouchableOpacity key={index} style={styles.newsCard}>
            <View style={styles.newsHeader}>
              <Text style={styles.categoryTag}>
                {getCategoryIcon(item.category)} {item.category.toUpperCase()}
              </Text>
              <Text style={styles.newsTime}>{item.time}</Text>
            </View>
            
            <Text style={styles.newsHeadline}>{item.headline}</Text>
            
            <View style={styles.newsFooter}>
              <Text style={styles.newsSource}>📰 {item.source}</Text>
              <Text style={styles.newsLocation}>📍 {item.location}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>🌤️ Weather Update</Text>
          {appData.weatherData.map((weather, index) => (
            <View key={index} style={styles.weatherItem}>
              <Text style={styles.weatherCity}>{weather.city}</Text>
              <Text style={styles.weatherTemp}>{weather.temperature}</Text>
              <Text style={styles.weatherCondition}>{weather.condition}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2180C8',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    minWidth: 80,
  },
  activeCategoryButton: {
    backgroundColor: '#2180C8',
  },
  categoryEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2180C8',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newsTime: {
    fontSize: 12,
    color: '#888',
  },
  newsHeadline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    color: '#666',
  },
  newsLocation: {
    fontSize: 12,
    color: '#666',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  weatherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  weatherCity: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  weatherTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2180C8',
    marginHorizontal: 10,
  },
  weatherCondition: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
});