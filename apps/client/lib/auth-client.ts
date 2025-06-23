import { createAuthClient, type SuccessContext } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { adminClient } from "better-auth/client/plugins"
import { getServerUrl } from "@/constant/config";
import { Platform } from "react-native";
import Constants from "expo-constants";

export const authClient = createAuthClient({
	baseURL: getServerUrl(),
	disableDefaultFetchPlugins: true,
	plugins: [
		expoClient({
			scheme: Constants.platform?.scheme,
			storage: SecureStore,
		}),
		adminClient(),
	],
	fetchOptions: {
		credentials: 'include',
		redirect: 'follow',
	},
});

export const customOnSuccess = (refetch: () => void, onClose: () => void) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return async (data: SuccessContext<any>) => {
		if (Platform.OS === 'web') {
			const callbackURL = JSON.parse(data.request.body)?.callbackURL;
			const signInURL = data.data?.url;

			const popup = window.open(
				signInURL,
				'_blank',
				'width=500,height=600'
			);

			if (!popup) return;

			const interval = setInterval(() => {
				try {
					if (!popup || popup.closed) {
						clearInterval(interval);
						return;
					}

					try {
						const currentUrl = popup.location.href;
						if (currentUrl.startsWith(callbackURL)) {
							clearInterval(interval);
							popup.close();
							refetch();
							onClose();
						}
					} catch (e) {
						// Ignore cross-origin errors - this is expected
						// while the popup is on a different domain
					}
				} catch (error) {
					console.error('Error checking popup status:', error);
				}
			}, 500);
		} else {
			refetch();
			onClose();
		}
	}
}