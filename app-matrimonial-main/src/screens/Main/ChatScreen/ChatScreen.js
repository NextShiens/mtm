import React, { useEffect, useState, useCallback, useContext, useReducer } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/theme';
import Icon from '../../../components/Icon/Icon';
import { SVG } from '../../../assets/svg';
import Space from '../../../components/Space/Space';

import { API_URL } from '../../../../constant';
import { SocketContext } from '../../../../SocketContext';
import { Text } from 'react-native-svg';

// Message reducer for more predictable state management
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGES':
      return GiftedChat.append(state, action.messages);
    case 'SET_MESSAGES':
      return action.messages;
    default:
      return state;
  }
};

const ChatScreen = ({ navigation, route }) => {
  const [messages, dispatchMessages] = useReducer(messageReducer, []);
  const { socket } = useContext(SocketContext);
  const { userId, roomId, user } = route.params;
  const [currentUser, setCurrentUser] = useState({});

  const renderMessage = (props) => {
    const { currentMessage } = props;
    return (
      <View style={currentMessage.sent ? styles.sentMessage : styles.receivedMessage}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#F3F5FE',
            },
            right: {
              backgroundColor: '#1D264D',
            },
          }}
          textStyle={{
            left: {
              color: 'black',
            },
            right: {
              color: COLORS.dark.white,
            },
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
        console.log('Current user:', user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', roomId);
      socket.on('receive_message', onReceive);
    }


    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, [socket, currentUser, messages]);

  useEffect(() => {
    fetchChatHistory();
  }, [roomId ,]);

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
            _id: msg.receiverId,
            name: msg.receiverName || "Unknown",
            avatar: msg.receiverAvatar || "default_avatar.png",
          },
          sent: msg.receiverId === currentUser?.user?._id,
        }));
        dispatchMessages({ type: 'SET_MESSAGES', messages: formattedMessages });
        console.log('Fetched chat history:', formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const onReceive = useCallback((message) => {
    console.log('Received message:', message);
    const newMessage = {
      _id: message._id || Math.random().toString(),
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: user?._id,
        name: user?.name,
        avatar: user?.avatar,
      },
      sent: false,
    };
    dispatchMessages({ type: 'ADD_MESSAGES', messages: [newMessage] });
  }, [user]);

  const onSend = useCallback((newMessages = []) => {
    console.log('Sending messages:', newMessages);
    const [message] = newMessages;
    const newMessage = {
      ...message,
      sent: true,
      user: {
        _id: currentUser?.user?._id,
        name: currentUser?.user?.name,
        avatar: currentUser?.user?.avatar,
      },
    };
    if (socket) {
      socket.emit('send_message', {
        roomId,
        ...newMessage,
        receiverId: userId,
      });
    }
    dispatchMessages({ type: 'ADD_MESSAGES', messages: [newMessage] });
    console.log('Updated messages:', messages);
  }, [socket, currentUser, userId, roomId]);

  const navigateBack = () => {
    navigation.goBack();
  };

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
          _id: currentUser?.user?._id,
        }}
        renderMessage={renderMessage}
      />
    </View>
  );
};

export default ChatScreen;