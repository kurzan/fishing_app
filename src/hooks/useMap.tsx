import { useContext } from 'react';
import { MapContext } from '../services/providers/MapProvider';

export const useMap = () => useContext(MapContext);
