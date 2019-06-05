
import { createStackNavigator , createAppContainer  } from 'react-navigation';

import Login from '../Components/login'
import voicemailList from '../Components/VoicemailList'
import Splash from '../Components/Splash'
import Header from '../Components/Header'

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
      headerTintColor: '#0277BD',
        headerTitleStyle: {
            width: '90%',
            textAlign: 'center',
      },
    }
  },
  
  voicemail :{
    screen : voicemailList,
    navigationOptions: ({ navigation }) => ({
      title : 'My voice Mail',
      headerTintColor: '#0277BD',
        headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
      },
      headerRight: <Header navigation={navigation} />
    })
  }
 

  });


  export default createAppContainer(RootNavigator);




