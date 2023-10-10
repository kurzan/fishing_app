
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Pressable, Modal, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Comment, Like, Place, User } from '../../services/types/places';
import { useData } from '../../hooks/useData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';
import { CommentIcon, FullfiledHeartIcon, HeartIcon } from '../Icons';
import Comments from '../Comments/Comments';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';


type UserInteractElementsProps = {
  place: Place,
}

const UserInteractElements = ({ place }: UserInteractElementsProps) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);

  const { themeStyles, } = useTheme();

  const { postLikesHandler, currentUser } = useData();

  const navivagtion = useNavigation<any>();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  const likesCount = likes?.length || 0;
  const commentsCount = comments?.length || 0;

  const alredyLike = likes.find(like => like.byUser === currentUser?._id);

  const routeToAuth = () => navivagtion.navigate('Auth');

  const onLikeHandler = () => {

    if (!currentUser) {
      routeToAuth();
    } else {
      postLikesHandler(alredyLike ? 'delete' : 'add', place._id, currentUser._id, alredyLike ? alredyLike._id : '');
    }
  };

  const onCommentsHandler = () => {
    setBottimSheetIndex(0)
  };

  useEffect(() => {
    const commentsQuery = query(collection(db, "commentsPlaces"), where("toPlace", "==", place._id));
    const LikesQuery = query(collection(db, "likesPlaces"), where("toPlace", "==", place._id));

    const unsubscribeComments = onSnapshot(commentsQuery, (querySnapshot) => {
      const comments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        comments.push({
          _id: doc.id,
          ...doc.data()
        } as Comment);
      });

      setComments(comments);
    });

    const unsubscribeLikes = onSnapshot(LikesQuery, (querySnapshot) => {
      const likes: Like[] = [];
      querySnapshot.forEach((doc) => {
        likes.push({
          _id: doc.id,
          ...doc.data()
        } as Like);
      });

      setLikes(likes);
    });


    return () => {
      unsubscribeComments();
      unsubscribeLikes();
    }

  }, [])


  useEffect(() => {
    console.log(likes);
    console.log(currentUser?._id);


  }, [likes, currentUser?._id])


  return (
    <>
      <View style={styles.usersInteract}>
        <TouchableOpacity onPress={onLikeHandler} style={styles.icon}>
          {alredyLike ? <FullfiledHeartIcon fill='red' /> : <HeartIcon fill={themeStyles.color.color} />}
          {likesCount > 0 && <Text style={[themeStyles.color, styles.countText]}>{likesCount}</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={onCommentsHandler} style={styles.icon}>
          <CommentIcon fill={themeStyles.color.color} />
          {commentsCount > 0 && <Text style={[themeStyles.color, styles.countText]}>{commentsCount}</Text>}
        </TouchableOpacity>
      </View>

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
            <Comments routeToAuth={routeToAuth} handleClosePress={handleClosePress} placeId={place._id} comments={comments} />
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