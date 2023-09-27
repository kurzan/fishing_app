import { View, ScrollView, StyleSheet, ScrollViewProps } from "react-native";
import { FC } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Padding from "../Padding/Padding";

type LayoutProps = {
  isScrollView?: boolean,
  children?: any,
  style?: any
} & ScrollViewProps;

const LayoutScreen = ({ children, isScrollView = true, style, ...props }: LayoutProps) => {

  const { themeStyles } = useTheme();

  return (

    <View style={[styles.container, themeStyles.backgroundColor, style]}>

      {isScrollView ? (
        <ScrollView {...props}>
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