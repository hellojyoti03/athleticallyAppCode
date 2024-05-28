import React from 'react';
import { View, StyleSheet, Dimensions,Text} from 'react-native';
import Video from 'react-native-video';
const PodcastViewPage = ({route}) => {
    console.log("90909",route)
    const [fullscreen, setFullscreen] = React.useState(false);

    const toggleFullscreen = () => {
      setFullscreen(!fullscreen);
    }
    return (
        <View style={styles.container}>
            <Video
               source={{ uri:route.params.data}}
               style={fullscreen ? styles.fullscreenVideo : styles.video}
               resizeMode="contain"
               fullscreen={fullscreen}
               controls={true}
               onFullscreenPlayerWillDismiss={toggleFullscreen}
            />

            

        </View>
    )
}

export default PodcastViewPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: 'black',
    },
    video: {
      width: Dimensions.get('window').width,
    //   height: Dimensions.get('window').height,
    height: Dimensions.get('window').height,

    },
    fullscreenVideo: {
      ...StyleSheet.absoluteFillObject,
    },
  });

