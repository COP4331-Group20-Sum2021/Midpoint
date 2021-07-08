import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { red } from 'ansi-colors';

export default function Nav({ navigation }) {

  const openMenu = () => {
    NavigationPreloadManager.openDrawer()
  }

  return (
    <View style={styles.nav}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
      <View style={styles.navContainer}>
        <Image source={require('../assets/midpoint.png')} style={styles.logo} />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    height: 120,
    paddingTop: 20,
    backgroundColor: 'rgba(159, 179, 209, .6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navContainer: {
    marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',
    // width: '100%',
    width: 200,
    height: 50,
  },

  logo: {

    maxWidth: '100%',
    maxHeight: '70%',


  },
  icon: {
    position: 'absolute',
    left: 16,
  },
});