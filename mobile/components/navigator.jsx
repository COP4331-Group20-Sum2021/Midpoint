import * as React from "react";
import { View, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Ionicons";
import Home from "./home";
import About from "./about";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import Groups from "./groups";
import Invitations from "./invitations";
import Map from "./map";

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const GroupsStack = createStackNavigator();
const InvitationsStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </HomeStack.Navigator>
);

const AboutStackScreen = ({ navigation }) => (
  <AboutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <AboutStack.Screen
      name="About"
      component={About}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </AboutStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </ProfileStack.Navigator>
);

const GroupsStackScreen = ({ navigation }) => (
  <GroupsStack.Navigator
    initialRouteName="Groups"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <GroupsStack.Screen
      name="Groups"
      component={Groups}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />

    <GroupsStack.Screen
      name="Map"
      component={Map}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
    {/* <GroupsStack.Screen
      name="Modal"
      component={Modal}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    /> */}
  </GroupsStack.Navigator>
);

const InvitationsStackScreen = ({ navigation }) => (
  <InvitationsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <InvitationsStack.Screen
      name="Invitations"
      component={Invitations}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </InvitationsStack.Navigator>
);

const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </LoginStack.Navigator>
);

const RegisterStackScreen = ({ navigation }) => (
  <RegisterStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#212C3D",
      },
    }}
  >
    <RegisterStack.Screen
      name="Register"
      component={Register}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#212C3D"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        headerRight: () => <></>,
      }}
    />
  </RegisterStack.Navigator>
);

function LogoTitle() {
  return (
    <Image
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        width: 220,
        height: 40,
        marginRight: "auto",
        marginLeft: "auto",
        alignSelf: "center",
      }}
      source={require("../assets/MidpointLogo.png")}
    />
  );
}

function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user ? <DrawerItem label="Logout" onPress={logout} /> : <></>}
    </DrawerContentScrollView>
  );
}

export default function Navigator() {
  const { user } = useAuth();

  if (user && !user.emailVerified) {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="About" component={AboutStackScreen} />
      </Drawer.Navigator>
    );
  } else if (user && user.emailVerified) {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="About" component={AboutStackScreen} />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
        <Drawer.Screen name="Groups" component={GroupsStackScreen} />
        <Drawer.Screen name="Invitations" component={InvitationsStackScreen} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="About" component={AboutStackScreen} />
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Register" component={RegisterStackScreen} />
      </Drawer.Navigator>
    );
  }
}
