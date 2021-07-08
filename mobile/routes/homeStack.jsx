import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Home from '../components/home';
import About from '../components/about';
import Nav from '../components/nav';
import React from 'react';


const screens = {
    Home: {
        screen: Home,
        // navigationOptions: () => {
        //     return {
        //         headerTitle: () => <Nav navigation={navigation}/>,
        //     }
            
        // }
    },
    About: {
        screen: About,
        // navigationOptions: {
        //     title: "AboutPage"
        // }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444'
        // headerStyle: {backgroundColor: '#eee', height: 60}
    }
});

export default createAppContainer(HomeStack);