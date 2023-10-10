import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

type PlaceLinkProps = TouchableOpacityProps & {
  placeName: string,
  placeId?: string
}

const PlaceLink = ({ placeName, placeId, style }: PlaceLinkProps) => {

  const navigation = useNavigation<any>();

  const onLinkHandler = () => {
    navigation.navigate('Place', {
      placeId: placeId
    })
  }

  return (
    <TouchableOpacity onPress={onLinkHandler}>
      <Text style={style}>{placeName}</Text>
    </TouchableOpacity>
  );
}

export default PlaceLink;