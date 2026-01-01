import { authAPI } from '../apis/clients/auth';
import { storage } from '../utilities/storage';

export const authService = {
  login: async (credentials) => {
    try {
      console.log('🔵 Login attempt:', credentials.email);
      
      const data = await authAPI.login(credentials);
      console.log('📦 Login API response:', data);
      
      if (data.success && data.token) {
        console.log('💾 Saving token to storage...');
        
        await storage.save('userToken', data.token);
        await storage.save('userData', data.user);
        
        console.log('✅ Login data saved successfully');
      } else {
        console.log('⚠️ Login response missing token or success flag');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login service error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('🔵 Register attempt:', userData.email);
      const data = await authAPI.register(userData);
      console.log('📦 Register API response:', data);
      
      if (data.success && data.token) {
        console.log('💾 Saving token to storage...');
        
        await storage.save('userToken', data.token);
        await storage.save('userData', data.user);
        
        console.log('✅ Register data saved successfully');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Register service error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      console.log('🔵 Logout attempt');
      await authAPI.logout();
    } catch (error) {
      console.error('❌ Logout API error:', error);
    } finally {
      await storage.remove('userToken');
      await storage.remove('userData');
      console.log('✅ Storage cleared');
    }
  },

  getCurrentUser: async () => {
    const user = await storage.get('userData');
    return user;
  },

  isAuthenticated: async () => {
    const token = await storage.get('userToken');
    return !!token;
  },

  getToken: async () => {
    const token = await storage.get('userToken');
    return token;
  },

  // ✅ Debug function with getAllKeys
  debugStorage: async () => {
    console.log('🐛 === STORAGE DEBUG ===');
    const token = await storage.get('userToken');
    const user = await storage.get('userData');
    const allKeys = await storage.getAllKeys();
    
    console.log('🔑 All keys:', allKeys);
    console.log('🎫 Token:', token ? 'Found (' + token.substring(0, 20) + '...)' : 'Not found');
    console.log('👤 User:', user);
    console.log('🐛 === END DEBUG ===');
  },
};