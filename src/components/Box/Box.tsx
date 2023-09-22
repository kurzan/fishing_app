import React, { PropsWithChildren, memo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Padding from '../Padding/Padding';
import { useTheme } from '../../hooks/useTheme';

type BoxProps = {
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
  touchable?: boolean
}

const Box = ({ children, style, onPress, touchable = true }: PropsWithChildren<BoxProps>) => {

  const { themeStyles } = useTheme();

  return (
    <View style={[styles.container, themeStyles.backgroundColor, style]}>
      {touchable ?
        (<TouchableOpacity onPress={onPress} >
          {children}
        </TouchableOpacity>)
        :
        (children)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  }
});

export default memo(Box);