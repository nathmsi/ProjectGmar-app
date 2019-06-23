// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'

import Voicemail from './Voicemail'
import { connect } from 'react-redux';



class voicemailsByPhone extends React.Component {


  render() {
    const { phone, handleDeleteVoicemail , createvoicemailsByPhone } = this.props.navigation.state.params;
    const voicemails = this.props.voicemails.filter(x => { return x.phone === phone })
    
    if (voicemails.length === 0) {
      return (
        <View style={styles.container_text}>
          <Text>You d'ont have a voice mail  !</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.notificationList}
            data={voicemails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Voicemail voicemail={item} handleDeleteVoicemail={handleDeleteVoicemail} />}
          />
        </View>
      )

    }
  }

}



const styles = StyleSheet.create({
  container: {
  },
  notificationList: {
    padding: 10,
  },
  container_text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  }
})





const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken,
    voicemails: state.voicemails
  }
}
export default connect(mapStateToProps)(voicemailsByPhone)