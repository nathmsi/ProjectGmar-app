import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect , StyleSheet } from 'react-redux';
import PopupMenu from './PopupMenu'
import { dbVoicemail } from '../API/serverAPI'

class Header extends Component {
  state = {
    isProgress: false
  }

  buttonClickListener = () => {
    this.setState( { isProgress : true })
    console.log('logout => set tokenid null ')
    this.props.dispatch({ type: "tokenid", value: '' });
    this.props.dispatch({ type: "voicemailsDeleteAll", value: '' });
    AsyncStorage.setItem('pushtoken', '');
    this.setState( { isProgress : false })
    this.props.navigation.replace('Login');
  }

  allVoicemail = async () =>{
    this.setState( { isProgress : true })
    const voicemails = await dbVoicemail(this.props.mytoken)
    voicemails.forEach(voicemail => {
      this.props.dispatch({ type: "voicemailsAdd", value: voicemail })
    })
    this.setState( { isProgress : false })
    this.props.navigation.replace('voicemail')
  }

  render() {
    return (
      this.state.isProgress 
        ?
        <CustomProgressBar />
        :
        <View>
          <PopupMenu actions={['Logout', 'Load all voicemail']} onPress={this.onPopupEvent} />
        </View>
    )
  }

  onPopupEvent = (eventName, index) => {
    // logout 
    if(index === 0){
      this.buttonClickListener()
    }
    // all voicemails
    else{
      this.allVoicemail()
    }
  }


}


const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View style={{ flex: 1,  backgroundColor: "#0277BD" , alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: '#0277BD', padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '200' , color: "#FFFFFF" }}>Loading ... </Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);


const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken,
    voicemails: state.voicemails
  }
}
export default connect(mapStateToProps)(Header)