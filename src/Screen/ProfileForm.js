import { TextInput, Text, TouchableOpacity, View, Alert, StatusBar, Image, ScrollView, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown'
import AddPen from 'react-native-vector-icons/dist/AntDesign';
import RemovePen from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import DatePicker from 'react-native-date-picker'
import axios from 'axios'
import Calender from 'react-native-vector-icons/dist/AntDesign';
import Droppp from 'react-native-vector-icons/dist/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileForm = ({ route }) => {
    const navigation = useNavigation();
    console.log("routeroute", route)
    const [statusBarStyle, setStatusBarStyle] = useState();
    const [gamedata, setgamedata] = useState("");
    const [position, setposition] = useState("");
    const [reel, setreel] = useState("1");
    const [open, setOpen] = useState(false);
    const [name, setname] = useState("");
    const [date, setDate] = useState(new Date())
    const [load, setload] = useState(false);
    const [age, setage] = useState("");
    const [width, setwidth] = useState("");
    const [height, setheight] = useState("");
    const [selectedgameid, setselectedgameid] = useState("");
    const [positionid, setpositionid] = useState("");
    const [country, setcountry] = useState("");
    const [city, setcity] = useState("");
    const [startdate, setstartdate] = useState("");
    const [sportsassociate, setsportsassociate] = useState("");
    const [photo, setPhotoURI] = useState('');
    const [map, setmap] = useState("");
    const [profiledataget, setprofiledataget] = useState("");
    const [description, setdescription] = useState("");
    const [saveusertype, setsaveusertype] = useState("")
    const [homeground, sethomeground] = useState("")
    const [teamsize, setteamsize] = useState("");
    const [personilitydropdown, setpersonilitydropdown] = useState("");
    const [errormsggame, seterrormsggame] = useState("");
    const [selectorganizationtype, setselectorganizationtype] = useState("");
    const [usertype, setusertype] = useState("");
    const [errormsggametype, seterrormsggametype] = useState("");
    const [errormsggname, seterrormsggname] = useState("");
    const [storagetypesave, setstoragetypesave] = useState("");

    const usertypeData = [
        {
            name: 'Viewer',
            title: 'Viewer'
        },
        {
            name: 'Player',
            title: 'player'
        },
        {
            name: 'Other Personality',
            title: 'other'
        },
        {
            name: 'Team/Club',
            title: 'team'
        },
        {
            name: 'Other Organization',
            title: 'orgs'
        }
    ];

    const handdlechange = () => {
        if (saveusertype && saveusertype) {
            const options = {
                mediaType: 'photo',
            };
            launchImageLibrary(options, response => {
                if
                    // (response.uri)
                    (response.assets) {
                    console.log(response, 'jdkas');
                    setPhotoURI(response.assets[0]
                        // uri
                    );
                }
            });
        } else {
            Alert.alert("Please select the appropriate user type first.");
        }
    };

    const Toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            '  Data Submitted Successfully !!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,

        );
    };

    const sendupdatedata = async () => {
        setload(true)
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const nonEmptyctivelyparticipate = activelyparticipate.filter(activelyp => activelyp.name.trim() !== "");
            const nonEmptyteamplayers = teamplayers.filter(teamplayer => teamplayer.name.trim() !== "");
            const nonEmptyalumniplayers = alumniplayers.filter(alumniplayer => alumniplayer.name.trim() !== "");
            const nonEmptyAwards = awards.filter(award => award.name.trim() !== "");
            const nonEmptymedals = medals.filter(medal => medal.name.trim() !== "");
            const nonEmptyotherstaff = otherstaff.filter(otherstaf => otherstaf.name.trim() !== "");
            const nonEmptyteamcoaches = teamcoaches.filter(teamcoache => teamcoache.name.trim() !== "");
            const nonEmptycertifications = certifications.filter(certification => certification.name.trim() !== "");
            const nonEmptychampionships = championships.filter(championship => championship.championship.trim() !== "");
            const nonEmptymanagements = managements.filter(management => management.name.trim() !== "");
            const isEmptykeyPersonalities = keyPersonalities.length === 0 || keyPersonalities.every(keyPersonalities => keyPersonalities.name === '' && keyPersonalities.designation === '');
            const isEmptyClubs = clubs.length === 0 || clubs.every(club => club.name === '' && club.from === '' && club.to === '');
            const isEmptycoaches = coaches.length === 0 || coaches.every(club => club.name === '' && club.from === '' && club.to === '');
            const formData = new FormData();
            formData.append('user_id', modifiedUser?.user_id);
            formData.append('user_type', saveusertype && saveusertype);
            formData.append('name', name && name);
            formData.append('dob', startdate && startdate.toString().replaceAll('/', '-'));
            formData.append('estd', startdate && startdate.toString().replaceAll('/', '-'));
            formData.append('height"', height && height);
            formData.append('weight', width && width);
            formData.append('country"', country && country);
            formData.append('map_link', map && map);
            formData.append('city', city && city);
            formData.append('age', age && age);
            formData.append('type', sportsassociate && sportsassociate);
            formData.append('org_desc', description && description);
            formData.append('team_size', teamsize && teamsize);
            formData.append('org_type', selectorganizationtype && selectorganizationtype);
            formData.append('home_ground', homeground && homeground);
            formData.append('game_id', selectedgameid && selectedgameid);
            formData.append('position_id"', positionid && positionid);

            if (nonEmptycertifications.length === 0) {
                formData.append('certifications', "");
            } else {
                formData.append('certifications', certifications && JSON.stringify(certifications));
            }

            if (nonEmptychampionships.length === 0) {
                formData.append('competition_won', "");
            } else {
                formData.append('competition_won', championships && JSON.stringify(championships));
            }

            if (nonEmptyAwards.length === 0) {
                formData.append('awards', "");
            } else {
                formData.append('awards', JSON.stringify(nonEmptyAwards));
            }

            if (nonEmptymedals.length === 0) {
                formData.append('medals', "");
            } else {
                formData.append('medals', medals && JSON.stringify(medals));
            }

            if (isEmptyClubs) {
                formData.append('current_clubs', "");
            } else {
                // Otherwise, send the clubs data
                formData.append('current_clubs', JSON.stringify(clubs));
            }

            if (isEmptykeyPersonalities) {
                // formData.append('key_parsonalities', "");
                formData.append('key_parsonalities', "");
                setKeyPersonalities([""]);
            } else {
                // Otherwise, send the clubs data
                formData.append('key_parsonalities', JSON.stringify(keyPersonalities));
            }

            if (isEmptycoaches) {
                formData.append('coaches', "");
            } else {
                formData.append('coaches', coaches && JSON.stringify(coaches));
            }

            if (nonEmptymanagements.length === 0) {
                formData.append('managements', "");
            } else {
                formData.append('managements', managements && JSON.stringify(managements));
            }



            if (nonEmptyteamcoaches.length === 0) {
                formData.append('previous_coaches', "");
            } else {
                formData.append('previous_coaches', teamcoaches && JSON.stringify(teamcoaches));
            }


            if (nonEmptyotherstaff.length === 0) {
                formData.append('other_stuffs', "");
            } else {
                formData.append('other_stuffs', otherstaff && JSON.stringify(otherstaff));
            }

            if (nonEmptyalumniplayers.length === 0) {
                formData.append('alumni_players', "");
            } else {
                formData.append('alumni_players', alumniplayers && JSON.stringify(alumniplayers));
            }



            if (nonEmptyctivelyparticipate.length === 0) {
                formData.append('active_competitions', "");
            } else {
                formData.append('active_competitions', activelyparticipate && JSON.stringify(activelyparticipate));
            }



            if (nonEmptyteamplayers.length === 0) {
                formData.append('players', "");
            } else {
                formData.append('players', teamplayers && JSON.stringify(teamplayers));
            }

            if (photo && photo) {
                formData.append('image', {
                    uri: photo.uri,
                    type: photo.type,
                    name: photo.fileName,
                });
            }
            console.log('formData', formData)
            console.log('photo && photo ', photo && photo.uri)

            const response = await axios.post('/api/v1/update-profile', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setload(false)
            if (response.data.err == false) {
                AsyncStorage.setItem('updated', 'true');
                Toast()
                navigation.navigate("DashboardPage", { data: response.data.data.updated })
            }

            console.log('Response2222:', response);
            // console.log('Response11111122222222:', response.data);
        } catch (error) {
            if (error.response.data.err == true) {
                seterrormsggametype("Type  is not allowed to be empty")
                seterrormsggame(" Select Game  is not allowed to be empty")
                seterrormsggname("Name is not allowed to be empty")
            }
            setload(false)
            console.error('Error:', error);
        }
    };


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
            // console.log("getgame", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const PersonalityType = async () => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.get(
                `/api/v1/get-types-list`
            );
            setpersonilitydropdown(response.data.data.types)
            console.log("setpersonilitydropdown", response.data.data.types)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        PersonalityType()
    }, [])
    const getpostion = async (id) => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            console.log('modifiedUserrrrr', modifiedUser);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            // const id = (req.params.id).trim();
            const response = await axios.post(
                `/api/v1/get-position-list?game_id=${id}`, {

                game_id: id
            }

            );
            setposition(response.data.data)
            console.log("getposition", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const getusertype = async () => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.get(
                `/api/v1/get-types-list`
            );
            setusertype(response.data.data.types)
            // console.log("usertypeeeee", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getusertype()
    }, []);


    const [organizationtype, setorganizationtype] = useState("")

    const getorganizationtype = async () => {
        try {
            let mr = await AsyncStorage.getItem('usertoken');
            const modifiedUser = JSON.parse(mr);

            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${modifiedUser?.token}`;
            const response = await axios.get(
                `/api/v1/get-org-types`
            );
            setorganizationtype(response.data.data)
            // console.log("otganizationtype", response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getorganizationtype()
    }, []);


    useEffect(() => {
        getgame()
    }, [])
    ///////////////////////championships\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    const [championships, setChampionships] = useState([{ id: 1, championship: '' }]);

    const addChampionship = () => {
        const newChampionships = [...championships, { championship: '' }];
        setChampionships(newChampionships);
    };


    const removeChampionship = (index) => {
        const updatedChampionships = championships.filter((_, i) => i !== index);
        setChampionships(updatedChampionships);
    };

    const handleInputChange = (text, index) => {
        const updatedChampionships = [...championships];
        updatedChampionships[index].championship = text;
        setChampionships(updatedChampionships);
    };




    ///////////////////////////new\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    const [activecompitition, setactivecompitition] = useState([{ id: 1, name: '' }]);

    const addactive = () => {
        const newActive = [...activecompitition, { name: '' }];
        setactivecompitition(newActive);
    };


    const removeactive = (index) => {
        const updatedActive = activecompitition.filter((_, i) => i !== index);
        setChampionships(updatedActive);
    };

    const handleInputActive = (text, index) => {
        const updatedActive = [...activecompitition];
        updatedActive[index].name = text;
        setChampionships(updatedActive);
    };


    ///////////////////////new end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    /////////////////////////////// Actively Participate//////////////////////

    const [activelyparticipate, setactivelyparticipate] = useState([{ id: 1, name: '' }]);

    const addactivelyparticipate = () => {
        const newactivelyparticipate = [...activelyparticipate, { name: '' }];
        setactivelyparticipate(newactivelyparticipate);
    };
    const removeactivelyparticipate = (index) => {
        const updatedactivelyparticipate = activelyparticipate.filter((_, i) => i !== index);
        setactivelyparticipate(updatedactivelyparticipate);
    };
    const handleInputChangeactivelyparticipate = (text, index) => {
        const updatedactivelyparticipate = [...activelyparticipate];
        updatedactivelyparticipate[index].name = text;
        setactivelyparticipate(updatedactivelyparticipate);
    };

    ///////////////////////////// Awards/////////////////////////

    const [awards, setawards] = useState([{ id: 1, name: '' }]);

    const addawards = () => {
        const newawards = [...awards, { name: '' }];
        setawards(newawards);
    };

    const removeaward = (index) => {
        const updatedawards = awards.filter((_, i) => i !== index);
        setawards(updatedawards);
    };

    const handleInputChangeawards = (text, index) => {
        const updatedawards = [...awards];
        updatedawards[index].name = text;
        setawards(updatedawards);
    };

    // console.log('awardsawardsawards', awards && awards)

    ////////////////// Certifications for the role//////////////////////////

    const [certifications, setcertifications] = useState([{ id: 1, name: '' }]);
    const addcertifications = () => {
        const newcertifications = [...certifications, { name: '' }];
        setcertifications(newcertifications);
    };
    const removecertifications = (index) => {
        const updatedcertifications = certifications.filter((_, i) => i !== index);
        setcertifications(updatedcertifications);
    };
    const handleInputChangecertifications = (text, index) => {
        const updatedcertifications = [...certifications];
        updatedcertifications[index].name = text;
        setcertifications(updatedcertifications);
    };
    // console.log("certificationscertifications", certifications && certifications)
    // //////////////////////// team form Managements////////////////////
    const [managements, setmanagements] = useState([{ id: 1, name: '' }]);
    const addmanagements = () => {
        const newmanagements = [...managements, { name: '' }];
        setmanagements(newmanagements);
    };
    const removemanagements = (index) => {
        const updatedmanagements = managements.filter((_, i) => i !== index);
        setmanagements(updatedmanagements);
    };
    const handleInputChangemanagements = (text, index) => {
        const updatedmanagements = [...managements];
        updatedmanagements[index].name = text;
        setmanagements(updatedmanagements);
    };

    // console.log("managementsmanagements", managements && managements)

    //////////////////////// teamcoaches ////////////////////

    const [teamcoaches, setteamcoaches] = useState([{ id: 1, name: '' }]);

    const addteamcoaches = () => {
        const newteamcoaches = [...teamcoaches, { name: '' }];
        setteamcoaches(newteamcoaches);
    };

    const removeteamcoaches = (index) => {
        const updatedteamcoaches = teamcoaches.filter((_, i) => i !== index);
        setteamcoaches(updatedteamcoaches);
    };

    const handleInputChangeteamcoaches = (text, index) => {
        const updatedteamcoaches = [...teamcoaches];
        updatedteamcoaches[index].name = text;
        setteamcoaches(updatedteamcoaches);
    };
    //////////////// otherstaff ////////////////////
    const [otherstaff, setotherstaff] = useState([{ id: 1, name: '' }]);
    const addotherstaff = () => {
        const newteamotherstaff = [...otherstaff, { name: '' }];
        setotherstaff(newteamotherstaff);
    };
    const removeotherstaff = (index) => {
        const updatedteamotherstaff = otherstaff.filter((_, i) => i !== index);
        setotherstaff(updatedteamotherstaff);
    };

    const handleInputChangeotherstaff = (text, index) => {
        const updatedotherstaff = [...otherstaff];
        updatedotherstaff[index].name = text;
        setotherstaff(updatedotherstaff);
    };

    /////////////////////// madels///////////////

    const [medals, setmedals] = useState([{ id: 1, name: '' }]);
    const addmedals = () => {
        const newmedals = [...medals, { name: '' }];
        setmedals(newmedals);
    };
    const removeMedals = (index) => {
        const updatedmedals = medals.filter((_, i) => i !== index);
        setmedals(updatedmedals);
    };
    const handleInputChangemedals = (text, index) => {
        const updatedmedals = [...medals];
        updatedmedals[index].name = text;
        setmedals(updatedmedals);
    };


    // ////////////////////Alumni Players//////////////////

    const [alumniplayers, setalumniplayers] = useState([{ id: 1, name: '' }]);

    const addalumniplayers = () => {
        const newalumniplayers = [...alumniplayers, { name: '' }];
        setalumniplayers(newalumniplayers);
    };

    const removealumniplayers = (index) => {
        const updatedalumniplayers = alumniplayers.filter((_, i) => i !== index);
        setalumniplayers(updatedalumniplayers);
    };

    const handleInputChangealumniplayers = (text, index) => {
        const updatedalumniplayers = [...alumniplayers];
        updatedalumniplayers[index].name = text;
        setalumniplayers(updatedalumniplayers);
    };

    // ////////////////////teamplayers Players//////////////////

    const [teamplayers, setTeamplayers] = useState([{ id: 1, name: '' }]);

    const addteamplayers = () => {
        const newteammplayers = [...teamplayers, { name: '' }];
        setTeamplayers(newteammplayers);
    };

    const removeteamplayers = (index) => {
        const updatedalumniplayers = alumniplayers.filter((_, i) => i !== index);
        setTeamplayers(updatedalumniplayers);
    };

    const handleInputChangeteamplayers = (text, index) => {
        const updateteamplayersiplayers = [...teamplayers];
        updateteamplayersiplayers[index].name = text;
        setTeamplayers(updateteamplayersiplayers);
    };
    // console.log("teamplayersteamplayers", teamplayers && teamplayers)



    ///////////////////// Clubs///////////////////////////////
    const [clubs, setClubs] = useState([{ id: 1, name: '', from: '', to: '' }]);

    const addClubs = () => {
        const newClubs = [...clubs, { id: clubs.length + 1, name: '', from: '', to: '' }];
        setClubs(newClubs);
    };

    const removeClubs = (index) => {
        const updatedClubs = clubs.filter((_, i) => i !== index);
        setClubs(updatedClubs);
    };

    const handleClubsInputChange = (text, field, index) => {
        const updatedClubs = [...clubs];
        updatedClubs[index][field] = text;
        setClubs(updatedClubs);
    };


    /////////////////////coaches//////////////////
    const [coaches, setcoaches] = useState([{ id: 1, name: '', from: '', to: '' }]);
    const addcoaches = () => {
        const newcoaches = [...coaches, { id: coaches.length + 1, name: '', from: '', to: '' }];
        setcoaches(newcoaches);
    };
    const removecoaches = (index) => {
        const updatedcoaches = coaches.filter((_, i) => i !== index);
        setcoaches(updatedcoaches);
    };

    const handlecoachesInputChange = (text, field, index) => {
        const updatedcoaches = [...coaches];
        updatedcoaches[index][field] = text;
        setcoaches(updatedcoaches);
    };


    const [keyPersonalities, setKeyPersonalities] = useState([{ id: 1, name: '', designation: '' }]);
    const addKeyPersonalities = () => {
        const newPersonalities = [...keyPersonalities, { id: keyPersonalities.length + 1, name: '', designation: '' }];
        setKeyPersonalities(newPersonalities);
    };

    const removeKeyPersonalities = (index) => {
        const updatedKeyPersonalities = keyPersonalities.filter((_, i) => i !== index);
        setKeyPersonalities(updatedKeyPersonalities);
    };

    const handleKeyPersonalitiesInputChange = (text, field, index) => {
        const updatedkeyPersonalities = [...keyPersonalities];
        updatedkeyPersonalities[index][field] = text.trim() !== "" ? text : null; // Replace empty string with null
        setKeyPersonalities(updatedkeyPersonalities);

    };

    // console.log("keyPersonalitieskeyPersonalities", keyPersonalities && keyPersonalities)

    useEffect(() => {
        // Retrieve the value from AsyncStorage
        const fetchAsyncStorageValue = async () => {
            try {
                const mr = await AsyncStorage.getItem('usertoken');
                console.log('mr:', mr);
                if (mr !== null) {
                    const modifiedUser = JSON.parse(mr);
                    console.log('modifiedUser:', modifiedUser);

                    if (modifiedUser?.user_type) {
                        setstoragetypesave(modifiedUser.user_type);
                        // setstoragee(modifiedUser.user_type);
                        console.log('User type:', modifiedUser.user_type);
                    } else {
                        console.log('No user type found in modifiedUser');
                    }
                } else {
                    console.log('No user data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving AsyncStorage value:', error);
            }
        };

        fetchAsyncStorageValue();
    }, []);

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

            <View style={{ marginHorizontal: 10 }}>
                <View style={{ width: "100%", flexDirection: "row", marginTop: 5 }}>
                    <View style={{ width: "30%" }}>
                        {
                            photo && photo.uri ?
                                <Image
                                    source={{ uri: photo && photo.uri }}
                                    resizeMode='contain'
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 65,
                                    }}
                                /> :
                                <Image
                                    source={require("../assets/imageemplty.jpg")}
                                    style={{ height: 100, width: "100%", borderRadius: 20 }}
                                />
                        }
                    </View>
                    <View style={{ width: "70%", alignItems: "center", justifyContent: "center" }}>
                        <View style={{}}>
                            <Text style={{ color: "#fff" }}>
                                Upload Your Profile Picture
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handdlechange()}
                            style={{ backgroundColor: "green", paddingVertical: 3, paddingHorizontal: 15, marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: "#fff" }}>
                                Upload
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",


                }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSizeL: responsiveFontSize(2.5), fontWeight: "700" }}>
                            User Type :
                        </Text>
                    </View>

                    <View style={{ width: '75%' }}>
                        <SelectDropdown
                            data={usertypeData.map(item => item.name)}
                            onSelect={(selectedItem, index) => {
                                const selectedItemObject = usertypeData.find(item => item.name === selectedItem);
                                if (selectedItemObject) {
                                    setsaveusertype(selectedItemObject.title);
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown4BtnTxtStyle}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                        />
                    </View>
                </View>
            </View>


            {saveusertype && saveusertype === "player" && (
                <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: 500 }}>
                    <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>
                        {/* Name */}
                        <View style={{ width: "100%" }}>
                            <Text style={{ color: '#000', fontSize: 16 }}>Name</Text>
                            <TextInput
                                placeholder="Enter Name"
                                placeholderTextColor={'#000'}
                                value={name}
                                onChangeText={value => setname(value)}
                                style={styles.input}
                            />

                            {
                                errormsggname && errormsggname ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggname && errormsggname}</Text>
                                    :
                                    ""
                            }

                        </View>

                        {/* Select Game*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Select Sport
                            </Text>
                            <SelectDropdown
                                data={gamedata && gamedata.map((item) => {
                                    return item.name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = gamedata && gamedata.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        getpostion(selectedGameId)
                                        setselectedgameid(selectedGameId)
                                        console.log(selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                            {
                                errormsggame && errormsggame ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggame && errormsggame}</Text>
                                    :
                                    ""
                            }

                        </View>

                        {/* Select Position*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Type
                            </Text>
                            <SelectDropdown
                                data={position && position.map((item) => {
                                    return item.name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = position && position.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        setpositionid(selectedGameId)
                                        console.log("position issssssssssssss", selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                            {
                                errormsggametype && errormsggametype ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggametype && errormsggametype}</Text>
                                    :
                                    ""
                            }

                        </View>

                        {/* Select City*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter Your City"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcity(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>



                        {/* Select Country*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter Your Country"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcountry(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>



                        {/* Select Awards*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Awards
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addawards}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {awards.map((awards, index) => (
                                <View key={awards.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                                    <TextInput
                                        placeholder="Enter Your Awards"
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
                                        value={awards.value}
                                        onChangeText={(text) => handleInputChangeawards(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeaward(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select medals*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Madels
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addmedals}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {medals.map((medals, index) => (
                                <View key={medals.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                                    <TextInput
                                        placeholder="Enter Your Madels"
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
                                        value={medals.value}
                                        onChangeText={(text) => handleInputChangemedals(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeMedals(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select ChampionShip*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        ChampionShip/Compititions Won
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addChampionship}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {championships.map((championship, index) => (
                                <View key={championship.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

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
                                        onChangeText={(text) => handleInputChange(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeChampionship(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>


                        {/* select clubs*/}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 9 }}>
                            <View style={{}}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                    Clubs Associated with
                                </Text>
                            </View>

                            <TouchableOpacity onPress={addClubs} style={{}}>
                                <AddPen style={{ color: "#fff", fontSize: responsiveFontSize(2) }} name="pluscircle" />
                            </TouchableOpacity>
                        </View>

                        {clubs && clubs.map((club, index) => (
                            <View key={club.id} style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                    Club/Team #{index + 1}
                                </Text>

                                <TextInput
                                    placeholder="Enter the name of Clubs/Teams Played for"
                                    placeholderTextColor={'#000'}
                                    style={{
                                        borderBottomWidth: 0.29,
                                        borderBottomColor: '#fff',
                                        marginTop: 5,
                                        padding: 0,
                                        fontSize: responsiveFontSize(1.8),
                                        color: '#000',
                                        fontWeight: '300',
                                    }}
                                    value={clubs.name}
                                    onChangeText={(text) => handleClubsInputChange(text, 'name', index)}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Joining Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={clubs.from}
                                            onChangeText={(text) => handleClubsInputChange(text, 'from', index)}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Exit Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={clubs.to}
                                            onChangeText={(text) => handleClubsInputChange(text, 'to', index)}
                                        />
                                    </View>
                                </View>

                                {index > 0 && (
                                    <TouchableOpacity
                                        style={{ width: "100%", marginTop: 5, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                        onPress={() => removeClubs(index)}>
                                        <RemovePen
                                            style={{
                                                color: "#fff",
                                                //   backgroundColor: "#000",
                                                fontSize: responsiveFontSize(1.5),
                                                paddingHorizontal: 3,
                                                paddingVertical: 6,
                                                borderRadius: 50,
                                                textAlign: "center",
                                            }}
                                            name="minuscircle"
                                        />
                                        <Text style={{
                                            color: "#fff",
                                            //  backgroundColor: "#000",
                                            fontSize: responsiveFontSize(1.5),
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}


                        {/* select Coaches played under*/}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 9 }}>
                            <View style={{}}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                    Coaches played under
                                </Text>
                            </View>

                            <TouchableOpacity onPress={addcoaches} style={{}}>
                                <AddPen style={{ color: "#fff", fontSize: responsiveFontSize(2) }} name="pluscircle" />
                            </TouchableOpacity>
                        </View>

                        {coaches && coaches.map((coaches, index) => (
                            <View key={coaches.id} style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                    Coaches #{index + 1}
                                </Text>

                                <TextInput
                                    placeholder="Enter the name of Clubs/Teams Played for"
                                    placeholderTextColor={'#000'}
                                    style={{
                                        borderBottomWidth: 0.29,
                                        borderBottomColor: '#fff',
                                        marginTop: 5,
                                        padding: 0,
                                        fontSize: responsiveFontSize(1.8),
                                        color: '#000',
                                        fontWeight: '300',
                                    }}
                                    value={coaches.name}
                                    onChangeText={(text) => handlecoachesInputChange(text, 'name', index)}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Joining Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={coaches.from}
                                            onChangeText={(text) => handlecoachesInputChange(text, 'from', index)}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Exit Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={coaches.to}
                                            onChangeText={(text) => handlecoachesInputChange(text, 'to', index)}
                                        />
                                    </View>
                                </View>

                                {index > 0 && (
                                    //   <TouchableOpacity
                                    //       style={{ width: "100%" }}
                                    //       onPress={() => removecoaches(index)}>
                                    //       <RemovePen
                                    //           style={{
                                    //               color: "#fff",
                                    //               backgroundColor: "#000",
                                    //               fontSize: responsiveFontSize(1.5),
                                    //               paddingHorizontal: 3,
                                    //               paddingVertical: 3,
                                    //               borderRadius: 50,
                                    //               textAlign: "center",
                                    //           }}
                                    //           name="minus"
                                    //       />
                                    //   </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ width: "100%", marginTop: 5, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                        onPress={() => removecoaches(index)}>
                                        <RemovePen
                                            style={{
                                                color: "#fff",
                                                //   backgroundColor: "#000",
                                                fontSize: responsiveFontSize(1.5),
                                                paddingHorizontal: 3,
                                                paddingVertical: 6,
                                                borderRadius: 50,
                                                textAlign: "center",
                                            }}
                                            name="minuscircle"
                                        />
                                        <Text style={{
                                            color: "#fff",
                                            //  backgroundColor: "#000",
                                            fontSize: responsiveFontSize(1.5),
                                        }}>Cancel</Text>
                                    </TouchableOpacity>

                                )}


                            </View>
                        ))}


                        {/* Select age*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Age
                            </Text>
                            <TextInput
                                placeholder="Enter Your age"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setage(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Heidth*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Heidth
                            </Text>
                            <TextInput
                                placeholder="Enter Your Heidth"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setheight(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* width*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Weidth
                            </Text>
                            <TextInput
                                placeholder="Enter Your Weidth"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setwidth(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={() => sendupdatedata()}
                            style={{ marginTop: 15, width: "100%", backgroundColor: "#000", marginBottom: 2, borderRadius: 10 }}>
                            {
                                load && load ?
                                    <ActivityIndicator
                                        style={{ paddingVertical: 10 }}
                                        size="small" color="#fff" />
                                    :

                                    <Text style={{ color: "#fff", textAlign: "center", paddingVertical: 10, borderRadius: 10 }}>Save</Text>
                            }
                        </TouchableOpacity>

                    </View>


                </ScrollView>
            )}

            {saveusertype && saveusertype === "other" && (
                <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: "100%", }}>
                    <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>
                        {/* name */}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>Name</Text>
                            <TextInput
                                placeholder="Enter Name"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setname(value)}
                                style={styles.input}
                            />
                            {
                                errormsggname && errormsggname ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggname && errormsggname}</Text>
                                    :
                                    ""
                            }
                        </View>
                        {/* Select Game*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Sport Associated with
                            </Text>
                            <SelectDropdown
                                data={gamedata && gamedata.map((item) => {
                                    return item.name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = gamedata && gamedata.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        getpostion(selectedGameId)
                                        setselectedgameid(selectedGameId)
                                        console.log(selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                            {
                                errormsggame && errormsggame ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggame && errormsggame}</Text>
                                    :
                                    ""
                            }

                        </View>

                        {/*Type*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Type
                            </Text>
                            <SelectDropdown
                                data={personilitydropdown && personilitydropdown.map((item) => {
                                    return item.personality_type_name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = personilitydropdown && personilitydropdown.find(item => item.personality_type_name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        setsportsassociate(selectedGameId)
                                        // console.log("pellllrsonilitydropdown", selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                            {
                                errormsggametype && errormsggametype ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggametype && errormsggametype}</Text>
                                    :
                                    ""
                            }

                        </View>
                        {/* Select City*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter Your City"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcity(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Select Country*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter Your Country"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcountry(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Certifications for the role*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Certifications for the role
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addcertifications}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {certifications.map((certificationsss, index) => (
                                <View key={certificationsss.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <TextInput
                                        placeholder="Enter Your Certifications for the role"
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
                                        value={certifications.value}
                                        onChangeText={(text) => handleInputChangecertifications(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removecertifications(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>


                        {/* select clubs*/}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 9 }}>
                            <View style={{}}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                    Clubs Associated with
                                </Text>
                            </View>

                            <TouchableOpacity onPress={addClubs} style={{}}>
                                <AddPen style={{ color: "#fff", fontSize: responsiveFontSize(2) }} name="pluscircle" />
                            </TouchableOpacity>
                        </View>

                        {clubs && clubs.map((club, index) => (
                            <View key={club.id} style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                    Club/Team #{index + 1}
                                </Text>

                                <TextInput
                                    placeholder="Enter the name of Clubs/Teams Played for"
                                    placeholderTextColor={'#000'}
                                    style={{
                                        borderBottomWidth: 0.29,
                                        borderBottomColor: '#fff',
                                        marginTop: 5,
                                        padding: 0,
                                        fontSize: responsiveFontSize(1.8),
                                        color: '#000',
                                        fontWeight: '300',
                                    }}
                                    value={clubs.name}
                                    onChangeText={(text) => handleClubsInputChange(text, 'name', index)}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Joining Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={clubs.from}
                                            onChangeText={(text) => handleClubsInputChange(text, 'from', index)}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                                            Exit Date
                                        </Text>
                                        {/* You can use a DatePicker or TextInput for date input */}
                                        <TextInput
                                            placeholder="MM/YYYY"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={clubs.to}
                                            onChangeText={(text) => handleClubsInputChange(text, 'to', index)}
                                        />
                                    </View>
                                </View>

                                {index > 0 && (
                                    <TouchableOpacity
                                        style={{ width: "100%", marginTop: 5, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                        onPress={() => removeClubs(index)}>
                                        <RemovePen
                                            style={{
                                                color: "#fff",
                                                //   backgroundColor: "#000",
                                                fontSize: responsiveFontSize(1.5),
                                                paddingHorizontal: 3,
                                                paddingVertical: 6,
                                                borderRadius: 50,
                                                textAlign: "center",
                                            }}
                                            name="minuscircle"
                                        />
                                        <Text style={{
                                            color: "#fff",
                                            //  backgroundColor: "#000",
                                            fontSize: responsiveFontSize(1.5),
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}


                        {/* Select Awards*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Awards
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addawards}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {awards.map((awards, index) => (
                                <View key={awards.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                                    <TextInput
                                        placeholder="Enter Your Awards"
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
                                        value={awards.value}
                                        onChangeText={(text) => handleInputChangeawards(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeaward(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select medals*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Madels
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addmedals}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {medals.map((medals, index) => (
                                <View key={medals.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                                    <TextInput
                                        placeholder="Enter Your Madels"
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
                                        value={medals.value}
                                        onChangeText={(text) => handleInputChangemedals(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeMedals(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select ChampionShip*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        ChampionShip/Compititions Won
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addChampionship}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {championships.map((championship, index) => (
                                <View key={championship.id} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

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
                                        onChangeText={(text) => handleInputChange(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeChampionship(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select age*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Age
                            </Text>
                            <TextInput
                                placeholder="Enter Your age"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setage(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>
                        {/* width*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Weidth
                            </Text>
                            <TextInput
                                placeholder="Enter Your Weidth"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setwidth(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>
                        {/* Heidth*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Heidth
                            </Text>
                            <TextInput
                                placeholder="Enter Your Heidth"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setheight(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={() => sendupdatedata()}
                            style={{ paddingTop: 5, width: "100%", backgroundColor: "#000", marginBottom: 2, borderRadius: 10, marginTop: 5 }}>
                            {
                                load && load ?
                                    <ActivityIndicator
                                        style={{ paddingVertical: 10 }}
                                        size="small" color="#fff" /> :

                                    <Text style={{ color: "#fff", textAlign: "center", paddingVertical: 10, borderRadius: 10 }}>Save</Text>
                            }
                        </TouchableOpacity>

                    </View>


                </ScrollView>
            )}


            {saveusertype && saveusertype === "team" && (
                <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: "100%", }}>
                    <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>

                        {/* name */}
                        <View style={{ width: "100%" }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>Name</Text>
                            <TextInput
                                placeholder="Enter Name"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setname(value)}
                                style={styles.input}
                            />
                        </View>

                        {/* Select City*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter Your City"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcity(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Select Country*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter Your Country"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcountry(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
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
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Established date
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
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    // width:"100%"
                                }}>
                                <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                    <Calender name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(2) }} />
                                    {
                                        startdate ?

                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                {startdate && startdate.toString().replaceAll('/', '-')}
                                            </Text> :
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                Select Date
                                            </Text>
                                    }
                                </View>

                                <View style={{}}>
                                    <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Sports Associated with*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Sports Associated with
                            </Text>
                            <SelectDropdown
                                data={gamedata && gamedata.map((item) => {
                                    return item.name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = gamedata && gamedata.find(item => item.name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;
                                        getpostion(selectedGameId)
                                        setselectedgameid(selectedGameId)
                                        console.log(selectedItem, selectedGameId);

                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                        </View>


                        {/* Home Ground*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Home Ground
                            </Text>
                            <TextInput
                                placeholder="Enter Home Ground"
                                placeholderTextColor={'#000'}
                                onChangeText={value => sethomeground(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
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
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Google Map link to Club
                            </Text>
                            <TextInput
                                placeholder="Google Map link to Club"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setmap(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
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
                        <View style={{ width: "100%", paddingTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Clubs official registration details:
                                    </Text>
                                </View>
                            </View>
                        </View>


                        {/* Management*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Managements
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addmanagements}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {managements.map((managementsss, index) => (
                                <View key={managementsss.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        onChangeText={(text) => handleInputChangemanagements(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removemanagements(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Coaches*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Coaches
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addteamcoaches}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {teamcoaches.map((teamcoachesss, index) => (
                                <View key={teamcoachesss.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        onChangeText={(text) => handleInputChangeteamcoaches(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeteamcoaches(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Other staff*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Other staff
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addotherstaff}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {otherstaff.map((otherstaffss, index) => (
                                <View key={otherstaffss.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        onChangeText={(text) => handleInputChangeotherstaff(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeotherstaff(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Select Team Size*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Team Size
                            </Text>
                            <TextInput
                                placeholder="Enter Your Team Size"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setteamsize(value)}
                                keyboardType="numeric"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>


                        {/* Team Players names*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Team Players names:
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addteamplayers}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {teamplayers.map((teamplayers, index) => (
                                <View key={teamplayers.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        value={teamplayers.value}
                                        onChangeText={(text) => handleInputChangeteamplayers(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeteamplayers(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Championships */}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Championships/Medals/Trophys won
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addChampionship}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {championships.map((championship, index) => (
                                <View key={championship.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        onChangeText={(text) => handleInputChange(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeChampionship(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/*Alumni Players*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        alumni Players
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addalumniplayers}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {alumniplayers.map((alumniplayerss, index) => (
                                <View key={alumniplayerss.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

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
                                        onChangeText={(text) => handleInputChangealumniplayers(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removealumniplayers(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>

                        {/* Active */}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{}}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                        Actively Participating Competitions
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={addactivelyparticipate}
                                    style={{}}>
                                    <AddPen
                                        style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                                        name="pluscircle" />
                                </TouchableOpacity>
                            </View>

                            {activelyparticipate.map((actively, index) => (
                                <View key={actively.id} style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <TextInput
                                        placeholder="Enter Your name"
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
                                        onChangeText={(text) => handleInputChangeactivelyparticipate(text, index)}
                                    />
                                    {index > 0 && (
                                        <TouchableOpacity onPress={() => removeactivelyparticipate(index)}>
                                            <RemovePen
                                                style={{
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                    fontSize: responsiveFontSize(1.5),
                                                    paddingHorizontal: 3,
                                                    paddingVertical: 3,
                                                    borderRadius: 50
                                                }}
                                                name="minus"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                            ))}

                        </View>


                        <TouchableOpacity
                            onPress={() => sendupdatedata()}
                            style={{ paddingTop: 5, width: "100%", backgroundColor: "#000", marginBottom: 2, borderRadius: 10, marginTop: 5 }}>
                            {
                                load && load ?
                                    <ActivityIndicator
                                        style={{ paddingVertical: 10 }}
                                        size="small" color="#fff" /> :

                                    <Text style={{ color: "#fff", textAlign: "center", paddingVertical: 10, borderRadius: 10 }}>Save</Text>
                            }
                        </TouchableOpacity>




                    </View>
                </ScrollView>
            )}


            {saveusertype && saveusertype == "orgs" && (

                <ScrollView style={{ backgroundColor: "grey", marginTop: 5, height: "100%", }}>
                    <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, height: '100%', }}>
                        {/* name */}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>Name</Text>
                            <TextInput
                                placeholder="Enter Name"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setname(value)}
                                style={styles.input}
                            />
                            {
                                errormsggname && errormsggname ?
                                    <Text style={{ color: "#f83228", fontSize: 12, paddingTop: 5 }}>{errormsggname && errormsggname}</Text>
                                    :
                                    ""
                            }
                        </View>

                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600", paddingBottom: 5 }}>
                                Organization type
                            </Text>
                            <SelectDropdown
                                data={organizationtype && organizationtype.map((item) => {
                                    return item.org_type_name
                                })}
                                onSelect={(selectedItem, index) => {
                                    const selectedGame = organizationtype && organizationtype.find(item => item.org_type_name === selectedItem);
                                    if (selectedGame) {
                                        const selectedGameId = selectedGame._id;

                                        setselectorganizationtype(selectedGameId)
                                        // console.log("selectedItem, selectedGameId",selectedItem, selectedGameId);

                                    }


                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />

                        </View>

                        {/* Established date*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Established date
                            </Text>

                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: '#000',
                                    marginTop: 12,
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                }}>
                                <View style={{ flexDirection: "row", fontSize: responsiveFontSize(1.85), alignItems: "center" }}>
                                    <Calender name="calendar" style={{ color: "#000", fontSize: responsiveFontSize(2) }} />
                                    {
                                        startdate ?

                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                {startdate && startdate.toString().replaceAll('/', '-')}
                                            </Text> :
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.85), paddingLeft: 5 }}>
                                                Select Date
                                            </Text>
                                    }
                                </View>

                                <View style={{}}>
                                    <Droppp name="caretdown" style={{ color: "#000", fontSize: responsiveFontSize(1.85) }} />

                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Select City*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter Your City"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcity(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />
                        </View>

                        {/* Select Country*/}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter Your Country"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setcountry(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* Key Personalities */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 9 }}>
                            <View style={{}}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                    Key Personalities
                                </Text>
                            </View>

                            <TouchableOpacity onPress={addKeyPersonalities} style={{}}>
                                <AddPen style={{ color: "#fff", fontSize: responsiveFontSize(2) }} name="pluscircle" />
                            </TouchableOpacity>
                        </View>

                        {keyPersonalities && keyPersonalities.map((keyPersonalities, index) => (
                            <View key={keyPersonalities.id} style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "500", marginBottom: 5 }}>
                                    Name
                                </Text>

                                <TextInput
                                    placeholder="Enter name "
                                    placeholderTextColor={'#000'}
                                    style={{
                                        borderBottomWidth: 0.29,
                                        borderBottomColor: '#fff',
                                        marginTop: 5,
                                        padding: 0,
                                        fontSize: responsiveFontSize(1.8),
                                        color: '#000',
                                        fontWeight: '300',
                                    }}
                                    value={keyPersonalities.name}
                                    onChangeText={(text) => handleKeyPersonalitiesInputChange(text, 'name', index)}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), fontWeight: "500", marginBottom: 5 }}>
                                            Designation
                                        </Text>

                                        <TextInput
                                            placeholder="Enter designation"
                                            placeholderTextColor={'#000'}
                                            style={{
                                                borderBottomWidth: 0.29,
                                                borderBottomColor: '#fff',
                                                padding: 0,
                                                color: '#000', fontSize: responsiveFontSize(2), fontWeight: "500",
                                                color: '#000',
                                                fontWeight: '300',
                                            }}
                                            value={keyPersonalities.designation}
                                            onChangeText={(text) => handleKeyPersonalitiesInputChange(text, 'designation', index)}
                                        />
                                    </View>

                                </View>

                                {index > 0 && (
                                    <TouchableOpacity
                                        style={{ width: "100%", marginTop: 5, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                        onPress={() => removeKeyPersonalities(index)}>
                                        <RemovePen
                                            style={{
                                                color: "#fff",
                                                //   backgroundColor: "#000",
                                                fontSize: responsiveFontSize(1.5),
                                                paddingHorizontal: 3,
                                                paddingVertical: 6,
                                                borderRadius: 50,
                                                textAlign: "center",
                                            }}
                                            name="minuscircle"
                                        />
                                        <Text style={{
                                            color: "#fff",
                                            //  backgroundColor: "#000",
                                            fontSize: responsiveFontSize(1.5),
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        {/* Description */}
                        <View style={{ width: "100%", paddingTop: 9 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
                                Description
                            </Text>
                            <TextInput
                                placeholder="Enter Description"
                                placeholderTextColor={'#000'}
                                onChangeText={value => setdescription(value)}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 0.29,
                                    borderBottomColor: "#fff",
                                    marginTop: 5,
                                    //    margin: 10,
                                    padding: 0,
                                    fontSize: 15,
                                    color: '#000',
                                    fontWeight: '300',
                                }}
                            />

                        </View>

                        {/* submit button */}
                        <TouchableOpacity
                            onPress={() => sendupdatedata()}
                            style={{ marginTop: 5, width: "100%", backgroundColor: "#000", marginBottom: 25, borderRadius: 10 }}>
                            {
                                load && load ?
                                    <ActivityIndicator
                                        style={{ paddingVertical: 10 }}
                                        size="small" color="#fff" /> :
                                    <Text style={{ color: "#fff", textAlign: "center", paddingVertical: 10, borderRadius: 10 }}>Save</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

        </View>
    )
}

export default ProfileForm
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
        width: "100%",
        height: 35,
        borderRadius: 10,
        marginTop: 5

    },
    dropdown4BtnTxtStyle: {
        fontSize: responsiveFontSize(1.8),
        textAlign: 'left'
    }
});

