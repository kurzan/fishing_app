import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Padding from '../Padding/Padding';

type BoxProps = {
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
  touchable?: boolean
}

const Box = ({ children, style, onPress, touchable = true }: PropsWithChildren<BoxProps>) => {
  return (

    <View style={[styles.container, style]}>

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
    backgroundColor: '#1c1c1e',
    borderRadius: 24,
  }
});

export default Box;