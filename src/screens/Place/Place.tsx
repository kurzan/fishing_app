import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useData } from '../../hooks/useData';
import SimpleMap from '../../components/Map/SimpleMap';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '../../hooks/useTheme';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlaceInfo from '../../components/PlaceInfo/PlaceInfo';


const Place = () => {

  const route = useRoute<any>();
  const navigate = useNavigation<any>();
  const { delPlace, places, currentUser } = useData();

  const { themeStyles } = useTheme();

  const { placeId } = route.params;

  const currentPlace = places.find(place => place._id === placeId) || null;
  const isOwner = currentPlace?.ownerId === currentUser?._id;

  const goEditPlace = () => {
    navigate.navigate('EditPlace', {
      placeId: currentPlace?._id
    });
  };


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Icon name='arrow-left' size={30} color={themeStyles.color.color} />
        </TouchableOpacity>

        {isOwner && <TouchableOpacity onPress={goEditPlace}>
          <Icon name='edit' size={30} color={themeStyles.color.color} />
        </TouchableOpacity>}
      </View>

      <LayoutScreen isScrollView={false} style={styles.main}>

        <PlaceInfo currentPlace={currentPlace} />

        <View style={styles.map}>
          <SimpleMap initialCoords={currentPlace?.coords} />
        </View>

      </LayoutScreen>
    </>

  );
}

const styles = StyleSheet.create({
  header: {
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14
  },

  main: {
    gap: 12
  },

  map: {
    flex: 1,
    height: 500,
  },
})

export default Place;