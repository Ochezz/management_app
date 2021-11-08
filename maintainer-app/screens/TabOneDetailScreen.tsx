import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Keyboard, TouchableOpacity, Platform, TouchableWithoutFeedback, Button, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import moment from "moment";
import { text } from '../constants/Text';

export default function TabOneDetailScreen({ navigation, route }: RootStackScreenProps<'TabOneDetail'>) {

  const [show, setShow] = useState(false);
  const [info, setInfo] = useState<{ [key: string]: string } | undefined | null>();
  const [questions, setQuestions] = useState<[{ [key: string]: string }] | null>();
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 100);
    fetchInfos()
    selectQuestion()
    
    return () => {
      setInfo(null);
      setQuestions(null);
      setResults([]);
      clearTimeout(timer);
    };
  }, [])

  const fetchInfos = async () => {
    try{
      let url="http://192.168.10.32:3000/TabOne/selectInfoOne/"+route.params.id;

      const response = await axios.get(url)
      if (response.data.results.length > 0) {
        response.data.results[0]['checkTime'] = moment(response.data.results[0].checkTime).format("YYYY年MM月DD日 HH:mm");
        setResults(response.data.results)
      }
      setInfo(response.data.info[0])
    }
    catch(error){
      console.log(error)
    }
  }

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

  const pressCall = (num: string | undefined) => {
    const url='tel://' + num
    Linking.openURL(url)
  }

  return show ? (
    <View style={styles.container}>
      <View style={styles.itemWrap}>
        <View style={styles.categoryWrap}>
          <Text style={styles.category}>氏名</Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.info}>{info?.last_name}{info?.first_name}</Text>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.categoryWrap}>
          <Text style={styles.category}>住所</Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.info}>{info?.postal_num}</Text>
          <Text style={styles.info}>{info?.prefecture_id}{info?.city}</Text>
          <Text style={styles.info}>{info?.other_address}</Text>
        </View>
      </View>
      <View style={styles.phoneWrap}>
        <View>
          <View style={styles.categoryWrap}>
            <Text style={styles.category}>電話番号</Text>
          </View>
          <View style={styles.phoneNumWrap}>
            <Text style={styles.info}>{info?.tel}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => pressCall(info?.tel)}>
            <MaterialIcons name="phonelink-ring" size={40} color="#456481" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.categoryWrap}>
          <View style={styles.resultWrap}>
            <Text style={styles.result}>体調チェック結果</Text>
            {results.length > 0
              ?
                <Text style={styles.checkTime}>{results[0]['checkTime']}</Text>
              :
                <Text style={styles.info}>診断の結果がありません。</Text>
            }
          </View>
        </View>
        {results.length > 0 && questions?.map((item, idx) => {
          let labelName = 'result' + (idx + 1)
          if (results.length > 0) {
            return (
              <View key={idx} style={styles.qnaWrap}>
                <View style={styles.question}>
                  <Text style={styles.textQuestion}>{item.text}</Text>
                </View>
                <View style={styles.answer}>
                  {results[0][labelName] === 1
                    ?
                      <FontAwesome name="circle-o" size={22} color="#800000" />
                    :
                      <FontAwesome name="close" size={24} color="#456481" />
                  }
                </View>
              </View>
            )
          }
        })}
      </View>
    </View>
  ) : (<></>);
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 20,
  },
  itemWrap: {
    paddingTop: 25,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  categoryWrap: {
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#456481'
  },
  resultWrap: {
    marginBottom: 12,
  },
  result: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#456481',
    marginBottom: 3
  },
  checkTime: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#456481',
  },
  infoWrap: {
  },
  info: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#464646'
  },
  phoneWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingRight: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  phoneNumWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  phoneIcon: {
    
  },
  qnaWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3
  },
  question: {
    display: 'flex',
    flexDirection: 'row',
    flex: 4,
  },
  answer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textQuestion: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#464646'
  },
});
