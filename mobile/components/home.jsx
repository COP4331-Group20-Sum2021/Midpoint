import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import createGroupsPicture from '../assets/create-groups.png';
import findMidpointsPicture from '../assets/find-midpoints.png';
import meetUpPicture from '../assets/meet-up.png';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
    return (
        <ScrollView>
            <View style={[styles.content, {width:width}]}>
                <View style={styles.container}>
                    <View style={styles.information}>
                        <Image style={styles.picture} source={createGroupsPicture}/>
                        <Text style={styles.title}>Create Groups</Text>
                        <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        <View style={styles.seperator}/>
                        <Image style={styles.picture} source={findMidpointsPicture}/>
                        <Text style={styles.title}>Find Midpoints</Text>
                        <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        <View style={styles.seperator}/>
                        <Image style={styles.picture} source={meetUpPicture}/>
                        <Text style={styles.title}>Meet Up</Text>
                        <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        <View style={{padding: 20}}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    information: {
        backgroundColor: '#9FB3D1'
    },
    seperator: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginRight: 50,
        marginLeft: 50,
        marginBottom: 30,
        marginTop: 50
    },
    picture: {
        alignSelf: 'center',
        width: 250,
        height: 250,
        borderRadius: 200,
        margin: 20
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20,
        color: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    }
});