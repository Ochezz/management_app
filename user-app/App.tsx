import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)

export default function App() {

  // 内部デバイスデータクリア
  // AsyncStorage.clear()

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },
    trigger: {
      seconds: 5,
      repeats: true,
    },
  });

  const isLoadingComplete = useCachedResources();
  const colorScheme = "light";

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}