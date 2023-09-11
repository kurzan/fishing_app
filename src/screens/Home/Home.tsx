import React from 'react';
import { View, Text } from 'react-native';
import Map from '../../components/Map/Map';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';

const Home = () => {
  return (
    <LayoutScreen>
      <Map />
      <Text>Hello</Text>
    </LayoutScreen>
  );
}

export default Home;