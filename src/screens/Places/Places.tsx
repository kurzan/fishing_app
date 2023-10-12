import React, { memo, useMemo } from 'react';
import { Text, View, StyleSheet } from "react-native";
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import { useData } from '../../hooks/useData';
import Heading from '../../components/Heading/Heading';
import { PlacesIcon } from '../../components/Icons';
import { useTheme } from '../../hooks/useTheme';

const Places = () => {

  const { places, currentUser } = useData();
  const { themeStyles } = useTheme();

  const currentPlaces = places.filter(place => place.ownerId === currentUser?._id)

  console.log('render Places')

  return (
    <>
      <Heading title='Мои рыбалки' />
      <LayoutScreen isScrollView={false}>
        {currentPlaces.length ? <PlacesList isOwner={true} title='Мои места' places={currentPlaces} /> : (
          <View style={styles.noPlaces}>
            <PlacesIcon fill={themeStyles.color.color} />
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

export default memo(Places);