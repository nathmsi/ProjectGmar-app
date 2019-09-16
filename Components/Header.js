import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import PopupMenu from './PopupMenu'

import { dbVoicemail } from '../API/serverAPI'

class Header extends Component {

  state = {
    isProgress: false,
    visible: false
  }

  componentWillUnmount() {
    this.setState({ isProgress: false, visible: false })
  }

  handlLogOut = () => {
    try {
      this.setState({ isProgress: true, visible: true })
      console.log('logout => set tokenid null ')
      this.props.dispatch({ type: "tokenid", value: '' });
      this.props.dispatch({ type: "voicemail_Delete_All", value: '' });
      AsyncStorage.setItem('pushtoken', '');
      this.setState({ isProgress: false, visible: false })
      this.props.navigation.replace('Login');
    } catch (err) {
      Alert.alert(
        err,
        [
          { text: 'OK', onPress: () => this.setState({ phone: '', isLoading: false }) },
        ],
        { cancelable: false },
      );
      console.log('error login ' + err)
    }
  }

  getAllVoicemail = async () => {
    try {
      this.setState({ isProgress: true, visible: true })

      let voicemails = await dbVoicemail(this.props.mytoken)
      if (voicemails instanceof Array && voicemails.length > 0) {
        this.props.dispatch({ type: "voicemails", value: voicemails });
      }
      this.setState({ isProgress: false, visible: false })
      this.props.navigation.replace('voicemail')
    
  } catch(err) {
    this.setState({ isProgress: false, visible: false })
    console.log('error login ' + err)
  }
}



  onPopupEvent = (eventName, index) => {
    // logout 
    if (index === 0) {
      this.handlLogOut()
    }
    // all voicemails
    else if (index === 1) {
      this.getAllVoicemail()
    }
  }


  render() {
    return (
      this.state.isProgress
        ?
        <CustomProgressBar visible={this.state.visible} />
        :
        <View>
          <PopupMenu actions={['Logout', 'Load all voicemail']} onPress={this.onPopupEvent} visible={this.state.visible} />
        </View>
    )
  }




}


const CustomProgressBar = ({ visible }) => (
  <View style={styles.main_container}>
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.Text}>annatel
          <Text style={{ color: '#c71585' }}>.mobile</Text>
        </Text>
        <View style={{ borderRadius: 10, backgroundColor: '#FFFFFF', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200', fontWeight: 'bold', color: "#c71585" }}>Loading ... </Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  </View>
);



const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  Text: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: 'bold',
    color: "#000000",
    marginTop: 80,
    marginBottom: 100
  }
});


const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken,
    voicemails: state.voicemails
  }
}
export default connect(mapStateToProps)(Header)