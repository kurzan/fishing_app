import React, { memo } from 'react';
import Map from '../../components/Map/Map';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useData } from '../../hooks/useData';
import { ToListIcon } from '../../components/Icons';

const GlobalMap = () => {
  const navigation = useNavigation<any>();
  const { onlyVisibleInList } = useData();

  return (
    <>
      <Map places={onlyVisibleInList} style={styles.map} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <ToListIcon />
      </TouchableOpacity>
    </>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24A2DF',
    borderRadius: 100,
    height: 60,
    width: 60,
    position: 'absolute',
    zIndex: 999,
    bottom: 24,
    right: 24
  }
})

GlobalMap.whyDidYouRender = true

export default memo(GlobalMap);