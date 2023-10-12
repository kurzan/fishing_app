import { FC } from "react";
import Padding from "../Padding/Padding";
import { menu } from "./menu";
import NavItem from "./NavItem";
import { StyleSheet } from "react-native";
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
        <NavItem key={item.title} item={item} Icon={item.icon} navigate={navigate} currentRoute={currentRoute} />
      ))}
    </Padding>
  )
};

export default Footer;


const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 3,
    borderTopColor: '#7e7e7c',
    borderTopWidth: 0.3,
    alignItems: 'center'
  },
});
