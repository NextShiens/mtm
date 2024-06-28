import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {LABELS} from '../../../labels';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import AppInput from '../../../components/AppInput/AppInput';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import Space from '../../../components/Space/Space';
import {professionPreferenceData} from '../../../data/appData';
import HorizontalScrollCategories from '../../../components/HorizontalScrollCategories/HorizontalScrollCategories.js';

const ProfessionPreferenceScreen = ({navigation}) => {
  //handle right icon press
  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };
  //handle item press
  const handleLeftIconPress = () => {
    navigation.goBack();
  };
  const handlesearchFunctionality = () => {
    console.log('search');
  };

  const handleItemPress = item => {
    const selectedProfession = item.name;
    if (item.value) {
      const selectedSubcategory = item.value;
    } else {
    }
  };
  const [professions, setProfessions] = useState([]);

  const style = styles;
  return (
    <ScrollView style={STYLES.flex1}>
      <View>
        <View style={style.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow fill={'black'} />}
            title={LABELS.preference}
            onLeftIconPress={handleLeftIconPress}
            iconRight={
              <TouchableOpacity onPress={handleRightIconPress}>
                <CustomImage
                  source={IMAGES.notificationIcon}
                  size={27}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <Space mT={20} />
        <View style={style.searchBoxContainer}>
          <AppInput
            iconLeft={<SVG.magnifyingGlass fill={COLORS.dark.inputBorder}  />}
            extraStyle={{
              textInputCont: style.textInputCont,
            }}
            placeholder={LABELS.searchHere}
            onChangeText={handlesearchFunctionality}
          />
        </View>
        <Space mT={20} />
        <View style={[STYLES.width('100%'), STYLES.pH(HORIZON_MARGIN)]}>
          {/* <HorizontalScrollCategories
            data={professionPreferenceData}
            onPress={item => {}}
          /> */}
          <HorizontalScrollCategories data = {professionPreferenceData}/>
        </View>
        <Space mT={20} />
      </View>
    </ScrollView>
  );
};

export default ProfessionPreferenceScreen;
