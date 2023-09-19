import React, { SetStateAction, Dispatch } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker } from 'react-native-yamap';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>
}

const MapMarkerPlace = ({ place, setCurrenPlaceId }: MapMarkerPlace) => {

  return (
    <Marker
      onPress={() => setCurrenPlaceId(place._id)}
      key={place._id}
      children={
        <Image
          style={MapStyles.markerImg}
          source={{ uri: place.images[0] }} />
      }
      point={{
        lat: place.coords._long,
        lon: place.coords._lat
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