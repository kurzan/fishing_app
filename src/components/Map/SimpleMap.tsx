import { useRef } from 'react';
import { Marker, YaMap, YaMapProps } from 'react-native-yamap';
import { StyleSheet, View, Image, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import { Place } from '../../services/types/places';
import { useColorScheme } from 'react-native';

type MapProps = YaMapProps & {
  style?: StyleProp<ViewStyle>,
  zoom?: number,
  initialCoords: any
}

const SimpleMap = ({ initialCoords, style, zoom = 12 }: MapProps) => {

  const map = useRef<YaMap>(null);

  const isDarkMode = useColorScheme() === 'dark';


  return (
    <YaMap
      ref={map}
      nightMode={isDarkMode}
      showUserPosition={false}
      mapType='vector'
      initialRegion={{
        lat: 53,
        lon: 42,
        zoom: zoom,
        azimuth: 0,
      }}
      style={[MapStyles.map,]}
    >
      <Marker
        children={<Image
          style={MapStyles.marker}
          source={require('../../images/hud/float.png')} />}
        point={{
          lat: 53,
          lon: 42,
        }}
        zIndex={6}
      />
    </YaMap>
  );
};

export const MapStyles = StyleSheet.create({

  map: {
    zIndex: 1,
    height: 150,
    width: '100%'
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

})

export default SimpleMap;


