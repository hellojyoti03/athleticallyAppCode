
// import { Dimensions, TextInput, Text, TouchableOpacity, View, FlatList, StatusBar, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
// import React, { useRef, useState, useEffect } from 'react'
// import Video from 'react-native-video';
// import { VideoData, VideoDataone } from '../demodata/Demovideo'
// import Notificationss from 'react-native-vector-icons/MaterialIcons';
// import SelectDropdown from 'react-native-select-dropdown'
// const { width, height } = Dimensions.get('window')
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AddPen from 'react-native-vector-icons/dist/AntDesign';
// import RemovePen from 'react-native-vector-icons/dist/AntDesign';
// import {
//     responsiveHeight,
//     responsiveWidth,
//     responsiveFontSize
// } from "react-native-responsive-dimensions";
// import DatePicker from 'react-native-date-picker'
// import axios from 'axios'
// import Followers from 'react-native-vector-icons/dist/FontAwesome5';
// import Calender from 'react-native-vector-icons/dist/AntDesign';
// import Droppp from 'react-native-vector-icons/dist/AntDesign';
// import UploadImageIcon from 'react-native-vector-icons/dist/Feather';
// import SettingsIcon from 'react-native-vector-icons/dist/Feather';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { useSelector } from 'react-redux'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TabBar from '../common/TabBar';
// const deviceheight = Dimensions.get('window').height
// const devicewidth = Dimensions.get('window').width
// const ProfileUpdatePage = ({ route }) => {
//     const navigation = useNavigation();
//     console.log("routeroute", route)
//     const [name, setname] = useState("");
//     const [city, setcity] = useState("");
//     const [country, setcountry] = useState("");
//     // const [medals, setMedals] = useState(profiledataget?.medals || [{id: 1, name: '' }]);

//     const [medals, setMedals] = useState([]);
//     const [awards, setawards] = useState([]);
//     const [Championships, setChampionships] = useState([]);
    
//     const [position, setposition] = useState("");
//     const [positionid, setpositionid] = useState("");
//     const [statusBarStyle, setStatusBarStyle] = useState();
//     const [data, setdata] = useState("");
//     const [gamedata, setgamedata] = useState("");
//     const [reel, setreel] = useState("1");
//     const [open, setOpen] = useState(false);
//     const [date, setDate] = useState(new Date())
//     const [photo, setPhotoURI] = useState('');
//     const [profiledataget, setprofiledataget] = useState("");
//     const [personilitydropdown, setpersonilitydropdown] = useState("")
//     const [storagetypesave, setstoragetypesave] = useState("");
//     const [load, setload] = useState(false);

//     const handleMedalNameChange = (index, newName) => {
//         const updatedMedals = [...medals];
//         updatedMedals[index].name = newName;
//         setawards(updatedMedals);
//     };

//     const handleawardNameChange = (index, newName) => {
//         const updatedawards= [...awards];
//         updatedawards[index].name = newName;
//         setMedals(updatedawards);
//     };
//     const handleChampionshipsNameChange = (index, newName) => {
//         const updatedChampionships= [...Championships];
//         updatedChampionships[index].championship = newName;
//         setChampionships(updatedChampionships);
//     };



//     // const handleMedalNameChange = (index, newName) => {
//     //     const updatedMedals = [...medals];
//     //     updatedMedals[index].name = newName;
//     //     setMedals(updatedMedals);
//     // };
//     // const handleMedalNameChange = (index, newName) => {
//     //     const updatedMedals = [...medals];
//     //     updatedMedals[index].name = newName;
//     //     setMedals(updatedMedals);
//     // };

//     // console.log("medals545454", medals && medals)

//     const handleSubmit = async () => {
//         try {
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);
//             console.log('modifiedUserrrrr', modifiedUser);
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser?.token}`;
//             const response = await axios.post(
//                 '/api/v1/get-user-reels',
//                 { reel_id: "65749417625a8953a6ca920d" }
//             );
//             setdata(response.data.data);
//             console.log("response", response)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const getgame = async () => {
//         try {
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);
//             console.log('modifiedUserrrrr', modifiedUser);
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser?.token}`;
//             const response = await axios.get(
//                 '/api/v1/get-game-list'

