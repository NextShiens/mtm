import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {GiftedChat, IMessage, Bubble} from 'react-native-gifted-chat';
import moment from 'moment';
import {IMAGES} from '../../../assets/images';
import {COLORS} from '../../../assets/theme';
import {Toast} from '../../../utils/native';
import AppHeader from '../../../components/AppHeader/AppHeader';
import Icon from '../../../components/Icon/Icon';
import {SVG} from '../../../assets/svg';
import Space from '../../../components/Space/Space';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date(),

        user: {
          _id: 2,
          name: 'User',
          avatar: IMAGES.profile2,
        },
      },
      {
        _id: 2,
        text: 'Lorem ipsum dolor sit amet.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
          avatar: IMAGES.carousel1,
        },
      },
    ]);
  }, []);

  console.log(messages);
  const style = styles;
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#F3F5FE',
            padding: '3%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 20,
            marginBottom: '6%',
            alignItems: 'flex-start',
          },
          right: {
            backgroundColor: '#1D264D',
            padding: '3%',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 10,
            marginBottom: '6%',
            alignItems: 'flex-start',
          },
        }}
        textStyle={{
          left: {
            color: 'black',
            textAlign: 'left',
          },
          right: {
            color: COLORS.dark.white,
            textAlign: 'justify',
          },
        }}></Bubble>
    );
  };

  const renderTime = props => {
    return (
      <Text
        style={{
          color: '#626262',
          position: 'absolute',
          right: -10,
          top: 14,
        }}>
        {moment(props.currentMessage.createdAt).format('hh:mm ')}
      </Text>
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar {...props}>
        <TextInput
          placeholder="Type a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
          style={{flex: 1, fontSize: 16, marginLeft: 10}}
        />
      </InputToolbar>
    );
  };

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        _id: Math.round(Math.random() * 1000000).toString(),
        text: inputText.trim(),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
        },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );

      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header_Cont}>
        <View style={styles.Header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                style={{height: 50, width: 50, borderRadius: 25}}
                source={IMAGES.carousel1}
              />
              <Space mL={10} />
              <View style={styles.UserDetail}>
                <Text style={styles.User_name}>Maansvi Goya</Text>
                <Text style={styles.Status}>Online</Text>
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
        onSend={handleSend}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderTime={renderTime}
      />

      <View style={styles.InputOuter_View}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            marginBottom: '5%',
            flexDirection: 'row',
            width: '100%',
            paddingTop: '1%',
            justifyContent: 'space-between',
          }}>
          <View style={styles.InputContainer}>
            <TouchableOpacity
              style={styles.Touch_Image}
              onPress={() => {
                Toast('soon we will add this feature');
              }}>
              <Image source={IMAGES.smile} style={styles.Smile_Icon} />
            </TouchableOpacity>
            <TextInput
              style={styles.Textinputcontainer}
              placeholder=" Write a message..."
              placeholderTextColor={COLORS.dark.inputBorder}
              value={inputText}
              onChangeText={text => setInputText(text)}
            />
          </View>
          <View style={styles.Circular_View}>
            {inputText.length === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  Toast('This feature is not working now');
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.dark.primary,
                    borderRadius: 25,
                  }}
                  source={IMAGES.audio}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.dark.secondary,
                  borderRadius: 25,
                }}
                onPress={handleSend}>
                <Image
                  resizeMode="contain"
                  style={styles.Send_Image}
                  source={IMAGES.sendIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
