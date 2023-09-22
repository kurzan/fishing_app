import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Padding from '../Padding/Padding';
import { useTheme } from '../../hooks/useTheme';

type TitleProps = {
  style?: any,
  title: string
}

const Title = ({ style, title }: TitleProps) => {

  const { themeStyles } = useTheme();

  return (
    <Padding>
      <Text style={[themeStyles.color, styles.title, style]}>{title}</Text>
    </Padding>
  );
};

const styles = StyleSheet.create({
  title: {

    fontSize: 24
  }
});

export default Title;