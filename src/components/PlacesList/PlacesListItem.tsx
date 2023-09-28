import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Place } from '../../services/types/places';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../Avatar/Avatar';
import { useData } from '../../hooks/useData';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';
import Padding from '../Padding/Padding';
import moment from 'moment';
import 'moment/locale/ru';
import UserInteractElements from './UserInteractElements';
import { MoreIcon } from '../Icons';

moment.locale('ru')


type PlacesListItemProps = {
  place: Place,
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place }) => {

  const navigation = useNavigation<any>();
  const { themeStyles } = useTheme();
  const { users } = useData();
  const [images, setImages] = useState<string[]>([]);

  const currentUser = users.find(user => user._id === place.ownerId);

  const imageListRef = ref(storage, `images/places/${place._id}/users/${currentUser?._id}`);

  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        console.log(item)
        getDownloadURL(item).then(item => {
          setImages((prevState) => [...prevState, item])
          console.log(item)
        })
      })
    })
  }, [users])

  return (
    // <Box onPress={() => navigation.navigate('Place', {
    //   placeId: place._id
    // })}>

    <View style={styles.container} >
      <Padding>
        <View style={styles.header}>
          <Avatar name={currentUser?.name} />
          <View>
            <Text style={[themeStyles.color, styles.text]}>{currentUser?.name}</Text>
            <Text style={[themeStyles.color, styles.name]}>{place.name}</Text>
          </View>
          <TouchableOpacity style={styles.options}>
            <MoreIcon fill={themeStyles.color.color} />
          </TouchableOpacity>

        </View>
      </Padding>
      {images.length > 0 ? (
        <View style={styles.imagContainer}>
          <Image style={styles.placeImg} source={{ uri: images[0] }} resizeMode="cover"
            resizeMethod="resize" />
        </View>
      ) : (
        <View style={styles.noPhoto} >
          <Text>Нет фото</Text>
        </View>
      )}

      <Padding>
        <View style={styles.bottom}>

          <UserInteractElements place={place} />

          {/* <View style={styles.coords}>
              {place.coords.isVisible &&
                <>
                  <Text style={[themeStyles.color, styles.text]}>{Number(place.coords._lat).toFixed(6)}</Text>
                  <Text style={[themeStyles.color, styles.text]}>{Number(place.coords._long).toFixed(6)}</Text>
                </>}

              {!place.coords.isVisible && currentUser &&
                <>
                  <Text style={[themeStyles.color, styles.text, styles.type]}>Видите только вы</Text>
                  <Text style={[themeStyles.color, styles.text, styles.type]}>{place.coords._lat.toFixed(2)}</Text>
                  <Text style={[themeStyles.color, styles.text, styles.type]}>{place.coords._long}</Text>
                </>}
            </View> */}

        </View>

        {place.message && <Text style={[themeStyles.color, styles.text]}><Text style={styles.currentName}>{currentUser?.name}</Text> {place.message}</Text>}

        <Text style={[themeStyles.color, styles.text]}>{moment(new Date(place.createdAt.seconds * 1000)).calendar()}</Text>
      </Padding>
    </View>
    // </Box >

  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    paddingBottom: 18
  },

  text: {

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  options: {
    marginLeft: 'auto'
  },

  noPhoto: {
    alignItems: 'center'
  },

  imagContainer: {
    height: 400
  },

  placeImg: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700'
  },

  type: {
    color: '#828284',
  },

  coords: {
    gap: 14,
    flexDirection: 'row'
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  currentName: {
    fontWeight: '700'
  }
})

export default PlacesListItem;
