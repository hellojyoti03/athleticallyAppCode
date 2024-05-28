import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, Image, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Video from 'react-native-video';
import { VideoData, VideoDataone } from '../demodata/Demovideo'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/dist/Ionicons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import TabBar from '../common/TabBar';
import axios from 'axios'
import Modal from "react-native-modal";
import Followers from 'react-native-vector-icons/dist/FontAwesome5';
import Love from 'react-native-vector-icons/dist/AntDesign';
import Eyeee from 'react-native-vector-icons/dist/Entypo';
const deviceheight = Dimensions.get('window').height
const devicewidth = Dimensions.get('window').width
const UserProfiledetails = ({ route }) => {
    console.log(route)
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [model, setmodel] = useState(true);
    const renderItem = ({ item, index }) => {
        if (index === 0) {
            return (
                <TouchableOpacity style={{ margin: 4 }}
                    onPress={() => navigation.navigate("ReelDetailScreen", { item: item })}
                // style={{ gap: 5 }}

                >
                    <Video
                        // ref={vedioRef}
                        // controls={true}
                        source={item.video}
                        style={{ width: 120, height: 200, backgroundColor: "#fff", borderRadius: 10 }}
                        resizeMode="cover"
                        paused={true}
                    />
                </TouchableOpacity>


            );
        } else if (index === 1) {
            return (
                <TouchableOpacity style={{ margin: 4 }}
                    onPress={() => navigation.navigate("ReelDetailScreen", { item: item })}
                // style={{ gap: 5 }}

                >
                    <Video
                        // ref={vedioRef}
                        // controls={true}
                        source={item.video}
                        style={{ width: 200, height: 150, backgroundColor: "#fff", borderRadius: 10 }}
                        resizeMode="cover"
                        paused={true}
                    />
                </TouchableOpacity>
            );
        }
        else if (index === 2) {
            return (
                <TouchableOpacity style={{ margin: 4 }}
                    onPress={() => navigation.navigate("ReelDetailScreen", { item: item })}
                // style={{ gap: 5 }}

                >
                    <Video
                        // ref={vedioRef}
                        // controls={true}
                        source={item.video}
                        style={{ width: 200, height: 150, backgroundColor: "#fff", borderRadius: 10 }}
                        resizeMode="cover"
                        paused={true}
                    />
                </TouchableOpacity>
            );
        }


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
                        <Notificationss name="notification-add" style={{ fontSize: responsiveFontSize(2.1) }} />
                    </View>
                </View>
            </View>


            {/* design */}
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ width: '100%', }}>
                    <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                        <View style={{ width: '35%', backgroundColor: "#fff", height: 160, borderRadius: 10 }}>
                            <Text style={{color:"red"}}>1st</Text>
                        </View>
                        <View style={{ width: '60%', backgroundColor: "#fff", height: 150, marginLeft: 3, borderRadius: 10 }}>
                            <Text>1st</Text>
                        </View>


                        <View style={{ width: '100%', flexDirection: 'row' }}>


                            <View style={{ width: '35%', backgroundColor: "#fff", height: 160, marginTop: 6, borderRadius: 10 }}>
                                <Text style={{}}>1st</Text>
                            </View>


                            <View style={{ width: '60%', flexDirection: "row" }}>


                                <View style={{
                                    width: '40%',
                                    backgroundColor: "#fff",
                                    height: 170,
                                    marginTop: 6,
                                    borderRadius: 10,
                                    // position: "absolute",
                                    top: -10,
                                    marginLeft: 2
                                }}>
                                    <Text style={{}}>2st</Text>
                                </View>

                                <View style={{ width: '58%', flexDirection: "column", top: -10, paddingLeft: 5 }}>

                                    <View style={{ width: "100%", backgroundColor: "#fff", height: 80, marginTop: 6, borderRadius: 10 }}>
                                        <Text style={{}}>2st</Text>
                                    </View>
                                    <View style={{ width: "100%", backgroundColor: "#fff", height: 80, marginTop: 6, borderRadius: 10 }}>
                                        <Text style={{}}>2st</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </View>




            {/* model */}

            <Modal
                isVisible={model}
                onBackdropPress={() => setmodel(false)}
                onSwipeComplete={() => setmodel(false)}
              
                backdropOpacity={0.5}
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    margin: 0
                }}>
                <View
                    style={{
                        backgroundColor: "#fff",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        width: "100%",
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        // paddingHorizontal: 15,
                        borderColor: "#F29D38",
                        borderWidth: 0.55
                    }}>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ width: "100%" }}>
                            <View style={{}}>
                                <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 10 }}>
                                    <View style={{ width: "30%", paddingTop: 4 }}>
                                        <Image
                                            // source={require('../assets/user.jpg')}
                                            source={{ uri: route.params.data.image }}
                                            style={{ width: 110, height: 110, borderRadius: 50 }}
                                        />
                                    </View>

                                    <View style={{
                                        width: "70%",
                                        padding: 10
                                    }}>
                                        <View style={{ paddingLeft: 5, }}>
                                            <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>{route.params.data.name}</Text>
                                            <Text style={{ color: "#000", fontSize: responsiveFontSize(1.7), fontWeight: "400", paddingTop: 1, }}>comments djhfjdhfjkdhf dhfdkfhdkufhdkuf dfhkuhkduhfdkfd</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            paddingHorizontal: 5,
                                            paddingTop: 10,

                                        }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Followers name="user-friends" style={{ color: "#000", fontSize: responsiveFontSize(2) }} />
                                                <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>Followers</Text>
                                            </View>

                                            <View style={{ alignItems: "center" }}>
                                                <Love name="hearto" style={{ color: "#000", fontSize: responsiveFontSize(2) }} />
                                                <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>Like</Text>
                                            </View>

                                            <View style={{ alignItems: "center" }}>
                                                <Eyeee name="eye" style={{ color: "#000", fontSize: responsiveFontSize(2) }} />
                                                <Text style={{ color: "#000", fontSize: responsiveFontSize(2), fontWeight: "500" }}>Views</Text>
                                            </View>
                                        </View>
                                      </View>
                                     <View>
                                  </View>
                                </View>
                            </View>

                            {/* text */}

                            <View style={{ marginHorizontal: 10 }}>
                                <View style={{ width: "100%" }}>
                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "500", textAlign: "justify" }}>
                                        User Details means basic information collected by Company about Licensee's
                                        Users authorized by Licensee to use the Software, which is used for subscription
                                        management, activity logging, communications to Users by Company, and technical support purposes.
                                    </Text>
                                </View>
                            </View>

                            {/* button */}

                            {/* <View style={{
                                marginHorizontal: 30,
                                alignItems: "center"
                            }}>
                                <View style={{
                                    width: "100%",
                                    //  paddingHorizontal:4,
                                    backgroundColor: "gray",
                                    flexDirection: "row",
                                    gap: 4,
                                    alignItems: "center",

                                }}>

                                    <TouchableOpacity
                                        style={{ width: "50%", backgroundColor: "red", padding: 7, alignItems: "center" }}>
                                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "500", textAlign: "justify" }}>
                                            buttonttext
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ width: "50%", backgroundColor: "red", padding: 7, alignItems: "center" }}
                                    >
                                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "500", textAlign: "justify" }}>
                                            buttonttext
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View> */}
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}></View>
                </View>
            </Modal>

            <TabBar/>
        </View>
    )
}

export default UserProfiledetails

const styles = StyleSheet.create({})