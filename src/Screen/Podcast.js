import { Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Notificationss from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import axios from 'axios'
import { useSelector } from 'react-redux'
import TabBar from '../common/TabBar';
const Podcast = () => {
  const [statusBarStyle, setStatusBarStyle] = useState();
  const navigation = useNavigation();
  const [data, setdata] = useState("");
  const [load, setload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loooo, setloooo] = useState("");

  const getPodcast = async () => {
    try {
      setload(true)
      let mr = await AsyncStorage.getItem('usertoken');
      const modifiedUser = JSON.parse(mr);
      console.log('modifiedUserrrrr', modifiedUser);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${modifiedUser?.token}`;
      const response = await axios.get(
        '/api/v1/get-podcast',
        { params: { user_id: modifiedUser?.user_id } }
      );
      setloooo(modifiedUser)
      if (response.data.err == false) {
        
        setload(false)
        setdata(response.data.data);

      }
      console.log("podcastvideo", response)
    } catch (error) {
      setload(false)
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getPodcast()
  }, [])

  const onRefresh = () => {
    getPodcast()
  }



  const numColumns = 3;
  const itemWidth = width * 0.3;


  const renderItem = ({ item, index }) => {
    console.log("32232323",item)
    const numItems = data.length;
    // let dynamicItemWidth = itemWidth;

    // Calculate dynamic item width if there are fewer items than columns
    if (numItems < numColumns) {
      dynamicItemWidth = width / numItems;
    }
    // Calculate dynamic item width based on the total width and number of columns
    const dynamicItemWidth = (width - (numColumns - 1) * 3) / numColumns;

    if (index === 0) {
      // Render the row with "MATCHES" for the first item
      return (
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: 10,
          width: dynamicItemWidth,
          alignItems: "center"
        }}>
          {item.split('').map((char, idx) => (
            <Text key={idx} style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{char}</Text>
          ))}
        </View>
      );
    } else {
      // Render videos for other items
      return (
        <View style={{
          flex: 1,
          backgroundColor: 'grey',
          margin: 3,
          borderRadius: 10,
          overflow: 'hidden',
          width: dynamicItemWidth,
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PodcastViewPage", { data: item?.url })}
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 4,
              paddingBottom: 2,
            }}
          >
            <Video
              source={{ uri: item?.url }}
              style={{
                flex: 3,
                width: '100%',
                height: 200,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              resizeMode="stretch"
              paused={true}
            />
          </TouchableOpacity>
        </View>
      );
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
              data={data && data.length > 0 ? data : ''}
              renderItem={renderItem}
              ListEmptyComponent={EmptyListMessage}
              refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#000']}
                />
            }
              keyExtractor={(item) => item}
              numColumns={3}
              contentContainerStyle={{
              }}
            />
            <View style={{ marginBottom: 50, backgroundColor: "grey" }}></View>
          </View>
      }


      <TabBar />
    </View>
  )
}

export default Podcast

const styles = StyleSheet.create({})