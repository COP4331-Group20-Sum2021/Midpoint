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
                            As the Project Manager, I was responsible for overseeing all the 
                            members and the tasks they were working on. My job was to organize 
                            the group so we could succeed in building Midpoint. Therefore, I 
                            worked on creating tasks, hosting meetings, deployment setup, database 
                            setup, presentation slides, brainstorming document, and documentation 
                            of the idea. In addition to that, I collaborated in the development of
                            the API endpoints that handle authentication, the addition of members,
                            groups, and other back-end logic. The hardest part of my job was making
                            sure our database schema would be efficient and polished. We had to 
                            deal with several edge cases that would make our database inefficient 
                            by introducing multiple checks for ownership, authentication, 
                            existence, and duplicates. It was fantastic working on Midpoint with 
                            this team, and I'm proud of what we have developed.                  
                        </Text>
                        </View>

                        <View style={styles.separator}/>
                
                        {/* Joseph Terribile */}
                        <Image style={styles.picture} source={josephTerribile} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Joseph Terribile</Text>
                        <Text style={styles.jobTitle}>GitHub Management/Deployments/Wildcard</Text>
                        <Text style={styles.description}>
                            This project was one of the most fun things I have worked on in the 
                            world of programming recently. It was a big learning experience and
                            allowed for me to familiarize my self with some new programming 
                            technologies and systems. Learning more about NodeJS, ExpressJS, 
                            and React is really important to me. I do or will use these in the
                            future, and getting the experience now, and getting to work with a 
                            team, was really helpful.

                            For this project, I acted primarily as the man with a GitHub plan. I 
                            did code review for all pull requests and made sure that the team kept
                            to a specific Git Flow, in an effort to minimize merge conflicts and 
                            improve productivity. Along with that, I acted as the deployment 
                            manager for Heroku. I automated it to deploy every time a new push 
                            to the main branch was made. I also could pause that and do custom 
                            deployments if needed. I later made a second copy of our Heroku
                            project to act as a staging environment that we could test a Git 
                            branch as if it were live. Aside from that, I did development work 
                            where ever needed. I helped setup the backend server and API, worked
                            with the front end to fix bugs, and generally made my self available 
                            to help.

                            For this project, to help make it easier to know what was happening with 
                            Heroku without checking the logs, I created a NodeJS app (that I hosted on
                            another Heroku instance), that would convert Heroku webhooks into Discord
                            web hooks. This allowed us to view any messages related to builds and 
                            releases from within our Discord channel, where we did the majority of
                            our communication. You can find that project here.

                            Outside of this project, I am an avid game lover and beginner game developer. 
                            I have created a custom 3D rendering engine in Java and OpenGL using LWJGL. 
                            You can find some of my projects on my GitHub.
                        </Text>
                        </View>
                        
                        <View style={styles.separator}/>

                        {/* Wesley Ellery */}
                        <Image style={styles.picture} source={wesleyEllery} />     
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Wesley Ellery</Text>
                        <Text style={styles.jobTitle}>API</Text>
                        <Text style={styles.description}>
                            My name is Wes, and I worked on the API for Midpoint. I work as a Systems Engineer 
                            by trade, where I develop requirements, test procedures and various other solutions
                            for commercial aircraft avionics. I am also a pilot, flying both land and seaplanes
                            whenever I get the chance. While Software Engineering is not a career path I plan
                            to go into, it was still interesting to learn about the various amount of development
                            tools that are available to use in the industry.                        
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Jamie Henry */}
                        <Image style={styles.picture} source={jamieHenry} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Jamie Henry</Text>
                        <Text style={styles.jobTitle}>API</Text>
                        <Text style={styles.description}>
                            I worked mostly on the backend with creating APIs and implementing the automatic swagger
                            documentation for the project. I also came up with the algorithm for calculating the 
                            midpoint coordinate between multiple coordinates. I am excited to use what I have learned 
                            from this project in any future projects I want to create.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Vijay Stroup */}
                        <Image style={styles.picture} source={vijayStroup} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Vijay Stroup</Text>
                        <Text style={styles.jobTitle}>Front End/Mobile/API</Text>
                        <Text style={styles.description}>
                            I worked on the react parts of Midpoint including the website and mobile app. Along with 
                            this, I guided our team through some of the technologies we used and suggested our tech 
                            stack.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Kyle Olson */}
                        <Image style={styles.picture} source={kyleOlson} />             
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Kyle Olson</Text>
                        <Text style={styles.jobTitle}>Front End/Mobile</Text>
                        <Text style={styles.description}>
                            I worked entirely on the Front End on this project primarily using React for the web and 
                            React Native for the mobile. Using React, I was able to implement CRUD functionality for 
                            the Groups and Map page. I also made this about page you are reading right now! I also 
                            created the framework of the mobile which includes setting up React Native mobile navigation 
                            using drawers and stacks. One of the hardest things about my job was smoothly transitioning 
                            from React to React Native. Although they are similar, React Native has unique syntax threw me
                            off while building the mobile. This project overall was a fantastic learning experience by 
                            using the most popular web developer tools right now and I am excited to apply my newly 
                            acquired abilities to the next React project I make.
                        </Text>
                        </View>

                        <View style={styles.separator}/>

                        {/* Devin Besaw */}
                        <Image style={styles.picture} source={devinBesaw} /> 
                        <View style={styles.informationText}>
                        <Text style={styles.memberName}>Devin Besaw</Text>
                        <Text style={styles.jobTitle}>Front End/Mobile/Design</Text>
                        <Text style={styles.description}>
                            For our project Midpoint, my work entirely revolved around building the Front End of our web
                            application. The biggest role I played in developing the Front End was creating the design 
                            for our website. For the design, I started by creating a prototype in Figma and then 
                            translating it into HTML and CSS. This process was my favorite thing about developing on the
                            Front End because it allowed me to bring out my creative side. I also played a role in
                            getting the functionality of our website working. I worked on the the profile page and
                            invitations page which showed me a bit of what React is made of. Overall, I felt this 
                            project was an excellent learning experience that I thoroughly enjoyed. Going into the 
                            future I plan to learn more and consider Front End development as a career choice.
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
        backgroundColor: '#212C3D',
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