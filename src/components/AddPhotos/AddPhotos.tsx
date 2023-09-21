import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Image } from "react-native";
import Box from '../Box/Box';
import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';

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
      <TouchableOpacity onPress={takePhoto} style={styles.addPhotoButton}>
        <Text style={styles.text}>+</Text>
        <Text style={styles.text}>Добавить фото</Text>
      </TouchableOpacity>

      {images && images.map((image: uploadImage) => (
        <Image
          key={image.uri}
          resizeMode="cover"
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
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 8
  },

  addPhotoButton: {
    height: '90%',
    width: '30%',
    borderStyle: 'dashed',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#828284',
    justifyContent: 'center'
  },

  text: {
    color: '#828284',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },

  image: {
    height: '90%',
    width: '30%',
    borderRadius: 16
  },
});





export default AddPhotos;





