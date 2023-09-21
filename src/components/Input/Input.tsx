import React, { memo } from 'react';
import { StyleSheet, TextInput, TextInputProps, Text } from 'react-native';

type InputProps = TextInputProps & {
  error?: any
}

const Input = ({ error, ...textInputProps }: InputProps) => {
  return (
    <>
      <TextInput
        placeholderTextColor='#828284'
        style={[styles.input, textInputProps.style]}
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>Ошибка</Text>}
    </>

  );
};

const styles = StyleSheet.create({
  input: {
    color: 'white',
  },

  errorText: {
    color: '#ff6f45'
  },
})

export default memo(Input);