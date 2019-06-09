import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from "react-native"
import { connect } from 'react-redux'

import CacheStore from 'react-native-cache-store'


class Splash extends Component {

  componentDidMount() {
    CacheStore.get('token').then((token) => {
      this.props.dispatch({ type: "tokenid", value: token });
      console.log('token_id => ' + token);

      if (token === null || token === '')
        this._navigate('Login');
      else {
        CacheStore.get('voicemails').then((voicemails) => {
          if (voicemails !== null) {
            voicemails.forEach(voicemail => {
              this.props.dispatch({ type: "voicemailsAdd", value: voicemail })
            })
          }
          this._navigate('voicemail');
        });
      }


    });
  }

  _navigate(screen) {
    this.props.navigation.replace(screen)
  }




  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>voicemail App</Text>
        </View>
        <View style={styles.container}>
          <ActivityIndicator size={'small'} />
          <Text style={styles.loadingText}>Loading ...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
   flexDirection: 'column',
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#0277BD"
 },
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#0277BD"
 },
 loadingText: {
   fontSize: 20,
   textAlign: "center",
   margin: 10,
   color: "#FFFFFF"
 }
})

const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken
  }
}
export default connect(mapStateToProps)(Splash)