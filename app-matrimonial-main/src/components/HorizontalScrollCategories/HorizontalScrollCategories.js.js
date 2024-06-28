// import React, {useState} from 'react';
// import {ScrollView, TouchableOpacity, View} from 'react-native';
// import {Fonts} from '../../assets/fonts';
// import {SVG} from '../../assets/svg';
// import {COLORS, HORIZON_MARGIN, STYLES} from '../../assets/theme';
// import {LABELS} from '../../labels';
// import AppText from '../AppText/AppText';
// import Icon from '../Icon/Icon';
// import Space from '../Space/Space';
// import {styles} from './styles';

// const HorizontalScrollCategories = ({
//   data,
//   onPress,
//   extraStyle = {
//     container: {},
//     horizontalBox: {},
//     selectedItemContainer: {},
//     unselectedItemContainer: {},
//     selectedItemText: {},
//     unselectedItemText: {},
//   },
// }) => {
//   const [selectedItem, setSelectedItem] = useState('1');
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState();
//   const [isSelectedSubCategory, setIsSelectedSubCategory] = useState(false);

//   const handleCategoryPress = item => {
//     setSubCategories(item.data);
//     setSelectedItem(item.key);
//     onPress(item);
//   };

//   const handleSubcategoryPress = subcategory => {
//     setSelectedSubCategory(subcategory.key);
//     setSelectedSubCategory(subcategory.key);
//   };

//   const style = styles;
//   console.log(data)
//   return (
//     <>
//       <ScrollView
//         horizontal
//         style={[STYLES.height(50), STYLES.width100, extraStyle.container]}
//         showsHorizontalScrollIndicator={false}>
//         {data &&
//           data.map(category => (
//             <View
//               key={category.key}
//               onPress={() => handleCategoryPress(category)}>
//               <TouchableOpacity
//                 style={[
//                   selectedItem === category.key
//                     ? style.activeContainer
//                     : style.inActiveContainer,
//                 ]}
//                 onPress={() => handleCategoryPress(category)}>
//                 <AppText
//                   title={category.category}
//                   color={
//                     selectedItem === category.key
//                       ? COLORS.dark.white
//                       : COLORS.dark.inputBorder
//                   }
//                   variant={'h5'}
//                   extraStyle={[
//                     STYLES.fontFamily(Fonts.PoppinsMedium),
//                     {
//                       ...((selectedItem === category.key &&
//                         extraStyle.selectedItemText) ||
//                         extraStyle.unselectedItemText),
//                     },
//                   ]}
//                   onPress={() => handleCategoryPress(category)}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//       </ScrollView>

//       <Space mT={20} />
//       <View style={[STYLES.pH(HORIZON_MARGIN), STYLES.width('100%')]}>
//         <AppText
//           title={LABELS.selectEducation}
//           variant={'h4'}
//           extraStyle={STYLES.fontFamily(Fonts.PoppinsSemiBold)}
//         />
//       </View>

//       <Space mT={20} />
//       <View style={[STYLES.container]}>
//         {selectedItem &&
//           subCategories.map(item => (
//             <View style={style.subCategoryContainer} key={item.key}>
//               <TouchableOpacity
//                 onPress={() => handleSubcategoryPress(item)}
//                 style={[STYLES.row, STYLES.AICenter]}>
//                 {selectedSubCategory === item.key ? (
//                   <Icon
//                     SVGIcon={
//                       <SVG.squareBox fill={'orange'} height={20} width={20} />
//                     }
//                     onPress={() => {
//                       setIsSelectedSubCategory(!isSelectedSubCategory);
//                     }}
//                   />
//                 ) : (
//                   <Icon
//                     SVGIcon={
//                       <SVG.checkboxUnfilled
//                         fill={COLORS.dark.inputBorder}
//                         height={20}
//                         width={20}
//                       />
//                     }
//                   />
//                 )}
//                 <Space mL={10} />
//                 <AppText
//                   title={item.value}
//                   variant={'h4'}
//                   extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//       </View>
//     </>
//   );
// };

// export default HorizontalScrollCategories;


import { View, Text } from 'react-native'
import React from 'react'

const HorizontalScrollCategories = ({data}) => {
  console.log('data',data)
  return (
    <View>
      {

      }
    </View>
  )
}

export default HorizontalScrollCategories
