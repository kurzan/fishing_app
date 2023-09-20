import React, { FC } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Place } from '../../services/types/places';
import Box from '../Box/Box';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../Avatar/Avatar';
import { useData } from '../../hooks/useData';


type PlacesListItemProps = {
  place: Place,
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place }) => {

  const navigation = useNavigation<any>();

  const { users } = useData();

  const currentUser = users.find(user => user._id === place.ownerId);

  return (
    <Box onPress={() => navigation.navigate('Place', {
      placeId: place._id
    })}>
      <View style={styles.container} >

        <View style={styles.header}>
          <Avatar name={currentUser?.name} />
          <View>
            <Text style={[styles.text]}>{currentUser?.name}</Text>
            <Text style={[styles.text]}>{new Date(place.createdAt.seconds * 1000).toLocaleString('ru')}</Text>
          </View>
        </View>
        {place.images[0] && <Image style={styles.placeImg} source={{ uri: place.images[0] }} />}
        <View>
          <Text style={[styles.text, styles.name]}>{place.name}</Text>
          <Text style={[styles.text]}>{place.message}</Text>
          <View style={styles.coords}>
            <Text style={[styles.text, styles.type]}>{place.coords._lat}</Text>
            <Text style={[styles.text, styles.type]}>{place.coords._long}</Text>
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
