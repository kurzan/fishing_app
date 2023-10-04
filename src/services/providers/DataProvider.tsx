import { Dispatch, SetStateAction, createContext, FC, useMemo, useState, useEffect } from "react";
import { Place, User } from "../types/places";
import { collection, getDocs, addDoc, doc, deleteDoc, DocumentReference, DocumentData, updateDoc, arrayUnion, arrayRemove, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../../hooks/useAuth";
import DeviceInfo from "react-native-device-info";
import { generateColor } from "../utils";


type TDataContext = {
  places: Place[],
  users: User[],
  currentUser: User,
  setPlaces: Dispatch<SetStateAction<Place[]>>,
  addPlace: (formData: any) => Promise<void>,
  delPlace: (id: string) => Promise<DocumentReference<any, DocumentData>>,
  getData: () => Promise<[void, void]>,
  postLikesHandler: (type: 'delete' | 'add', placeId: string, userId: string) => Promise<void>,
  placesIsLoading: boolean
}

export const DataContext = createContext<TDataContext>({} as TDataContext);

export const DataProvider: FC<{ children: any }> = ({ children }: { children: React.ReactNode }) => {

  const [places, setPlaces] = useState<Place[]>([]);
  const [placesIsLoading, setPlacesIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const { user } = useAuth();

  const getData = () => {

    const getUsers = async () => {

      let devId = await DeviceInfo.getUniqueId()

      console.log(devId)

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const items: User[] = []
        querySnapshot.forEach((doc) => {
          items.push({
            _id: doc.id,
            ...doc.data()
          } as User);
        });
        setUsers(items);

        let currentUser = items.find(u => u.deviceId === devId && u.authId === user?.uid);

        console.log(user?.uid)

        console.log('currentuser ' + currentUser)

        if (currentUser === undefined) {

          const userRef = await addDoc(collection(db, "users"), {
            deviceId: devId,
            name: 'Рыбак',
            avatarColor: generateColor()
          });

          currentUser = {
            _id: userRef.id,
            deviceId: devId,
            name: 'Рыбак',
            authId: undefined,
            avatarColor: generateColor()
          }

          setCurrentUser(currentUser);
        } else {
          setCurrentUser(currentUser)
        }

      } catch (error) {
        throw new Error('Что-то пошло не так!');
      }
    };

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
    }

    return Promise.all([getPlaces(), getUsers()])
  };

  useEffect(() => {
    setPlacesIsLoading(true);

    getData()
      .then(() => setPlacesIsLoading(false))
  }, []);

  const postLikesHandler = async (type: 'delete' | 'add', placeId: string, userId: string) => {
    const likesRef = doc(db, "places", placeId);
    const userRef = doc(db, "users", userId)

    await updateDoc(likesRef, {
      likes: type === 'add' ? arrayUnion(userId) : arrayRemove(userId)
    });

    await updateDoc(userRef, {
      likes: type === 'add' ? arrayUnion(placeId) : arrayRemove(placeId)
    });

    getData();
  };

  const addComment = async (message: string, userId: string, placeId: string) => {
    const commentsRef = doc(db, "places", placeId);

    await updateDoc(commentsRef, {
      comments: arrayUnion({
        byUser: userId,
        message: message,
        createdAt: new Date()
      })
    });

    getData();
  };

  const addPlace = async (formData: any) => {
    const placeRef = await addDoc(collection(db, "places"), formData);

    getData();
    return placeRef;
  };

  const delPlace = async (id: string) => {
    await deleteDoc(doc(db, "places", id));

    getData();
  };



  const value = useMemo(() => {
    return { places, users, currentUser, setPlaces, addPlace, delPlace, getData, placesIsLoading, postLikesHandler }
  }, [places, placesIsLoading])


  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

}