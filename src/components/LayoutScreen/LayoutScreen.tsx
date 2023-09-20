import { View, ScrollView, StyleSheet } from "react-native";
import { FC } from 'react';

interface ILayout {
  isScrollView?: boolean,
  children?: any
}

const LayoutScreen: FC<ILayout> = ({ children, isScrollView = true }) => {
  return (

    <View style={[style.container, { backgroundColor: '#04010B' }]}>
      {isScrollView ? <ScrollView >{children}</ScrollView> : children}
    </View>
  )
};

export const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default LayoutScreen;