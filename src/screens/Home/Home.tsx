import React from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';

const Home = () => {

  const navigation = useNavigation<any>();
  const { places, placesIsLoading } = useData();

  const onlyVisibleInList = places.filter(place => place.isVisible);

  if (placesIsLoading) return (
    <LayoutScreen style={styles.container} isScrollView={false}>
      <ActivityIndicator size="large" />
    </LayoutScreen>
  )

  return (
    <>
      <Heading withLogo />
      <LayoutScreen isScrollView={false}>
        <PlacesList title='Лента рыбалок' places={onlyVisibleInList} />
      </LayoutScreen>
      <Button icon='environment' style={styles.button} onPress={() => navigation.navigate('GlobalMap')} title='На карте' />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    zIndex: 999,
    bottom: 32,
    right: 18
  },
});

export default Home;