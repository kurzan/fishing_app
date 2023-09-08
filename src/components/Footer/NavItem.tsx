import { FC } from "react";
import { Text, Pressable } from "react-native";
import { FooterItemProps } from "./types";
import { Icon } from '@ant-design/react-native'
import { IconFill, IconOutline } from "@ant-design/icons-react-native";


type NavItemProps = {
  item: FooterItemProps,
  navigate: (screenName: string) => void,
  currentRoute?: string,
}


const NavItem: FC<NavItemProps> = ({ item, navigate, currentRoute }) => {
  const isActive = currentRoute === item.title

  return (
    <Pressable style={{ width: '33%' }} onPress={() => navigate(item.title)}>
      <Icon name='alibaba' />
      <Text >{item.ru_title}</Text>
    </Pressable>
  )
};

export default NavItem;

