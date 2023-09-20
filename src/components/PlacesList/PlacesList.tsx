import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import PlacesListItem from './PlacesListItem';
import Title from '../Title/Title';
import { Place } from '../../services/types/places';

type PlacesListProps = {
  title?: string,
  places: Place[],
};

const PlacesList = ({ title = 'Водоемы', places }: PlacesListProps) => {



  return (
    <ScrollView style={styles.container}>
      <Title title={title} />
      <View style={styles.list}>
        {places && places.map(place => (
          <PlacesListItem key={place._id} place={place} />
        ))}
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