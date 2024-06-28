import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Fonts} from '../../../assets/fonts';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import {carouselData} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import {Toast} from '../../../utils/native';

const UserDetailsScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = React.useState(0);
  const style = styles;

  const renderItem = ({item}) => (
    <View style={style.slideContainer}>
      <Image source={IMAGES.carousel1} style={style.image} />
      <View style={style.gradient}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          textColor="white"
          iconRight={
            <>
              <TouchableOpacity
                style={style.rightIconContainer}
                onPress={() => {
                  navigation.navigate('SavedUserScreen');
                }}>
                <CustomImage
                  source={IMAGES.savedIcon}
                  size={18}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </>
          }
          title={LABELS.matches}
          extraStyle={{
            container: {width: '100%'},
          }}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={[STYLES.bgColor(COLORS.dark.white)]}>
      <View style={style.container}>
        <View style={style.carouselContainer}>
          <Carousel
            data={carouselData}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={3}
            activeDotIndex={activeSlide}
            containerStyle={style.paginationContainer}
            dotStyle={style.dotStyle}
            inactiveDotStyle={style.inactiveDotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
          />
        </View>

        <View style={style.contentContainer}>
          <View style={style.basicDetailsContainer}>
            <Space mT={20} />
            <AppText
              title={LABELS.ShusmitaSharma}
              variant={'h3'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsSemiBold)}
            />
            <AppText
              title={LABELS.AssistantManager}
              variant={'h5'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={13} />
            <AppText
              title={LABELS.examplePara}
              variant={'h5'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={13} />
            <AppText
              title={LABELS.mumbaiIndia}
              variant={'h5'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={20} />

            <View
              style={{
                backgroundColor: COLORS.dark.lightGrey,
                height: 1,
              }}></View>
            <Space mT={20} />
            <AppText
              title={LABELS.basicInfo}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
          </View>
          <Space mT={12} />
          <View style={style.basicInfoContainer}>
            <View style={style.infoCont1}>
              <AppText
                title={LABELS.name}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Ayesha Khan'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />

              <AppText
                title={LABELS.maritalStatus}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={LABELS.neverMarried}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />

              <AppText
                title={LABELS.height}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'6 Ft 7 inch'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <AppText
                title={LABELS.profileCreatedFor}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Own'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
            </View>

            <View style={style.infoCont2}>
              <View style={style.infoCont1}>
                <AppText
                  title={LABELS.age}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={'23'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />

                <AppText
                  title={LABELS.Gender}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={'Female'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />

                <AppText
                  title={LABELS.cast}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={'Mughal'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
                <AppText
                  title={LABELS.disability}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={'No'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.dark.lightGrey,
              }}></View>
            <Space mT={20} />

            <AppText
              title={LABELS.contactDetails}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />

            <Space mT={17} />
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <AppText
                  title={LABELS.phoneNumber}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={'+91 3453545 6'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
              </View>
              <View style={{width: '50%'}}>
                <AppText
                  title={LABELS.email}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={LABELS.exampleEmail}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
              </View>
            </View>
            <Space mT={20} />
            <View
              style={{
                height: 1,
                backgroundColor: 'lightgrey',
                width: '100%',
              }}></View>
            <Space mT={15} />
            <AppText
              title={LABELS.locationInfo}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={15} />
            <AppText
              title={LABELS.presentAddress}
              variant={'h4'}
              color={COLORS.dark.gray}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <AppText
              title={'Gwailor, Madhya Pradesh, India'}
              variant={'h4'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={20} />
            <AppText
              title={LABELS.PreminentAddress}
              variant={'h4'}
              color={COLORS.dark.gray}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <AppText
              title={'Gwailor, Madhya Pradesh, India'}
              variant={'h4'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={20} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.dark.lightGrey,
              }}></View>
            <Space mT={20} />
            <AppText
              title={LABELS.educationCareer}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
          </View>
          <Space mT={10} />
          <View style={style.basicInfoContainer}>
            <View style={style.infoCont1}>
              <AppText
                title={LABELS.highestEducation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'M.Phil Chemistry'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.occupation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Student'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />
            </View>

            <View style={style.infoCont2}>
              <AppText
                title={LABELS.employedIn}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Not Working'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />

              <AppText
                title={LABELS.AnnualIncome}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'2 Lac'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />
            </View>
          </View>
        </View>

        <View style={{width: '100%', paddingHorizontal: 15}}>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.dark.lightGrey,
            }}></View>
          <Space mT={20} />
          <AppText
            title={LABELS.partnerExpectation}
            variant={'h3'}
            color={COLORS.dark.inputBorder}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
          />
          <Space mT={20} />
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '60%'}}>
              <AppText
                title={LABELS.maritalExpectation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Single'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.age}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'25 to 40'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.education}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'M.Phil'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />
              <AppText
                title={LABELS.motherToungue}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Hindi'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>

            <View style={{width: '40%'}}>
              <AppText
                title={LABELS.cast}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Mughal'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.height}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'5ft 8 Inch'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.occupation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Doctor'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />
              <AppText
                title={LABELS.AnnualIncome}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={'Rs. 20-35Lakh'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>
          </View>
        </View>
        <Space mT={20} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 50,
              backgroundColor: COLORS.dark.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 6,
            }}
            onPress={() => {
              Toast('Your request has been sent successfully');
              setTimeout(() => {
                navigation.navigate('HomePage');
              }, 1000);
            }}>
            <CustomImage
              source={IMAGES.sendIcon}
              size={12}
              resizeMode={'contain'}
            />
            <Space mL={10} />
            <AppText
              title={'Send Interest'}
              color={'white'}
              variant={'h5'}
              extraStyle={{fontFamily: Fonts.PoppinsRegular}}
            />
          </TouchableOpacity>
          <Space mL={10} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatScreen');
            }}
            style={{
              width: '15%',
              height: 50,
              backgroundColor: COLORS.dark.primary,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 6,
            }}>
            <CustomImage source={IMAGES.chatIcon} size={12} />
          </TouchableOpacity>
        </View>
        <Space mT={20} />
      </View>
    </ScrollView>
  );
};

export default UserDetailsScreen;
