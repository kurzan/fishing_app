import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Padding from '../Padding/Padding';

type TitleProps = {
  style?: any,
  title: string
}

const Title = ({ style, title }: TitleProps) => {
  return (
    <Padding>
      <Text style={[styles.title, style]}>{title}</Text>
    </Padding>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24
  }
});

export default Title;