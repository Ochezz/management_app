import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, NativeModules, Alert } from 'react-native';
import axios from 'axios';
import { RootTabScreenProps } from '../types';
const { StatusBarManager } = NativeModules
import { Text, View } from '../components/Themed';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isMax, setIsMax] = useState(false);
  const [onUpdate, setOnUpdate] = useState({});
  const [updateTextValue, setUpdateTextValue] = useState({});

  useEffect(() => {
    selectQuestions()
  }, [])

  const selectQuestions = async () => {
    try{
      let url="http://192.168.10.32:3000/TabTwo/selectQuestions";

      const response = await axios.get(url)
      if (response.data.length > 0) {
        if (response.data.length === 10) {
          setIsMax(true)
        } else {
          setIsMax(false)
        }
        setQuestions(response.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const insertQuestion = async () => {
    try{
      let url="http://192.168.10.32:3000/TabTwo/insertQuestion/";

      await axios.post(url, {question: question})
      .then(response => {
        selectQuestions()
      })
      .catch(response => {
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const deleteQuestion = async (id: number) => {
    try{
      let url="http://192.168.10.32:3000/TabTwo/deleteQuestion/";

      await axios.post(url, {id: id})
      .then(response => {
        selectQuestions()
      })
      .catch(response => {
      });
    }
    catch(error){
      console.log(error)
    }
  }

  const updateQuestion = async (id: number) => {

    if (updateTextValue[id] !== null && updateTextValue[id] !== undefined) {
      try{
        let url="http://192.168.10.32:3000/TabTwo/updateQuestion/";
        await axios.post(url, {id: id, text: updateTextValue[id]})
        .then(response => {
          selectQuestions()
        })
        .catch(response => {
        });
      }
      catch(error){
        console.log(error)
      }
    }
    setOnUpdate({...onUpdate, [id]: false})
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrap}>
        <View style={styles.contentWrap}>
          <Text style={styles.textTitle}>質問登録</Text>
          <TextInput
            style={{
              borderColor: '#456481',
              borderStyle: 'solid',
              borderWidth: 1,
              textAlignVertical: 'top',
              padding: 10,
              fontSize: 20,
              fontWeight: 'bold',
              backgroundColor: isMax ? '#aaaaaa' : 'white'
            }}
            multiline={true}
            numberOfLines={3}
            maxLength={40}
            onChangeText={(text)=>setQuestion(text)}
            placeholder={isMax ? "質問は10問以上登録できません。" : "質問の内容を入力してください。"}
            keyboardType="default"
            editable={!isMax ?? false}
          />
          <TouchableOpacity
            onPress={()=>insertQuestion()}
            style={styles.button}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>保存</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentWrap}>
          <View style={styles.tableHeaderContainer}>
            <View style={styles.text}><Text style={styles.textHeader}>質問一覧</Text></View>
          </View>
          {questions?.map((item: any, idx) => {
            let id = item.id
            return (
              <View
                key={idx}
                style={styles.rowContainer}
              >
                <View style={styles.rowTextContainer}>
                  <View style={styles.id}><Text style={styles.textRowId}>{idx+1}</Text></View>
                  <View style={styles.text}>
                    {onUpdate[id]
                      ?
                        <TextInput
                          style={styles.textUpdate}
                          multiline={true}
                          numberOfLines={3}
                          maxLength={40}
                          defaultValue={item.text}
                          onChangeText={(text)=>setUpdateTextValue({...updateTextValue, [id]: text})}
                          placeholder="修正する内容を入力してください。"
                          keyboardType="default"
                        />
                      :
                        <Text style={styles.textRow}>{item.text}</Text>}
                  </View>
                </View>
                <View style={styles.rowButtonContainer}>
                  <View style={styles.optionsButtonsWrap}>
                    <TouchableOpacity
                      onPress={() => {
                        if (onUpdate[id]) {
                          updateQuestion(id)
                        } else {
                          setOnUpdate({...onUpdate, [id]: true})
                        }
                      }}
                      style={styles.updateButton}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>修正</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.optionsButtonsWrap}>
                    <TouchableOpacity
                      onPress={() => {onUpdate[id] ? setOnUpdate({...onUpdate, [id]: false}) : deleteQuestion(id)}}
                      style={styles.deleteButton}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                          {onUpdate[id] ? '戻る' : '削除'}
                        </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10
  },
  scrollWrap: {
    paddingRight: 10
  },
  contentWrap: {
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#456481',
    fontSize: 22,
    marginLeft: 5,
    marginBottom: 5
  },
  textUpdate: {
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#505050',
  },
  button: {
    backgroundColor: '#456481',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#456481',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 30,
    height: 40,
    shadowColor: '#838383',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
  },
  tableHeaderContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: '#456481',
    marginBottom: 5,
    paddingBottom: 2
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#456481',
  },
  rowTextContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowButtonContainer: {
    paddingBottom: 12,
    paddingTop: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  optionsButtonsWrap: {
    width: '18%',
    marginLeft: 5
  },
  id: {
    flex: 1,
  },
  text: {
    flex: 10,
  },
  options: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textHeader: {
    fontWeight: 'bold',
    color: '#456481',
    fontSize: 22,
    marginLeft: 5
  },
  textHeaderAbnormal: {
    fontWeight: 'bold',
    color: '#456481',
    textAlign: 'center',
    fontSize: 22
  },
  textRow: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#505050',
    marginLeft: 5
  },
  textRowId: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#456481',
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
  },
  updateButton: {
    backgroundColor: '#456481',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
  },
  deleteButton: {
    backgroundColor: '#456481',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
