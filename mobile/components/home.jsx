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
                            Planning a night out with friends but cant decide where to go? Want to get dinner with your significant other but neither of you 
                            can decide which establishment is for you? Well Midpoint is the app for you! Midpoint is an application to make getting together 
                            with friends easier. Sign up and create a group through our interface. From there, midpoint will get everyone's current locations, 
                            and it will give you a list of places in the middle of all of you.
                        </Text>
                        <View style={styles.seperator}/>
                        <Image style={styles.picture} source={findMidpointsPicture}/>
                        <Text style={styles.title}>Find Midpoints</Text>
                        <Text style={styles.description}>
                            Midpoint will automatically create a circle in the center of a group to find establishments of equal distance from all members. 
                            Then, midpoint will grab all of those establishments in the circle and return a list of them to you with their name, address, and rating.
                        </Text>
                        <View style={styles.seperator}/>
                        <Image style={styles.picture} source={meetUpPicture}/>
                        <Text style={styles.title}>Meet Up</Text>
                        <Text style={styles.description}>
                            Midpoint will give you a list of various establishments to meet up at. Those establishments can be sorted by type to filter out places your
                            group might not what to go to. Restaurants, entertainment, recreation, and shopping can all be filtered to find the perfect place for your 
                            group to meet up. Additionally, ratings can be seen for each establishment to determine places not worth going to.
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