import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../hooks/useData';
import PlaceInfo from '../PlaceInfo/PlaceInfo';
import { useTheme } from '../../hooks/useTheme';

type MapPlacePreviewProps = {
  currentPlaceId: string,
  setCurrenPlaceId: Dispatch<SetStateAction<null | string>>
}

const MapPlacePrewiev = ({ currentPlaceId, setCurrenPlaceId }: MapPlacePreviewProps) => {

  const { places } = useData();
  const { themeStyles } = useTheme();

  const currentPlace = places.find(place => place._id === currentPlaceId) || null;

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>
      <PlaceInfo currentPlace={currentPlace} />
      <Image style={styles.image} source={{ uri: currentPlace?.images[0] }} />


      <Button title='Отмена' onPress={() => setCurrenPlaceId(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    zIndex: 1000
  },
  text: {
    color: 'white'
  },
  image: {
    height: '60%',
    width: '100%'
  }
})

export default MapPlacePrewiev;