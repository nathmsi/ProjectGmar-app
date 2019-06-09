
import { createStackNavigator , createAppContainer  } from 'react-navigation';

import Login from '../Components/login'
import voicemailList from '../Components/VoicemailList'
import Splash from '../Components/Splash'
import Header from '../Components/Header'
import voicemailByPhone from '../Components/voicemailByPhone'

import React from 'react';





const RootNavigator = createStackNavigator({

  Splash :{
    screen : Splash,
    navigationOptions : {
      header: null
    }
  },

  Login :{
    screen : Login ,
    navigationOptions : {
      title : 'Login',
      headerStyle: {
        backgroundColor: '#1e90ff',
      },
      headerTintColor: '#fff',
        headerTitleStyle: {
            width: '90%',
            textAlign: 'center',
      },
    }
  },
  
  voicemail :{
    screen : voicemailList,
    navigationOptions: ({ navigation }) => ({
      title: 'My voice Mail',
      headerStyle: {
        backgroundColor: '#1e90ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: <Header navigation={navigation} />
    })
  },

  voicemailByPhone :{
    screen : voicemailByPhone,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('Title', ''),
      headerStyle: {
        backgroundColor: '#1e90ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    })
  }
 

  });


  export default createAppContainer(RootNavigator);




