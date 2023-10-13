import React, { FC, useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Alert, Modal } from 'react-native';
import { Place } from '../../services/types/places';
import Avatar from '../Avatar/Avatar';
import { useData } from '../../hooks/useData';
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
import ImagesCarousele from '../ImagesCarousel/ImageCarousele';

moment.locale('ru')


type PlacesListItemProps = {
  place: Place,
  isOwner?: boolean
}

const PlacesListItem: FC<PlacesListItemProps> = ({ place, isOwner }) => {

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

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

  const goEditPlace = () => {
    handleClosePress();
    navigation.navigate('EditPlace', {
      placeId: place._id
    });
  };

  const deletePlaceHandler = () => {
    deleteHandler(() => delPlace(place._id).then(() => handleClosePress()))
  };

  return (
    <View style={styles.container} >

      <Padding>

        <View style={styles.header}>
          {!isOwner && <Avatar user={currentUser} />}
          {isOwner && <Icon style={styles.placeIcon} size={32} name='environment' />}
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
        place.images.length > 0 ? (
          // <View style={styles.imagContainer}>
          //   <Image style={styles.placeImg} source={{ uri: place.images[0] }} resizeMode="cover"
          //     resizeMethod="resize" />
          // </View>
          <ImagesCarousele images={place.images} />

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
    paddingBottom: 32,
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

  placeIcon: { marginRight: 8 },

  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8
  },

  options: {
    height: 34,
    width: 34,
    alignItems: 'flex-end',
    justifyContent: 'center',
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

});


export default memo(PlacesListItem);
