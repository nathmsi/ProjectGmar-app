// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Swipeout from 'react-native-swipeout'
import PlayerAudio from './AudioPlayer'


const voicemail = ({ voicemail, handleDeleteVoicemail }) => {

  const swipeBtns = [{
    text: 'Delete',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { handleDeleteVoicemail(voicemail.id, voicemail.phone) }
  }]

  // let newVoicemail = <></>
  // if (voicemail.read === false) {
  //   newVoicemail = <Text style={styles.phone}><Text style={{ fontWeight: "bold" }}> (New Voicemail)</Text></Text>
  // }


  date1 = new Date(Date.now())
  date2 = new Date(voicemail.dateReceived)
  var res = Math.abs(date1 - date2) / 1000;
  var days = Math.floor(res / 86400)
  var hours = Math.floor(res / 3600) % 24
  var minutes = Math.floor(res / 60) % 60
  var seconds = parseInt(res % 60)

  if (days !== 0)
    Timeout = days + "d " + hours + "h " + minutes + "min"
  else if (hours !== 0)
    Timeout = hours + "h " + minutes + "min " + seconds + "sec"
  else if (minutes != 0)
    Timeout = minutes + " mim"
  else
    Timeout = seconds + ' sec'


  return (
    <View style={styles.container}>
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'>
        <View style={styles.main_container}>

          <Image style={styles.icon} source={require('../assets/image/personnage.jpg')} />

          <View style={flexDirection = 'row' }> 
            <Text >
              <Text style={{ color: '#c71585'  }}>  {voicemail.phone} </Text>  {Timeout}
            </Text>
              <Text style={styles.description}  >{voicemail.content}    </Text>
            <PlayerAudio url={'../assets/audio/1.mp3'} />
          </View>
        </View>
      </Swipeout>
    </View>
  )

}




const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
  },
  main_container: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    borderRadius: 8,
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000000",
    marginLeft: 10,
    flex: 1,
    overflow: 'hidden',
    width: 300,
  }

})



export default voicemail