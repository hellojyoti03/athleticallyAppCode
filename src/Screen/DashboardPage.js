import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Video from 'react-native-video';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TabBar from '../common/TabBar';
import Modal from 'react-native-modal';
import axios from 'axios';
const deviceheight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const DashboardPage = ({route}) => {
  // console.log("updated data",route.params.data)
  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [data, setdata] = useState('');
  const [updatemodel, setupdatemodel] = useState(false);
  const [userid, setuserid] = useState('');
  const [load, setload] = useState(false);
  // const dataitem = useSelector(state => state.tokenn)
  // console.log("dataitemeeeeee",dataitem)
  const result = useSelector(state => state.app.currentUser);
  const userToken = useSelector(state => state.app.userToken);

  const getreels = async () => {
    try {
      //   AsyncStorage.setItem('usertoken', JSON.stringify(result?.token));

      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

      setload(true);
      // axios.defaults.headers.common['Authorization'] = result?.token ;
      await axios
        .get(`/api/v1/get-homepage-reels`, {user_id: result.user_id})
        .then(res => {
          setload(false);
          setdata(res.data.data);
          console.log(res.data.data, 'reels data');
          // Toast()
        });
      // console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getreels();
  }, []);

  const renderItem = ({item, index}) => {
    console.log('itemitem', item);
    return (
      <View style={{flex: 1, marginTop: 5}}>
        {load && load ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 3,
              marginHorizontal: 5,
              paddingTop: 4,
              paddingBottom: 2,
            }}>
            <View
              style={{
                width: '32%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ShimmerPlaceholder
                style={{
                  height: 100,
                  width: '85%',
                  borderRadius: 90,
                  backgroundColor: '#000',
                }}></ShimmerPlaceholder>

              <ShimmerPlaceholder
                style={{
                  height: 20,
                  width: '85%',
                  borderRadius: 2,
                  marginTop: 5,
                  // backgroundColor: 'red',
                }}></ShimmerPlaceholder>
            </View>

            <View
              style={{
                width: '65%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
              }}>
              <ShimmerPlaceholder
                style={{
                  height: 200,
                  width: '45%',
                  borderRadius: 9,
                  backgroundColor: '#000',
                }}></ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={{
                  height: 200,
                  width: '45%',
                  borderRadius: 9,
                  backgroundColor: '#000',
                }}></ShimmerPlaceholder>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 3,
              marginHorizontal: 5,
              paddingTop: 4,
              paddingBottom: 2,
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate("UserProfiledetails", { data: item })}
              onPress={() =>
                navigation.navigate('ReelDetailScreen', {data: item})
              }
              style={{
                width: '32%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item?.image}}
                style={{height: 100, width: '85%', borderRadius: 90}}
              />
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  paddingTop: 5,
                  color: '#fff',
                  fontWeight: '500',
                }}>
                {item?.name}
              </Text>
            </TouchableOpacity>

            {item.reels?.map(reelsitem => {
              // console.log('reel id ::', reelsitem.id)
              // console.log('user id :: ', item.id)
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReelDetailScreen', {
                      data: reelsitem.id,
                      user: item.id,
                    })
                  }
                  style={{
                    width: '32%',
                  }}
                  key={reelsitem.id}>
                  <Video
                    source={{uri: reelsitem?.url}}
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}
                    resizeMode="stretch"
                    paused={true}
                  />
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={{margin: 4}}></TouchableOpacity>
          </View>
        )}
      </View>
    );
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

          <View style={{flexDirection: 'row'}}>
            <View style={{}}>
              {result.user?.photo ? (
                <Image
                  resizeMode="contain"
                  style={{height: 18, width: 18, borderRadius: 50}}
                  source={{uri: result.user?.photo}}
                />
              ) : (
                ''
              )}
            </View>
            <View style={{}}>
              <Notificationss
                name="notification-add"
                style={{fontSize: responsiveFontSize(2.5)}}
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Matchesvideos')}
            style={{
              width: devicewidth / 4 - 20,
              height: deviceheight / 4,
              backgroundColor: '#52d3d8',
              marginHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
              }}>
              MATCHES
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Podcast')}
            style={{
              width: devicewidth / 4 - 20,
              height: deviceheight / 4,
              backgroundColor: '#13f017',
              marginHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
              }}>
              PODCAST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('LeaderBoard')}
            style={{
              width: devicewidth / 4 - 20,
              height: deviceheight / 4,
              backgroundColor: '#fff',
              marginHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
              }}>
              LEADER BOARD
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Events')}
            style={{
              width: devicewidth / 4 - 20,
              height: deviceheight / 4,
              backgroundColor: '#424242',
              marginHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#FFF',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
              }}>
              EVENTS
            </Text>
          </TouchableOpacity>
        </View>

        {/* previous */}
        <View style={{}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item}
            // keyExtractor={(item, index) => index.toString()}
            // horizontal
            contentContainerStyle={{
              padding: 3,
              // gap: 10
            }}
          />
          <View style={{marginBottom: 50, backgroundColor: 'grey'}}></View>
        </View>
      </ScrollView>

      <Modal
        isVisible={updatemodel}
        onBackdropPress={() => setupdatemodel(false)}
        onSwipeComplete={() => setskilllssss(false)}
        backdropOpacity={0.5}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 20,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: '100%',
              height: 'auto',
              paddingVertical: 10,
            }}>
            <View>
              <View style={{}}>
                <Text style={{color: '#000'}}>Select Game</Text>
              </View>
            </View>
          </View>
        </View>

        {/* buttonStyle */}
      </Modal>
      <TabBar />
    </View>
  );
};

export default DashboardPage;
