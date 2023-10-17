import React, { useState, memo, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

const MapMarker = () => {

  const [initialrender, setInitialRender] = useState(true);

  const initialRenderHandler = () => {
    setInitialRender(false)
  }

  const imgSource = require('../../images/hud/float.png');

  console.log('merker');


  return (
    <Image resizeMode="cover"
      onLoad={initialRenderHandler}
      key={`${initialrender}`}
      resizeMethod="resize"
      style={MapStyles.marker}
      source={imgSource} />
  );
}

export const MapStyles = StyleSheet.create({
  marker: {
    width: 60,
    height: 60,
  },
})

export default MapMarker;