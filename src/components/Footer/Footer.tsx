import { FC } from "react";
import Padding from "../Padding/Padding";
import { menu } from "./menu";
import NavItem from "./NavItem";
import { StyleSheet } from "react-native";


interface IFooter {
  navigate: (screenName: string) => void,
  currentRoute?: string,
}

const Footer: FC<IFooter> = ({ navigate, currentRoute }) => {

  return (
    <Padding style={styles.navItem}>

      {menu.map(item => (
        <NavItem key={item.title} item={item} navigate={navigate} currentRoute={currentRoute} />
      ))}

    </Padding>
  )
};

export default Footer;


const styles = StyleSheet.create({
  navItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#2C2C2C',
    borderTopWidth: 1,
  },
});
