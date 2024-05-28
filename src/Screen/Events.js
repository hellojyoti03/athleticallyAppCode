import { ToastAndroid, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, TextInput, RefreshControl, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import Calender from 'react-native-vector-icons/dist/AntDesign';
import Droppp from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import TabBar from '../common/TabBar';
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import Time from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Edit from 'react-native-vector-icons/dist/FontAwesome5';
import Delete from 'react-native-vector-icons/dist/AntDesign';
import LottieView from 'lottie-react-native';



const Events = () => {
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [model, setmodel] = useState(false);
    const [startdate, setstartdate] = useState("");
    const [editstartdate, seteditstartdate] = useState("");
    const [open, setOpen] = useState(false);
    const [editopen, seteditOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    const [date1, setDate1] = useState(new Date());
    const [timeopen, settimeopen] = useState(false);
    const [selectTime, setselectTime] = useState("")
    const [eventtitle, seteventtitle] = useState("")
    const [eventdescrp, seteventdescrp] = useState("")
    const [eventfor, seteventfor] = useState("")
    const [coachby, setcoachby] = useState("")
    const [scoutby, setscoutby] = useState("")
    const [location, setlocation] = useState("")
    const [maplink, setmaplink] = useState("")
    const [geteventdetails, setgeteventdetails] = useState("")
    const [storeusertype, setstoreusertype] = useState("")
    const [load, setload] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [error, seterror] = useState("")
    const [updatemodel, setupdatemodel] = useState(false);
    const [editmodeldatasave, seteditmodeldatasave] = useState("")
    const [addeventloader, setaddeventloader] = useState(false);
    const getevent = async (date) => {
        console.log("date8778",date)
        setload(true)
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            setstoreusertype(modifiedUser?.user_type)
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            if (selectedDate && selectedDate) {
                const response = await axios.post(
                    `/api/v1/get-events`, {
                    user_id: modifiedUser.user_id,
                    date: date
                }
                );
                setload(false)
                setgeteventdetails(response.data.data.events)
                console.log("eventdataget1111111111111", response)
            } else {
                setload(false)
                console.log("selectedDate is empty");

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

   
    const onRefresh = () => {
        getevent()
    }

    useEffect(() => {
        getevent()
    }, []);

    const modelclose = () => {
        setaddeventloader(false)
        seterror(false)
    }

    const postevent = async () => {
        try {
            setaddeventloader(true)
            if (!eventtitle || !eventdescrp || !eventfor || !coachby || !scoutby || !location || !maplink || !startdate || !selectTime) {
                seterror("Please fill in all fields");
                return;
            }
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.post(
                `/api/v1/add-event`, {
                user_id: modifiedUser.user_id,
                event_title: eventtitle && eventtitle,
                event_desc: eventdescrp && eventdescrp,
                event_for: eventfor && eventfor,
                coached_by: coachby && coachby,
                scouted_by: scoutby && scoutby,
                location: location && location,
                map_link: maplink,
                event_date: startdate && startdate,
                event_time: selectTime && selectTime
            }
            );
            console.log("postdata ", response)
            if (response.data.err == false) {
                AddedToast()
                setmodel(false)
                setaddeventloader(false)
                setstartdate("")
                setselectTime("")
            }
        } catch (error) {
            setaddeventloader(false)
            console.error('Error fetching data:', error);
        }
    };

    const openeditmodel = (data) => {
        seteditmodeldatasave(data)
        setupdatemodel(true)
    }


    const posteditevent = async (data) => {
        setupdatemodel(true)

        try {

            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.post(
                `/api/v1/edit-event`, {
                user_id: editmodeldatasave && editmodeldatasave.userid,
                event_id: editmodeldatasave && editmodeldatasave.eventid,
                event_title: eventtitle && eventtitle,
                event_desc: eventdescrp && eventdescrp,
                event_date: editstartdate && editstartdate,
                event_time: selectTime && selectTime
            }
            );
            console.log("edittttttttdataaaaaaa ", response)
            if (response.data.err == false) {
                setupdatemodel(false)
                ModifiedToast()
                getevent();

            }
            setmodel(false)
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    };

    const ModifiedToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            ' Event Modified Successfully !!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,

        );
    };
    const AddedToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            ' Event Added Successfully !!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,

        );
    };


    const deleteToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            ' Event Deleted Successfully !!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,

        );
    };


    const deleteeventcard = async (item) => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.post(
                `/api/v1/delete-event`, {
                user_id: item.userid,
                event_id: item.eventid
            }
            );
            if (response.data.err == false) {
                getevent();
                deleteToast()
            }
            console.log("ifdeletesuccessfull", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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



    const TimeOpen = () => {
        settimeopen(true);
    };

    const [selectedDate, setSelectedDate] = React.useState(null);
    console.log("lplpl", selectedDate && selectedDate)
    const getNextDate = (date, daysToAdd) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + daysToAdd);
        return currentDate;
    };

    // Get current date
    const currentDate = new Date();

    // Get next two dates
    const nextDate1 = getNextDate(currentDate, 1);
    const nextDate2 = getNextDate(currentDate, 2);

    // Function to format date to "DD MMMM" format
    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to format date to "DD" format
    const formatDateDay = (date) => {
        const options = { day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to format date to "MMMM" format
    const formatDateMonth = (date) => {
        const options = { month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    // const handleDateSelection = (date) => {
    //     setSelectedDate(date.toISOString().split('T')[0]);
    //     console.log('vvvvv', date.toISOString().split('T')[0]);
    //     if (selectedDate && selectedDate) {
    //         getevent(selectedDate);
    //     }
    // };


    const handleDateSelection = async (date) => {
        const selectedDateString = date.toISOString().split('T')[0];
        setSelectedDate(selectedDateString);
        console.log('vvvvv', selectedDateString);
        await getevent(selectedDateString);
    };
    
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
                    setOpen(false);
                    let formattedDate = date.getFullYear() + "-" +
                        String(date.getMonth() + 1).padStart(2, '0') + "-" +
                        String(date.getDate()).padStart(2, '0');
                    setstartdate(formattedDate);
                    console.log('Formatted Date:', formattedDate);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />

            <DatePicker
                modal
                open={editopen}
                date={date}
                title="Select Date"
                mode="date"
                onConfirm={date => {
                    seteditOpen(false);
                    let formattededitedDate = date.getFullYear() + "-" +
                        String(date.getMonth() + 1).padStart(2, '0') + "-" +
                        String(date.getDate()).padStart(2, '0');
                    seteditstartdate(formattededitedDate);
                    console.log('Formattededit Date:', formattededitedDate);
                }}
                onCancel={() => {
                    seteditOpen(false);
                }}
            />


            <DatePicker
                modal
                open={timeopen}
                date={date1}
                title="Select Time"
                mode="time"
                onConfirm={date => {
                    settimeopen(false);
                    setselectTime(date.toLocaleString('en-US', {

                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        // second: '2-digit',
                    }));
                }}
                onCancel={() => {
                    settimeopen(false);
                }}
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

            {/* date */}
            <View style={{ marginHorizontal: 8, justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", gap: 5, }}>
                    <LinearGradient colors={['#000', '#000']} style={{
                        width: "20%",
                        height: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}>
                        <TouchableOpacity onPress={() => handleDateSelection(currentDate)}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "500" }} >E{'\n'}V{'\n'}E{'\n'}N{'\n'}T{'\n'}S</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={['#48a832', '#155724']} style={{ width: "25%", height: 100, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => handleDateSelection(currentDate)}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.5), fontWeight: "600" }}>{formatDateDay(currentDate)}</Text>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>{formatDateMonth(currentDate)}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={['#48a832', '#155724']} style={{ width: "25%", height: 100, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => handleDateSelection(nextDate1)}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.5), fontWeight: "600" }}>{formatDateDay(nextDate1)}</Text>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>{formatDateMonth(nextDate1)}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={['#48a832', '#155724']} style={{ width: "25%", height: 100, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => handleDateSelection(nextDate2)}>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.5), fontWeight: "600" }}>{formatDateDay(nextDate2)}</Text>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>{formatDateMonth(nextDate2)}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>

            {/* button for add event */}
            {
                storeusertype && storeusertype == "team" || storeusertype && storeusertype == "orgs"?
            <View style={{ alignItems: "flex-end", marginRight: 5, marginTop: 10 }}>
                <LinearGradient
                    colors={['#808080', '#D3D3D3']}
                    style={{
                        width: "30%",
                        borderRadius: 6,
                        paddingVertical: 3,
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setmodel(true)}
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            borderRadius: 6,
                            // paddingVertical: 3,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.8), fontWeight: "400" }}>
                            Add Events
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            :""

            }


            {
                load && load == true ?
                    <View
                        style={{
                            // flex: 1,
                            // marginVertical: "60%",
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="small" color="#000" animating={load} />
                        <Text style={{ fontSize: 12, color: "#000", fontWeight: "400", }}>please wait</Text>
                    </View>
                    :
                    <FlatList
                        data={geteventdetails && geteventdetails.length > 0 ? geteventdetails : ''}
                        ListEmptyComponent={EmptyListMessage}
                        // data={geteventdetails && geteventdetails.length > 0 ? geteventdetails : ''}
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
                            console.log("56565656565", item)
                            return (
                                <View style={{}}>
                                    <View style={{ width: "100%", margin: 10, flexDirection: "row", }}>

                                        <View style={{ width: "15%", alignItems: "center", backgroundColor: '#000' }}>
                                            <View style={{}}>
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}>{item.event_time}</Text>
                                            </View>
                                            <View style={{ paddingTop: 8 }}>
                                                <Icon
                                                    style={{ fontSize: responsiveFontSize(2.5), fontWeight: "500" }}
                                                    name="angle-double-up" />
                                            </View>
                                            <View style={{}}>
                                                <Icon
                                                    style={{ fontSize: responsiveFontSize(2.5), fontWeight: "500" }}
                                                    name="angle-double-down" />
                                            </View>
                                            <View style={{ paddingTop: 8 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}>{item.event_time}</Text>
                                            </View>


                                            <TouchableOpacity
                                                onPress={() => openeditmodel({ "userid": item.user_id, "eventid": item._id })}
                                                style={{ marginTop: 9 }}>
                                                <Edit name="edit" style={{
                                                    fontSize: responsiveFontSize(2), color: "#066d0a"

                                                }} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={(() => deleteeventcard({ "userid": item.user_id, "eventid": item._id }))}
                                                style={{ marginTop: 13 }}>
                                                <Delete name="delete" style={{
                                                    fontSize: responsiveFontSize(2.2),
                                                    color: "red"
                                                }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View
                                            style={{
                                                width: "80%",
                                                backgroundColor: '#fff',
                                                borderRadius: 15
                                            }}>
                                            <View style={{ width: "100%", padding: 10 }}>
                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.event_title}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.event_desc}
                                                    </Text>
                                                </View>


                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.event_for}
                                                    </Text>
                                                </View>


                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.coached_by}
                                                    </Text>
                                                </View>


                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.scouted_by
                                                        }
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.location
                                                        }
                                                    </Text>
                                                </View>

                                                <View>
                                                    <Text style={{ color: "#000", fontSize: responsiveFontSize(2) }}>
                                                        {item.map_link
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            )
                        }}
                    />
            }


            {/* add event detaila modal */}
            <Modal
                isVisible={model}
                onBackdropPress={() => setmodel(false)}
                onSwipeComplete={() => setmodel(false)}
                onRequestClose={() => setmodel(false)}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0 }} >

                <View
                    style={{
                        // height: "auto",
                        backgroundColor: "#fff",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderColor: "#e27e45",
                        borderWidth: 0.55
                    }}>




                    <ScrollView>


                        <View style={{ marginTop: 15 }}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Text style={{ color: "grey", fontSize: responsiveFontSize(2.3), fontWeight: "700" }}>
                                    Add Event Details
                                </Text>
                            </View>
                        </View>


                        {/* Enter Event Title */}
                        <View style={{ marginHorizontal: 8 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Event Title
                            </Text>
                            <TextInput
                                placeholder="Enter Event Title"
                                placeholderTextColor={'#6F7074'}
                                onChangeText={value => seteventtitle(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />


                        </View>
                        {
                            addeventloader && addeventloader ?
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        elevation: 10
                                    }}>

                                    <ActivityIndicator
                                        style={{ backgroundColor: "#000", padding: 5, borderRadius: 50, elevation: 10 }}
                                        size="small" color="#fff" animating={addeventloader} />
                                    {/* <Text style={{ fontSize: 12, color: "#000", fontWeight: "400", }}>please wait</Text> */}
                                </View>
                                :
                                ""

                        }

                        {/* Enter event_desc */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Event Description
                            </Text>
                            <TextInput
                                placeholder="Enter Event Description"
                                placeholderTextColor={'#6F7074'}

                                onChangeText={value => seteventdescrp(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>


                        {/* Enter event for */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Event For
                            </Text>
                            <TextInput
                                placeholder="Enter Event For"
                                placeholderTextColor={'#6F7074'}

                                onChangeText={value => seteventfor(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Enter coached_by */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Coached By
                            </Text>
                            <TextInput
                                placeholder="Enter Coached By"
                                placeholderTextColor={'#6F7074'}
                                onChangeText={value => setcoachby(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>


                        {/* Enter scouted_by */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Scouted By
                            </Text>
                            <TextInput
                                placeholder="Enter  Scouted By"
                                placeholderTextColor={'#6F7074'}
                                onChangeText={value => setscoutby(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Enter location */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Location
                            </Text>
                            <TextInput
                                placeholder="Enter Location"
                                placeholderTextColor={'#6F7074'}
                                onChangeText={value => setlocation(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Enter map_link */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Map Link
                            </Text>
                            <TextInput
                                placeholder="Enter Map Link"
                                placeholderTextColor={'#6F7074'}
                                onChangeText={value => setmaplink(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#a1bdc8",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>


                        {/* Enter event_datetime */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Event Date
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    padding: 8,
                                    marginHorizontal: 9,
                                    borderColor: '#000',
                                    marginTop: 10,
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                    //   backgroundColor:"grey"
                                    //   elevation:10
                                }}>
                                <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                    <Calender name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />
                                    {
                                        startdate ?

                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                {startdate && startdate.toString().replaceAll('/', '-')}
                                            </Text> :
                                            <Text style={{ color: '#808387', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                Select Date
                                            </Text>
                                    }
                                </View>

                                <View style={{}}>
                                    <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Enter event_datetime */}
                        <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                            <Text style={{ color: '#000', fontSize: 16, }}>
                                Event Time
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => TimeOpen(true)}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    padding: 8,
                                    marginHorizontal: 9,
                                    borderColor: '#000',
                                    marginTop: 10,
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }}>
                                <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                    <Time name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                    {
                                        selectTime ?

                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                {selectTime && selectTime}
                                            </Text> :
                                            <Text style={{ color: '#808387', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                Select Time
                                            </Text>
                                    }
                                </View>

                                <View style={{}}>
                                    <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                </View>

                            </TouchableOpacity>
                        </View>

                        {/* buttonStyle */}
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                paddingTop: 15,
                                paddingHorizontal: 10,
                                marginTop: 5
                                // position: "relative",
                                // // bottom: 0
                            }}>
                            <View
                                style={{
                                    width: '50%',
                                    backgroundColor: '#000',
                                    borderRadius: 20,
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setmodel(false)}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            textAlign: 'center',
                                            padding: 8,
                                            borderRightColor: '#fff',
                                            borderRightWidth: 1,
                                            fontSize: 15,
                                        }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            <View
                                style={{
                                    width: '50%',
                                    backgroundColor: '#fff',
                                    borderColor: '#000',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginLeft: 3,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <TouchableOpacity
                                    onPress={() => postevent()}
                                    languagesearchFilterFunction
                                    activeOpacity={0.7}
                                    style={{
                                    }}>
                                    <Text
                                        style={{
                                            color: '#000',
                                            textAlign: 'center',
                                            padding: 8,
                                            fontSize: 15,

                                        }}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>



                    {/* <View style={{ marginBottom: 10 }}></View> */}
                </View>

            </Modal >

            {/* add event edit modal */}
            <Modal
                isVisible={updatemodel}
                onBackdropPress={() => setupdatemodel(false)}
                onSwipeComplete={() => setupdatemodel(false)}
                backdropOpacity={0.5}
            // style={{ justifyContent: 'flex-end', margin: 0 }} >
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        paddingVertical: 15,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: 5
                    }}>

                    <View style={{ marginTop: 5 }}>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Text style={{ color: "grey", fontSize: responsiveFontSize(2.3), fontWeight: "700" }}>
                                Edit Event Details
                            </Text>
                        </View>
                    </View>




                    {/* Enter Event Title */}

                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                        <Text style={{ color: '#000', fontSize: 16, }}>
                            Event Title
                        </Text>
                        <TextInput
                            placeholder="Enter Event Title"
                            placeholderTextColor={'#6F7074'}
                            onChangeText={value => seteventtitle(value)}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,
                                //    margin: 10,
                                padding: 0,
                                fontSize: 15,
                                color: '#000',
                                fontWeight: '300',
                            }}
                        />


                    </View>


                    {/* Enter event_desc */}
                    <View style={{ marginTop: 10, paddingHorizontal: 10, width: '100%', }}>
                        <Text style={{ color: '#000', fontSize: 16, }}>
                            Event Description
                        </Text>
                        <TextInput
                            placeholder="Enter Event Description"
                            placeholderTextColor={'#6F7074'}

                            onChangeText={value => seteventdescrp(value)}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,
                                //    margin: 10,
                                padding: 0,
                                fontSize: 15,
                                color: '#000',
                                fontWeight: '300',
                            }}
                        />

                    </View>




                    {/* Enter event_datetime */}
                    <View style={{ marginTop: 10, paddingHorizontal: 10, width: '100%', }}>
                        <Text style={{ color: '#000', fontSize: 16, }}>
                            Event Date
                        </Text>
                    </View>

                    <View style={{ width: '100%', }}>
                        <TouchableOpacity
                            onPress={() => seteditOpen(true)}
                            style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                padding: 8,
                                marginHorizontal: 9,
                                borderColor: '#000',
                                marginTop: 10,
                                justifyContent: "space-between",
                                flexDirection: "row",

                                //   backgroundColor:"grey"
                                //   elevation:10
                            }}>
                            <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                <Calender name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />
                                {
                                    editstartdate && editstartdate ?

                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                            {editstartdate && editstartdate.toString().replaceAll('/', '-')}
                                        </Text> :
                                        <Text style={{ color: '#808387', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                            Select Date
                                        </Text>
                                }
                            </View>

                            <View style={{}}>
                                <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Enter event_datetime */}
                    <View style={{ marginTop: 10, paddingHorizontal: 10, width: '100%', }}>
                        <Text style={{ color: '#000', fontSize: 16, }}>
                            Event Time
                        </Text>
                    </View>

                    <View style={{ width: '100%', }}>
                        <TouchableOpacity
                            onPress={() => TimeOpen(true)}
                            style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                padding: 8,
                                marginHorizontal: 9,
                                borderColor: '#000',
                                marginTop: 10,
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }}>
                            <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                <Time name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                {
                                    selectTime ?

                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                            {selectTime && selectTime}
                                        </Text> :
                                        <Text style={{ color: '#808387', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                            Select Time
                                        </Text>
                                }
                            </View>

                            <View style={{}}>
                                <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                            </View>

                        </TouchableOpacity>
                    </View>

                    {/* buttonStyle */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingTop: 15,
                            paddingHorizontal: 10,
                            marginTop: 5
                            // position: "relative",
                            // // bottom: 0
                        }}>
                        <View
                            style={{
                                width: '50%',
                                backgroundColor: '#000',
                                borderRadius: 20,
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setupdatemodel(false)}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        textAlign: 'center',
                                        padding: 8,
                                        borderRightColor: '#fff',
                                        borderRightWidth: 1,
                                        fontSize: 15,
                                    }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View
                            style={{
                                width: '50%',
                                backgroundColor: '#fff',
                                borderColor: '#000',
                                borderWidth: 1,
                                borderRadius: 20,
                                marginLeft: 3,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <TouchableOpacity
                                onPress={() => posteditevent()}
                                languagesearchFilterFunction
                                activeOpacity={0.7}
                                style={{
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        textAlign: 'center',
                                        padding: 8,
                                        fontSize: 15,

                                    }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>




                    {/* <View style={{ marginBottom: 10 }}></View> */}
                </View>

            </Modal >

            {
                error ? (
                    <Modal animationType="slide" transparent={true} visible={true}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 20,
                            }}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    padding: 20,
                                    // alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    width: '100%',
                                    height: 'auto',
                                }}>
                                <View style={{ alignItems: "center" }}>
                                    <LottieView
                                        style={{ width: 100, height: 100 }}
                                        source={require('../assets/cross.json')} autoPlay loop />
                                </View>


                                <View style={{ paddingBottom: 5, alignItems: "center" }}>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontSize: 16,
                                            paddingLeft: 9,
                                            fontWeight: "600"

                                        }}>
                                        Please fill in all fields
                                    </Text>
                                </View>

                                <View
                                    style={{ width: '100%', paddingTop: 15, alignItems: "center" }}>
                                    <View
                                        style={{
                                            width: '50%',
                                            backgroundColor: '#000',
                                            borderRadius: 20,
                                        }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            // onPress={() => seterror(false)}>
                                            onPress={() => modelclose()}>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                    padding: 8,
                                                    borderRightColor: '#fff',
                                                    borderRightWidth: 1,
                                                    fontSize: 15,
                                                }}>
                                                Ok
                                            </Text>
                                        </TouchableOpacity>
                                    </View>




                                </View>

                            </View>
                        </View>
                    </Modal>
                ) : null
            }

            < TabBar />
        </View >
    )
}

export default Events

const styles = StyleSheet.create({})