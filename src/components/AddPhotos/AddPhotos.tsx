import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Image } from "react-native";
import Box from '../Box/Box';
import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { useTheme } from '../../hooks/useTheme';

type AddPhotosProps = {
  style?: StyleProp<ViewStyle>,
  images: uploadImage[],
  setImages: Dispatch<SetStateAction<uploadImage[]>>
};

export type uploadImage = {
  fileName: string | undefined,
  uri: string | undefined
};

const includeExtra = true;

const takePhotoOptions: CameraOptions = {
  saveToPhotos: true,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra,
}

const selectPhotoOptions = {
  selectionLimit: 0,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra,
}

const AddPhotos = ({ style, images, setImages }: AddPhotosProps) => {

  const { themeStyles } = useTheme();

  const takePhoto = () => {
    launchCamera(takePhotoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response);
      } else {
        let items: uploadImage[] = []
        response.assets?.forEach(asset => {
          items.push({
            fileName: asset.fileName,
            uri: asset.uri
          })
        });
        setImages(prevImages => [...prevImages, ...items]);
      }
    });
  }

  return (

    <Box touchable={false} style={[styles.container, style]} >
      <TouchableOpacity onPress={takePhoto} style={[themeStyles.input, styles.addPhotoButton]}>
        <Text style={[styles.text, styles.plus]}>+</Text>
        <Text style={styles.text}>Добавить фото</Text>
      </TouchableOpacity>

      {images && images.map((image: uploadImage) => (
        <Image
          key={image.uri}
          resizeMode="contain"
          resizeMethod="scale"
          style={styles.image}
          source={{ uri: image.uri }}
        />
      ))}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  },

  addPhotoButton: {
    height: '90%',
    width: '30%',
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    color: 'black'
  },

  plus: {},

  imageContainer: {
    marginVertical: 18,
    alignItems: 'center',
  },

  image: {
    height: '90%',
    width: '30%',
    borderRadius: 16
  },
});





export default AddPhotos;