//             );
//             setgamedata(response.data.data)
//             console.log("getgame", response)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     const getpostion = async (id) => {
//         try {
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);
//             console.log('modifiedUserrrrr', modifiedUser);
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser?.token}`;
//             // const id = (req.params.id).trim();
//             const response = await axios.post(
//                 `/api/v1/get-position-list?game_id=${id}`, {

//                 game_id: id
//             }

//             );
//             setposition(response.data.data)
//             console.log("getposition", response)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };


//     const getProfileDetails = async () => {
//         try {
//             setload(true)
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);

//             axios.defaults.headers.common['Authorization'] = `Bearer ${modifiedUser?.token}`;

//             const response = await axios.get(`/api/v1/get-user-profile?user_id=${modifiedUser?.user_id}`
//             );

//             if (response.data.err == false) {
//                 setload(false)
//                 setprofiledataget(response.data.data);
//                 setMedals(response.data.data?.medals || []);
//                 setawards(response.data.data?.awards || []);
//                 setawards(response.data.data?.awards || []);
//             }
//             console.log("Profile Data:", response);
//         } catch (error) {
//             setload(false)
//             console.error('Error fetching data:', error);
//         }
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             getProfileDetails();
//         }, [])
//     );


//     const PersonalityType = async () => {
//         try {
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser?.token}`;
//             const response = await axios.get(
//                 `/api/v1/get-types-list`
//             );
//             setpersonilitydropdown(response.data.data.types)
//             console.log("setpersonilitydropdown", response.data.data.types)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         PersonalityType()
//     }, [])


//     const [organizationtype, setorganizationtype] = useState("")

//     const getorganizationtype = async () => {
//         try {
//             let mr = await AsyncStorage.getItem('usertoken');
//             const modifiedUser = JSON.parse(mr);
//             // console.log('modifiedUserrrrr', modifiedUser);
//             // console.log()
//             axios.defaults.headers.common[
//                 'Authorization'
//             ] = `Bearer ${modifiedUser?.token}`;
//             const response = await axios.get(
//                 `/api/v1/get-org-types`
//             );
//             setorganizationtype(response.data.data)
//             // console.log("otganizationtype", response)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     useEffect(() => {
//         getorganizationtype()
//     }, []);


//     useEffect(() => {
//         if (route?.params?.data) {
//             setreel('2');
//         } else {
//             setreel('1');
//         }
//     }, [route]);

//     useEffect(() => {
//         getgame()
//     }, [])

//     useEffect(() => {
//         handleSubmit()
//     }, [])

//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={{ flex: 1, backgroundColor: "grey" }}>
//                 <TouchableOpacity
//                     style={{
//                         flex: 1,
//                         flexDirection: "row",
//                         marginHorizontal: 3,
//                         justifyContent: "center",
//                         paddingTop: 4,
//                         paddingBottom: 2,
//                     }}
//                 >
//                     <Video
//                         source={{ uri: item?.url }}
//                         style={{
//                             // flex: 1,
//                             width: "100%",
//                             height: 200,
//                             backgroundColor: "#fff",
//                             borderRadius: 10,
//                         }}
//                         resizeMode="stretch"
//                         paused={true}
//                     />
//                 </TouchableOpacity>
//             </View>
//         );
//     };


//     useEffect(() => {
//         // Retrieve the value from AsyncStorage
//         const fetchAsyncStorageValue = async () => {
//             try {
//                 const mr = await AsyncStorage.getItem('usertoken');
//                 console.log('mr:', mr);
//                 if (mr !== null) {
//                     const modifiedUser = JSON.parse(mr);
//                     console.log('modifiedUser:', modifiedUser);

//                     if (modifiedUser?.user_type) {
//                         setstoragetypesave(modifiedUser.user_type);
//                         // setstoragee(modifiedUser.user_type);
//                         console.log('User type:', modifiedUser.user_type);
//                     } else {
//                         console.log('No user type found in modifiedUser');
//                     }
//                 } else {
//                     console.log('No user data found in AsyncStorage');
//                 }
//             } catch (error) {
//                 console.error('Error retrieving AsyncStorage value:', error);
//             }
//         };

//         fetchAsyncStorageValue();
//     }, []);

//     const EmptyListMessage = ({ }) => {
//         return (
//             // Flat List Item
//             <View style={{
//                 paddingTop: "30%",


//             }}>
//                 <View
//                     style={{

//                         alignItems: 'center',
//                         justifyContent: "center",

//                     }}>
//                     <Image
//                         style={{
//                             width: '70%', height: 170, alignItems: 'center',
//                             justifyContent: "center"
//                         }}
//                         source={require('../assets/nodatafound1.png')}
//                     />
//                 </View>

//                 <View
//                     style={{
//                         alignItems: 'center',
//                         margin: 10,

//                     }}>
//                     <Text
//                         style={{
//                             color: '#545454',
//                             fontSize: 15,
//                             fontWeight: '300',
//                             backgroundColor: "#ced9db",
//                             paddingHorizontal: 10,
//                             paddingVertical: 5,
//                             borderRadius: 2,
//                             elevation: 10
//                         }}
//                     >
//                         No Data Found
//                     </Text>
//                 </View>

//             </View>
//         );
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000" }}>
//             <StatusBar
//                 animated={true}
//                 backgroundColor="#000"
//                 barStyle={statusBarStyle}
//             />

