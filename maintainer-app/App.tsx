import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';;

//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(rootReducer)

export default function App() {

  // 内部デバイスデータクリア
  // AsyncStorage.clear()

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
