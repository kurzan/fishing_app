import { View, Text } from '@ant-design/react-native';
import React from 'react';
import Avatar from '../Avatar/Avatar';
import { useTheme } from '../../hooks/useTheme';
import { StyleSheet } from 'react-native';
import { useData } from '../../hooks/useData';
import { Comment } from '../../services/types/places';

import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru')

type CommentProps = {
  comment: Comment,
  placeId: string
}

const CommentItem = ({ comment, placeId }: CommentProps) => {

  const { themeStyles } = useTheme();
  const { users } = useData();

  const currentUser = users.find(u => u._id === comment.byUser);

  return (
    <View>
      <Avatar user={currentUser} />
      <View>
        <Text style={[themeStyles.color, styles.userName]}>{currentUser?.name}</Text>
        <Text style={[themeStyles.color]}>{comment.message}</Text>
        <Text style={[themeStyles.color]}>{moment(new Date(comment.createdAt.seconds * 1000)).calendar()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  userName: {
    fontSize: 16,
    fontWeight: '500'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  message: {
    fontSize: 16
  },

})

export default CommentItem;