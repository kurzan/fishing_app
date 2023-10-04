import { Text, StyleSheet, View, Pressable } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AccountIcon, LogoIcon } from "../Icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

type HeadingProps = {
  title?: string,
  isCenter?: boolean,
  withLogo?: boolean,
  account?: boolean
}


const Heading = ({ title, isCenter = false, withLogo = false, account = true }: HeadingProps) => {

  const { themeStyles } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const route = !user?.uid ? 'Auth' : 'Profile';

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>

      {withLogo &&
        <LogoIcon fill={themeStyles.color.color} />
      }
      {title && <Text style={[themeStyles.color, styles.text]}>{title}</Text>}

      {account && <Pressable onPress={() => navigation.navigate(route)} style={styles.account}>
        <AccountIcon fill={themeStyles.color.color} />
      </Pressable>}

    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14

  },
  text: {
    fontWeight: '700',
    fontSize: 24
  },
  account: {
    marginLeft: 'auto'
  }
})

export default Heading;
