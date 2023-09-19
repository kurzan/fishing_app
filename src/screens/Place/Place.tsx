import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button/Button';
import { useData } from '../../hooks/useData';

const Place = () => {

  const route = useRoute<any>();
  const navigate = useNavigation();
  const { delPlace } = useData();

  const { placeId } = route.params;

  const handleDelete = (id: string) => {
    delPlace(id);
    navigate.goBack()
  }

  return (
    <>
      <Button onPress={() => navigate.goBack()} title="Назад"></Button>
      <Text>
        Place {placeId}
        <Button onPress={() => handleDelete(placeId)} title='Удалить' />
      </Text>
    </>

  );
}

export default Place;