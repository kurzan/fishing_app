import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AccountIcon, LogoWhiteIcon, LogoBlackIcon, PlacesIcon } from "../Icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { Icon } from "@ant-design/react-native";

type HeadingProps = {
  title?: string,
  withLogo?: boolean,
  account?: boolean
}


const Heading = ({ title, withLogo = false, account = true }: HeadingProps) => {

  const { themeStyles, isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const route = !user?.uid ? 'Auth' : 'Profile';

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>

      {withLogo &&
        <>
          {isDarkMode ? <LogoWhiteIcon /> : <LogoBlackIcon />}
        </>
      }

      {title && (
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-left' size={30} color={themeStyles.color.color} />
          </TouchableOpacity>
          <Text style={[themeStyles.color, styles.text]}>{title}</Text>
        </>
      )}

      {account && <TouchableOpacity onPress={() => navigation.navigate(route)} style={styles.account}>
        <AccountIcon fill={themeStyles.color.color} />
      </TouchableOpacity>}

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
