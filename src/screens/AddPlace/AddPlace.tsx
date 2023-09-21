import React, { useState, useEffect } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import Input from '../../components/Input/Input';
import Map from '../../components/Map/Map';
import { useMap } from '../../hooks/useMap';
import AddPhotos from '../../components/AddPhotos/AddPhotos';
import { Formik } from 'formik';
import { useData } from '../../hooks/useData';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import Box from '../../components/Box/Box';
import { View } from '@ant-design/react-native';
import Button from '../../components/Button/Button';
import Toggle from '../../components/Toggle/Toggle';

const AddPlace = () => {

  const { coords } = useMap();
  const { currentUser, addPlace } = useData();

  const [openDate, setOpenDate] = useState(false);
  const [isVisibleInList, setIsVisibleInList] = useState(true);
  const [isVisibleCoordiantsInList, setIsVisibleCoordinatsInList] = useState(true);


  const navigation = useNavigation<any>();

  const handleSubmit = (values: any) => {
    addPlace(values)
      .then(() => navigation.navigate('Places'));
    console.log(values);
  };

  const initialState = {
    name: '',
    coords: {
      _long: coords?.lon.toString() || '',
      _lat: coords?.lat.toString() || '',
      isVisible: isVisibleCoordiantsInList
    },
    isVisible: isVisibleInList,
    images: [],
    ownerId: currentUser._id,
    createdAt: new Date(),
    message: '',
  };

  return (
    <LayoutScreen isScrollView={true}>

      <Formik
        initialValues={initialState}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Введите название точки'),
          coords: yup
            .object({
              _long: yup
                .string()
                .required('Укажите координаты или выберите точку на карту'),
              _lat: yup
                .string()
                .required('Укажите координаты или выберите точку на карту'),
            })
        })}
        onSubmit={values => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values, setValues }) => (
          <View style={styles.container}>
            <Input placeholder='Название точки' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} error={touched.name && errors.name} />

            <Map style={styles.map} zoom={12} />

            <Input keyboardType="numeric" placeholder='Широта' onChangeText={handleChange('coords._lat')} onBlur={handleBlur('coords._lat')} value={values.coords._lat} error={touched.coords && errors.coords} />
            <Input keyboardType="numeric" placeholder='Долгота' onChangeText={handleChange('coords._long')} onBlur={handleBlur('coords._long')} value={values.coords._long} error={touched.coords && errors.coords} />

            <AddPhotos style={styles.addPhoto} />
            <DatePicker
              modal
              locale='ru_RU'
              open={openDate}
              date={values.createdAt}
              onConfirm={(date) => {
                setOpenDate(false)
                setValues((prevValues) => ({
                  ...prevValues,
                  createdAt: date
                }))
              }}
              onCancel={() => {
                setOpenDate(false)
              }}
            />
            <Pressable onPress={() => setOpenDate(true)}><Text style={styles.text}>{values.createdAt.toLocaleString('ru')}</Text></Pressable>
            <Box style={styles.messageBox}><Input placeholder='Сообщение' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} /></Box>

            <Toggle title='Показать в ленте' value={values.isVisible} setValue={() => setValues((prevValues) => ({ ...prevValues, isVisible: !values.isVisible }))} />
            <Toggle title='Показывать координты в ленте' value={values.coords.isVisible} setValue={() => setValues((prevValues) => ({ ...prevValues, coords: { ...prevValues.coords, isVisible: !values.coords.isVisible } }))} />

            <Button onPress={handleSubmit} title="Добавить"></Button>
          </View>
        )}
      </Formik>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 8
  },
  map: {
    height: 260
  },
  addPhoto: {
    height: 140
  },
  errorText: {
    color: '#ff6f45'
  },
  text: {
    color: 'white'
  },
  messageBox: {
    height: 80
  },
  fieldWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default AddPlace;