import { Dispatch, SetStateAction, createContext, FC, useMemo, useState, useEffect } from "react";
import { Place, User } from "../types/places";
import { collection, getDocs, addDoc, doc, deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import DeviceInfo from 'react-native-device-info';


type TDataContext = {
  places: Place[],
  users: User[],
  setPlaces: Dispatch<SetStateAction<Place[]>>,
  deviceId: string | undefined,
  currentUser: User,
  addPlace: (formData: any) => Promise<void>,
  delPlace: (id: string) => Promise<DocumentReference<any, DocumentData>>,
  getData: () => Promise<[void, void]>
}

export const DataContext = createContext<TDataContext>({} as TDataContext);

export const DataProvider: FC<{ children: any }> = ({ children }: { children: React.ReactNode }) => {

  const [places, setPlaces] = useState<Place[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  const getData = () => {

    let devId: string;
    DeviceInfo.getUniqueId().then((uniqueId) => {
      devId = uniqueId;
    });

    const getPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const items: Place[] = []
      querySnapshot.forEach((doc) => {
        console.log(doc);
        items.push({
          _id: doc.id,
          ...doc.data()
        } as Place);
      });
      setPlaces(items);
    };

    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const items: User[] = []
      querySnapshot.forEach((doc) => {
        items.push({
          _id: doc.id,
          ...doc.data()
        } as User);
      });
      setUsers(items);

      console.log(items)

      let currentUser = items.find(user => user.deviceId === devId);

      if (!currentUser) {

        const userRef = await addDoc(collection(db, "users"), {
          deviceId: devId,
          name: 'Рыбак'
        });

        currentUser = {
          _id: userRef.id,
          deviceId: devId,
          name: 'Рыбак'
        }
      };

      setCurrentUser(currentUser);
    };

    return Promise.all([getPlaces(), getUsers()]);
  }


  useEffect(() => {
    getData()
  }, []);


  const addPlace = async (formData: any) => {
    const placeRef = await addDoc(collection(db, "places"), formData);

    setPlaces(prevState => {
      return [
        {
          _id: placeRef.id,
          ...formData
        },
        ...prevState,
      ];
    });

    return placeRef;
  };

  const delPlace = async (id: string) => {
    await deleteDoc(doc(db, "places", id));

    setPlaces(prevState => prevState.filter(place => place._id !== id));
  };


  const value = useMemo(() => {
    return { places, users, setPlaces, deviceId, currentUser, addPlace, delPlace, getData }
  }, [places, users, currentUser])


  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

}