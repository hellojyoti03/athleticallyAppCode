import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {SliderBox} from 'react-native-image-slider-box';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import {getUserGroupsConnect, getUsersByGroupId} from '../_request';
import {setContactGroup} from '../redux/slice/appSclice';
import {useNavigation} from '@react-navigation/native';
const Connect = ({route}) => {
  const {group} = route.params;
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const navigation = useNavigation();
  const [statusBarStyle, setStatusBarStyle] = useState('light-content');
  const [loading, setLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const [userList, setUserList] = useState([]);
  const images = [
    require('../assets/t.jpg'),
    require('../assets/p.jpg'),
    // require('../assets/Rectangle.png'),
  ];

  const getConnects = async () => {
    try {
      setLoading(true);

      let response = await getUsersByGroupId(appState.userToken, group.groupId);
      console.log(response.data.data, 'GROUP MEMEBR RESPONSE');

      let filterUser = response.data.data.map(el => {
        return {
          name: el.userdtls.name,
          profile: el.userdtls.image,
          color: '#5855d6',
          textColor: '#fff',
        };
      });
      // let filterUserGroups = response.data.data.map(el => {
      //   return {
      //     name: el.group_name,
      //     color: '#5855d6',
      //     textColor: '#fff',
      //     userCount: el.usercount,
      //     groupId: el.group_id,
      //   };
      // });

      // console.log(filterUserGroups, 'GROUPS');
      // dispatch(setContactGroup(filterUserGroups));
      console.log(filterUser, 'f');
      setUserList(filterUser);
      setLoading(false);
    } catch (error) {
      if (error?.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error?.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dataLoad) {
      getConnects();
      setDataLoad(false);
    }
    getConnects();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
      />
      <View style={styles.header}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View></View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.headerText}>ATHELETICALY</Text>
          </View>
          <View>
            <Notificationss
              name="notification-add"
              style={{fontSize: responsiveFontSize(2.1)}}
            />
          </View>
        </View>
      </View>

      {/* <SliderBox
        images={images}
        imageLoadingColor="#F29D38"
        dotColor="#F29D38"
        resizeMethod={'resize'}
        resizeMode={'contain'}
        ImageComponentStyle={{borderRadius: 15, width: '96%', marginTop: 5}}
      /> */}

      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          {loading ? (
            <ActivityIndicator size="large" color="#F29D38" />
          ) : (
            <>
              {userList.map((user, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.touchableOpacity,
                    {
                      backgroundColor: user.color,
                      marginTop: index === 0 ? 0 : 10,
                    },
                  ]}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri: user.profile}} style={styles.image} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={{color: user.textColor}}>{user.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerText: {
    fontSize: responsiveFontSize(2.1),
    color: '#fff',
    fontWeight: '400',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 17,
  },
  scrollView: {
    flex: 1,
  },
  touchableOpacity: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: 10,
  },
  imageContainer: {
    width: '30%',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: 50,
    borderRadius: 40,
  },
  textContainer: {
    width: '70%',
    justifyContent: 'center',
  },
});

export default Connect;
