import axios from 'axios';
import {Platform} from 'react-native';
import SessionService from './session-service';

export const baseUrl =
  'https://us-central1-telecare2-824e0.cloudfunctions.net/myFunction/api/';

export const login = async (user, password) => {
  try {
    let response = await axios({
      method: 'post',
      url: `${baseUrl}login`,
      data: {
        email: user?.user?.email,
        password: password,
        deviceType: Platform.OS,
        firebase_uid: user?.user?.uid,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error;
  }
};

//................................................................
export const signup = async (user, name, password) => {
  try {
    let res = await axios({
      method: 'POST',
      url: `${baseUrl}signup`,
      data: {
        firebase_uid: user?.user?.uid,
        name: name,
        email: user?.user?.email,
        password: password,
        profileImage: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
        // deviceType: Platform.OS,
      },
    });
    return res;
  } catch (error) {
    console.error('Error occurred during signup:', error);
    return error;
  }
};

//................................................................
export const verifyOtp = async (email, otp) => {
  try {
    let response = await axios({
      method: 'POST',
      url: `${baseUrl}verifyEmailOTP`,
      data: {
        email: email,
        otp: otp,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error occurred during otp:', error);
    throw error;
  }
};

//................................................................
export const resendOtp = async email => {
  try {
    let response = await axios({
      method: 'POST',
      url: `${baseUrl}resendOTP`,
      data: {
        email: email,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error occurred during otp resend:', error);
    throw error;
  }
};

//................................................................
export const addPostItem = async (token, autherId, title, content) => {
  try {
    const apiUrl = `${baseUrl}createPost`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      authorId: autherId,
      title: title,
      content: content,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        console.log(responseData?.data, 'add post api response');
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...add post', error);
  }
};

//................................................................
export const fetchAllPosts = async (token, apiUserId) => {
  try {
    const apiUrl = `${baseUrl}allPosts`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const res = await axios
      .get(apiUrl, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...post', error);
  }
};

//................................................................
export const fetchAllComments = async (token, autherId, postId) => {
  try {
    const apiUrl = `${baseUrl}allCommentOnPost`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      postId: postId,
      authorId: autherId,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...get comments', error);
  }
};

//................................................................
export const addComment = async (token, autherId, postId, comment) => {
  try {
    const apiUrl = `${baseUrl}commentOnPost`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      postId: postId,
      authorId: autherId,
      comment: comment,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        console.log(responseData?.data, 'add comment api response');
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...add comment', error);
  }
};

//................................................................
export const fetchAllUsers = async (token, userApiId) => {
  try {
    const apiUrl = `${baseUrl}allUsers`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      id: userApiId,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...all users', error);
  }
};

//................................................................
export const likePost = async (token, authorId, postId, likeType) => {
  try {
    const apiUrl = `${baseUrl}likeOnPost`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      postId: postId,
      authorId: authorId,
      likeType: likeType,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:...like post', error);
  }
};

//................................................................
export const fetchfriendsList = async (token, myId) => {
  try {
    const apiUrl = `${baseUrl}friendList`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      myId: myId,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:... friends List', error);
  }
};

//................................................................
export const friendRequest = async (token, myId, isMyReq) => {
  // isMyReq: true means i have sent the request
  // isMyReq: false means i have received the request
  try {
    const apiUrl = `${baseUrl}friendReqs`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      myId: myId,
      isMyReq: isMyReq.toString(),
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:... friend Request', error);
  }
};

//................................................................
export const reactFriendRequest = async (
  token,
  myId,
  friendReqId,
  reaction,
  friendId,
) => {
  try {
    const apiUrl = `${baseUrl}reactFriendReq`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      myId: myId,
      friendReqId: friendReqId,
      reaction: reaction,
      friendId: friendId,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:... react Friend Request', error);
  }
};

//................................................................
export const addFriendRequest = async (token, myId, friendId) => {
  try {
    const apiUrl = `${baseUrl}addFriendReq`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    const data = {
      myId: myId,
      friendId: friendId,
    };
    const res = await axios
      .post(apiUrl, data, {
        headers,
      })
      .then(responseData => {
        return responseData?.data;
      })
      .catch(err => {
        console.log(err, 'err');
      });
    return res;
  } catch (error) {
    console.error('Error:... add Friend Request', error);
  }
};
