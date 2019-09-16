// Navigation/Navigation.js
import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import voicemailList from '../Components/VoicemailList'


const MoviesTabNavigator = createBottomTabNavigator({
    Contacts: {
        screen: () => {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Contacts</Text></View>
        },
        navigationOptions: {
            tabBarIcon: () => { 
                return (
                    <View style={styles.container}>
                        <Image
                              source={require('../assets/image/logo_contacts.png')}
                            style={styles.icon} />
                        <Text>Contacts</Text>
                    </View>
                )
            }
        }
    },
    Historique: {
        screen: () => {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Historique</Text></View>
        },
        navigationOptions: {
            tabBarIcon: () => { 
                return (
                    <View style={styles.container}>
                        <Image
                             source={require('../assets/image/logo_historique.jpg')}
                            style={styles.icon} />
                        <Text>Historique</Text>
                    </View>
                )
               
            }
        }
    },
    Clavier: {
        screen: () => {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Clavier</Text></View>
        },
        navigationOptions: {
            tabBarIcon: () => { 
                return (
                    <View style={styles.container}>
                        <Image
                           source={require('../assets/image/logo_clavier.jpg')}
                            style={styles.icon} />
                        <Text>Clavier</Text>
                    </View>
                )
            }
        }
    },
    Messages: {
        screen: voicemailList,
        navigationOptions: {
            tabBarIcon: () => { 
                return (
                    <View style={styles.container}>
                        <Image
                             source={require('../assets/image/logo_messages.png')}
                            style={styles.icon} />
                        <Text>Messages</Text>
                    </View>
                )
            }
        }
    },
    Reglages: {
        screen: () => {
            return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Reglages</Text></View>
        },
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/image/logo_reglages.png')}
                            style={styles.icon} />
                        <Text>Reglages</Text>
                    </View>
                )
            }
        }
    }
},
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        },
        initialRouteName: "Messages"
    }
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: "center",
      },
    icon: {
        width: 25,
        height: 25
    }
})


export default createAppContainer(MoviesTabNavigator)