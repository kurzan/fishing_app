import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

type ZoomButtonsProps = {
  zoomIn: any,
  zoomOut: any
}

const ZoomButtons = ({ zoomIn, zoomOut }: ZoomButtonsProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={[styles.container, themeStyles.backgroundColor]}>

      <TouchableOpacity onPress={zoomIn} style={[styles.button, styles.plus]}>
      </TouchableOpacity>

      <TouchableOpacity onPress={zoomOut} style={[styles.button, styles.minus]}>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 40,
    borderRadius: 8,
    position: 'relative'
  },

  button: {

  },

  minus: {
    width: 16,
    height: 4,
    left: 8,
    top: 14,
    position: 'absolute',
    backgroundColor: '#24A2DF'
  },

  plus: {
    width: 16,
    height: 16,
    left: 8,
    top: 40,
    position: 'absolute',
    backgroundColor: '#24A2DF'
  }

})


export default ZoomButtons;
