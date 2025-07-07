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
import appData, { SocialPost } from '../data/appData';

export default function SocialScreen() {
  const [posts, setPosts] = useState<SocialPost[]>(appData.socialPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch fresh social media content
      const updatedPosts = [...appData.socialPosts].map(post => ({
        ...post,
        likes: post.likes + Math.floor(Math.random() * 100),
        time: `${Math.floor(Math.random() * 30)} minutes ago`
      }));
      setPosts(updatedPosts);
      setRefreshing(false);
    }, 2000);
  };

  const filterByPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    if (platform === 'all') {
      setPosts(appData.socialPosts);
    } else {
      const filtered = appData.socialPosts.filter(post => 
        post.platform.toLowerCase() === platform.toLowerCase()
      );
      setPosts(filtered);
    }
  };

  const platforms = ['all', 'twitter', 'facebook', 'instagram'];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'logo-twitter';
      case 'facebook': return 'logo-facebook';
      case 'instagram': return 'logo-instagram';
      default: return 'globe-outline';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return '#1DA1F2';
      case 'facebook': return '#4267B2';
      case 'instagram': return '#E4405F';
      default: return '#2180C8';
    }
  };

  const likePost = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const shareContent = (post: SocialPost) => {
    Alert.alert('Share Content', `Share "${post.content.substring(0, 50)}..." to your AI Radio?`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📱 Social Media Feed</Text>
        <Text style={styles.headerSubtitle}>Trending from your networks</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.platformContainer}
        contentContainerStyle={styles.platformContent}
      >
        {platforms.map((platform) => (
          <TouchableOpacity
            key={platform}
            style={[
              styles.platformButton,
              selectedPlatform === platform && styles.activePlatformButton,
              selectedPlatform === platform && { 
                backgroundColor: platform === 'all' ? '#2180C8' : getPlatformColor(platform) 
              }
            ]}
            onPress={() => filterByPlatform(platform)}
          >
            <Ionicons
              name={platform === 'all' ? 'globe-outline' : getPlatformIcon(platform)}
              size={20}
              color={selectedPlatform === platform ? '#fff' : '#666'}
            />
            <Text style={[
              styles.platformText,
              selectedPlatform === platform && styles.activePlatformText
            ]}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.postsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post, index) => (
          <View key={index} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.platformBadge}>
                <Ionicons
                  name={getPlatformIcon(post.platform)}
                  size={16}
                  color={getPlatformColor(post.platform)}
                />
                <Text style={[styles.platformName, { color: getPlatformColor(post.platform) }]}>
                  {post.platform}
                </Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {post.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.username}>{post.username}</Text>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => likePost(index)}
              >
                <Ionicons name="heart-outline" size={20} color="#666" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => shareContent(post)}
              >
                <Ionicons name="radio-outline" size={20} color="#2180C8" />
                <Text style={[styles.actionText, { color: '#2180C8' }]}>
                  Add to Radio
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={20} color="#666" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.integrationCard}>
          <Text style={styles.integrationTitle}>🔗 Connect Your Accounts</Text>
          <Text style={styles.integrationDescription}>
            Link your social media accounts to get personalized content in your AI Radio
          </Text>
          
          <View style={styles.connectionButtons}>
            <TouchableOpacity style={[styles.connectionButton, { backgroundColor: '#1DA1F2' }]}>
              <Ionicons name="logo-twitter" size={20} color="#fff" />
              <Text style={styles.connectionButtonText}>Connect Twitter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.connectionButton, { backgroundColor: '#4267B2' }]}>
              <Ionicons name="logo-facebook" size={20} color="#fff" />
              <Text style={styles.connectionButtonText}>Connect Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.connectionButton, { backgroundColor: '#E4405F' }]}>
              <Ionicons name="logo-instagram" size={20} color="#fff" />
              <Text style={styles.connectionButtonText}>Connect Instagram</Text>
            </TouchableOpacity>
          </View>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
    marginTop: 4,
  },
  platformContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  platformContent: {
    paddingHorizontal: 20,
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activePlatformButton: {
    backgroundColor: '#2180C8',
  },
  platformText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginLeft: 6,
  },
  activePlatformText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  postTime: {
    fontSize: 12,
    color: '#888',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2180C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  integrationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
  },
  integrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  integrationDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  connectionButtons: {
    width: '100%',
  },
  connectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  connectionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
});