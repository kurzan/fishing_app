import { FC } from "react";
import Padding from "../Padding/Padding";
import { menu } from "./menu";
import NavItem from "./NavItem";
import { StyleSheet, ImageBackground } from "react-native";


interface IFooter {
  navigate: (screenName: string) => void,
  currentRoute?: string,
}

const Footer: FC<IFooter> = ({ navigate, currentRoute }) => {

  return (
    <Padding style={styles.footer}>

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
    borderTopColor: '#2C2C2C',
    borderTopWidth: 1,
    backgroundColor: '#1c1c1e',
  },
});
