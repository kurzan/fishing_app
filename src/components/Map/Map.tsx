import { useRef, useState } from 'react';
import { Marker, YaMap, Circle, Polygon, Polyline, CameraPosition } from 'react-native-yamap';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Animation } from 'react-native-yamap';
import { places } from '../../services/mocks/places';

const Map = () => {

  const map = useRef<YaMap>(null);

  const getCamera = () => {

    return new Promise((resolve, reject) => {

      if (map.current) {
        map.current.getCameraPosition((position) => {
          resolve(position);
        });
      } else {
        reject('ERROR');
      }
    })
  }


  const target = async () => {

    const camera = await getCamera();
    if (camera != 'ERROR') {

      map.current?.setCenter(
        {
          lon: 47.219219,
          lat: 55.993178
        },

        camera.zoom,
        0,
        0,
        0.6,
        Animation.SMOOTH);

    }

  }


  return (
    <View style={MapStyles.contain}>
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
          zoom: 14,
          azimuth: 0,
        }}
        style={MapStyles.map}
      >
        <Marker
          children={<Image
            style={MapStyles.marker}
            source={require('../../images/hud/float.png')} />}
          point={{
            lat: 56.12,
            lon: 47.27,
          }}
          zIndex={6}
        />


        {places.map(place => (
          <Marker
            key={place.id}
            children={<Image
              style={MapStyles.markerPlace}
              source={place.thumbnail} />}
            point={place.coords}
            zIndex={6}
          />
        ))}
      </YaMap>

      <View style={MapStyles.hud}>

        <TouchableOpacity onPress={target} style={MapStyles.hudButton}>
          <Image
            style={MapStyles.hudButtonIMG}
            source={require('../../images/hud/current-possition.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MapStyles = StyleSheet.create({

  contain: {

    width: '100%',
    height: 500,
    justifyContent: 'flex-end',

  },

  map: {
    width: '100%',
    height: '40%',
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


