import React from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useData } from '../../hooks/useData';

const Home = () => {

  const navigation = useNavigation<any>();
  const { places } = useData();

  return (
    <>
      <LayoutScreen>
        <PlacesList title='Лента рыбалок' places={places} />
      </LayoutScreen>
      <Button icon='environment' style={styles.button} onPress={() => navigation.navigate('GlobalMap')} title='На карте' />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 999,
    bottom: 32,
    right: 18
  },
})


export default Home;