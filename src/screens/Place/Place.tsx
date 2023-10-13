import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useData } from '../../hooks/useData';
import SimpleMap from '../../components/Map/SimpleMap';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '../../hooks/useTheme';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import Padding from '../../components/Padding/Padding';
import Clipboard from '@react-native-community/clipboard';

const Place = () => {

  const route = useRoute<any>();
  const navigate = useNavigation<any>();
  const { delPlace, places, currentUser } = useData();

  const { themeStyles } = useTheme();

  const { placeId } = route.params;

  const currentPlace = places.find(place => place._id === placeId);
  const isOwner = currentPlace?.ownerId === currentUser?._id;

  const copyCoordHandler = () => {
    if (!currentPlace) return

    Clipboard.setString(`${currentPlace.coords._lat}, ${currentPlace.coords._long}`);
  }

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

        <Padding style={styles.info}>
          <View style={styles.placeTitleView}>
            <Icon style={styles.placeIcon} name='environment' />
            <Text style={[themeStyles.color, styles.placeTitle]}>{currentPlace?.name}</Text>
          </View>

          <View style={styles.coords}>
            <Text style={[themeStyles.greyText]}>{Number(currentPlace?.coords._lat).toFixed(6)}</Text>
            <Text style={[themeStyles.greyText]}>{Number(currentPlace?.coords._long).toFixed(6)}</Text>

            <TouchableOpacity onPress={copyCoordHandler}>
              <Icon name='copy' color={'grey'} size={18} />
            </TouchableOpacity>

          </View>
        </Padding>

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

  info: {
    gap: 6
  },

  map: {
    flex: 1,
    height: 500,
  },

  placeIcon: { marginRight: 8 },

  placeTitleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  placeTitle: {
    fontSize: 20,
    fontWeight: '500'
  },

  coords: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default Place;