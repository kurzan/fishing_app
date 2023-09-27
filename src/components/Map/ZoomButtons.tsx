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
    flex: 1
  },

  plus: {
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 0.3
  }

})


export default ZoomButtons;
