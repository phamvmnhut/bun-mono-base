import { getServerUrl } from '@/constant/config';
import { treaty } from '@elysiajs/eden';
import type { ServerApp } from 'server/src/index';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

interface StoredCookie {
  value: string;
  expires: Date | null;
}

function getCookie(cookie: string) {
  let parsed = {} as Record<string, StoredCookie>;
  try {
    parsed = JSON.parse(cookie) as Record<string, StoredCookie>;
  } catch (e) {}
  const toSend = Object.entries(parsed).reduce((acc, [key, value]) => {
    if (value.expires && value.expires < new Date()) {
      return acc;
    }
    return `${acc}; ${key}=${value.value}`;
  }, '');
  return toSend;
}

function getOrigin(scheme: string) {
  const schemeURI = Linking.createURL('', { scheme });
  return schemeURI;
}

export const apiClient = treaty<ServerApp>(getServerUrl(), {
  fetcher: Object.assign(
    function fetcher(
      url: URL | RequestInfo,
      options?: RequestInit | undefined,
    ) {
      const newOptions = options || {};
      if (Platform.OS !== 'web') {
        const storedCookie = SecureStore.getItem('better-auth-session');
        const cookie = getCookie(storedCookie || '{}');
        newOptions.credentials = 'omit';
        newOptions.headers = {
          ...newOptions.headers,
          cookie,
          'expo-origin': getOrigin(Constants.platform?.scheme || ''),
        };
      }

      return fetch(url, {
        ...newOptions,
        credentials: 'include',
      });
    },
    {
      preconnect: () => {
        /* No implementation needed */
      },
    },
  ),
});
