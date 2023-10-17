import React from 'react';
import Padding from '../Padding/Padding';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '../../hooks/useTheme';
import { Place } from '../../services/types/places';
import Clipboard from '@react-native-community/clipboard';

type PlaceInfoProps = {
  currentPlace: Place | null
}


const PlaceInfo = ({ currentPlace }: PlaceInfoProps) => {

  const { themeStyles } = useTheme();

  const copyCoordHandler = () => {
    if (!currentPlace) return

    Clipboard.setString(`${currentPlace.coords._lat}, ${currentPlace.coords._long}`);
  }

  return (
    <Padding style={styles.info}>
      <View style={styles.placeTitleView}>
        <Icon style={styles.placeIcon} name='environment' />
        <Text style={[themeStyles.color, styles.placeTitle]}>{currentPlace?.name}</Text>
      </View>

      <View style={styles.coords}>
        <Text style={[themeStyles.greyText]}>{Number(currentPlace?.coords._lat).toFixed(6)}</Text>
        <Text style={[themeStyles.greyText]}>{Number(currentPlace?.coords._long).toFixed(6)}</Text>

        <TouchableOpacity onPress={copyCoordHandler}>
          <Icon name='copy' color={'grey'} size={18} />
        </TouchableOpacity>

      </View>
    </Padding>
  );
}

const styles = StyleSheet.create({

  info: {
    gap: 6
  },

  placeIcon: { marginRight: 8 },

  placeTitleView: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  placeTitle: {
    fontSize: 20,
    fontWeight: '500'
  },

  coords: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
})


export default PlaceInfo;