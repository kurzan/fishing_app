import { View, ScrollView, StyleSheet } from "react-native";
import { FC } from 'react';

interface ILayout {
  isScrollView?: boolean,
  children?: any
}

const LayoutScreen: FC<ILayout> = ({ children, isScrollView = true }) => {
  return (

    <View style={{ ...style.container, ...{ backgroundColor: '#04010B' } }}>
      {isScrollView ? <ScrollView>{children}</ScrollView> : children}
    </View>
  )
};


export const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 16
  }
})



export default LayoutScreen;