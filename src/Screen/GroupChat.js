/**
 * @function GroupChat
 * @author jyotiprakash
 * @date 31-05-2024
 * @returns jsx
 */
import {
  Placeholder,
  PlaceholderLine,
  ShineOverlay,
} from 'react-native-loading-placeholder';
import {config} from '../config';
import {io} from 'socket.io-client';
import React, {useState, useEffect, useReducer, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
//import RNBlobUtil from 'react-native-blob-util';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';

import ProfileImage from '../assets/user.jpg';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SendIcon from 'react-native-vector-icons/Ionicons';
import FileIcon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import Notificationss from 'react-native-vector-icons/MaterialIcons';
import {ListItem} from 'react-native-elements';
import {setGroupChatMessage} from '../redux/slice/appSclice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SocketClient from '../websocket.js';
import {getPreviousChatByGroupId} from '../_request';
import {uid} from 'uid';
import {BlurView} from '@react-native-community/blur';
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/** Column VerticalBar */
const VerticalBar = () => {
  return (
    <View style={styles.verticalBar}>
      <View style={styles.bar} />
      <View style={styles.bar} />
      <View style={styles.bar} />
    </View>
  );
};

const GroupChat = ({route}) => {
  const {group} = route.params;
  const chatId = uid(10);
  // console.log(group, 'gr');
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  // console.log('app satte', appState);
  const navigation = useNavigation();
  const [isVideoVisible, setVideoVisible] = useState(false);
  const [videoUri, setVideoUri] = useState('');
  const [isImageVisible, setImageVisible] = useState(false);
  const [ImageUri, setImageUri] = useState('');
  const [onlineMember, setOnlineMember] = useState(1);
  const messageScrollViewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(null);
  const socketRef = useRef(null);
  const [statusBarStyle, setStatusBarStyle] = useState('#000');
  const [textMessage, setTextMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState([]);

  /* jsx*/
  // const renderFile = (file, isCurrentUser) => {
  //   const {data, type, name} = file;

  //   console.log(type, name);
  //   if (type?.startsWith('text/')) {
  //     return (
  //       <>
  //         {isCurrentUser ? (
  //           <Text style={{fontSize: 12, color: '#fff', fontWeight: 500}}>
  //             {data}
  //           </Text>
  //         ) : (
  //           <Text style={{fontSize: 12, color: '#000', fontWeight: 500}}>
  //             {data}
  //           </Text>
  //         )}
  //       </>
  //     );
  //   }
  //   if (type?.startsWith('image/')) {
  //     console.log('A IMAGE FILE RENDER', data);
  //     return (
  //       <TouchableOpacity onPress={() => playImage(data)}>
  //         <Image
  //           source={{uri: data}}
  //           style={{
  //             width: 100,
  //             maxWidth: '100%',
  //             height: 160,
  //             borderRadius: 8,
  //             marginTop: 5,
  //           }}
  //           resizeMode="cover"
  //         />
  //       </TouchableOpacity>
  //     );
  //   }

  //   if (type?.startsWith('audio/')) {
  //     return (
  //       <TouchableOpacity
  //         style={{marginTop: 5}}
  //         onPress={() => playAudio(data)}>
  //         <Text style={{color: '#0078fe'}}>Play Audio</Text>
  //       </TouchableOpacity>
  //     );
  //   }

  //   if (type?.startsWith('video/')) {
  //     return (
  //       <TouchableOpacity
  //         style={{marginTop: 5}}
  //         onPress={() => playVideo(data)}>
  //         <Video
  //           source={{uri: data}}
  //           style={{width: 300, height: 200, marginTop: 5}}
  //           resizeMode="contain"
  //           controls={true}
  //         />
  //       </TouchableOpacity>
  //     );
  //   }

  //   return (
  //     <TouchableOpacity
  //       style={{marginTop: 5}}
  //       onPress={() => downloadFile(data, name)}>
  //       <Text style={{color: '#0078fe'}}>{name}</Text>
  //     </TouchableOpacity>
  //   );
  // };
  const renderMessage = item => {
    const {
      isCurrentUser,
      messageContent,
      messageFilePath,
      isLoading,
      type = undefined,
    } = item;
    console.log(item, 'current Item');
    // if (isLoading) {
    //   return (
    //     <View style={{height: 100, width: 100}}>
    //       <ActivityIndicator size="large" color="#000" />
    //     </View>
    //   );
    // }
    if (type && type.startsWith('image/') && isLoading) {
      return (
        <View
          style={{
            position: 'relative',
            width: 100,
            height: 160,
            maxWidth: '100%',
            backgroundColor: 'blue',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              borderRadius: 8,
            }}>
            <BlurView
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          </View>
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateX: -12.5}, {translateY: -12.5}], // Center the indicator
              zIndex: 3, // Ensure the ActivityIndicator is above the blur overlay
            }}
            size={'large'}
            color={'#ffffff'} // Adjust the color as needed
          />

          <Image
            source={{uri: messageFilePath}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              filter: 'brightness(20%) blur(20px)',
            }}
            resizeMode="cover"
          />
        </View>
      );
    }
    if (type && type.startsWith('video/') && isLoading) {
      return (
        <View
          style={{
            position: 'relative',
            width: 100,
            height: 160,
            maxWidth: '100%',
            backgroundColor: 'blue',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              borderRadius: 8,
            }}>
            <BlurView
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          </View>
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateX: -12.5}, {translateY: -12.5}], // Center the indicator
              zIndex: 3, // Ensure the ActivityIndicator is above the blur overlay
            }}
            size={'large'}
            color={'#ffffff'} // Adjust the color as needed
          />

          <Video
            source={{uri: messageFilePath}}
            style={{
              width: 100,
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
            resizeMode="stretch"
            paused={true}
          />
        </View>
      );
    }

    if (messageFilePath !== '') {
      // Check the file extension to determine the type
      const fileExtension = messageFilePath.split('.').pop().toLowerCase();
      if (
        fileExtension === 'jpg' ||
        fileExtension === 'png' ||
        fileExtension === 'gif'
      ) {
        return (
          <TouchableOpacity onPress={() => playImage(messageFilePath)}>
            <Image
              source={{uri: messageFilePath}}
              style={{
                width: 100,
                maxWidth: '100%',
                height: 160,
                borderRadius: 8,
                // marginTop: 5,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      } else if (fileExtension === 'mp4') {
        return (
          <TouchableOpacity onPress={() => playVideo(messageFilePath)}>
            <Video
              source={{uri: messageFilePath}}
              style={{
                width: 100,
                height: 200,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              resizeMode="stretch"
              paused={true}
            />
          </TouchableOpacity>
        );
      } else {
        //  return <DocumentView fileUrl={messageFilePath} />;
      }
    }

    // If messageContent is text
    if (messageContent !== '' && isLoading == false)
      return (
        <>
          <View
            style={{
              padding: 10,
              margin: 0,
              flexDirection: 'column',

              borderRadius: 16,
            }}>
            {isCurrentUser ? (
              <>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 500}}>
                  {messageContent}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    color: '#000',
                    marginTop: 0,
                    padding: 0,
                    alignItems: 'flex-end',
                  }}>
                  {'userNameView'}
                </Text>
                <Text style={{fontSize: 12, color: '#000', fontWeight: 500}}>
                  {messageContent}
                </Text>
              </>
            )}
          </View>
          {isCurrentUser ? (
            <>
              <View style={styles.rightArrow}></View>
              <View style={styles.rightArrowOverlap}></View>
            </>
          ) : (
            <>
              <View style={styles.leftArrow}></View>
              <View style={styles.leftArrowOverlap}></View>
            </>
          )}
        </>
      );
    // return <></>;
  };

  const renderMessages = messages => {
    return (
      <>
        {messages.map((item, index) => (
          <ListItem
            key={index}
            onPress={() => {}}
            containerStyle={styles.messageContainer}
            style={styles.messageItem}>
            {item.isCurrentUser ? (
              <>
                <ListItem.Content style={styles.userListContent}>
                  <View
                    style={{
                      backgroundColor: '#0078fe',

                      borderRadius: 16,

                      marginRight: '1%',
                      maxWidth: '60%',
                    }}
                    key={index}>
                    {renderMessage(item)}
                  </View>
                </ListItem.Content>
                <Image
                  source={require('../assets/user.jpg')}
                  style={styles.messageProfile}
                />
              </>
            ) : (
              <>
                <Image
                  source={require('../assets/user.jpg')}
                  style={styles.messageProfile}
                />
                <ListItem.Content style={styles.opponentListContent}>
                  {/* <ListItem.Subtitle
                  style={styles.opponentListSubtitle}
                  ellipsizeMode="tail">
                  {item.text}
                </ListItem.Subtitle> */}

                  <View
                    style={{
                      backgroundColor: '#e0e0e0',

                      borderRadius: 16,

                      marginRight: '1%',
                      maxWidth: '60%',
                    }}
                    key={index}>
                    {renderMessage(item)}
                  </View>
                </ListItem.Content>
              </>
            )}
          </ListItem>
        ))}
      </>
    );
  };

  const playVideo = data => {
    setVideoUri(data);
    setVideoVisible(true);
  };
  const playImage = data => {
    setImageUri(data);
    setImageVisible(true);
  };

  const renderVideoModal = () => (
    <Modal
      isVisible={isVideoVisible}
      onBackdropPress={() => setVideoVisible(false)}
      onBackButtonPress={() => setVideoVisible(false)}
      style={{margin: 0}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Video
          source={{uri: videoUri}}
          style={{flex: 1}}
          controls={true}
          paused={false}
          resizeMode="cover"
          onEnd={() => setVideoVisible(false)}
        />
      </View>
    </Modal>
  );
  const renderImageModal = () => (
    <Modal
      isVisible={isImageVisible}
      onBackdropPress={() => setImageVisible(false)}
      onBackButtonPress={() => setImageVisible(false)}
      style={{margin: 0}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Image
          source={{uri: ImageUri}}
          style={{flex: 1}}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );

  const playAudio = data => {
    const sound = new Sound(data, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    });
  };

  const downloadFile = async (data, name) => {
    const base64Data = data.replace(/^data:.*,/, '');
    const filePath = `${RNFS.DocumentDirectoryPath}/${name}`;

    try {
      await RNFS.writeFile(filePath, base64Data, 'base64');
      console.log('File downloaded to:', filePath);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const sendMessage = data => {
    client.stopTyping(group.groupId);
    client.sendMessage({
      group_id: group.groupId,
      sender_id: appState.currentUser.user_id,
      message_content: data,
      message_file_path: '',
      reply_to: '',
    });
    setMessages(prev => {
      let newMessage = {
        id: chatId,
        isCurrentUser: true,
        messageContent: data,
        profile: ProfileImage,
        isLoading: false,
        messageFilePath: '',
        userName: '',
      };

      return [...prev, newMessage];
    });

    setTextMessage('');
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to read files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // For iOS, check and request permissions
      const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (status !== RESULTS.GRANTED) {
        const requestStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (requestStatus === RESULTS.GRANTED) {
          console.log('You can use the photo library');
        } else {
          console.log('Photo library permission denied');
        }
      }
    }
  };
  /*
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const captureImage = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const captureVideo = () => {
    launchCamera({mediaType: 'video'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedVideo(response.assets[0].uri);
      }
    });
  };
  */

  // const pickFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log(res);
  //     const fileData = {
  //       fileCopyUri: res?.[0]?.fileCopyUri || null,
  //       size: res?.[0]?.size || 0,
  //       uri: res[0].uri,
  //       type: res[0].type,
  //       name: res[0].name,
  //     };

  //     // Convert the file to base64
  //     const base64File = await readFileAsBase64(fileData.uri, fileData.type);
  //     const message = {
  //       data: base64File,
  //       type: fileData.type,
  //       name: fileData.name,
  //       uri: fileData.uri,
  //       size: fileData.size,
  //     };

  //     sendMessage(message);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User canceled the file picker');
  //     } else {
  //       //throw err;
  //       console.log('err', err);
  //     }
  //   }
  // };
  const pickFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(file, 'current file');
      if (file) {
        let chatID = chatId;
        setMessages(prev => {
          let newMessage = {
            id: chatID,
            isCurrentUser: true,
            messageContent: '',
            profile: ProfileImage,
            isLoading: true,
            messageFilePath: file.uri,
            userName: '',
            type: file.type,
          };
          return [...prev, newMessage];
        });
        // Create a new FormData object
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });

        // Upload the file as a blob using your API
        fetch('http://15.206.27.50:3009/api/v1/upload-chat-file', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${appState.userToken}`,
          },
        })
          .then(response => response.json())
          .then(result => {
            console.log('File uploaded successfully:', result);

            setMessages(prev => {
              let msg = prev.map(el => {
                if (el.id == chatID) {
                  // console.log('MY APP LOADING');
                  el.isLoading = false;
                  el.messageFilePath = result?.data?.url;
                }
                return el;
              });

              return msg;
            });
            client.sendMessage({
              group_id: group.groupId,
              sender_id: appState.currentUser.user_id,
              message_content: '',
              message_file_path: result?.data?.url,
              reply_to: '',
            });
            // Handle the result as needed
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read External Storage Permission',
          message:
            'This app needs access to your external storage to read files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getPathFromContentUri = async uri => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      const hasPermission = await requestReadPermission();
      if (!hasPermission) {
        throw new Error('Permission to read external storage denied');
      }

      try {
        // const stat = await RNBlobUtil.fs.stat(uri);
        // return stat.path;
      } catch (error) {
        console.error('Error resolving content URI to file path:', error);
        throw error;
      }
    }
    return uri; // For iOS or already resolved file paths
  };

  const readFileAsBase64 = async (uri, type) => {
    try {
      console.log(uri, type, 'uri and type');
      // const filePath = await getPathFromContentUri(uri);
      // const base64String = await RNFS.readFile(uri, 'base64');
      const base64File = await RNFetchBlob.fs.readFile(uri, 'base64');
      // data:${file.type};base64,${file.base64}
      return `data:${type};base64,${base64File}`;
    } catch (error) {
      console.error('Error reading file as base64:', error);
      throw error;
    }
  };

  const addNewOnlineMember = data => {
    console.log(data, 'receive data from server');
    let activeUser = Number(data.currentActiveUserCount);
    setOnlineMember(activeUser);
  };

  const setReceiveMessage = data => {
    console.log('receive messgae from server::', data);
    setMessages(prev => {
      let newMessage = {
        isCurrentUser:
          data?.sender_id == appState.currentUser.user_id ? true : false,
        messageContent: data.message_content,
        profile: ProfileImage,
        messageFilePath: data.message_file_path,
      };

      return [...prev, newMessage];
    });
  };

  const addUserTypeing = data => {
    let {userId, username, groupId} = data;

    setTypingUser(prev => [...prev, {userId, username}]);
  };

  const removeUserTypeing = data => {
    let {userId, username, groupId} = data;
    setTypingUser(prev => {
      let arr = prev.filter(el => el.userId !== userId);
      return arr;
    });
  };

  const handleTextChange = text => {
    if (client && group && group.groupId) {
      client.typeing(group.groupId); // Send typing status to the server
    }
    setTextMessage(text); // Update state with new text
  };

  async function fetchPreviousMessage() {
    try {
      setLoading(true);
      //requestStoragePermission();

      let response = await getPreviousChatByGroupId(
        appState.userToken,
        group.groupId,
      );

      let filterChatMessage = response.data.data.map(msg => {
        // const message = {
        //   data: msg.message_content,
        //   type: 'text/.txt',
        //   name: null,
        //   uri: null,
        //   size: 0,
        // };

        return {
          id: msg._id,
          isCurrentUser: msg.isCurrentUser,
          messageContent: msg.message_content,
          profile: ProfileImage,
          isLoading: false,
          messageFilePath: msg.message_file_path,
          userName: msg?.name || '',
        };
      });
      setMessages(filterChatMessage);

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
  }
  useEffect(() => {
    // Connect to the socket
    fetchPreviousMessage();

    if (!client) {
      const _client = new SocketClient(appState.userToken);
      // _client.socket.on('memberJoined', arg => {
      //   console.log('member-joi', arg);
      // });

      setClient(_client);
    }
    // Clean up the socket connection on unmount
    return () => {
      client?.leaveGroup(group.groupId);
      // client?.disconnect();
      //deleteOnlineMember();
    };
  }, []);

  // useEffect(() => {
  //   const BASE_URI = `${config.apiBaseUrl?.[config.ENV]}/msg`;
  //   const token = appState.userToken; // Replace with your actual token

  //   const newSocket = io(BASE_URI, {
  //     query: {auth_token: token},
  //     // reconnection: true, // Enable reconnection
  //     // reconnectionAttempts: 5, // Number of reconnection attempts
  //     // reconnectionDelay: 1000, // Delay between each reconnection attempt (in ms)
  //   });

  //   socketRef.current = newSocket;

  //   // Socket event listeners

  // }, [group.groupId]);

  // useEffect(() => {
  //   if(s)
  // }, [socketRef.current])

  useEffect(() => {
    if (client) {
      // client._initSocketListeners();
      client.connectionError();
      client.joinGroup(group.groupId);

      client.memberJoined(addNewOnlineMember);
      client.receiveMessage(setReceiveMessage);
      client.userTyping(addUserTypeing);
      client.userStopTypeing(removeUserTypeing);
      client.memberLeft(addNewOnlineMember);
    }

    return () => {
      // setClient(null);
    };
  }, [client]);

  console.log(onlineMember, 'online member');
  useEffect(() => {
    messageScrollViewRef.current.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={statusBarStyle} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View />
          <View style={styles.headerCenter}>
            <Text style={styles.headerText}>ATHELETICALY</Text>
          </View>
          <View>
            <Notificationss
              name="notification-add"
              style={{
                fontSize: responsiveFontSize(2.4),
                color: '#fff',
                // borderWidth: 1,
                // borderColor: 'red',
              }} // Add temporary border
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        <View style={styles.groupContainer}>
          <Image
            source={require('../assets/user.jpg')}
            style={styles.groupImage}
          />

          <View style={styles.groupInfo}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GroupMember', {group: group})
              }>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDesc}>
                <Text style={styles.totalMembers}>
                  {`${group.userCount}`} members
                </Text>{' '}
                <Text style={styles.separator}> | </Text>
                <Text style={styles.onlineMembers}>
                  {`${onlineMember}`} online
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.callOptions}>
            <TouchableOpacity>
              <VerticalBar />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.messageList}
          ref={messageScrollViewRef}
          onContentSizeChange={() =>
            messageScrollViewRef.current.scrollToEnd({animated: true})
          }>
          {loading ? (
            <ActivityIndicator size="large" color="#F29D38" />
          ) : (
            // <>{ }</>
            renderMessages(messages)

            // <>
            //   <FlatList
            //     //inverted
            //     style={{backgroundColor: '#eeeeee'}}
            //     data={messages}
            //     ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
            //     renderItem={({item, index}) => {
            //       rowId = {index};

            //       if (item.isCurrentUser) {
            //         //change as per your code logic

            //         return (
            //           <View
            //             style={{
            //               backgroundColor: '#0078fe',
            //               padding: 10,
            //               marginLeft: '45%',
            //               borderRadius: 5,

            //               marginTop: 5,
            //               marginRight: '5%',
            //               maxWidth: '50%',
            //               alignSelf: 'flex-end',
            //               borderRadius: 20,
            //             }}
            //             key={index}>
            //             <Text style={{fontSize: 16, color: '#fff'}} key={index}>
            //               {' '}
            //               {item.text}
            //             </Text>

            //             <View style={styles.rightArrow}></View>
            //             <View style={styles.rightArrowOverlap}></View>
            //           </View>
            //         );
            //       } else {
            //         return (
            //           <View
            //             style={{
            //               backgroundColor: '#dedede',
            //               padding: 10,
            //               borderRadius: 5,
            //               marginTop: 5,
            //               marginLeft: '5%',
            //               maxWidth: '50%',
            //               alignSelf: 'flex-start',
            //               //maxWidth: 500,
            //               //padding: 14,

            //               //alignItems:"center",
            //               borderRadius: 20,
            //               backgroundColor: 'red',
            //             }}
            //             key={index}>
            //             <Text
            //               style={{
            //                 fontSize: 16,
            //                 color: '#000',
            //                 justifyContent: 'center',
            //               }}
            //               key={index}>
            //               {' '}
            //               {item.text}
            //             </Text>
            //             <View style={styles.leftArrow}></View>
            //             <View style={styles.leftArrowOverlap}></View>
            //           </View>
            //         );
            //       }
            //     }}

            //     // keyExtractor={(item,index)=>index.toString()}
            //   />
            // </>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickFile}>
            <FileIcon
              name="attach-file"
              size={responsiveFontSize(5)}
              style={styles.sendButton}
            />
          </TouchableOpacity>
          <TextInput
            value={textMessage}
            onChangeText={handleTextChange}
            placeholder="Type message"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => {
              // const message = {
              //   data: textMessage,
              //   type: 'text/.txt',
              //   name: null,
              //   uri: null,
              //   size: 0,
              // };
              if (textMessage == '') return;
              sendMessage(textMessage);
            }}>
            <SendIcon
              name="send"
              size={responsiveFontSize(5)}
              style={styles.sendButton}
            />
          </TouchableOpacity>
          {renderVideoModal()}
          {renderImageModal()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  headerContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: responsiveFontSize(2.1),
    color: '#fff',
    fontWeight: '400',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginTop: 17,
    //backgroundColor: '#f9f9f9', // Change background color to light grey
  },

  /* GROUP AREA:: START*/
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1b1b1b',
  },

  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 10,
  },
  groupName: {
    fontSize: responsiveFontSize(2.1),
    color: '#fff',
    fontWeight: 'bold',
  },
  groupDesc: {
    fontSize: responsiveFontSize(1.5),
    color: '#fff',
  },
  totalMembers: {
    fontWeight: 'bold',
  },
  onlineMembers: {
    color: 'green',
  },
  separator: {
    color: '#fff',
  },
  callOptions: {
    flexDirection: 'row',
  },
  callIcon: {
    marginHorizontal: 10,
  },

  /* GROUP AREA:: END*/
  /* MESSEGE AREA:: START*/

  messageContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,

    padding: 0,
  },
  messageList: {
    width: '100%',
    // padding: 10,

    // marginBottom: 10,
  },
  messageItem: {
    backgroundColor: 'transparent',
    //marginTop: 10,
    borderRadius: 15,
    padding: 10,
    maxWidth: '100%',
    marginHorizontal: 10,
  },
  // userListSubtitle: {
  //   padding: 5,
  //   //marginRight: 5,
  //   borderRadius: 5,
  //   maxWidth: '80%',
  //   backgroundColor: '#00bcd4',
  // },
  // opponentListSubtitle: {
  //   backgroundColor: '#e0e0e0',
  //   padding: 5,
  //   //marginLeft: 5,
  //   borderRadius: 5,
  //   maxWidth: '80%',
  //   // backgroundColor: '#00bcd4',
  //   // backgroundColor: '#e0e0e0',
  // },
  userListContent: {
    alignItems: 'flex-end',
    //backgroundColor: '#DCF8C6', // WhatsApp green for current user
    // borderRadius: 15,
    // padding: 10,
    //marginRight: 10,

    //backgroundColor: 'red',
  },
  opponentListContent: {
    alignItems: 'flex-start',
    // backgroundColor: '#FFFFFF', // White for opponent
    // borderRadius: 15,
    // padding: 10,
    // marginLeft: 5,
  },

  messageProfile: {
    width: 20,
    height: 20,
    borderRadius: 20,
    zIndex: 1,
    margin: 4,
    // marginRight: 10,
    // marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  opponentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  /* MESSEGE AREA:: END*/
  /* INPUT AREA:: START*/
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    // backgroundColor: '#f1f1f1',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    color: '#000',
    marginHorizontal: 10,
  },
  sendButton: {
    color: '#5855d6',
  },
  /* INPUT AREA:: END */
  /* VERTICALBAR AREA:: START*/

  verticalBar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  bar: {
    width: 4,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 2,
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    // backgroundColor: 'red',
    width: 20,
    height: 25,
    // bottom: 0,
    // borderBottomLeftRadius: 25,
    // right: -10,

    top: 0,
    right: -10,
    borderTopLeftRadius: 25,
    // transform: 'rotate(360deg)',
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#000',
    //backgroundColor: 'green',
    width: 20,
    height: 35,
    top: -6,
    borderTopLeftRadius: 18,
    right: -20,
    zIndex: 0,
  },
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    // backgroundColor: 'red',
    width: 20,
    height: 25,
    top: 0,
    borderTopRightRadius: 25,
    // bottom: 0,
    // borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#000',
    //backgroundColor: 'green',
    width: 20,
    height: 35,
    top: -6,
    borderTopRightRadius: 18,
    // bottom: -6,
    // borderBottomRightRadius: 18,
    left: -20,
  },
  /* VERTICALBAR AREA:: END*/
});
export default GroupChat;
