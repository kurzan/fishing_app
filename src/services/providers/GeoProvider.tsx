import { createContext, useEffect, useMemo, useState } from "react";
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { requestLocationPermission } from '../../services/geoutils';

interface IContext {
  location: false | Geolocation.GeoPosition
}

export const GeoContext = createContext<IContext>({} as IContext);

export const GeoProvider = ({ children }: { children: any }) => {

  const [location, setLocation] = useState<GeoPosition | false>(false);

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

  const value = useMemo(() => ({
    location
  }), [location])

  return <GeoContext.Provider value={value}>
    {children}
  </GeoContext.Provider>

};