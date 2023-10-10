import { useEffect, useRef, useState } from 'react';
import { Marker, Point, YaMap, Animation, CameraPosition } from 'react-native-yamap';
import { StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle, DimensionValue, NativeSyntheticEvent } from 'react-native';
import MapMarkerPlace from './MapMarkerPlace';
import MapPlacePrewiev from './MapPlacePreview';
import { Coords, Place } from '../../services/types/places';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../services/geoutils';
import { useColorScheme } from 'react-native';
import HUD from './HUD';

type MapProps = {
  style?: StyleProp<ViewStyle>,
  zoom?: number,
  places?: Place[],
  getCoords?: any,
  hud?: boolean
}

const Map = ({ places, style, zoom = 12, getCoords, hud = true }: MapProps) => {


  const map = useRef<YaMap>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const [location, setLocation] = useState<GeoPosition | false>(false);

  const [coords, setCoords] = useState<undefined | Coords>(undefined);
  const [currentPlaceId, setCurrenPlaceId] = useState<null | string>(null);

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, [])

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

  const zoomIn = async () => {
    const position = await getCamera();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.1, 0.3);
    }
  }

  const zoomOut = async () => {
    const position = await getCamera();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.9, 0.3);
    }
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
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });

    setCoords(undefined)

    getCoords && getCoords({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    })
  };

  return (
    <View style={[style]}>
      {location && <YaMap
        ref={map}
        nightMode={isDarkMode}
        showUserPosition={false}
        onMapLongPress={handleMapLongPress}
        mapType='vector'
        initialRegion={{
          lat: location.coords.latitude,
          lon: location.coords.longitude,
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
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          }}
          zIndex={6}
        />

        {coords && <Marker
          children={<Image
            style={MapStyles.marker}
            source={require('../../images/hud/float.png')} />}
          point={{
            lat: coords.lat,
            lon: coords.lon,
          }}
          zIndex={6}
        />}


        {places && places.map(place => (
          <MapMarkerPlace key={place._id} place={place} setCurrenPlaceId={setCurrenPlaceId} />
        ))}
      </YaMap>}

      {hud && <HUD zoomIn={zoomIn} zoomOut={zoomOut} handleMyPositionPlace={handleMyPositionPlace} />}

      {currentPlaceId && <MapPlacePrewiev setCurrenPlaceId={setCurrenPlaceId} currentPlaceId={currentPlaceId} />}
    </View >
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
    gap: 12,
    zIndex: 2,
    justifyContent: 'space-evenly',
    bottom: 8,
    left: 8
  },

  hudButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  hudButtonIMG: {
    width: 30,
    height: 30,
  },
})

export default Map;


