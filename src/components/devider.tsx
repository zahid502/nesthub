import {Theme} from '@app-interfaces';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

//----------------------
interface IDeviderProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

//---------------------------------------
const Devider: React.FC<IDeviderProps> = ({
  style,
  color = 'gray',
  size = 0.4,
}) => {
  const styles = useThemeAwareObject(createStyles);
  return (
    <View
      style={[style, {borderBottomWidth: size, borderBottomColor: color}]}
    />
  );
};

export default Devider;

//--------------------------------------
const createStyles = (theme: Theme) => {
  return StyleSheet.create({});
};
