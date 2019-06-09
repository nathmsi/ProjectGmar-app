// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList, View, Alert , Text, ActivityIndicator } from 'react-native'
import {
  Notifications,
} from 'expo';

import Voicemail from './Voicemail'
import { connect } from 'react-redux';
import ListPhone from './ListPhone'

class VoicemailList extends React.Component {

  _isMounted = false;

  state = {
    voicemailsByPhone : [],
    voicemails: [],
    isLoading: true
  }


  componentDidMount() {
    this._isMounted = true;
    console.log('<voicemailList>  componentDidMount')
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ voicemails: this.props.voicemails, isLoading: false })
    this.createvoicemailsByPhone()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }






  createvoicemailsByPhone = () =>{
    try{
    const  voicemails  = this.props.voicemails
    let voicemailsByPhone  = []
    let listPhone  = []
    let voicemailElement = []

    voicemails.forEach(element => {
       listPhone.push(element.phone)
    });

    listPhone = [...new Set(listPhone)]

    listPhone.forEach(phone => {
      voicemailElement = []
      voicemails.forEach(voicemail => {
          if(voicemail.phone === phone){
            voicemailElement.push(voicemail)
          }
      })
      if(voicemailElement.length !== 0){
              voicemailsByPhone.push(voicemailElement)
      }
    })

    this.setState( { voicemailsByPhone } )
  }catch(err){
    console.log(err)
  }


  }




  _handleNotification = (notification) => {
    
    if (this._isMounted) {
      this.setState({ isLoading: true })
      this.props.dispatch({ type: "voicemailsAdd", value: notification.data })
      this.setState({ voicemails: this.props.voicemails, isLoading: false })
      this.createvoicemailsByPhone()
    }
  };

  getvoicemailbyPhone(phone){
    let result = []
    this.props.voicemails.forEach(element =>{
      if(element.phone === phone){
        result.push(element)
      }
    })
    return result
  }



  handleDeleteVoicemail = (id , phone) => {
      if (this._isMounted) {
      this.props.dispatch({ type: "voicemailsDelete", value: id })
      this.setState({ voicemails: this.props.voicemails })
      this.createvoicemailsByPhone()
      this.handlePhoneSeleceted(this.getvoicemailbyPhone(phone))
      }
  }


  handlePhoneSeleceted = (voicemails) =>{
    this.props.navigation.navigate(
      'voicemailByPhone',{
       voicemails : voicemails ,
       handleDeleteVoicemail : this.handleDeleteVoicemail.bind(this)
      }
    )
  }





  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      if (this.state.voicemails.length === 0){
        return (
          <View style={styles.container_text}>
            <Text>You d'ont have a voice mail  !</Text>
          </View>
        )
      }else{
      return (
        <View style={styles.container}>
          {/* <FlatList
            style={styles.notificationList}
            data={this.state.voicemails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Voicemail voicemail={item} handleDeleteVoicemail={this.handleDeleteVoicemail} />}
          /> */}
           <FlatList
            style={styles.notificationList}
            data={this.state.voicemailsByPhone}
            keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => <ListPhone voicemails={item} handleDeleteVoicemail={this.handleDeleteVoicemail}  handlePhoneSeleceted={this.handlePhoneSeleceted} /> } 
           />
        </View>
      )
    }
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
  },
  container_text :{
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