//             <View style={{}}>
//                 <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }}>
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
//                         <Notificationss name="notification-add" style={{ fontSize: responsiveFontSize(2.6) }} />
//                     </View>
//                 </View>
//             </View>


//             <DatePicker
//                 modal
//                 open={open}
//                 date={date}
//                 title="Select Date"
//                 mode="date"
//                 onConfirm={date => {
//                     // let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
//                     // setOpen(false);
//                     const year = date.getFullYear();
//                     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//                     const day = date.getDate().toString().padStart(2, '0');

//                     const formattedDate = `${year}-${month}-${day}`;

//                     setOpen(false);
//                     setstartdate(formattedDate, console.log('lkikiki', formattedDate));
//                     // setstartdate(date.toLocaleDateString('en-IN', {
//                     //     year: 'numeric',
//                     //     month: '2-digit',
//                     //     day: '2-digit',
//                     // }), console.log('lkikiki',date));
//                 }}
//                 onCancel={() => {
//                     setOpen(false);
//                 }}
//             />

//             <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 10, marginTop: 6 }}>
//                 <View style={{ width: "30%", paddingTop: 4 }}>

//                     {
//                         profiledataget && profiledataget.image ?
//                             <View>
//                                 {
//                                     photo && photo ?
//                                         <Image
//                                             source={{ uri: photo.uri }}
//                                             resizeMode='contain'
//                                             style={{
//                                                 width: 100,
//                                                 height: 100,
//                                                 borderRadius: 65,
//                                             }}
//                                         />
//                                         :
//                                         <Image
//                                             source={{ uri: profiledataget && profiledataget.image }}
//                                             resizeMode='contain'
//                                             style={{
//                                                 width: 100,
//                                                 height: 100,
//                                                 borderRadius: 65,
//                                             }}
//                                         />

//                                 }
//                             </View>

//                             : (
//                                 <View style={{}}>
//                                     <Image
//                                         style={{
//                                             width: 100,
//                                             height: 100,
//                                             borderRadius: 65,
//                                         }}
//                                         source={require('../assets/user.jpg')}
//                                     />
//                                 </View>
//                             )
//                     }


//                     {/* <TouchableOpacity
//                         // onPress={() => handdlechange()}
//                         style={{ alignItems: "flex-end", position: "absolute", bottom: 17, right: -8 }}>
//                         <UploadImageIcon
//                             style={{ color: "#fff", backgroundColor: "#d0750c", padding: 7, borderRadius: 80 }}
//                             name="upload-cloud" />
//                     </TouchableOpacity> */}
//                 </View>

//                 <View style={{
//                     width: "70%",
//                     padding: 10
//                 }}>
//                     <View style={{ paddingLeft: 5, }}>
//                         {
//                             profiledataget && profiledataget.name ?
//                                 <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "500" }}>{profiledataget && profiledataget?.name}</Text>
//                                 :
//                                 <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "500" }}>User Name</Text>

//                         }
//                         {/* <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.7), fontWeight: "400", paddingTop: 1, }}>{storagetypesave && storagetypesave}</Text> */}
//                         <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.7), fontWeight: "400", paddingTop: 1, }}>{profiledataget && profiledataget?.user_type}</Text>
//                     </View>
//                     <View style={{
//                         flexDirection: "row",
//                         width: "100%",
//                         justifyContent: "space-between",
//                         paddingHorizontal: 5,
//                         paddingTop: 10,

//                     }}>
//                         <View style={{ alignItems: "center" }}>
//                             <Followers name="user-friends" style={{ color: "#fff", fontSize: responsiveFontSize(2) }} />
//                             <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>Followers</Text>
//                         </View>

//                         <View style={{ alignItems: "center", }}>
//                             <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>0</Text>
//                             <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>Rating</Text>
//                         </View>

//                         <View style={{ alignItems: "center" }}>
//                             <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>0</Text>
//                             <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>Ath Ranks</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View>
//                 </View>
//             </View>


//             <View style={{ marginTop: 5 }}>
//                 <View
//                     style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         backgroundColor: "#b4b4b4",
//                         paddingHorizontal: 10,
//                         alignItems: "center",
//                         paddingVertical: 5,
//                         gap: 4,

//                     }}>
//                     <TouchableOpacity
//                         onPress={() => setreel("1")}
//                         style={{
//                             width: "50%",
//                             backgroundColor: "#fff",
//                             alignItems: "center",
//                             paddingVertical: 4,
//                             justifyContent: "center",
//                             borderRadius: 6
//                         }}>
//                         <Text style={{ fontSize: responsiveFontSize(2), color: "#6b6b6b" }}>
//                             Uploads
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity

