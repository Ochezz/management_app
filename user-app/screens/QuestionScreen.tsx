import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { RootStackScreenProps } from '../types';

import { StatusBar } from '../components/StatusBar';
import { CustomButton } from '../components/CustomButton';

import axios from 'axios';

//redux
import { RootState } from '../reducer';
import { useSelector, useDispatch } from 'react-redux'
import { addModal, resetModal } from '../reducer/reduxModal';

export default function QuestionScreen({ navigation }: RootStackScreenProps<'Question'>) {
  //redux
  const modal = useSelector((state : RootState) => state.MODAL)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchTexts()
    selectTextCnt()
  }, [])

  const [texts, setTexts] = useState([])
  const [textsCnt, setTextsCnt] = useState(0)

  const len = navigation.getState().routes.length
  const modalName = navigation.getState().routes[len-1].name

  const onPress = (navigation : any, name : string) => {
    //modalNumに+1して次の質問
    dispatch(addModal())

    //最後の質問の場合
    if(name === 'ModalComplete')
      dispatch(resetModal())

    //ページ移動
    navigation.navigate(name)
  }

  //質問テキスト取得
  const fetchTexts = async () => {
    try{
      let url="http://192.168.10.65:3000/modal/selectTexts/";

      const response = await axios.get(url)

      setTexts(response.data.map((value) => {
        return value['text']
      }))
    }
    catch(error){
      console.log(error)
    }
  }

  const selectTextCnt = async () => {
    let textCnt : number = 0
    let tmpVal : any = ''
    let url : string = ''
    
    //質問数取得
    url = 'http://192.168.10.65:3000/modalComplete/selectTextCnt'
    tmpVal = await axios.get(url)
    textCnt = tmpVal.data[0].cnt
    setTextsCnt(textCnt)
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar modalName={modalName}></StatusBar> */}
      <StatusBar modalNum={modal.modalNum} textCnt={textsCnt}></StatusBar>
      {/* <Text style={styles.title}>{text.Q1 + text.textEnd1}</Text> */}
      <Text style={styles.title}>{texts[modal.modalNum-1]}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonView}>
        {/* <CustomButton navigation={()=>navigation.navigate('Modal1')} modalName={modalName} iconName={"circle-o"}></CustomButton>
        <CustomButton navigation={()=>navigation.navigate('Modal1')} modalName={modalName} iconName={"close"}></CustomButton> */}
        <CustomButton navigation={()=>onPress(navigation, modal.modalNum === texts.length ? 'ModalComplete' : 'Question')} modalName={modalName} iconName={"circle-o"}></CustomButton>
        <CustomButton navigation={()=>onPress(navigation, modal.modalNum === texts.length ? 'ModalComplete' : 'Question')} modalName={modalName} iconName={"close"}></CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '80%',
  },
  buttonView: {
    flexDirection: 'row',
  },
});
