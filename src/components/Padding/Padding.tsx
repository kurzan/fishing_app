import { FC } from "react";
import { View, StyleSheet } from "react-native";


type PaddingProps = {
  children?: React.ReactNode,
  style?: any
};

const Padding: FC<PaddingProps> = ({ children, style = {} }) => {
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