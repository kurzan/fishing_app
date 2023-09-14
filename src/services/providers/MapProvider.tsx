import { createContext, useRef, useEffect, useMemo, useState, PropsWithChildren } from "react";
import { YaMap, CameraPosition, Animation } from 'react-native-yamap';
import { Coords } from "../types/places";

type TMapContext = {
  map: React.RefObject<YaMap>,
  getTarget: (coords: Coords) => Promise<void>,
  getCamera: () => Promise<CameraPosition>,
  coords: Coords | undefined,
  setCoords: React.Dispatch<React.SetStateAction<Coords | undefined>>
}

export const MapContext = createContext<TMapContext>({} as TMapContext);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const map = useRef<YaMap>(null);
  const [coords, setCoords] = useState<undefined | Coords>(undefined);

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

  return (
    <MapContext.Provider value={{ getTarget, map, coords, getCamera, setCoords }}>
      {children}
    </MapContext.Provider>
  )
}