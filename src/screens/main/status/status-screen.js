import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import database from '@react-native-firebase/database';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {seenStatus, setStatusData} from '@redux/slices/status/status-slice';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Svg, {Circle, Rect} from 'react-native-svg';
import Avatar from '@components/avatar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@constants';

const StatusScreen = ({navigation}) => {
  const {status} = useSelector(state => state.status);
  const {userId, userName, userProfile} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllStatus();
  }, []);

  const seenUserStatus = item1 => {
    const itm = item1.item;
    let newArr = [];
    itm?.allStatus?.forEach((item, index) => {
      newArr?.push({
        uri: item?.status,
        index,
      });
    });

    navigation.navigate('SeenStatus', {
      userStatusData: newArr,
    });
  };

  const selectImagesFromGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    }).then(async images => {
      const pickerData = images?.assets;
      const statusPromiseArr = [];

      pickerData?.forEach((item, index) => {
        const statusObj = {
          name: userName,
          id: userId,
          status: item?.uri,
          lastStatusDateTime: new Date(),
          type: item?.type?.split('/')[0],
          fileName: item?.fileName,
        };
        uploadStatusToFirebase(statusObj, statusPromiseArr);
      });

      const statusResponse = await Promise.all(statusPromiseArr);
    });
  };

  const uploadStatusToFirebase = async (statusObj, promises) => {
    const uploadImageUrl = await uploadStatusImage(statusObj);
    statusObj.status = uploadImageUrl;
    const uploadStatus = database()
      .ref('status/' + userId)
      .push(statusObj);
    promises.push(uploadStatus);
  };

  const uploadStatusImage = async item => {
    const path = item?.status;
    const fileName = item?.fileName;
    const uploadUrl =
      Platform.OS === 'ios' ? path?.replace('file://', '') : path;
    await storage()
      .ref('images/' + fileName)
      .putFile(uploadUrl)
      .then(() => {});
    const httpUrl = await storage()
      .ref('images/' + fileName)
      .getDownloadURL();
    return httpUrl;
  };

  const getAllStatus = () => {
    database()
      .ref('status/')
      .once('value', snapshot => {
        let arr = [];
        snapshot?.forEach(item => {
          if (item?.exists()) {
            let subArr = [];
            item?.forEach(snap => {
              subArr.push({
                name: snap.child('name').val(),
                status: snap.child('status').val(),
                lastStatusDateTime: snap.child('lastStatusDateTime').val(),
                type: snap.child('type').val(),
              });
            });
            arr.push({
              id: item.key,
              allStatus: subArr,
            });
          }
        });

        dispatch(setStatusData({data: arr, userId}));
      });
  };

  const numberOfDots = (2 * 3.14 * 47) / 7; //10 number of statues //48 is the radius of the circle

  const renderEmptyListComponent = () => {
    return (
      <TouchableOpacity
        style={styles.statusHeaderSection}
        onPress={selectImagesFromGallery}>
        <View style={styles.userStatusView}>
          <Avatar
            size={60}
            uri={userProfile}
            style={{backgroundColor: '#3C73E9'}}
          />
        </View>

        <View style={styles.statusDetails}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {'My status'}
          </Text>
          <Text style={{fontSize: 15, color: 'black'}}>
            {'Tap to add status update'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const MyStatusComponent = ({item, index}) => {
    return (
      <>
        {item?.id === userId ? (
          <TouchableOpacity
            style={styles.statusHeaderSection}
            onPress={() => seenUserStatus({item, index})}>
            <View style={styles.userStatusView}>
              <Svg
                style={{position: 'absolute'}}
                height="70"
                width="70"
                viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#3C73E9"
                  strokeWidth="4"
                  strokeDasharray={`${
                    item?.allStatus
                      ? (2 * 3.14 * 47) / item?.allStatus?.length
                      : 1
                  } 2`}
                  strokeDashoffset={
                    item?.allStatus
                      ? (2 * 3.14 * 47) / item?.allStatus?.length
                      : 1
                  }
                  fill="none"
                />
              </Svg>
              <Avatar
                size={60}
                uri={
                  item?.allStatus?.length
                    ? item?.allStatus[item?.allStatus?.length - 1]?.status
                    : ''
                }
                style={{backgroundColor: '#3C73E9'}}
              />
            </View>

            <View style={styles.statusDetails}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                {'My status'}
              </Text>
              <Text style={{fontSize: 15, color: 'black'}}>
                {'Tap to add status update'}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          renderEmptyListComponent()
        )}
        <Text style={{fontSize: 15}}>Recent updates</Text>
      </>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        {index === 0 && <MyStatusComponent item={item} index={index} />}
        {item?.isSeen && status[index - 1]?.isSeen == false && (
          <Text style={{fontSize: 15}}>Seen</Text>
        )}
        {item?.id !== userId && (
          <TouchableOpacity
            onPress={() => seenUserStatus({item, index})}
            style={styles.allRecentStatusSection}>
            <View style={styles.userStatusView}>
              <Svg
                style={{position: 'absolute'}}
                height="70"
                width="70"
                viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#3C73E9"
                  strokeWidth="4"
                  strokeDasharray={`${
                    item?.allStatus
                      ? (2 * 3.14 * 47) / item?.allStatus?.length
                      : 1
                  } 2`}
                  strokeDashoffset={
                    item?.allStatus
                      ? (2 * 3.14 * 47) / item?.allStatus?.length
                      : 1
                  }
                  fill="none"
                />
              </Svg>
              <Avatar
                size={60}
                uri={
                  item?.allStatus?.length > 0
                    ? item?.allStatus[item?.allStatus?.length - 1]?.status
                    : ''
                }
                style={{backgroundColor: '#3C73E9'}}
              />
            </View>

            <View style={styles.statusDetails}>
              <Text style={{fontSize: 20, color: 'black', marginBottom: 5}}>
                {item?.allStatus ? item?.allStatus[0]?.name : ''}
              </Text>
              <Text style={{fontSize: 15}}>
                {item?.allStatus?.length > 0
                  ? item?.allStatus[item?.allStatus?.length - 1]
                      ?.lastStatusDateTime
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={status}
        ListEmptyComponent={renderEmptyListComponent}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.status} onPress={selectImagesFromGallery}>
        <MaterialCommunityIcons
          name="camera"
          color={colors.primary}
          size={40}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  statusHeaderSection: {
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 5,
  },
  userStatusView: {
    borderRadius: 100,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDetails: {
    flex: 1,
    marginLeft: 12,
  },
  allRecentStatusSection: {
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 5,
  },
  viewedUpdatesStatusContainer: {},
  allUpdateStatusSection: {
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 5,
  },
  status: {position: 'absolute', bottom: 105, right: 15, zIndex: 1000},
});
