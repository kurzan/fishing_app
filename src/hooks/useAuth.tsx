import { AuthContext } from "../services/providers/AuthProvider";
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext)