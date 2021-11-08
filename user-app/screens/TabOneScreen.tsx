import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

//redux
import { useDispatch } from 'react-redux'
import { resetModal } from '../reducer/reduxModal';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const dispatch = useDispatch()

  //同意ボタン押下時
  const pressAgree = async (navigation : any) => {
    await AsyncStorage.getItem("userInfo", ( err, value )=>{
      if (err == null && value !== null){
        //登録情報あり、チェックシートへ
        dispatch(resetModal())
        navigation.navigate('Question')
      }
      else {
        //登録情報なし、情報登録へ
        Alert.alert("先に情報登録を行ってください。")
        navigation.navigate('TabTwo')
      }
    }).catch(err => console.log(err));
  }

  
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener : any = useRef();
//   const responseListener : any = useRef();

//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//     }),
//   });

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener((notification : any) => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener((response : any) => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

  
// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "体調チェック",
//       body: '最終チェックから1時間が立ちました。\n体調チェックを行ってください。',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

  return (
    <View style={styles.container}>
      {/* <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification } </Text>
        <Text>Body: {notification }</Text>
        <Text>Data: {notification }</Text>
      </View> */}
      <View style={styles.contents}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>注意事項</Text>
        </View>
        <Text style={styles.notTitle}>ご記入いただいた個人情報は、新型コロナウイルス感染症拡大防止目的に利用し、厳重に取扱うものとします。</Text>
        <Text style={styles.notTitle}>新型コロナウイルス感染症拡大防止のため、国又は保健所から情報提供の求めがあった場合は、ご記入いただいた個人情報を提供することがあります。</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonView}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Modal1')}
          onPress={() => pressAgree(navigation)}
          // onPress={async () => {
          //   await schedulePushNotification();}}
          style={styles.button}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>同意する</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  notTitle: {
    fontSize: 25,
  },
  titleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: {
    marginLeft: 20,
    marginRight: 20,
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
  }
});
