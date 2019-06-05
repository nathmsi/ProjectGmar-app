// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View, Alert, ActivityIndicator } from 'react-native'
import {
  Notifications,
} from 'expo';


import Voicemail from './Voicemail'
import { dbVoicemail } from '../API/serverAPI'
import { connect } from 'react-redux';
import CacheStore from 'react-native-cache-store'


class VoicemailList extends React.Component {

  state = {
    voicemails: [],
    isLoading: true
  }


  componentDidMount() {
    console.log('<voicemailList>  componentDidMount')
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    CacheStore.get('voicemails').then((voicemails) => {
      if (voicemails !== null) {
        voicemails.forEach(voicemail => {
          this.props.dispatch({ type: "voicemails", value: voicemail })
        })
      }
      this.setState({ voicemails: this.props.voicemails, isLoading: false })
    });

  }




  _handleNotification = (notification) => {
    this.setState({  isLoading: true })
    this.props.dispatch({ type: "voicemails", value: notification.data })
    this.setState({ voicemails: this.props.voicemails ,  isLoading: false })
  };


  handleDeleteVoicemail = (id) => {
    this.setState({  isLoading: true })
    this.props.dispatch({ type: "voicemailsDelete", value: id })
    this.setState({ voicemails: this.props.voicemails ,  isLoading: false })
  }




  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.notificationList}
            data={this.state.voicemails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Voicemail voicemail={item} handleDeleteVoicemail={this.handleDeleteVoicemail} />}
          />
        </View>
      )
    }
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC'
  },
  notificationList: {
    padding: 10,
  },
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})



const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken,
    voicemails: state.voicemails
  }
}
export default connect(mapStateToProps)(VoicemailList)