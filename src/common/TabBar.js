



import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Home from 'react-native-vector-icons/dist/AntDesign';
import Connect from 'react-native-vector-icons/dist/FontAwesome5';
import Earthh from 'react-native-vector-icons/dist/Ionicons';
import ProfileIcon from 'react-native-vector-icons/dist/FontAwesome';
import Pluseee from 'react-native-vector-icons/dist/AntDesign';
import Videoicon from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import ImagePicker from 'react-native-image-picker';
const TabBar = () => {
    // const [selected, setselected] = useState(0);
    const [photo, setPhotoURI] = useState(null);
    const navigation = useNavigation();
    const [videoUri, setVideoUri] = useState(null);
    const [model, setmodel] = useState(false);


    const srv =()=>{
        navigation.navigate("PlusDetailsPage",{code:"srv"}) 
        setmodel(false)  
    }

    
    const mv =()=>{
        navigation.navigate("MatchVideoupload",{code:"mv"}) 
        setmodel(false)  
    }

    return (

        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: "100%",
                    height: 60,
                    position: "absolute",
                    bottom: 0,
                    // backgroundColor: "#F29D38",
                    flexDirection: "row",



                }}>

                {/* home */}
                <View
                    style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000",
                        borderTopStartRadius: 26,

                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DashboardPage')}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Home name='home'
                            style={{ color: "#fff", fontSize: responsiveFontSize(2.5), color: "#fff" }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.70), color: "#fff" }}>HOME</Text>

                    </TouchableOpacity>


                </View>

                {/* Connect*/}
                <View
                    style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000"
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Connect')}
                        // onPress={() => handdlechange()}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Connect name='users'
                            style={{ color: "#fff", fontSize: responsiveFontSize(1.8), color: "#fff" }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.75), color: "#fff", paddingTop: 5 }}>Connect</Text>

                    </TouchableOpacity>
                </View>

                {/* pluss */}
                <View
                    style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000"
                    }}>
                    <TouchableOpacity
                        // onPress={handdlechange}
                        onPress={() => setmodel(true)}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#fff",
                                paddingHorizontal: 2,
                                paddingVertical: 2,
                                borderRadius: 90,
                                bottom: 2

                            }}>
                            <Pluseee name='plus'
                                style={{
                                    color: "#fff",
                                    fontSize: responsiveFontSize(2.5),
                                    color: "#000",
                                    backgroundColor: "#fff",
                                    paddingHorizontal: 10,
                                    paddingVertical: 9,
                                    borderRadius: 90
                                }}
                            />
                        </View>


                    </TouchableOpacity>
                </View>
                {/* Explore */}
                <View
                    style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000"
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Explore')}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Earthh name='earth'
                            style={{ color: "#fff", fontSize: responsiveFontSize(2.5), color: "#fff" }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.70), color: "#fff" }}>Explore</Text>

                    </TouchableOpacity>
                </View>

                {/* profile */}
                <View
                    style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopRightRadius: 26,
                        backgroundColor: "#000",
                        // backgroundColor: "red",
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProfileUpdatePage')}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <ProfileIcon name='user-circle-o'
                            style={{ color: "#fff", fontSize: responsiveFontSize(2.5), color: "#fff" }}
                        />
                        <Text style={{ fontSize: responsiveFontSize(1.70), color: "#fff" }}>Profile</Text>

                    </TouchableOpacity>


                </View>

            </View>


            <Modal
                isVisible={model}
                onBackdropPress={() => setmodel(false)}
                onSwipeComplete={() => setmodel(false)}
                // swipeDirection={['down']}
                backdropOpacity={0.5}
            // style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        height: "auto",
                        backgroundColor: "#bdbdbd",
                        position: "absolute",
                        // alignItems: "center",
                        width: "100%",
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 0.55,
                        height: "auto",
                        padding: 10
                    }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        {/* <Videoicon
                        style={{color:"#000",
                        fontSize: responsiveFontSize(1.5),}}
                        name="video-library"/> */}
                        <Text style={{
                            paddingLeft: 5,
                            color: "#000",
                            fontSize: responsiveFontSize(1.7),
                            fontWeight: "500"
                        }}>Select uploaded Video Options </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => srv()}
                        style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginTop: 5, borderRadius: 15, paddingVertical: 5, paddingLeft: 7 }}>
                        <Videoicon
                            style={{
                                color: "#000",
                                fontSize: responsiveFontSize(1.5), backgroundColor: "#bdbdbd", padding: 3, borderRadius: 50
                            }}
                            name="video-library" />
                        <Text style={{
                            paddingLeft: 5,
                            color: "#000",
                            fontSize: responsiveFontSize(1.5),

                        }}>Short Reel Video </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("PlusDetailsPage",{code:"pv"})}
                        style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginTop: 5, borderRadius: 15, paddingVertical: 5, paddingLeft: 7 }}>
                        <Videoicon
                            style={{
                                color: "#000",
                                fontSize: responsiveFontSize(1.5), backgroundColor: "#bdbdbd", padding: 3, borderRadius: 50
                            }}
                            name="video-library" />
                        <Text style={{
                            paddingLeft: 5,
                            color: "#000",
                            fontSize: responsiveFontSize(1.5),
                        }}>Matches Video </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("PlusDetailsPage",{code:"pv"})}
                        style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginTop: 5, borderRadius: 15, paddingVertical: 5, paddingLeft: 7 }}>
                        <Videoicon
                            style={{
                                color: "#000",
                                fontSize: responsiveFontSize(1.5), backgroundColor: "#bdbdbd", padding: 3, borderRadius: 50
                            }}
                            name="video-library" />
                        <Text style={{
                            paddingLeft: 5,
                            color: "#000",
                            fontSize: responsiveFontSize(1.5),
                        }}>Podcast Video </Text>
                    </TouchableOpacity>
                </View>
            </Modal>


        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({})









