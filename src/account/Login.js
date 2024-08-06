import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserToken, setCurrentUser} from '../redux/slice/appSclice';
import Icon from 'react-native-vector-icons/Feather';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setAsyncStorage} from '../helper/util';
import {logIn, signInWithGoogle} from '../_request';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [erroremail, seterroremail] = useState('');
  const [errorpass, seterrorpass] = useState('');
  const [load, setload] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [data, setdata] = useState(true);

  const handleSubmit = async () => {
    if (!email || !password) {
      if (!email) {
        console.log('Email is not defined');
        // Handle missing email
        Toast('Email cannot to be empty');
        return;
      }
      if (!password) {
        console.log('Password is not defined');
        // Handle missing password
        Toast('Password cannot to be empty');
        return;
      }

      return;
    }

    try {
      setload(true);
      const res = await logIn(email, password);

      dispatch(setUserToken(res.data.data.token));
      dispatch(setCurrentUser(res.data.data));
      setAsyncStorage({
        token: res.data.data.token,
        email,
        password,
        user: res.data.data,
      });
      Toast('Sign in');

      setemail('');
      setpassword('');
      seterror('');
      seterrorpass('');
      seterroremail('');
    } catch (error) {
      if (error?.response) {
        console.error('Server responded with an error:', error.response.data);
        if (error.response.data.err == true) {
          //seterror(error.response.data.message);
          Toast(error.response.data.message);
        }
      } else if (error?.request) {
        console.error('No response received:', error.request);
        Toast('Invalid Log in !!');
      } else {
        console.error('Error setting up the request:', error.message);
        Toast('Invalid Log in !!');
      }
      setload(false);

      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setemail('');
      setpassword('');
    }, []),
  );

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
      const user = userInfo.user;
      const IdToken = userInfo.idToken;
      // console.log(user, 'SIGN IN WITH GOOGLE');

      let reqBody = {
        password: '',
        email: user.email,
        name: user.name,
        idToken: IdToken,
        photo: user.photo,
      };
      setGoogleLoading(true);
      const res = await signInWithGoogle(reqBody);
      setGoogleLoading(false);
      dispatch(setUserToken(res.data.data.token));
      dispatch(setCurrentUser(res.data.data));
      Toast('Sign in');
    } catch (error) {
      console.log(error);
      setGoogleLoading(false);
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

  const SignUpClickButton = () => {
    navigation.navigate('Registration');
    setemail('');
    setpassword('');
  };
  const forgotPasswordClickButton = () => {
    navigation.navigate('Forgotpassword');
    setemail('');
    setpassword('');
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

  return (
    // <ScrollView style={{  backgroundColor: "#fff" }}>
    <ScrollView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
      />

      {/* <ScrollView> */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#000',
          height: windowHeight,
        }}>
        <Image
          source={require('../assets/one.jpg')}
          style={{
            height: 230,
            width: 400,
          }}
          // resizeMode="stretch"
        />
      </View>
      {googleLoading && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: windowHeight,
            //backgroundColor: 'green',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}>
          <View
            style={
              {
                //backgroundColor: 'red',
              }
            }>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      {/* <View style={{backgroundColor: "#fff", borderTopRightRadius: 50,flex:2 }}> */}
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
          zIndex: 1,
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
                fontSize: responsiveFontSize(5),
                fontWeight: '500',
              }}>
              Login
            </Text>
            <Text
              style={{
                color: '#D9D9D9',
                fontSize: responsiveFontSize(1.86),
                fontWeight: '500',
              }}>
              Sign in to continue
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              margin: 10,
              marginLeft: 0,
              marginRight: 0,
            }}>
            <View
              style={{
                width: '100%',
              }}>
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
              <View style={{paddingHorizontal: 10, paddingTop: 5}}>
                <TextInput
                  placeholder="Enter Your Email"
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
                }}></Text>
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
              <View style={{paddingHorizontal: 10, marginTop: 5}}>
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
                      // value={password}
                      onChangeText={value => setpassword(value)}
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
              </View>

              {/* {errorpass && errorpass ? (
            <Text
              style={{
                color: 'red',
                fontSize: responsiveFontSize(1.5),
                paddingLeft: 10,
                paddingTop: 5,
              }}>
              password cannot to be empty
            </Text>
          ) : (
            ''
          )} */}
            </View>

            {/* login */}

            <View style={{paddingHorizontal: 10, marginTop: 10}}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
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
                    Log In
                  </Text>
                )}
              </TouchableOpacity>

              {/* <TouchableOpacity
              onPress={() => ClickButton()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: responsiveHeight(2),
                alignItems: 'center',
              }}>
              <Text style={{fontSize: responsiveFontSize(1.6), color: '#000'}}>
                Don't have an account ?
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
                SIGN UP HERE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Forgotpassword')}
              style={{alignItems: 'center', paddingTop: 10}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.7),
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              margin: 9,
              marginLeft: 0,
              marginRight: 0,
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={forgotPasswordClickButton}
                style={{alignItems: 'center', paddingTop: 10}}>
                <Text
                  style={{
                    color: '#D9D9D9',
                    fontSize: responsiveFontSize(1.7),
                  }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
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
                    fontSize: responsiveFontSize(1.7),
                  }}>
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SignUpClickButton}
                style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#D9D9D9',
                    fontSize: responsiveFontSize(1.7),
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingBottom: 14}}></View>
        </View>

        {/* or */}
        {/* <View style={{}}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ color: "#D9D9D9", fontSize: responsiveFontSize(1.86), }}>or</Text>
          </View>


         
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
