
import { createStackNavigator, createAppContainer } from 'react-navigation';


import Login from '../Components/login'
import Splash from '../Components/Splash'
import Header from '../Components/Header'

import voicemailList from '../Components/VoicemailList'

import MenuNavigation from './MenuNavigation'

import React from 'react';



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
    screen: MenuNavigation,
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

  // voicemailByPhone: {
  //   screen: voicemailByPhone,
  //   navigationOptions: ({ navigation }) => ({
  //     headerStyle: {
  //       backgroundColor: '#000000',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       width: '100%',
  //       fontWeight: 'bold',
  //       color: "#FFFFFF",
  //     },
  //     title: navigation.state.params.title , 
  //     headerRight : <PopupMenu actions={['supprimer']}  onPress={() => console.log('delete pressed')}/>
  //   })
  // }


});





export default createAppContainer(RootNavigator);




