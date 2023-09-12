import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";


type PaddingProps = {
  style?: any
};

const Padding = ({ children, style = {} }: PropsWithChildren<PaddingProps>) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
};

export default Padding;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    paddingRight: 4
  }
});