import React, { useEffect } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView, FlatList } from 'react-native';
import PlacesListItem from './PlacesListItem';
import Title from '../Title/Title';
import { Place } from '../../services/types/places';
import { useData } from '../../hooks/useData';
import Padding from '../Padding/Padding';

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


  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Padding>
        <Title title={title} />
        <View style={styles.list}>
          {places && places.map(place => (
            <PlacesListItem key={place._id} place={place} />
          ))}
        </View>
      </Padding>
    </ScrollView>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    height: '100%',
  },
  list: {
    paddingTop: 12,
    gap: 24
  },
})