//                         onPress={() => setreel("2")}
//                         style={{
//                             width: "50%",
//                             backgroundColor: "#fff",
//                             alignItems: "center",
//                             paddingVertical: 4,
//                             justifyContent: "center",
//                             borderRadius: 6
//                         }}
//                     >
//                         <Text style={{ fontSize: responsiveFontSize(2), color: "#6b6b6b" }}>
//                             Bio
//                         </Text>
//                     </TouchableOpacity>

//                 </View>
//             </View>

//             {
//                 reel && reel === "1" ?
//                     <ScrollView>
//                         {
//                             load && load == true ?
//                                 <View
//                                     style={{
//                                         flex: 1,
//                                         marginVertical: "60%",
//                                         flexDirection: 'column',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                     }}>
//                                     <ActivityIndicator size="small" color="#fff" animating={load} />
//                                     <Text style={{ fontSize: 12, color: "#fff", fontWeight: "400", }}>please wait</Text>
//                                 </View>
//                                 :

//                                 <View style={{}}>
//                                     <FlatList
//                                         // data={profiledataget.reels}
//                                         data={profiledataget?.reels && profiledataget?.reels.length > 0 ? profiledataget?.reels : ''}
//                                         renderItem={renderItem}
//                                         ListEmptyComponent={EmptyListMessage}
//                                         keyExtractor={(item) => item}
//                                         numColumns={3}
//                                         contentContainerStyle={{
//                                             padding: 3,
//                                             justifyContent: "space-between",
//                                         }}
//                                     />
//                                     <View style={{ marginBottom: 50, backgroundColor: "grey" }}></View>
//                                 </View>
//                         }
//                     </ScrollView>
//                     :
//                     <View style={{ marginTop: 5, marginHorizontal: 10, }}>

//                         <TouchableOpacity
//                             onPress={() => navigation.navigate("ProfileForm")}
//                             style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 5 }}>
//                             <View style={{ flexDirection: "row", }}>
//                                 <View style={{}}>
//                                     <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500", color: "#fff" }}>User Type :</Text>
//                                 </View>
//                                 <View style={{ paddingLeft: 5 }}>
//                                     <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}>{profiledataget && profiledataget?.user_type}</Text>
//                                 </View>
//                             </View>

//                             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
//                                 <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 5 }}>
//                                     <SettingsIcon name="settings"
//                                         style={{ color: "#fff", alignItems: "center", justifyContent: "center", }}
//                                     />
//                                 </View>
//                                 <Text style={{ fontSize: responsiveFontSize(1.8), color: "#fff" }}>
//                                     Manage Profile
//                                 </Text>
//                             </View>

//                         </TouchableOpacity>

//                         {profiledataget && profiledataget?.user_type === "viewer" && (
//                             <View style={{
//                                 paddingHorizontal: 15,
//                                 width: "100%",
//                                 height: 500,
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 // backgroundColor:"red"
//                             }}>
//                                 <View
//                                     style={{
//                                         width: "100%",
//                                     }}>
//                                     <View >
//                                         <Text style={{ fontSize: responsiveFontSize(1.9) }}>For improved performance, update your profile through the manage profile option</Text>

//                                     </View>
//                                 </View>
//                             </View>
//                         )}


//                         {profiledataget && profiledataget?.user_type === "player" && (
//                             <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: 500 }}>
//                                 <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>


//                                     {/* name */}
//                                     <View style={{ width: "100%" }}>
//                                         <View>
//                                             <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                         </View>
//                                         <TextInput
//                                             style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5, color: "#000" }}
//                                             value={profiledataget && profiledataget?.name}
//                                             onChangeText={value => setname(value)}
//                                         />
//                                     </View>
//                                     {/* {
//                                         profiledataget && profiledataget?.name ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.name}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""
//                                     } */}

//                                     {/* Sport */}
//                                     <View style={{ width: "100%", paddingTop: 9 }}>
//                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
//                                             Select Sport
//                                         </Text>
//                                         <SelectDropdown
//                                             data={gamedata && gamedata.map((item) => {
//                                                 return item.name;
//                                             })}
//                                             defaultButtonText={profiledataget && profiledataget?.game_name} // Pre-select the game if it matches the user's profile data
//                                             onSelect={(selectedItem, index) => {
//                                                 const selectedGame = gamedata && gamedata.find(item => item.name === selectedItem);
//                                                 if (selectedGame) {
//                                                     const selectedGameId = selectedGame._id;
//                                                     setposition(selectedGameId);
//                                                     // setselectedgameid(selectedGameId);
//                                                     console.log(selectedItem, selectedGameId);
//                                                 }
//                                             }}
//                                             buttonTextAfterSelection={(selectedItem, index) => {
//                                                 return selectedItem;
//                                             }}
//                                             buttonStyle={styles.dropdown1BtnStyle}
//                                             buttonTextStyle={styles.dropdown4BtnTxtStyle}
//                                             rowTextForSelection={(item, index) => {
//                                                 return item;
//                                             }}
//                                         />


