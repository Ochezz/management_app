import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { CheckBox } from '../components/CheckBox';
import { Picker } from '../components/Picker';
import axios from 'axios';
import { text } from '../constants/Text';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [searched, setSearched] = useState(false);
  const [infos, setInfos] = useState([]);
  const [prefectureOptions, setPrefectureOptions] = useState([{
    prefecture_id: ""
  }]);
  const [cityOptions, setCityOptions] = useState([{
    city: ""
  }]);
  const [questions, setQuestions] = useState([{
    text: ""
  }])
  const [prefectureValue, setPrefectureValue] = useState<string | null>(null)
  const [cityValue, setCityValue] = useState(null)
  const [detailShow, setDetailShow] = useState(false)
  const [resultCheck, setResultCheck] = useState({
    result1: null,
    result2: null,
    result3: null,
    result4: null,
    result5: null,
    result6: null,
    result7: null,
    result8: null,
    result9: null,
    result10: null,
  });

  useEffect(() => {
    selectPrefecture()
    selectQuestion()
    // insertSample()
  }, [])
  
  // const insertSample = async () => {
  //   let url="http://192.168.10.32:3000/tabTwo/insertInfos";
  //   const infoObject = {
  //     last_name_furi: "ヤマダ6",
  //     first_name_furi: "タロウ6",
  //     last_name: "山田6",
  //     first_name: "太郎6",
  //     postal_num: "1111116",
  //     prefecture_id: "東京都2",
  //     city: "品川区5",
  //     other_address: "西五反田１丁目五反田ＡＡビル4",
  //     tel: "09011111124",
  //     date: "2021-09-09 14:50:44",
  //     result1: false,
  //     result2: true,
  //     result3: false,
  //     result4: false,
  //     result5: false,
  //   }

  //   await axios.post(url, infoObject)
  //     .then( response => { console.log(response) } )
  //     .catch( response => { console.log(response) } );
  // }

  // 初期questionリスト取得
  const selectQuestion = async () => {
    try{
      let url="http://192.168.10.32:3000/TabOne/selectQuestion";

      const response = await axios.get(url)
      if (response.data.length > 0) {
        setQuestions(response.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  // 初期infoリスト取得
  const fetchInfos = async () => {
    try{
      let url="http://192.168.10.32:3000/TabOne/selectFilteredInfo/";

      await axios.post(url, {prefecture:prefectureValue, cityValue:cityValue, resultCheck:resultCheck})
      .then(response => {
        setInfos(response.data)
      })
      .catch(response => {
      });
    }
    catch(error){
      console.log(error)
    }
  }

  // 初期Prefectureリスト取得
  const selectPrefecture = async () => {
    try{
      let url="http://192.168.10.32:3000/TabOne/selectPrefecture";

      const response = await axios.get(url)
      if (response.data.length > 0) {
        setPrefectureOptions(response.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  // Prefectureよるcityリスト取得
  const selectCity = async (prefecture: string) => {
    setPrefectureValue(prefecture)
    setCityValue(null)

    try{
      if (prefecture === null) {
        setCityOptions([])
      } else {
        let url="http://192.168.10.32:3000/TabOne/selectCity/"+prefecture;
  
        const response = await axios.get(url)
        if (response.data.length > 0) {
          setCityOptions(response.data)
        }
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const onSearch = () => {
    fetchInfos()
    setSearched(true)
    setDetailShow(false)
  }

  const onCheck = (label: string) => {
    setResultCheck({...resultCheck, [label]: resultCheck[label]? null : true})
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <View style={styles.pickerWrap}>
          <View style={{flex: 3.5}}>
            <Picker
              items = {prefectureOptions}
              itemName = {'prefecture_id'}
              value = {prefectureValue}
              onValueChange = {selectCity}
            />
          </View>
          <View style={{flex: 4.5}}>
            <Picker
              items = {cityOptions}
              itemName = {'city'}
              value = {cityValue}
              onValueChange = {setCityValue}
            />
          </View>
          <View style={{flex: 2}}>
            <TouchableOpacity
              onPress={() => onSearch()}
              style={styles.searchButton}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>検索</Text>
            </TouchableOpacity>
          </View>
        </View>
        {detailShow
          ?
            <View style={styles.checkListWrap}>
              {questions.map((item, idx) => {
                let labelName = 'result' + (idx + 1)
                return (
                  <View key={idx} style={styles.checkList}>
                    <Text style={styles.question}>{item.text}</Text>
                    <CheckBox isChecked={resultCheck[labelName]} onSelect={onCheck} label={labelName}/>
                  </View>
                )
              })}
            </View>
          :
            <></>
        }
        <TouchableOpacity
          onPress={() => setDetailShow(prevDetailShow => !prevDetailShow)}
          style={styles.detailWrap}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>詳細検索</Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
              {detailShow ? ' ▲' : ' ▼'}
            </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrap}>
        <View style={styles.tableHeaderContainer}>
          <View style={styles.address}><Text style={styles.textHeader}>住所</Text></View>
          <View style={styles.abnormal}><Text style={styles.textHeaderAbnormal}>異常</Text></View>
        </View>
        <ScrollView>
          {searched ? infos?.map((item: any, idx) => {
            let result: any = ''
            if (item.result1 || item.result2 || item.result3 || item.result4 || item.result5) {
              result = <FontAwesome name="circle-o" size={22} color="#800000" />
            } else {
              result = <FontAwesome name="close" size={24} color="#456481" />
            }
            return (
              <View
                key={idx}
              >
                <TouchableOpacity
                  style={styles.tableRowContainer}
                  onPress={() => {
                    navigation.navigate('TabOneDetail', {
                      id: item.id
                    });
                  }}
                >
                  <View style={styles.address}><Text style={styles.textRow}>{item.prefecture_id}{item.city}</Text></View>
                  <View style={styles.abnormal}><Text style={styles.textRowAbnormal}>{result}</Text></View>
                </TouchableOpacity>
              </View>
            )
          }) : <View><Text style={styles.textRowAbnormal}>検索項目を選択してください。</Text></View>}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 20,
  },
  searchWrap: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#456481',
    marginBottom: 15
  },
  pickerWrap: {
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  checkListWrap: {
    marginTop: 10,
    marginBottom: 15,
  },
  checkList: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    paddingBottom: 5,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#505050',
    flex: 2
  },
  detailWrap: {
    backgroundColor: "#547D9A",
    height: 35,
    borderRadius: 5,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#456481'
  },
  contentWrap: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  tableHeaderContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: '#456481',
    marginBottom: 5,
    paddingBottom: 2
  },
  tableRowContainer: {
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  address: {
    flex: 5.7,
  },
  abnormal: {
    flex: 1,
  },
  textHeader: {
    fontWeight: 'bold',
    color: '#456481',
    fontSize: 19,
    marginLeft: 5
  },
  textHeaderAbnormal: {
    fontWeight: 'bold',
    color: '#456481',
    textAlign: 'center',
    fontSize: 19
  },
  textRow: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#505050',
    marginLeft: 5
  },
  textRowAbnormal: {
    textAlign: 'center',
    fontSize: 17,
    color: '#505050'
  },
  searchButton: {
    backgroundColor: '#456481',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 5,
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  }
});
