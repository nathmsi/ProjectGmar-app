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
    //this._loadvoicemails(this.props.mytoken)

    CacheStore.get('voicemails').then((voicemails) => {
      if (voicemails !== null) {
        voicemails.forEach(voicemail => {
          this.props.dispatch({ type: "voicemails", value: voicemail })
        })
      }
      // CacheStore.set('voicemails', null, null);
      console.log(this.props.voicemails)
      this.setState({ voicemails: this.props.voicemails, isLoading: false })
    });

  }




  _handleNotification = (notification) => {
    this.setState({  isLoading: true })
    this.props.dispatch({ type: "voicemails", value: notification.data })
    console.log(this.props.voicemails)
    this.setState({ voicemails: this.props.voicemails ,  isLoading: false })
  };


  handleDeleteVoicemail = (id) => {
    this.setState({  isLoading: true })
    this.props.dispatch({ type: "voicemailsDelete", value: id })
    this.setState({ voicemails: this.props.voicemails ,  isLoading: false })
  }


  // _loadvoicemails = async (token) => {
  //   await dbVoicemail(token).then(
  //     data => {
  //       if (data.err) {
  //         alert(data.err)
  //         this.props.navigation.replace('login');
  //       } else {
  //         var count = Object.keys(data).length;
  //         if (count == 0) {
  //           Alert.alert('You dont have voice mail');
  //           this.setState({ isLoading: false })
  //         }
  //         else
  //           this.setState({ isLoading: false, voicemails: data })
  //       }
  //     })
  // }





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