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
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Video from 'react-native-video';
import {VideoData, VideoDataone} from '../demodata/Demovideo';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import AddPen from 'react-native-vector-icons/dist/FontAwesome5';
import RemovePen from 'react-native-vector-icons/dist/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';
import TabBar from '../common/TabBar';
import axios from 'axios';
import Modal from 'react-native-modal';
import Followers from 'react-native-vector-icons/dist/FontAwesome5';
import Love from 'react-native-vector-icons/dist/AntDesign';
import Eyeee from 'react-native-vector-icons/dist/Entypo';
import Calender from 'react-native-vector-icons/dist/AntDesign';
import Droppp from 'react-native-vector-icons/dist/AntDesign';
import UploadImageIcon from 'react-native-vector-icons/dist/Feather';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deviceheight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;
const Team = ({route}) => {
  console.log('routeroute', route);
  const [statusBarStyle, setStatusBarStyle] = useState();
  const [data, setdata] = useState('');
  const [gamedata, setgamedata] = useState('');
  const [position, setposition] = useState('');
  const [reel, setreel] = useState('1');
  const [open, setOpen] = useState(false);
  const [name, setname] = useState('');
  const [date, setDate] = useState(new Date());
  const [dob, setdob] = useState('');
  const [age, setage] = useState('');
  const [width, setwidth] = useState('');
  const [height, setheight] = useState('');
  const [selectedgameid, setselectedgameid] = useState('');
  const [positionid, setpositionid] = useState('');
  const [country, setcountry] = useState('');
  const [city, setcity] = useState('');
  const [startdate, setstartdate] = useState('');
  const [saveuserdata, setsaveuserdata] = useState('');
  const dataitem = useSelector(state => state.tokenn);
  console.log('dataitemeeeeee', dataitem);

  const SubmitForm = async () => {
    try {
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.post(
        'http://15.206.66.165:3009/api/v1/update-profile',
        {
          game_id: selectedgameid && selectedgameid,
          position_id: positionid && positionid,
          user_id: modifiedUser?.user_id,
          name: name && name,
          dob: startdate && startdate,
          height: height && height,
          width: width && width,
          country: country && country,
          city: city && city,
          competition_won: championships && championships,
          // previous_teams: [MU, FCB],
          // previous_coaches: [PG, JM]
        },
      );
      // setdata(response.data.data);
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      axios.defaults.headers.common['Authorization'] = dataitem[0]?.token;
      const response = await axios.get('/api/v1/get-game-list');
      setgamedata(response.data.data);
      console.log('getgame', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getpostion = async id => {
    try {
      axios.defaults.headers.common['Authorization'] = dataitem[0]?.token;
      console.log('llllll', typeof id);
      // const id = (req.params.id).trim();
      const response = await axios.post(
        `/api/v1/get-position-list?game_id=${id}`,
        {
          game_id: id,
        },
      );
      setposition(response.data.data);
      console.log('getposition', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getprofiledetails = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = dataitem[0]?.token;
      const response = await axios.get(`/api/v1/get-user-profile`, {
        params: {user_id: dataitem[0]?.user_id},
      });
      setsaveuserdata(response.data.data);
      console.log('pr4o', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //     if (route.params.data == 1 || route.params.data == 2 || route.params.data == 3 || route.params.data == 4) {
  //         setreel("2");
  //     }
  // }, [route.params.data]);

  useEffect(() => {
    getprofiledetails();
  }, []);

  useEffect(() => {
    getgame();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, backgroundColor: 'grey'}}>
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

  // championships

  const [championships, setChampionships] = useState([{id: 1, value: ''}]);

  const addChampionship = () => {
    const newChampionships = [...championships, {value: ''}];
    setChampionships(newChampionships);
  };
  // console.log('championships', championships && championships)

  const removeChampionship = index => {
    const updatedChampionships = championships.filter((_, i) => i !== index);
    setChampionships(updatedChampionships);
  };

  const handleInputChange = (text, index) => {
    const updatedChampionships = [...championships];
    updatedChampionships[index].value = text;
    setChampionships(updatedChampionships);
  };

  // Actively Participate

  const [activelyparticipate, setactivelyparticipate] = useState([
    {id: 1, value: ''},
  ]);

  const addactivelyparticipate = () => {
    const newactivelyparticipate = [...activelyparticipate, {value: ''}];
    setactivelyparticipate(newactivelyparticipate);
  };
  // console.log('championships', championships && championships)

  const removeactivelyparticipate = index => {
    const updatedactivelyparticipate = activelyparticipate.filter(
      (_, i) => i !== index,
    );
    setactivelyparticipate(updatedactivelyparticipate);
  };

  const handleInputChangeactivelyparticipate = (text, index) => {
    const updatedactivelyparticipate = [...activelyparticipate];
    updatedactivelyparticipate[index].value = text;
    setactivelyparticipate(updatedactivelyparticipate);
  };

  // Awards

  const [awards, setawards] = useState([{id: 1, value: ''}]);

  const addawards = () => {
    const newawards = [...awards, {value: ''}];
    setawards(newawards);
  };

  const removeaward = index => {
    const updatedawards = awards.filter((_, i) => i !== index);
    setawards(updatedawards);
  };

  const handleInputChangeawards = (text, index) => {
    const updatedawards = [...awards];
    updatedawards[index].value = text;
    setawards(updatedawards);
  };

  // Certifications for the role

  const [certifications, setcertifications] = useState([{id: 1, value: ''}]);

  const addcertifications = () => {
    const newcertifications = [...certifications, {value: ''}];
    setcertifications(newcertifications);
  };

  const removecertifications = index => {
    const updatedcertifications = certifications.filter((_, i) => i !== index);
    setcertifications(updatedcertifications);
  };

  const handleInputChangecertifications = (text, index) => {
    const updatedcertifications = [...certifications];
    updatedcertifications[index].value = text;
    setcertifications(updatedcertifications);
  };

  //Managements

  const [managements, setmanagements] = useState([{id: 1, value: ''}]);

  const addmanagements = () => {
    const newmanagements = [...managements, {value: ''}];
    setmanagements(newmanagements);
  };

  const removemanagements = index => {
    const updatedmanagements = managements.filter((_, i) => i !== index);
    setmanagements(updatedmanagements);
  };

  const handleInputChangemanagements = (text, index) => {
    const updatedmanagements = [...managements];
    updatedmanagements[index].value = text;
    setmanagements(updatedmanagements);
  };

  //Coaches

  const [teamcoaches, setteamcoaches] = useState([{id: 1, value: ''}]);

  const addteamcoaches = () => {
    const newteamcoaches = [...teamcoaches, {value: ''}];
    setteamcoaches(newteamcoaches);
  };

  const removeteamcoaches = index => {
    const updatedteamcoaches = teamcoaches.filter((_, i) => i !== index);
    setteamcoaches(updatedteamcoaches);
  };

  const handleInputChangeteamcoaches = (text, index) => {
    const updatedteamcoaches = [...teamcoaches];
    updatedteamcoaches[index].value = text;
    setteamcoaches(updatedteamcoaches);
  };

  //Coaches

  const [otherstaff, setotherstaff] = useState([{id: 1, value: ''}]);

  const addotherstaff = () => {
    const newotherstaff = [...otherstaff, {value: ''}];
    setotherstaff(newotherstaff);
  };

  const removeotherstaff = index => {
    const updatedotherstaff = otherstaff.filter((_, i) => i !== index);
    setotherstaff(updatedotherstaff);
  };

  const handleInputChangeotherstaff = (text, index) => {
    const updatedotherstaff = [...otherstaff];
    updatedotherstaff[index].value = text;
    setotherstaff(updatedotherstaff);
  };

  // madels

  const [medals, setmedals] = useState([{id: 1, value: ''}]);

  const addmedals = () => {
    const newmedals = [...medals, {value: ''}];
    setmedals(newmedals);
  };

  const removemedals = index => {
    const updatedmedals = medals.filter((_, i) => i !== index);
    setawards(updatedmedals);
  };

  const handleInputChangemedals = (text, index) => {
    const updatedmedals = [...medals];
    updatedmedals[index].value = text;
    setmedals(updatedmedals);
  };

  // playersnames

  const [playersnames, setplayersnames] = useState([{id: 1, value: ''}]);

  const addplayersnames = () => {
    const newplayersnames = [...playersnames, {value: ''}];
    setplayersnames(newplayersnames);
  };

  const removeplayersnames = index => {
    const updatedplayersnames = playersnames.filter((_, i) => i !== index);
    setawards(updatedplayersnames);
  };

  const handleInputChangeplayersnames = (text, index) => {
    const updatedplayersnames = [...playersnames];
    updatedplayersnames[index].value = text;
    setplayersnames(updatedplayersnames);
  };

  // Alumni Players

  const [alumniplayers, setalumniplayers] = useState([{id: 1, value: ''}]);

  const addalumniplayers = () => {
    const newalumniplayers = [...alumniplayers, {value: ''}];
    setalumniplayers(newalumniplayers);
  };

  const removealumniplayers = index => {
    const updatedalumniplayers = alumniplayers.filter((_, i) => i !== index);
    setawards(updatedalumniplayers);
  };

  const handleInputChangealumniplayers = (text, index) => {
    const updatedalumniplayers = [...alumniplayers];
    updatedalumniplayers[index].value = text;
    setalumniplayers(updatedalumniplayers);
  };

  // Clubs
  const [clubs, setClubs] = useState([
    {id: 1, name: '', joinDate: '', exitDate: ''},
  ]);

  const addClubs = () => {
    const newClubs = [
      ...clubs,
      {id: clubs.length + 1, name: '', joinDate: '', exitDate: ''},
    ];
    setClubs(newClubs);
  };

  const removeClubs = index => {
    const updatedClubs = clubs.filter((_, i) => i !== index);
    setClubs(updatedClubs);
  };

  const handleClubsInputChange = (text, field, index) => {
    const updatedClubs = [...clubs];
    updatedClubs[index][field] = text;
    setClubs(updatedClubs);
  };

  //coaches

  const [coaches, setcoaches] = useState([
    {id: 1, name: '', joinDate: '', exitDate: ''},
  ]);

  const addcoaches = () => {
    const newcoaches = [
      ...coaches,
      {id: coaches.length + 1, name: '', joinDate: '', exitDate: ''},
    ];
    setcoaches(newcoaches);
  };

  const removecoaches = index => {
    const updatedcoaches = coaches.filter((_, i) => i !== index);
    setcoaches(updatedcoaches);
  };

  const handlecoachesInputChange = (text, field, index) => {
    const updatedcoaches = [...coaches];
    updatedcoaches[index][field] = text;
    setcoaches(updatedcoaches);
  };

  // Sports Associated with

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

          <View style={{}}>
            <Notificationss
              name="notification-add"
              style={{fontSize: responsiveFontSize(2.1)}}
            />
          </View>
        </View>
      </View>

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
          // setstartdate(date.toLocaleDateString('en-IN', {
          //     year: 'numeric',
          //     month: '2-digit',
          //     day: '2-digit',
          // }), console.log('lkikiki',date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 6,
        }}>
        <View style={{width: '30%', paddingTop: 4}}>
          {saveuserdata && saveuserdata ? (
            <Image
              source={{uri: saveuserdata && saveuserdata?.image}}
              style={{width: 110, height: 110, borderRadius: 50}}
            />
          ) : (
            <Image
              source={require('../assets/user.jpg')}
              style={{width: 110, height: 110, borderRadius: 50}}
            />
          )}
          <View
            style={{
              alignItems: 'flex-end',
              position: 'absolute',
              bottom: 17,
              right: -8,
            }}>
            <UploadImageIcon
              style={{
                color: '#fff',
                backgroundColor: '#d0750c',
                padding: 7,
                borderRadius: 80,
              }}
              name="upload-cloud"
            />
          </View>
        </View>

        <View
          style={{
            width: '70%',
            padding: 10,
          }}>
          <View style={{paddingLeft: 5}}>
            <Text
              style={{
                color: '#fff',
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
              }}>
              {saveuserdata?.name}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: responsiveFontSize(1.7),
                fontWeight: '400',
                paddingTop: 1,
              }}>
              comments djhfjdhfjkdhf dhfdkfhdkufhdkuf dfhkuhkduhfdkfd
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
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                Followers
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Love
                name="hearto"
                style={{color: '#fff', fontSize: responsiveFontSize(2)}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                Like
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Eyeee
                name="eye"
                style={{color: '#fff', fontSize: responsiveFontSize(2)}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                }}>
                Views
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </View>

      <View style={{marginHorizontal: 10}}>
        <View style={{width: '100%'}}>
          <View style={{}}>
            <Text style={{}}>ididid</Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 5}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#b4b4b4',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 5,
            gap: 4,
          }}>
          <TouchableOpacity
            onPress={() => setreel('1')}
            style={{
              width: '50%',
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingVertical: 4,
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Text style={{fontSize: responsiveFontSize(2), color: '#6b6b6b'}}>
              My Reels
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setreel('2')}
            style={{
              width: '50%',
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingVertical: 4,
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Text style={{fontSize: responsiveFontSize(2), color: '#6b6b6b'}}>
              My details
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {reel && reel === '1' ? (
        <ScrollView>
          <View style={{}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item}
              numColumns={3}
              contentContainerStyle={{
                padding: 3,
                justifyContent: 'space-between',
              }}
            />
            <View style={{marginBottom: 50, backgroundColor: 'grey'}}></View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{flex: 1, backgroundColor: 'grey', marginTop: 2}}>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            {/* Select Country*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Country
              </Text>
              <TextInput
                placeholder="Enter Your Country"
                placeholderTextColor={'#000'}
                onChangeText={value => setcountry(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
              />
            </View>

            {/* Select City*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                City
              </Text>
              <TextInput
                placeholder="Enter Your City"
                placeholderTextColor={'#000'}
                onChangeText={value => setcity(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
              />
            </View>

            {/* Established date*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Date of Birth
              </Text>

              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  borderWidth: 1,
                  borderRadius: 12,
                  // padding: 10,
                  // marginHorizontal: 9,
                  borderColor: '#000',
                  marginTop: 12,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  // width:"100%"
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    fontSize: responsiveFontSize(1.85),
                    alignItems: 'center',
                  }}>
                  <Calender
                    name="calendar"
                    style={{color: '#000', fontSize: responsiveFontSize(2)}}
                  />
                  {startdate ? (
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(1.85),
                        paddingLeft: 5,
                      }}>
                      {startdate && startdate.toString().replaceAll('/', '-')}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#808387',
                        fontSize: responsiveFontSize(1.85),
                        paddingLeft: 5,
                      }}>
                      Select Date
                    </Text>
                  )}
                </View>

                <View style={{}}>
                  <Droppp
                    name="caretdown"
                    style={{color: '#000', fontSize: responsiveFontSize(1.85)}}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Sports Associated with*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Sports Associated with
              </Text>
              <TextInput
                placeholder="Enter Sports Associated with"
                placeholderTextColor={'#000'}
                onChangeText={value => setwidth(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
              />
            </View>
            {/* Home Ground*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Home Ground
              </Text>
              <TextInput
                placeholder="Enter Home Ground"
                placeholderTextColor={'#000'}
                onChangeText={value => setheight(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
              />
            </View>

            {/* Google Map link to Club*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Google Map link to Club
              </Text>
              <TextInput
                placeholder="Google Map link to Club"
                placeholderTextColor={'#000'}
                // onChangeText={value => setheight(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
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

            {/* Select Team Size*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                Team Size
              </Text>
              <TextInput
                placeholder="Enter Your Team Size"
                placeholderTextColor={'#000'}
                // onChangeText={value => setcountry(value)}
                style={{
                  width: '100%',
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  marginTop: 5,
                  //    margin: 10,
                  padding: 0,
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '300',
                }}
              />
            </View>

            {/* Management*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Managements
                  </Text>
                </View>

                <TouchableOpacity onPress={addmanagements} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {managements.map((managementsss, index) => (
                <View
                  key={managementsss.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter Your managements for the role"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={managements.value}
                    onChangeText={text =>
                      handleInputChangemanagements(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removemanagements(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* Coaches*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Coaches
                  </Text>
                </View>

                <TouchableOpacity onPress={addteamcoaches} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {teamcoaches.map((teamcoachesss, index) => (
                <View
                  key={teamcoachesss.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter Your coaches Name"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={coaches.value}
                    onChangeText={text =>
                      handleInputChangeteamcoaches(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeteamcoaches(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* Other staff*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Other staff
                  </Text>
                </View>

                <TouchableOpacity onPress={addotherstaff} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {otherstaff.map((otherstaffss, index) => (
                <View
                  key={otherstaffss.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter Your coaches Name"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={otherstaff.value}
                    onChangeText={text =>
                      handleInputChangeotherstaff(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeotherstaff(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/*Team Players names*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Team Players names
                  </Text>
                </View>

                <TouchableOpacity onPress={addplayersnames} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {playersnames.map((playersnamess, index) => (
                <View
                  key={playersnamess.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter player names"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={playersnames.value}
                    onChangeText={text =>
                      handleInputChangeplayersnames(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeplayersnames(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* Select ChampionShip*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Championships/Medals/Trophys won
                  </Text>
                </View>

                <TouchableOpacity onPress={addChampionship} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {championships.map((championship, index) => (
                <View
                  key={championship.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter Your ChampionShip/Competitions Won"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={championship.value}
                    onChangeText={text => handleInputChange(text, index)}
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeChampionship(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/*Alumni Players*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    alumni Players
                  </Text>
                </View>

                <TouchableOpacity onPress={addalumniplayers} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {alumniplayers.map((alumniplayerss, index) => (
                <View
                  key={alumniplayerss.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter player names"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={alumniplayers.value}
                    onChangeText={text =>
                      handleInputChangealumniplayers(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() => removealumniplayers(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/*Actively Participating competitions*/}
            <View style={{width: '100%', paddingTop: 9}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Actively Participating competitions
                  </Text>
                </View>

                <TouchableOpacity onPress={addactivelyparticipate} style={{}}>
                  <AddPen
                    style={{color: '#fff', fontSize: responsiveFontSize(2)}}
                    name="edit"
                  />
                </TouchableOpacity>
              </View>

              {activelyparticipate.map((activelyparticipates, index) => (
                <View
                  key={activelyparticipates.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Enter Actively Participating competitions"
                    placeholderTextColor={'#000'}
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.29,
                      borderBottomColor: '#fff',
                      marginTop: 5,
                      padding: 0,
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      fontWeight: '300',
                    }}
                    value={activelyparticipate.value}
                    onChangeText={text =>
                      handleInputChangeactivelyparticipate(text, index)
                    }
                  />
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() => removeactivelyparticipate(index)}>
                      <RemovePen
                        style={{
                          color: '#fff',
                          backgroundColor: '#000',
                          fontSize: responsiveFontSize(1.5),
                          paddingHorizontal: 3,
                          paddingVertical: 3,
                          borderRadius: 50,
                        }}
                        name="minus"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => SubmitForm()}
            style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text
              style={{
                color: '#fff',
                backgroundColor: '#000',
                textAlign: 'center',
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Team;
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
    height: 37,
  },
  dropdown4BtnTxtStyle: {
    fontSize: 13,
    textAlign: 'left',
  },
});
