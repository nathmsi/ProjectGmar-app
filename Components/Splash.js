import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Image,
  Easing,
  Dimensions
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
      else
        this._navigate('voicemail');

    });
  }

  _navigate(screen) {
    setTimeout(() => {
      this.props.navigation.replace(screen);
    }, 0);
  }



  render() {
    return (

      <View style={styles.container}>
        <ActivityIndicator size={'small'} />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>

    );
  }
}


const styles = StyleSheet.create({
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
    color : "#f0f8ff"
  }
})


const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken
  }
}
export default connect(mapStateToProps)(Splash)