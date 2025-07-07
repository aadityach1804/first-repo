import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [socialMediaSync, setSocialMediaSync] = useState(true);
  const [voiceStyle, setVoiceStyle] = useState('professional');

  const handleVoiceStyleChange = (style: string) => {
    setVoiceStyle(style);
    Alert.alert('Voice Style Updated', `AI Anchor voice changed to ${style}`);
  };

  const handleAbout = () => {
    Alert.alert(
      'About AI Radio',
      'AI Radio Station v1.0\n\nA personalized radio experience that syncs with your social media, news, and music preferences.\n\nDeveloped with React Native and Expo.',
      [{ text: 'OK' }]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'Your feedback helps us improve AI Radio Station. Would you like to send feedback?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Feedback', onPress: () => console.log('Feedback sent') }
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    icon, 
    onPress, 
    rightComponent, 
    showArrow = true 
  }: {
    title: string;
    subtitle?: string;
    icon: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#2180C8" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      ))}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>AI</Text>
        </View>
        <Text style={styles.profileName}>AI Radio Station</Text>
        <Text style={styles.profileEmail}>Personalized Radio Experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎙️ Audio Settings</Text>
        
        <SettingItem
          title="Voice Style"
          subtitle={`Current: ${voiceStyle.charAt(0).toUpperCase() + voiceStyle.slice(1)}`}
          icon="person-outline"
          onPress={() => {}}
          rightComponent={
            <View style={styles.voiceStyleContainer}>
              <TouchableOpacity
                style={[
                  styles.voiceStyleButton,
                  voiceStyle === 'professional' && styles.activeVoiceStyle
                ]}
                onPress={() => handleVoiceStyleChange('professional')}
              >
                <Text style={[
                  styles.voiceStyleText,
                  voiceStyle === 'professional' && styles.activeVoiceStyleText
                ]}>
                  Professional
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.voiceStyleButton,
                  voiceStyle === 'casual' && styles.activeVoiceStyle
                ]}
                onPress={() => handleVoiceStyleChange('casual')}
              >
                <Text style={[
                  styles.voiceStyleText,
                  voiceStyle === 'casual' && styles.activeVoiceStyleText
                ]}>
                  Casual
                </Text>
              </TouchableOpacity>
            </View>
          }
          showArrow={false}
        />

        <SettingItem
          title="Auto-Play"
          subtitle="Automatically start playing when app opens"
          icon="play-outline"
          rightComponent={
            <Switch
              value={autoPlay}
              onValueChange={setAutoPlay}
              trackColor={{ false: '#767577', true: '#2180C8' }}
              thumbColor={autoPlay ? '#fff' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>
        
        <SettingItem
          title="Push Notifications"
          subtitle="Receive news updates and alerts"
          icon="notifications-outline"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#2180C8' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Integrations</Text>
        
        <SettingItem
          title="Location Services"
          subtitle="For local news and weather"
          icon="location-outline"
          rightComponent={
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: '#767577', true: '#2180C8' }}
              thumbColor={locationServices ? '#fff' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />

        <SettingItem
          title="Social Media Sync"
          subtitle="Connect your social accounts"
          icon="people-outline"
          rightComponent={
            <Switch
              value={socialMediaSync}
              onValueChange={setSocialMediaSync}
              trackColor={{ false: '#767577', true: '#2180C8' }}
              thumbColor={socialMediaSync ? '#fff' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />

        <SettingItem
          title="Music Library Access"
          subtitle="Sync with your music apps"
          icon="musical-notes-outline"
          onPress={() => Alert.alert('Music Library', 'Manage your music library connections')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        
        <SettingItem
          title="About AI Radio"
          subtitle="Version 1.0"
          icon="information-circle-outline"
          onPress={handleAbout}
        />

        <SettingItem
          title="Send Feedback"
          subtitle="Help us improve"
          icon="chatbubble-outline"
          onPress={handleFeedback}
        />

        <SettingItem
          title="Privacy Policy"
          subtitle="How we protect your data"
          icon="shield-outline"
          onPress={() => Alert.alert('Privacy Policy', 'Privacy policy details would be shown here')}
        />

        <SettingItem
          title="Terms of Service"
          subtitle="Terms and conditions"
          icon="document-text-outline"
          onPress={() => Alert.alert('Terms of Service', 'Terms of service would be shown here')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Appearance</Text>
        
        <SettingItem
          title="Theme"
          subtitle="Light theme (coming soon: Dark mode)"
          icon="color-palette-outline"
          onPress={() => Alert.alert('Theme', 'Dark mode coming soon!')}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          AI Radio Station - Your Personalized Radio Experience
        </Text>
        <Text style={styles.footerVersion}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: '#2180C8',
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2180C8',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  voiceStyleContainer: {
    flexDirection: 'row',
  },
  voiceStyleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
  },
  activeVoiceStyle: {
    backgroundColor: '#2180C8',
  },
  voiceStyleText: {
    fontSize: 12,
    color: '#666',
  },
  activeVoiceStyleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#888',
  },
});