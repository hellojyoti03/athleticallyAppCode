
import { Dimensions, TextInput, Text, TouchableOpacity, View, FlatList, StatusBar, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
const { width, height } = Dimensions.get('window')
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import DatePicker from 'react-native-date-picker'
import SettingsIcon from 'react-native-vector-icons/dist/Feather';

const ProfileUpdatePage = ({ route }) => {
    const navigation = useNavigation();
    const [reel, setreel] = useState("1");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    const [profiledataget, setprofiledataget] = useState("");
    const [load, setload] = useState(false);
  
    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
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

         


            <View style={{ marginTop: 5 }}>
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        backgroundColor: "#b4b4b4",
                        paddingHorizontal: 10,
                        alignItems: "center",
                        paddingVertical: 5,
                        gap: 4,

                    }}>
                    <TouchableOpacity
                        onPress={() => setreel("1")}
                        style={{
                            width: "50%",
                            backgroundColor: reel == "1" ? "red" : "#fff", 
                            // backgroundColor: "#fff",
                            alignItems: "center",
                            paddingVertical: 4,
                            justifyContent: "center",
                            borderRadius: 6
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: "#6b6b6b" }}>
                            Uploads
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setreel("2")}
                        style={{
                            width: "50%",
                            // backgroundColor: "#fff",
                            backgroundColor: reel === "1" ? "red" : "#fff", 
                            alignItems: "center",
                            paddingVertical: 4,
                            justifyContent: "center",
                            borderRadius: 6
                        }}
                    >
                        <Text style={{ fontSize: responsiveFontSize(2), color: "#6b6b6b" }}>
                            Bio
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>



            {
                reel && reel === "1" ?
                    <ScrollView>
                        {
                            load && load == true ?
                                <View
                                    style={{
                                        flex: 1,
                                        marginVertical: "60%",
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator size="small" color="#fff" animating={load} />
                                    <Text style={{ fontSize: 12, color: "#fff", fontWeight: "400", }}>please wait</Text>
                                </View>
                                :

                                <View style={{}}>
                                    <FlatList
                                        // data={profiledataget.reels}
                                        data={profiledataget?.reels && profiledataget?.reels.length > 0 ? profiledataget?.reels : ''}
                                        renderItem={renderItem}
                                        ListEmptyComponent={EmptyListMessage}
                                        keyExtractor={(item) => item}
                                        numColumns={3}
                                        contentContainerStyle={{
                                            padding: 3,
                                            justifyContent: "space-between",
                                        }}
                                    />
                                    <View style={{ marginBottom: 50, backgroundColor: "grey" }}></View>
                                </View>
                        }
                    </ScrollView>
                    :
                    <View style={{ marginTop: 5, marginHorizontal: 10, }}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProfileForm")}
                            style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 5 }}>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500", color: "#fff" }}>User Type :</Text>
                                </View>
                                <View style={{ paddingLeft: 5 }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}>{profiledataget && profiledataget?.user_type}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ alignItems: "center", justifyContent: "center", paddingRight: 5 }}>
                                    <SettingsIcon name="settings"
                                        style={{ color: "#fff", alignItems: "center", justifyContent: "center", }}
                                    />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "#fff" }}>
                                    Manage Profile
                                </Text>
                            </View>

                        </TouchableOpacity>



                    </View>
            }
            {/* <TabBar /> */}
        </View>
    )
}

export default ProfileUpdatePage