//                                     </View>


//                                     {/* {
//                                         profiledataget && profiledataget?.game_name ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Sport</Text>
//                                                 </View>


//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.game_name}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""


//                                     } */}

//                                     {/* Sport Type*/}
//                                     <View style={{ width: "100%", paddingTop: 9 }}>
//                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
//                                             Type
//                                         </Text>
//                                         <SelectDropdown
//                                             data={position && position.map((item) => item.name)}
//                                             defaultButtonText={profiledataget?.position_name ? profiledataget.position_name : "Select Position"}
//                                             onSelect={(selectedItem, index) => {
//                                                 const selectedGame = position && position.find(item => item.name === selectedItem);
//                                                 if (selectedGame) {
//                                                     const selectedGameId = selectedGame._id;
//                                                     setpositionid(selectedGameId)
//                                                     console.log("position issssssssssssss", selectedItem, selectedGameId);
//                                                 }
//                                             }}
//                                             buttonTextAfterSelection={(selectedItem, index) => selectedItem}
//                                             buttonStyle={styles.dropdown1BtnStyle}
//                                             buttonTextStyle={styles.dropdown4BtnTxtStyle}
//                                             rowTextForSelection={(item, index) => item}
//                                         />

//                                     </View>

//                                     {/* {
//                                         profiledataget && profiledataget?.position_name ?

//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Sport Type</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.position_name ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.position_name}</Text>
//                                                         </View> :
//                                                         ""
//                                                 }
//                                             </View>
//                                             : ""
//                                     } */}

//                                     {/* City*/}
//                                     <View style={{ width: "100%" }}>
//                                         <View>
//                                             <Text style={{ color: '#000', fontSize: 16 }}>City</Text>
//                                         </View>
//                                         <TextInput
//                                             style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5, color: "#000" }}
//                                             value={profiledataget && profiledataget?.city}
//                                             onChangeText={value => setcity(value)}
//                                         />
//                                     </View>
//                                     {/* 
//                                     {
//                                         profiledataget && profiledataget?.city ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>City</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.city ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.city}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     } */}

//                                     {/* Country*/}
//                                     <View style={{ width: "100%" }}>
//                                         <View>
//                                             <Text style={{ color: '#000', fontSize: 16 }}>Country</Text>
//                                         </View>
//                                         <TextInput
//                                             style={{ backgroundColor: "#fff", paddingLeft: 5, marginTop: 5, borderRadius: 5, color: "#000" }}
//                                             value={profiledataget && profiledataget?.country}
//                                             onChangeText={value => setcountry(value)}
//                                         />
//                                     </View>
//                                     {/* {
//                                         profiledataget && profiledataget?.country ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Country</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.country ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.country}</Text>
//                                                         </View> :
//                                                         ""

//                                                 }
//                                             </View>
//                                             : ""
//                                     } */}

//                                     {/* Awards*/}
//                                     {awards.length > 0 ? (
//                                         <View style={{ width: '100%', marginTop: 5 }}>
//                                             <View>
//                                                 <Text style={{ color: '#000', fontSize: 16 }}>Awards</Text>
//                                             </View>

//                                             {awards.map((item, index) => (
//                                                 <View key={index} style={{ backgroundColor: '#fff', paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <TextInput
//                                                         style={{ color: '#000', fontSize: 6 }}
//                                                         value={item.name}
//                                                         onChangeText={(text) => handleawardNameChange(index, text)}
//                                                     />
//                                                 </View>
//                                             ))}
//                                         </View>
//                                     ) : null}
//                                     {/* {
//                                         profiledataget && profiledataget?.awards.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Awards</Text>
//                                                 </View>



//                                                 {profiledataget && profiledataget.awards ? (
//                                                     profiledataget.awards.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }} key={item.id}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })
//                                                 ) : (
//                                                     ""
//                                                 )}

//                                             </View>
//                                             : ""
//                                     } */}

//                                     {/* Medals*/}

//                                     {medals.length > 0 ? (
//                                         <View style={{ width: '100%', marginTop: 5 }}>
//                                             <View>
//                                                 <Text style={{ color: '#000', fontSize: 16 }}>Medals</Text>
//                                             </View>

//                                             {medals.map((item, index) => (
//                                                 <View key={index} style={{ backgroundColor: '#fff', paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <TextInput
//                                                         style={{ color: '#000', fontSize: 6 }}
//                                                         value={item.name}
//                                                         onChangeText={(text) => handleMedalNameChange(index, text)}
//                                                     />
//                                                 </View>
//                                             ))}
//                                         </View>
//                                     ) : null}
//                                     {/* {profiledataget && profiledataget.medals.length > 0 ? (
//                                         <View style={{ width: '100%', marginTop: 5 }}>
//                                             <View>
//                                                 <Text style={{ color: '#000', fontSize: 16 }}>Medals</Text>
//                                             </View>

