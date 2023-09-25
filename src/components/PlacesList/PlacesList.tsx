import React, { useEffect } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView, FlatList } from 'react-native';
import PlacesListItem from './PlacesListItem';
import { Place } from '../../services/types/places';
import { useData } from '../../hooks/useData';

type PlacesListProps = {
  title?: string,
  places: Place[],
};

const PlacesList = ({ title = 'Водоемы', places }: PlacesListProps) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const { getData } = useData();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false))
  }, []);

  const filteredPlaces = places.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);


  return (

    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.container}
      data={filteredPlaces}
      renderItem={({ item }) => <PlacesListItem place={item} />}
      keyExtractor={filteredPlaces => filteredPlaces._id}
    />

  );
}

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  }
})