import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView, Dimensions } from 'react-native';
import { IMAGES } from '../../assets/images';
import CustomImage from '../../components/CustomImage/CustomImage';
import { genderList } from '../../data/appData';
import { Svg, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" />
    <Path d="M21 21L16.65 16.65" />
  </Svg>
);

const CustomDropdown = ({
  placeholder,
  data,
  defaultOption,
  setSelected,
  arrowIcon,
  searchPlaceholder,
  onSelect = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data || genderList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultOption || '');

  useEffect(() => {
    setFilteredData(data || genderList);
  }, [data]);

  const searchFunction = (text) => {
    const updatedData = (data || genderList).filter((item) => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(updatedData);
    setSearchValue(text);
  };

  const handleSelect = (item) => {
    setSelectedValue(item);
    setSelected(item);
    onSelect(item);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setModalVisible(true)}
      >
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
          {selectedValue || placeholder || 'Select any option'}
        </Text>
        {arrowIcon || (
          <CustomImage
            source={IMAGES.vectorIcon}
            size={10}
            resizeMode={'contain'}
          />
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder={searchPlaceholder || "Search..."}
                placeholderTextColor="#999"
                value={searchValue}
                onChangeText={(text) => searchFunction(text)}
              />
              <View style={styles.searchIconContainer}>
                <SearchIcon />
              </View>
            </View>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 55,
    alignItems: 'center',
    borderRadius: 16,
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: width * 0.94,
    height: height * 0.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingRight: 40,
    color: '#000000',
    borderRadius: 16,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 10,
  },
  flatList: {
    flexGrow: 0,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemText: {
    color: '#949494',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 40,
    borderRadius: 16,
    
  },
  closeButtonText: {
    color: '#949494',
    fontWeight: 'bold',
  },
});

export default CustomDropdown;