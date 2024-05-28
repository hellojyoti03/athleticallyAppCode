import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, TextInput, ScrollView, Image } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Video from 'react-native-video';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import axios from 'axios'
import Icon1 from 'react-native-vector-icons/dist/AntDesign';
import UserIcon from 'react-native-vector-icons/dist/FontAwesome';
import TabBar from '../common/TabBar';
const Explore = () => {
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [model, setmodel] = useState(true);
    const navigation = useNavigation();
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [reelsdata, setreelsdata] = useState('');
    const [searchtext, setsearchtext] = useState('');

    // const getdata = async () => {
    //     try {
    //         const response = await axios.get(
    //             'http://15.206.27.50:3009/api/v1/get-explore',

    //             { params: { user_id: "65084a48b5c351c3bdbd492b" } }

    //         );
    //         setreelsdata(response.data.data.users)
    //         console.log("response1212121212", response)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // useEffect(() => {
    //     getdata()
    // }, [])

    const getdata = async () => {
        try {
            let params = { user_id: "65084a48b5c351c3bdbd492b" };
            if (searchtext) {
                params.search_string = searchtext;
            }

            const response = await axios.get(
                'http://15.206.27.50:3009/api/v1/get-explore',
                { params }
            );

            setreelsdata(response.data.data.users);
            console.log("response545454", response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getdata();
    }, [searchtext]);

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
                        margin: 10,

                    }}>
                    <Text
                        style={{
                            color: '#545454',
                            fontSize: 15,
                            fontWeight: '300',
                            backgroundColor: "#ced9db",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 2,
                            elevation: 10
                        }}
                    >
                        No Data Found
                    </Text>
                </View>

            </View>
        );
    };


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

            <View style={{ marginHorizontal: 7, marginTop: 5, }}>
                <View
                    style={{
                        // backgroundColor: '#e6e6e9',
                        width: '100%',
                        height: 35,
                        borderRadius: 19,
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        // borderColor: "#F29D38",
                        // borderWidth: 1,
                        paddingHorizontal: 7,
                        backgroundColor: "#c1c1c1"
                    }}>
                    <View
                        style={{


                        }}>
                        <Icon1
                            style={{
                                color: '#fff',
                                fontSize: 11,
                                borderRadius: 17,
                                // paddingTop: 4
                                alignItems: "center",
                                // justifyContent: "center",
                                backgroundColor: "#000",
                                paddingHorizontal: 5,
                                paddingVertical: 5

                            }}
                            name="search1"
                        />
                    </View>

                    <View style={{ width: '100%', }}>
                        <TextInput

                            value={searchtext}
                            placeholder="Search Here"
                            placeholderTextColor="#615e5d"
                            onChangeText={(value) => setsearchtext(value)}

                            style={{
                                fontSize: responsiveFontSize(1.7),
                                color: '#000',
                                padding: 5

                            }}
                        />
                    </View>
                </View>
            </View>
            <FlatList
                data={reelsdata && reelsdata.length > 0 ? reelsdata : ''}
                ListEmptyComponent={EmptyListMessage}
                keyExtractor={(item, index) => index.toString()}
                style={{ backgroundColor: "#000", marginTop: 10 }}

                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    console.log("122121", item)
                    return (
                        <View style={{ marginHorizontal: 8, backgroundColor: "#000", height: 700 }}>
                            <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center", marginTop: 5 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, width: '100%' }}>
                                    {/* First View */}
                                    <View style={{ width: '58%' }}>

                                        {/* First video */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("Explorereels", { data: item._id })}
                                            style={{ height: 90, width: '100%', marginBottom: 2 }}>
                                            <Video
                                                source={{ uri: item.reels[0]?.reel_link }}
                                                style={{ width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10 }}
                                                resizeMode="stretch"
                                                paused={true}
                                            />
                                        </TouchableOpacity>
                                        {/* Second video */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("Explorereels", { data: item._id })}
                                            style={{ height: 90, width: '100%', marginBottom: 2 }}>
                                            <Video
                                                source={{ uri: item.reels[1]?.reel_link }}
                                                style={{ width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10 }}
                                                resizeMode="stretch"
                                                paused={true}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {/* Third video */}
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Explorereels", { data: item._id })}
                                        style={{ height: 180, width: '40%', marginBottom: 2 }}>
                                        <Video
                                            source={{ uri: item.reels[2]?.reel_link }}
                                            style={{ width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10 }}
                                            resizeMode="stretch"
                                            paused={true}
                                        />
                                    </TouchableOpacity>
                                </View>


                                {/* Second View */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    {item.reels.slice(3).map((videodata, index) => (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("Explorereels", { data: item._id })}
                                            key={index} style={{ height: 130, width: '32%', marginBottom: 2 }}>
                                            <Video
                                                source={{ uri: videodata?.reel_link }}
                                                style={{ width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10 }}
                                                resizeMode="stretch"
                                                paused={true}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>


                            <View
                                style={{
                                    paddingHorizontal: 6,
                                    flexDirection: "row",
                                    width: "100%",
                                    gap: 4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 5
                                }}>
                                {
                                    item.userDetails.map((data, index) => {
                                        // console.log("9999999", data)
                                        return (
                                            <View style={{
                                                backgroundColor: "#5c5c5c",
                                                width: "50%",
                                                flexDirection: "row",
                                                borderRadius: 5,
                                                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",

                                                elevation: 5,
                                            }}>
                                                {/* Conditionally render image position */}
                                                {index % 2 === 0 ? (
                                                    <View style={{ width: "40%" }}>
                                                        <Image
                                                            source={{ uri: data.image }}
                                                            style={{ width: "100%", height: 60, borderRadius: 5 }}
                                                        />
                                                    </View>
                                                ) : null}

                                                <View style={{ width: "58%", paddingTop: 5, paddingLeft: 5 }}>
                                                    <View style={{ fontSize: responsiveFontSize(1.5), flexDirection: "row" }}>
                                                        <UserIcon name="user-o"
                                                            style={{
                                                                color: "#000",
                                                                fontSize: responsiveFontSize(1.4),
                                                                backgroundColor: "#c0c0c0",
                                                                padding: 2,
                                                                borderRadius: 90,
                                                                elevation: 5,
                                                            }}
                                                        />
                                                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.7), fontWeight: "300", paddingLeft: 2 }}>{data.name}</Text>
                                                    </View>
                                                </View>

                                                {/* Conditionally render image position */}
                                                {index % 2 !== 0 ? (
                                                    <View style={{ width: "40%", alignItems: "center", justifyContent: "center", }}>
                                                        <Image
                                                            source={{ uri: data.image }}
                                                            style={{ width: "100%", height: 60, borderRadius: 5 }}
                                                        />
                                                    </View>
                                                ) : null}
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ marginBottom: 15 }}></View>
                        </View>
                    )
                }
                }
            />


            <TabBar />

        </View>
    )
}

export default Explore

const styles = StyleSheet.create({})