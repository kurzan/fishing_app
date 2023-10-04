import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

type AvatarProps = {
  name?: string | null
  size?: 'small' | 'large',
  backgroundColor: string | undefined
}


const Avatar = ({ name, backgroundColor, size = 'small' }: AvatarProps) => {

  const isSmall = size === 'small';

  const avatarColor = backgroundColor || 'grey';

  return (
    <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
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