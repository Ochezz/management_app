import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBoxParamList } from '../types';

export function CheckBox({onSelect, label, isChecked}: CheckBoxParamList) {
  const [checked, onChange] = useState(false);

  useEffect(() => {
    onChange(isChecked ? true : false)
  }, [])

  function onCheckmarkPress() {
    onChange(!checked);
    onSelect(label)
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}
    >
      {checked && <Ionicons name="checkmark" size={18} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#456481',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#456481',
  },
});