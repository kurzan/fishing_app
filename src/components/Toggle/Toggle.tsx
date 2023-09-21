import React, { memo } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

type ToggleProps = {
  title: string,
  value: boolean,
  setValue: any
}

const Toggle = ({ value, setValue, title }: ToggleProps) => {
  return (
    <View style={styles.fieldWithToggle}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#f4f3f4' : '#81b0ff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setValue}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  text: {
    color: 'white'
  },

  fieldWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})


export default memo(Toggle);