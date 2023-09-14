import { FC } from "react";
import { TouchableHighlight, Text, StyleSheet, ViewStyle, StyleProp, View } from "react-native";
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';

interface IButton {
  onPress: any,
  title: string,
  style?: StyleProp<ViewStyle>,
  icon?: OutlineGlyphMapType
}

const Button: FC<IButton> = ({ onPress, title, style, icon }) => {
  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, style]}>
      <View style={styles.textContainer}>
        {icon && <Icon style={styles.icon} name={icon} />}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    margin: 3,
    backgroundColor: '#60a5fa'
  },

  textContainer: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    color: 'white'
  },

  text: {
    padding: 8,
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
});



export default Button;