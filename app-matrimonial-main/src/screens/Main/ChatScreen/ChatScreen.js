import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, TouchableOpacity, Image, Text, Alert, SafeAreaView, StatusBar } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URL } from '../../../../constant';
import { SocketContext } from '../../../../SocketContext';
import { SVG } from '../../../assets/svg';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/theme';
import Space from '../../../components/Space/Space';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { userId, roomId, user } = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('theUser');
        if (userString) {
          const user = JSON.parse(userString);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit('join_room', roomId);
      socket.on('receive_message', onReceiveMessage);

      return () => {
        socket.off('receive_message');
      };
    }
  }, [socket, currentUser, roomId]);

  useEffect(() => {
    if (currentUser) {
      fetchChatHistory();
    }
  }, [currentUser, roomId]);

  const fetchChatHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/getMessages?roomId=${roomId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        const formattedMessages = data.messages.map(msg => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.receiverId === currentUser.user._id ? userId : currentUser.user._id,
            name: msg.receiverId === currentUser.user._id ? user.name : currentUser.user.name,
          },
        }));
        setMessages(formattedMessages.reverse());
      } else {
        console.error('Failed to fetch messages:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      Alert.alert('Error', 'Failed to load chat history');
    }
  };

  const onReceiveMessage = useCallback((message) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, [message]));
  }, []);

  const onSend = useCallback((newMessages = []) => {
    const [messageToSend] = newMessages;
    if (socket && currentUser) {
      const messageData = {
        _id: Math.random().toString(),
        roomId,
        user: {
          _id: currentUser.user._id,
          name: currentUser.user.name,
        },
        receiverId: userId,
        text: messageToSend.text,
        createdAt: new Date(),
      };

      socket.emit('send_message', messageData);
      setMessages(previousMessages => GiftedChat.append(previousMessages, [messageData]));
    }
  }, [socket, currentUser, userId, roomId]);
  const navigateBack = () => {
    navigation.goBack();
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007AFF',
          },
          left: {
            backgroundColor: '#E5E5EA',
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',
          },
          left: {
            color: '#000000',
          },
        }}
      />
    );
  };


  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header_Cont}>
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={navigateBack}>
              <Icon
                SVGIcon={<SVG.BackArrow fill={'black'} />}
                onPress={navigateBack}
              />
            </TouchableOpacity>
            <Space mL={10} />
            <View style={styles.User_Cont}>
              <Image
                style={{ height: 50, width: 50, borderRadius: 25 }}
                source={user?.userImages?.[0] ? { uri: user?.userImages?.[0] } : IMAGES.userIcon}
              />
              <Space mL={10} />
              <View style={styles.UserDetail}>
                <Text style={styles.User_name}>{user.name}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotificationScreen');
            }}>
            <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: currentUser.user._id,
          name: currentUser.user.name,
        }}
        renderBubble={renderBubble}
        renderAvatar={null}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={() => (
          <Icon name="chevron-down-circle" size={24} color="#007AFF" />
        )}
      />
    </View>

  );
};

export default ChatScreen;