import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MinusIcon, PlusIcon } from '../Icons';

type ZoomButtonsProps = {
  zoomIn: any,
  zoomOut: any
}

const ZoomButtons = ({ zoomIn, zoomOut }: ZoomButtonsProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={[styles.container, themeStyles.hud]}>

      <TouchableOpacity onPress={zoomIn} style={[styles.button]}>
        <PlusIcon />
      </TouchableOpacity>

      <TouchableOpacity onPress={zoomOut} style={[styles.button]}>
        <MinusIcon />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 40,
    borderRadius: 8,
  },

  button: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  minus: {

  },

  plus: {

    borderBottomColor: 'red',
    borderBottomWidth: 0.3
  }

})


export default ZoomButtons;
