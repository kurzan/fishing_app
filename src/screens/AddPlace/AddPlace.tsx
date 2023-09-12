import React, { useState } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Coords } from '../../services/types/places';
import { Text } from 'react-native';

const AddPlace = () => {

  const [coords, setCoords] = useState<null | Coords>(null);

  return (
    <LayoutScreen>
      <Text>Add Place</Text>
    </LayoutScreen>
  );
}

export default AddPlace;