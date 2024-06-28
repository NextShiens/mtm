import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {COLORS, STYLES} from '../../assets/theme';
import AppText from '../AppText/AppText';
import {Fonts} from '../../assets/fonts';

const HorizontalScreen = ({
  data,
  onPress,
  extraStyle = {
    container: {},
    horizontalBox: {},
    selectedItemContainer: {},
    unselectedItemContainer: {},
    selectedItemText: {},
    unselectedItemText: {},
  },
}) => {
  const [selectedItem, setSelectedItem] = useState('1');
  const handleItemPress = item => {
    setSelectedItem(item.key);
    onPress(item);
  };
  const style = styles;
  return (
    <>
      <View style={[style.container, extraStyle.container]}>
        <ScrollView
          horizontal={true}
          style={[STYLES.width100, extraStyle.horizontalBox]}
          showsHorizontalScrollIndicator={false}>
          {data ? (
            data.map(item => {
              return (
                <TouchableOpacity
                  style={
                    selectedItem === item.key
                      ? [
                          style.itemContainer,
                          extraStyle.selectedItemContainer,
                        ]
                      : [
                          style.selectedItemContainer,
                          extraStyle.unselectedItemContainer,
                        ]
                  }
                  key={item.key}
                  onPress={() => {
                    handleItemPress(item);
                  }}>
                  <AppText
                    title={item.value}
                    color={
                      selectedItem === item.key
                        ? COLORS.dark.white
                        : COLORS.dark.black
                    }
                    variant={'h5'}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                    onPress={() => {
                      handleItemPress(item);
                    }}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default HorizontalScreen;
