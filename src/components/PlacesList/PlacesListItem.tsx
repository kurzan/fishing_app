import React, { FC } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Place } from '../../services/types/places';
import Box from '../Box/Box';
import { useMap } from '../../hooks/useMap';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../Avatar/Avatar';
import moment from 'moment';

type PlacesListItemProps = {
  place: Place,
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place }) => {

  const navigation = useNavigation<any>();

  moment.locale('ru')
  const createDate = moment(place.createdAt).calendar()

  return (
    <Box onPress={() => navigation.navigate('Place', {
      placeId: place.id
    })}>
      <View style={styles.container} >

        <View style={styles.header}>
          <Avatar name={place.user} />
          <View>
            <Text style={[styles.text]}>{place.user}</Text>
            <Text style={[styles.text]}>{createDate}</Text>
          </View>
        </View>


        <Image style={styles.placeImg} source={{ uri: place.thumbnail }} />
        <View>
          <Text style={[styles.text, styles.name]}>{place.name}</Text>
          <View style={styles.coords}>
            <Text style={[styles.text, styles.type]}>{place.coords.lat}</Text>
            <Text style={[styles.text, styles.type]}>{place.coords.lon}</Text>
          </View>
        </View>

      </View>
    </Box>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    gap: 15,
    color: 'white',
  },

  text: {
    color: "white",

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  placeImg: {
    width: '100%',
    height: 200,
    borderRadius: 18
  },

  name: {
    fontSize: 22,
  },

  type: {
    color: '#828284',
  },

  coords: {
    gap: 14,
    flexDirection: 'row'
  }
})

export default PlacesListItem;
