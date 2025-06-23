import { Platform } from 'react-native';

export const ROLLBAR_TOKEN = process.env.EXPO_PUBLIC_ROLLBAR_TOKEN || '';
export const MAX_WIDTH = 768;

export const getServerUrl = () => {
  const urlTempt = process.env.EXPO_PUBLIC_SERVER_URL;
  if (Platform.OS === 'web') {
    if (urlTempt) {
      return urlTempt;
    }
    return window.location.origin;
  }
  return urlTempt || 'http://localhost:3000';
};

export const getClientUrl = () => {
  const urlTempt = process.env.EXPO_PUBLIC_CLIENT_URL;
  if (Platform.OS === 'web') {
    if (urlTempt) {
      return urlTempt;
    }
    return window.location.origin;
  }
  return urlTempt || 'http://localhost:8081';
};
