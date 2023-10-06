import { Dispatch, SetStateAction, createContext, FC, useMemo, useState, useEffect } from "react";
import { Place, User } from "../types/places";
import { collection, getDocs, addDoc, doc, deleteDoc, DocumentReference, DocumentData, updateDoc, arrayUnion, arrayRemove, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../../hooks/useAuth";

type TDataContext = {
  places: Place[],
  users: User[],
  currentUser: User | null,
  setPlaces: Dispatch<SetStateAction<Place[]>>,
  addPlace: (formData: any) => Promise<DocumentReference<any, DocumentData>>,
  delPlace: (id: string) => Promise<void>,
  getData: () => Promise<[void, void]>,
  updateUser: (formData: any) => Promise<void>,
  addComment: (message: string, userId: string, placeId: string) => Promise<void>,
  postLikesHandler: (type: 'delete' | 'add', placeId: string, userId: string) => Promise<void>,
  placesIsLoading: boolean
}

export const DataContext = createContext<TDataContext>({} as TDataContext);

export const DataProvider: FC<{ children: any }> = ({ children }: { children: React.ReactNode }) => {

  const [isError, setIsError] = useState(false);

  const [places, setPlaces] = useState<Place[]>([]);
  const [placesIsLoading, setPlacesIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = useAuth();

  const getData = () => {

    const getUsers = async () => {

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const items: User[] = []
        querySnapshot.forEach((doc) => {
          items.push({
            docId: doc.id,
            ...doc.data()
          } as User);
        });
        setUsers(items);
      } catch (error) {
        throw new Error('Что-то пошло не так!');
      }
    };

    const getPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const items: Place[] = []
      querySnapshot.forEach((doc) => {
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

  useEffect(() => {
    let currentUser = users.find(u => u._id === user?.uid) || null;
    setCurrentUser(currentUser);
  }, [user, users]);

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

  const updateUser = async (formData: any) => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.docId);
      await updateDoc(userRef, {
        name: formData.name
      });
    }

    getData();
  }

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
    return { places, users, currentUser, setPlaces, addPlace, addComment, delPlace, getData, placesIsLoading, postLikesHandler, updateUser }
  }, [places, placesIsLoading, currentUser])


  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

}