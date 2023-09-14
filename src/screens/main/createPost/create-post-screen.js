import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {DrawerToolbar} from '@components';

import {useDispatch, useSelector} from 'react-redux';
import CustomInputs from '@components/CustomInputs';
import {addPost} from '@services/api-services';

const CreatePostScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {apiUserId, authToken} = useSelector(state => state.auth);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = async () => {
    if (title?.trim() === '') return;
    try {
      const data = await addPost(authToken, apiUserId, title, content);
      navigation.navigate('Posts')
      setContent('');
      setTitle('');
    } catch (error) {
      console.error('Error handling create post API response:', error);
    }
  };

  return (
    <>
      <DrawerToolbar name={'Create Post'} />
      <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
        <CustomInputs
          placeholder={`Title`}
          value={title}
          onChangeText={setTitle}
          keyboardType={'default'}
        />
        <CustomInputs
          placeholder={`Context`}
          value={content}
          onChangeText={setContent}
          keyboardType={'default'}
        />
        <TouchableOpacity
          onPress={createPost}
          style={{
            backgroundColor: 'gray',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text>Create Post</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreatePostScreen;
