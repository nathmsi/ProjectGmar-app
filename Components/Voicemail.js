// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image , Button } from 'react-native'



const voicemail = ({ voicemail , handleDeleteVoicemail }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.phone}>  {voicemail.phone}</Text>
      <View style={styles.main_container}>
        <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/notification/ultraviolet/50/3498db' }} />
        <View style={flexDirection = 'column'}>
          <Text style={styles.description} > Content => {voicemail.content}</Text>
          <Text style={styles.description} > urgencyDetection => {voicemail.urgencyDetection}</Text>
          <Text style={styles.description} > languageClassifier => {voicemail.languageClassifier}</Text>
          <Button onPress={() => handleDeleteVoicemail(voicemail.id)} title="delete"color="#0277BD" />
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderRadius: 10,
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