import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardPage from '../Screen/DashboardPage';
import ProfileUpdatePage from '../Screen/ProfileUpdatePage';
import StartPage from '../Screen/StartPage';
import ReelDetailScreen from '../Screen/ReelDetailScreen';
import Explore from '../Screen/Explore';
import Matchesvideos from '../Screen/Matchesvideos';
import MatchVideoupload from '../Screen/MatchVideoupload';
import Events from '../Screen/Events';
import PlusDetailsPage from '../Screen/PlusDetailsPage';
import Eventdetails from '../Screen/Eventdetails';
import LeaderBoard from '../Screen/LeaderBoard';
import UserProfiledetails from '../Screen/UserProfiledetails';
import Connect from '../Screen/Connect';
import Podcast from '../Screen/Podcast';
import New from '../Screen/New';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PodcastViewPage from '../Screen/PodcastViewPage';
import Practise from '../Practise';
import {useSelector} from 'react-redux';
import ProfileForm from '../Screen/ProfileForm';
import PodcastDetailsVideo from '../Screen/PodcastDetailsVideo';
import SplashScreen from './SplashScreen';
import matchesdetailVideo from '../Screen/matchesdetailVideo';
import Explorereels from '../Screen/Explorereels';
const Guestnavigation = () => {
  const Stack = createNativeStackNavigator();
  const currentUser = useSelector(state => state.app.currentUser);
  useEffect(() => {
    // Handle back button press event
    const backAction = () => {
      AsyncStorage.getItem('updated').then(updated => {
        // If updated is true, navigate to DashboardPage
        if (updated === 'true') {
          navigation.navigate('DashboardPage');
          return true; // Prevent default back button behavior
        }
        return false; // Let default back button behavior happen
      });
    };

    // Add event listener for back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Clean up event listener
    return () => backHandler.remove();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={
        currentUser?.updated === true ? 'DashboardPage' : 'StartPage'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DashboardPage" component={DashboardPage} />
      <Stack.Screen name="Practise" component={Practise} />
      <Stack.Screen name="ProfileUpdatePage" component={ProfileUpdatePage} />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
      <Stack.Screen
        name="PodcastDetailsVideo"
        component={PodcastDetailsVideo}
      />
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="Explorereels" component={Explorereels} />
      <Stack.Screen name="matchesdetailVideo" component={matchesdetailVideo} />
      <Stack.Screen name="ReelDetailScreen" component={ReelDetailScreen} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Matchesvideos" component={Matchesvideos} />
      <Stack.Screen name="MatchVideoupload" component={MatchVideoupload} />
      <Stack.Screen name="Podcast" component={Podcast} />
      <Stack.Screen name="PlusDetailsPage" component={PlusDetailsPage} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Eventdetails" component={Eventdetails} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
      <Stack.Screen name="PodcastViewPage" component={PodcastViewPage} />
      <Stack.Screen name="UserProfiledetails" component={UserProfiledetails} />
      <Stack.Screen name="Connect" component={Connect} />
    </Stack.Navigator>
  );
};

export default Guestnavigation;

const styles = StyleSheet.create({});

// useEffect(() => {
//   // Retrieve the value from AsyncStorage
//   const fetchAsyncStorageValue = async () => {
//     try {
//       const mr = await AsyncStorage.getItem('usertoken');
//       console.log('mr:', mr); // Log retrieved AsyncStorage value
//       if (mr !== null) {
//         const modifiedUser = JSON.parse(mr);
//         console.log('modifiedUser:', modifiedUser); // Log parsed user data
//         setModifiedUser1(modifiedUser);
//       } else {
//         console.log('No user data found in AsyncStorage');
//       }
//     } catch (error) {
//       console.error('Error retrieving AsyncStorage value:', error);
//     }
//   };

//   fetchAsyncStorageValue();
// }, []);
