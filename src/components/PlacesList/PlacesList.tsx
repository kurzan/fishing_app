import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlacesListItem from './PlacesListItem';
import { places as placesMock } from '../../services/mocks/places';
import Title from '../Title/Title';
import { useData } from '../../hooks/useData';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Place } from '../../services/types/places';

type PlacesListProps = {
  title?: string
};

const PlacesList = ({ title = 'Водоемы' }: PlacesListProps) => {

  const [places, setPlaces] = useState(placesMock);

  // useEffect(() => {
  //   const getPlaces = async () => {
  //     const querySnapshot = await getDocs(collection(db, "places"));
  //     const items: Place[] = []
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //       items.push(doc.data() as Place)
  //     });
  //     setPlaces(items)
  //   }
  //   getPlaces();
  // }, [])


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