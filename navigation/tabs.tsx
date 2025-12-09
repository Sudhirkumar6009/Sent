// Tabs.tsx

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, StatusBar, StyleSheet, useColorScheme, View, TouchableOpacity, Animated, ScrollView, RefreshControl, Text, Alert, Button, TextInput } from 'react-native';
import CallScreen from '../screens/CallScreen';
import MessageScreen from '../screens/MessageScreen';
import GroupScreen from '../screens/GroupScreens';
import Video, { VideoRef } from 'react-native-video';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const TopTab = createMaterialTopTabNavigator();
const admin = require('firebase-admin');

const Tabs = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const videoRef = useRef<VideoRef>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 180, height: 85 });
  const [refreshing, setRefreshing] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const buttonTranslateY = useRef(new Animated.Value(0)).current;
  const [messageTabFocused, setMessageTabFocused] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const checkPhoneNumber = async () => {
    try {
      const user = auth().currentUser;

      if (user) {
        const loggedInUserPhoneNumber = user.phoneNumber;

        if (loggedInUserPhoneNumber === enteredPhoneNumber) {
          setStatus('Yes');
        } else {
          setStatus('No');
        }
      } else {
        Alert.alert('No user is logged in.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while checking the phone number.');
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  useEffect(() => {
    const videoDisplayDelay = 2000; // 2 seconds
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, videoDisplayDelay);

    return () => {
      clearTimeout(videoTimer);
    };
  }, []);

  const handleVideoProgress = (progress: any) => {
    if (progress.currentTime >= 10) {
      videoRef.current?.pause();
      setVideoDimensions({ width: 150, height: 80 });
    }
  };

  useEffect(() => {
    if (messageTabFocused) {
      setButtonVisible(true);
      Animated.spring(buttonTranslateY, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {  
      Animated.spring(buttonTranslateY, {
        toValue: 0,
        friction: 10,
        useNativeDriver: true,
      }).start(() => setButtonVisible(false));
    }
  }, [messageTabFocused, buttonTranslateY]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colorScheme === 'dark' ? '#000000' : '#ffffff'} />
      <View style={colorScheme === 'dark' ? styles.TopViewDarkContainer : styles.TopViewLightContainer}>
        {showVideo && (
          <Video
            source={colorScheme === 'dark' ? require('../components/DarkMode/sent_video.mp4') : require('../components/LightMode/sent_video.mp4')}
            ref={videoRef}
            style={[styles.backgroundVideo, videoDimensions]}
            onProgress={handleVideoProgress}
            paused={false}
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Your Profile')}>
          <Image source={{ uri: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png' }} style={{ height: 50, width: 50, alignSelf: 'flex-end', margin: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'black', height: 0.4, elevation: 50, shadowColor: '#00aaff' }}></View>
      <TopTab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarItemStyle: styles.tabBarItem,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabContainer,
          tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        }}
      >
        <TopTab.Screen
          name="Message"
          children={() => (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#009688']} />
              }
            >
              <MessageScreen />
            </ScrollView>
          )}
          listeners={({navigation, route}) => ({
            focus: () => {
              setMessageTabFocused(true);
            },
            blur: () => {
              setMessageTabFocused(false);
            }
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
              style={{
                  backgroundColor: focused ? '#cceeff' : '#ffffff',
                  borderWidth: focused ? 1 : 0,
                  borderColor: focused ? '#d9d9d9' : '#ffffff',
                  borderRadius: 30,
                  height: 40,
                  width: 83,
                  left: -30,
                  top: -5,
                }}
              >
                <Image
                  source={require('../assets/Message_icon.png')}
                  resizeMode="contain"
                  style={{
                    height: focused ? 31 : 30,
                    width: focused ? 31 : 30,
                    marginTop: focused ? 4 : 6,
                    marginStart: 23,
                  }}
                />
              </View>
            ),
          }}
        />
        <TopTab.Screen
          name="Group"
          component={GroupScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: focused ? '#cceeff' : '#ffffff',
                  borderWidth: focused ? 1 : 0,
                  borderColor: focused ? '#d9d9d9' : '#ffffff',
                  borderRadius: 30,
                  height: 40,
                  width: 83,
                  left: -30,
                  top: -5,
                }}
              >
                <Image
                  source={require('../assets/group_icon.png')}
                  resizeMode="contain"
                  style={{
                    height: focused ? 35 : 34,
                    width: focused ? 35 : 34,
                    tintColor: focused ? '#0088cc' : '#33ccff',
                    marginTop: focused ? 0 : 2,
                    marginStart: focused ? 23 : 24,
                  }}
                />
              </View>
            ),
          }}
        />
        <TopTab.Screen
          name="Call"
          component={CallScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: focused ? '#cceeff' : '#ffffff',
                  borderWidth: focused ? 1 : 0,
                  borderColor: focused ? '#d9d9d9' : '#ffffff',
                  borderRadius: 30,
                  height: 42,
                  width: 83,
                  left: -30,
                  top: -5,
                }}
              >
                <Image
                  source={require('../assets/call_icon.png')}
                  resizeMode="contain"
                  style={{
                    height: focused ? 21 : 20,
                    width: focused ? 21 : 20,
                    tintColor: focused ? '#0088cc' : '#33ccff',
                    marginTop: focused ? 10 : 12,
                    marginStart: focused ? 31 : 31,
                  }}
                />
              </View>
            ),
          }}
        />
      </TopTab.Navigator>

      {buttonVisible && (
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateX: buttonTranslateY.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 5] // Adjust the output range to fit your design
          }) },
          {translateY:-35}] }]}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Icon name='person-add' size={20} color={'white'}/>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.modalContent}>
<TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={enteredPhoneNumber}
        onChangeText={setEnteredPhoneNumber}
      />
      <Button title="Check Phone Number" onPress={checkPhoneNumber} />
      {status && <Text>{status}</Text>}
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: 82,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabBarItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 12,
    marginTop: 15,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  TopViewDarkContainer: {
    backgroundColor: 'black',
    height: 75,
  },
  TopViewLightContainer: {
    backgroundColor: 'white',
    height: 70,
  },
  backgroundVideo: {
    position: 'absolute',
    margin: -5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60, // Adjust based on your design
    right: 16, // Adjust based on your design
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0088cc',
    padding:20,
    borderRadius: 50,
    elevation:2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Tabs;
