import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from '../../../components/CustomInputs';
import CustomButton from '../../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from './style';
import {signup} from '@services/api-services';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signupUser = user => {
    const usersRef = database().ref(`users/${user?.user?.uid}`);
    usersRef
      .set({
        name: name,
        email: email,
        uid: user?.user?.uid,
        profileImage: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
      })
      .then(() => {
        signupApiCall(user, name, password);
        console.log('Data set.');
      });
  };

  const signupApiCall = async (user, name, password) => {
    try {
      const data = await signup(user, name, password);
      if (data?.status === 200) {
        setIsLoading(false);
        navigation.navigate('OtpVerification', email);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error handling get comments API response:', error);
    }
  };

  const handleSignup = () => {
    let valid = true;

    if (name === '' || email === '' || password === '') {
      setError('Please fill all required fields');
      valid = false;
    } else if (!email.includes('@')) {
      setError('Invalid Email');
      valid = false;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}/.test(
        password,
      )
    ) {
      setError(
        'Password must be 8 to 16 characters and include at least one uppercase, one lowercase, one number, and one special character.',
      );
      valid = false;
    } else {
      setError('');
    }

    if (valid) {
      setIsLoading(true);

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          signupUser(user);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
          console.error(error);
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
            placeholder={'Name'}
            onChangeText={setName}
            value={name}
            keyboardType={'default'}
            iconName={'person'}
            inputMode={'text'}
          />

          <CustomInputs
            placeholder={'Email'}
            onChangeText={setEmail}
            value={email}
            keyboardType={'default'}
            iconName={'mail'}
            inputMode={'email'}
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
                textAlign: 'justify',
              }}>
              {error}
            </Text>
          ) : null}
          <CustomButton label={'Sign up'} onPress={handleSignup} />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Already a user? </Text>
            <Text
              style={styles.signupLinkText}
              onPress={() => navigation.navigate('Login')}>
              Login
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

export default SignupScreen;
