import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Text } from 'react-native';
import Button from '../../components/Button/Button';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';
import SimpleMap from '../../components/Map/SimpleMap';

const Place = () => {

  const route = useRoute<any>();
  const navigate = useNavigation();
  const { delPlace, places } = useData();

  const { placeId } = route.params;

  const currentPlace = places.find(place => place._id === placeId);

  const handleDelete = (id: string) => {
    Alert.alert('Подтвердите удаление', 'Вы дейсвтильно хотите удалить?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Удалить', onPress: () => {
          delPlace(id);
          navigate.goBack();
        }
      },
    ]);

  }

  return (
    <>
      <Heading />
      <Button onPress={() => navigate.goBack()} title="Назад"></Button>
      <Text>
        Place {placeId}
        <Button onPress={() => handleDelete(placeId)} title='Удалить' />
      </Text>
      <SimpleMap initialCoords={currentPlace?.coords} />
    </>

  );
}

export default Place;