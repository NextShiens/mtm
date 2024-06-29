import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
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

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { userId, roomId, user } = route.params;
  const [currentUser, setCurrentUser] = useState({});

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
  console.log('user', currentUser);

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', roomId);

      socket.on('receive_message', (message) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, message));
      });
    }

    fetchChatHistory();

    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, [socket]);

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
    if (socket) {
      socket.emit('send_message', {
        roomId,
        ...message,
        receiverId: userId,
      });
    }
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
                navigateBack()
              }}>
              <Icon
                SVGIcon={<SVG.BackArrow fill={'black'} />}
                onPress={() => {
                  navigateBack()
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