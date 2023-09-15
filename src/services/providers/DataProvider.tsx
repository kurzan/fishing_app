import { Dispatch, SetStateAction, createContext, FC, useMemo, useState, useEffect } from "react";
import { Place } from "../types/places";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


interface IContext {
  places: Place[],
}

export const DataContext = createContext<IContext>({} as IContext);

export const DataProvider: FC<{ children: any }> = ({ children }: { children: React.ReactNode }) => {

  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    const getPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const items: Place[] = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        items.push(doc.data() as Place)
      });
      setPlaces(items)
    }

    getPlaces();
  }, [])


  return <DataContext.Provider value={{ places }}>
    {children}
  </DataContext.Provider>

}