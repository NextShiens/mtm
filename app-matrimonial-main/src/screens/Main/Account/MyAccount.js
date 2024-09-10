import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import {Toast} from '../../../utils/native';
import * as ImagePicker from 'react-native-image-picker';

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]); // Store selected images
  const [initialFullName, setInitialFullName] = useState('');
  const [initialPhone, setInitialPhone] = useState('');
  const screenWidth = Dimensions.get('window').width; // Get the screen width

  // Function to handle image selection
  const selectImages = () => {
    if (images.length >= 3) {
      Toast('You can only upload up to 3 images.');
      return;
    }

    const options = {
      mediaType: 'photo',
      selectionLimit: 3 - images.length, // Limit to remaining images
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const selectedImages = response.assets.map(asset => asset.uri);
        setImages(prevImages => [...prevImages, ...selectedImages]); // Append the new images to the existing ones
        response.assets.forEach(asset => uploadImage(asset)); // Upload each selected image
      }
    });
  };

  const uploadImage = async imageFile => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const formData = new FormData();
      const fileUri = imageFile.uri;
      const filename = imageFile.fileName || fileUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('file', {uri: fileUri, name: filename, type});

      const response = await fetch(`${API_URL}/user/uploadFile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log('response', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      Toast('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Toast('Error uploading image: ' + error.message);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');

      // Build the request body dynamically based on changes
      const updatedFields = {};
      if (phone !== initialPhone) {
        updatedFields.phone = phone;
      }
      if (fullName !== initialFullName) {
        updatedFields.name = fullName;
      }
      if (images.length > 0) {
        updatedFields.userImages = images;
      }

      const response = await fetch(`${API_URL}/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log('result', result);
        Toast(result.message);
      } else {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (updatedFields.phone) {
            parsedUser.user.phone = phone;
          }
          if (updatedFields.name) {
            parsedUser.user.name = fullName;
          }
          if (images.length > 0) {
            parsedUser.user.userImages = images;
          }
          await AsyncStorage.setItem('theUser', JSON.stringify(parsedUser));
        }
        console.log('user data:', userData);
        Toast('Profile Updated Successfully');
      }
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log('User data:', userData);
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const user = parsedUser.user;
          setEmail(user.email);
          setPhoneNumber(user.phone);
          setPassword(user.password);
          setFullName(user.name);
          setInitialPhone(user.phone);
          setInitialFullName(user.name);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);

  // Function to delete an image from the images array
  const deleteImage = uri => {
    setImages(images.filter(image => image !== uri));
  };

  // Render each image in the FlatList
  const renderImage = ({item}) => (
    <View style={styles.imageWrapper}>
      <Image source={{uri: item}} style={styles.imagePreview} />
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => deleteImage(item)}>
        <Text style={styles.deleteIconText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.flexrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={styles.heading}>Account</Text>
        </View>

        {/* Image Upload Section */}
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={selectImages}>
            <Image
              source={require('../../../assets/images/appleIcon.png')}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>
              Drag & drop files or <Text style={styles.browseText}>Browse</Text>
            </Text>
          </TouchableOpacity>

          {/* Display selected images in a FlatList (horizontal slider) */}
          {images.length > 0 && (
            <FlatList
              data={images}
              renderItem={renderImage}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              decelerationRate="fast"
              contentContainerStyle={styles.flatlistContainer}
            />
          )}
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Full Name"
            placeholderTextColor={'#ccc'}
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
          />
          <Text style={styles.text}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder={email}
            placeholderTextColor={'#ccc'}
            value={email}
            editable={false}
            keyboardType="email-address"
          />
          <Text style={styles.text}>Phone Number</Text>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Phone Number"
            placeholderTextColor={'#ccc'}
            value={phone}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Password"
            placeholderTextColor={'#ccc'}
            value={password}
            editable={false}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}>
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Loading...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    width: '85%',
    fontWeight: '700',
  },
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#FF7F00',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  uploadText: {
    color: '#333',
    fontSize: 14,
  },
  browseText: {
    color: '#FF7F00',
    fontWeight: 'bold',
  },
  flatlistContainer: {
    marginTop: 20,
  },
  imageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  imagePreview: {
    width: Dimensions.get('window').width / 3 - 20, // Adjust to show 3 images per row
    height: 100,
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputText: {
    color: '#000',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF7F00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
