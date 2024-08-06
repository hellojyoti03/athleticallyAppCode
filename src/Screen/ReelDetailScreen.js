import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  Share,
  TextInput,
} from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import Likee from 'react-native-vector-icons/AntDesign';
import DisLikee from 'react-native-vector-icons/AntDesign';
import Messagee from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/AntDesign';
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Sendd from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const ReelDetailScreen = ({route}) => {
  console.log('kpkpkp', route);
  const navigation = useNavigation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState('');
  const [currentreelid, setcurrentreelid] = useState('');
  const flatListRef = useRef(null);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentModel, setcommentModel] = useState(false);
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setcurrentreelid(viewableItems[0].item.id);
      setCurrentVideoIndex(index);
    }
  });

  // console.log("currentVideoIndexcurrentVideoIndex", currentreelid && currentreelid)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;

      const response = await axios.post('/api/v1/get-user-reels', {
        reel_id: route.params.data,
      });
      setdata(response.data.data);
      console.log('Rrrrr', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const likeSubmit = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.post('/api/v1/like-reel', {
        liked_by: route.params.user,
        reel_id: currentreelid && currentreelid,
      });
      // console.log('response', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const SubmitComment = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.post('/api/v1/comment-reel', {
        reel_id: route.params.data,
      });
      setdata(response.data.data);
      // console.log("Rrrrr", response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onEndReached = () => {
    // Handle video end reached
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const initialIndex = data.findIndex(
      item => item.id === String(route.params.data),
    );
    if (initialIndex !== -1) {
      setCurrentVideoIndex(initialIndex);
    }
  }, [data, route.params.data]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const getcommment = () => {
    setcommentModel(true);
  };

  console.log(data, 'REEL DATA');

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          // console.log('itemitemitem', item)
          return (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}>
              {index === currentVideoIndex && (
                <>
                  <Video
                    source={{uri: item.url}}
                    style={{flex: 1}}
                    resizeMode="cover"
                    repeat={false}
                    onEnd={onEndReached}
                    paused={index !== currentVideoIndex}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoad}
                  />
                  {isLoading && (
                    <ActivityIndicator
                      style={{
                        position: 'absolute',
                        top: Dimensions.get('window').height / 2 - 20,
                        left: Dimensions.get('window').width / 2 - 20,
                        zIndex: 1,
                      }}
                      size="large"
                      color="#000"
                    />
                  )}
                </>
              )}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 17,
                  backgroundColor: '#fff',
                  borderRadius: 60,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                }}>
                <Back
                  name="leftcircleo"
                  style={{color: '#000', fontSize: 25}}
                />
              </TouchableOpacity>

              {/* <View style={{ position: 'absolute', bottom: 20, right: 17 }}> */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 8,
                }}>
                <View style={{justifyContent: 'flex-end'}}>
                  <View>
                    <Image
                      source={require('../assets/one.jpg')}
                      style={{width: 20, height: 20}}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={{color: 'red'}}>{item.title}</Text>
                  </View>
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => likeSubmit()}
                    style={{bottom: 85, alignItems: 'center'}}>
                    <Likee name="like1" style={{color: '#fff', fontSize: 25}} />
                    <Text style={{color: 'red', fontSize: 15}}>
                      {item.likes}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{bottom: 65}}>
                    <DisLikee
                      name="dislike1"
                      style={{color: '#fff', fontSize: 25}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => getcommment()}
                    style={{alignItems: 'center', bottom: 45}}>
                    <Messagee
                      name="message1"
                      style={{color: '#fff', fontSize: 25}}
                    />
                    <Text style={{color: 'red', fontSize: 15}}>
                      {item.comment}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onShare()}
                    style={{bottom: 25, alignItems: 'center'}}>
                    <ShareIcon
                      name="share-all"
                      style={{color: '#fff', fontSize: 20}}
                    />
                    {/* <Text style={{color:"red",fontSize: 15}}>{item.likes}</Text> */}
                  </TouchableOpacity>

                  <TouchableOpacity style={{}}>
                    <ShareIcon
                      name="dots-horizontal-circle"
                      style={{color: '#fff', fontSize: 25}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        initialScrollIndex={currentVideoIndex && currentVideoIndex}
      />
      {/* coment model */}

      <Modal
        isVisible={commentModel}
        onBackdropPress={() => setcommentModel(false)}
        onSwipeComplete={() => setcommentModel(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            marginHorizontal: 8,
          }}>
          <View
            style={{
              height: 'auto',
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 4,
              right: 0,
              left: 0,
              width: '100%',
              borderRadius: 25,
              // borderTopRightRadius: 5,
              // paddingHorizontal: 15,
              borderColor: '#F29D38',
              borderWidth: 0.95,
              alignItems: 'center',
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <TextInput
              placeholder="Enter  Name"
              placeholderTextColor={'#000'}
              //   value={doctordata?.doctor_name}
              // onChangeText={value => setname(value)}
              style={{
                width: '90%',
                // borderBottomWidth: 0.29,
                borderBottomColor: '#fff',
                padding: 0,
                fontSize: 15,
                color: '#000',
                fontWeight: '300',
                // backgroundColor: "red"
              }}
            />
            <TouchableOpacity
              onPress={() => SubmitComment()}
              style={{width: '10%', alignItems: 'center'}}>
              <Sendd
                name="send-outline"
                style={{color: '#000', fontSize: 25}}
              />
            </TouchableOpacity>
            {/* <View style={{ marginBottom: 10 }}></View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReelDetailScreen;
