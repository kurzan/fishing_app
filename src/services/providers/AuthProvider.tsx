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
  isLoading: boolean,
  register: (email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const { user } = await register(email, password)

      await addDoc(collection(db, 'users'), {
        _id: user.uid,
        name: 'Рыбак',
        email: user.email,
        avatarColor: generateColor()
      })

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

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      await login(email, password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-login') {
        throw new Error('Неверный логин или пароль!');
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    setIsLoading(true)

    try {
      await logout();
    } catch (error: any) {
      throw new Error(error.code)
    } finally {
      setIsLoading(false)
    }
  }

  auth().onAuthStateChanged(user => {
    setUser(user || null);
    setIsLoadingInitial(false);

    console.log('user' + user);

    console.log('user');
  });



  const value = useMemo(() => ({
    user, isLoading, login: loginHandler, logout: logoutHandler, register: registerHandler
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>
    {!isLoadingInitial && children}
  </AuthContext.Provider>

};