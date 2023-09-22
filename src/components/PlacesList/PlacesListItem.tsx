import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Place } from '../../services/types/places';
import Box from '../Box/Box';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../Avatar/Avatar';
import { useData } from '../../hooks/useData';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '@ant-design/react-native';


type PlacesListItemProps = {
  place: Place,
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place }) => {

  const navigation = useNavigation<any>();
  const { themeStyles } = useTheme();
  const { users } = useData();
  const [images, setImages] = useState<string[]>([]);

  const sfdsf = Number(place.coords._lat).toFixed(3)

  const currentUser = users.find(user => user._id === place.ownerId);

  const imageListRef = ref(storage, `images/places/${place._id}/users/${currentUser?._id}`);

  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(item => {
          setImages((prevState) => [...prevState, item])
        })
      })
    })
  }, [users])

  return (
    <Box onPress={() => navigation.navigate('Place', {
      placeId: place._id
    })}>
      <View style={styles.container} >

        <View style={styles.header}>
          <Avatar name={currentUser?.name} />
          <View>
            <Text style={[themeStyles.color, styles.text]}>{currentUser?.name}</Text>
            <Text style={[themeStyles.color, styles.name]}>{place.name}</Text>
          </View>
        </View>

        {images && <Image style={styles.placeImg} source={{ uri: images[0] }} />}
        <View style={styles.bottom}>

          <View style={styles.usersInteract}>

            <View style={styles.likes}>
              <Icon size='md' name='heart' color='black' />
              <Text style={[themeStyles.color]}>15</Text>
            </View>

            <View style={styles.comments}>
              <Icon size='md' name='message' color='black' />
              <Text style={[themeStyles.color]}>32</Text>
            </View>

          </View>

          <View style={styles.coords}>
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
          </View>

        </View>

        {place.message && <Text style={[themeStyles.color, styles.text]}><Text style={styles.currentName}>{currentUser?.name}</Text> {place.message}</Text>}

        <Text style={[themeStyles.color, styles.text]}>{new Date(place.createdAt.seconds * 1000).toLocaleString('ru')}</Text>
      </View>
    </Box>

  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },

  text: {

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  placeImg: {
    width: '100%',
    minHeight: 200,
    maxHeight: 500
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

  usersInteract: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },

  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },

  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
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
