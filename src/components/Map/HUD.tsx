import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import ZoomButtons from './ZoomButtons';
import { LocationIcon } from '../Icons';
import { useTheme } from '../../hooks/useTheme';

type HUDProps = {
  zoomIn: () => Promise<void>
  zoomOut: () => Promise<void>
  handleMyPositionPlace: () => void
}

const HUD = ({ zoomIn, zoomOut, handleMyPositionPlace }: HUDProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={styles.hud}>
      <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
      <TouchableOpacity
        onPress={handleMyPositionPlace}
        style={[themeStyles.hud, styles.hudButton]}>
        <LocationIcon />
      </TouchableOpacity>

    </View>
  );
}

export const styles = StyleSheet.create({

  hud: {
    position: 'absolute',
    gap: 12,
    zIndex: 2,
    justifyContent: 'space-evenly',
    bottom: 2,
    left: 8
  },

  hudButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
})

export default HUD;