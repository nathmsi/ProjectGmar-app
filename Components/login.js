// Components/Search.js
import React, { Component } from 'react';
import Expo, { Notifications } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { dbLogin, dbRegister } from '../API/serverAPI'
import { connect } from 'react-redux'
import registerForNotifications from '../services/push_notification'

class Login extends Component {

  state = {
    phone: '',
    password: '',
    visibleModal: null,
    codeVerify: 0,
    screen: 'login',
  }



  componentDidMount = () => {
    console.log('<login>')
  }





  handleLogin = async () => {
    console.log('handleLogin')
    const { phone, password } = this.state

    try {
      let result = await dbLogin(phone, password)
      if (result.err) {
        alert(result.err)
      } else {
        this.props.dispatch({ type: "tokenid", value: result.token })
        console.log('token login ' + result.token)
        await this.handlePostNotification(result.token)
        this.props.navigation.replace('voicemail');
      }

    } catch (err) {
      console.log('error login ' + err)
    }

  }


  handlePostNotification = async (token) => {
    await registerForNotifications(token)
  }




  handleRegister = async () => {
    console.log('handleRegister')
    const { phone, password } = this.state
    let result = await dbRegister(phone, password)
    if (result.err) {
      alert(result.err)
    } else {
      this.setState({ screen: 'login' })
    }
  }




  render() {

    if (this.state.screen === 'login') {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/phone-2/ultraviolet' }} />
            <TextInput style={styles.inputs}
              placeholder="Phone"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({ phone })} />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>


          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.setState({ screen: 'register' })}>
            <Text>Register</Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/phone-2/ultraviolet' }} />
            <TextInput style={styles.inputs}
              placeholder="Phone"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({ phone })} />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
            <TextInput style={styles.inputs}
              placeholder="confirmation Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>


          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleRegister()}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>


          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.setState({ screen: 'login' })}>
            <Text>Login</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#0277BD",
  },
  loginText: {
    color: 'white',
  }
});



const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken
  }
}
export default connect(mapStateToProps)(Login)