import React, { memo } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type ToggleProps = {
  title: string,
  value: boolean,
  setValue: any
}

const Toggle = ({ value, setValue, title }: ToggleProps) => {

  const { themeStyles } = useTheme();

  return (
    <View style={styles.fieldWithToggle}>
      <Text style={[themeStyles.color, styles.text]}>{title}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#24A2DF' }}
        thumbColor={value ? '#f4f3f4' : '#24A2DF'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setValue}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  text: {
  },

  fieldWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})


export default memo(Toggle);