import { View, Text, Pressable, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useTheme } from "../../hooks/useTheme";
import { Formik } from "formik";
import * as yup from 'yup';
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../services/firebase";
import { useData } from "../../hooks/useData";

type Values = {
  email: string,
  password: string
};

const initialState: Values = {
  email: '',
  password: ''
};

const AuthSchema = yup.object().shape({
  email: yup.string().email('Укажите действительный e-mail').required('Укажите e-mail'),
  password: yup.string()
    .min(5, 'Слишком короткий пароль!')
    .max(12, 'Слишком длинный пароль!')
    .required('Укажите пароль'),
});

const AuthForm = () => {
  const { isLoading, login, register, user } = useAuth();

  const { themeStyles } = useTheme();
  const { currentUser } = useData();

  const [isReg, setIsReg] = useState(true);

  const navigation = useNavigation<any>();


  const authHandler = async (values: Values, actions: any) => {
    const { email, password } = values;
    try {
      if (isReg) await register(currentUser._id, email, password)
      else await login(email, password)

      actions.resetForm()
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert('error')
    }
  };

  return (
    <View style={styles.container} >
      <Text style={[themeStyles.color, styles.title]}>
        {!isReg ? 'Вход' : 'Регистрация'}
      </Text>
      <Formik
        initialValues={initialState}
        validationSchema={AuthSchema}
        onSubmit={authHandler}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <Input placeholder='Введите e-mail' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} error={touched.email && errors.email} />
            <Input placeholder='Введите пароль' secureTextEntry={true} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} error={touched.password && errors.password} />
            <Button disabled={isLoading} isLoading={isLoading} onPress={handleSubmit} title={!isReg ? 'Войти' : 'Зарегистрироваться'} />

            <Pressable style={styles.regButton} onPress={() => setIsReg(!isReg)}>
              <Text style={themeStyles.greyText}>
                {!isReg ? 'Зарегистрироваться' : 'Уже есть аккаунт'}
              </Text>
            </Pressable>
          </>
        )
        }
      </Formik >

      <Button title="Показать юзера" onPress={() => console.log(user)} />
      <Button title="Выйти" onPress={logout} />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    gap: 12
  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500'
  },

  regButton: {
    alignSelf: 'flex-end'
  }
});

export default AuthForm;
