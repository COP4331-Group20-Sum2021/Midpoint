import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import nathanWilk from '../assets/nathanwilk.jpg';
import josephTerribile from '../assets/josephterribile.jpg';
import wesleyEllery from '../assets/wesleyellery.jpg';
import jamieHenry from '../assets/jamiehenry.jpg';
import vijayStroup from '../assets/vijaystroup.jpg';
import kyleOlson from '../assets/kyleolson.jpg';
import devinBesaw from '../assets/devinbesaw.jpg';

export default function About({ navigation }) { 
    return (
        <ScrollView>
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={styles.information}>
                        <Text style={styles.bigTitle}>MEET THE MIDPOINT TEAM</Text>

                        <View style={styles.separator}/>

                        {/* Nathan Wilk */}
                        <Image style={styles.picture} source={nathanWilk} />
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Nathan Kurelo Wilk</Text>
                        <Text style={styles.jobTitle}>Project Manager/API/Database</Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        </View>

                        <View style={styles.separator}/>
                
                        {/* Joseph Terribile */}
                        <Image style={styles.picture} source={josephTerribile} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Joseph Terribile</Text>
                        <Text style={styles.jobTitle}>Wildcard</Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        </View>
                        
                        <View style={styles.separator}/>

                        {/* Wesley Ellery */}
                        <Image style={styles.picture} source={wesleyEllery} />     
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Wesley Ellery</Text>
                        <Text style={styles.jobTitle}>API</Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Jamie Henry */}
                        <Image style={styles.picture} source={jamieHenry} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Jamie Henry</Text>
                        <Text style={styles.jobTitle}>API</Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Vijay Stroup */}
                        <Image style={styles.picture} source={vijayStroup} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Vijay Stroup</Text>
                        <Text style={styles.jobTitle}>FrontEnd/Mobile/API</Text>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ir
                            ure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excep
                            teur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Kyle Olson */}
                        <Image style={styles.picture} source={kyleOlson} />             
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Kyle Olson</Text>
                        <Text style={styles.jobTitle}>FrontEnd</Text>
                        <Text style={styles.description}>
                            I worked entirely on the Front End on this project primarily using React for the web and React Native for the mobile.
                            I also made this about page you are reading right now! I also created the framework of the mobile which includes setting up React Native mobile navigation using
                            drawers and stacks. One of the hardest things about my job was smoothly transitioning from React to React Native. Although they are similar, React Native has
                            unique syntax threw me off while building the mobile. This project overall was a fantastic learning experience by using the most popular web developer tools
                            right now and I am excited to apply my newly acquired abilities to the next React project I make.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Devin Besaw */}
                        <Image style={styles.picture} source={devinBesaw} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Devin Besaw</Text>
                        <Text style={styles.jobTitle}>FrontEnd</Text>
                        <Text style={styles.description}>
                            I worked entirely on the Front End on this project primarily using React for the web and React Native for the mobile.
                            I also made this about page you are reading right now! I also created the framework of the mobile which includes setting up React Native mobile navigation using
                            drawers and stacks. One of the hardest things about my job was smoothly transitioning from React to React Native. Although they are similar, React Native has
                            unique syntax threw me off while building the mobile. This project overall was a fantastic learning experience by using the most popular web developer tools
                            right now and I am excited to apply my newly acquired abilities to the next React project I make.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    information: {
        backgroundColor: '#9FB3D1',
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 50,
        marginTop: 50,
    },
    bigTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 80,
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
        color: 'white',
    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: 200,
        alignSelf: 'center',
    },
    memberName: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    jobTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
    description: {
        textAlign: 'center',
        fontSize: 15,
        marginRight: 50,
        marginLeft: 50,
        color: 'white',
    },
});