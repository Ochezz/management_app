import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import { RootStackScreenProps } from '../types';

import screen from '../constants/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
//redux import
import { RootState } from '../reducer';
import { useSelector } from 'react-redux'

export default function ModalComplete({ navigation }: RootStackScreenProps<'ModalComplete'>) {
  //redux
  const checkResult = useSelector((state : RootState) => state.RESULT)

  // const [infos, setInfos] = useState({
  //   first_name: "",
  //   first_name_furi: "",
  //   last_name: "",
  //   last_name_furi: "",
  //   postal_num: "",
  //   prefecture_id: "",
  //   city: "",
  //   other_address: "",
  //   tel: ""
  // }); 

  // useEffect(() => {
  //   AsyncStorage.getItem("userInfo", ( err, value )=>{
  //     if (err == null && value !== null){
  //       let json = JSON.parse(value!);
  //       setInfos({
  //         ...infos,
  //         first_name: json.first_name,
  //         first_name_furi: json.first_name_furi,
  //         last_name: json.last_name,
  //         last_name_furi: json.last_name_furi,
  //         postal_num: json.postal_num,
  //         prefecture_id: json.prefecture_id,
  //         city: json.city,
  //         other_address: json.other_address,
  //         tel: json.tel
  //       })
  //     }
  //   }).catch(err => console.log(err));
  // }, [])

  const [id, setId] = useState(); 

  useEffect(() => {
    AsyncStorage.getItem("userInfo", ( err, value )=>{
      if (err == null && value !== null){
        let json = JSON.parse(value!);
        setId(json.id)
      }
    }).catch(err => console.log(err));
  }, [])

  const onPressBtn = (navigation : any) => {
    insertCheckResult(checkResult)
    navigation.popToTop()
  }

  const insertCheckResult = async (checkResult : any) => {
    try{
      let textCnt : number = 0
      let tmpVal : any = ''
      let url : string = ''
      
      //質問数取得
      url = 'http://192.168.10.65:3000/modalComplete/selectTextCnt'
      tmpVal = await axios.get(url)
      textCnt = tmpVal.data[0].cnt

      //チェック結果登録
      url = 'http://192.168.10.65:3000/modalComplete/insertResult'

      const resultObject = {
        textCnt : textCnt,
        infoId : id,
        one: checkResult.one,
        two: checkResult.two,
        three: checkResult.three,
        four: checkResult.four,
        five: checkResult.five,
        six: checkResult.six,
        seven: checkResult.seven,
        eight: checkResult.eight,
        nine: checkResult.nine,
        ten: checkResult.ten,
        time: checkResult.time
      };

      await axios.post(
          url, resultObject
        ).then( response => { console.log(response.data) } )
        .catch( response => { console.log(response) } );
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.completeText}>体調チェック完了</Text>
      <Text style={styles.title}>
        結果は管轄所へ転送されます。
        {"\n"}
        ありがとうございました。
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => onPressBtn(navigation)}
          style={styles.button}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold' }}>最初に戻る</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 15,
    height: 2,
    width: '80%',
  },
  buttonView: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#456481',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 30,
    height: 45,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  completeText: {
    flex: 0.4,
    fontSize: 37, 
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
