////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THIS FILE IS HERE BECAUSE I WANTED TO PUT THE SCREENS IN A SEPARATE FILE TO MAKE APP.JSX CLEANER BUT I COULDN'T FIGURE OUT HOW :)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




import * as React from 'react';
import { Button, View, Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../components/home';
import About from '../components/about';
import Login from '../components/login';
import Register from '../components/register';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'rgba(159, 179, 209, 1)',
    },
  }}>

    <HomeStack.Screen name="Home" component={ Home } options={{
      headerTitle: props => <LogoTitle {...props} />,
      headerLeft: () => (
        <View>
        <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}}>
        </Icon.Button>
        </View>
      )
    }} />
  </HomeStack.Navigator>
);

const AboutStackScreen = ({ navigation }) => (
  <AboutStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'rgba(159, 179, 209, 1)',
    },
  }}>

  <AboutStack.Screen name="About" component={ About } options={{
    headerTitle: props => <LogoTitle {...props} />,
    headerLeft: () => (
      <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}}>
      </Icon.Button>
    )
    }} />
  </AboutStack.Navigator>
);

const LoginStackScreen = ({ navigation }) => (
    <LoginStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'rgba(159, 179, 209, 1)',
      },
    }}>
  
      <LoginStack.Screen name="Login" component={ Login } options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
          <View>
          <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}}>
          </Icon.Button>
          </View>
        )
      }} />
    </LoginStack.Navigator>
);
  
const RegisterStackScreen = ({ navigation }) => (
    <RegisterStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: 'rgba(159, 179, 209, 1)',
        },
    }}>

    <RegisterStack.Screen name="Register" component={ Register } options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}}>
        </Icon.Button>
        )
        }} />
    </RegisterStack.Navigator>
);