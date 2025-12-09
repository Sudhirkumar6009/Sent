// App.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ScreenB from './App';
import ProfileScreen from './ProfileScreen';

const App: React.FC = () => {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [showScreenB, setShowScreenB] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsTrue(true);
    setShowScreenB(true);
  };

  return (
    <View style={styles.container}>
      {!showScreenB ? (
        <ProfileScreen onButtonClicked={handleButtonClick} />
      ) : (
        <ScreenB isTrue={isTrue} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
