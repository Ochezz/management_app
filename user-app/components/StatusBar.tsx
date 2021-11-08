import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import screen from '../constants/Layout';

export function StatusBar(props : any) {
    // const { modalName, ...otherProps } = props;
    const { modalNum, textCnt, ...otherProps } = props;

    let array = Array(textCnt)
    // const count = modalName.substring(modalName.length-1, modalName.length)
    const count = modalNum === undefined ? 1 : modalNum

    for(let i=0; i<array.length; i++) {
        if(i+1 <= parseInt(count)) {
            array[i] = styles.statusBarNow
        }
        else {
            array[i] = styles.statusBarNotyet
        }
    }

    return (
        <View style={styles.statusBarWrap}>
            {array.map((value, index) => (
                <View key={index} style={[value, {width: screen.window.width / textCnt}]}></View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    statusBarWrap: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        height: 7,
      },
      statusBarNow: {
        backgroundColor: 'rgba(70, 255, 100, 1.0)',
      },
      statusBarNotyet: {
        backgroundColor: 'rgba(128, 128, 128, 1.0)',
      }
});