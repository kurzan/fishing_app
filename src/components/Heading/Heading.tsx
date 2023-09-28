import { Text, StyleSheet, Image } from "react-native";
import { View } from "@ant-design/react-native";
import { useTheme } from "../../hooks/useTheme";
import Logo from '../../images/logo.svg';
import Account from '../../images/icons/acount.svg';

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
        <Logo fill={themeStyles.color.color} />
      }


      {title && <Text style={[themeStyles.color, styles.text]}>{title}</Text>}

      <View style={styles.account}>
        <Account fill={themeStyles.color.color} />
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
