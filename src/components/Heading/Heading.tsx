import { Text, StyleSheet, Image } from "react-native";
import Padding from "../Padding/Padding";
import { View } from "@ant-design/react-native";
import { useTheme } from "../../hooks/useTheme";
import Logo from '../../images/logo.svg';


type HeadingProps = {
  title?: string,
  isCenter?: boolean,
  withLogo?: boolean
}


const Heading = ({ title, isCenter = false, withLogo = false }: HeadingProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={[themeStyles.backgroundColor, styles.container]}>
      <Padding>
        {withLogo &&

          <Logo fill={themeStyles.color.color} />
        }
        {title && <Text style={[themeStyles.color, styles.text]}>{title}</Text>}
      </Padding>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    height: '8%',
    justifyContent: 'center'

  },
  text: {
    fontWeight: '700',
    fontSize: 24
  }
})

export default Heading;
