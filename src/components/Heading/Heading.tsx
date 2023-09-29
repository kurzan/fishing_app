import { Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AccountIcon, LogoIcon } from "../Icons";

type HeadingProps = {
  title?: string,
  isCenter?: boolean,
  withLogo?: boolean
}


const Heading = ({ title, isCenter = false, withLogo = false }: HeadingProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>

      {withLogo &&
        <LogoIcon fill={themeStyles.color.color} />
      }
      {title && <Text style={[themeStyles.color, styles.text]}>{title}</Text>}

      <View style={styles.account}>
        <AccountIcon fill={themeStyles.color.color} />
      </View>

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
