import React, { memo } from 'react';
import { StyleSheet, TextInput, TextInputProps, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type InputProps = TextInputProps & {
  error?: any,
  style?: any
}

const Input = ({ error, style, ...textInputProps }: InputProps) => {

  const { themeStyles } = useTheme();

  return (
    <>
      <TextInput
        placeholderTextColor='#828284'
        style={[themeStyles.input, styles.input, style]}
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