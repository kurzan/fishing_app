import { AddIcon, HomeIcon, PlacesIcon } from "../Icons";
import { FooterItemProps } from "./types";

export const menu: FooterItemProps[] = [
  {
    icon: HomeIcon,
    title: 'Home',
    ru_title: 'Главная',
    protected: false
  },
  {
    icon: AddIcon,
    title: 'AddPlace',
    ru_title: '',
    protected: true
  },
  {
    icon: PlacesIcon,
    title: 'Places',
    ru_title: 'Рыбалки',
    protected: true
  },
];