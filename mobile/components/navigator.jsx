import * as React from 'react'
import {  View, Image } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/Ionicons'
import Home from './home'
import About from './about'
import Login from './login'
import Register from './register'

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
      <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}} />
    ),
    headerRight: () => ( <></> )
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
      <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}} />
    ),
    headerRight: () => ( <></> )
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
      <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}} />
    ),
    headerRight: () => ( <></> )
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
      <Icon.Button name="ios-menu" size={25} backgroundColor='rgba(159, 179, 209, 1)' onPress={() => {navigation.openDrawer()}} />
    ),
    headerRight: () => ( <></> )
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
        marginRight: 'auto',
        marginLeft: 'auto',
        alignSelf: 'center',
    }}
      source={require('../assets/MidpointLogo.png')}
    />
  )
}

function CustomDrawerContent(props) {
  const {user, logout} = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user ? (
        <DrawerItem
          label="Logout"
          onPress={logout}
        />
      ) : (
        <></>
      )}
    </DrawerContentScrollView>
  );
}

export default function Navigator() {
  const {user} = useAuth();

  return (       
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
  );
}