import React, { useState } from 'react';
import Map from '../../components/Map/Map';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button/Button';
import { StyleSheet, Text } from 'react-native';

const GlobalMap = () => {

  const navigation = useNavigation<any>();

  return (
    <LayoutScreen isScrollView={false}>
      <Map />
      <Button style={styles.button} onPress={() => navigation.goBack()} title="Список"></Button>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 999,
    bottom: 32,
    right: 18
  }
})

export default GlobalMap;