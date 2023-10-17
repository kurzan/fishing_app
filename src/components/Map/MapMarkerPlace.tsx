import React, { useState, memo } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Place } from '../../services/types/places';

type MapMarkerPlace = {
  place: Place,
}

const MapMarkerPlace = ({ place }: MapMarkerPlace) => {

  const [initialrender, setInitialRender] = useState(true);

  const initialRenderHandler = () => {
    setInitialRender(false)
  }

  const imgSource = place.images.length > 0 ? { uri: place.images[0] } : require('../../images/full_logo.png');

  console.log('marker place');


  return (
    <Image resizeMode="cover"
      onLoad={initialRenderHandler}
      key={`${initialrender}`}
      resizeMethod="resize"
      style={MapStyles.markerImg}
      source={imgSource} />
  );
}

export const MapStyles = StyleSheet.create({
  markerPlace: {
    width: 80,
    height: 80,
  },

  markerImg: {
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    width: 60,
    height: 60,

  },

  text: {
    width: 80,
    height: 80,
    color: 'white',

  },

  fullInfo: {
    width: 80,
    height: 80,
    borderWidth: 0.1,
  }
})

export default memo(MapMarkerPlace);