import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import GuestNavigation from './Guestnavigation';
import AuthNavigation from './Authnavigation';
import SplashScreen from './SplashScreen';
import {autoLogin, getAsyncStorage} from '../helper/util';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCurrentUser, setUserToken} from '../redux/slice/appSclice';
const StackNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoding] = useState(true);

  const Stack = createNativeStackNavigator();
  const userToken = useSelector(state => state.app.userToken);
  const currentUser = useSelector(state => state.app.currentUser);
  console.log('userToekm:::', userToken, currentUser);

  useEffect(() => {
    let userAuth = async () => {
      try {
        let auth = await autoLogin();
        let {error, user, token} = await getAsyncStorage();

        if (auth && !error) {
          console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
          dispatch(setCurrentUser(user));
          dispatch(setUserToken(token));
        }

        setLoding(false);
      } catch (e) {
        console.error('Error:: Auto log in error');
        setLoding(false);
      }
    };

    userAuth();

    return () => {};
  }, []);

  if (loading) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreene" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>{userToken && currentUser ? <GuestNavigation /> : <AuthNavigation />}</>
  );
};
export default StackNavigator;

const styles = StyleSheet.create({});
