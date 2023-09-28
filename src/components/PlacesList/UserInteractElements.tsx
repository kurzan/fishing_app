
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '../../hooks/useTheme';
import { Place, User } from '../../services/types/places';
import { useData } from '../../hooks/useData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';
import Input from '../Input/Input';
import Padding from '../Padding/Padding';
import { CommentIcon, HeartIcon } from '../Icons';


type UserInteractElementsProps = {
  place: Place,
}

const UserInteractElements = ({ place }: UserInteractElementsProps) => {

  const { themeStyles } = useTheme();

  const { postLikesHandler, currentUser } = useData();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  const likesCount = place.likes?.length || 0;
  const commentsCount = place.comments?.length || 0;

  const onLikeHandler = () => {

    if (place.likes && place.likes.includes(currentUser._id)) {
      postLikesHandler('delete', place._id, currentUser._id);
    } else {
      postLikesHandler('add', place._id, currentUser._id);
    }
  };


  const onCommentsHandler = () => {
    setBottimSheetIndex(0)
  };

  return (
    <>
      <View style={styles.usersInteract}>

        <View style={styles.likes}>
          <TouchableHighlight onPress={onLikeHandler}>
            <HeartIcon fill={themeStyles.color.color} />
          </TouchableHighlight>
          <Text style={[themeStyles.color]}>{likesCount}</Text>
        </View>

        <View style={styles.comments}>
          <TouchableHighlight onPress={onCommentsHandler}>
            <CommentIcon fill={themeStyles.color.color} />
          </TouchableHighlight>
          <Text style={[themeStyles.color]}>{commentsCount}</Text>
        </View>

      </View>

      <Portal>
        <BottomSheet
          index={bottomSheetIndex}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
        >
          <BottomSheetView>
            {commentsCount <= 0 ? (
              <Padding>
                <Text>Комментариев пока нет</Text>
                <Input placeholder='Оставьте комментарий' />
              </Padding>
            ) :
              (
                <Text>Тут будут комментарии</Text>
              )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>

  );
}

const styles = StyleSheet.create({

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

});


export default UserInteractElements;