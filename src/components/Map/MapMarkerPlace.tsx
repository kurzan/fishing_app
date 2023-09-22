import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Place } from '../../services/types/places';
import { Marker } from 'react-native-yamap';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useData } from '../../hooks/useData';
import { storage } from '../../services/firebase';

type MapMarkerPlace = {
  place: Place,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>
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

  console.log(`images: ${images}`)


  const imageUri = 'https://firebasestorage.googleapis.com/v0/b/fishing-9684f.appspot.com/o/images%2Fmap-markers%2F2151296.png?alt=media&token=327cced7-dcef-4a15-82fe-66f792df8188';


  return (
    <Marker
      onPress={() => setCurrenPlaceId(place._id)}
      key={place._id}

      children={
        <Image
          style={MapStyles.markerImg}
          source={{ uri: images[0] }} />
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