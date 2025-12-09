// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6G4bos3ikpTwpuJsZYaWY7lM0kDp7uSA',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'sent-c9e3f',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: '409235169771',
  appId: '1:409235169771:android:476c739718bd72a0c639ae',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { auth, firestore };
