import React from 'react';
import LayoutScreen from '../../components/LayoutScreen/LayoutScreen';
import PlacesList from '../../components/PlacesList/PlacesList';
import { useData } from '../../hooks/useData';

const Places = () => {

  const { places, currentUser } = useData();

  const currentPlaces = places.filter(place => place.ownerId === currentUser._id);

  return (
    <LayoutScreen isScrollView={false}>
      <PlacesList title='Мои места' places={currentPlaces} />
    </LayoutScreen>
  );
}

export default Places;