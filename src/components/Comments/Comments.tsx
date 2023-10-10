import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Input from '../Input/Input';
import { Comment } from '../../services/types/places';
import { useTheme } from '../../hooks/useTheme';
import Button from '../Button/Button';
import CommentItem from './Comment';
import { useData } from '../../hooks/useData';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';


type CommentsProps = {
  comments: Comment[]
  placeId: string,
  routeToAuth: any,
  handleClosePress: any
}

type Values = {
  message: string,
};

const AuthSchema = yup.object().shape({
  message: yup.string()
    .min(2, 'Слишком короткое сообщение!')
    .max(125, 'Слишком длинное сообщение!')
    .required('Напишите сообщение'),
});

const initialState: Values = {
  message: '',
};


const Comments = ({ comments, placeId, routeToAuth, handleClosePress }: CommentsProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { themeStyles } = useTheme();
  const { addComment, currentUser } = useData();

  const commentUpdate = async (values: any, { resetForm }: { resetForm: any }) => {

    try {
      setIsError(false);
      setIsLoading(true);
      const { message } = values;
      if (!currentUser) return

      await addComment(message, currentUser?._id, placeId);
      resetForm();

    } catch (error) {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  }

  const onEnterHandler = () => {
    handleClosePress();
    routeToAuth();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[themeStyles.color, styles.heading]}>Комментарии</Text>
      </View>

      {!comments || comments.length <= 0 ? (
        <View style={styles.centerView}>
          <Text style={[themeStyles.color]}>Комментариев пока нет</Text>
          <Text style={[themeStyles.color]}>Напишите новый комментарий</Text>
        </View>
      ) :
        (
          <ScrollView >
            <View style={styles.commentsBox}>
              {comments.map(comment => <CommentItem key={comment._id} comment={comment} placeId={placeId} />)}
            </View>
          </ScrollView>
        )}

      <View style={styles.bottom}>
        <Formik
          initialValues={initialState}
          validationSchema={AuthSchema}
          onSubmit={commentUpdate}
        >
          {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
            <>
              {currentUser ? (
                <>
                  <Input placeholder='Введите коментарий' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} error={touched.message && errors.message} />
                  {isError && <Text style={themeStyles.error}>Произошла ошибка. Попробуйте еще раз</Text>}
                  <Button title="Отправить" isLoading={isLoading} disabled={isLoading} onPress={handleSubmit} />
                </>
              ) : (
                <Button title="Войти" onPress={onEnterHandler} />
              )}
            </>
          )}
        </Formik >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "10%",
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 12
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    paddingTop: 12,
    marginTop: 'auto',
    gap: 12
  },
  commentsBox: {
    gap: 12

  },
})

export default Comments;