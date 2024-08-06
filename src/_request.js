import axios from 'axios';
import {config} from './config';
const BASE_URI = `${config.apiBaseUrl?.[config.ENV]}/api/v1`;
const LOGIN = `${BASE_URI}/login`;

const SENDFORGOTPASSWORDOTP = `${BASE_URI}/send-otp`;
const FORGOTPASSWORDVERIFYOTP = `${BASE_URI}/verify-otp`;
const RESETPASSWORD = `${BASE_URI}/reset-password`;
const GET_USER_GROUP_CONNECT = `${BASE_URI}/get-user-groups-connect`;
const GET_PREVIOUS_CHAT_BY_GROUP_ID = `${BASE_URI}/get-previous-chats`;
const GET_USERS_BY_GROUP_ID = `${BASE_URI}/get-users-of-group`;
export const logIn = (email, password) => {
  return axios.post(
    LOGIN,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export const signInWithGoogle = user => {
  return axios.post(
    LOGIN,
    {
      ...user,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export const sendForgotPasswordOtp = email => {
  return axios.post(
    SENDFORGOTPASSWORDOTP,
    {
      email: email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const forgotPasswordVerifyOtp = (email, otp) => {
  return axios.post(
    FORGOTPASSWORDVERIFYOTP,
    {
      email: email,
      otp,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const resetPassword = (email, password) => {
  return axios.post(
    RESETPASSWORD,
    {
      email: email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getUserGroupsConnect = (token, userId) => {
  return axios.get(`${GET_USER_GROUP_CONNECT}?user_id=${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPreviousChatByGroupId = (token, groupId) => {
  return axios.get(`${GET_PREVIOUS_CHAT_BY_GROUP_ID}?group_id=${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsersByGroupId = (token, groupId) => {
  return axios.get(`${GET_USERS_BY_GROUP_ID}?group_id=${groupId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
