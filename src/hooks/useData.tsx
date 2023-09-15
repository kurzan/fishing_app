import { useContext } from "react";
import { DataContext } from "../services/providers/DataProvider";

export const useData = useContext(DataContext);