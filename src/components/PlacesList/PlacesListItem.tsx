import React, { FC } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Place } from '../../services/types/places';
import Box from '../Box/Box';
import { useMap } from '../../hooks/useMap';
import { useNavigation } from '@react-navigation/native';

type PlacesListItemProps = {
  place: Place,
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place }) => {

  const { getTarget } = useMap();
  const navigation = useNavigation<any>();

  return (
    <Box onPress={() => navigation.navigate('Place', {
      placeId: place.id
    })}>
      <View style={styles.container} >
        <Image style={styles.placeImg} source={place.thumbnail} />
        <View>
          <Text style={[styles.text, styles.name]}>{place.name}</Text>
          <Text style={[styles.text, styles.type]}>{place.type}</Text>
        </View>
        <View style={styles.coords}>
          <Text style={[styles.text, styles.type]}>{place.coords.lat}</Text>
          <Text style={[styles.text, styles.type]}>{place.coords.lon}</Text>
        </View>
      </View>
    </Box>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '90%',
    height: 80,
    color: 'white',
  },

  text: {
    color: "white",

  },

  placeImg: {
    width: 50,
    height: 50,
    borderRadius: 18
  },

  name: {
    fontSize: 22,
  },

  type: {
    color: '#828284',
  },

  coords: {
    marginLeft: 'auto',
  }
})

export default PlacesListItem;
