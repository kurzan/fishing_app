import { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";
import LayoutScreen from "../../components/LayoutScreen/LayoutScreen";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../../components/Avatar/Avatar";
import { useData } from "../../hooks/useData";
import Heading from "../../components/Heading/Heading";
import Input from '../../components/Input/Input';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as yup from 'yup';
import { Formik } from 'formik';

type Values = {
  name: string,
};

const AuthSchema = yup.object().shape({
  name: yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(12, 'Слишком длинное имя!')
    .required('Укажите пароль'),
});


const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const { user, logout } = useAuth();
  const { currentUser, updateUser } = useData();

  if (!currentUser) return (
    <ActivityIndicator />
  )

  const { themeStyles } = useTheme();
  const navigation = useNavigation<any>();

  const logoutHandler = () => {
    logout().then(() => navigation.navigate('Home'));
  };


  const editHandler = () => {
    setBottimSheetIndex(0)
  };

  const initialState: Values = {
    name: currentUser?.name || '',
  };

  const updateHandler = async (values: any) => {
    try {
      setIsError(false);
      setIsLoading(true);

      await updateUser(values);

    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading withLogo account={false} />
      <LayoutScreen>
        <View style={styles.container}>

          <Avatar style={styles.ava} backgroundColor={currentUser?.avatarColor} name={currentUser?.name} />

          <View style={styles.nameView}>

            <Text style={[themeStyles.color, styles.name]}>{currentUser?.name}</Text>
            <Pressable onPress={editHandler}><Text style={[themeStyles.color]}>ред.</Text></Pressable>
          </View>
          <Text style={[themeStyles.color]}>{currentUser?.email}</Text>
          <Button title="Выйти из аккаунта" onPress={logoutHandler} />
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
              <Formik
                initialValues={initialState}
                validationSchema={AuthSchema}
                onSubmit={updateHandler}
              >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                  <>
                    <Text style={[themeStyles.color]}>Изменить имя</Text>
                    <Input placeholder='Введите имя' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} error={touched.name && errors.name} />
                    {isError && <Text style={themeStyles.error}>Произошла ошибка. Попробуйте еще раз</Text>}
                    <View style={styles.save}>
                      <Button title="Сохранить" onPress={handleSubmit} disabled={isLoading} isLoading={isLoading} />
                    </View>
                  </>
                )}
              </Formik >
            </BottomSheetView>
          </BottomSheet>
        </Portal>

      </LayoutScreen >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    gap: 12
  },
  ava: {
    alignSelf: 'center',
    height: 150,
    width: 150
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    gap: 8
  },
  input: {
    width: '100%'
  },
  name: {
    fontWeight: '500',
    fontSize: 28
  },
  bottom: {
    flex: 1,
    padding: 12,
    gap: 12,
    paddingBottom: 30
  },
  save: {
    marginTop: 'auto'
  },
  email: {

  }
})

export default Profile;