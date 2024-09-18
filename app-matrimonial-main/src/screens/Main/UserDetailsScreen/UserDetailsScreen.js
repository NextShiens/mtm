import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgXml} from 'react-native-svg';
import {Fonts} from '../../../assets/fonts';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import Icon from '../../../components/Icon/Icon';
import {styles} from './styles';
import {Toast} from '../../../utils/native';
import {API_URL} from '../../../../constant';
import {checkIsPaidUser} from '../../../utils/subscriptionCheck';


const defaultProfileSvg = `
  <Svg height={size} width={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="50" fill={backgroundColor} />
    <Path
      d="M50 48C58.8366 48 66 40.8366 66 32C66 23.1634 58.8366 16 50 16C41.1634 16 34 23.1634 34 32C34 40.8366 41.1634 48 50 48ZM50 54C39.3178 54 18 59.3178 18 70V76C18 79.3137 20.6863 82 24 82H76C79.3137 82 82 79.3137 82 76V70C82 59.3178 60.6822 54 50 54Z"
      fill={iconColor}
    />
  </Svg>
`;

const maleUserSvg = `<svg width="181" height="207" viewBox="0 0 181 207" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M134.84 55.1933H71.4624V4.97703L107.364 2.19678C122.183 1.04946 134.84 12.7647 134.84 27.6279V55.1933Z" fill="#555A5E"/>
  <path d="M71.4626 4.97705H66.3955C55.2571 4.97705 46.2295 14.0063 46.2295 25.1431V55.1918L63.84 43.0475L71.4626 4.97705Z" fill="#555A5E"/>
  <path d="M134.84 50.5664C134.84 78.4635 115.006 101.08 90.5347 101.08C69.9616 101.08 52.6733 85.0959 47.6911 63.4384C46.7324 59.3363 46.2295 55.0142 46.2295 50.5664C46.2295 22.6851 66.0639 0.0688477 90.5347 0.0688477C115.006 0.0688477 134.84 22.6851 134.84 50.5664Z" fill="#555A5E"/>
  <path d="M180.535 168.311C172.692 176.436 163.749 183.509 153.974 189.261C153.706 189.418 153.423 189.591 153.141 189.748C134.736 200.42 113.362 206.534 90.5569 206.534C68.4436 206.534 47.6662 200.797 29.6549 190.723C28.8219 190.251 28.0046 189.78 27.1874 189.308C17.3802 183.509 8.40599 176.436 0.579102 168.295L2.73227 159.824C5.9699 147.062 16.0286 137.16 28.8219 134.096L32.7668 133.153L35.4229 132.524L48.1062 129.491L49.8351 129.082L50.228 128.988C52.0511 128.563 53.7957 127.935 55.4459 127.133C58.2906 125.782 60.8367 123.911 62.9742 121.648C65.9918 118.505 68.2078 114.591 69.3237 110.222L70.9897 103.731L71.4455 101.987L71.4769 101.861L73.5986 93.6096L74.243 91.1421H106.855L109.275 100.572L109.495 101.405L109.621 101.892L109.653 102.002L110.108 103.763L111.759 110.222C113.708 117.782 118.925 123.958 125.825 127.228H125.841C127.444 127.982 129.126 128.563 130.87 128.988L132.976 129.491L133.086 129.522L147.514 132.964L148.426 133.184L152.276 134.096C165.07 137.16 175.128 147.062 178.366 159.824L180.535 168.311Z" fill="#F4F4F4"/>
  <path d="M109.609 101.881C106.843 114.03 99.3537 122.743 90.5429 122.743C81.7259 122.743 74.2227 114.011 71.4629 101.848L73.5909 93.5968L74.229 91.1309H106.838L109.265 100.561L109.486 101.406L109.609 101.881Z" fill="#D2D4DA"/>
  <path d="M54.0642 55.6506C37.8273 37.4319 48.6608 81.9698 57.6429 76.7644C73.4318 67.6142 54.0642 55.6506 54.0642 55.6506Z" fill="#F4F4F4"/>
  <path d="M127.002 55.6506C143.239 37.4319 132.406 81.9698 123.424 76.7644C107.635 67.6142 127.002 55.6506 127.002 55.6506Z" fill="#F4F4F4"/>
  <path d="M128.308 42.5147C128.308 43.8977 128.23 45.2651 128.088 46.601C127.994 47.5754 127.632 50.9702 127.019 55.5909L127.004 55.6538C125.306 68.2743 121.644 89.9318 115.861 95.6998C111.711 99.8647 108.364 103.621 104.576 106.356C100.773 109.09 96.5133 110.772 90.541 110.772H90.5253C78.5964 110.772 73.5199 103.998 65.2215 95.6998C61.0723 91.5506 58.0076 79.213 55.9644 67.9128C55.8701 67.3784 55.7758 66.8283 55.6972 66.3097C55.4143 64.628 55.1471 62.962 54.8957 61.3746C53.5912 52.9348 52.9625 46.3338 52.9625 46.3338C52.8368 45.0765 52.7739 43.8034 52.7739 42.5147C52.7739 42.1846 52.7739 41.8546 52.7896 41.5245C52.8682 38.5541 53.2769 35.6622 53.9998 32.8961C54.0313 32.7703 54.0784 32.6446 54.1098 32.5189C58.3062 17.1794 71.9325 5.73772 88.3721 4.81044C89.0951 4.76329 89.8023 4.74756 90.5253 4.74756H90.541C111.397 4.74756 128.308 21.6587 128.308 42.5147Z" fill="#F4F4F4"/>
  <path d="M129.299 42.761C129.299 44.1803 129.219 45.5838 129.072 46.9542C128.977 47.9538 127.002 55.6487 127.002 55.6487C88.5517 53.9545 72.2347 35.665 72.2347 35.665C65.4608 55.5512 54.8961 61.3742 54.8961 61.3742C53.557 52.7128 51.9775 46.6808 51.9775 46.6808C51.8486 45.3904 51.7842 44.0844 51.7842 42.761C51.7842 42.4216 51.7842 42.0837 51.7999 41.7458C51.8801 38.6967 52.2997 35.7294 53.0415 32.891C53.0745 32.7621 53.1217 32.6332 53.1547 32.5044C57.461 16.7626 71.4441 5.02064 88.3144 4.06979C89.0562 4.02106 89.7823 4.00537 90.5241 4.00537H90.5399C111.943 4.00537 129.299 21.3597 129.299 42.761Z" fill="#555A5E"/>
  <path d="M72.7103 81.1027C65.1333 81.1027 58.9692 74.9387 58.9692 67.3617C58.9692 59.7847 65.1333 53.6206 72.7103 53.6206C80.2873 53.6206 86.4514 59.7847 86.4514 67.3617C86.4514 74.9387 80.2873 81.1027 72.7103 81.1027ZM72.7103 55.1939C65.9993 55.1939 60.5409 60.6522 60.5409 67.3632C60.5409 74.0742 66.0009 79.5326 72.7103 79.5326C79.4213 79.5326 84.8797 74.0742 84.8797 67.3632C84.8781 60.6522 79.4197 55.1939 72.7103 55.1939Z" fill="#D2D4DA"/>
  <path d="M108.68 81.1027C101.103 81.1027 94.9385 74.9387 94.9385 67.3617C94.9385 59.7847 101.103 53.6206 108.68 53.6206C116.257 53.6206 122.421 59.7847 122.421 67.3617C122.421 74.9387 116.255 81.1027 108.68 81.1027ZM108.68 55.1939C101.97 55.1939 96.5101 60.6522 96.5101 67.3632C96.5101 74.0742 101.97 79.5326 108.68 79.5326C115.391 79.5326 120.849 74.0742 120.849 67.3632C120.847 60.6522 115.389 55.1939 108.68 55.1939Z" fill="#D2D4DA"/>
  <path d="M96.5097 67.3616H94.9381C94.9381 65.0214 93.0348 63.1181 90.6945 63.1181C88.3543 63.1181 86.4511 65.0214 86.4511 67.3616H84.8794C84.8794 64.1538 87.4884 61.5464 90.6945 61.5464C93.9007 61.5464 96.5097 64.1554 96.5097 67.3616Z" fill="#D2D4DA"/>
  <path d="M180.535 168.311C172.692 176.436 163.749 183.509 153.974 189.261C153.706 189.418 153.423 189.591 153.141 189.748C143.553 195.312 133.149 199.634 122.163 202.495C112.073 205.135 101.48 206.534 90.5569 206.534C79.7281 206.534 69.2294 205.166 59.2179 202.557C48.7663 199.886 38.8491 195.862 29.6549 190.723C28.8219 190.251 28.0046 189.78 27.1874 189.308C17.3802 183.509 8.40599 176.436 0.579102 168.295L2.73227 159.824C5.9699 147.062 16.0286 137.161 28.8219 134.096L32.7668 133.153L35.4229 132.524L48.1062 129.491L49.8351 129.082L50.228 128.988C52.0511 128.564 53.7957 127.935 55.4459 127.133L55.4931 127.149L68.9308 140.587C71.8227 143.463 75.2175 145.726 78.9109 147.266C82.6043 148.791 86.612 149.608 90.6984 149.608C98.8553 149.608 106.682 146.355 112.466 140.587L125.825 127.228H125.841C127.444 127.982 129.126 128.564 130.87 128.988L132.976 129.491L133.086 129.522L147.514 132.964L148.426 133.184L152.276 134.096C165.07 137.161 175.128 147.062 178.366 159.824L180.535 168.311Z" fill="#F97B22"/>
  <path d="M122.414 198.565C122.414 199.901 122.336 201.206 122.163 202.495C112.073 205.135 101.48 206.534 90.5568 206.534C79.728 206.534 69.2293 205.166 59.2178 202.557C59.0449 201.253 58.9663 199.917 58.9663 198.565C58.9663 181.041 73.1742 166.833 90.6982 166.833C108.222 166.833 122.414 181.041 122.414 198.565Z" fill="#1D264D"/>
</svg>`;

