import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';


const Input = ({ ...textInputProps }: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor='white'
      style={[styles.input, textInputProps.style]}
      {...textInputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'white',
  }
})

export default Input;