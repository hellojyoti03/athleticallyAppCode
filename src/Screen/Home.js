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
const deviceheight = Dimensions.get('window').height
const devicewidth = Dimensions.get('window').width
import { useSelector } from 'react-redux'
const Home = () => {

    const dataitem = useSelector(state => state)
    let result = dataitem.token[0]
    console.log('Extracted Tokensssssssssssssssssss: ', result);

    const [data, setdata] = useState('')

    const handleSubmit = async () => {
        try {
            //   setload(true)
           

            const result = await axios
                .get(
                    `https://athletically.onrender.com/api/v1/get-homepage-reels`,{ user_id: "65a9527612c4e22af848137f" }
                    //  { params: { user_id: result.user_id } } 
                )
                .then(res => {
                    setdata(res.data.data)
                      console.log(res, 'reels data');
                    // Toast()
                });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSubmit()
    }, [])

    const navigation = useNavigation();
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [okk, setokk] = useState(0)

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <View style={{ flexDirection: "row", width: "100%", gap: 3, marginHorizontal: 5 }}>

                    <View style={{ width: "32%" }}>
                        <Image
                            source={{ uri: item?.image }}
                            style={{ height: 160, width: "100%" }}
                        />
                    </View>
                    {
                        item.reels?.map((reelsitem) => {
                            return (
                                <View style={{
                                    width: "32%",

                                }}>

                                    <Video
                                        // controls={true}
                                        source={{ uri: reelsitem?.url }}
                                        style={{ width: "100%", height: 200, backgroundColor: "#fff", borderRadius: 10 }}
                                        resizeMode="cover"
                                        paused={true}
                                    />
                                </View>
                            )
                        })
                    }
                    <TouchableOpacity style={{ margin: 4 }}>
                    </TouchableOpacity>
                </View>
            </View>
        )


        // if (index === 0 && item.type === 'photo') {
        //     return (
        //         <View style={{ width: 110, height: 200, borderRadius: 10, justifyContent: 'center', backgroundColor: "#000", alignItems: "center" }}>
        //             <View>
        //                 <Image source={item.photo} style={{ width: 100, height: 100, borderRadius: 70 }} />
        //             </View>

        //         </View>
        //     );
        // } else if (item.type === 'videos') {
        //     return (
        //         <TouchableOpacity style={{ margin: 4 }}
        //             onPress={() => navigation.navigate("ReelDetailScreen", { item: item })}
        //         // style={{ gap: 5 }}
        //         >
        //             <Video
        //                 // ref={vedioRef}
        //                 // controls={true}
        //                 source={item.video}
        //                 style={{ width: 110, height: 200, backgroundColor: "#fff", borderRadius: 10 }}
        //                 resizeMode="cover"
        //                 paused={true}
        //             />
        //         </TouchableOpacity>
        //     );
        // 
    };



    // const [reelsdata, setreelsdata] = useState()

    // const getreels = async () => {
    //     try {
    //         const result = await axios
    //             .get(
    //                 `/api/v1/get-all-reels`,
    //             )
    //             .then(res => {
    //                 setreelsdata(res.data.data)
    //                 console.log(res.data.data, 'data');
    //                 // Toast()
    //             });
    //         console.log(result);
    //     } catch (error) {
    //         // seterror(error.response.data.message)
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     getreels()
    // }, [])

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

            <ScrollView>

                 
                <View style={{ flexDirection: "row", marginTop: 10 }}>

                    <TouchableOpacity 
                    //  onPress={()=>navigation.navigate("Matches")}
                    style={{
                        width: (devicewidth / 4) - 20,
                        height: deviceheight / 4,
                        backgroundColor: "#52d3d8",
                        marginHorizontal: 10,
                        borderRadius: 10,
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                transform: [{ rotate: '-90deg' }],
                                color: "#000",
                                fontSize: responsiveFontSize(2),
                                fontWeight: "600",

                            }}>MATCHES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    //  onPress={(navigation.navigate("LeaderBoard"))}
                    style={{
                        width: (devicewidth / 4) - 20,
                        height: deviceheight / 4,
                        backgroundColor: "#13f017",
                        marginHorizontal: 10,
                        borderRadius: 10,
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                transform: [{ rotate: '-90deg' }],
                                color: "#000",
                                fontSize: responsiveFontSize(2),
                                fontWeight: "600",

                            }}>PODCAST</Text>
                    </TouchableOpacity>



                    <TouchableOpacity 
                    //   onPress={(navigation.navigate("LeaderBoard"))}
                    style={{
                        width: (devicewidth / 4) - 20,
                        height: deviceheight / 4,
                        backgroundColor: "#fff",
                        marginHorizontal: 10,
                        borderRadius: 10,
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                transform: [{ rotate: '-90deg' }],
                                color: "#000",
                                fontSize: responsiveFontSize(2),
                                fontWeight: "600",

                            }}>LEADER BOARD</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                    // onPress={(navigation.navigate("Events"))}
                    style={{
                        width: (devicewidth / 4) - 20,
                        height: deviceheight / 4,
                        backgroundColor: "#424242",
                        marginHorizontal: 10,
                        borderRadius: 10,
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                transform: [{ rotate: '-90deg' }],
                                color: "#FFF",
                                fontSize: responsiveFontSize(2),
                                fontWeight: "600",

                            }}>EVENTS</Text>
                    </TouchableOpacity>


                </View>

                {/* previous */}
                <View style={{}}>
                    <FlatList
                        data={data && data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        contentContainerStyle={{ padding: 3, gap: 10 }}

                    />
                </View>
            </ScrollView>
            <TabBar />

        </View>
    )
}

export default Home


// text roted  ////<Text style={{transform: [{ rotate: '-90deg'}]}}>Value</Text>
