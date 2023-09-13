import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlacesListItem from './PlacesListItem';
import { places as placesMock } from '../../services/mocks/places';
import Title from '../Title/Title';

type PlacesListProps = {
  title?: string
};

const PlacesList = ({ title = 'Водоемы' }: PlacesListProps) => {

  const [places, setPlaces] = useState(placesMock);

  return (
    <ScrollView style={styles.container}>
      <Title title={title} />
      <View style={styles.list}>
        {places.map(place => (
          <PlacesListItem key={place.id} place={place} />
        ))}
        {/* <Button onPress={() => navigation.navigate('AddPlace')} title='+ Добавить водоем' /> */}
      </View>
    </ScrollView>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    height: '100%',
  },
  list: {
    paddingTop: 12,
    gap: 8
  },
})