const femaleUserSvg = `<svg width="182" height="207" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M214.962 211.76C192.22 235.335 160.316 249.998 124.986 249.998C89.6555 249.998 57.7356 235.335 35.0098 211.76L37.1629 203.273C40.4162 190.527 50.4589 180.626 63.2677 177.561L84.6734 172.453C86.4808 172.013 88.2096 171.4 89.8441 170.615C89.9227 170.583 90.0012 170.536 90.0798 170.489C92.8459 169.137 95.3291 167.314 97.4194 165.114C100.421 161.955 102.637 158.057 103.769 153.672L105.435 147.197L105.875 145.453L105.906 145.311L108.044 137.06L108.672 134.593H141.284L143.72 144.023L143.94 144.871L144.065 145.343L144.081 145.453L144.537 147.213L146.203 153.672C148.167 161.279 153.432 167.503 160.395 170.74C161.951 171.463 163.601 172.045 165.298 172.453L186.704 177.561C199.513 180.626 209.556 190.527 212.809 203.273L214.962 211.76Z" fill="#F4F4F4"/>
<path d="M214.961 211.758C192.219 235.333 160.315 249.996 124.985 249.996C89.6545 249.996 57.7346 235.333 35.0088 211.758L37.1619 203.271C40.4152 190.525 50.4579 180.624 63.2668 177.559L84.6724 172.452C86.4798 172.012 88.2086 171.399 89.8431 170.613L108.814 202.096C116.232 214.406 134.083 214.406 141.501 202.096L160.394 170.739C161.95 171.462 163.6 172.043 165.297 172.452L186.703 177.559C199.512 180.624 209.555 190.525 212.808 203.271L214.961 211.758Z" fill="#F97B22"/>
<path d="M130.11 223.567C130.11 225.807 128.294 227.622 126.055 227.622C123.815 227.622 122 225.807 122 223.567C122 221.327 123.815 219.512 126.055 219.512C128.294 219.512 130.11 221.327 130.11 223.567Z" fill="#1D264D"/>
<path d="M130.11 238.712C130.11 240.952 128.294 242.767 126.055 242.767C123.815 242.767 122 240.952 122 238.712C122 236.472 123.815 234.657 126.055 234.657C128.294 234.657 130.11 236.472 130.11 238.712Z" fill="#1D264D"/>
<path d="M144.069 145.345C141.302 157.494 133.814 166.207 125.003 166.207C116.186 166.207 108.683 157.475 105.923 145.312L108.051 137.061L108.689 134.595H141.298L143.724 144.023L143.946 144.869L144.069 145.345Z" fill="#D2D4DA"/>
<path d="M83.9791 99.1135C67.7425 80.8951 78.5758 125.432 87.5577 120.227C103.346 111.077 83.9791 99.1135 83.9791 99.1135Z" fill="#F4F4F4"/>
<path d="M166.024 99.1135C182.261 80.8951 171.427 125.432 162.446 120.227C146.657 111.077 166.024 99.1135 166.024 99.1135Z" fill="#F4F4F4"/>
<path d="M167.849 85.3558C167.849 89.5678 167.378 93.654 166.498 97.5517V97.5674C161.751 118.643 144.982 134.202 125.006 134.202C101.338 134.202 82.1479 112.341 82.1479 85.3558C82.1479 70.3938 88.0416 57.0192 97.3299 48.0609C104.795 40.8471 114.461 36.4937 125.006 36.4937C148.677 36.4937 167.849 58.3708 167.849 85.3558Z" fill="#555A5E"/>
<path d="M162.775 85.9837C162.775 87.3667 162.696 88.7183 162.539 90.0699C162.193 93.6533 158.217 131.262 150.311 139.168C146.178 143.317 142.831 147.089 139.027 149.808C135.224 152.542 130.98 154.24 124.992 154.24C119.02 154.24 114.761 152.542 110.958 149.823C107.17 147.089 103.823 143.317 99.6734 139.168C95.9329 135.427 93.0725 125.007 91.0608 114.697L91.0451 114.682C90.8408 113.566 90.6208 112.466 90.4322 111.366C90.3379 110.831 90.2436 110.297 90.1493 109.763C88.3262 99.1068 87.4147 89.7871 87.4147 89.7871C87.3046 88.5455 87.2261 87.2724 87.2261 85.9837C87.2261 85.6536 87.2418 85.3236 87.2418 84.9935C87.3203 82.0231 87.7447 79.1314 88.4676 76.3653C88.4991 76.2395 88.5305 76.1138 88.5619 75.9881C90.7151 68.1614 95.3043 61.3562 101.497 56.437C107.422 51.7063 114.793 48.7202 122.839 48.2802C123.547 48.233 124.27 48.2173 124.992 48.2173C135.428 48.2173 144.874 52.445 151.71 59.2659C158.547 66.1025 162.775 75.548 162.775 85.9837Z" fill="#F4F4F4"/>
<path d="M88.3872 98.043C88.3872 98.043 107.387 101.666 125.159 72.1975V42.4873L99.3368 52.9591L86.1728 71.9555L84.6797 88.0286L88.3872 98.043Z" fill="#555A5E"/>
<path d="M98.9656 99.0072C97.779 99.4992 96.4179 98.9365 95.926 97.7499L91.2268 86.4153C90.7349 85.2287 91.2975 83.8677 92.4841 83.3757C93.6707 82.8838 95.0318 83.4465 95.5237 84.6331L100.223 95.9677C100.715 97.1559 100.152 98.5153 98.9656 99.0072Z" fill="#D2D4DA"/>
<path d="M161.93 98.043C161.93 98.043 142.93 101.666 125.158 72.1975V42.4873L150.98 52.9591L164.144 71.9555L165.637 88.0286L161.93 98.043Z" fill="#555A5E"/>
<path d="M171.506 153.326V208.522C156.686 208.522 144.663 196.499 144.663 181.663V144.902C146.454 143.126 148.277 141.193 150.305 139.166C152.269 137.201 153.982 133.413 155.475 128.746C158.54 130.097 161.306 131.999 163.648 134.341C168.504 139.213 171.506 145.908 171.506 153.326Z" fill="#555A5E"/>
</svg>`;

const UserDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const userId = route.params?.userId || '';
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const style = styles;
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingInterest, setIsSendingInterest] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  const handleContactPress = () => {
    if (!hasSubscription) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriptionStatus = await checkIsPaidUser();
      setHasSubscription(subscriptionStatus);
    };

    checkSubscription();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/userDetails/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserDetails(data.user);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load user details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const saveUser = async () => {
    setIsSaving(true);
    const apiUrl = `${API_URL}/user/saveUser`;
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId: userId}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'An error occurred while saving user',
        );
      }
      await response.json();
      Toast('send interest successfully');
    } catch (error) {
      console.error('Error saving user:', error);
      Toast('An unexpected error occurred'); 
    } finally {
      setIsSaving(false);
    }
  };

  const sendInterest = async () => {
    setIsSendingInterest(true);
    const apiUrl = `${API_URL}/user/sendInterest`;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: userId,
        }),
      });

      console.log('response', response);

      if (!response.ok) {
        let errorMessage = 'An error occurred while sending interest';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      await response.json();
      Toast('Interest sent successfully');

    } catch (error) {
      console.error('Error sending interest:', error);
      Toast('Error sending interest:', error);
    } finally {
      setIsSendingInterest(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const carouselData = [
    {
      id: '0',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || true,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[0] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Profile',
    },
    {
      id: '1',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.workLocation || 'N/A',
      isVerified: userDetails?.isActive || true,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[1] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Work',
    },
    {
      id: '2',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || true,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[2] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      education: userDetails?.highestDegree || 'N/A',
    },
    {
      id: '3',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || true,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[3] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Religion',
    },
  ];
  const renderItem = ({item, index}) => (
    console.log('item', item),
    (
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
        {userDetails?.userImages && userDetails?.userImages.length > 0 ? (
          <Image
            source={{uri: userDetails.userImages[0]}}
            style={styles.image}
          />
        ) : item?.gender === 'male' ? (
          <SvgXml xml={maleUserSvg} width="100%" height="100%" />
        ) : item?.gender === 'female' ? (
          <SvgXml xml={femaleUserSvg} width="100%" height="100%" />
        ) : (
          <SvgXml
         xml={
        userDetails?.gender === 'male'
          ? maleUserSvg
          : userDetails?.gender === 'female'
          ? femaleUserSvg
          : maleUserSvg 
      }
      width="100%"
      height="100%"
    />
        )}
        {/* <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={styles.gradientOverlay}
        /> */}
        </View>
      </View>
    )
  );
  return (
    <View>
      <ScrollView style={[STYLES.bgColor(COLORS.dark.white)]}>
        <View style={styles.container}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={() => navigation.goBack()}
            textColor="black"
            iconRight={
              <TouchableOpacity
                style={styles.rightIconContainer}
                onPress={async () => {
                  await saveUser();
                  navigation.navigate('SavedUserScreen');
                }}>
                <Image
                  source={IMAGES.savedIcon}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            }
            title={LABELS.matches}
            extraStyle={{
              container: {width: '100%', position: 'absolute', zIndex: 1},
            }}
          />
        </View>

        <View style={style.container}>
          <View style={style.carouselContainer}>
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                right: 15,
                top: 15,
                padding: 7,
                backgroundColor: COLORS.dark.white,
                borderRadius: 50,
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={IMAGES.correct}></Image>
            </View>

            <Carousel
              data={carouselData}
              renderItem={renderItem}
              sliderWidth={screenWidth - 60}
              itemWidth={screenWidth}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              containerStyle={style.paginationContainer}
              dotStyle={style.dotStyle}
              inactiveDotStyle={style.inactiveDotStyle}
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.6}
            />
          </View>

          <View style={style.contentContainer}>
            <View style={style.basicDetailsContainer}>
              <Space mT={20} />
              <AppText
                title={userDetails?.name || 'N/A'}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsSemiBold)}
              />
              <Space mT={13} />
              <AppText
                title={
                  userDetails?.description ||
                  'This user prefers to keep an air of mystery about them.'
                }
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              />
              <Space mT={13} />
              <View
                style={{flexDirection: 'row', alignItems: 'start', gap: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48%',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={IMAGES.briefcaseColored} // Update with the correct path
                    style={{width: 13, height: 13, marginRight: 8}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular', // Update this to match your font setup
                      color: '#333',
                    }}>
                    {userDetails?.occupation || 'N/A'}
                  </Text>
                </View>

                {/* Second item - City with icon */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '49%',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 10,
                    gap: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginHorizontal: 5,
                  }}>
                  <Icon
                    SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />} // Update with the correct path
                    style={{width: 40, height: 40}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular', // Update this to match your font setup
                      color: '#333',
                    }}>
                    {userDetails?.city || 'N/A'}
                  </Text>
                </View>
              </View>
              <Space mT={20} />

              <View
                style={{
                  backgroundColor: COLORS.dark.lightGrey,
                  height: 1,
                }}></View>
              <Space mT={20} />
              <AppText
                title={LABELS.basicInfo}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>
            <Space mT={12} />
            <View style={style.basicInfoContainer}>
              <View style={[style.infoCont1]}>
              <AppText
                  title={LABELS.fullName}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Text style={{maxWidth:'80%',fontSize:16,color:'black'}}>{userDetails?.name || 'N/A'}</Text>
                <Space mT={20} />

                <AppText
                  title={LABELS.maritalStatus}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.maritalStatus || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />

                <AppText
                  title={LABELS.height}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.height || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
                <AppText
                  title={LABELS.profileCreatedFor}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.profileCreatedFor || 'Self'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
              </View>

              <View style={style.infoCont2}>
                <View>
                  <AppText
                    title={LABELS.age}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.age || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={20} />

                  <AppText
                    title={LABELS.Gender}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.gender || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={20} />

                  <AppText
                    title={LABELS.cast}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.sect || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={20} />
                  <AppText
                    title={LABELS.disability}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.disability || 'No'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={20} />
                </View>
              </View>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: COLORS.dark.lightGrey,
                }}></View>
              <Space mT={20} />

              <AppText
                title={LABELS.contactDetails}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />

              <Space mT={17} />
              <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={handleContactPress}>
            <AppText
              title={LABELS.phoneNumber}
              variant={'h4'}
              color={COLORS.dark.gray}
            />
              <Text
                title={
                  hasSubscription
                    ? userDetails?.phone || 'N/A'
                    : '+91 34********'
                }
                variant={'h4'}
                color={COLORS.dark.black}
                style={style.test}
              >{
                hasSubscription
                  ? userDetails?.phone || 'N/A'
                  : '+91 34********'
              }</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%' }}>
            <TouchableOpacity onPress={handleContactPress}>
            <AppText
              title={LABELS.email}
              variant={'h4'}
              color={COLORS.dark.gray}
            />
              <Text
              style={style.test}
              >{
                hasSubscription
                  ? userDetails?.email || 'N/A'
                  : '******@gmail.com'
              }</Text>
            </TouchableOpacity>
          </View>
        </View>

              <Space mT={20} />
              <View
                style={{
                  height: 1,
                  backgroundColor: 'lightgrey',
                  width: '100%',
                }}></View>
              <Space mT={15} />
              <AppText
                title={LABELS.locationInfo}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />
              <AppText
                title={LABELS.presentAddress}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.city + ', India' || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <AppText
                title={LABELS.PreminentAddress}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.city + ', India' || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: COLORS.dark.lightGrey,
                }}></View>
              <Space mT={20} />
              <AppText
                title={LABELS.educationCareer}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>
            <Space mT={10} />
            <View style={style.basicInfoContainer}>
              <View style={style.infoCont1}>
                <AppText
                  title={LABELS.highestDegree}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.highestDegree || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={15} />

                <AppText
                  title={LABELS.occupation}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.occupation || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={10} />
              </View>

              <View style={style.infoCont2}>
                <AppText
                  title={LABELS.employedIn}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.employedIn || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={10} />

                <AppText
                  title={LABELS.AnnualIncome}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.annualIncome + ' INR' || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={10} />
              </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: COLORS.dark.lightGrey,
                }}></View>
              <Space mT={20} />
              <AppText
                title={LABELS.partnerExpectation}
                variant={'h3'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View style={{width: '60%'}}>
                  <AppText
                    title={LABELS.maritalExpectation}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.lookingFor || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />

                  <AppText
                    title={LABELS.age}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={`${userDetails?.ageFrom || 'N/A'} - ${
                      userDetails?.ageTo || 'N/A'
                    }`}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />

                  <AppText
                    title={LABELS.education}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.Education?.education || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />
                  <AppText
                    title={LABELS.motherToungue}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.motherTongue || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                </View>

                <View style={{width: '40%'}}>
                  <AppText
                    title={LABELS.cast}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.horoscopeDetails?.caste || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />

                  <AppText
                    title={LABELS.height}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={`${userDetails.heightFrom || 'N/A'} - ${
                      userDetails.heightTo || 'N/A'
                    }`}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />

                  <AppText
                    title={LABELS.occupation}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.occupation || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <Space mT={15} />
                  <AppText
                    title={LABELS.AnnualIncome}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.annualIncome || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                </View>
              </View>
            </View>
          </View>
          <Space mT={80} />
          <Space mT={20} />
        </View>
        <View style={{height: 60}} />
        <Modal
          transparent={true}
          visible={isRequestSent}
          animationType="slide"
          onRequestClose={() => setIsRequestSent(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <View style={styles.box}>
                <View style={styles.contentbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={IMAGES.check}
                      style={styles.checkmarkImage}
                    />
                  </View>
                  <View style={styles.textbox}>
                    <Text style={styles.titlebox}>Request Sent</Text>
                    <Text style={styles.messagebox}>
                      Your request has been sent. We'll update you soon.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsRequestSent(false)}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 25,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'relative',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 5,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 16, color: '#666' }}>X</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'left',
                color: '#000',
              }}>
              Upgrade Membership
            </Text>

            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#ccc',
                marginVertical: 10,
              }}
            />

            <Text
              style={{
                fontSize: 15,
                textAlign: 'left',
                marginBottom: 25,
                color: '#666',
              }}>
              Become a premium member to view contacts of this profile
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  marginHorizontal: 5,
                  borderRadius: 30,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#666', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  marginHorizontal: 5,
                  borderRadius: 30,
                  backgroundColor: '#ff6600',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('MembershipPlan');
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Upgrade Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          position: 'absolute', // Change from 'fixed' to 'absolute'
          bottom: 0,
          justifyContent: 'center',
          paddingVertical: 15,
          backgroundColor: 'white', // Optional: to create a background for the button container
          elevation: 5, // Optional: add shadow/elevation for better visibility
        }}>
        <TouchableOpacity
          style={{
            width: '48%',
            height: 50,
            backgroundColor: COLORS.dark.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 30,
          }}
          onPress={() => {
            setIsRequestSent(true); // Trigger modal visibility
            sendInterest(); // Assuming this is the function to send the request
          }}>
          <Image
            source={IMAGES.sendIcon}
            style={{width:14,height:14}}
          />
          <Space mL={10} />
          <Text
            style={{fontFamily: Fonts.PoppinsRegular,color:'white',fontSize:14}}
          >Send Interest</Text>
        </TouchableOpacity>
        <Space mL={10} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatScreen', {
              userId: userDetails?._id,
              roomId: `${userDetails?._id}_${currentUser.user._id}`,
              user: userDetails,
            });
          }}
          style={{
            width: '48%',
            height: 50,
            backgroundColor: COLORS.dark.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 30,
          }}>
          <Image source={IMAGES.chatIcon} style={{width:14,height:14}} />
          <Space mL={10} />
          <Text
            style={{fontFamily: Fonts.PoppinsRegular,color:'white',fontSize:14}}
          >Chat Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailsScreen;