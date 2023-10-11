import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type PlaceLinkProps = TouchableOpacityProps & {
  placeName: string,
  placeId?: string,
  isLink?: boolean
}

const PlaceName = ({ placeName, placeId, style }: PlaceLinkProps) => {

  const navigation = useNavigation<any>();

  const { themeStyles } = useTheme();

  const onLinkHandler = () => {
    navigation.navigate('Place', {
      placeId: placeId
    })
  }

  return (
    <TouchableOpacity onPress={onLinkHandler}>
      <Text style={[themeStyles.color, style]}>{placeName}</Text>
    </TouchableOpacity>
  );
}

export default PlaceName;