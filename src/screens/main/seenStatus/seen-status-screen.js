import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const SeenStatusScreen = ({route, navigation}) => {
  let userData = route.params?.userStatusData;
  let allVideosUrl = userData;
  console.log('userData: ', JSON.stringify(userData, null, 2));

  const time = useRef(0);
  const progressBar = useRef(new Animated.Value(0)).current;
  // const statusWidthStart = useRef(0);
  // const statusWidthEnd = useRef(windowWidth / 2);
  const [videoUrl, setVideoUrl] = useState(undefined);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [animateIndex, setAnimateIndex] = useState(-1);

  useEffect(() => {
    setVideoUrl(allVideosUrl[0]);
    // console.log('Status =======', userData);
    // statusWidthStart.current = 0;
    // statusWidthEnd.current = windowWidth / allVideosUrl;
  }, []);

  const startAnimation = (index, timer) => {
    if (timer) time.current = timer;
    progressBar.setValue(0);
    if (index != animateIndex) {
      setAnimateIndex(index);

      setTimeout(() => {
        Animated.timing(progressBar, {
          toValue: 1,
          duration: time.current * 1000,
          useNativeDriver: false,
        }).start(() => {
          progressBar.setValue(0), setAnimateIndex(-1);
        });
      }, 10);
    } else {
      setAnimateIndex(-1);
    }
  };

  let statusTimeOut = undefined;

  return (
    <View style={styles.container}>
      <View style={styles.statusHeaderView}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color={'white'} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 50,
            marginHorizontal: 10,
            flex: 1,
          }}>
          <View style={styles.imgView}>
            <Image source={{uri: userData?.image}} style={styles.userimg} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{fontSize: 22, color: 'white'}}>{userData?.name}</Text>
            <Text style={{fontSize: 13, color: 'white'}}>{userData?.time}</Text>
          </View>
        </View>
        <TouchableOpacity style={{marginRight: 10}}>
          <Entypo name={'dots-three-vertical'} size={25} color={'white'} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusViewSection}>
        <View style={styles.slide1}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: -5,
            }}>
            {allVideosUrl?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 5,
                    borderRadius: 5,
                    backgroundColor:
                      index > currentVideoIndex - 1 ? 'gray' : 'white',
                    width: `${100 / allVideosUrl.length}%`,
                  }}></View>
              );
            })}
          </View>

          <View
            style={{
              width: `${100 / allVideosUrl.length}%`,
              marginLeft: `${(100 / allVideosUrl.length) * currentVideoIndex}%`,
            }}>
            <Animated.View
              style={{
                flexDirection: 'row',
                height: 5,
                borderRadius: 5,
                backgroundColor: 'white',
                zIndex: 1000,
                width: progressBar.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }}></Animated.View>
          </View>
          {videoUrl && (
            <>
              {/* <Video
                key={1}
                source={{
                  uri: videoUrl.uri,
                }}
                style={styles.backgroundVideo}
                controls={false}
                resizeMode={'contain'}
                onLoad={option => {
                  // startAnimation(0, option?.duration);
                  startAnimation(0, 4);
                }}
                onEnd={onEndReached => {
                  setCurrentVideoIndex(currentVideoIndex + 1);
                  if (allVideosUrl[videoUrl.index + 1]?.index) {
                    setVideoUrl(allVideosUrl[videoUrl.index + 1]);
                  } else {
                    navigation.goBack();
                  }
                }}
              /> */}
              <Image
                key={videoUrl?.index}
                source={{
                  uri: videoUrl.uri,
                }}
                style={styles.backgroundVideo}
                controls={false}
                resizeMode={'contain'}
                onLoad={option => {
                  // startAnimation(0, option?.duration);
                  startAnimation(0, 4);
                }}
                onLoadEnd={onEndReached => {
                  statusTimeOut = setTimeout(() => {
                    setCurrentVideoIndex(currentVideoIndex + 1);
                    if (allVideosUrl[videoUrl.index + 1]?.index) {
                      setVideoUrl(allVideosUrl[videoUrl.index + 1]);
                    } else {
                      navigation.goBack();
                    }
                  }, 4000);
                }}></Image>
              <TouchableOpacity
                onPress={() => {
                  progressBar.setValue(0);
                  setAnimateIndex(-1);
                  clearTimeout(statusTimeOut);
                  setCurrentVideoIndex(currentVideoIndex + 1);
                  if (allVideosUrl[videoUrl.index + 1]?.index) {
                    setVideoUrl(allVideosUrl[videoUrl.index + 1]);
                  } else {
                    navigation.goBack();
                  }
                }}
                style={styles.nextStatusBtn}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  progressBar.setValue(0);
                  setAnimateIndex(-1);
                  clearTimeout(statusTimeOut);
                  setCurrentVideoIndex(currentVideoIndex - 1);
                  if (videoUrl.index > 0) {
                    setVideoUrl(allVideosUrl[videoUrl.index - 1]);
                  } else {
                    navigation.goBack();
                  }
                }}
                style={styles.previousStatusBtn}></TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          marginBottom: 10,
        }}>
        <Ionicons name="arrow-up" size={20} color={'#3C73E9'} />
        <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
          {'Reply '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // padding: 10,
  },
  nextStatusBtn: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    left: '50%',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  previousStatusBtn: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: '50%',
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  statusHeaderView: {
    // backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imgView: {
    backgroundColor: 'pink',
    height: 55,
    width: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3C73E9',
  },
  userimg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  statusViewSection: {
    flex: 1,
    marginVertical: 15,
  },

  wrapper: {},
  slide1: {
    flex: 1,
    backgroundColor: 'black',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    flex: 1,
    borderRadius: 10,
  },
});

export default SeenStatusScreen;
