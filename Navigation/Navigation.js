
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../Components/login'
import voicemailList from '../Components/VoicemailList'
import Splash from '../Components/Splash'
import Header from '../Components/Header'
import voicemailByPhone from '../Components/voicemailByPhone'

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PopupMenu from '../Components/PopupMenu'



const RootNavigator = createStackNavigator({

  Splash: {
    screen: Splash,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
      },
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
      },
    }
  },

  voicemail: {
    screen: voicemailList,
    navigationOptions: ({ navigation }) => ({
      title: 'annatel.',
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        width: '100%',
        textAlign: "center",
        fontWeight: 'bold',
        color: "#FFFFFF",
      },
      headerRight: <Header navigation={navigation} />
    })
  },

  voicemailByPhone: {
    screen: voicemailByPhone,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        width: '100%',
        fontWeight: 'bold',
        color: "#FFFFFF",
      },
      title: navigation.state.params.title , 
      headerRight : <PopupMenu actions={['supprimer']}  onPress={() => console.log('delete pressed')}/>
    })
  }


});





export default createAppContainer(RootNavigator);




