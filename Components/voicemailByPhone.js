// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View , Text, ActivityIndicator } from 'react-native'

import Voicemail from './Voicemail'

const voicemailsByPhone = ({ navigation  }) => {


    if (navigation.state.params.voicemails.length === 0 ){
        return (
          <View style={styles.container_text}>
            <Text>You d'ont have a voice mail  !</Text>
          </View>
        )
      }else{
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.notificationList}
            data={navigation.state.params.voicemails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Voicemail voicemail={item}  handleDeleteVoicemail={navigation.state.params.handleDeleteVoicemail} />}
          />
        </View>
      )
      }
    
}



const styles = StyleSheet.create({
  container: {
  },
  notificationList: {
    padding: 10,
  },
  container_text :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  }
})




export default voicemailsByPhone