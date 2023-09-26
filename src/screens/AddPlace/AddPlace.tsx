import React, { useState, useRef, useMemo, useCallback } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Text, StyleSheet, Pressable } from 'react-native';
import Input from '../../components/Input/Input';
import Map from '../../components/Map/Map';
import AddPhotos, { uploadImage } from '../../components/AddPhotos/AddPhotos';
import { Formik } from 'formik';
import { useData } from '../../hooks/useData';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import Box from '../../components/Box/Box';
import { View } from '@ant-design/react-native';
import Button from '../../components/Button/Button';
import Toggle from '../../components/Toggle/Toggle';
import { storage } from '../../services/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { useTheme } from '../../hooks/useTheme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const AddPlace = () => {

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "50%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const { currentUser, addPlace } = useData();
  const [openDate, setOpenDate] = useState(false);
  const [images, setImages] = useState<uploadImage[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<any>();
  const { themeStyles } = useTheme();

  const uploadImages = (images: uploadImage[], placeId: string) => {
    if (!images) return;

    const uploadImagesPromises = images.map(async (image) => {
      try {
        const imageRef = ref(storage, `images/places/${placeId}/users/${currentUser._id}/${image.fileName}`);
        const response = await fetch(image.uri as RequestInfo);
        const blob = await response.blob()
        const res = await uploadBytes(imageRef, blob);

        return res
      } catch (error) {
        console.log(error)
      }
    })

    return Promise.all(uploadImagesPromises)
  }

  const handleSubmit = async (values: any) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const place = await addPlace(values);

      if (!place.id) {
        throw new Error('error');
      }

      uploadImages(images, place.id)
        ?.then(() => setImages([]))
        .then(() => {
          navigation.navigate('Places');
          setIsLoading(false);
        });

    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }

  };

  const initialState = {
    name: '',
    coords: {
      _long: '',
      _lat: '',
      isVisible: true
    },
    isVisible: true,
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


            <Map style={styles.map} zoom={12} getCoords={(coords: any) => {
              setValues((prevValues) => ({
                ...prevValues,
                coords: {
                  ...prevValues.coords,
                  _lat: coords.lat.toString(),
                  _long: coords.lon.toString(),
                }
              }))
            }} />

            <Input placeholder='Название точки' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} error={touched.name && errors.name} />
            <Input keyboardType="numeric" placeholder='Широта' onChangeText={handleChange('coords._lat')} onBlur={handleBlur('coords._lat')} value={values.coords._lat} error={touched.coords && errors.coords?._lat} />
            <Input keyboardType="numeric" placeholder='Долгота' onChangeText={handleChange('coords._long')} onBlur={handleBlur('coords._long')} value={values.coords._long} error={touched.coords && errors.coords?._long} />

            <AddPhotos style={styles.addPhoto} images={images} setImages={setImages} />
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
            <Input placeholder='Описание' onChangeText={handleChange('message')} onBlur={handleBlur('message')} value={values.message} />

            <Toggle title='Показать в ленте' value={values.isVisible} setValue={() => setValues((prevValues) => ({ ...prevValues, isVisible: !values.isVisible }))} />
            <Toggle title='Делиться координатами с другими' value={values.coords.isVisible} setValue={() => setValues((prevValues) => ({ ...prevValues, coords: { ...prevValues.coords, isVisible: !values.coords.isVisible } }))} />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button style={{ width: '50%' }} onPress={handleSubmit} disabled={isLoading} title="Поделиться" isLoading={isLoading}></Button>
            </View>

            {isError && <Text style={styles.errorText}>Произошла ошибка. Попробуйте еще раз</Text>}

          </View>
        )}
      </Formik>

      {/* <BottomSheet

        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose
        animateOnMount={true}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet> */}

    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',

  },
  container: {
    gap: 14,
  },
  map: {
    height: 260
  },
  addPhoto: {
    height: 120
  },
  errorText: {
    color: '#ff6f45'
  },
  text: {
  },
  // messageBox: {
  //   height: 80
  // },
  fieldWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default AddPlace;