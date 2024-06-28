import AsyncStorage from '@react-native-async-storage/async-storage';
export const setToLocal = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    
  } catch (error) {
    console.error(`Error setting ${key} from local storage: `, error);
  }
};
export const getFromLocal = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error(`Error getting ${key} from local storage: `, error);
        return null;
      }
  };
  
  // Function to remove a key-value pair from local storage based on the key
  export const removeFromLocal = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from local storage: `, error);
    }
  };
  
  // Function to remove all key-value pairs from local storage
  export const removeAllFromLocal = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing all data from local storage: ', error);
    }
  };
  