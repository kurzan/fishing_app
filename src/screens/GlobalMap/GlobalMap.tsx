import React, { memo } from 'react';
import Map from '../../components/Map/Map';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button/Button';
import { StyleSheet, Text } from 'react-native';
import { useData } from '../../hooks/useData';

const GlobalMap = () => {
  const navigation = useNavigation<any>();
  const { places } = useData();

  console.log('render')

  return (
    <>
      <Map places={places} style={styles.map} />
      <Button icon='bars' style={styles.button} onPress={() => navigation.goBack()} title="Список"></Button>
    </ >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },

  map: {
    height: "100%"
  },

  button: {
    position: 'absolute',
    zIndex: 999,
    bottom: 32,
    right: 18
  }
})

GlobalMap.whyDidYouRender = true

export default memo(GlobalMap);