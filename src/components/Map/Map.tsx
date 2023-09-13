import { useState } from 'react';
import { Marker, YaMap } from 'react-native-yamap';
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { places } from '../../services/mocks/places';
import { useMap } from '../../hooks/useMap';
import MapMarkerPlace from './MapMarkerPlace';
import MapPlacePrewiev from './MapPlacePreview';

type MapProps = {
  title?: string,
  style?: StyleProp<ViewStyle>
}

const Map = ({ title, style }: MapProps) => {
  const { getTarget, map } = useMap();

  const [currentPlaceId, setCurrenPlaceId] = useState<null | number>(null);

  return (
    <>
      <View style={[MapStyles.contain, style, { height: currentPlaceId ? `70%` : '100%' }]}>
        <YaMap
          ref={map}
          followUser={true}
          showUserPosition={true}
          rotateGesturesEnabled={false}
          nightMode={true}
          mapType={'vector'}
          initialRegion={{
            lat: 56.12,
            lon: 47.27,
            zoom: 10,
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
          {places.map(place => (
            <MapMarkerPlace key={place.id} place={place} setCurrenPlaceId={setCurrenPlaceId} />
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
      </View>
      {currentPlaceId && <MapPlacePrewiev setCurrenPlaceId={setCurrenPlaceId} currentPlaceId={currentPlaceId} />}
    </>
  );
};

export const MapStyles = StyleSheet.create({

  contain: {
    borderRadius: 24
  },

  map: {
    width: '100%',
    height: '100%',
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


