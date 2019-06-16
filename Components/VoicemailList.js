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
    this.setState({  isLoading: false })
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

    this.setState( { voicemailsByPhone ,  voicemails: this.props.voicemails} )
  }catch(err){
    console.log(err)
  }


  }




  _handleNotification = async (notification) => {

    if (notification.origin === 'received' ) {
      Alert.alert(
        'Nouveau message vocale recu !',
        ('de : ' + notification.data.phone ) ,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    
    if (this._isMounted) {
      this.setState({ isLoading: true })
      notification.data.read = false
      await this.props.dispatch({ type: "voicemailsAdd", value: notification.data })
      this.setState({ voicemails: this.props.voicemails, isLoading: false })
      this.createvoicemailsByPhone()
    }
  }

  getvoicemailbyPhone(phone){
    let result = []
    this.props.voicemails.forEach(element =>{
      if(element.phone === phone){
        result.push(element)
      }
    })
    return result
  }



  handleDeleteVoicemail = async (id , phone) => {
      if (this._isMounted) {
      await this.props.dispatch({ type: "voicemailsDelete", value: id })
      this.createvoicemailsByPhone()
      this.handlePhoneSeleceted(this.getvoicemailbyPhone(phone))
      }
  }

  handleDeleteAllByPhone = async (phone) => {
    if (this._isMounted) {
      const { voicemails }  = this.props
      await voicemails.forEach(voicemail => {
        if (voicemail.phone === phone ){
           this.props.dispatch({ type: "voicemailsDelete", value: voicemail.id })
        }
      })
      this.createvoicemailsByPhone()
      }
  }


  handlePhoneSeleceted = async (voicemails) =>{ 
     let count = 0 
     let phone = ''
     await voicemails.forEach( async voicemail => {
      if(voicemail.read === false){
           this.props.dispatch({ type: "voicemailsReadTrue", value: voicemail.id })
           count++
      }
    })
    this.createvoicemailsByPhone()
    try {
      phone = voicemails[0].phone
    }catch(err){}
    this.props.navigation.navigate(
      'voicemailByPhone',{
       voicemails : voicemails ,
       title : count!==0 ?  ( voicemails[0].phone +  '('  + count  +   'not read ) ' )  :  phone ,
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
            <Text>Vous avez aucun message vocal</Text>
          </View>
        )
      }else{
      return (
        <View style={styles.container}>
           <FlatList
            style={styles.notificationList}
            data={this.state.voicemailsByPhone}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ListPhone voicemails={item} handleDeleteAllByPhone={this.handleDeleteAllByPhone}  handlePhoneSeleceted={this.handlePhoneSeleceted} /> } 
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