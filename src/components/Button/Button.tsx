import { FC } from "react";
import { TouchableHighlight, Text, StyleSheet, ViewStyle, StyleProp, View, ActivityIndicator } from "react-native";
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';
import { useTheme } from "../../hooks/useTheme";


interface IButton {
  onPress?: any,
  title?: string,
  style?: StyleProp<ViewStyle>,
  icon?: OutlineGlyphMapType,
  disabled?: boolean,
  isLoading?: boolean
}

const Button: FC<IButton> = ({ onPress, title, style, icon, disabled, isLoading }) => {

  const { themeStyles } = useTheme();

  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, style, isLoading && styles.disabled]} disabled={disabled}>
      <View style={styles.textContainer}>
        {isLoading && <ActivityIndicator size="large" color='white' />}
        {icon && <Icon style={styles.icon} name={icon} />}
        {title && <Text style={[themeStyles.color, styles.text]}>{!isLoading ? title : 'Загрузка...'}</Text>}
      </View>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    margin: 3,
    backgroundColor: '#24A2DF'
  },

  disabled: {
    backgroundColor: 'grey'
  },

  textContainer: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
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