//                                             {profiledataget && profiledataget.medals?.map((item, index) => (
//                                                 <View key={index} style={{ backgroundColor: '#fff', paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <TextInput
//                                                         style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}
//                                                         value={item.name}
//                                                         onChangeText={(text) => handleMedalNameChange(index, text)}
//                                                     />
//                                                 </View>
//                                             ))}
//                                         </View>
//                                     ) : null} */}

//                                     {/* {
//                                         profiledataget && profiledataget?.medals.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Medals</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.medals?.map((item) => {
//                                                         // console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     } */}

//                                     {/* Championships*/}
//                                     {Championships.length > 0 ? (
//                                         <View style={{ width: '100%', marginTop: 5 }}>
//                                             <View>
//                                                 <Text style={{ color: '#000', fontSize: 16 }}>Championships</Text>
//                                             </View>

//                                             {medals.map((item, index) => (
//                                                 <View key={index} style={{ backgroundColor: '#fff', paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <TextInput
//                                                         style={{ color: '#000', fontSize: 6 }}
//                                                         value={item.name}
//                                                         onChangeText={(text) => handleChampionshipsNameChange(index, text)}
//                                                     />
//                                                 </View>
//                                             ))}
//                                         </View>
//                                     ) : null}



//                                     {/* {
//                                         profiledataget && profiledataget?.competition_won.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Championships</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.competition_won?.map((item) => {

//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.championship}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     } */}

//                                     {/* Clubs Associated with:*/}
//                                     {
//                                         profiledataget && profiledataget?.clubs.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Clubs Associated with:</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.clubs?.map((item) => {
//                                                         return (
//                                                             <View style={{}}>
//                                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                                 </View>

//                                                                 <View style={{ width: "100%", flexDirection: "row", gap: 3, alignItems: "center" }}>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.from}</Text>
//                                                                     </View>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 7, marginTop: 5, borderRadius: 5, marginLeft: 2 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.to}</Text>
//                                                                     </View>
//                                                                 </View>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }

//                                     {/* Coaches played under:*/}
//                                     {
//                                         profiledataget && profiledataget?.coaches.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Coaches played under:</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.coaches?.map((item) => {
//                                                         return (
//                                                             <View style={{}}>
//                                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                                 </View>

//                                                                 <View style={{ width: "100%", flexDirection: "row", gap: 3, alignItems: "center" }}>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.from}</Text>
//                                                                     </View>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 7, marginTop: 5, borderRadius: 5, marginLeft: 2 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.to}</Text>
//                                                                     </View>
//                                                                 </View>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }

//                                     {/* Age*/}
//                                     {
//                                         profiledataget && profiledataget?.age ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Age</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.age}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Height*/}
//                                     {
//                                         profiledataget && profiledataget?.height ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Height</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.height}</Text>
//                                                 </View>
//                                             </View> : ""
//                                     }

//                                     {/* Weight*/}
//                                     {
//                                         profiledataget && profiledataget?.width ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Weight</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.width}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }
//                                 </View>
//                             </ScrollView>
//                         )}

//                         {profiledataget && profiledataget?.user_type === "other" && (
//                             <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: 500 }}>
//                                 <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>


//                                     {/* name */}
//                                     {
//                                         profiledataget && profiledataget?.name ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.name}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Sport */}
//                                     {
//                                         profiledataget && profiledataget?.game_name ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Sport</Text>
//                                                 </View>


//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.game_name}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }

//                                     {
//                                         profiledataget && profiledataget?.type ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Type</Text>
//                                                 </View>
//                                                 {
//                                                     personilitydropdown && personilitydropdown.map((item) => {
//                                                         // console.log("Dropdownitem:", item); // Check dropdown item
//                                                         if (profiledataget && profiledataget?.type == item._id) {
//                                                             console.log("Matcheditem:", item.personality_type_name); // Check matched item
//                                                             return (
//                                                                 <View key={item._id} style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     {/* <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.type}</Text> */}
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.personality_type_name}</Text>
//                                                                 </View>
//                                                             )
//                                                         }
//                                                         return null; // Ensure to return null if condition doesn't match
//                                                     })
//                                                 }
//                                             </View>
//                                             : ""
//                                     }


//                                     {/* City*/}

//                                     {
//                                         profiledataget && profiledataget?.city ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>City</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.city ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.city}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Country*/}
//                                     {
//                                         profiledataget && profiledataget?.country ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Country</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.country ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.country}</Text>
//                                                         </View> :
//                                                         ""

