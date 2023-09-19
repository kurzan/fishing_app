import React, { useState, useEffect } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Text, StyleSheet, Button } from 'react-native';
import Input from '../../components/Input/Input';
import Map from '../../components/Map/Map';
import { useMap } from '../../hooks/useMap';
import AddPhotos from '../../components/AddPhotos/AddPhotos';
import { Formik } from 'formik';
import { useData } from '../../hooks/useData';


const AddPlace = () => {

  const { coords } = useMap();
  const { currentUser, addPlace } = useData();

  const initialState = {
    name: '',
    coords: {
      _long: coords?.lon.toString() || '',
      _lat: coords?.lat.toString() || ''
    },
    images: [],
    ownerId: currentUser._id,
    createdAt: '',
    updatedAt: '',
    message: '',
  };


  console.log(currentUser);


  return (
    <LayoutScreen isScrollView={false}>

      <Formik
        initialValues={initialState}
        onSubmit={values => addPlace(values)}
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <Input placeholder='Название точки' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
            <Map height={'30%'} zoom={12} visiblePlaces={false} style={styles.map} />
            <Input keyboardType="numeric" placeholder='Широта' onChangeText={handleChange('coords._lat')} onBlur={handleBlur('coords._lat')} value={values.coords._lat} />
            <Input keyboardType="numeric" placeholder='Долгота' onChangeText={handleChange('coords._long')} onBlur={handleBlur('coords._long')} value={values.coords._long} />
            <AddPhotos />
            <Input placeholder='Сообщение' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} />
            <Button onPress={handleSubmit} title="Submit"></Button>
          </>
        )}
      </Formik>


    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  map: {

  }
})

export default AddPlace;