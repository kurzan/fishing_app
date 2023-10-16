import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { User } from "../../services/types/places";

type AvatarProps = {
  user?: User
  style?: ViewStyle
}


const Avatar = ({ user, style }: AvatarProps) => {

  const avatarColor = user?.avatarColor || 'grey';

  return (
    <View style={[styles.avatar, { backgroundColor: avatarColor }, style]}>
      <Text style={styles.text} >{user?.name?.slice(0, 1)}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 6
  },

  text: {
    color: 'white',
  }
})

export default Avatar;