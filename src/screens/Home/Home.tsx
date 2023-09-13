import React from 'react';
import Map from '../../components/Map/Map';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';

const Home = () => {
  return (
    <LayoutScreen>
      <PlacesList title='Лента' />
    </LayoutScreen>
  );
}

export default Home;