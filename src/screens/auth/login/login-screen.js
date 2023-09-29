import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';
import CustomInputs from '../../../components/CustomInputs';
import CustomButton from '../../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  setApiUserId,
  setAuthToken,
  setUserData,
} from '../../../redux/slices/auth/auth-slice';
import styles from './style';
import {login} from '@services/api-services';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('zk82729@gmail.com');
  const [password, setPassword] = useState('Zahid#987');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApiResponse = async user => {
    try {
      const data = await login(user, password);
      if (data?.message == 'User is logged in.') {
        dispatch(setAuthToken(data?.token));
        dispatch(setApiUserId(data?.user?._id));
      }
    } catch (error) {
      console.error('Error handling API response:', error);
    }
  };

  const handleLogin = () => {
    let valid = true;

    if (email === '' || password === '') {
      setError(' Please enter email and password');
      valid = false;
    } else {
      setError('');
    }

    if (valid) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          handleApiResponse(user);
          const userRef = database().ref(`users/${user?.user?.uid}`);
          userRef.once('value', snapshot => {
            const data = {
              email: snapshot.child('email').val(),
              name: snapshot.child('name').val(),
              profileImage: snapshot.child('profileImage').val(),
              uid: snapshot.child('uid').val(),
            };
            dispatch(setUserData(data));
            setIsLoading(false);
            setEmail('');
            setPassword('');
          });
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('Email address is invalid!');
          }

          if (error.code === 'auth/user-not-found') {
            setError('Wrong Email');
          }

          if (error.code === 'auth/wrong-password') {
            setError('Wrong Password!');
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{minHeight: '100%'}}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logoImg}
          />
        </View>

        <View style={styles.formContainer}>
          <CustomInputs
            placeholder={'Email'}
            onChangeText={setEmail}
            value={email}
            keyboardType={'default'}
            iconName={'mail'}
            inputType={'email'}
          />

          <CustomInputs
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            keyboardType={'default'}
            secureTextEntry={true}
            iconName={'lock-closed'}
          />
          {error ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
              }}>
              {error}
            </Text>
          ) : null}
          <CustomButton label={'Login'} onPress={handleLogin} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Are you a new user? </Text>
            <Text
              style={styles.signupLinkText}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#3C73E9" />
          <Text style={{marginTop: 10}}>Loading...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
