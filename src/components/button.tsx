import {Theme} from '@app-interfaces';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import RippleEffect from './ripple';
import {useTheme} from '@hooks/use-theme';

//----------------------
interface IButtonProps {
  onPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  disabled?: boolean;
}

//----------------------------------------------------------------------------
const Button: React.FC<IButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  textProps,
  disabled = false,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const {theme} = useTheme();

  return (
    <RippleEffect
      rippleColor={theme.color.surface}
      disabled={disabled}
      onPress={() => onPress && onPress()}
      style={[styles.container, style]}>
      <Text {...textProps} style={[styles.title, textStyle]}>
        {title}
      </Text>
    </RippleEffect>
  );
};

export default Button;

//------------------------------------
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: theme.color.primary,
    },
    title: {
      textAlign: 'center',
      color: theme.color.onPrimary,
      fontSize: theme.dimensions.normalFontSize,
    },
  });
