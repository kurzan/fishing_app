import React, { SetStateAction, Dispatch } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker } from 'react-native-yamap';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>
}

const MapMarkerPlace = ({ place, setCurrenPlaceId }: MapMarkerPlace) => {

  const imageUri = place.images.length ? place.images[0] : 'https://firebasestorage.googleapis.com/v0/b/fishing-9684f.appspot.com/o/images%2Fmap-markers%2FPond-001.jpg?alt=media&token=25f2db52-e2db-4b5d-8a3d-63f737bc927f';

  return (
    <Marker
      onPress={() => setCurrenPlaceId(place._id)}
      key={place._id}
      children={
        <Image
          style={MapStyles.markerImg}
          source={{ uri: imageUri }} />
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