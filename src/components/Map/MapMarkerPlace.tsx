import React, { SetStateAction, Dispatch, useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker } from 'react-native-yamap';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useData } from '../../hooks/useData';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>,
  imageURI?: string,
}

const MapMarkerPlace = ({ place, setCurrenPlaceId }: MapMarkerPlace) => {

  const [images, setImages] = useState<string[]>([]);
  const { users } = useData();

  const currentUser = users.find(user => user._id === place.ownerId);
  const imageListRef = ref(storage, `images/places/${place._id}/users/${currentUser?._id}`);

  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(item => {
          setImages((prevState) => [...prevState, item])
        })
      })
    })
  }, [users])


  return (
    <Marker
      onPress={() => setCurrenPlaceId(place._id)}
      key={place._id}
      children={
        <Image
          style={MapStyles.markerImg}
          source={require('../../images/hud/place.png')} />
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


export default MapMarkerPlace;