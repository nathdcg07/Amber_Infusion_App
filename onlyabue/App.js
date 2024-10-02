import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import initializeCollections from './services/initFirestore';

export default function App() {
  
  useEffect(() => {
    const init = async () => {
      try {
        await initializeCollections();
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
