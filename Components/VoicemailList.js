// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View, Alert, Text, ActivityIndicator } from 'react-native'
import {
  Notifications,
} from 'expo';
import Loader from "react-native-modal-loader";


import Voicemail from './Voicemail'
import { connect } from 'react-redux'

class VoicemailList extends React.Component {

  _isMounted = false

  state = {
    voicemails: [],
    isLoading: true,
  }



  componentDidMount() {
    this._isMounted = true;
    console.log('<voicemailList>  componentDidMount')
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    // this.setState({ voicemails: this.props.voicemails })
    this.setState({ isLoading: false })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }



  _handleNotification = async (notification) => {
    if (this._isMounted) {
      this.setState({ isLoading: true })

      if (notification.origin === 'received') {
        Alert.alert(
          'Nouveau message vocale recu !',
          ('de : ' + notification.data.phone),
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }

      notification.data.dateReceived = Date.now()
      await this.props.dispatch({ type: "voicemail_Add", value: notification.data })
      // this.setState({ voicemails: this.props.voicemails })
      this.setState({ isLoading: false })
    }
  }



  handleDeleteVoicemail = async (id) => {
 
    if (this._isMounted) {
      //this.setState({ isLoading: true })

      Alert.alert(
        'Voicemail option',
        "",
        [
          {
            text: 'Annule',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'supprimer',
            onPress: async () => {
              this.setState({ isLoading: true })
              await this.props.dispatch({ type: "voicemail_Delete", value: id })
              console.log(id + ' delete')
              this.setState({ isLoading: false })
            }
          }
        ],
        { cancelable: false },
      );
    }
   
  }

  render() {

    let { voicemails } = this.props

    voicemails = voicemails.reverse()

    if (this.state.isLoading === true) {
      return (
        <View style={styles.container_}>
          <Loader loading={this.state.isLoading} color="#ff66be" />
        </View>
      )
    } else {
      if (voicemails.length === 0) {
        return (
          <View style={styles.container_text}>
            <Text>Vous avez aucun message vocal</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <FlatList
              style={styles.notificationList}
              ItemSeparatorComponent={FlatListItemSeparator}
              data={voicemails}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) =>
                <Voicemail voicemail={item} index={index} handleDeleteVoicemail={this.handleDeleteVoicemail} />
              }
            />
          </View>
        )
      }
    }
  }


}

FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container_: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
export default connect(mapStateToProps)(VoicemailList)