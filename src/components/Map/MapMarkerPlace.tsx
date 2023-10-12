import React, { SetStateAction, Dispatch, useState, memo, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker } from 'react-native-yamap';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>,
  imageURI?: string,
}

const MapMarkerPlace = ({ place, setCurrenPlaceId }: MapMarkerPlace) => {

  const imgSource = place.images.length > 0 ? { uri: place.images[0] } : require('../../images/hud/place.png');

  console.log('markerplace');

  return (
    <Marker
      onPress={() => setCurrenPlaceId(place._id)}
      key={place._id}
      children={
        <Image
          style={MapStyles.markerImg}
          source={imgSource} />
      }
      point={{
        lat: Number(place.coords._lat),
        lon: Number(place.coords._long)
      }}
      zIndex={6}
    />
  );
}

export const MapStyles = StyleSheet.create({
  markerPlace: {
    width: 80,
    height: 80,
  },

  markerImg: {
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