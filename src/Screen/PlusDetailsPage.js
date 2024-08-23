import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import Cameraaaa from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
const PlusDetailsPage = ({route}) => {
  // const [photo, setPhotoURI] = useState(null);
  const [statusBarStyle, setStatusBarStyle] = useState();
  const navigation = useNavigation();
  const [review, setreview] = useState('');
  const [videoUri, setVideoUri] = useState('');
  const dataitem = useSelector(state => state.tokenn);

  const handleSubmit = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = dataitem[0]?.token;
      const formData = new FormData();
      formData.append('user_id', dataitem[0]?.user_id);
      formData.append('post', review && review);
      formData.append('reel', {
        uri: videoUri.uri,
        type: videoUri.type,
        name: videoUri.fileName,
      });

      console.log('formData', formData);
      console.log(' result?.user_id', result?.user_id);
      console.log('videoUri && videoUri ', videoUri && videoUri.uri);

      const response = await axios.post(
        'http://15.206.66.165:3009/api/v1/create-reels',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      console.log('response', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [mediaType, setMediaType] = useState(null);
  async function requestPermissions() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  // const handdlechange = () => {
  //   const options = {
  //     mediaType: 'video',
  //     quality: 1,
  //   };
  //   launchCamera(options, response => {
  //     console.log(response);
  //     if (response.didCancel) {
  //       console.log('User cancelled video picker');
  //       // Handle user cancellation
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorCode);
  //       // Handle any errors
  //     } else if (response.errorMessage) {
  //       console.log('Error Message: ', response.errorMessage);
  //       // Handle any error messages
  //     } else if (response?.assets) {
  //       console.log(response, 'Video response');
  //       setVideoUri(response.assets[0].uri);
  //     }
  //   });

  //   // ImagePicker.openCamera({
  //   //   mediaType: 'any', // This allows both image and video capture
  //   // })
  //   //   .then(media => {
  //   //     console.log(media);
  //   //     setMediaUri(media.path);
  //   //     setMediaType(media.mime.startsWith('video') ? 'video' : 'image');
  //   //   })
  //   //   .catch(error => {
  //   //     if (error.code === 'E_PICKER_CANCELLED') {
  //   //       console.log('User cancelled media picker');
  //   //     } else {
  //   //       console.error('ImagePicker Error: ', error);
  //   //     }
  //   //   });
  // };
  const handdlechange = async () => {
    try {
      const options = {
        mediaType: 'video',
        quality: 1,
      };
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled video picker');
          } else if (response.errorCode) {
            console.error('ImagePicker Error Code: ', response.errorCode);
          } else if (response.errorMessage) {
            console.error('ImagePicker Error Message: ', response.errorMessage);
          } else if (response?.assets) {
            setVideoUri(response.assets[0].uri);
          }
        });
      } else {
        console.log('Permissions not granted');
      }
    } catch (error) {
      console.error('Error launching camera: ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
      />

      <View style={{}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 5,
          }}>
          <View></View>
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: responsiveWidth(0.68),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
                color: '#fff',
                fontWeight: '400',
                alignItems: 'center',
              }}>
              ATHELETICALY
            </Text>
          </View>

          <View style={{}}>
            <Cameraaaa
              name="camera"
              style={{fontSize: responsiveFontSize(2.1)}}
            />
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: 10}}>
        <View style={{width: '100%'}}>
          <View style={{}}>
            {videoUri && videoUri ? (
              <Video
                // ref={vedioRef}
                // controls={true}
                // source={{ uri: route.params.data.assets[0].uri }}
                source={{uri: videoUri && videoUri?.uri}}
                style={{
                  width: '100%',
                  height: 120,

                  backgroundColor: '#fff',
                  borderRadius: 5,
                }}
                resizeMode="cover"
                paused={true}
              />
            ) : (
              <Image
                source={require('../assets/oookkk.jpg')}
                style={{width: '100%', height: 150, borderRadius: 20}}
                resizeMode="stretch"
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => handdlechange()}
            style={{
              backgroundColor: '#bdbdbd',
              marginTop: 10,
              borderRadius: 20,
              alignItems: 'center',
              paddingVertical: 5,
              fontSize: responsiveFontSize(1.8),
            }}>
            <Text style={{color: '#000'}}> Video Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginHorizontal: 10}}>
        <View style={{width: '100%'}}>
          <View style={{paddingTop: 13}}>
            <TextInput
              placeholder="Add  Tittle Here"
              placeholderTextColor={'#b5b5b5'}
              onChangeText={text => setreview(text)}
              style={{
                width: '100%',
                borderBottomWidth: 0.29,
                borderBottomColor: '#a1bdc8',
                marginTop: 5,
                padding: 0,
                fontSize: responsiveFontSize(1.85),
                color: '#fff',
                fontWeight: '300',
              }}
            />
          </View>

          <View style={{marginHorizontal: 5, marginTop: 30}}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text style={{color: '#000'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlusDetailsPage;

// import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, TextInput, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Video from 'react-native-video';
// import Notificationss from 'react-native-vector-icons/MaterialIcons';
// import Cameraaaa from 'react-native-vector-icons/Entypo';
// const { width, height } = Dimensions.get('window')
// import axios from "axios"
// import {
//     responsiveHeight,
//     responsiveWidth,
//     responsiveFontSize
// } from "react-native-responsive-dimensions"

// const PlusDetailsPage = ({ route }) => {

//     console.log('routeeee', route)
//     // const [photo, setPhotoURI] = useState(null);
//     const [statusBarStyle, setStatusBarStyle] = useState();
//     const navigation = useNavigation();
//     // const [videoUri, setVideoUri] = useState(route.params.data.assets[0]);
//     // setVideoUri(route.params.data.assets[0])

//     // const handdlechange = () => {
//     //     const options = {
//     //         mediaType: 'video',
//     //         quality: 1,
//     //         // customButtons: [
//     //         //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//     //         // ],
//     //         // title: 'Select Image or Video',
//     //         // mediaType: 'mixed', // This option allows both images and videos
//     //         // takePhotoButtonTitle: 'Take Photo or Video',
//     //         // chooseFromLibraryButtonTitle: 'Choose from Library',
//     //     };
//     //     launchImageLibrary(options, response => {
//     //         if
//     //             // (response.uri)
//     //             (response.assets)

//     //             console.log(response, 'jdkas');
//     //         setVideoUri(response.assets[0]);
//     //         // setVideoUri(response.assets[0].uri);

//     //     });
//     // };
//     // useEffect(() => {
//     //     handdlechange()
//     // }, [])
//     const handleSubmit = async () => {
//         // setload(true)
//         try {
//             console.log('kokokokokok')
//             const formData = new FormData();
//             formData.append('user_id', "65084a48b5c351c3bdbd492b");
//             formData.append('post', 'ppppp');
//             formData.append('reel', {
//                 uri: videoUri.uri,
//                 type: videoUri.type,
//                 name: videoUri.fileName,
//             });

//             console.log('formData', formData)
//             console.log('videoUri && videoUri ', videoUri && videoUri.uri)

//             const response = await axios.post('https://athletically.onrender.com/api/v1/create-reels', formData, {
//                 headers: {
//                     'content-type': 'multipart/form-data',
//                 },
//             });
//             console.log('response', response)
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000" }}>
//             <StatusBar
//                 animated={true}
//                 backgroundColor="#000"
//                 barStyle={statusBarStyle}
//             />
//             <View style={{}}>
//                 <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15,paddingTop:5 }}>
//                     <View>

//                     </View>
//                     <View style={{
//                         justifyContent: "center",
//                         paddingLeft: responsiveWidth(.68),
//                         alignItems: "center",

//                     }}>
//                         <Text
//                             style={{
//                                 fontSize: responsiveFontSize(2.1),
//                                 color: "#fff",
//                                 fontWeight: '400',
//                                 alignItems: "center"
//                             }}>
//                             ATHELETICALY
//                         </Text>
//                     </View>

//                     <View style={{}}>
//                         <Cameraaaa name="camera" style={{ fontSize: responsiveFontSize(2.1) }} />
//                     </View>
//                 </View>
//             </View>

//             <View style={{ marginHorizontal: 8,marginTop: 20  }}>
//                 <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", }}>
//                     <View style={{
//                         width: "30%",
//                         // backgroundColor:"red",
//                         borderWidth: 1,
//                         borderColor: "#fff",
//                         borderRadius: 5,

//                     }}>
//                         <Video
//                             // ref={vedioRef}
//                             // controls={true}
//                             // source={{ uri: route.params.data.assets[0].uri }}

//                             style={{
//                                 width: "100%",
//                                 height: 100,
//                                 backgroundColor: "#fff",
//                                 borderRadius: 5,

//                             }}
//                             resizeMode="cover"
//                             paused={true}
//                         />
//                     </View>

//                     <View style={{
//                         width: "70%",
//                         paddingLeft: 8,

//                         // backgroundColor:"blue"
//                     }}>
//                         <TextInput
//                             placeholder="Enter First Name"
//                             placeholderTextColor={'#fff'}
//                             // onChangeText={text => setfirstname(text)}
//                             style={{
//                                 width: '100%',
//                                 // borderBottomWidth: 0.29,
//                                 // borderBottomColor: "#a1bdc8",
//                                 marginTop: 5,
//                                 padding: 0,
//                                 fontSize: responsiveFontSize(1.85),
//                                 color: '#fff',
//                                 fontWeight: '300',

//                             }}
//                         />
//                     </View>
//                 </View>

//                 <View style={{ marginHorizontal: 5, marginTop: 30 }}>
//                     <TouchableOpacity
//                         onPress={() => handleSubmit()}
//                         style={{
//                             width: "100%",
//                             backgroundColor: "#fff",
//                             alignItems: "center",
//                             paddingVertical: 5,
//                             borderRadius: 10
//                         }}>
//                         <Text style={{ color: "#000" }}>Post</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default PlusDetailsPage

// const styles = StyleSheet.create({})
