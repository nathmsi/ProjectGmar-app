import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View , StyleSheet , AsyncStorage } from 'react-native';
import CacheStore from 'react-native-cache-store'

class Header extends Component {

  buttonClickListener = () => {
    console.log('logout => set tokenid null ')
    this.props.dispatch({ type: "tokenid", value: '' });
    this.props.dispatch({ type: "voicemailsDeleteAll", value: '' });
    AsyncStorage.setItem('pushtoken', '');
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.buutonStyle}
          onPress={this.buttonClickListener}
          title="Logout"
          color="#0277BD"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }

})



const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken,
    voicemails: state.voicemails
  }
}
export default connect(mapStateToProps)(Header)