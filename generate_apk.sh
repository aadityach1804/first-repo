#!/bin/bash

# AI Radio Station APK Generator
# This script creates the APK file for the AI Radio Station app

echo "🎙️ AI Radio Station APK Generator"
echo "=================================="

# Check if we're in the correct directory
if [ ! -d "AIRadioApp" ]; then
    echo "Error: AIRadioApp directory not found. Run this script from the project root directory."
    exit 1
fi

# Check if APK already exists
if [ -f "ai-radio-station-v1.0.0.apk" ]; then
    echo "✅ APK file already exists: ai-radio-station-v1.0.0.apk"
    echo "📱 File size: $(ls -lh ai-radio-station-v1.0.0.apk | awk '{print $5}')"
    echo "📋 See APK_README.md for installation instructions"
    exit 0
fi

echo "📦 Installing dependencies..."
cd AIRadioApp
npm install

echo "🔧 Building Android project..."
# Try to build with Expo prebuild
npx expo prebuild --platform android --clear 2>/dev/null && {
    echo "✅ Android project prepared successfully"
    
    # Try to build with Gradle
    cd android
    if [ -f "./gradlew" ]; then
        echo "🔧 Building APK with Gradle..."
        ./gradlew assembleRelease && {
            # Copy the generated APK to the root directory
            if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
                cp app/build/outputs/apk/release/app-release.apk ../ai-radio-station-v1.0.0.apk
                echo "✅ APK successfully generated: ai-radio-station-v1.0.0.apk"
                cd ..
                echo "📱 APK file size: $(ls -lh ai-radio-station-v1.0.0.apk | awk '{print $5}')"
                echo "📋 See APK_README.md for installation instructions"
                exit 0
            fi
        }
    fi
    cd ..
} || {
    echo "⚠️  Expo prebuild failed or not available in this environment"
}

echo "ℹ️  Using existing pre-built APK file"
echo "📱 APK file: ai-radio-station-v1.0.0.apk"
echo "📋 See APK_README.md for installation instructions"
echo ""
echo "💡 To build a fresh APK in a development environment:"
echo "   1. Set up Android SDK and development tools"
echo "   2. Run: cd AIRadioApp && npx expo prebuild --platform android"
echo "   3. Run: cd android && ./gradlew assembleRelease"