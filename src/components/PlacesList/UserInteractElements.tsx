
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Place, User } from '../../services/types/places';
import { useData } from '../../hooks/useData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';
import { CommentIcon, FullfiledHeartIcon, HeartIcon } from '../Icons';
import Comments from '../Comments/Comments';


type UserInteractElementsProps = {
  place: Place,
}

const UserInteractElements = ({ place }: UserInteractElementsProps) => {

  const { themeStyles, } = useTheme();

  const { postLikesHandler, currentUser } = useData();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%"], []);

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

  const alredyLike = currentUser && place.likes && place.likes.includes(currentUser.docId);

  const onLikeHandler = () => {

    if (!currentUser) return

    if (alredyLike) {
      postLikesHandler('delete', place._id, currentUser.docId);
    } else {
      postLikesHandler('add', place._id, currentUser.docId);
    }
  };

  console.log('user ' + currentUser?._id)
  console.log('place ' + place._id);



  const onCommentsHandler = () => {
    setBottimSheetIndex(0)
  };

  return (
    <>
      <View style={styles.usersInteract}>
        <Pressable onPress={onLikeHandler} style={styles.icon}>
          {alredyLike ? <FullfiledHeartIcon fill='red' /> : <HeartIcon fill={themeStyles.color.color} />}
          {likesCount > 0 && <Text style={[themeStyles.color, styles.countText]}>{likesCount}</Text>}
        </Pressable>

        <Pressable onPress={onCommentsHandler} style={styles.icon}>
          <CommentIcon fill={themeStyles.color.color} />
          {commentsCount > 0 && <Text style={[themeStyles.color, styles.countText]}>{commentsCount}</Text>}
        </Pressable>
      </View>

      <Portal>
        <BottomSheet
          index={bottomSheetIndex}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
        >
          <BottomSheetView style={styles.bottom}>
            <Comments placeId={place._id} comments={place.comments} />
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
    gap: 22
  },

  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  countText: {
    fontSize: 14
  },

  bottom: {
    flex: 1,
    gap: 12,
    paddingBottom: 30,

  },

});


export default UserInteractElements;