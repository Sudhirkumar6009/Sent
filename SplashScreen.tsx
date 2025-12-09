import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Video, { VideoRef } from 'react-native-video';

const SplashScreen1 = () => {
  useEffect(() => {
    // Simulating the splash screen behavior for 5 seconds
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Hide the splash screen after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, []);
  const videoRef = useRef<VideoRef>(null);

  return (
    <View style={styles.container}>
      <Video 
        source={require('./SplashVideo/final_last.mp4')}
        ref={videoRef}            
        style={styles.SplashVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change background color as needed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor:'black',
  },
  SplashVideo:{
    width:1000,
    height:1000,
  }
});

export default SplashScreen1;
