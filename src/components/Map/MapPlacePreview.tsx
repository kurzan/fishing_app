import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';
import { places } from '../../services/mocks/places';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';

type MapPlacePreviewProps = {
  currentPlaceId: number,
  setCurrenPlaceId: Dispatch<SetStateAction<null | number>>
}

const MapPlacePrewiev = ({ currentPlaceId, setCurrenPlaceId }: MapPlacePreviewProps) => {

  const currentPlace = places.find(place => place.id === currentPlaceId);

  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: currentPlace?.thumbnail }} />
      <Text style={styles.text}>{currentPlace?.name}</Text>
      <Button title='Подробнее' onPress={() => navigation.navigate('Place', {
        placeId: currentPlace?.id
      })} />
      <Button title='Отмена' onPress={() => setCurrenPlaceId(null)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%'
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