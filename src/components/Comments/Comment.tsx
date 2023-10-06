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
    <View style={styles.container}>
      <Avatar style={styles.ava} user={currentUser} />
      <View style={styles.messageBox}>
        <View style={styles.nameBox}>
          <Text style={[themeStyles.color, styles.userName]}>{currentUser?.name}</Text>
          <Text style={[themeStyles.greyText, styles.date]}>{moment(new Date(comment.createdAt.seconds * 1000)).calendar()}</Text>
        </View>

        <Text style={[themeStyles.color]}>{comment.message}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  userName: {
    fontSize: 16,
    fontWeight: '500'
  },

  date: {
    fontSize: 10
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  messageBox: {
    flex: 1
  },

  ava: {
    height: 32,
    width: 32
  },

  container: {
    flexDirection: 'row'
  },

  nameBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8
  }

})

export default CommentItem;