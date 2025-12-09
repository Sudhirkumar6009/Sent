import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Alert, Image, TextInput, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [about, setAbout] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentSurname, setCurrentSurname] = useState('');
  const [currentAbout, setCurrentAbout] = useState('');
  const [usernameEditable, setUsernameEditable] = useState(false);
  const [surnameEditable, setSurnameEditable] = useState(false);
  const [aboutEditable, setAboutEditable] = useState(false);
  const colorScheme = useColorScheme();
  const [error, setError] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        const uid = user.uid;
        try {
          const userDoc = await firestore().collection('users').doc(uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setCurrentUsername(data?.Username || '');
            setCurrentSurname(data?.Surname || '');
            setCurrentAbout(data?.About || '');
            setCurrentImage(data?.Photo || '');

            // Initialize states with fetched data
            setUsername(data?.Username || '');
            setSurname(data?.Surname || '');
            setAbout(data?.About || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    // Check if required fields are empty
    if (!username && !usernameEditable) {
      Alert.alert('Error', 'Username is required.');
      return;
    }
    if (!surname && !surnameEditable) {
      Alert.alert('Error', 'Surname is required.');
      return;
    }
    if (!about && !aboutEditable) {
      Alert.alert('Error', 'About section is required.');
      return;
    }
    if (!imageUri && !aboutEditable) {
      Alert.alert('Error', 'About section is required.');
      return;
    }
    // If validation passes, proceed with updating Firestore
    const user = auth().currentUser;

    if (user) {
      const uid = user.uid;
      try {
        await firestore().collection('users').doc(uid).set({
          Username: username || currentUsername,
          Photo: imageUri,
          Surname: surname || currentSurname,
          About: about || currentAbout,
        }, { merge: true }); // Use merge to update existing fields or add new ones

        setCurrentUsername(username || currentUsername);
        setCurrentSurname(surname || currentSurname);
        setCurrentAbout(about || currentAbout);
        setCurrentImage(imageUri);
        setIsEditModalVisible(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const handleSelectImage = async (source: 'camera' | 'library') => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    const mediaLibraryPermission = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

    if (source === 'camera') {
      if (cameraPermission === RESULTS.GRANTED) {
        launchCamera({ mediaType: 'mixed' }, (response) => {
          if (response.didCancel) {
            Alert.alert('User cancelled image picker');
          } else if (response.errorCode) {
            Alert.alert('ImagePicker Error: ', response.errorMessage);
          } else {
            const uri = response.assets?.[0]?.uri;
            if (uri) {
              setImageUri(uri);
              setIsModalVisible(false); // Close modal after selecting image
            } else {
              Alert.alert('No image selected');
            }
          }
        });
      } else {
        Alert.alert('Camera permission is required');
      }
    } else if (source === 'library') {
      if (mediaLibraryPermission === RESULTS.GRANTED) {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (response.didCancel) {
            Alert.alert('User cancelled image picker');
          } else if (response.errorCode) {
            Alert.alert('ImagePicker Error: ', response.errorMessage);
          } else {
            const uri = response.assets?.[0]?.uri;
            if (uri) {
              setImageUri(uri);
              setIsModalVisible(false); // Close modal after selecting image
            } else {
              Alert.alert('No image selected');
            }
          }
        });
      } else {
        Alert.alert('Media library permission is required');
      }
    }
  };

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

  const logOut = async () => {
    try {
      await auth().signOut();
      setUserLoggedIn(false);
    } catch (err: any) {
      Alert.alert('Error', err.message, [{ text: 'OK', onPress: () => setError(err.message) }]);
    }
  };

  const sureToLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => logOut() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContentPickImg}>
          <Button title="Use Camera" onPress={() => handleSelectImage('camera')} />
          <Button title="Choose from Gallery" onPress={() => handleSelectImage('library')} />
        </View>
      </Modal>

      <Modal isVisible={isEditModalVisible} onBackdropPress={() => setIsEditModalVisible(false)}>
        <View style={styles.modalContentEdit}>
          <View style={{ flexDirection: 'row', backgroundColor: "#fff", alignItems: 'center' }}>
            {currentImage ? (
              <Image source={{ uri: currentImage }} style={colorScheme === 'dark' ? styles.imageEditDark : styles.imageEditLight} />
            ) : (
              <Image source={require('./assets/Profile_img.png')} style={colorScheme === 'dark' ? styles.imageEditDark : styles.imageEditLight} />
            )}
            {imageUri && (
              <>
                <Icon name='double-arrow' size={35} color='black' style={{ marginHorizontal: 10 }} />
                <Image source={{ uri: imageUri }} style={colorScheme === 'dark' ? styles.imageEditDark : styles.imageEditLight} />
              </>
            )}
          </View>
          <Button title="Edit Photo" onPress={() => setIsModalVisible(true)} />

          <View style={{ flexDirection: 'row', margin: 20 }}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder={currentUsername}
              editable={usernameEditable}
            />
            <TouchableOpacity onPress={() => setUsernameEditable(!usernameEditable)}>
              <Icon name='edit' size={30} style={{marginTop:10}}/>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', margin: 20 }}>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
              placeholder={currentSurname}
              editable={surnameEditable}
            />
            <TouchableOpacity onPress={() => setSurnameEditable(!surnameEditable)}>
              <Icon name='edit' size={30} style={{marginTop:10}} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', margin: 20 }}>
            <TextInput
              style={styles.input}
              value={about}
              onChangeText={setAbout}
              placeholder={currentAbout}
              editable={aboutEditable}
            />
            <TouchableOpacity onPress={() => setAboutEditable(!aboutEditable)}>
              <Icon name='edit' size={30} style={{marginTop:10}}/>
            </TouchableOpacity>
          </View>

          <Button title="Done" onPress={handleUpdate} />
        </View>
      </Modal>

      {currentImage ? (
        <Image source={{ uri: currentImage }} style={colorScheme === 'dark' ? styles.imageDark : styles.imageLight} />
      ) : (
        <Image source={require('./assets/Profile_img.png')} style={colorScheme === 'dark' ? styles.imageDark : styles.imageLight} />
      )}

      <View style={{ flexDirection: 'row', borderColor: 'black', margin: 20 }}>
        <Icon name='person' style={{ margin: 20, color: 'black', borderRadius: 50 }} size={20} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={colorScheme === 'dark' ? styles.nameTxtDark : styles.nameTxtLight}>Name: </Text>
          <Text style={styles.username}>{currentUsername || 'Edit name'} {currentSurname || ''}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', borderColor: 'black', margin: 20 }}>
        <Icon name='info' style={{ margin: 18, borderRadius: 50, color: 'black' }} size={23} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={colorScheme === 'dark' ? styles.nameTxtDark : styles.nameTxtLight}>About: </Text>
          <Text style={styles.username}>{currentAbout || 'Write something about yourself.'}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setIsEditModalVisible(true)} style={colorScheme === 'dark' ? styles.editBtnDark : styles.editBtnLight}>
        <Text style={colorScheme === 'dark' ? styles.editProfileDark : styles.editProfileLight}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={{ backgroundColor: 'black', alignItems: 'center', padding: 10, margin: 10 }}
          onPress={sureToLogout}
        >
          <Text style={{ color: 'white' }}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  imageLight: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 100,
    margin: 25,
    resizeMode: 'cover', // Ensures the image fits the dimensions while maintaining aspect ratio
  },
  imageDark: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover', // Ensures the image fits the dimensions while maintaining aspect ratio
    marginTop: 10,
  },
  modalContentPickImg: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContentEdit: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 60,
    borderBottomWidth: 1,
    width: 200,
    fontSize: 20,
    borderBottomColor: 'grey',
    marginBottom: 0,
    paddingHorizontal: 8,
  },
  username: {
    fontSize: 18,
    color: 'black',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: 'green',
  },
  nameTxtLight: {
    marginTop: 0,
    marginBottom: 10,
    marginEnd: 20,
  },
  nameTxtDark: {},
  editBtnLight: {
    backgroundColor: '#b3d9ff',
    padding: 20,
    margin: 20,
    borderWidth: 0.4,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    alignItems: 'center',
  },
  editBtnDark: {},
  editProfileLight: {
    color: 'black',
    fontSize: 18,
  },
  editProfileDark: {
    color: 'white',
    fontSize: 18,
  },
  imageEditDark: {},
  imageEditLight: {
    width: 75,
    height: 75,
    elevation:10,
    alignSelf: 'center',
    borderRadius: 100,
    margin: 25,
    resizeMode: 'cover',
  },
});

export default ProfileScreen;
