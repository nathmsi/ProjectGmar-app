// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View, Alert, ActivityIndicator } from 'react-native'
import {
  Notifications,
} from 'expo';

import Voicemail from './Voicemail'
import { connect } from 'react-redux';

class VoicemailList extends React.Component {

  _isMounted = false;

  state = {
    voicemails: [],
    isLoading: true
  }


  componentDidMount() {
    this._isMounted = true;
    console.log('<voicemailList>  componentDidMount')
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ voicemails: this.props.voicemails, isLoading: false })
    if(this.state.voicemails === []) Alert.alert('0 voice mail')
  }

  componentWillUnmount() {
    this._isMounted = false;
  }




  _handleNotification = (notification) => {
    if (this._isMounted) {
      this.setState({ isLoading: true })
      this.props.dispatch({ type: "voicemails", value: notification.data })
      this.setState({ voicemails: this.props.voicemails, isLoading: false })
    }
  };


  handleDeleteVoicemail = (id) => {
      this.props.dispatch({ type: "voicemailsDelete", value: id })
      this.setState({ voicemails: this.props.voicemails })
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