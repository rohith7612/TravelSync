import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Authentication ---
export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, userData);
    return response.data;
  } catch (error: any) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token/`, userData);
    return response.data; // Contains access and refresh tokens
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken });
    return response.data; // Contains new access token
  } catch (error: any) {
    console.error("Token Refresh Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Get Profile Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Add other auth-related API calls here (e.g., logout, password reset)
