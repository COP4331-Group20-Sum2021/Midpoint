import React, { useState } from 'react';
import { Button, View, Image, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer, StackActions, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

// import { useAuth } from './contexts/authContext';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Register from './components/register';



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

function LogoTitle() {
  return (
    <Image
      style={{ 
        maxWidth: '100%',
        maxHeight: '100%',
        width: 220,
        height: 40,

        
    }}
      source={require('./assets/MidpointLogo.png')}
    />
  )
}

function CustomDrawerContent(props) {
  const {user, logout} = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {!user ? (
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
      ) : (
        <></>
      )}
    </DrawerContentScrollView>
  );
}

export default function App() {
  const {user, logout} = useAuth();
  return(
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={ HomeStackScreen } /> 
        <Drawer.Screen name="About" component={ AboutStackScreen } />
        {!user ? (
          <>
          <Drawer.Screen name="Login" component={ LoginStackScreen } />
          <Drawer.Screen name="Register" component={ RegisterStackScreen } />
          </>
        ) : (
          <></>
        )}

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
