import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator, Text, RefreshControl } from 'react-native';
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
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
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
            console.log('Conversations:', response.chats);
            setConversations(response.chats);
            setFilteredConversations(response.chats);
          }
        }
      } catch (error) {
        console.error('Error fetching user or conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndConversations();
  }, []);

  useEffect(() => {
    const filtered = conversations.filter(conversation =>
      conversation.chattedUser &&
      conversation.chattedUser.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const navigateToChatScreen = (conversation) => {
    if (conversation.chattedUser) {
      const otherUserId = conversation._doc.members.find(id => id !== currentUser.user._id);
      navigation.navigate('ChatScreen', {
        userId: otherUserId,
        roomId: conversation._doc.roomId,
        user: conversation.chattedUser,
      });
    } else {
      console.log('Cannot navigate: chattedUser is null');
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
      </View>
    );
  }

  return (
    <ScrollView

      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
        colors={[COLORS.dark.primary]}
        />
      }
    >
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.inbox}
          textColor={"black"}
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
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <Space mT={20} />
      {filteredConversations.length > 0 ? (
        filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation._doc._id}
            style={style.inboxContainer}
            onPress={() => navigateToChatScreen(conversation)}
          >
            <InboxCard
              conversation={conversation.chattedUser}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={style.noConversationsText}>No conversations available</Text>
      )}
    </ScrollView>
  );
};

export default InboxScreen;