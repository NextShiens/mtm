import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/theme';
import Icon from '../../../components/Icon/Icon';
import { SVG } from '../../../assets/svg';
import Space from '../../../components/Space/Space';
import { API_URL } from '../../../../constant';

const ChatScreen = ({ navigation, route }) => {

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { userId, roomId, user } = route.params;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    debugger
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
      console.log('User:', currentUser);
    };

    fetchUser();
  }, []);


  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('join_room', roomId);
    });

    newSocket.on('receive_message', (message) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, message));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchChatHistory();
  }, []);

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
        setMessages(data.messages.map(msg => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: msg.user,
        })));
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    socket.emit('send_message', {
      roomId,
      ...message,
      receiverId: userId,
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, [socket]);

  const renderBubble = (props) => {
    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header_Cont}>
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                SVGIcon={<SVG.BackArrow fill={'black'} />}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </TouchableOpacity>
            <Space mL={10} />
            <View style={styles.User_Cont}>
              <Image
                style={{ height: 50, width: 50, borderRadius: 25 }}
                source={user.userImages[0] ? { uri: user.userImages[0] } : IMAGES.userIcon}
              />
              <Space mL={10} />
              <View style={styles.UserDetail}>
                <Text style={styles.User_name}>{user.name}</Text>
                {/* <Text style={styles.Status}>onLine</Text> */}
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
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser._id,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default ChatScreen;