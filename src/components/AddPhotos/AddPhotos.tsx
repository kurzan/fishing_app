import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Button } from "react-native";
import Box from '../Box/Box';
import { launchCamera, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { useData } from '../../hooks/useData';


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

const AddPhotos = () => {

  const [response, setResponse] = React.useState<ImagePickerResponse[]>([]);

  const takePhoto = () => {
    launchCamera(takePhotoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response);
      } else {
        let images = response;
        setResponse(prevResponse => [...prevResponse, images]);
      }
    });
  }

  return (
    <>
      <Box touchable={false} style={styles.container} >

        <TouchableOpacity onPress={takePhoto} style={styles.addPhotoButton}>
          <Text style={styles.text}>+</Text>
          <Text style={styles.text}>Добавить фото</Text>
        </TouchableOpacity>

        {response && response.map((image: ImagePickerResponse) => (
          image.assets?.map((asset: any) => (
            <Image
              key={asset.uri}
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{ uri: asset.uri }}
            />
          ))
        ))}
      </Box>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    height: '18%',
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





