import React, { FC, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Alert, Modal } from 'react-native';
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
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

moment.locale('ru')


type PlacesListItemProps = {
  place: Place,
  isOwner?: boolean
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place, isOwner }) => {

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const onMoreHandler = () => {
    setBottimSheetIndex(0)
  };


  const navigation = useNavigation<any>();
  const { themeStyles } = useTheme();
  const { users, currentUser: loginUser } = useData();
  const [images, setImages] = useState<string[]>([]);

  const currentUser = users.find(user => user._id === place.ownerId);

  const showCoords = currentUser?._id === loginUser?._id;

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
    // <Box onPress={() => navigation.navigate('Place', {
    //   placeId: place._id
    // })}>

    <View style={styles.container} >

      <Padding>

        <View style={styles.header}>
          {!isOwner && <Avatar user={currentUser} />}
          <View>
            {!isOwner && <Text style={[themeStyles.color, styles.userName]}>{currentUser?.name}</Text>}
            {place.coords.isVisible && < Text style={[themeStyles.color, styles.name]}>{place.name}</Text>}
            {!place.coords.isVisible && showCoords && <Text style={[themeStyles.color, styles.name]}>{place.name}</Text>}
          </View>
          {isOwner && <TouchableOpacity style={styles.options} onPress={onMoreHandler}>
            <MoreIcon fill={themeStyles.color.color} />
          </TouchableOpacity>}
        </View>

      </Padding >
      {
        images.length > 0 ? (
          <View style={styles.imagContainer}>
            <Image style={styles.placeImg} source={{ uri: images[0] }} resizeMode="cover"
              resizeMethod="resize" />
          </View>
        ) : (
          <View style={styles.noPhoto} >
            <Text style={themeStyles.greyText}>Нет фото</Text>
          </View>
        )
      }

      < Padding >
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
          {place.message && <Text style={[themeStyles.color, styles.message]}><Text style={styles.currentName}>{currentUser?.name}</Text> {place.message}</Text>}

          <Text style={[themeStyles.greyText]}>{moment(new Date(place.createdAt.seconds * 1000)).calendar()}</Text>
        </View>

      </Padding >

      <Portal >
        <BottomSheet
          index={bottomSheetIndex}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
          backgroundStyle={themeStyles.bottomSheetHandle}
          handleStyle={themeStyles.bottomSheetHandle}
        >
          <BottomSheetView style={[styles.bottom, themeStyles.bottomSheet]}>

          </BottomSheetView>
        </BottomSheet>
      </Portal>

    </View >
    // </Box >

  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    paddingBottom: 18,
    position: 'relative'
  },

  userName: {
    fontSize: 16,
    fontWeight: '500'
  },

  placeInfo: {
    paddingTop: 6,
    flexDirection: 'row'
  },

  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },

  options: {
    height: 34,
    width: 34,
    alignItems: 'flex-end',
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
  },

  type: {
    color: '#828284',
  },

  coords: {
    gap: 14,
    flexDirection: 'row'
  },

  bottom: {
    paddingTop: 8,
    gap: 6,
  },

  message: {
    fontSize: 16
  },

  currentName: {
    fontWeight: '700',
    fontSize: 16
  },



})

export default PlacesListItem;
