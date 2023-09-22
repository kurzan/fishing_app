import { View, ScrollView, StyleSheet } from "react-native";
import { FC } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Padding from "../Padding/Padding";

interface ILayout {
  isScrollView?: boolean,
  children?: any,
  style?: any
}

const LayoutScreen: FC<ILayout> = ({ children, isScrollView = true, style }) => {

  const { themeStyles } = useTheme();

  return (

    <View style={[styles.container, themeStyles.backgroundColor, style]}>

      {isScrollView ? (
        <ScrollView>
          <Padding>
            {children}
          </Padding>
        </ScrollView>)
        :
        (children)}
    </View>
  )
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default LayoutScreen;