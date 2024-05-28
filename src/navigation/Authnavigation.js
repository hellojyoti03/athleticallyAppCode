import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../account/Login';
import Registration from '../account/Registration';
import Forgotpassword from '../account/Forgotpassword';
import SplashScreen from './SplashScreen';

const AstrologerNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
    </Stack.Navigator>
  );
};

export default AstrologerNavigator;

const styles = StyleSheet.create({});
