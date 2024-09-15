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
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import {Toast} from '../../../utils/native';
import * as ImagePicker from 'react-native-image-picker';
import {Path, Svg} from 'react-native-svg';
import Clipboard from '@react-native-clipboard/clipboard';


const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [initialUserData, setInitialUserData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const screenWidth = Dimensions.get('window').width; // Get the screen width
  const [userId, setUserId] = useState('');
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
        response.assets.forEach(asset => uploadImage(asset)); // Upload each selected image
      }
    });
  };

  const uploadImage = async imageFile => {
    try {
      if (images.length >= 3) {
        Toast('You can upload only 3 images');
        return;
      }
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const formData = new FormData();

      // Use File instead of Blob if possible
      const fileUri = imageFile.uri;
      const filename = imageFile.name || fileUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('file', {uri: fileUri, name: filename, type});

      const response = await fetch(`${API_URL}/user/uploadFile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set the Content-Type header for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setImages(prevImages => [...prevImages, result.fileUrl]);
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

      const userProfile = {};

      // Build the request body dynamically based on changes
      if (fullName !== initialUserData.name) userProfile.name = fullName;
      if (phone !== initialUserData.phone) userProfile.phone = phone;
      if (images.length >= 0) userProfile.userImages = images;

      const response = await fetch(`${API_URL}/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log('result', result);
        Toast(result.message);
      } else {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (userProfile.phone) {
            parsedUser.user.phone = phone;
          }
          if (userProfile.name) {
            parsedUser.user.name = fullName;
          }
          if (userProfile.userImages) {
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

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('theUser');
      console.log('User data:', userData);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        const user = parsedUser.user;
        setUserId(user._id);
        setEmail(user.email);
        setPhoneNumber(user.phone);
        setPassword(user.password);
        setFullName(user.name);
        setImages(user.userImages);
        setInitialUserData(user);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    setRefreshing(false);
  };
  const copyToClipboard = () => {
    Clipboard.setString(userId);
    Toast('User ID copied to clipboard');
  };
  // Function to delete an image from the images array
  const deleteImage = uri => {
    setImages(prevImages => prevImages.filter(image => image !== uri));
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
              source={require('../../../assets/images/cloud-computing.png')}
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
          <Text style={styles.text}>Profile ID</Text>

          <View >
            <TextInput
              style={[styles.input, styles.inputText]}
              placeholder="Full Name"
              placeholderTextColor={'#ccc'}
              value={userId}
              onChangeText={setFullName}
              keyboardType="default"
              editable={false}
            />
            <TouchableOpacity style={{position:'absolute',right:10,top:13}}
            onPress={copyToClipboard}>
              <Svg
                width="31"
                height="31"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M7.06835 4.24266C7.0671 3.0135 7.04877 2.37683 6.69085 1.941C6.62178 1.8567 6.5446 1.77939 6.46044 1.71016C6.00002 1.3335 5.31669 1.3335 3.95002 1.3335C2.58335 1.3335 1.90002 1.3335 1.44002 1.71058C1.35585 1.77981 1.27868 1.85712 1.2096 1.94141C0.83252 2.40016 0.83252 3.0835 0.83252 4.45016C0.83252 5.81683 0.83252 6.50016 1.21002 6.95975C1.27946 7.04419 1.35627 7.121 1.44044 7.19016C1.87669 7.5485 2.51335 7.56683 3.74252 7.56766"
                  stroke="#949494"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M5.84518 4.26059L7.08101 4.24268M5.83934 9.66768L7.07518 9.64976M9.15518 6.34268L9.14351 7.57601M3.75434 6.34851L3.74268 7.58184M4.78643 4.26059C4.43976 4.32268 3.88226 4.38643 3.75434 5.10393M8.12309 9.64976C8.47101 9.59268 9.02893 9.53726 9.16809 8.82226M8.12309 4.26059C8.46976 4.32268 9.02726 4.38643 9.15518 5.10393M4.79184 9.64893C4.44476 9.58726 3.88768 9.52351 3.75934 8.80601"
                  stroke="#949494"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
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
        <View height={15}></View>
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
    width: Dimensions.get('window').width / 2.2, // Adjust to show 3 images per row
    height: 140,
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
