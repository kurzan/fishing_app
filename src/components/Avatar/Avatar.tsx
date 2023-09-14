import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

type AvatarProps = {
  name?: string | null
  size?: 'small' | 'large'
}


const Avatar = ({ name, size = 'small' }: AvatarProps) => {

  const isSmall = size === 'small';

  return (
    <View style={styles.avatar}>
      <Text style={styles.text} >{name?.slice(0, 1)}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    width: 36,
    height: 36,
    marginRight: 6
  },

  text: {
    color: 'white',

  }
})

export default Avatar;