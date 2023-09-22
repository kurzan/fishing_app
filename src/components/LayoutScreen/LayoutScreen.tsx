import { View, ScrollView, StyleSheet } from "react-native";
import { FC } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Padding from "../Padding/Padding";

interface ILayout {
  isScrollView?: boolean,
  children?: any
}

const LayoutScreen: FC<ILayout> = ({ children, isScrollView = true }) => {

  const { themeStyles } = useTheme();

  return (

    <View style={[style.container, themeStyles.backgroundColor]}>

      {isScrollView ? (
        <ScrollView>
          <Padding>
            {children}
          </Padding>
        </ScrollView>
      )
        :
        (
          <Padding>
            children
          </Padding>
        )}
    </View>
  )
};

export const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default LayoutScreen;