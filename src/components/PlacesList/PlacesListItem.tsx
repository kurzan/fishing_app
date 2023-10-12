import React, { FC, useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Alert, Modal } from 'react-native';
import { Place } from '../../services/types/places';
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
import { Icon } from '@ant-design/react-native';
import PlaceName from './PlaceName';
import Button from '../Button/Button';
import { deleteHandler } from '../../services/utils';
import { useNavigation } from '@react-navigation/native';

moment.locale('ru')


type PlacesListItemProps = {
  place: Place,
  isOwner?: boolean
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place, isOwner }) => {

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation<any>();

  const seeMoreHandler = () => {
    handleClosePress();
    navigation.navigate('Place', {
      placeId: place._id
    })
  }

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const onMoreHandler = () => {
    setBottimSheetIndex(0)
  };

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const { themeStyles } = useTheme();
  const { users, currentUser: loginUser, delPlace } = useData();

  const currentUser = users.find(user => user._id === place.ownerId);
  const showCoords = currentUser?._id === loginUser?._id;
  const imageListRef = ref(storage, `images/places/${place._id}/users/${currentUser?._id}`);

  const goEditPlace = () => {
    handleClosePress();
    navigation.navigate('AddPlace', {
      placeId: place._id
    });
  };

  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(item => {
          setImages((prevState) => [...prevState, item])
        })
      })
    })
  }, []);

  const deletePlaceHandler = () => {
    deleteHandler(() => delPlace(place._id).then(() => handleClosePress()))
  };

  console.log('render place item');


  return (
    <View style={styles.container} >

      <Padding>

        <View style={styles.header}>
          {!isOwner && <Avatar user={currentUser} />}
          {isOwner && <Icon style={{ marginRight: 8 }} name='environment' />}
          <View>
            {!isOwner && <Text style={[themeStyles.color, styles.userName]}>{currentUser?.name.trim()}</Text>}
            {place.coords.isVisible && <PlaceName style={[themeStyles.color, styles.name]} placeName={place.name.trim()} placeId={place._id} />}
            {!place.coords.isVisible && showCoords && <PlaceName style={[themeStyles.color, styles.name]} placeName={place.name.trim()} placeId={place._id} />}
            {!place.coords.isVisible && showCoords && <Text style={[themeStyles.color, themeStyles.greyText]}>Координаты видны только вам</Text>}
            {!place.isVisible && <Text style={[themeStyles.color, themeStyles.greyText]}>Не видно в ленте</Text>}
          </View>
          <TouchableOpacity style={styles.options} onPress={onMoreHandler}>
            <MoreIcon fill={themeStyles.color.color} />
          </TouchableOpacity>
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
            <Padding>
              {showCoords ? (
                <>
                  <Button icon='edit' title='Редактировать' onPress={goEditPlace} />
                  <Button style={{ backgroundColor: themeStyles.error.color }} icon='delete' onPress={deletePlaceHandler} title='Удалить' />
                </>
              )
                :
                (
                  <Button icon='info-circle' title='Подробнее' onPress={seeMoreHandler} />
                )}
            </Padding>
          </BottomSheetView>
        </BottomSheet>
      </Portal>

    </View>
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

export default memo(PlacesListItem);
