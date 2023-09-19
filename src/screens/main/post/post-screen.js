import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {DrawerToolbar} from '@components';
import Avatar from '@components/avatar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addComment,
  fetchAllComments,
  fetchAllPosts,
  likePost,
} from '@services/api-services';
import {useDispatch, useSelector} from 'react-redux';
import {
  removePost,
  setComments,
  setPosts,
} from '@redux/slices/posts/posts-slice';
import {DateUtil} from '@app-utils/date-util';
import {NumberUtil} from '@app-utils/number-util';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomInputs from '@components/CustomInputs';

const PostScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {apiUserId, authToken, userName} = useSelector(state => state.auth);
  const {posts, comments} = useSelector(state => state.posts);
  const refRBSheet = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLikeView, setShowLikeView] = useState(false);
  const [postId, setPostId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [comment, setComment] = useState('');

  const images = [
    {id: '1', description: 'Like', img: 'https://i.imgur.com/LwCYmcM.gif'},
    {id: '2', description: 'Love', img: 'https://i.imgur.com/k5jMsaH.gif'},
    {id: '3', description: 'Haha', img: 'https://i.imgur.com/f93vCxM.gif'},
    {id: '4', description: 'Yay', img: 'https://i.imgur.com/a44ke8c.gif'},
  ];
  useEffect(() => {
    getPostsData();
    return () => {
      dispatch(setComments([]));
    };
  }, []);

  const createPost = () => {
    navigation.navigate('CreatePost');
  };

  const getPostsData = async () => {
    try {
      const data = await fetchAllPosts(authToken, apiUserId);
      dispatch(setPosts(data?.posts));
    } catch (error) {
      console.error('Error handling posts API response:', error);
    }
  };

  const getComments = async (autherId, postId) => {
    try {
      const data = await fetchAllComments(authToken, autherId, postId);
      dispatch(setComments(data?.allComments['comments']));
    } catch (error) {
      console.error('Error handling get comments API response:', error);
    }
  };

  const postComment = async (autherId, postId) => {
    if (comment?.trim() === '') return;
    try {
      const data = await addComment(authToken, autherId, postId, comment);
      if (data.message === 'comment add on post') {
        setComment('');
        getComments(autherId, postId);
      }
    } catch (error) {
      console.error('Error handling add comment API response:', error);
    }
  };

  const likePosts = async (autherId, postId, likeType) => {
    try {
      const data = await likePost(authToken, autherId, postId, likeType);
      // dispatch(setPosts(data?.posts));
    } catch (error) {
      console.error('Error handling API response:', error);
    }
  };

  const sharePost = async content => {
    try {
      const result = await Share.share({
        message: content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onViewCallBackPartially = React.useCallback(viewableItems => {
    const firstViewableItem = viewableItems?.changed?.[0]?.item;
    const titleOfFirstItem = firstViewableItem?.title;
    // console.log('onViewCallBackPartially...', titleOfFirstItem);
  }, []);

  const onViewCallBack = React.useCallback(viewableItems => {
    const firstViewableItem = viewableItems?.changed?.[0]?.item;
    const titleOfFirstItem = firstViewableItem?.title;
    // console.log('onViewCallBack...', titleOfFirstItem);
  }, []);

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 100, // Triggers the callback when 100% of the item is visible
      },
      onViewableItemsChanged: onViewCallBack,
    },
    {
      viewabilityConfig: {
        minimumViewTime: 150,
        itemVisiblePercentThreshold: 20, // Triggers the callback when at least 20% of the item is visible
      },
      onViewableItemsChanged: onViewCallBackPartially,
    },
  ]);

  const handleLikeReaction = (authorId, postId, imageId) => {
    setSelectedImage(imageId === selectedImage ? null : imageId);
    likePosts(authorId, postId, imageId);
    setShowLikeView(false);
  };

  const removePostItem = item => {
    dispatch(removePost(item));
  };

  const renderLikeItem = ({item}, post) => {
    return (
      <View
        key={item?.id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => handleLikeReaction(post?.author, post?._id, item?.id)}>
          <Image
            source={{uri: item?.img}}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            onError={() => console.log(`Error loading ${item.id} GIF`)}
          />
        </TouchableOpacity>
        {/* <Text style={{marginLeft: 8}}>
          {selectedImage === item?.id ? 'Reacted' : item?.description}
        </Text> */}
      </View>
    );
  };

  const renderCommentsItem = ({item}) => {
    return (
      <View style={{paddingVertical: 10, flexDirection: 'row'}}>
        <Avatar size={40} />
        <View style={{paddingLeft: 10, justifyContent: 'center'}}>
          <Text style={{fontWeight: '700'}}>Muhammad Zahid</Text>
          <Text>{item?.text}</Text>
        </View>
      </View>
    );
  };

  const emptyCommentsComponent = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 120}}>
        <Foundation name="comments" size={150} color={'white'} />
        <Text style={{fontSize: 20, color: 'gray'}}>No comments yet</Text>
        <Text>Be the first to comment.</Text>
      </View>
    );
  };

  const isLastIndex = index => index === posts?.length - 1;

  const renderPostItem = item => {
    let post = item?.item;
    return (
      <View key={post?._id} style={{flex: 1}}>
        <View style={{padding: 10, paddingTop: 20}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Avatar size={40} />
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  paddingLeft: 10,
                }}>
                <Text style={{fontWeight: '600'}}>{post.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text>
                    {`${DateUtil.getInstance().formatApiDateToAppOnlyTimeFirebase(
                      post?.timestamp,
                    )} `}
                  </Text>
                  <FontAwesome name="globe" size={20} color={'gray'} />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: 60,
                alignContent: 'center',
              }}>
              <SimpleLineIcons
                style={{marginTop: 2}}
                name="options"
                size={18}
                color={'gray'}
              />
              <TouchableOpacity onPress={() => removePostItem(post)}>
                <AntDesign name="close" size={23} color={'gray'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingTop: 15, paddingBottom: 10}}>
            <Text numberOfLines={2}>{post.content}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/post.jpg')}
              style={{
                height: 250,
                resizeMode: 'cover',
                width: 370,
                borderRadius: 10,
              }}
            />
            {showLikeView && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -10,
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  borderRadius: 50,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5, // For Android
                }}>
                <FlatList
                  data={images}
                  horizontal
                  renderItem={item => renderLikeItem(item, post)}
                  contentContainerStyle={{paddingHorizontal: 10}}
                />
              </View>
            )}
          </View>
          <View
            style={{
              paddingVertical: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {post?.likes?.length > 0 && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#3492eb',
                    height: 23,
                    width: 23,
                    padding: 3,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AntDesign name="like1" size={15} color={'white'} />
                </View>

                <Text style={{paddingLeft: 5}}>
                  {NumberUtil.getInstance().formatNumber(post?.likes?.length)}
                </Text>
              </View>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Text>{`${NumberUtil.getInstance().formatNumber(
                post?.comments?.length,
              )} comments . `}</Text>
              <Text>{`${NumberUtil.getInstance().formatNumber(
                5,
              )} shares . `}</Text>
              <Text>{`${NumberUtil.getInstance().formatNumber(
                7400600,
              )} views`}</Text>
            </View>
          </View>
          <View style={{borderBottomWidth: 0.4, borderBottomColor: 'gray'}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.3}
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => likePosts(post?.author, post?._id, '1')}
              onLongPress={() => setShowLikeView(true)}>
              {post?.likes?.length > 0 ? (
                <View
                  style={{
                    backgroundColor: '#3492eb',
                    height: 20,
                    width: 20,
                    padding: 3,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AntDesign name="like1" size={13} color={'white'} />
                </View>
              ) : (
                <AntDesign name="like2" size={18} color={'gray'} />
              )}
              <Text style={{paddingLeft: 5}}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setAuthorId(post?.author), setPostId(post?._id);
                refRBSheet.current.open(), getComments(post?.author, post?._id);
              }}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={18}
                color={'gray'}
              />
              <Text style={{paddingLeft: 5}}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => sharePost(post.content)}>
              <MaterialCommunityIcons name="share" size={18} color={'gray'} />
              <Text style={{paddingLeft: 5}}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!isLastIndex(item?.index) && (
          <View style={{borderBottomWidth: 7, borderBottomColor: '#c9c9c9'}} />
        )}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={() => {
            dispatch(setComments([]));
          }}
          dragFromTopOnly={true}
          height={600}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(248, 248, 248, 0.3)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              backgroundColor: 'rgba(232, 229, 231, 0.97)',
              borderWidth: 0.5,
              borderRadius: 10,
            },
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <FlatList
              bounces={false}
              data={[...comments].reverse()}
              contentContainerStyle={{
                overflow: 'hidden',
              }}
              onEndReached={() => {}}
              keyboardDismissMode={'on-drag'}
              renderItem={renderCommentsItem}
              onEndReachedThreshold={0}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              updateCellsBatchingPeriod={100}
              ListEmptyComponent={emptyCommentsComponent}
            />

            <View style={{paddingBottom: 20}}>
              <CustomInputs
                placeholder={`Comment as ${userName}`}
                value={comment}
                onChangeText={setComment}
                keyboardType={'default'}
              />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                zIndex: 10000,
                bottom: 45,
                right: 20,
              }}
              onPress={() => {
                postComment(authorId, postId);
              }}>
              <MaterialCommunityIcons name="send" size={20} color={'gray'} />
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  };

  return (
    <>
      <DrawerToolbar name={'Posts'} onPress={createPost} />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={[...posts]?.reverse()}
          contentContainerStyle={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingBottom: 100,
          }}
          onEndReached={() => {}}
          keyboardDismissMode={'on-drag'}
          renderItem={renderPostItem}
          onEndReachedThreshold={0}
          initialNumToRender={15}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
      </View>
    </>
  );
};

export default PostScreen;
