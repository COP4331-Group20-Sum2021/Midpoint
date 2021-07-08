import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Nav from './components/nav';
import Home from './components/home';
import Navigator from './routes/homeStack';
import About from './components/about';

export default function App() {

  return(
    <View style={styles.container}>
      <Navigator />
      <View style={styles.content}>
        {/*to form*/}
        <View style={styles.list}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
})