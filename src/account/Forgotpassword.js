import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {isNumber} from '../helper/util';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {
  sendForgotPasswordOtp,
  forgotPasswordVerifyOtp,
  resetPassword,
} from '../_request';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Forgotpassword = () => {
  const [data, setdata] = useState(true);
  const [email, setemail] = useState('');
  const [verifyotp, setverifyotp] = useState('');
  const [password, setpassword] = useState('');
  const [errormsg, seterrormsg] = useState(false);
  const [errorpass, seterrorpass] = useState('');
  const [otperror, setotperror] = useState('');
  const [emailerr, setemailerr] = useState('');
  const [usernamebutton, setusernamebutton] = useState('');
  const [saveverifyotpresponse, setsaveverifyotpresponse] = useState('');
  const [load, setload] = useState(false);
  const [verifyload, setverifyload] = useState(false);
  const [passwordload, setpasswordload] = useState(false);

  console.log(
    'saveverifyotpresponsesaveverifyotpresponse',
    saveverifyotpresponse,
  );

  const handleSubmit = async () => {
    try {
      if (!email) {
        Toast('email is required !!');
        return;
      }
      setload(true);
      const res = await sendForgotPasswordOtp(email);

      setload(false);

      Toast('  OTP send successfully !!');
      //setemailerr('');
    } catch (error) {
      setload(false);
      if (error?.response) {
        console.error('Server responded with an error:', error.response.data);
        if (error.response.data.err == true) {
          Toast(
            error?.response?.data?.message || 'Please enter a valid email !!',
          );
          // setemailerr(error.response.data.message);
        }
        return;
      } else if (error?.request) {
        console.error('No response received:', error.request);
        Toast('Server Down !!');
        return;
      } else {
        console.error('Error setting up the request:', error.message);
        Toast('Error in client side !!');
        return;
      }
      // setemailerr('');

      // console.log('emailerror', error);
    }
  };

  const verifySubmit = async () => {
    if (!verifyotp) {
      Toast('OTP is required !!');
      return;
    }
    if (!email) {
      Toast('email is required !!');
      return;
    }
    try {
      setverifyload(true);
      const res = await forgotPasswordVerifyOtp(email, verifyotp);
      setverifyload(false);

      setsaveverifyotpresponse(res);
      setverifyotp('');
      Toast('  OTP verify successfully !!');
      // setotperror('');
    } catch (error) {
      setverifyload(false);
      if (error?.response) {
        console.error('Server responded with an error:', error.response.data);
        if (error.response.data.err == true) {
          // setotperror(error.response.data.message);
          Toast(error?.response?.data?.message || 'OTP verification failed !!');
          return;
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        Toast('Server down !!');
        return;
      } else {
        console.error('Error setting up the request:', error.message);
        Toast('Error in client side !!');
        return;
      }

      // console.log(error);
    }
  };

  const passwordSubmit = async () => {
    if (!email) {
      Toast('email is required !!');
      return;
    }
    if (!password) {
      Toast('password is required !!');
      return;
    }
    setpasswordload(true);
    try {
      const res = await resetPassword(email, password);
      setpasswordload(false);
      navigation.navigate('Login');

      setverifyotp('');
      setemail('');
      setpassword('');

      Toast('  Password reset successfully !!');
    } catch (error) {
      setpasswordload(false);
      if (error?.response) {
        console.error('Server responded with an error:', error.response.data);
        if (error.response.data.err == true) {
          // seterrorpass(error.response.data.message);

          Toast(error?.response?.data?.message || 'password reset failed !!');
          return;
        }
      } else if (error?.request) {
        console.error('No response received:', error.request);
        Toast('Server down !!');
        return;
      } else {
        console.error('Error setting up the request:', error.message);
        Toast('Error in client side !!');
        return;
      }

      console.log(error);
    }
  };

  const Toast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState();
  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
      />

      <View
        style={{
          alignItems: 'center',
          height: windowHeight,
          backgroundColor: '#000',
        }}>
        <Image
          source={require('../assets/one.jpg')}
          style={{
            height: 330,
            width: 400,
          }}
          // resizeMode="stretch"
        />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: 50,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          //backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '75%',
            borderTopRightRadius: 50,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              width: '100%',
              margin: 10,
              marginLeft: 0,
              marginRight: 0,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(3),
                fontWeight: '500',
              }}>
              Forgot Password
            </Text>
            {/* <Text style={{ color: "#D9D9D9", fontSize: responsiveFontSize(1.86), fontWeight: "500" }}>
              Sign up to continue
            </Text> */}
          </View>

          {/* Email */}
          <View style={{width: '100%'}}>
            <View style={{paddingHorizontal: 12, paddingTop: 10}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                Email
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingTop: 10}}>
              <TextInput
                placeholder="Enter Your Email Id"
                onChangeText={value => setemail(value)}
                placeholderTextColor="#000"
                style={{
                  padding: 5,
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '300',
                  paddingLeft: 8,
                  backgroundColor: '#D9D9D9',
                  // backgroundColor:"red",
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            {/* {emailerr && emailerr ? (
            <Text
              style={{
                color: 'red',
                fontSize: responsiveFontSize(1.5),
                paddingLeft: 10,
                paddingTop: 10,
              }}>
              {emailerr && emailerr}
            </Text>
          ) : (
            ''
          )} */}
          </View>

          <View style={{marginHorizontal: 13, marginTop: 8}}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{width: '100%', borderRadius: 1}}>
              {load && load ? (
                <ActivityIndicator
                  // style={{ position: "absolute", top: 2 }}
                  size="small"
                  color="red"
                />
              ) : (
                <Text
                  style={{
                    color: '#000',
                    fontSize: responsiveFontSize(1.5),
                    color: 'green',
                    fontWeight: '400',
                  }}>
                  CLICK HERE FOR GET THE OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Otp saveverifyotpresponse && saveverifyotpresponse.status */}

          <View style={{width: '100%'}}>
            <View style={{paddingHorizontal: 12, paddingTop: 10}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                OTP
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingTop: 10}}>
              <TextInput
                placeholder="Enter Otp "
                maxLength={6}
                keyboardType="numeric"
                //value={number}
                onChangeText={value => {
                  if (!isNumber(value)) {
                    Toast('Only number allowed!!');
                    return;
                  }
                  if (value.length > 6) {
                    Toast('Only 6 digit number allowed!!');
                    return;
                  }
                  setverifyotp(value);
                }}
                placeholderTextColor="#000"
                style={{
                  padding: 5,
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '300',
                  paddingLeft: 8,
                  backgroundColor: '#D9D9D9',
                  // backgroundColor:"red",
                  width: '100%',
                  borderRadius: 10,
                }}
              />
              {/* {otperror && otperror ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  paddingLeft: 0,
                  paddingTop: 5,
                }}>
                {otperror && otperror}
              </Text>
            ) : (
              '{saveverifyotpresponse && saveverifyotpresponse.status == 200'
            )} */}
            </View>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 15}}>
            <TouchableOpacity
              onPress={() => verifySubmit()}
              style={{
                backgroundColor: '#000',
                width: '100%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              {verifyload && verifyload ? (
                <ActivityIndicator
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    paddingVertical: 10,
                  }}
                  size="small"
                  color="#fff"
                />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2),
                    paddingVertical: 10,
                    fontWeight: '400',
                  }}>
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {saveverifyotpresponse && saveverifyotpresponse.status == 200 ? (
            <View style={{width: '100%'}}>
              <View style={{paddingHorizontal: 12, paddingTop: 10}}>
                <Text
                  style={{
                    color: '#D9D9D9',
                    fontSize: responsiveFontSize(1.86),
                    fontWeight: '600',
                  }}>
                  Password
                </Text>
              </View>
              <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#D9D9D9',
                    width: '100%',
                    borderRadius: 10,
                  }}>
                  <View style={{width: '90%', borderRadius: 10}}>
                    <TextInput
                      placeholder="Create New Password "
                      onChangeText={value => setpassword(value)}
                      placeholderTextColor="#000"
                      secureTextEntry={data}
                      style={{
                        padding: 5,
                        fontSize: 14,
                        color: '#000',
                        fontWeight: '300',
                        paddingLeft: 8,
                        backgroundColor: '#D9D9D9',
                        // backgroundColor:"red",
                        width: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View style={{position: 'absolute', right: 5}}>
                    <Icon
                      name={data ? 'eye' : 'eye-off'}
                      onPress={() => setdata(!data)}
                      style={{
                        color: 'black',
                        fontSize: 13,
                        //  backgroundColor:"red",
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                      }}
                    />
                  </View>
                </View>

                {errorpass && errorpass ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 14,
                      paddingLeft: 0,
                      paddingTop: 5,
                    }}>
                    Password is not allowed to be empty
                  </Text>
                ) : (
                  ''
                )}
              </View>
              <View style={{paddingHorizontal: 10, marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => passwordSubmit()}
                  style={{
                    backgroundColor: '#000',
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  {passwordload && passwordload ? (
                    <ActivityIndicator
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        paddingVertical: 10,
                      }}
                      size="small"
                      color="#fff"
                    />
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(2.2),
                        paddingVertical: 10,
                        fontWeight: '500',
                      }}>
                      Save
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}

          <View style={{paddingBottom: 14}}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Forgotpassword;

const styles = StyleSheet.create({});
