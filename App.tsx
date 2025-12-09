import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreenComponent from 'react-native-splash-screen';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import Messagescreen from './screens/MessageScreen';
import CallScreen from './screens/CallScreen';
import GroupScreen from './screens/GroupScreens';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import Tabs from './navigation/tabs'; // Assuming you've already defined your tab navigator
import ProfileScreen from './ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import AddScreen from './AddScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [error, setError] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    SplashScreenComponent.hide();
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: () => setError('') }]);
    }
  }, [error]);


  if (isSplashVisible) {
    return <SplashScreen />;
  } else if (userLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Tabs} options={{headerShown: false}}/>
          <Stack.Screen name="Your Profile" component={ProfileScreen} options={{headerShown: true}} />
          <Stack.Screen name="Message" component={Messagescreen} options={{headerShown: false}} />
          <Stack.Screen name="Call" component={CallScreen} options={{headerShown: false}} />
          <Stack.Screen name="Group" component={GroupScreen} options={{headerShown: false}} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
          <Stack.Screen name="Add" component={AddScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen />;
  }
};

export default App;
