import React, { useState, useEffect } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Text, StyleSheet, Button, Pressable } from 'react-native';
import Input from '../../components/Input/Input';
import Map from '../../components/Map/Map';
import { useMap } from '../../hooks/useMap';
import AddPhotos from '../../components/AddPhotos/AddPhotos';
import { Formik } from 'formik';
import { useData } from '../../hooks/useData';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'

type InitialState = {
  values: {
    name: string;
    coords: {
      _long: string;
      _lat: string;
    };
    images: never[];
    ownerId: string;
    createdAt: Date;
    updatedAt: string;
    message: string;
  }
}


const AddPlace = () => {

  const [date, setDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)

  const { coords } = useMap();
  const { currentUser, addPlace } = useData();
  const navigation = useNavigation<any>();

  const handleSubmit = (values: any) => {
    addPlace(values)
      .then(() => navigation.navigate('Places'));
    console.log(values);
  }

  const initialState = {
    name: '',
    coords: {
      _long: coords?.lon.toString() || '',
      _lat: coords?.lat.toString() || ''
    },
    images: [],
    ownerId: currentUser._id,
    createdAt: date,
    updatedAt: '',
    message: '',
  };

  return (
    <LayoutScreen isScrollView={false}>

      <Formik
        initialValues={initialState}
        // validationSchema={yup.object().shape({
        //   name: yup
        //     .string()
        //     .required('Введите название точки'),
        //   coords: yup
        //     .object({
        //       _long: yup
        //         .string()
        //         .required('Укажите координаты или выберите точку на карту'),
        //       _lat: yup
        //         .string()
        //         .required('Укажите координаты или выберите точку на карту'),
        //     })
        // })}
        onSubmit={values => handleSubmit(values)}
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <Input placeholder='Название точки' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <Map height={'30%'} zoom={12} visiblePlaces={false} style={styles.map} />
            <Input keyboardType="numeric" placeholder='Широта' onChangeText={handleChange('coords._lat')} onBlur={handleBlur('coords._lat')} value={values.coords._lat} />
            <Input keyboardType="numeric" placeholder='Долгота' onChangeText={handleChange('coords._long')} onBlur={handleBlur('coords._long')} value={values.coords._long} />
            {touched.coords && errors.coords && <Text style={styles.errorText}>{errors.coords._lat}</Text>}
            <AddPhotos />
            <DatePicker
              modal
              is24hourSource
              locale='ru_RU'
              open={openDate}
              date={date}
              onConfirm={(date) => {
                setOpenDate(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpenDate(false)
              }}
            />
            <Pressable onPress={() => setOpenDate(true)}><Text style={styles.text}>{date.toLocaleString('ru')}</Text></Pressable>
            <Input placeholder='Сообщение' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} />
            <Button onPress={handleSubmit} title="Submit"></Button>
          </>
        )}
      </Formik>


    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  map: {},
  errorText: {
    color: 'red'
  },
  text: {
    color: 'white'
  }
})

export default AddPlace;