//                                                 }
//                                             </View>
//                                             : ""
//                                     }
//                                     {/* Certifications for the role*/}
//                                     {
//                                         profiledataget && profiledataget?.certifications.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Certifications for the role</Text>
//                                                 </View>



//                                                 {profiledataget && profiledataget.certifications ? (
//                                                     profiledataget.certifications.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }} key={item.id}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })
//                                                 ) : (
//                                                     ""
//                                                 )}

//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Clubs Associated with:*/}
//                                     {
//                                         profiledataget && profiledataget?.clubs.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Clubs Associated with:</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.clubs?.map((item) => {
//                                                         return (
//                                                             <View style={{}}>
//                                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                                 </View>

//                                                                 <View style={{ width: "100%", flexDirection: "row", gap: 3, alignItems: "center" }}>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.from}</Text>
//                                                                     </View>
//                                                                     <View style={{ width: "49%", backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 7, marginTop: 5, borderRadius: 5, marginLeft: 2 }}>
//                                                                         <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.to}</Text>
//                                                                     </View>
//                                                                 </View>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }



//                                     {/* Awards*/}
//                                     {
//                                         profiledataget && profiledataget?.awards.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Awards</Text>
//                                                 </View>



//                                                 {profiledataget && profiledataget.awards ? (
//                                                     profiledataget.awards.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }} key={item.id}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })
//                                                 ) : (
//                                                     ""
//                                                 )}

//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Medals*/}
//                                     {
//                                         profiledataget && profiledataget?.medals.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Medals</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.medals?.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }

//                                     {/* Championships*/}
//                                     {
//                                         profiledataget && profiledataget?.competition_won.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Championships</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.competition_won?.map((item) => {

//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.championship}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }

//                                     {/* Age*/}
//                                     {
//                                         profiledataget && profiledataget?.age ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Age</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.age}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Weight*/}
//                                     {
//                                         profiledataget && profiledataget?.width ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Weight</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.width}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Height*/}
//                                     {
//                                         profiledataget && profiledataget?.height ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Height</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.height}</Text>
//                                                 </View>
//                                             </View> : ""
//                                     }


//                                 </View>
//                             </ScrollView>
//                         )}

//                         {profiledataget && profiledataget?.user_type === "team" && (
//                             <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: 500 }}>
//                                 <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>


//                                     {/* name */}
//                                     {
//                                         profiledataget && profiledataget?.name ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.name}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""
//                                     }

//                                     {/* City*/}

//                                     {
//                                         profiledataget && profiledataget?.city ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>City</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.city ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.city}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Country*/}
//                                     {
//                                         profiledataget && profiledataget?.country ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Country</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.country ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.country}</Text>
//                                                         </View> :
//                                                         ""

//                                                 }
//                                             </View>
//                                             : ""
//                                     }


//                                     {/* Established datee*/}

//                                     {
//                                         profiledataget && profiledataget?.dob ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Established datee</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.dob ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.dob}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Sports Associated with*/}

//                                     {
//                                         profiledataget && profiledataget?.game_name ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Sports Associated with</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.game_name ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.game_name}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Home Ground*/}

//                                     {
//                                         profiledataget && profiledataget?.home_ground ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Home Ground</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.home_ground ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.home_ground}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Google Map link to Club*/}

//                                     {
//                                         profiledataget && profiledataget?.map_link ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Google Map link to Club</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.map_link ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.map_link}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Clubs official registration details:*/}
//                                     <View style={{ width: "100%", paddingTop: 15 }}>
//                                         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                                             <View style={{}}>
//                                                 <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
//                                                     Clubs official registration details:
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </View>





//                                     {/* Management*/}
//                                     {
//                                         profiledataget && profiledataget?.managements.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Management</Text>
//                                                 </View>



//                                                 {profiledataget && profiledataget.managements ? (
//                                                     profiledataget.managements.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }} key={item.id}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })
//                                                 ) : (
//                                                     ""
//                                                 )}

//                                             </View>
//                                             : ""
//                                     }

//                                     {/* previous_coaches*/}
//                                     {
//                                         profiledataget && profiledataget?.previous_coaches.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Coaches</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.previous_coaches?.map((item) => {
//                                                         // console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }


//                                     {/* Other staff*/}
//                                     {
//                                         profiledataget && profiledataget?.other_stuffs.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Other staff</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.other_stuffs?.map((item) => {
//                                                         // console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }


//                                     {/* Team Size*/}
//                                     {
//                                         profiledataget && profiledataget?.team_size ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Team Size</Text>
//                                                 </View>

//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.team_size}</Text>
//                                                 </View>
//                                             </View>
//                                             : ""
//                                     }

//                                     {/* Team Players names*/}
//                                     {
//                                         profiledataget && profiledataget?.players.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Team Players names</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.players?.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }

//                                     {/* Championships*/}
//                                     {
//                                         profiledataget && profiledataget?.competition_won.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Championships</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.competition_won?.map((item) => {

