import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { PickerParamList } from '../types';

export function Picker({value, items, itemName, onValueChange}: PickerParamList) {

  return (
    <RNPickerSelect
      style={{
        inputAndroid: {
          fontSize: 16,
          fontWeight: 'bold',
          paddingVertical: 3,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 4,
          color: '#505050',
          paddingRight: 30,
        },
        inputIOS: {
          fontSize: 16,
          fontWeight: 'bold',
          paddingVertical: 3,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 4,
          color: '#505050',
          paddingRight: 30,
        },
        placeholder: {
          color: '#505050',
        },
      }}
      placeholder={{
        label: '全域',
        value: null,
      }}
      value={value}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      onValueChange={(item) => onValueChange(item)}
      items = {items.map((item) => {
        return (
          { label: item[itemName], value: item[itemName] }
        )
      })}
    />
  );
}