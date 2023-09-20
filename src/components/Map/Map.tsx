import { useState } from 'react';
import { Marker, Point, YaMap, Animation } from 'react-native-yamap';
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import { useMap } from '../../hooks/useMap';
import MapMarkerPlace from './MapMarkerPlace';
import MapPlacePrewiev from './MapPlacePreview';
import { useData } from '../../hooks/useData';

type MapProps = {
  visiblePlaces?: boolean,
  style?: StyleProp<ViewStyle>,
  zoom?: number,
  height?: DimensionValue | undefined
}

const Map = ({ style, visiblePlaces = true, zoom = 10 }: MapProps) => {
  const { coords, setCoords, getTarget, map, getCamera } = useMap();
  const [currentPlaceId, setCurrenPlaceId] = useState<null | string>(null);

  const { places } = useData();

  const handleMapLongPress = async (event: NativeSyntheticEvent<Point>) => {
    const { lat, lon } = event.nativeEvent;

    setCoords({ lat: lat, lon: lon });

    const camera = await getCamera();
    if (camera) {
      map.current?.setCenter(
        {
          lon: lon,
          lat: lat
        },

        camera.zoom,
        0,
        0,
        0.6,
        Animation.SMOOTH);
    }
  };

  return (
    <View style={[style]}>
      <YaMap
        ref={map}
        onMapLongPress={handleMapLongPress}
        followUser={true}
        showUserPosition={true}
        rotateGesturesEnabled={false}
        nightMode={true}
        mapType={'vector'}
        initialRegion={{
          lat: 56.12,
          lon: 47.27,
          zoom: zoom,
          azimuth: 0,
        }}
        style={[MapStyles.map,]}
      >
        <Marker
          children={<Image
            style={MapStyles.marker}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fishing-9684f.appspot.com/o/images%2Fmap-markers%2Ffloat.png?alt=media&token=e9594a03-1940-4fee-a105-87f0337277ca' }} />}
          point={{
            lat: 56.12,
            lon: 47.27,
          }}
          zIndex={6}
        />

        {coords && <Marker
          children={<Image
            style={MapStyles.marker}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fishing-9684f.appspot.com/o/images%2Fmap-markers%2Ffloat.png?alt=media&token=e9594a03-1940-4fee-a105-87f0337277ca' }} />}
          point={{
            lat: coords.lat,
            lon: coords.lon,
          }}
          zIndex={6}
        />}


        {visiblePlaces && places && places.map(place => (
          <MapMarkerPlace key={place._id} place={place} setCurrenPlaceId={setCurrenPlaceId} />
        ))}
      </YaMap>

      <View style={MapStyles.hud}>
        <TouchableOpacity
          onPress={() => getTarget({
            lat: 56.12,
            lon: 47.27,
          })}
          style={MapStyles.hudButton}>
          <Image
            style={MapStyles.hudButtonIMG}
            source={require('../../images/hud/current-possition.png')} />
        </TouchableOpacity>
      </View>
      {currentPlaceId && <MapPlacePrewiev setCurrenPlaceId={setCurrenPlaceId} currentPlaceId={currentPlaceId} />}
    </View>
  );
};

export const MapStyles = StyleSheet.create({

  map: {
    flex: 1,
    zIndex: 1,
  },

  marker: {
    width: 60,
    height: 60,
  },

  markerPlace: {
    width: 60,
    height: 60,
    borderRadius: 6,
    borderWidth: 4,
    borderColor: 'black',
  },

  hud: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom: 8,
    left: 8
  },

  hudButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  hudButtonIMG: {
    width: 30,
    height: 30,
  },
})

export default Map;


