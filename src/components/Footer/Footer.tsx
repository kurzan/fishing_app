import { FC } from "react";
import Padding from "../Padding/Padding";
import { menu } from "./menu";
import NavItem from "./NavItem";
import { StyleSheet, ImageBackground } from "react-native";
import { useTheme } from "../../hooks/useTheme";


interface IFooter {
  navigate: (screenName: string) => void,
  currentRoute?: string,
}

const Footer: FC<IFooter> = ({ navigate, currentRoute }) => {

  const { themeStyles } = useTheme();

  return (
    <Padding style={[styles.footer, themeStyles.backgroundColor]}>
      {menu.map(item => (
        <NavItem key={item.title} item={item} navigate={navigate} currentRoute={currentRoute} />
      ))}
    </Padding>
  )
};

export default Footer;


const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderTopColor: '#7e7e7c',
    borderTopWidth: 0.3,
  },
});
