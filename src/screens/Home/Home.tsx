import React, { memo } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';
import { ToMapIcon } from '../../components/Icons';
import { useTheme } from '../../hooks/useTheme';
import Button from '../../components/Button/Button';

const Home = () => {

  const navigation = useNavigation<any>();
  const { onlyVisibleInList, placesIsLoading, users, getAllData } = useData();

  const { themeStyles } = useTheme();

  if (!users.length && !placesIsLoading) return (
    <LayoutScreen style={styles.container} isScrollView={false}>
      <Text style={themeStyles.greyText}>Ошибка. Попробуйте заново.</Text>
      <Button title='Обновить' isLoading={placesIsLoading} disabled={placesIsLoading} icon='reload' onPress={() => getAllData()} />
    </LayoutScreen>
  )

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