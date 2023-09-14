import {colors} from '@constants';
import {useTheme} from '@hooks/use-theme';
import React, {useState} from 'react';
import {Image, ImageRequireSource, ImageStyle, StyleSheet} from 'react-native';

//----------------------
interface IAvatarProps {
  uri?: string | null;
  size?: number;
  style?: ImageStyle;
}

//-----------------------------------
// placeholder profile/avatar picture
const profilePlaceHolder = require('../assets/images/profile.png');

//---------------------------------------------------------------------
const Avatar: React.FC<IAvatarProps> = ({uri, style, size = 55}) => {
  
  const styles = createStyles(size);
  const {theme} = useTheme();
  const [imageUri, setImageUri] = useState<ImageRequireSource | {uri: string}>(
    uri && uri !== null ? {uri} : profilePlaceHolder,
  );

  // replace the uri with placeholder on error
  const updateUriOnError = () => setImageUri(profilePlaceHolder);

  return (
    <Image
      source={imageUri}
      onError={updateUriOnError}
      style={[style, styles.avatar, {borderColor: theme.color.surfaceBorder}]}
    />
  );
};

export default Avatar;

//------------------------------------
const createStyles = (size: number) =>
  StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderWidth: 0.5,
      borderRadius: size,
      backgroundColor: colors.white,
      borderColor: colors.gray,
    },
  });
