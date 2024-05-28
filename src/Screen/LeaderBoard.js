import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Video from 'react-native-video';
import { VideoData, VideoDataone } from '../demodata/Demovideo'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import EmailIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import TabBar from '../common/TabBar';
import axios from 'axios'
import Modal from "react-native-modal";
import Selecticon from 'react-native-vector-icons/dist/AntDesign';
import UserIcon from 'react-native-vector-icons/dist/FontAwesome';
import ScoreIcon from 'react-native-vector-icons/dist/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderBoard = () => {
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [selectedrank, setselectedrank] = useState("");
    const [selectedyear, setselectedyear] = useState("");
    const [selectedgame, setselectedgame] = useState("");
    const [gamedata, setgamedata] = useState("");
    const [usersdata, setusersdata] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [load, setload] = useState(false)
    const dropdownRefyear = useRef(null);
    const dropdownRefstate = useRef(null);
    const dropdownRefgame = useRef(null);



    const getgame = async () => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.get(
                '/api/v1/get-game-list'

            );
            setgamedata(response.data.data)
            console.log("getgame", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getgame()
    }, [])
    const rankinglist = [
        {
            name: "State Ranking",
            selectedname: "overall"
        }
    ]

    const onRefresh = () => {
        getgame()
    }
    const EmptyListMessage = ({ }) => {
        return (
            // Flat List Item
            <View style={{
                paddingTop: "30%",


            }}>
                <View
                    style={{

                        alignItems: 'center',
                        justifyContent: "center",

                    }}>
                    <Image
                        style={{
                            width: '70%', height: 170, alignItems: 'center',
                            justifyContent: "center"
                        }}
                        source={require('../assets/nodatafound1.png')}
                    />
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        margin: 10
                    }}>
                    <Text
                        style={{ color: '#fff', fontSize: 15, fontWeight: '300' }}
                    >
                        No Data Found
                    </Text>
                </View>

            </View>
        );
    };

    const senddata = async () => {
        try {
            setload(true)
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.post(
                '/api/v1/get-leaderboard',
                {
                    game_id: selectedgame && selectedgame,
                    filter: selectedrank && selectedrank,
                    year: selectedyear && selectedyear
                }

            );
            if (response) {
                setload(false)
                setusersdata(response.data.data.users);
                console.log("leaderboard", response)
            }


        } catch (error) {
            setload(false)
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        if (selectedgame && selectedrank && selectedyear) {
            senddata();
        }
    }, [selectedgame, selectedrank, selectedyear]);


    const openRankingDropdown = () => {
        if (dropdownRefstate.current) {
            dropdownRefstate.current.openDropdown();
        }
    };

    const openYearDropdown = () => {
        if (dropdownRefyear.current) {
            dropdownRefyear.current.openDropdown();
        }
    };

    const openGameDropdown = () => {
        if (dropdownRefgame.current) {
            dropdownRefgame.current.openDropdown();
        }
    };

    const Yearlist = [
        {
            name: "2024",
            selecteddname: "2024"
        },
        {
            name: "2025",
            selecteddname: "2025"
        },
        {
            name: "2026",
            selecteddname: "2026"
        },
        {
            name: "2027",
            selecteddname: "2027"
        },




    ]
    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={statusBarStyle}
            />

            <View style={{}}>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }}>
                    <View>

                    </View>
                    <View style={{
                        justifyContent: "center",
                        paddingLeft: responsiveWidth(.68),
                        alignItems: "center",

                    }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2.1),
                                color: "#fff",
                                fontWeight: '400',
                                alignItems: "center"
                            }}>
                            ATHELETICALY
                        </Text>
                    </View>

                    <View style={{}}>
                        <Notificationss name="notification-add" style={{ fontSize: responsiveFontSize(2.6) }} />
                    </View>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <View style={{ width: "100%", flexDirection: "row", }}>

                    <View style={{ width: "30%", alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "600" }} >L{'\n'}E{'\n'}A{'\n'}D{'\n'}E{'\n'}R</Text>
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "600" }}>BOARD</Text>
                    </View>


                    <View style={{ width: "70%" }}>
                        {/* ranking */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <SelectDropdown
                                ref={dropdownRefstate}
                                data={rankinglist && rankinglist.map((item) => {
                                    return item.name;
                                })}

                                onSelect={(selectedItem, index) => {
                                    const selectedGame = rankinglist && rankinglist.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedranked = selectedGame.selectedname;
                                        setselectedrank(selectedranked);
                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                defaultButtonText="Select Ranking"
                                buttonStyle={{
                                    width: "85%",
                                    height: 35,
                                    // borderRadius: 18,
                                    borderTopLeftRadius:7,
                                    borderBottomLeftRadius:7,
                                    marginTop: 5,
                                    backgroundColor: "#73d0e3"

                                }}
                                buttonTextStyle={{
                                    fontSize: responsiveFontSize(1.8),
                                    textAlign: 'left'
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    width: "14%",
                                    height: 35,
                                    // borderRadius: 60,
                                    borderTopRightRadius:7,
                                    borderBottomRightRadius:7,
                                    marginTop: 5,
                                    backgroundColor: "#73d0e3",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginLeft: 2

                                }}
                                onPress={openRankingDropdown}
                                >
                                <Selecticon
                                    style={{ color: "#000", fontSize: responsiveFontSize(2), }}
                                    name="downcircleo" />
                            </TouchableOpacity>
                        </View>

                        {/* Year  */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <SelectDropdown
                                ref={dropdownRefyear}
                                data={Yearlist && Yearlist.map((item) => {
                                    return item.name;
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = Yearlist && Yearlist.find(item => item.name === selectedItem);
                                    console.log("oooooo", selectedItem)
                                    if (selectedGame) {
                                        const selectedyear = selectedGame.selecteddname;
                                        setselectedyear(selectedyear);
                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={{
                                    width: "84%",
                                    height: 35,
                                    borderTopLeftRadius:7,
                                    borderBottomLeftRadius:7,
                                    marginTop: 5,
                                    backgroundColor: "#13f017"

                                }}
                                defaultButtonText="Select Year"
                                buttonTextStyle={{
                                    fontSize: responsiveFontSize(1.8),
                                    textAlign: 'left'
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    width: "14%",
                                    height: 35,
                                    borderTopRightRadius:7,
                                    borderBottomRightRadius:7,
                                    marginTop: 5,
                                    backgroundColor: "#13f017",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginLeft: 2

                                }}
                                onPress={openYearDropdown}>
                                <Selecticon
                                    style={{ color: "#000", fontSize: responsiveFontSize(2), }}
                                    name="downcircleo" />
                            </TouchableOpacity>
                        </View>


                        {/* game  */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <SelectDropdown
                                ref={dropdownRefgame}
                                data={gamedata && gamedata.map((item) => {
                                    return item.name;
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = gamedata && gamedata.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        // getpostion(selectedGameId)
                                        setselectedgame(selectedGameId)
                                        // console.log(selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={{
                                    width: "84%",
                                    height: 35,
                                    borderTopLeftRadius:7,
                                    borderBottomLeftRadius:7,
                                    // borderRadius: 18,
                                    marginTop: 5,
                                    backgroundColor: "#fff"

                                }}
                                defaultButtonText="Select Game"
                                buttonTextStyle={{
                                    fontSize: responsiveFontSize(1.8),
                                    textAlign: 'left'
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    width: "14%",
                                    height: 35,
                                    borderTopRightRadius:7,
                                    borderBottomRightRadius:7,
                                    marginTop: 5,
                                    backgroundColor: "#fff",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginLeft: 2

                                }}
                                onPress={openGameDropdown}
                                >
                                <Selecticon
                                    style={{ color: "#000", fontSize: responsiveFontSize(2), }}
                                    name="downcircleo" />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>

            {
                load && load == true ?
                    <View
                        style={{
                            // flex: 1,
                            marginVertical: "60%",
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="small" color="#000" animating={load} />
                        <Text style={{ fontSize: 12, color: "#000", fontWeight: "400", }}>please wait</Text>
                    </View>
                    :
                    <FlatList
                        // data={usersdata && usersdata.length > 0 ? usersdata : ''}
                        ListEmptyComponent={EmptyListMessage}
                        data={usersdata && usersdata.length > 0 ? usersdata : ''}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#000']}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        // style={{ marginBottom: 55 }}

                        renderItem={({ item, index }) => {
                            console.log(item)
                            return (
                                <View style={{ flex: 1,}}>
                                    <View style={{ marginHorizontal: 9 }}>
                                        <View style={{
                                            width: "100%",
                                             height:90,
                                            flexDirection: "row",
                                            backgroundColor: "#adadad",
                                            marginTop: 5,
                                            borderRadius:6
                                        }}>
                                            <View style={{ width: "30%",alignItems: "center",justifyContent:"center" }}>
                                                <Image
                                                    style={{ height: "90%", width: "80%",borderRadius:80}}
                                                    source={{ uri: item.image }}
                                                resizeMode="stretch"
                                                />
                                            </View>
                                            <View style={{ width: "70%",paddingTop:9  }}>
                                                <View style={{ width: "100%", flexDirection: "row",  }}>
                                                    <View style={{ backgroundColor: "#9d9d9d", padding: 5, borderRadius: 80 }}>
                                                        <UserIcon name="user" style={{color:"#fff",fontSize:responsiveFontSize(1.8)}} />
                                                    </View>
                                                    <View style={{ paddingLeft: 4 }}>
                                                        <Text style={{fontSize:responsiveFontSize(2),color:"#000"}}>{item.name}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingTop: 3 }}>
                                                    <View style={{ backgroundColor: "#9d9d9d", padding: 5, borderRadius: 80 }}>
                                                        <EmailIcon name="email-edit" style={{color:"#fff",fontSize:responsiveFontSize(1.7)}} />
                                                    </View>
                                                    <View style={{ paddingLeft: 4 }}>
                                                        <Text style={{fontSize:responsiveFontSize(2),color:"#000"}}>{item.email}</Text>
                                                    </View>
                                                    

                                                </View>

                                                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingTop: 3 }}>
                                                    <View style={{ backgroundColor: "#9d9d9d", padding: 5, borderRadius: 80 }}>
                                                        <ScoreIcon name="sports-score" style={{color:"#fff",fontSize:responsiveFontSize(1.7)}} />
                                                    </View>
                                                    <View style={{ paddingLeft: 4 }}>
                                                        <Text style={{fontSize:responsiveFontSize(2),color:"#000"}}>{item.score}</Text>
                                                    </View>
                                                    

                                                </View>


                                            </View>

                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
            }
              <TabBar />
        </View>
    )
}

export default LeaderBoard

const styles = StyleSheet.create({})