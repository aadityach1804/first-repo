#!/bin/bash

# AI Radio Station Build Script
# This script prepares the project for building and creates distribution files

echo "🎙️ AI Radio Station Build Script"
echo "================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Prebuild for Android..."
npx expo prebuild --platform android --clean

echo "🌐 Building for web..."
npx expo export --platform web

echo "📱 Preparing Android build..."
echo "To build the APK, run:"
echo "cd android && ./gradlew assembleRelease"
echo ""
echo "The APK will be generated at:"
echo "android/app/build/outputs/apk/release/app-release.apk"

echo ""
echo "✅ Build preparation complete!"
echo "📱 For Android: Build the APK using the command above"
echo "🌐 For Web: Check the 'dist' folder for web build"
echo "🍎 For iOS: Use 'npx expo run:ios' (requires macOS)"