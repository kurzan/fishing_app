import { useRef, useState } from 'react';
import { Marker, Point, YaMap, Animation, CameraPosition } from 'react-native-yamap';
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import MapMarkerPlace from './MapMarkerPlace';
import MapPlacePrewiev from './MapPlacePreview';
import { Coords, Place } from '../../services/types/places';

type MapProps = {
  style?: StyleProp<ViewStyle>,
  zoom?: number,
  places?: Place[],
  getCoords?: any
}

const Map = ({ places, style, zoom = 10, getCoords }: MapProps) => {

  const map = useRef<YaMap>(null);

  const [coords, setCoords] = useState<undefined | Coords>(undefined);
  const [currentPlaceId, setCurrenPlaceId] = useState<null | string>(null);

  const getCamera = () => {
    return new Promise<CameraPosition>((resolve, reject) => {
      if (map.current) {
        map.current.getCameraPosition((position) => {
          resolve(position);
        });
      } else {
        reject('ERROR');
      }
    })
  };

  const getTarget = async (coords: Coords) => {
    const camera = await getCamera();
    if (camera) {

      map.current?.setCenter(
        {
          lon: coords.lon,
          lat: coords.lat
        },

        camera.zoom,
        0,
        0,
        0.6,
        Animation.SMOOTH);
    }
  };


  const handleMapLongPress = async (event: NativeSyntheticEvent<Point>) => {
    const { lat, lon } = event.nativeEvent;

    setCoords({ lat: lat, lon: lon });
    getCoords({ lat: lat, lon: lon })

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

  const handleMyPositionPlace = () => {
    getTarget({
      lat: 56.12,
      lon: 47.27,
    });

    setCoords(undefined)

    getCoords && getCoords({
      lat: 56.12,
      lon: 47.27,
    })
  };

  return (
    <View style={[style]}>
      <YaMap
        ref={map}
        onMapLongPress={handleMapLongPress}
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


        {places && places.map(place => (
          <MapMarkerPlace key={place._id} place={place} setCurrenPlaceId={setCurrenPlaceId} />
        ))}
      </YaMap>

      <View style={MapStyles.hud}>
        <TouchableOpacity
          onPress={handleMyPositionPlace}
          style={MapStyles.hudButton}>
          <Image
            style={MapStyles.hudButtonIMG}
            source={require('../../images/hud/Location.png')} />
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


