import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Base URL Configuration
const BASE_URL = 'http://192.168.18.97:5000/api';

console.log('🌐 API Base URL:', BASE_URL); // DEBUG

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('📤 Request to:', config.url); // DEBUG
      console.log('🔐 Token from storage:', token ? 'Found' : 'Not found'); // DEBUG
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Token added to header'); // DEBUG
      }
    } catch (error) {
      console.error('❌ Token fetch error:', error);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
client.interceptors.response.use(
  (response) => {
    console.log('📥 Response from:', response.config.url); // DEBUG
    console.log('📊 Response data:', response.data); // DEBUG
    return response.data;
  },
  async (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.error || error.message
    });

    if (error.response?.status === 401) {
      console.log('🚫 Unauthorized - Clearing storage');
      await AsyncStorage.multiRemove(['userToken', 'userData']);
    }

    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Something went wrong';

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default client;