import { Dispatch, SetStateAction, createContext, FC, useMemo, useState, useEffect } from "react";
import { Place, User } from "../types/places";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


type TDataContext = {
  places: Place[],
  users: User[],
  setPlaces: Dispatch<SetStateAction<Place[]>>
}

export const DataContext = createContext<TDataContext>({} as TDataContext);

export const DataProvider: FC<{ children: any }> = ({ children }: { children: React.ReactNode }) => {

  const [places, setPlaces] = useState<Place[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const getPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const items: Place[] = []
      querySnapshot.forEach((doc) => {
        console.log(doc);
        items.push({
          _id: doc.id,
          ...doc.data()
        } as Place)
      });
      setPlaces(items)
    }

    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const items: User[] = []
      querySnapshot.forEach((doc) => {
        items.push({
          _id: doc.id,
          ...doc.data()
        } as User)
      });
      setUsers(items)
    }

    Promise.all([getPlaces(), getUsers()]);

  }, []);

  const value = useMemo(() => {
    return { places, users, setPlaces }
  }, [places, users])


  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

}