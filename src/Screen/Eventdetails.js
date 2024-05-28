import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, Image, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Video from 'react-native-video';
import { VideoData, VideoDataone } from '../demodata/Demovideo'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import Time from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Location from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import TabBar from '../common/TabBar';
import Locatiomap from 'react-native-vector-icons/dist/FontAwesome5';
const deviceheight = Dimensions.get('window').height
const devicewidth = Dimensions.get('window').width
const Eventdetails = () => {
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [model, setmodel] = useState(true);
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


            <View style={{ marginTop: 10 }}>
                <View style={{ width: "100%", flexDirection: "row" }}>

                    <View style={{
                        width: "15%",
                        // backgroundColor: "blue",
                        height: 120,
                        alignItems: "flex-end",
                        justifyContent: "center"
                    }}>
                        <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "500" }} >E{'\n'}V{'\n'}E{'\n'}N{'\n'}T{'\n'}S</Text>
                    </View>

                    <View style={{ width: "85%", alignItems: "center", justifyContent: "center" }}>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff' }}>Football Trail</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff' }}>For U 18 Boys XYZ Club</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff' }}>Coach Name</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff' }}>Scout Name</Text>
                        </View>
                    </View>

                </View>
            </View>

            <View style={{ marginTop: 5 }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Time
                            style={{ fontSize: responsiveFontSize(2.2), color: '#fff' }}
                            name="clock-time-four-outline" />
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', paddingLeft: 7 }}>Present id Sollisicum diam</Text>
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 3 }}>
                        <Location
                            style={{ fontSize: responsiveFontSize(2.7), color: '#fff' }}
                            name="map-marker-radius-outline" />
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', paddingLeft: 7 }}>Present id Sollisicum diam</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 3 }}>
                        <Locatiomap
                            style={{ fontSize: responsiveFontSize(2.2), color: '#fff' }}
                            name="map-marked-alt" />
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', paddingLeft: 7 }}>Present id Sollisicum diam</Text>
                    </View>

                </View>
            </View>


            <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderWidth: 0.55,
                        borderColor: "grey",
                        padding: 5,
                        borderRadius: 15
                    }}>

                    <View style={{ width: "30%", alignItems: "center", backgroundColor: '#000' }}>
                        <Image
                            source={require('../assets/user.jpg')}
                            style={{ width: '100%', height: 100, borderRadius: 7 }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            width: "70%",
                            // backgroundColor: '#fff',
                            borderRadius: 15
                        }}>
                        <View style={{ width: "100%", paddingHorizontal: 10 }}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>
                                pollab
                            </Text>

                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), paddingTop: 5 }}>
                                pollabdddfdsdf dffsfsfs dvffsfsfsf dfdgdfs dvdfdffsfsf vdffsfdsfsfs sdfsdfsffsffs dvdvvvdvsv
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderWidth: 0.55,
                        borderColor: "grey",
                        padding: 5,
                        borderRadius: 15,
                        marginTop:4
                    }}>

                    <View style={{ width: "30%", alignItems: "center", backgroundColor: '#000' }}>
                        <Image
                            source={require('../assets/user.jpg')}
                            style={{ width: '100%', height: 100, borderRadius: 7 }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            width: "70%",
                            // backgroundColor: '#fff',
                            borderRadius: 15
                        }}>
                        <View style={{ width: "100%", paddingHorizontal: 10 }}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>
                                pollab
                            </Text>

                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), paddingTop: 5 }}>
                                pollabdddfdsdf dffsfsfs dvffsfsfsf dfdgdfs dvdfdffsfsf vdffsfdsfsfs sdfsdfsffsffs dvdvvvdvsv
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <TabBar />
        </View>
    )
}

export default Eventdetails

const styles = StyleSheet.create({})