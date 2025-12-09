import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MessageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,"Chat">
const MessageScreen = () => {
  const navigation = useNavigation<MessageScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat')}>
        <Text>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  card:{
    backgroundColor:'white',
    padding:30,
    borderRadius:10,
  },
  
});

export default MessageScreen;
