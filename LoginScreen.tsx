import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, StatusBar, useColorScheme, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SimManager from 'react-native-sim-cards-manager';

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(''); // Single string for OTP
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: () => setError('') }]);
    }
  }, [error]);
  
  useEffect(() => {
    // Fetch the SIM card data
    SimManager.getSimCards({
      title: 'App Permission',
      message: 'Custom message',
      buttonNeutral: 'Not now',
      buttonNegative: 'Not OK',
      buttonPositive: 'OK',
    })
      .then((simCards) => {
        if (simCards.length > 0) {
          // Assuming there's at least one SIM card detected
          const firstSimCard = simCards[0];
          setPhoneNumber(firstSimCard.phoneNumber || 'Phone number not available');
        } else {
          setPhoneNumber('No SIM cards detected');
        }
      })
      .catch((error) => {
        console.error('Error fetching SIM card data:', error);
      });
  }, []);
  const handleSendOtp = async () => {
    setLoading(true); // Set loading to true
    try {
      const formattedPhoneNumber = `+${phoneNumber}`;
      const confirmationResult = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      setConfirmation(confirmationResult);

      setTimeout(() => {
        setLoading(false);
      }, 5000);

    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message, [{text: "OK", onPress: () => setError('')}]);
    }
  };

  const handleConfirmCode = async () => {
    if (confirmation) {
      try {
        await confirmation.confirm(code);
      } catch (error) {
        Alert.alert('Error', 'OTP did not match. Please try again.', [{text: 'OK', onPress: () => setError('')}]);
      }
    } else {
      setError('No OTP confirmation result found');
    }
  };

  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <View>
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
          )}
          {!confirmation && !loading ? (
            <View style={colorScheme === 'dark' ? styles.mobileInputContainerDark : styles.mobileInputContainerLight}>
              <Text style={colorScheme === 'dark' ? styles.enterMobileTxtDark : styles.enterMobileTxtLight}>MOBILE VERIFICATION</Text>
              <Text style={colorScheme === 'dark' ? styles.enterMobileDescDark : styles.enterMobileDescLight}>Enter Mobile Number to get OTP</Text>
              <View>
                <View style={colorScheme === 'dark' ? styles.inputMobileContainerDark : styles.inputMobileContainerLight}>
                  <TextInput
                    style={colorScheme === 'dark' ? styles.mobileInputDark : styles.mobileInputLight}
                    keyboardType="numeric"
                    maxLength={12}
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber}
                  />
                  <Text style={{ position: 'absolute', marginHorizontal: 60, marginVertical: 50, fontSize: 22, fontWeight: '700', fontFamily: 'georgia', color: '#000000' }}>+</Text>
                  <TouchableOpacity onPress={handleSendOtp} style={colorScheme === 'dark' ? styles.sendOtpButtonDark : styles.sendOtpButtonLight}>
                    <Text style={{ fontSize: 17, color: '#fff', fontFamily: 'arial', fontWeight: '900' }}>Send OTP</Text>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity style={colorScheme === 'dark' ? styles.googleLoginDark : styles.googleLoginLight}>
                      <Image source={{ uri: 'https://www.pngall.com/wp-content/uploads/5/Google-G-Logo-PNG-Image.png' }} style={{ flex: 1, padding: 16, margin: 17, position: 'absolute', objectFit: 'scale-down' }} />
                      <Text style={colorScheme === 'dark' ? styles.googleTextDark : styles.googleTextLight}>Sign in with Google</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={colorScheme === 'dark' ? styles.mobileInputContainerDark : styles.mobileInputContainerLight}>
              <Text style={colorScheme === 'dark' ? styles.enterMobileTxtDark : styles.enterMobileTxtLight}>OTP VERIFICATION</Text>
              <Text style={colorScheme === 'dark' ? styles.enterMobileDescDark : styles.enterMobileDescLight}>Enter OTP to access your account !</Text>
              <View>
                <View style={styles.container}>
                  <TextInput
                    style={colorScheme === 'dark' ? styles.otpInputDark : styles.otpInputLight}
                    keyboardType="numeric"
                    maxLength={6}
                    textAlign='center'
                    textAlignVertical='center'
                    onChangeText={(text) => setCode(text)}
                    value={code}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleConfirmCode}
                  style={colorScheme === 'dark' ? styles.sendOtpButtonDark : styles.sendOtpButtonLight}
                >
                  <Text style={styles.buttonText}>Confirm Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  containerDark:{
       backgroundColor:'#333',
       flex:1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerLight:{
       backgroundColor:'#ffffff',
       flex:1,
       paddingVertical:150,
  },
  mobileInputContainerLight:{
       backgroundColor:'#fff',
       marginTop:50,
       margin:20,
       borderWidth:0.2,
       borderColor:'#1ab2ff',
       borderRadius:5,
       elevation:15,
       padding:8,
       shadowColor:'#1ab2ff',
  },
  mobileInputContainerDark:{
       backgroundColor:'#000',
       marginTop:50,
       margin:20,
       borderRadius:5,
       elevation:10,
       shadowColor:'#1ab2ff',
  },
  enterMobileTxtLight:{
       fontSize:20,
       fontWeight:'800',
       color:'#000000',
       letterSpacing:0.5,
       fontFamily:'sans-serif',
       alignSelf:'center',
       margin:15,
  },
  enterMobileTxtDark:{

  },
  enterMobileDescLight:{
       fontSize:13,
       fontWeight:'300',
       color:'#999999',
       letterSpacing:0.2,
       fontFamily:'sans-serif',
       alignSelf:'center',
       margin:0,
  },
  enterMobileDescDark:{

  },
  mobileInputDark:{
       backgroundColor: '#000000',
       margin:15,
       padding:20,
       borderRadius:15,
       alignSelf:'center',
       justifyContent:'center',
       elevation:10,
       shadowColor:'#e6f7ff',
  },
  mobileInputLight:{
       backgroundColor: '#ffffff',
       paddingStart:75,
       margin:30,
       padding:20,
       letterSpacing:2,
       fontSize:22,
       fontWeight:'800',
       fontFamily:'georgia',
       borderRadius:15,
       elevation:10,
       shadowColor:'#1ab2ff',  
  },
  otpInputLight:{
    backgroundColor: '#ffffff',
    fontSize:22,
    fontWeight:'800',
    width:100,
    justifyContent:'center',
    marginStart:105,
    marginTop:20,
    marginBottom:20,
    alignItems:'center',
    alignContent:'center',
    fontFamily:'georgia',
    borderRadius:5,    
    elevation:10,
    shadowColor:'#1ab2ff', 
  },
  otpInputDark:{

  },
  googleLoginLight:{
       backgroundColor: '#ffffff',
       margin:15,
       padding:20,
       borderRadius:15,
       alignSelf:'center',
       justifyContent:'center',
       elevation:5,
       shadowColor:'#1ab2ff',
  },
  googleLoginDark:{
       backgroundColor: '#000000',
       margin:15,
       padding:20,
       borderRadius:15,
       alignSelf:'center',
       justifyContent:'center',
       elevation:5,
       shadowColor:'#e6f7ff',
  },
  googleTextDark:{
       color:'#fff',
       marginStart:45,
       fontSize:18,
       fontWeight:'700',
       marginBottom:2,
  },
  googleTextLight:{
       color:'#000',
       marginStart:45,
       fontSize:18,
       fontWeight:'700',
       marginBottom:2, 
  },
  inputMobileContainerDark:{

  },
  inputMobileContainerLight:{

  },
  sendOtpButtonLight:{
       backgroundColor: '#006699',
       marginBottom:25,
       padding:20,
       borderRadius:15,
       alignSelf:'center',
       justifyContent:'center',
       elevation:10,
       shadowColor:'#1ab2ff',
  },
  sendOtpButtonDark:{
       backgroundColor: '#000000',
       margin:15,
       padding:20,
       borderRadius:15,
       alignSelf:'center',
       justifyContent:'center',
       elevation:10,
       shadowColor:'#e6f7ff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontFamily: 'arial',
    fontWeight: '900',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
})

export default LoginScreen;