//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.championship}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }


//                                     {/*Alumni Players*/}
//                                     {
//                                         profiledataget && profiledataget?.alumni_players.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Alumni Players</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.alumni_players?.map((item) => {
//                                                         console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }

//                                     {/*Actively Participating competitions*/}
//                                     {
//                                         profiledataget && profiledataget?.active_competition.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Actively Participating competitions</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.active_competition?.map((item) => {
//                                                         // console.log("5555", item)
//                                                         return (
//                                                             <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                 <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> : ""
//                                     }

//                                 </View>
//                             </ScrollView>
//                         )}

//                         {profiledataget && profiledataget?.user_type === "orgs" && (
//                             <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: 500 }}>
//                                 <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>


//                                     {/* name */}
//                                     {/* {
//                                         profiledataget && profiledataget?.name ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.name}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""

//                                     } */}

//                                     <View style={{ width: "100%" }}>
//                                         <View>
//                                             <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
//                                         </View>
//                                         <TextInput
//                                             style={{ backgroundColor: "#000", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}
//                                             value={profiledataget && profiledataget?.name}
//                                             onChangeText={text => handleChange('name', text)}
//                                         />
//                                     </View>
//                                     {/* Organization Type */}
//                                     {
//                                         profiledataget && profiledataget?.org_type_name
//                                             ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Organization Type</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.org_type_name}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""
//                                     }
//                                     {/* Established Date */}

//                                     {
//                                         profiledataget && profiledataget?.dob ?
//                                             <View style={{ width: "100%" }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Established Date</Text>
//                                                 </View>
//                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.dob}</Text>
//                                                 </View>

//                                             </View>
//                                             : ""

//                                     }



//                                     {/* City*/}

//                                     {
//                                         profiledataget && profiledataget?.city ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>City</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.city ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.city}</Text>
//                                                         </View>
//                                                         : ""

//                                                 }
//                                             </View>
//                                             :
//                                             ""
//                                     }

//                                     {/* Country*/}
//                                     {
//                                         profiledataget && profiledataget?.country ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Country</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.country ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.country}</Text>
//                                                         </View> :
//                                                         ""

//                                                 }
//                                             </View>
//                                             : ""
//                                     }


//                                     {/* key Personalities*/}
//                                     {
//                                         profiledataget && profiledataget?.key_personalities.length > 0 ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>

//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Key Personalities</Text>
//                                                 </View>

//                                                 {
//                                                     profiledataget && profiledataget.key_personalities?.map((item) => {
//                                                         console.log("666666", item)
//                                                         return (
//                                                             <View style={{}}>
//                                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.name}</Text>
//                                                                 </View>
//                                                                 <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                                     <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{item.designation}</Text>
//                                                                 </View>
//                                                             </View>
//                                                         )
//                                                     })

//                                                 }
//                                             </View> :
//                                             ""
//                                     }

//                                     {/* Description*/}
//                                     {
//                                         profiledataget && profiledataget?.desc ?
//                                             <View style={{ width: "100%", marginTop: 5 }}>
//                                                 <View style={{}}>
//                                                     <Text style={{ color: '#000', fontSize: 16 }}>Description</Text>
//                                                 </View>
//                                                 {
//                                                     profiledataget && profiledataget?.desc ?
//                                                         <View style={{ backgroundColor: "#fff", paddingVertical: 5, paddingLeft: 5, marginTop: 5, borderRadius: 5 }}>
//                                                             <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>{profiledataget && profiledataget?.desc}</Text>
//                                                         </View> :
//                                                         ""

//                                                 }
//                                             </View>
//                                             : ""
//                                     }




//                                 </View>
//                             </ScrollView>
//                         )}
//                         <View style={{ height: 40 }}></View>



//                         {/* <TabBar /> */}
//                     </View>
//             }
//             {/* <TabBar /> */}
//         </View>
//     )
// }

// export default ProfileUpdatePage
// const styles = StyleSheet.create({
//     // Add your styles here
//     icon: {
//         color: '#fff',
//         fontSize: 20,
//         marginHorizontal: 5,
//     },
//     clubContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     input: {
//         flex: 1,
//         borderBottomWidth: 0.29,
//         borderBottomColor: '#fff',
//         marginVertical: 5,
//         padding: 0,
//         fontSize: 16,
//         color: '#000',
//         fontWeight: '300',
//     },
//     datePicker: {
//         flex: 1,
//         marginVertical: 5,
//     },
//     dropdown1BtnStyle: {
//         width: "100%",
//         height: 35,
//         borderRadius: 10,
//         marginTop: 5

//     },
//     dropdown4BtnTxtStyle: {
//         fontSize: responsiveFontSize(1.8),
//         textAlign: 'left'
//     }
// });

