import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Padding from '../Padding/Padding';

type BoxProps = {
  style?: any,
  onPress?: () => void,
}

const Box = ({ children, style, onPress }: PropsWithChildren<BoxProps>) => {
  return (
    <Padding>
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        {children}
      </TouchableOpacity>
    </Padding>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 24,
  }
});

export default Box;