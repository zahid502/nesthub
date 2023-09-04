import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import styles from './style';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => Splash.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/unnamed.png')}
        style={styles.logoImg}
      />
    </View>
  );
};

export default SplashScreen;
