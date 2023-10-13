import React, { Dispatch, SetStateAction, useState, useRef, useMemo, useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Image, View, Pressable } from "react-native";
import Box from '../Box/Box';
import { launchCamera, CameraOptions, launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../hooks/useTheme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';
import Button from '../Button/Button';
import { Icon } from '@ant-design/react-native';
import Padding from '../Padding/Padding';


type AddPhotosProps = {
  style?: StyleProp<ViewStyle>,
  images: uploadImage[],
  setImages: Dispatch<SetStateAction<uploadImage[]>>,
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
  quality: 0.2
}

const selectPhotoOptions = {
  selectionLimit: 5,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra,
  quality: 0.2
}

const AddPhotos = ({ style, images, setImages }: AddPhotosProps) => {
  const { themeStyles } = useTheme();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const addPhotos = () => {
    setBottimSheetIndex(0)
  }

  const handleDelete = (filename: string) => {
    setImages(prev => prev.filter(image => image.fileName !== filename))
  }


  const takePhoto = () => {
    handleClosePress();
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

  const choosePhoto = () => {
    handleClosePress();

    launchImageLibrary(selectPhotoOptions, (response) => {
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
  };

  return (
    <>
      <Box touchable={false} style={[styles.container, style]} >
        <TouchableOpacity onPress={addPhotos} style={[themeStyles.input, styles.addPhotoButton]}>
          <Text style={[styles.text, styles.plus]}>+</Text>
          <Text style={styles.text}>Добавить фото</Text>
        </TouchableOpacity>


        <View style={styles.imagesContainer}>

          {images && images.map((image: uploadImage) => (
            <View key={image.uri} style={styles.imageBox}>
              <TouchableOpacity style={styles.delIcon} onPress={() => handleDelete(image.fileName)}>
                <Icon name='delete' color={themeStyles.error} />
              </TouchableOpacity>

              <Image
                style={styles.image}
                resizeMode="contain"
                resizeMethod="scale"
                source={{ uri: image.uri }}
              />
            </View>
          ))}
        </View>
      </Box>

      <Portal>
        <BottomSheet
          index={bottomSheetIndex}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
          backgroundStyle={themeStyles.bottomSheetHandle}
          handleStyle={themeStyles.bottomSheetHandle}
        >
          <BottomSheetView>
            <Padding>
              <Button icon='camera' title='Сделать фото' onPress={takePhoto} />
              <Button icon='picture' title='Выбрать фото' onPress={choosePhoto} />
              <Button style={{ backgroundColor: 'grey' }} title='Отмена' onPress={handleClosePress} />
            </Padding>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({

  bottomContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
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
    color: '#828284',
  },

  plus: {},

  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  imageBox: {
    flex: 1,
    maxWidth: '40%',
    minWidth: '30%',
    borderRadius: 16,
    position: 'relative'
  },

  image: {
    width: '100%',
    height: '90%',
    borderRadius: 16
  },

  delIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 4,
    top: 4
  }
});


export default AddPhotos;





