import { FC } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { FooterItemProps } from "./types";
import { useTheme } from "../../hooks/useTheme";

type NavItemProps = {
  item: FooterItemProps,
  navigate: (screenName: string) => void,
  currentRoute?: string,
  Icon?: any
}


const NavItem: FC<NavItemProps> = ({ item, navigate, currentRoute, Icon }) => {
  const isActive = currentRoute === item.title

  const { themeStyles } = useTheme();

  return (
    <Pressable style={styles.item} onPress={() => navigate(item.title)}>
      <Icon fill={isActive ? '#0087ff' : themeStyles.color.color} />
      <Text style={[styles.title, isActive ? { color: '#0087ff' } : themeStyles.color.color]}>{item.ru_title}</Text>
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

  title: {
    paddingTop: 4,
    // color: '#7e7e7c',
    fontSize: 10
  },

  active: {
    color: '#0087ff'
  }
});