// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image , TouchableOpacity } from 'react-native'
//import Swipeout from 'react-native-swipeout'
// import PlayerAudio from './AudioPlayer'


const voicemail = ({ voicemail, handleDeleteVoicemail, index }) => {

  // const swipeBtns = [{
  //   text: 'Delete',
  //   type: 'delete',
  //   onPress: () => { handleDeleteVoicemail(voicemail.id, index) }
  // }]

  //console.log(formatDate(new Date(voicemail.createdAt)))
  // date1 = new Date(Date.now())
  // date2 = new Date(voicemail.createdAt)
  // var res = Math.abs(date1 - date2) / 1000;
  // var days = Math.floor(res / 86400)
  // var hours = Math.floor(res / 3600) % 24
  // var minutes = Math.floor(res / 60) % 60
  // var seconds = parseInt(res % 60)

  // if (days !== 0)
  //   Timeout = days + " d " + hours + " h " + minutes + " min "
  // else if (hours !== 0)
  //   Timeout = hours + " h " + minutes + " min " + seconds + " sec "
  // else if (minutes != 0)
  //   Timeout = minutes + " mim "
  // else
  //   Timeout = seconds + ' sec '


  return (
    <TouchableOpacity onPress={() =>  handleDeleteVoicemail(voicemail.id, index) }>
    <View style={styles.container}  >
      <View style={styles.main_container}>
        <Image style={styles.icon} source={require('../assets/image/personnage.jpg')} />
        <View style={flexDirection = 'row'}>
          <Text >
            <Text style={{ color: '#c71585' }}>  {voicemail.phone} </Text>  {formatDate(new Date(voicemail.createdAt))}
          </Text>
          <Text style={styles.description}  >{voicemail.content}    </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )

}

const  formatDate = (d) =>{
 
  return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

// 16-05-2015 09:50
}
//  {/* <PlayerAudio url={'../assets/audio/1.mp3'} />   ** if want to play audio file from voicemail**   */} 


const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'column',
  },
  main_container: {
    flexDirection: 'row',
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