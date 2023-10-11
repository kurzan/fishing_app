import { useRef } from 'react';
import { Marker, YaMap, YaMapProps } from 'react-native-yamap';
import { StyleSheet, View, Image, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';

type MapProps = YaMapProps & {
  style?: StyleProp<ViewStyle>,
  zoom?: number,
  initialCoords: Coords
}

type Coords = {
  _long: string;
  _lat: string;
  isVisible: boolean;
} | undefined


const SimpleMap = ({ initialCoords, style, zoom = 15 }: MapProps) => {

  const map = useRef<YaMap>(null);

  const isDarkMode = useColorScheme() === 'dark';

  if (!initialCoords) {
    return
  }

  return (
    <YaMap
      ref={map}
      nightMode={isDarkMode}
      showUserPosition={false}
      mapType='vector'
      initialRegion={{
        lat: Number(initialCoords._lat),
        lon: Number(initialCoords._long),
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
          lat: Number(initialCoords._lat),
          lon: Number(initialCoords._long),
        }}
        zIndex={6}
      />
    </YaMap>
  );
};

export const MapStyles = StyleSheet.create({

  map: {
    zIndex: 1,
    flex: 1,
    height: '100%',
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


