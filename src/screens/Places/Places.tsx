import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';
import { PlacesIcon } from '../../components/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Places = () => {

  const { places } = useData();
  const { currentUser } = useAuth();
  const { themeStyles } = useTheme();
  const currentPlaces = places.filter(place => place.ownerId === currentUser._id);

  console.log(currentUser);


  return (
    <>
      <Heading title='Мои рыбалки' />
      <LayoutScreen isScrollView={false}>
        {currentPlaces.length ? <PlacesList title='Мои места' places={currentPlaces} /> : (
          <View style={styles.noPlaces}>
            <PlacesIcon fill={themeStyles.color.color} height={150} width={150} />
            <Text style={[themeStyles.color, styles.text]}>Рыбалок пока нет</Text>
          </View>
        )}
      </LayoutScreen>
    </>
  );
}

const styles = StyleSheet.create({
  noPlaces: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  text: {
    fontSize: 24
  }
});

export default Places;