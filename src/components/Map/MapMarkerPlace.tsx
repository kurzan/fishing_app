import React, { useState, SetStateAction, Dispatch } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker, YaMap } from 'react-native-yamap';
import { useNavigation } from '@react-navigation/native';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | number>>
}

const MapMarkerPlace = ({ place, setCurrenPlaceId }: MapMarkerPlace) => {

  const navigation = useNavigation<any>();

  return (
    <Marker
      onPress={() => setCurrenPlaceId(place.id)}
      key={place.id}
      children={
        <Image
          style={MapStyles.markerImg}
          source={{ uri: place.thumbnail }} />
      }
      point={place.coords}
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
    borderRadius: 6,
    borderWidth: 4,
    borderColor: 'black',
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


export default MapMarkerPlace;