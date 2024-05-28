import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from '../_request';
const setAuthorizationHeader = async token => {
  try {
    await Promise.all([
      (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`),
      (axios.defaults.baseURL = config.apiBaseUrl?.[config.ENV]),
    ]);
    return Promise.resolve();
  } catch (e) {
    console.error(e, 'Error:: setAuthorizationHeader');
    return Promise.reject(e);
  }
};

const setAsyncStorage = async ({token, email, password, user}) => {
  try {
    await Promise.all([
      AsyncStorage.setItem('usertoken', JSON.stringify(token)),
      AsyncStorage.setItem('athletically_token', JSON.stringify(token)),
      AsyncStorage.setItem('athletically_email', JSON.stringify(email)),
      AsyncStorage.setItem('athletically_password', JSON.stringify(password)),
      AsyncStorage.setItem('athletically_user', JSON.stringify(user)),
      setAuthorizationHeader(token),
    ]);
    console.log('set all data to native storage');

    return Promise.resolve();
  } catch (error) {
    console.error('Error:: setAsyncStorage');
    return Promise.reject(error);
  }
};

const getAsyncStorage = async () => {
  try {
    let token = await AsyncStorage.getItem('athletically_token');
    let email = await AsyncStorage.getItem('athletically_email');
    let password = await AsyncStorage.getItem('athletically_password');
    let user = await AsyncStorage.getItem('athletically_user');
    console.log(user, token, email, password, 'current user activity');
    if (!token || !email || !password || !user) {
      throw new Error('Key Not Found');
    }

    return {
      error: false,
      email: JSON.parse(email),
      password: JSON.parse(password),
      token: JSON.parse(token),
      user: JSON.parse(user),
    };
  } catch (e) {
    console.error(e, 'Error To Get Async Storage Key');

    return {
      error: true,
      email: null,
      password: null,
      token: null,
      user: null,
    };
  }
};
const autoLogin = async () => {
  try {
    let {error, email, password, user} = await getAsyncStorage();
    console.log(error, email, password, 'test key');
    if (error) {
      throw new Error('getAsyncStorage Error');
    }
    let response = await logIn(email, password);

    await setAsyncStorage({
      token: response.data.data.token,
      email,
      password,
      user,
    });
    await setAuthorizationHeader(response.data.data.token);
    return true;
  } catch (error) {
    if (error?.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error?.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }

    console.log(error);
  }
  return false;
};
export {setAuthorizationHeader, setAsyncStorage, getAsyncStorage, autoLogin};
