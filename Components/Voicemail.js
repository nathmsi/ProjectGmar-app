// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import Swipeout from 'react-native-swipeout';

const voicemail = ({ voicemail, handleDeleteVoicemail }) => {

  const swipeBtns = [{
    text: 'Delete',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { handleDeleteVoicemail(voicemail.id) }
  }]

  return (
    <Swipeout 
      right={swipeBtns}
      autoClose={true}
      backgroundColor='transparent'>
      <View style={styles.container}>
        <Text style={styles.phone}> Telephon :  {voicemail.phone}</Text>
        <View style={styles.main_container}>
          <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/notification/ultraviolet/50/3498db' }} />
          <View style={flexDirection = 'column'}>
            <Text style={styles.description} > Content => {voicemail.content}</Text>
            <Text style={styles.description} > urgencyDetection => {voicemail.urgencyDetection}</Text>
            <Text style={styles.description} > languageClassifier => {voicemail.languageClassifier}</Text>
          </View>
        </View>
      </View>
    </Swipeout>
  )


}




const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  main_container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 8,
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 13,
    color: "#3498db",
    marginLeft: 10,
  },
  phone: {
    fontSize: 15,
    color: "#3498db",
    marginLeft: 10,
  },

})



export default voicemail