import { FC } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { FooterItemProps } from "./types";
import { Icon } from '@ant-design/react-native';


type NavItemProps = {
  item: FooterItemProps,
  navigate: (screenName: string) => void,
  currentRoute?: string,
}


const NavItem: FC<NavItemProps> = ({ item, navigate, currentRoute }) => {
  const isActive = currentRoute === item.title

  return (
    <Pressable style={styles.item} onPress={() => navigate(item.title)}>
      <Icon color={isActive ? '#0087ff' : '#7e7e7c'} name={item.iconName} />
      <Text style={{ color: isActive ? '#0087ff' : '#7e7e7c' }}>{item.ru_title}</Text>
    </Pressable>
  )
};

export default NavItem;

const styles = StyleSheet.create({
  item: {
    width: '20%',
    alignItems: 'center',
    padding: 6,
  },

});