import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native'; 

const Signin = () => {
  const navigation = useNavigation(); 

  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '739868048410-0ifivtqu6v3jcpuiqfmb3vk84i6h8q1e.apps.googleusercontent.com', // Your web client ID from Google Developer Console
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    isSignedIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      navigateToNextScreen(); // Navigate to the next screen after successful sign-in
    } catch (error) {
      // Handle sign-in errors
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log("Please login");
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      // Handle errors
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      // Handle errors
    }
  };

  const navigateToNextScreen = () => {
    // Navigate to your next screen, passing user information if needed
    navigation.navigate('Homeee', { user });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => signIn()} style={{ backgroundColor: "red" }}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
