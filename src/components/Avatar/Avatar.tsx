import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

type AvatarProps = {
  name?: string | null
  size?: 'small' | 'large',
  backgroundColor: string | undefined,
  style?: ViewStyle
}


const Avatar = ({ name, backgroundColor, style }: AvatarProps) => {

  const avatarColor = backgroundColor || 'grey';

  return (
    <View style={[styles.avatar, { backgroundColor: avatarColor }, style]}>
      <Text style={styles.text} >{name?.slice(0, 1)}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    marginRight: 6
  },

  text: {
    color: 'white',
  }
})

export default Avatar;