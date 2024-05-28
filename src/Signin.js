import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({

  webClientId: "931334454225-12a6ifc2hvn88oi8se2ks63u5hvu4d19.apps.googleusercontent.com",
	androidClientId:"931334454225-psus81o19tr6j14f2gvs5uv9frgigmlh.apps.googleusercontent.com",
	
	scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
	await GoogleSignin.hasPlayServices();
	const userInfo = await GoogleSignin.signIn();
	return userInfo;
};

export default function App() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			const response = await GoogleLogin();
			const { idToken, user } = response;

			if (idToken) {
				const resp = await authAPI.validateToken({
					token: idToken,
					email: user.email,
				});
				await handlePostLoginData(resp.data);
			}
		} catch (apiError) {
			setError(
				apiError?.response?.data?.error?.message || 'Something went wrong'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<Pressable onPress={handleGoogleLogin}>Continue with Google</Pressable>
		</View>
	);
}