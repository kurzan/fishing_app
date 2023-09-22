import React, { memo } from 'react';
import { StyleSheet, TextInput, TextInputProps, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type InputProps = TextInputProps & {
  error?: any
}

const Input = ({ error, ...textInputProps }: InputProps) => {

  const { themeStyles } = useTheme();

  return (
    <>
      <TextInput
        placeholderTextColor='black'
        style={[themeStyles.input, styles.input, textInputProps.style]}
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
  },

  errorText: {
    color: '#ff6f45'
  },
})

export default memo(Input);