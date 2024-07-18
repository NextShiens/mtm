import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Image, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../../constant';
import { SocketContext } from '../../../../SocketContext';
import { SVG } from '../../../assets/svg';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/theme';
import Space from '../../../components/Space/Space';
import { Toast } from '../../../utils/native';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { LABELS } from '../../../labels';
import { Svg, Path } from 'react-native-svg';

const SendIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M22 2L11 13" stroke="#F86F03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#F86F03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EmojiIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 9H9.01" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 9H15.01" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { userId, roomId, user } = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [inputText, setInputText] = useState('');
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
        setMessages(formattedMessages);
      } else {
        console.error('Failed to fetch messages:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const onReceiveMessage = useCallback((message) => {
    setMessages(previousMessages => {
        if (previousMessages.some(msg => msg._id === message._id)) {
            return previousMessages; // If duplicate, return current messages
        } else {
            return [...previousMessages, message]; // Append the new message
        }
    });
}, []);
  const onSend = useCallback(() => {
    if (inputText.trim() === '') return;

    if (socket && currentUser) {
      const messageData = {
        _id: Math.random().toString(),
        roomId,
        user: {
          _id: currentUser.user._id,
          name: currentUser.user.name,
        },
        receiverId: userId,
        text: inputText.trim(),
        createdAt: new Date(),
      };

      socket.emit('send_message', messageData);
      setMessages(previousMessages => [...previousMessages, messageData]);
      setInputText('');
    }
  }, [socket, currentUser, userId, roomId, inputText]);

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1D264D',
            borderRadius: 8,
            padding: 7,
          },
          left: {
            backgroundColor: '#F3F5FE',
            borderRadius: 8,
            padding: 7,
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',
          },
          left: {
            color: '#0F1828',
          },
        }}
      />
    );
  };

  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
        <View style={styles.Header}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={() => navigation.goBack()}
          />
        {/* </View> */}
        <Space mL={10} />
        <View style={styles.User_Cont}>
          <Image
            style={styles.avatar}
            source={user?.userImages?.[0] ? { uri: user?.userImages?.[0] } : IMAGES.userIcon}
          />
          <Space mL={10} />
          <View >
            <Text style={styles.User_name}>{user.name}</Text>

          </View>
          <AppHeader
          iconRight={
              <TouchableOpacity onPress={handleRightIconPress} >
                <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
              </TouchableOpacity>
            } />
        </View>
        {/* </View> */}
      </View>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        user={{
          _id: currentUser.user._id,
          name: currentUser.user.name,
        }}
        renderInputToolbar={() => null}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <EmojiIcon />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          placeholderTextColor="#ADB5BD"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={onSend}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ChatScreen;