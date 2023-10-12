import { useContext } from "react"
import { GeoContext } from "../services/providers/GeoProvider"

export const useGeo = () => useContext(GeoContext);