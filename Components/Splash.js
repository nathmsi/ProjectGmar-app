import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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
    setTimeout(() => { this.props.navigation.replace(screen) }, 50);
  }




  render() {
    return (
      <View style={styles.main_container}>
        
        <Text style={styles.Text}>annatel
                  <Text style={{ color: '#c71585' }}>.mobile</Text>
        </Text>

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
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: 'bold',
    color: "#000000",
    marginTop: 80,
    marginBottom: 100
  },
  loadingText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#000000"
  }
})

const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken
  }
}
export default connect(mapStateToProps)(Splash)