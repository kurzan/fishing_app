
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Pressable, Modal, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Place, User } from '../../services/types/places';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';
import SimpleMap from '../Map/SimpleMap';


type UserInteractElementsProps = {
  place: Place,
}

const PlaceView = ({ place }: UserInteractElementsProps) => {

  const { themeStyles, } = useTheme();


  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);

  const [bottomSheetIndex, setBottimSheetIndex] = useState(-1);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    setBottimSheetIndex(index)
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  return (
    <>
      <Portal >
        <BottomSheet
          index={bottomSheetIndex}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
          backgroundStyle={themeStyles.bottomSheetHandle}
          handleStyle={themeStyles.bottomSheetHandle}
        >
          <BottomSheetView style={[styles.bottom, themeStyles.bottomSheet]}>
            <SimpleMap initialCoords={place.coords} />
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>

  );
}

const styles = StyleSheet.create({

  usersInteract: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22
  },

  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  countText: {
    fontSize: 14
  },

  bottom: {
    flex: 1,
    gap: 12,
    paddingBottom: 30,
  },

});


export default PlaceView;