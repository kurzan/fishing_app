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


const AddPlace = () => {

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [isVisibleInList, setIsVisibleInList] = useState(true);
  const [isVisibleCoordiantsInList, setIsVisibleCoordinatsInList] = useState(true);

  const { coords } = useMap();
  const { currentUser, addPlace } = useData();
  const navigation = useNavigation<any>();

  const handleSubmit = (values: any) => {
    addPlace(values)
      .then(() => navigation.navigate('Places'));
    console.log(values);
  };

  const toggleVisibleInList = () => {
    setIsVisibleInList((prev) => !prev);
  };

  const toggleVisibleCoordinats = () => {
    setIsVisibleCoordinatsInList((prev) => !prev);
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
    createdAt: date,
    updatedAt: '',
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
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <View style={styles.container}>
            <Input placeholder='Название точки' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <Map style={styles.map} zoom={12} visiblePlaces={false} />
            <Input keyboardType="numeric" placeholder='Широта' onChangeText={handleChange('coords._lat')} onBlur={handleBlur('coords._lat')} value={values.coords._lat} />
            <Input keyboardType="numeric" placeholder='Долгота' onChangeText={handleChange('coords._long')} onBlur={handleBlur('coords._long')} value={values.coords._long} />
            {touched.coords && errors.coords && <Text style={styles.errorText}>{errors.coords._lat}</Text>}
            <AddPhotos style={styles.addPhoto} />
            <DatePicker
              modal
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
            <Box style={styles.messageBox}><Input placeholder='Сообщение' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} /></Box>

            <View style={styles.fieldWithToggle}>
              <Text style={styles.text}>Показать в ленте</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isVisibleInList ? '#f4f3f4' : '#81b0ff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleVisibleInList}
                value={isVisibleInList}
              />
            </View>

            <View style={styles.fieldWithToggle}>
              <Text style={styles.text}>Показывать координты в ленте</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isVisibleCoordiantsInList ? '#f4f3f4' : '#81b0ff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleVisibleCoordinats}
                value={isVisibleCoordiantsInList}
              />
            </View>
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