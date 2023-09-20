import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';
import { places } from '../../services/mocks/places';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';

type MapPlacePreviewProps = {
  currentPlaceId: string,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>
}

const MapPlacePrewiev = ({ currentPlaceId, setCurrenPlaceId }: MapPlacePreviewProps) => {

  const currentPlace = places.find(place => place._id === currentPlaceId);

  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: currentPlace?.images[0] }} />
      <Text style={styles.text}>{currentPlace?.name}</Text>
      <Button title='Подробнее' onPress={() => navigation.navigate('Place', {
        placeId: currentPlace?._id
      })} />
      <Button title='Отмена' onPress={() => setCurrenPlaceId(null)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1000
  },
  text: {
    color: 'white'
  },
  image: {
    height: 80,
    width: 80
  }
})

export default MapPlacePrewiev;