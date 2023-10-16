import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AccountIcon, LogoWhiteIcon, LogoBlackIcon, PlacesIcon, ViewWhiteLogo } from "../Icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { Icon } from "@ant-design/react-native";

type HeadingProps = {
  title?: string,
  withLogo?: boolean,
  account?: boolean,
  back?: boolean
}


const Heading = ({ title, withLogo = false, account = true, back = false }: HeadingProps) => {

  const { themeStyles, isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const route = !user?.uid ? 'Auth' : 'Profile';

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>

      {withLogo &&
        <>
          {isDarkMode ? <View style={{ width: 101, height: 31 }}><Image resizeMode="cover"
            resizeMethod="resize" width={101} height={31} source={require('../../images/white-logo.png')} /></View> : <LogoBlackIcon />}
        </>
      }

      {
        title && (
          <>
            {back &&
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={30} color={themeStyles.color.color} />
              </TouchableOpacity>}


            <Text style={[themeStyles.color, styles.text]}>{title}</Text>
          </>
        )
      }

      {
        account && <TouchableOpacity onPress={() => navigation.navigate(route)} style={styles.account}>
          <AccountIcon fill={themeStyles.color.color} />
        </TouchableOpacity>
      }

    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    height: '8%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    borderBottomColor: '#7e7e7c',
    borderBottomWidth: 0.3,

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
