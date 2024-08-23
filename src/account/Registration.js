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
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/Feather';
const Registration = () => {
  const [data, setdata] = useState(true);
  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [data1, setdata1] = useState(true);
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [email, setemail] = useState('');
  const [errormsg, seterrormsg] = useState(false);
  const [errorpass, seterrorpass] = useState(false);
  const [erroremail, seterroremail] = useState(false);
  const [errname, seterrname] = useState(false);
  const [load, setload] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    // Check if any required field is empty

    if (!name || !password || !email || !cpassword || cpassword !== password) {
      if (!name) {
        Toast('Name is required !!');
        return;
      }
      if (!password) {
        Toast('Password is required !!');
        return;
      }
      if (!email) {
        Toast('Email is required !!');
        return;
      }
      if (!cpassword) {
        Toast('Confirm password is required');
        return;
      }
      if (password !== cpassword) {
        Toast("Confirm password and password  dont't match");
        return;
      }

      // if (!name) seterrname(true);
      // if (!password) seterrorpass(true);
      // if (!email) seterroremail(true);
      // if (!cpassword) setError("Passwords don't match");
      // if (!name) {
      //   Toast('Name Cannot to )
      // }
      return;
    }

    try {
      setload(true);
      const result = await axios.post(`/api/v1/register`, {
        name: name,
        password: password,
        email: email,
      });

      setload(false);

      setname('');
      setemail('');
      setpassword('');
      setcpassword('');
      seterrormsg('');
      console.log(result, 'login data');
      Toast('User added successfully !!');
      navigation.navigate('Login');
    } catch (error) {
      setload(false);

      if (error?.response?.data?.err == true) {
        //seterrormsg(error.response.data.message);
        Toast(error?.response?.data?.message || 'User register failed !!');
        return;
      }
      Toast('User register failed !!');
      console.log(error);
    }
  };

  const handlePasswordChange = value => {
    setpassword(value);
    if (value !== cpassword) {
      Toast("Password and confirm password don't match");
      return;
    }
  };

  const handleCPasswordChange = value => {
    setcpassword(value);
    if (password !== value) {
      Toast("Password and confirm password don't match");
      return;
    }
  };
  //'User added successfully !!'
  const Toast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '520887205481-rjaiisq7vmkqtpqhnqepopo2aupdp3a3.apps.googleusercontent.com',
      androidClientId:
        '520887205481-d9h83i54r4d9brbg33ts8qh0mmdj19ur.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const signInClickGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'SIGN IN WITH GOOGLE');
      // setdata(userInfo.user)
      // dispatch(addToCart(userInfo))
      console.log('loko', userInfo);
      Toast('Sign in');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in cancelled');
        Toast('Sign in cancelled');
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation in progress');
        Toast('Operation in progress');
        return;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
        Toast('Play services not available');
        return;
      } else {
        console.error(error);
        Toast('Sign in cancelled');
        return;
      }
    }
  };
  const signInClick = () => {
    navigation.navigate('Login');
    setname('');
    setemail('');
    setpassword('');
    setcpassword('');
  };

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
            height: 200,
            width: 200,
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
          <View style={{width: '100%', margin: 10, alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(4),
                fontWeight: '500',
              }}>
              Registration
            </Text>
            <Text
              style={{
                color: '#D9D9D9',
                fontSize: responsiveFontSize(1.86),
                fontWeight: '500',
              }}>
              Sign up to continue
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <View style={{paddingHorizontal: 12, paddingTop: 10}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                Name
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingTop: 10}}>
              <TextInput
                placeholder="Enter Your name"
                onChangeText={value => setname(value)}
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
              {/* {errname && errname ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: responsiveFontSize(1.5),
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}>
                  name is not allowed to be empty
                </Text>
              ) : (
                ''
              )} */}
            </View>
          </View>

          <View style={{width: '100%'}}>
            <View style={{paddingHorizontal: 12, paddingTop: 6}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                Email Id
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingTop: 6}}>
              <TextInput
                placeholder="Enter Your Email Id"
                // maxLength={10}
                // keyboardType="numeric"
                // value={number}
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
              {/* {erroremail && erroremail ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: responsiveFontSize(1.5),
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}>
                  Email is not allowed to be empty
                </Text>
              ) : (
                ''
              )} */}

              {/* {errormsg && errormsg ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: responsiveFontSize(1.5),
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}>
                  {errormsg && errormsg}
                </Text>
              ) : (
                ''
              )} */}
              {/* {erroremail && erroremail ? (
              <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 0, paddingTop: 5 }}>
                Email is not allowed to be empty
              </Text>
            ) : (
              ''
            )} */}
            </View>
          </View>

          <View style={{width: '100%', marginTop: 5}}>
            <View style={{paddingHorizontal: 12}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                Password
              </Text>
            </View>
            <View style={{paddingHorizontal: 10, marginTop: 6}}>
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
                    placeholder="Enter Your Password"
                    value={password}
                    // onChangeText={value => setpassword(value)}
                    onChangeText={handlePasswordChange}
                    placeholderTextColor="#000"
                    secureTextEntry={data}
                    style={{
                      padding: 5,
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '300',
                      paddingLeft: 8,
                      width: 300,
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
              {/* {errorpass && errorpass ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: responsiveFontSize(1.5),
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}>
                  password is not allowed to be empty
                </Text>
              ) : (
                ''
              )} */}
            </View>
          </View>

          <View style={{width: '100%', marginTop: 5}}>
            <View style={{paddingHorizontal: 12}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(1.86),
                  fontWeight: '600',
                }}>
                {' '}
                Confirm Password
              </Text>
            </View>
            <View style={{paddingHorizontal: 10, marginTop: 6}}>
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
                    placeholder="Enter Your confirm Password"
                    value={cpassword}
                    // onChangeText={value => setcpassword(value)}
                    onChangeText={handleCPasswordChange}
                    placeholderTextColor="#000"
                    secureTextEntry={data1}
                    style={{
                      padding: 5,
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '300',
                      paddingLeft: 8,
                      width: 300,
                    }}
                  />
                </View>

                <View style={{position: 'absolute', right: 5}}>
                  <Icon
                    name={data1 ? 'eye' : 'eye-off'}
                    onPress={() => setdata1(!data1)}
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
            </View>
            {/* {password && cpassword && error ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  paddingHorizontal: 12,
                  marginTop: 5,
                }}>
                {error}
              </Text>
            ) : null} */}

            {/* {
            error && error ?
              <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), paddingLeft: 10, paddingTop: 5 }}>
                {error && error}
              </Text>
              : ""
          } */}
          </View>

          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <TouchableOpacity
              // onPress={() => handleSubmit()}
              onPress={() => {
                if (!error) {
                  handleSubmit();
                }
              }}
              style={{
                backgroundColor: '#000',
                width: '100%',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              {load && load ? (
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
                  Registration
                </Text>
              )}
            </TouchableOpacity>

            {/* google */}

            {/* <View
              style={
                {
                  //marginHorizontal: 80,
                }
              }>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                hideLogo={true}
              />
            </View> */}

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              // onPress={() =>handleSubmit()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: responsiveHeight(2),
                alignItems: 'center',
              }}>
              <Text style={{fontSize: responsiveFontSize(1.6), color: '#000'}}>
                Already have account ?
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.4),
                  paddingLeft: 5,
                  backgroundColor: '#D9D9D9',
                  paddingHorizontal: 7,
                  marginLeft: 4,
                  borderRadius: 10,
                  paddingVertical: 4,
                }}>
                SIGN IN HERE
              </Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 10,
              margin: 2,
            }}>
            <TouchableOpacity
              onPress={signInClickGoogle}
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(2),
                }}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInClick}
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#D9D9D9',
                  fontSize: responsiveFontSize(2),
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{paddingBottom: 14}}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;

const styles = StyleSheet.create({});
