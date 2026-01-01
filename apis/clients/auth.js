import client from '../axios/index';

// ✅ Named Export
export const authAPI = {
  // Register
  register: async (userData) => {
    const response = await client.post('/auth/register', {
      email: userData.email,
      password: userData.password,
      name: userData.name
    });
    return response;
  },

  // Login
  login: async (credentials) => {
    const response = await client.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    return response;
  },

  // Social Login
  socialLogin: async (socialData) => {
    const response = await client.post('/auth/social-login', {
      provider: socialData.provider,
      providerId: socialData.providerId,
      email: socialData.email,
      name: socialData.name,
      accessToken: socialData.accessToken
    });
    return response;
  },

  // Logout
  logout: async () => {
    const response = await client.post('/auth/logout');
    return response;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await client.post('/auth/forgot-password', { email });
    return response;
  },

  // Reset Password
  resetPassword: async (resetData) => {
    const response = await client.post('/auth/reset-password', {
      token: resetData.token,
      newPassword: resetData.newPassword
    });
    return response;
  },

  // Verify Email
  verifyEmail: async (token) => {
    const response = await client.post('/auth/verify-email', { token });
    return response;
  },

  // Resend Verification
  resendVerification: async (email) => {
    const response = await client.post('/auth/resend-verification', { email });
    return response;
  },
};