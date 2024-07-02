import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
=======
import { ScrollView, TouchableOpacity, View, Image,ActivityIndicator } from 'react-native';
>>>>>>> Stashed changes
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import InboxCard from '../../../components/InboxCard/InboxCard';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';

const InboxScreen = ({ navigation }) => {
  const style = styles;
  const [currentUser, setCurrentUser] = useState({});
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserAndConversations = async () => {
      try {
        const userString = await AsyncStorage.getItem('theUser');
        const token = await AsyncStorage.getItem('AccessToken');
        if (userString) {
          const user = JSON.parse(userString);
          setCurrentUser(user);

          const mainresponse = await fetch(`${API_URL}/user/getAllConversation`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          const response = await mainresponse.json();

          if (response.success) {
            console.log('Conversations: fromfas', JSON.stringify(response.chats));
            setConversations(response.chats);
          }
        }
      } catch (error) {
        console.error('Error fetching user or conversations:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchUserAndConversations();
  }, []);

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };
<<<<<<< Updated upstream

  const navigateToChatScreen = (conversation) => {
    console.log('Navigating with conversation:',(conversation));
    // const otherUserId = conversation.roomId.split("_").find(id => id !== currentUser.user._id);
    // navigation.navigate('ChatScreen', {
    //   userId: otherUserId,
    //   roomId: conversation.roomId,
    //   user: {
    //     _id: otherUserId,
    //     name: conversation.chattedUser.name,
    //     userImages: conversation.chattedUser.userImages,
    //   }
    // });
  };

=======
  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="xl" color={COLORS.dark.primary} />
      </View>
    );
  }
>>>>>>> Stashed changes
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.inbox}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
            </TouchableOpacity>
          }
        />
      </View>
      <Space mT={20} />
      <View style={style.searchBoxContainer}>
        <AppInput
          iconLeft={<SVG.magnifyingGlass fill={'black'} />}
          extraStyle={{
            textInputCont: {
              width: '100%',
              backgroundColor: COLORS.dark.searchBox,
              borderWidth: 0,
            },
          }}
          placeholder={LABELS.searchHere}
        />
      </View>
      <Space mT={20} />
      {Array.isArray(conversations) ? (
        conversations.map((conversation) => (
          <TouchableOpacity
            key={conversation._id}
            style={style.inboxContainer}
            onPress={() => navigateToChatScreen(conversation)}
          >
            <InboxCard conversation={conversation} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No conversations available</Text>
      )}
    </ScrollView>
  );
};

export default InboxScreen;