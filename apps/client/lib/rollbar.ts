import { Client } from 'rollbar-react-native';
import Constants from 'expo-constants';
import { ROLLBAR_TOKEN } from '@/constant/config';
// Check if we're in production
const isProduction = !__DEV__;

// Initialize Rollbar client only in production
const rollbar = isProduction
  ? new Client({
      accessToken: ROLLBAR_TOKEN,
      environment: 'production',
      captureUncaught: true,
      captureUnhandledRejections: true,
      enabled: true,
      transmit: true,
      // Add user information if needed
      payload: {
        client: {
          javascript: {
            source_map_enabled: true,
            code_version: Constants.expoConfig?.version || '1.0.0', // Your app version
          },
        },
      },
    })
  : null;

// Utility functions for logging - only log in production
export const logError = (error: Error, extraData?: Record<string, unknown>) => {
  if (isProduction && rollbar) {
    rollbar.error(error, extraData);
  } else {
    console.error('Error in development', error);
  }
};

export const logWarning = (
  message: string,
  extraData?: Record<string, unknown>
) => {
  if (isProduction && rollbar) {
    rollbar.warning(message, extraData);
  } else {
    console.warn('Warning in development', message);
  }
};

export const logInfo = (message: string, extraData?: Record<string, unknown>) => {
  if (isProduction && rollbar) {
    rollbar.info(message, extraData);
  } else {
    console.info('Info in development', message);
  }
};

export default rollbar;
