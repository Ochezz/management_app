import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, NativeModules, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootTabScreenProps } from '../types';

const { StatusBarManager } = NativeModules

import { Text, View } from '../components/Themed';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  const [infos, setInfos] = useState({
    id: 0,
    first_name: "",
    first_name_furi: "",
    last_name: "",
    last_name_furi: "",
    postal_num: "",
    prefecture_id: "",
    city: "",
    other_address: "",
    tel: ""
  }); 

  useEffect(() => {
    AsyncStorage.getItem("userInfo", ( err, value )=>{
      if (err == null && value !== null){
        let json = JSON.parse(value!);
        setInfos({
          ...infos,
          id: json.id,
          first_name: json.first_name,
          first_name_furi: json.first_name_furi,
          last_name: json.last_name,
          last_name_furi: json.last_name_furi,
          postal_num: json.postal_num,
          prefecture_id: json.prefecture_id,
          city: json.city,
          other_address: json.other_address,
          tel: json.tel
        })
      }
    }).catch(err => console.log(err));
  }, [])

  useEffect(()=>{
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData:any) => {
        setStatusBarHeight(statusBarFrameData.height)
      }) : null
  }, []);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  //保存ボタン押下時
  const insertInfos = async (navigation : any) => {
    try{
      let url : string = ""
      let tmpVal : any = ""
      let id : number = 0

      //id設定
      if(infos.id === 0) {
        let url="http://192.168.10.65:3000/tabTwo/selectRowCnt";
        tmpVal = await axios.get(url)
        id = tmpVal.data[0].cnt + 1
      }
      else
        id = infos.id

      //データINSERT
      url="http://192.168.10.65:3000/tabTwo/insertInfos";
      const infoObject : any = {
        id : id,
        last_name_furi: infos.last_name_furi,
        first_name_furi: infos.first_name_furi,
        last_name: infos.last_name,
        first_name: infos.first_name,
        postal_num: infos.postal_num,
        prefecture_id: infos.prefecture_id,
        city: infos.city,
        other_address: infos.other_address,
        tel: infos.tel
      }

      for (let key in infoObject) {
        if(infoObject[key] === null || infoObject[key] === "")
        {
          Alert.alert("未入力項目があります。")
          return false
        }
      }

      let data = JSON.stringify({
        'id': id,
        'last_name_furi': infos.last_name_furi, 
        'first_name_furi': infos.first_name_furi,
        'last_name':infos.last_name,
        'first_name':infos.first_name,
        'postal_num': infos.postal_num,
        'prefecture_id': infos.prefecture_id,
        'city': infos.city,
        'other_address': infos.other_address,
        'tel': infos.tel
      });

      AsyncStorage.setItem('userInfo',data, () => {
        console.log('AsyncStorage saved')
      });
      
      await axios.post(url, infoObject)
        .then( navigation.navigate('TabOne')  )
        .catch( response => { console.log(response) } )
    }
    catch(err){
      console.log(err)
    }
  }

  // 郵便番号検索APIのURL
  const zipcloudURL = 'https://zipcloud.ibsnet.co.jp/api/search'; 

  // axiosのGETメソッドを使った住所検索
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${zipcloudURL}?zipcode=${infos.postal_num}`);
      const data = response.data;
      if ( !data.results ) {
        return '該当する住所はありませんでした。'
      }
      switch (data.status) {
        case 200:
          // 同じ郵便番号で2件以上存在する場合は除き
          // return `${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`;
          return data.results[0];
        case 400:
          return data.message;
        case 500:
          return data.message;
      }
    } catch (error) {
        return '検索失敗';
    }
  }

  // 送信ボタンを押した時に実行される関数
  async function handlePress() {
    // 7桁の数字を正規表現
    const pattern = /^[0-9]{7}$/;
    if (pattern.test(infos.postal_num)){
      const address = await fetchAddress();
      if(typeof(address) === 'string')
        setInfos({...infos, prefecture_id:'', city:'', other_address:address})
      else
        setInfos({...infos, prefecture_id:address.address1, city:address.address2, other_address:address.address3})
    } else {
      // 想定していない文字列の場合
      Alert.alert("郵便番号を入力してください。")
      console.log('正しい郵便番号ではありません');
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={statusBarHeight+44}
    >
      <ScrollView style={styles.ScrollView}>
      <Text style={styles.requiredGuide}>*は必須</Text>
        <View style={styles.infoTitleWrap}>
          <Text style={styles.category}>氏名（漢字）</Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.nameInput}
            onChangeText={(text)=>setInfos({...infos, last_name:text})}
            value={infos.last_name}
            placeholder="姓"
            keyboardType="default"
          />
          <TextInput
            style={styles.nameInput}
            onChangeText={(text)=>setInfos({...infos, first_name:text})}
            value={infos.first_name}
            placeholder="名"
            keyboardType="default"
          />
        </View>
        <View style={styles.infoTitleWrap}>
          <Text style={styles.category}>氏名（フリガナ）</Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.nameInput}
            onChangeText={(text)=>setInfos({...infos, last_name_furi:text})}
            value={infos.last_name_furi}
            placeholder="セイ"
            keyboardType="default"
          />
          <TextInput
            style={styles.nameInput}
            onChangeText={(text)=>setInfos({...infos, first_name_furi:text})}
            value={infos.first_name_furi}
            placeholder="メイ"
            keyboardType="default"
          />
        </View>
        <View style={styles.infoTitleWrap}>
          <Text style={styles.category}>郵便番号（ - なし）<Text style={styles.required}>*</Text></Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.inputPostalCode}
            onChangeText={(text)=>setInfos({...infos, postal_num:text})}
            value={infos.postal_num}
            maxLength={7}
            placeholder="郵便番号を入力"
            keyboardType="number-pad"
          />
          <TouchableOpacity
            onPress={handlePress}
            style={styles.searchButton}>
              <Text style={{ color: 'white', textAlign: 'center', textAlignVertical:'center', fontWeight: 'bold', fontSize:17}}>検索</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoTitleWrap_add}>
          <Text style={styles.category_add}>都道府県<Text style={styles.required}>*</Text></Text>
          <Text style={styles.category_add}>住所（市区町村）<Text style={styles.required}>*</Text></Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInfos({...infos, prefecture_id:text})}
            // multiline={true}
            value={infos.prefecture_id}
            placeholder="都道府県を入力"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInfos({...infos, city:text})}
            value={infos.city}
            placeholder="市区町村を入力"
            keyboardType="default"
          />
        </View>
        <View style={styles.infoTitleWrap}>
          <Text style={styles.category}>住所（その他）<Text style={styles.required}>*</Text></Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInfos({...infos, other_address:text})}
            value={infos.other_address}
            placeholder="その他住所を入力"
            keyboardType="default"
          />
        </View>
        <View style={styles.infoTitleWrap}>
          <Text style={styles.category}>電話番号（ - なし）<Text style={styles.required}>*</Text></Text>
        </View>
        <View style={styles.infoWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInfos({...infos, tel:text})}
            maxLength={11}
            value={infos.tel}
            placeholder="電話番号を入力"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={()=>insertInfos(navigation)}
            style={styles.button}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>保存</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  ScrollView: {
    flex: 1,
    padding: 15,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    flex: 1,
  },
  infoTitleWrap: {
    flex: 1,
    marginTop: 10,
  },
  infoTitleWrap_add: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  infoWrap: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    height: 60,
    width: '50%',
    marginRight: 5,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#456481',
    padding: 10,
    color: '#456481',
    textAlignVertical: "top",
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    height: 60,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#456481',
    padding: 10,
    color: '#456481',
    textAlignVertical: "top",
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputPostalCode: {
    height: 60,
    flex: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#456481',
    padding: 10,
    color: '#456481',
    textAlignVertical: "top",
    fontWeight: 'bold',
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: '#456481',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 5,
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    flex:1,
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  category_add: {
    flex:0.5,
    fontWeight: 'bold',
    fontSize: 15,
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
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  required:{
    color: 'red',
  },
  requiredGuide:{
    color: 'red',
    textAlign: 'right',
    fontWeight: 'bold'
  }
});
