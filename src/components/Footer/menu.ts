import { AddIcon, HomeIcon, PlacesIcon } from "../Icons";
import { FooterItemProps } from "./types";

export const menu: FooterItemProps[] = [
  {
    icon: HomeIcon,
    title: 'Home',
    ru_title: 'Главная'
  },
  {
    icon: AddIcon,
    title: 'AddPlace',
    ru_title: 'Добавить'
  },
  {
    icon: PlacesIcon,
    title: 'Places',
    ru_title: 'Места'
  },
];