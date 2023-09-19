import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import PlacesListItem from './PlacesListItem';
import Title from '../Title/Title';
import { useData } from '../../hooks/useData';
import DeviceInfo from 'react-native-device-info';

type PlacesListProps = {
  title?: string
};

const PlacesList = ({ title = 'Водоемы' }: PlacesListProps) => {

  const { places } = useData();

  DeviceInfo.getUniqueId().then((uniqueId) => {
    // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
    // Android: "dd96dec43fb81c97"
    // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
    console.log(uniqueId)
  })

  return (
    <ScrollView style={styles.container}>
      <Title title={title} />
      <View style={styles.list}>
        {places.map(place => (
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