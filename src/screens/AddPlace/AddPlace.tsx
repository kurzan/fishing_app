import React, { useState } from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import { Coords } from '../../services/types/places';
import { Text } from 'react-native';
import Input from '../../components/Input/Input';

const AddPlace = () => {

  const [coords, setCoords] = useState<null | Coords>(null);

  return (
    <LayoutScreen>
      <Input placeholder='Название точки' />
    </LayoutScreen>
  );
}

export default AddPlace;