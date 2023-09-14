import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Ripple from 'react-native-material-ripple';

//----------------------
interface IRippleProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  disabled?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleContainerBorderRadius?: number;
  rippleSize?: number;
  rippleFades?: boolean;
  rippleCentered?: boolean;
}

//---------------------------------------
const RippleEffect: React.FC<IRippleProps> = ({
  style = {},
  rippleColor = 'rgb(255, 255, 255)',
  disabled = false,
  children = undefined,
  rippleOpacity = 0.8,
  rippleDuration = 500,
  rippleSize = 0,
  rippleContainerBorderRadius = 6,
  rippleCentered = false,
  rippleFades = true,
  onPress = () => {},
}) => {
  return (
    <Ripple
      style={[style]}
      rippleFades={rippleFades}
      disabled={disabled}
      rippleOpacity={rippleOpacity}
      rippleDuration={rippleDuration}
      rippleSize={rippleSize}
      rippleContainerBorderRadius={rippleContainerBorderRadius}
      rippleCentered={rippleCentered}
      rippleColor={rippleColor}
      onPress={() => onPress && onPress()}>
      {children}
    </Ripple>
  );
};

export default RippleEffect;
