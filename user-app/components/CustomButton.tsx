import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//redux import
import { RootState } from '../reducer';
import { useSelector, useDispatch } from 'react-redux'
import { setResult } from '../reducer/reduxResult';

export function CustomButton(props : any) {
  // return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
  const { navigation, modalName, iconName, ...otherProps } = props;
  
  //redux
  const modal = useSelector((state : RootState) => state.MODAL)
  const dispatch = useDispatch()

  let pressFlag = false
  if(iconName === "circle-o")
    pressFlag = true
  else if(iconName === "close")
    pressFlag = false

  const onPress = (modalNum : number, flag : boolean) => {
    dispatch(setResult(modalNum, flag))
    navigation()
  }
  return (
    <TouchableOpacity
      onPress={() => onPress(modal.modalNum, pressFlag)}
      style={styles.button}>
      <FontAwesome
        name={iconName}
        size={25}
        color={"white"}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#456481',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    width: 145,
    height: 45,
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  }
});