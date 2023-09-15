import React, { useState, useEffect } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Text, StyleSheet } from 'react-native';
import Input from '../../components/Input/Input';
import Map from '../../components/Map/Map';
import { useMap } from '../../hooks/useMap';
import AddPhotos from '../../components/AddPhotos/AddPhotos';


const AddPlace = () => {

  const { coords } = useMap();

  return (
    <LayoutScreen isScrollView={false}>

      <Input placeholder='Название точки' />
      <Map height={'30%'} zoom={12} visiblePlaces={false} style={styles.map} />
      <Input keyboardType="numeric" placeholder='Широта' value={coords?.lat.toString()} />
      <Input keyboardType="numeric" placeholder='Долгота' value={coords?.lon.toString()} />
      <AddPhotos />

      <Input placeholder='Сообщение' />
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  map: {

  }
})

export default AddPlace;