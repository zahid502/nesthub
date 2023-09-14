import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from '../../../components/CustomInputs';
import CustomButton from '../../../components/CustomButton';
import styles from './style';
import {resendOtp, verifyOtp} from '@services/api-services';

const OtpVerificationScreen = ({route, navigation}) => {
  const email = route?.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleApiResponse = async () => {
    try {
      const data = await verifyOtp(email, otp);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error handling API response:', error);
    }
  };

  const sendOtp = () => {
    let valid = true;

    if (otp === '') {
      setError('Please enter otp');
      valid = false;
    } else {
      setError('');
    }
    if (valid) {
      handleApiResponse();
    }
  };

  const resendOtpCall = async () => {
    if (otp?.trim() === '') return;
    try {
      const data = await resendOtp(email);
      Alert.alert(data?.message);
    } catch (error) {
      console.error('Error handling resend otp API response:', error);
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
        <Text style={{alignSelf: 'center', paddingBottom: 2}}>
          An otp has been sent to
        </Text>
        <Text
          style={{alignSelf: 'center', paddingBottom: 20, fontWeight: 'bold'}}>
          {email}
        </Text>
        <View style={styles.formContainer}>
          <CustomInputs
            placeholder={'Enter otp'}
            onChangeText={setOtp}
            value={otp}
            keyboardType={'default'}
            iconName={'shield-checkmark-outline'}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: 'red',
                fontSize: 12,
              }}>
              {error}
            </Text>
            <TouchableOpacity onPress={resendOtpCall}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 14,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                {'Resend otp'}
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            label={'Submit'}
            onPress={sendOtp}
            style={{marginTop: 5}}
          />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.newUserText}>Are you already have otp? </Text>
            <Text
              style={styles.signupLinkText}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;
