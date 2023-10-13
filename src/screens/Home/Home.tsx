import React, { memo } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';
import Map from '../../components/Map/Map';
import { ToMapIcon } from '../../components/Icons';

const Home = () => {

  const navigation = useNavigation<any>();
  const { places, placesIsLoading } = useData();

  const onlyVisibleInList = places.filter(place => place.isVisible);

  if (placesIsLoading) return (
    <LayoutScreen style={styles.container} isScrollView={false}>
      <ActivityIndicator size="large" />
    </LayoutScreen>
  )

  console.log('render Home')

  return (
    <>
      <Heading withLogo />
      <LayoutScreen isScrollView={false}>
        <PlacesList title='Лента рыбалок' places={onlyVisibleInList} />
        {places && <Map places={places} hud={false} />}
      </LayoutScreen>

      <TouchableOpacity
        onPress={() => navigation.navigate('GlobalMap')}
        style={styles.button}>
        <ToMapIcon />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
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
  },
});

export default Home;