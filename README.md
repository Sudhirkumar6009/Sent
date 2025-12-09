# Sent - React Native Messaging App

A modern, feature-rich mobile messaging application built with **React Native** and **Firebase**. Sent enables seamless real-time communication with direct messaging, group chats, video calls, and authentication through Google Sign-In.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development](#development)

## ✨ Features

- **User Authentication**: Google Sign-In integration with Firebase Authentication
- **Real-time Messaging**: Direct messages and group chats with Firestore
- **Video & Voice Calls**: Integrated call functionality
- **User Profiles**: Customizable user profiles with profile screens
- **Dark Mode Support**: Light and dark theme components
- **Bottom Tab Navigation**: Intuitive navigation between Chat, Messages, Calls, and Profile
- **Image Picker**: Share images in conversations
- **Video Support**: Play and share video content
- **Push Notifications**: Snackbar notifications for user interactions
- **Responsive UI**: Material Design with React Native Paper

## 🛠 Tech Stack

### Core Framework
- **React Native** 0.74.3 - Cross-platform mobile development
- **React** 18.2.0 - UI library
- **TypeScript** 5.0.4 - Type safety

### Navigation
- `@react-navigation/bottom-tabs` - Tab-based navigation
- `@react-navigation/native-stack` - Stack navigation
- `@react-navigation/drawer` - Drawer navigation

### Firebase Services
- `@react-native-firebase/app` - Firebase core
- `@react-native-firebase/auth` - Authentication
- `@react-native-firebase/firestore` - Cloud database
- `@react-native-firebase/database` - Realtime database
- `firebase-admin` - Backend administration

### UI & Components
- `react-native-paper` - Material Design components
- `react-native-vector-icons` - Icon library
- `react-native-gifted-chat` - Chat UI
- `react-native-modal` - Modal dialogs
- `react-native-video` - Video playback

### Utilities
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-device-info` - Device information
- `react-native-permissions` - Permission management
- `react-native-image-picker` - Image selection
- `uuid` - Unique identifier generation
- `react-native-splash-screen` - Custom splash screen

### Development
- **Jest** - Unit testing
- **ESLint** - Code linting
- **Babel** - JavaScript transpiler
- **Prettier** - Code formatting

## 📱 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Android Studio** (for Android development) with:
  - Android SDK
  - Android Emulator or physical device
- **Xcode** (for iOS development on macOS)
- **React Native CLI**: `npm install -g react-native-cli`

### Environment Setup

Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide for your platform.

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install CocoaPods (iOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## ⚙️ Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Update `firebaseConfig.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };
   ```

3. Add your `google-services.json` (Android) and GoogleService-Info.plist (iOS) to the appropriate directories

### Google Sign-In Setup

Configure Google Sign-In credentials in your Firebase Console and update the app configuration files.

## ▶️ Running the App

### Start Metro Server

The Metro bundler manages JavaScript bundling and reloading:

```bash
npm start
# or
yarn start
```

### Run on Android

```bash
npm run android
# or
yarn android
```

Requirements:
- Android Emulator running or physical device connected
- USB debugging enabled (for physical devices)

### Run on iOS

```bash
npm run ios
# or
yarn ios
```

Requirements:
- macOS with Xcode installed
- iOS Simulator or physical device

## 📁 Project Structure

```
Sent/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── screens/                 # Main screen components
│   ├── CallScreen.tsx
│   ├── ChatScreen.tsx
│   ├── MessageScreen.tsx
│   ├── GroupScreens.tsx
│   └── types.ts
├── components/              # Reusable UI components
│   ├── DarkMode/
│   └── LightMode/
├── navigation/              # Navigation configuration
│   └── tabs.tsx
├── assets/                  # Images and static assets
├── App.tsx                  # Main application component
├── LoginScreen.tsx          # Authentication screen
├── ProfileScreen.tsx        # User profile screen
├── AddScreen.tsx            # Add contacts screen
├── SplashScreen.tsx         # Launch screen
├── firebaseConfig.js        # Firebase configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Metro bundler |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run Jest tests |

## 👨‍💻 Development

### Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting: `npx prettier --write .`
- Maintain TypeScript type safety

### Creating New Screens

1. Create a new file in `screens/`
2. Export component from `screens/types.ts`
3. Add navigation in `navigation/tabs.tsx`

### Running Tests

```bash
npm test
```

Tests use Jest and are located in `__tests__/` directory.

## 📋 Features in Development

- Enhanced group chat management
- Media gallery and file sharing
- End-to-end encryption
- User presence indicators
- Message search functionality

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Troubleshooting

### Common Issues

**Metro Bundler Issues**
- Clear cache: `npm start -- --reset-cache`
- Clear node_modules: `rm -rf node_modules && npm install`

**Android Build Issues**
- Clean build: `cd android && ./gradlew clean && cd ..`
- Update SDK tools in Android Studio

**iOS Build Issues**
- Clear pods: `cd ios && rm -rf Pods && pod install && cd ..`
- Clear Xcode cache: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`

**Firebase Connection Issues**
- Verify Firebase credentials in `firebaseConfig.js`
- Check Firebase project settings
- Ensure network connectivity

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Happy Coding! 🚀**
## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
