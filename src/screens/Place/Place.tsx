import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button/Button';

const Place = () => {

  const route = useRoute<any>();
  const navigate = useNavigation()

  const { placeId } = route.params;

  return (
    <>
      <Button onPress={() => navigate.goBack()} title="Назад"></Button>
      <Text>
        Place {placeId}
      </Text>
    </>

  );
}

export default Place;