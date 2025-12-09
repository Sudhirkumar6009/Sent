import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';

interface Props {
  navigation: any; // Replace 'any' with the correct type for navigation if possible
}

const GroupScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Group Screen</Text>
      <TouchableOpacity
        onPress={() => Alert.alert('Button Clicked from GroupScreen !')}
      >
        <Text style={{backgroundColor:'black', color:'white',padding:10,}}>Hello</Text>
      </TouchableOpacity>
      <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'}} style={{height:400, width:400,}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default GroupScreen;
