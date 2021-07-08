import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default function Nav() {
  return (
    <View style={styles.nav}>
      <Image source={require('../assets/midpoint.png')} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    height: 70,
    paddingTop: 20,
    backgroundColor: 'rgba(159, 179, 209, .6)',
  },

  logo: {
    width: '45%',
    height: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    

  },

});