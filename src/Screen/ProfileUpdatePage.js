import {
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Video from 'react-native-video';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
const {width, height} = Dimensions.get('window');
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import Followers from 'react-native-vector-icons/dist/FontAwesome5';
import SettingsIcon from 'react-native-vector-icons/dist/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deviceheight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;
const ProfileUpdatePage = ({route}) => {
  const navigation = useNavigation();
  console.log('routeroute', route);
  const [name, setname] = useState('');
  const [teamsize, setteamsize] = useState('');
  const [homeground, sethomeground] = useState('');
  const [city, setcity] = useState('');
  const [age, setage] = useState('');
  const [map, setmap] = useState('');
  const [height, setheight] = useState('');
  const [width, setwidth] = useState('');
  const [country, setcountry] = useState('');
  const [medals, setMedals] = useState([]);
  const [managements, setmanagements] = useState([]);
  const [alumniplayers, setalumniplayers] = useState([]);
  const [activelyparticipate, setactivelyparticipate] = useState([]);
  const [teamcoaches, setteamcoaches] = useState([]);
  const [certifications, setcertifications] = useState([]);
  const [awards, setawards] = useState([]);
  const [teamplayers, setteamplayers] = useState([]);
  const [championships, setchampionships] = useState([]);
  const [Clubs, setClubs] = useState([]);
  const [coaches, setcoaches] = useState([]);
  const [getpositiondata, setgetpositiondata] = useState('');
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [data, setdata] = useState('');
  const [position, setposition] = useState('');
  const [positionid, setpositionid] = useState('');
  const [Organizationid, setOrganizationid] = useState('');
  const [gamedata, setGamedata] = useState([]);
  const [reel, setreel] = useState('1');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [photo, setPhotoURI] = useState('');
  const [profiledataget, setprofiledataget] = useState('');
  const [personilitydropdown, setpersonilitydropdown] = useState('');
  const [storagetypesave, setstoragetypesave] = useState('');
  const [load, setload] = useState(false);
  const [otherstaff, setotherstaff] = useState([]);
  const [startdate, setstartdate] = useState('');
  const [description, setdescription] = useState('');
  const [organizationtype, setorganizationtype] = useState('');
  const [keyPersonalities, setKeyPersonalities] = useState([]);

  const handleKeyPersonalitiesInputChange = (text, field, index) => {
    const updatedKeyPersonalities = [...keyPersonalities];
    updatedKeyPersonalities[index][field] = text.trim() !== '' ? text : null;
    setKeyPersonalities(updatedKeyPersonalities);
  };

  const getProfileDetails = async () => {
    try {
      setload(true);
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log(modifiedUser, 'modified User');

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;

      const response = await axios.get(
        `/api/v1/get-user-profile?user_id=${modifiedUser?.user_id}`,
      );

      if (response.data.err == false) {
        setload(false);
        setKeyPersonalities(response.data.data.key_personalities);
        setprofiledataget(response.data.data);
        setMedals(response.data.data?.medals || []);
        setawards(response.data.data?.awards || []);
        setteamplayers(response.data.data?.players || []);
        setotherstaff(response.data.data?.other_stuffs || []);
        setmanagements(response.data.data?.managements || []);
        setactivelyparticipate(response.data.data?.active_competition || []);
        setalumniplayers(response.data.data?.alumni_players || []);
        setteamcoaches(response.data.data?.previous_coaches || []);
        setClubs(response.data.data?.clubs || []);
        setcoaches(response.data.data?.coaches || []);
        setname(response.data.data?.name || '');
        setdescription(response.data.data?.desc || '');
        setteamsize(response.data.data?.team_size || '');
        sethomeground(response.data.data?.home_ground || '');
        setage(response.data.data?.age || '');
        setmap(response.data.data?.map_link || '');
        setwidth(response.data.data?.width || '');
        setheight(response.data.data?.height || '');
        setcity(response.data.data?.city || '');
        setchampionships(response.data.data?.competition_won || []);

        // setawards(response.data.data?.competition_won || []);
      }
      console.log('Profile Data:', response);
    } catch (error) {
      setload(false);
      console.error('Error fetching data:', error);
    }
  };

  const getorganizationtype = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.get(`/api/v1/get-org-types`);
      setorganizationtype(response.data.data);
      console.log('otganizationtype', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getorganizationtype();
  }, []);

  const handleactivelyparticipateChange = (index, newName) => {
    const updateteactivelyparticipate = [...activelyparticipate];
    updateteactivelyparticipate[index].name = newName;
    setactivelyparticipate(updateteactivelyparticipate);
  };

  const handlealumniplayersNameChange = (index, newName) => {
    const updatetealumniplayers = [...alumniplayers];
    updatetealumniplayers[index].name = newName;
    setalumniplayers(updatetealumniplayers);
  };

  const handleteamplayersNameChange = (index, newName) => {
    const updateteamplayers = [...teamplayers];
    updateteamplayers[index].name = newName;
    setotherstaff(updateteamplayers);
  };

  const handleotherstaffNameChange = (index, newName) => {
    const updateotherstaff = [...otherstaff];
    updateotherstaff[index].name = newName;
    setotherstaff(updateotherstaff);
  };

  const handleprevious_coachesNameChange = (index, newName) => {
    const updateteamcoaches = [...managements];
    updateteamcoaches[index].name = newName;
    setteamcoaches(updateteamcoaches);
  };

  const handleManagementNameChange = (index, newName) => {
    const updatemanagements = [...managements];
    updatemanagements[index].name = newName;
    setmanagements(updatemanagements);
  };

  const handleCertificationsNameChange = (index, newName) => {
    const updatecertifications = [...certifications];
    updatecertifications[index].name = newName;
    setcertifications(updatecertifications);
  };

  const handleMedalNameChange = (index, newName) => {
    const updatedMedals = [...medals];
    updatedMedals[index].name = newName;
    setMedals(updatedMedals);
  };

  const handleawardNameChange = (index, newName) => {
    const updatedawards = [...awards];
    updatedawards[index].name = newName;
    setawards(updatedawards);
  };

  const handleChampionshipsNameChange = (index, newName) => {
    const updatedChampionships = [...championships];
    updatedChampionships[index].championship = newName;
    setchampionships(updatedChampionships);
  };

  const handleclubsNameChange = (index, key, value) => {
    const updatedClubs = [...Clubs];
    updatedClubs[index][key] = value;
    setClubs(updatedClubs);
  };

  const handleCoachesNameChange = (index, key, value) => {
    const updatedCoaches = [...coaches];
    updatedCoaches[index][key] = value;
    setcoaches(updatedCoaches);
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
        reel_id: '65749417625a8953a6ca920d',
      });
      setdata(response.data.data);
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getgame = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.get('/api/v1/get-game-list');
      setGamedata(response.data.data);
      console.log('getgame', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getpostion = async id => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      // const id = (req.params.id).trim();
      const response = await axios.post(
        `/api/v1/get-position-list?game_id=${id}`,
        {
          game_id: id,
        },
      );
      setgetpositiondata(response.data.data);
      console.log('getposition', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfileDetails();
    }, []),
  );

  const PersonalityType = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.get(`/api/v1/get-types-list`);
      setpersonilitydropdown(response.data.data.types);
      console.log('setpersonilitydropdown', response.data.data.types);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    PersonalityType();
  }, []);

  useEffect(() => {
    if (route?.params?.data) {
      setreel('2');
    } else {
      setreel('1');
    }
  }, [route]);

  useEffect(() => {
    getgame();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, backgroundColor: '#424242'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 3,
            justifyContent: 'center',
            paddingTop: 4,
            paddingBottom: 2,
          }}>
          <Video
            source={{uri: item?.url}}
            style={{
              // flex: 1,
              width: '100%',
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
            resizeMode="stretch"
            paused={true}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    // Retrieve the value from AsyncStorage
    const fetchAsyncStorageValue = async () => {
      try {
        const mr = await AsyncStorage.getItem('usertoken');
        console.log('mr:', mr);
        if (mr !== null) {
          const modifiedUser = JSON.parse(mr);
          console.log('modifiedUser:', modifiedUser);

          if (modifiedUser?.user_type) {
            setstoragetypesave(modifiedUser.user_type);
            // setstoragee(modifiedUser.user_type);
            console.log('User type:', modifiedUser.user_type);
          } else {
            console.log('No user type found in modifiedUser');
          }
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving AsyncStorage value:', error);
      }
    };

    fetchAsyncStorageValue();
  }, []);

  const EmptyListMessage = ({}) => {
    return (
      // Flat List Item
      <View
        style={{
          paddingTop: '30%',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: '70%',
              height: 170,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={require('../assets/nodatafound1.png')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            margin: 10,
          }}>
          <Text
            style={{
              color: '#545454',
              fontSize: 15,
              fontWeight: '300',
              backgroundColor: '#ced9db',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 2,
              elevation: 10,
            }}>
            No Data Found
          </Text>
        </View>
      </View>
    );
  };

  console.log('mol', typeof (teamsize && teamsize));

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
      />

      <DatePicker
        modal
        open={open}
        date={date}
        title="Select Date"
        mode="date"
        onConfirm={date => {
          // let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
          // setOpen(false);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;

          setOpen(false);
          setstartdate(formattedDate, console.log('lkikiki', formattedDate));
        }}
        onCancel={() => {
          setOpen(false);
        }}
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

          <View style={{}}>
            <Notificationss
              name="notification-add"
              style={{fontSize: responsiveFontSize(2.6)}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 6,
        }}>
        <View style={{width: '30%', paddingTop: 4}}>
          {profiledataget && profiledataget.image ? (
            <View>
              {photo && photo ? (
                <Image
                  source={{uri: photo.uri}}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 65,
                  }}
                />
              ) : (
                <Image
                  source={{uri: profiledataget && profiledataget.image}}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 65,
                  }}
                />
              )}
            </View>
          ) : (
            <View style={{}}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 65,
                }}
                source={require('../assets/user.jpg')}
              />
            </View>
          )}
        </View>

        <View
          style={{
            width: '70%',
            padding: 10,
          }}>
          <View style={{paddingLeft: 5}}>
            {profiledataget && profiledataget.name ? (
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                {profiledataget && profiledataget?.name}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                User Name
              </Text>
            )}
            {/* <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.7), fontWeight: "400", paddingTop: 1, }}>{storagetypesave && storagetypesave}</Text> */}
            <Text
              style={{
                color: '#fff',
                fontSize: responsiveFontSize(1.7),
                fontWeight: '400',
                paddingTop: 1,
              }}>
              {profiledataget && profiledataget?.user_type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              paddingTop: 10,
            }}>
            <View style={{alignItems: 'center'}}>
              <Followers
                name="user-friends"
                style={{color: '#fff', fontSize: responsiveFontSize(2)}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '400',
                }}>
                Followers
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: responsiveFontSize(2)}}>
                0
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '400',
                }}>
                Rating
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: responsiveFontSize(2)}}>
                0
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '400',
                }}>
                Ath Ranks
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </View>

      <View style={{marginTop: 5}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#424242',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 5,
            gap: 4,
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => setreel('1')}
            style={{
              width: '50%',
              backgroundColor: reel === '1' ? '#2b2b2b' : '#424242',
              alignItems: 'center',
              paddingVertical: 6,
              justifyContent: 'center',
              // borderRadius: 6
            }}>
            <Text style={{fontSize: responsiveFontSize(2), color: '#fff'}}>
              Uploads
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setreel('2')}
            style={{
              width: '50%',
              backgroundColor: reel === '2' ? '#2b2b2b' : '#424242',
              alignItems: 'center',
              paddingVertical: 4,
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Text style={{fontSize: responsiveFontSize(2), color: '#fff'}}>
              Bio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {reel && reel === '1' ? (
        <ScrollView>
          {load && load == true ? (
            <View
              style={{
                flex: 1,
                marginVertical: '60%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="small" color="#fff" animating={load} />
              <Text style={{fontSize: 12, color: '#fff', fontWeight: '400'}}>
                please wait
              </Text>
            </View>
          ) : (
            <View style={{}}>
              <FlatList
                // data={profiledataget.reels}
                data={
                  profiledataget?.reels && profiledataget?.reels.length > 0
                    ? profiledataget?.reels
                    : ''
                }
                renderItem={renderItem}
                style={{backgroundColor: '#424242', height: 900}}
                ListEmptyComponent={EmptyListMessage}
                keyExtractor={item => item}
                numColumns={3}
                contentContainerStyle={{
                  padding: 3,
                  justifyContent: 'space-between',
                }}
              />
              <View style={{marginBottom: 50, backgroundColor: 'grey'}}></View>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{marginTop: 5, marginHorizontal: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileForm')}
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  User Type :
                </Text>
              </View>
              <View style={{paddingLeft: 5}}>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '500'}}>
                  {profiledataget && profiledataget?.user_type}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 5,
                }}>
                <SettingsIcon
                  name="settings"
                  style={{
                    color: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </View>
              <Text style={{fontSize: responsiveFontSize(1.8), color: '#fff'}}>
                Manage Profile
              </Text>
            </View>
          </TouchableOpacity>

          {profiledataget && profiledataget?.user_type === 'viewer' && (
            <View
              style={{
                paddingHorizontal: 15,
                width: '100%',
                height: 500,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor:"red"
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <View>
                  <Text style={{fontSize: responsiveFontSize(1.9)}}>
                    For improved performance, update your profile through the
                    manage profile option
                  </Text>
                </View>
              </View>
            </View>
          )}

          {profiledataget && profiledataget?.user_type === 'player' && (
            <ScrollView
              style={{backgroundColor: '#424242', marginTop: 5, height: 500}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: '100%',
                }}>
                {/* name */}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Name</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={name}
                    onChangeText={value => setname(value)}
                  />
                </View>

                {/* Sport */}

                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Select Sports
                  </Text>
                  <SelectDropdown
                    data={gamedata.map(item => item.name)}
                    defaultButtonText={profiledataget?.game_name}
                    onSelect={(selectedItem, index) => {
                      const selectedGame = gamedata.find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setposition(selectedGameId);
                        getpostion(selectedGameId);
                        console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                {/* type */}

                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Type
                  </Text>
                  <SelectDropdown
                    data={(getpositiondata || []).map(item => item.name)}
                    defaultButtonText={profiledataget?.position_name}
                    onSelect={(selectedItem, index) => {
                      const selectedGame = (getpositiondata || []).find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setpositionid(selectedGameId);
                        console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                {/* City*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>City</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={city}
                    onChangeText={value => setcity(value)}
                  />
                </View>

                {/* Country*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Country</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={profiledataget && profiledataget?.country}
                    onChangeText={value => setcountry(value)}
                  />
                </View>

                {/* Awards*/}
                {awards.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Awards</Text>
                    </View>

                    {awards.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleawardNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Medals*/}

                {medals.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Medals</Text>
                    </View>

                    {medals.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleMedalNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Championships*/}
                {championships.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Championships
                      </Text>
                    </View>

                    {championships.map((item, index) => {
                      // console.log("itemiqqqqqtem",item)
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: '#fff',
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                          }}>
                          <TextInput
                            style={{
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                            value={item.championship}
                            onChangeText={text =>
                              handleChampionshipsNameChange(index, text)
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/* clubs */}
                {profiledataget && profiledataget.clubs.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Clubs Associated with:
                      </Text>
                    </View>
                    {profiledataget.clubs.map((item, index) => (
                      <View key={index}>
                        <TextInput
                          value={Clubs[index]?.name}
                          onChangeText={text =>
                            handleclubsNameChange(index, 'name', text)
                          }
                          style={{
                            backgroundColor: '#fff',
                            paddingVertical: 5,
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                            color: '#000',
                          }}
                        />

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            gap: 3,
                            alignItems: 'center',
                          }}>
                          <TextInput
                            value={Clubs[index]?.from}
                            onChangeText={text =>
                              handleclubsNameChange(index, 'from', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />

                          <TextInput
                            value={Clubs[index]?.to}
                            onChangeText={text =>
                              handleclubsNameChange(index, 'to', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* clubs */}

                {/*  Coaches */}
                {profiledataget && profiledataget.coaches.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Coaches</Text>
                    </View>
                    {profiledataget.coaches.map((item, index) => (
                      <View key={index}>
                        <TextInput
                          value={coaches[index]?.name}
                          onChangeText={text =>
                            handleCoachesNameChange(index, 'name', text)
                          }
                          style={{
                            backgroundColor: '#fff',
                            paddingVertical: 5,
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                            color: '#000',
                          }}
                        />

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            gap: 3,
                            alignItems: 'center',
                          }}>
                          <TextInput
                            value={coaches[index]?.from}
                            onChangeText={text =>
                              handleCoachesNameChange(index, 'from', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />

                          <TextInput
                            value={coaches[index]?.to}
                            onChangeText={text =>
                              handleCoachesNameChange(index, 'to', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Age*/}

                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Age</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={age}
                    onChangeText={value => setage(value)}
                  />
                </View>
                {/* {
                                        profiledataget && profiledataget?.age ?
                                            <View style={{ width: "100%", marginTop: 5 }}>
                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Age</Text>
                                                </View>

                                                <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.age}</Text>
                                                </View>
                                            </View>
                                            : ""
                                    } */}

                {/* Height*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Height</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={height}
                    onChangeText={value => setheight(value)}
                  />
                </View>

                {/* Weight*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>width</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={width}
                    onChangeText={value => setwidth(value)}
                  />
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: '#000',
                      width: '100%',
                      borderRadius: 5,
                      paddingVertical: 7,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      Edit Profile Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          {profiledataget && profiledataget?.user_type === 'other' && (
            <ScrollView
              style={{backgroundColor: 'grey', marginTop: 5, height: 500}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: '100%',
                }}>
                {/* name */}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Name</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={name}
                    onChangeText={value => setname(value)}
                  />
                </View>

                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Select Sports
                  </Text>
                  <SelectDropdown
                    data={gamedata.map(item => item.name)}
                    defaultButtonText={profiledataget?.game_name}
                    onSelect={(selectedItem, index) => {
                      const selectedGame = gamedata.find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setposition(selectedGameId);
                        getpostion(selectedGameId);
                        console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Type
                  </Text>
                  <SelectDropdown
                    data={personilitydropdown.map(
                      item => item.personality_type_name,
                    )}
                    defaultButtonText={profiledataget?.type_name}
                    onSelect={(selectedItem, index) => {
                      const selectedGame = personilitydropdown.find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setposition(selectedGameId);
                        getpostion(selectedGameId);
                        console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                {/* <View style={{ width: "100%", paddingTop: 9 }}>
                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: "600" }}>
                                            Type
                                        </Text>
                                        <SelectDropdown
                                            data={(getpositiondata || []).map((item) => item.name)}
                                            defaultButtonText={profiledataget?.position_name}
                                            onSelect={(selectedItem, index) => {
                                                const selectedGame = (getpositiondata || []).find(item => item.name === selectedItem);
                                                if (selectedGame) {
                                                    const selectedGameId = selectedGame._id;
                                                    setpositionid(selectedGameId);
                                                    console.log('lllll', selectedItem, selectedGameId);
                                                }
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                                            buttonStyle={styles.dropdown1BtnStyle}
                                            buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                            rowTextForSelection={(item, index) => item}
                                        />

                                    </View> */}
                {/* City*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>City</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={city}
                    onChangeText={value => setcity(value)}
                  />
                </View>

                {/* Country*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Country</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={profiledataget && profiledataget?.country}
                    onChangeText={value => setcountry(value)}
                  />
                </View>

                {/* Certifications for the role*/}
                {certifications.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Awards</Text>
                    </View>

                    {certifications.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleCertificationsNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Clubs Associated with:*/}
                {profiledataget && profiledataget.clubs.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Clubs Associated with:
                      </Text>
                    </View>
                    {profiledataget.clubs.map((item, index) => (
                      <View key={index}>
                        <TextInput
                          value={Clubs[index]?.name}
                          onChangeText={text =>
                            handleclubsNameChange(index, 'name', text)
                          }
                          style={{
                            backgroundColor: '#fff',
                            paddingVertical: 5,
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                            color: '#000',
                          }}
                        />

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            gap: 3,
                            alignItems: 'center',
                          }}>
                          <TextInput
                            value={Clubs[index]?.from}
                            onChangeText={text =>
                              handleclubsNameChange(index, 'from', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />

                          <TextInput
                            value={Clubs[index]?.to}
                            onChangeText={text =>
                              handleclubsNameChange(index, 'to', text)
                            }
                            style={{
                              width: '50%',
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Awards*/}
                {awards.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Awards</Text>
                    </View>

                    {awards.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleawardNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Medals*/}
                {medals.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>Medals</Text>
                    </View>

                    {medals.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleMedalNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Championships*/}
                {championships.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Championships
                      </Text>
                    </View>

                    {championships.map((item, index) => {
                      // console.log("itemiqqqqqtem",item)
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: '#fff',
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                          }}>
                          <TextInput
                            style={{
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                            value={item.championship}
                            onChangeText={text =>
                              handleChampionshipsNameChange(index, text)
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/* Age*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Age</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={age}
                    onChangeText={value => setage(value)}
                  />
                </View>

                {/* Weight*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>width</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={width}
                    onChangeText={value => setwidth(value)}
                  />
                </View>

                {/* Height*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Height</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={height}
                    onChangeText={value => setheight(value)}
                  />
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: '#000',
                      width: '100%',
                      borderRadius: 5,
                      paddingVertical: 7,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      Edit Profile Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          {profiledataget && profiledataget?.user_type === 'team' && (
            <ScrollView
              style={{backgroundColor: 'grey', marginTop: 5, height: 500}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: '100%',
                }}>
                {/* name */}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Name</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={name}
                    onChangeText={value => setname(value)}
                  />
                </View>

                {/* City*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>City</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={city}
                    onChangeText={value => setcity(value)}
                  />
                </View>

                {/* Country*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Country</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={profiledataget && profiledataget?.country}
                    onChangeText={value => setcountry(value)}
                  />
                </View>

                {/* Established datee*/}

                {profiledataget && profiledataget?.dob ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View style={{}}>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Established datee
                      </Text>
                    </View>
                    {profiledataget && profiledataget?.dob ? (
                      <>
                        <View style={{marginTop: 5}}>
                          {startdate && startdate ? (
                            <View
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                                paddingLeft: 5,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: responsiveFontSize(1.9),
                                }}>
                                {startdate && startdate}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                                paddingLeft: 5,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: responsiveFontSize(1.9),
                                }}>
                                {profiledataget && profiledataget?.dob}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{marginTop: 10}}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: responsiveFontSize(1.9),
                              textDecorationLine: 'underline',
                            }}
                            onPress={() => setOpen(true)}>
                            Select new date
                          </Text>
                        </View>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                ) : (
                  ''
                )}

                {/* Sports Associated with*/}

                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Sports Associated with
                  </Text>
                  <SelectDropdown
                    data={gamedata.map(item => item.name)}
                    defaultButtonText={profiledataget?.game_name}
                    onSelect={(selectedItem, index) => {
                      const selectedGame = gamedata.find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setposition(selectedGameId);
                        getpostion(selectedGameId);
                        console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                {/* Home Ground*/}

                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>
                      Home Ground
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={homeground}
                    onChangeText={value => sethomeground(value)}
                  />
                </View>
                {/* Google Map link to Club*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>
                      Google Map link to Club
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={map}
                    onChangeText={value => setmap(value)}
                  />
                </View>

                {/* Clubs official registration details:*/}
                <View style={{width: '100%', paddingTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: responsiveFontSize(2),
                          fontWeight: '600',
                        }}>
                        Clubs official registration details:
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Management*/}
                {managements.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Management
                      </Text>
                    </View>

                    {managements.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleManagementNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* previous_coaches*/}

                {teamcoaches.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        {' '}
                        Previous_Coaches
                      </Text>
                    </View>

                    {teamcoaches.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleprevious_coachesNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Other staff*/}

                {otherstaff.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        {' '}
                        Other staff
                      </Text>
                    </View>

                    {otherstaff.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleotherstaffNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}

                {/* Team Size */}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Team Size</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={teamsize.toString()}
                    onChangeText={value => setteamsize(value)}
                  />
                </View>

                {/* Team Players names*/}
                {teamplayers.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        {' '}
                        Team Players names
                      </Text>
                    </View>

                    {teamplayers.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleteamplayersNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}
                {/* {
                                        profiledataget && profiledataget?.players.length > 0 ?
                                            <View style={{ width: "100%", marginTop: 5 }}>

                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Team Players names</Text>
                                                </View>

                                                {
                                                    profiledataget && profiledataget.players?.map((item) => {
                                                        console.log("5555", item)
                                                        return (
                                                            <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
                                                            </View>
                                                        )
                                                    })

                                                }
                                            </View> : ""
                                    } */}

                {/* Championships*/}
                {championships.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Championships
                      </Text>
                    </View>

                    {championships.map((item, index) => {
                      // console.log("itemiqqqqqtem",item)
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: '#fff',
                            paddingLeft: 5,
                            marginTop: 5,
                            borderRadius: 5,
                          }}>
                          <TextInput
                            style={{
                              backgroundColor: '#fff',
                              paddingVertical: 5,
                              paddingLeft: 5,
                              marginTop: 5,
                              borderRadius: 5,
                              color: '#000',
                            }}
                            value={item.championship}
                            onChangeText={text =>
                              handleChampionshipsNameChange(index, text)
                            }
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/*Alumni Players*/}
                {alumniplayers.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        {' '}
                        Alumni Players names
                      </Text>
                    </View>

                    {alumniplayers.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handlealumniplayersNameChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}
                {/* {
                                        profiledataget && profiledataget?.alumni_players.length > 0 ?
                                            <View style={{ width: "100%", marginTop: 5 }}>

                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Alumni Players</Text>
                                                </View>

                                                {
                                                    profiledataget && profiledataget.alumni_players?.map((item) => {
                                                        console.log("5555", item)
                                                        return (
                                                            <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
                                                            </View>
                                                        )
                                                    })

                                                }
                                            </View> : ""
                                    } */}

                {/*Actively Participating competitions*/}

                {activelyparticipate.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        {' '}
                        Alumni Players names
                      </Text>
                    </View>

                    {activelyparticipate.map((item, index) => (
                      <TextInput
                        style={{
                          backgroundColor: '#fff',
                          paddingVertical: 5,
                          paddingLeft: 5,
                          marginTop: 5,
                          borderRadius: 5,
                          color: '#000',
                        }}
                        value={item.name}
                        onChangeText={text =>
                          handleactivelyparticipateChange(index, text)
                        }
                      />
                    ))}
                  </View>
                ) : null}
                {/* {
                                        profiledataget && profiledataget?.active_competition.length > 0 ?
                                            <View style={{ width: "100%", marginTop: 5 }}>

                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Actively Participating competitions</Text>
                                                </View>

                                                {
                                                    profiledataget && profiledataget.active_competition?.map((item) => {
                                                        // console.log("5555", item)
                                                        return (
                                                            <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
                                                            </View>
                                                        )
                                                    })

                                                }
                                            </View> : ""
                                    } */}
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: '#000',
                      width: '100%',
                      borderRadius: 5,
                      paddingVertical: 7,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      Edit Profile Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          {profiledataget && profiledataget?.user_type === 'orgs' && (
            <ScrollView
              style={{backgroundColor: 'grey', marginTop: 5, height: 500}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  height: '100%',
                }}>
                {/* name */}

                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Name</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={name}
                    onChangeText={value => setname(value)}
                  />
                </View>

                {/* Organization Type */}
                <View style={{width: '100%', paddingTop: 9}}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Organization Type
                  </Text>
                  <SelectDropdown
                    data={organizationtype.map(item => item.org_type_name)}
                    defaultButtonText={
                      profiledataget && profiledataget?.org_type_name
                    }
                    onSelect={(selectedItem, index) => {
                      const selectedGame = organizationtype.find(
                        item => item.name === selectedItem,
                      );
                      if (selectedGame) {
                        const selectedGameId = selectedGame._id;
                        setOrganizationid(selectedGameId);
                        // console.log('lllll', selectedItem, selectedGameId);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) =>
                      selectedItem
                    }
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown4BtnTxtStyle}
                    rowTextForSelection={(item, index) => item}
                  />
                </View>

                {/* Established Date */}

                {profiledataget && profiledataget?.dob ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View style={{}}>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Established datee
                      </Text>
                    </View>
                    {profiledataget && profiledataget?.dob ? (
                      <>
                        <View style={{marginTop: 5}}>
                          {startdate && startdate ? (
                            <View
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                                paddingLeft: 5,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: responsiveFontSize(1.9),
                                }}>
                                {startdate && startdate}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                                paddingLeft: 5,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: responsiveFontSize(1.9),
                                }}>
                                {profiledataget && profiledataget?.dob}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={{marginTop: 10}}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: responsiveFontSize(1.9),
                              textDecorationLine: 'underline',
                            }}
                            onPress={() => setOpen(true)}>
                            Select new date
                          </Text>
                        </View>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                ) : (
                  ''
                )}

                {/* City*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>City</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={city}
                    onChangeText={value => setcity(value)}
                  />
                </View>

                {/* Country*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>Country</Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={profiledataget && profiledataget?.country}
                    onChangeText={value => setcountry(value)}
                  />
                </View>

                {/* key Personalities*/}
                {profiledataget &&
                profiledataget?.key_personalities.length > 0 ? (
                  <View style={{width: '100%', marginTop: 5}}>
                    <View>
                      <Text style={{color: '#000', fontSize: 16}}>
                        Key Personalities
                      </Text>
                    </View>

                    {profiledataget &&
                      profiledataget.key_personalities?.map((item, index) => {
                        return (
                          <View key={index}>
                            <TextInput
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 5,
                                paddingLeft: 5,
                                marginTop: 5,
                                borderRadius: 5,
                                color: '#000',
                              }}
                              value={keyPersonalities[index]?.name || ''}
                              onChangeText={text =>
                                handleKeyPersonalitiesInputChange(
                                  text,
                                  'name',
                                  index,
                                )
                              }
                              placeholder="Enter Name"
                            />
                            <TextInput
                              style={{
                                backgroundColor: '#fff',
                                paddingVertical: 5,
                                paddingLeft: 5,
                                marginTop: 5,
                                borderRadius: 5,
                                color: '#000',
                              }}
                              value={keyPersonalities[index]?.designation || ''}
                              onChangeText={text =>
                                handleKeyPersonalitiesInputChange(
                                  text,
                                  'designation',
                                  index,
                                )
                              }
                              placeholder="Enter Designation"
                            />
                          </View>
                        );
                      })}
                  </View>
                ) : (
                  ''
                )}
                {/* {
                                        profiledataget && profiledataget?.key_personalities.length > 0 ?
                                            <View style={{ width: "100%", marginTop: 5 }}>

                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Key Personalities</Text>
                                                </View>

                                                {
                                                    profiledataget && profiledataget.key_personalities?.map((item) => {
                                                        console.log("666666", item)
                                                        return (
                                                            <View style={{}}>
                                                                <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
                                                                </View>
                                                                <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.designation}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })

                                                }
                                            </View> :
                                            ""
                                    } */}

                {/* Description*/}
                <View style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>
                      Description
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 5,
                      paddingLeft: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: '#000',
                    }}
                    value={description}
                    onChangeText={value => setdescription(value)}
                  />
                </View>
                {/* {
                                        profiledataget && profiledataget?.desc ?
                                            <View style={{ width: "100%", marginTop: 5 }}>
                                                <View style={{}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>Description</Text>
                                                </View>
                                                {
                                                    profiledataget && profiledataget?.desc ?
                                                        <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
                                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.desc}</Text>
                                                        </View> :
                                                        ""

                                                }
                                            </View>
                                            : ""
                                    } */}

                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: '#000',
                      width: '100%',
                      borderRadius: 5,
                      paddingVertical: 7,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      Edit Profile Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
          <View style={{height: 40}}></View>
        </View>
      )}
      {/* <TabBar /> */}
    </View>
  );
};

export default ProfileUpdatePage;
const styles = StyleSheet.create({
  // Add your styles here
  icon: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 5,
  },
  clubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 0.29,
    borderBottomColor: '#fff',
    marginVertical: 5,
    padding: 0,
    fontSize: 16,
    color: '#000',
    fontWeight: '300',
  },
  datePicker: {
    flex: 1,
    marginVertical: 5,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 35,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdown4BtnTxtStyle: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'left',
  },
});
