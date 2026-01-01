import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Save data
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('✅ Storage SAVED:', key, '→', jsonValue.substring(0, 50) + '...'); // DEBUG
      return true;
    } catch (error) {
      console.error('❌ Storage save error:', error);
      return false;
    }
  },

  // Get data
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const parsed = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('📖 Storage GET:', key, '→', parsed ? 'Found' : 'Not found'); // DEBUG
      return parsed;
    } catch (error) {
      console.error('❌ Storage get error:', error);
      return null;
    }
  },

  // Remove data
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('🗑️ Storage REMOVED:', key); // DEBUG
      return true;
    } catch (error) {
      console.error('❌ Storage remove error:', error);
      return false;
    }
  },

  // Clear all
  clear: async () => {
    try {
      await AsyncStorage.clear();
      console.log('🧹 Storage CLEARED'); // DEBUG
      return true;
    } catch (error) {
      console.error('❌ Storage clear error:', error);
      return false;
    }
  },

  // ✅ ADD: Check all stored keys
  getAllKeys: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('🔑 All Storage Keys:', keys);
      return keys;
    } catch (error) {
      console.error('❌ Get all keys error:', error);
      return [];
    }
  },
};