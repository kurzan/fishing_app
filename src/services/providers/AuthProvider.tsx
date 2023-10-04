import { addDoc, collection, doc, updateDoc, getDocs } from "@firebase/firestore";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { register, db, login, logout, anonimousRegister } from '../firebase';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from "../types/places";
import DeviceInfo from "react-native-device-info";
import { generateColor } from "../utils";

interface IContext {
  user: FirebaseAuthTypes.User | null,
  users: User[],
  currentUser: User,
  isLoading: boolean,
  register: (email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
  getUsers: () => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  // let devId: string;
  // DeviceInfo.getUniqueId().then((uniqueId) => {
  //   devId = uniqueId;
  // });

  const getUsers = async () => {

    let devId = await DeviceInfo.getUniqueId()

    const querySnapshot = await getDocs(collection(db, "users"));
    const items: User[] = []
    querySnapshot.forEach((doc) => {
      items.push({
        _id: doc.id,
        ...doc.data()
      } as User);
    });
    setUsers(items);

    let currentUser = items.find(u => u.deviceId === devId || u._id === user?.uid);

    if (!currentUser) {

      const userRef = await addDoc(collection(db, "users"), {
        deviceId: devId,
        name: 'Рыбак',
        avatarColor: generateColor()
      });

      currentUser = {
        _id: userRef.id,
        deviceId: devId,
        name: 'Рыбак',
        authId: null,
        avatarColor: generateColor()
      }
    };

    setCurrentUser(currentUser);
  };

  const registerHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {

      // if (auth().currentUser?.isAnonymous) {
      //   const provider = auth.EmailAuthProvider;
      //   const authCredential = provider.credential(email, password);

      //   auth().currentUser?.linkWithCredential(authCredential)
      //     .then((usercred) => {
      //       setUser(usercred.user);
      //     })
      //     .catch((e) => console.log(e))
      // } 

      const { user } = await register(email, password)

      const userRef = doc(db, "users", currentUser._id)

      await updateDoc(userRef, {
        authId: user.uid,
      });

    } catch (error: any) {
      throw new Error(error.code)
    } finally {
      setIsLoading(false)
    }
  }

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      await login(email, password);
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    setIsLoading(true)

    try {
      await logout();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Уже есть аккаунт с таким e-mail!');
      }

      if (error.code === 'auth/invalid-email') {
        throw new Error('Неправильный e-mail адресс!');
      }
    } finally {
      setIsLoading(false)
    }
  }

  const anonymousRegisterHandler = async () => {
    setIsLoading(true);

    try {
      await anonimousRegister();

    } catch (error) {
      throw new Error('Что-то пошло не так!');
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user || null);
      setIsLoadingInitial(false);
    })
  }, [users])

  const value = useMemo(() => ({
    user, isLoading, login: loginHandler, logout: logoutHandler, register: registerHandler, users, currentUser, getUsers
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>
    {!isLoadingInitial && children}
  </AuthContext.Provider>

};