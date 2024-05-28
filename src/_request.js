import axios from 'axios';
import {config} from './config';
const BASE_URI = `${config.apiBaseUrl?.[config.ENV]}/api/v1`;
const LOGIN = `${BASE_URI}/login`;

const SENDFORGOTPASSWORDOTP = `${BASE_URI}/send-otp`;
const FORGOTPASSWORDVERIFYOTP = `${BASE_URI}/verify-otp`;
const RESETPASSWORD = `${BASE_URI}/reset-password`;
const GET_USER_GROUP_CONNECT = `${BASE_URI}/get-user-groups-connect`;
export const logIn = (email, password) => {
  console.log(email, password);
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

export const getUserGroupsConnect = token => {
  return axios.get('/api/v1/get-user-groups-connect', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
