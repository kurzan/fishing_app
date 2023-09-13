import { FC } from "react";
import { TouchableHighlight, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface IButton {
  onPress: any,
  title: string,
  style?: StyleProp<ViewStyle>
}

const Button: FC<IButton> = ({ onPress, title, style }) => {
  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    margin: 3,
    backgroundColor: '#60a5fa'
  },

  text: {
    padding: 8,
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
});



export default Button;