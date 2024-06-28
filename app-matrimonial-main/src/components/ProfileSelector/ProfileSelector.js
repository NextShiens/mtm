import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IMAGES } from '../../assets/images';
import { STYLES } from '../../assets/theme';
import AppButton from '../AppButton/AppButton';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import { styles } from './styles';

const ProfileSelector = ({isCameraShown, profiles, profileData}) => {
  const style = styles;
  const [isSelected, setIsSelected] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('1');
  const handleProfileUpdate = item => {
    setSelectedBtn(item.key);
    setIsSelected(!isSelected);
  };
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={[
            isCameraShown
              ? style.profileContainer
              : style.withoutCameraContainer,
          ]}>
          {isCameraShown ? (
            <View style={style.uploadImgContainer}>
              <CustomImage
                source={IMAGES.camera}
                size={20}
                resizeMode={'contain'}
              />
            </View>
          ) : (
            <></>
          )}

          {profiles ? (
            console.log(profiles),
            profiles.map(item => {
              return (
                <CustomImage
                  source={item.img}
                  size={100}
                  resizeMode={'contain'}
                  key={item.key}
                />
              );
            })
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <Space mT={20} />
  {profileData &&
      <View style={STYLES.container}>
        <View
          style={style.mapContainer}>
          {profileData.map(item => {
            return (
              <AppButton
                variant="filled"
                key={item.key}
                extraStyle={{
                  container: [
                    selectedBtn === item.key
                      ? style.selectedBtn
                      : style.unSelectedBtn,
                  ],
                  text: [
                    selectedBtn === item.key
                      ? style.selectedText
                      : style.unSelectedText,
                  ],
                }}
                title={item.value}
                onPress={() => {
                  handleProfileUpdate(item);
                }}
              />
            );
          })}
        </View>
      </View>
      }
    </>
  );
};

export default ProfileSelector;
